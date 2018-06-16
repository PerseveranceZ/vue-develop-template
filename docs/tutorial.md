## 浅谈 Vue 中构建前端 10w+ 代码量的单页面应用(编写中)

随着业务的不断累积，目前我们 `toC 端主要项目`，除去 `node_modules`， `build 配置文件`，`dist 静态资源文件`的代码量为 `137521` 行，除去统计过渡的代码，也在 `10w+` 行，`后台管理系统下各个子应用代码`除去依赖等文件的总行数也达到 `100w` 多一点。

光看代码行数是仅仅只是一个业务量级的问题，随着项目体积的不断增大，我们都在以下面三个准则要求自己。

- 项目的可预见性
- 项目的可拓展性
- 项目的可维护性

本文会在主要描述构建过程中，遇到或者总结的点，可能并不适合你的业务场景，我会尽可能多的描述问题与其中的思考，最大可能的帮助到需要的开发者，也辛苦开发者发现问题或者不合理/不正确的地方及时向我反馈，会尽快修改。

### ① 单页面，多页面 
首先要思考我们的项目最终的`构建主体`是`单页面`，还是`多页面`，还是`单页 + 多页`，通过他们的优缺点来分析：

- **单页面（SPA）**
    - 优点：体验好，路由之间跳转流程，可定制转场动画，使用了`懒加载`可有效减少首页白屏时间，相较于`多页面`减少了用户访问静态资源服务器的次数等。
    - 缺点：初始会加载较大的静态资源，并且随着业务增长会越来越大，`懒加载`也有他的弊端，不做特殊处理不利于 SEO等。
- **多页面（MPA）**：
    - 优点：对搜索引擎友好，开发难度较低。
    - 缺点：资源请求较多，整页刷新体验较差，页面间传递数据只能依赖 `URL`，`cookie`，`storage` 等方式，较为局限。
- **SPA + MPA**
    - 这种方式常见于较`老 MPA 项目迁移至 SPA 的情况`，缺点结合两者，两种主体通信方式也只能以兼容`MPA 为准`
    - 不过这种方式也有他的好处，假如你的 SPA 中，有类似文章分享这样（没有后端直出，后端返 `HTML 串`的情况下），想保证用户体验在 SPA 中开发一个页面，在 MPA 中也开发一个页面，去掉没用的依赖，或者直接用原生 JS 来开发，分享出去是 MPA 的文章页面，这样可以**加快分享出去的打开速度，同时也能减少静态资源服务器的压力**，因为如果分享出去的是 SPA 的文章页面，那 SPA 所需的静态资源`至少都需要去进行协商请求`,当然如果服务配置了强缓存就忽略以上所说。
    
我们首先根据业务所需，来最终确定`构建主体`，而我们选择了`体验至上的 SPA`，并选用 `Vue` 技术栈。

### ② 目录结构
其实我们看开源的绝大部分项目中，目录结构都会差不太多，我们可以综合一下来个通用的 `src` 目录：

```
src
├── assets          // 资源目录 图片，样式，iconfont
├── common          // 全局业务组件目录
├── components      // 全局通用组件目录
├── config          // 项目配置，拦截器，开关
├── plugins         // 插件相关，生成路由、请求、store 等实例，并挂载 Vue 实例
├── directives      // 拓展指令集合
├── routes          // 路由配置
├── service         // 服务层
├── utils           // 工具类
└── views           // 视图层
```

### ③ 业务组件，通用组件
`common` 中我们通常会存放如的 header，footer 等根据业务会自定义一些特有样式或逻辑，无法供其他业务使用的组件。

`components` 中我们会存放 UI 组件库中的那些常见通用组件了，在项目中直接通过设置`别名`来使用，如果其他项目需要使用，就发到 `npm` 上。

```
// components 简易结构
components
├── dist
├── build
├── src      
    ├── modal
    ├── toast
    └── ...
├── index.js             
└── package.json        
```
如果想最终编译成 `es5`，直接在 html 中使用或者部署 CDN 上，在 `build` 配置简单的打包逻辑，搭配着 `package.json` 构建 UI组件 的自动化打包发布，最终部署 `dist` 下的内容，并发布到 `npm` 上即可。

而我们也可直接使用 `es6` 的代码：

自身项目中使用：
```js
import 'Components/src/modal'
```
其他项目使用，假设我们发布的 `npm 包`叫 `bm-ui`，并且下载到了本地 `npm i bm-ui -S`:

修改项目的最外层打包配置，在 rules 里 `babel-loader` 或 `happypack` 中添加 `include`，`node_modules/bm-ui`：

```js
// webpack.base.conf
...
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        // 这里添加
        include: [resolve('src'), resolve('test'), resolve('node_modules/bm-ui')]
    },{
    ...
    }]
...
```
然后直接在项目中使用即可：
```
import { modal } from 'bm-ui'
```

同时有多个组件库的话，又或者有同学专门进行组件开发的话，把 `components
内部细分`一下，多一个文件分层。

```
components
├── bm-ui-1 
├── bm-ui-2
└── ...
```
你的打包配置文件可以放在 `components` 下，进行统一打包，当然如果要开源出去还是放在对应库下。

### ④ 最重要的全局配置/开关与拦截器
这个点其实会是项目中经常被忽略的，或者说很少聚合到一起，但同时我认为是**整个项目中重要之一**。

```
config
├── base.js             // 全局配置/开关
├── routes              // 路由表关系配置
├── interceptors        // 拦截器
    ├── index.js        // 入口文件
    ├── ajax.js         // 请求/响应拦截
    ├── router.js       // 路由拦截
    └── ...
└── ...

```

我们在 `config/index.js` 可能会有如下配置：

```js
// config/index.js

// 当前宿主平台
export const HOST_PLATFORM = 'WEB'
// 这个就不多说了
export const NODE_ENV = process.env.NODE_ENV || 'prod'
// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    timeout: 20000,
    maxContentLength: 2000,
    headers: {},
    ...
}
// 是否强制所有请求访问本地 MOCK，看到这里同学不难猜到，每个请求也可以单独控制是否请求 MOCK
export const AJAX_LOCALLY_ENABLE = false
// 是否开启监控
export const MONITOR_ENABLE = true
// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
    waitForData: true,
    transitionOnLoad: true,
    ...
}
...
// 还有一些方便开发的配置
export const CONSOLE_REQUEST_ENABLE = true      // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = true     // 开启响应参数打印
export const CONSOLE_MONITOR_ENABLE = true      // 监控记录打印
... 
// 还有一些业务相关的配置
...
```
下面我们在 `plugins` 中实例化插件，目录如下:

```
plugins
├── index.js            //入口文件
├── router.js           //路由实例
├── axios.js            //请求实例
└── others.js           // 其他自定义插件
```

实例化 `router`：
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import ROUTES from 'Config/routes'
import {ROUTER_DEFAULT_CONFIG} from 'Config'
import {routerBeforeEachFunc} from 'Config/interceptors'
Vue.use(VueRouter)

// 注入默认配置和路由表
let routerInstance = new VueRouter({
    ...ROUTER_DEFAULT_CONFIG,
    ROUTES
})
// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)

export default routerInstance

```

实例化 `axios`：

```js
import axios from 'axios'
import {AXIOS_DEFAULT_CONFIG} from 'Config'
import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from 'Config/interceptors'

let axiosInstance = {}

axiosInstance = axios.create({
    timeout: ABORT_TIME * 1000 //超时时间 nms后自动abort
})

// 注入请求拦截
axiosInstance
    .interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入失败拦截
axiosInstance
    .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
```
在 `plugins/index.js` 中引入插件：
```js
import axiosInstance from './axios'
import routerInstance from './router'

GLOBAL.axios = AxiosInstance
 
export const expose = {
    router: RouterInstance,
    // 需要暴露的都放在这里
    ...
}

export const inject = {
    install: (Vue, options) => {
        Vue.prototype.$axios = AxiosInstance
        // 需要挂载的都放在这里
    }
}

```



我们在 `main.js` **注入插件**：

```js
// main.js
import Vue from 'vue'

window.GLOBAL = {}
GLOBAL.vbus = new Vue()

...
import {expose} from 'Plugins'
    
...
new Vue({
    el: '#app',
    render: h => h(App),
    router: expose.router,
    ...
})

```
在`ajax 拦截器`中(`config/interceptors/ajax.js`)：
```
// config/interceptors/ajax.js

import {CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE} from '../index.js'

export function requestSuccessFunc (requestObj) {
    CONSOLE_REQUEST_ENABLE && console.info(, 'requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    ...
    
    return requestObj
}

export function requestFailFunc (requestError) {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    ...
    
    return Promise.reject(requestError);
}

export function responseSuccessFunc (responseObj) {
    // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
    ...
    // 假设我们请求体为
    // {
    //     code: 1010,
    //     msg: 'this is a msg',
    //     data: null
    // }
    
    let resData =  responseObj.data
    let {code} = resData
    
    switch(code) {
        case 1010: // 如果业务成功，直接进成功回调  
            return responseObj;
        case 1111: 
            // 如果业务失败，根据不同 code 做不同处理
            // 比如最常见的授权过期跳登录
            // 特定弹窗
            // 跳转特定页面等
            
            location.href = xxx // 这里的路径也可以放到全局配置里
            return;
        case 2222:
            return;
        default:
            // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
            !responseObj.config.noShowDefaultError && GLOBAL.vbus.$emit('global.$dialog.show', resData.msg);
            return Promise.reject(resData);
    }
}

export function responseFailFunc (responseError) {
    // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
    ...
    return Promise.reject(responseError);
}
```
请求拦截这里代码都很简单，对于 `responseSuccessFunc` 中 `default` 逻辑做下简单说明：

1. `responseObj.config.noShowDefaultError` 这里可能不太好理解
我们在请求的时候，可以传入一个 axios 中并没有意义的 `noShowDefaultError` 参数为我们业务所用，当值为 false 或者不存在时，我们会触发全局事件 `global.dialog.show`，`global.dialog.show`我们会注册在 `app.vue` 中：

```js
// app.vue

export default {
    ...
    created() {
        this.bindEvents
    },
    methods: {
        bindEvents() {
            GLOBAL.vbus.$on('global.dialog.show', (msg) => {
                if(msg) return
                // 我们会在这里注册全局需要操控试图层的事件，方便在非业务代码中通过发布订阅调用
                this.$dialog.popup({
                    content: msg 
                });
            })
        }
        ...
    }
}
```

2. `GLOBAL` 是我们挂载 `window` 上的`全局对象`，我们把需要挂载的东西都放在 `window.GLOBAL` 里，减少命名空间冲突的可能。
3. `vbus` 其实就是我们开始 `new Vue()` 挂载上去的
```
GLOBAL.vbus = new Vue()
```
4. 我们在这里 `Promise.reject` 出去，我们就可以在 `error` 回调里面只处理我们的业务逻辑，而其他如`断网`、`超时`、`服务器出错`等均通过拦截器进行统一处理。

可以对比下**处理前后在业务中的使用代码**：

**拦截器处理前**：
```js
this.$axios.get('test_url').then(({code, data}) => {
    if( code === 1010 ) {
        // 业务成功
    } else if ()
        // em... 各种业务不成功处理，如果遇到通用的处理，还需要抽离出来
    
    
}, error => {
   // 需要根据 error 做各种抽离好的处理逻辑，断网，超时等等...
})
```

**拦截器处理后**：

```js
<!--业务失败走默认弹窗逻辑的情况-->
this.$axios.get('test_url').then(({data}) => {
    // 业务成功，直接操作 data 即可
    
})

<!--业务失败自定义-->
this.$axios.get('test_url', {
    noShowDefaultError: true // 可选
}).then(({data}) => {
    // 业务成功，直接操作 data 即可
    
}, (code, msg) => {
    // 当有特定 code 需要特殊处理，传入 noShowDefaultError:true，在这个回调处理就行
})
```

回到拦截器，下面我们该定义`路由拦截器`(`config/interceptors/router.js`)：

```js
// config/interceptors/router.js

export function routerBeforeFunc (to, from, next) {
    // 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理
    
    // next(...)
}
```
最后在`入口文件(config/interceptors/index.js)`中引入并暴露出来即可:

```js
import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from './ajax'
import {routerBeforeEachFunc} from './router'

let interceptors = {
    requestSuccessFunc,
    requestFailFunc,
    responseSuccessFunc,
    responseFailFunc,
    routerBeforeEachFunc
}

export default interceptors
```

**为什么要如此细分拦截器？**

到这里很多同学会觉得，就这么简单的引入判断，可有可无，
就如我们最近做的一个需求来说，我们 toC 端项目之前一直是在微信公众号中打开的，而我们需要在小程序中通过 webview 打开大部分流程，而我们也`没有时间，没有空间`在小程序中重写近 100 + 的页面流程，这时候必须把项目兼容到小程序端，在兼容过程中可能需要解决以下问题：

1. 请求路径完全不同。
2. 需要兼容两套不同的权限系统。
3. 有些流程在小程序端需要做改动，跳转到特定页面。
4. 有些公众号的 `api` ，在小程序中无用，需要调用小程序的逻辑，需要做兼容。
5. 很多也页面上的元素，小程序端不做展示等。

> 可以看出，稍微不慎，会影响公众号现有逻辑。

* 添加请求拦截 `interceptors/minaAjax.js`， `interceptors/minaRouter.js`，原有的换更为 `interceptors/officalAjax.js`，`interceptors/officalRouter.js`，在入口文件`interceptors/index.js`，**根据当前`宿主平台`，也就是全局配置 `HOST_PLATFORM`，通过`代理模式`和`策略模式`，注入对应平台的拦截器**，**在`minaAjax.js`中重写请求路径和权限处理，在 `minaRouter.js` 中添加页面拦截配置，跳转到特定页面**，这样一并解决了上面的`问题 1，2，3`。
* `问题 4` 其实也比较好处理了，拷贝需要兼容 `api` 的页面，重写里面的逻辑，通过`路由拦截器一并做跳转处理`。
* `问题 5` 也很简单，拓展两个**自定义指令 v-mina-show 和 v-mina-hide** ，在展示不同步的地方可以直接使用指令。

最终用最少的代码，最快的时间完美上线，丝毫没影响到现有 toC 端业务，而且**这样把所有兼容逻辑绝大部分聚合到了一起，方便二次拓展和修改。**

虽然这只是根据自身业务结合来说明，可能没什么说服力，不过不难看出全局配置/拦截器 虽然代码不多，但却是整个项目的核心之一，我们可以在里面做更多 `awesome` 的事情。

### ⑤ 路由配置与懒加载
`directives` 里面没什么可说的，不过很多难题都可以通过他来解决，要时刻记住，我们可以再指令里面**操作虚拟 DOM。**

说回路由配置，文章开头说到单页面静态资源过大，`首次打开/每次版本升级`后都会较慢，可以用`懒加载`来拆分静态资源，减少白屏时间，但开头也说到`懒加载`也有待商榷的地方：

- 如果异步加载较多的组件，会给静态资源服务器/ CDN 带来更大的访问压力的同时，如果当多个异步组件都被修改，造成版本号的变动，发布的时候会大大增加 CDN 被击穿的风险。
- 懒加载首次加载未被缓存的异步组件白屏的问题，造成用户体验不好。
- 异步加载通用组件，会在页面可能会在网络延时的情况下参差不齐的展示出来等。

这就需要我们根据项目情况在`空间和时间`上做一些权衡。

以下几点可以作为简单的参考：
- 对于访问量可控的项目，如`公司后台管理系统`中，可以以操作 view 为单位进行异步加载，通用组件全部同步加载的方式。
- 对于一些复杂度较高，实时度较高的应用类型，可采用按`功能模块拆分`进行异步组件加载。
- 如果项目想保证比较高的完整性和体验，迭代频率可控，不太关心首次加载时间的话，可按需使用异步加载或者直接不使用。


> 打包出来的 main.js 的大小，绝大部分都是在路由中引入的并注册的视图组件。

### ⑥ Service 服务层
服务层作为项目中的另一个核心之一，“自古以来”都是大家比较关心的地方。

在`传统多页面`中，当页面逻辑过重的情况下，我们会选择通过 `mixins` 进行代码分层，并抽离公共的 `controller` 和 `modal`，在业务中使用，而在`单页面`中，我们更倾向于把他们聚合到一起，形成一个服务层，暴露给业务中使用，业务中尽可能的关注试图的逻辑的处理，`Service 层`大致包括以下功能（可自行按业务拓展）：

**基础**
- **api**：`异步与后端交互`
- **const**：`常量枚举`
- **store**：`Vuex` 状态管理

**拓展**
- **localStorage**：本地数据，稍微封装下，支持存取对象即可
- **monitor**：`监控`功能，自定义搜集策略，调用 `api` 中的接口发送
- **beacon**：`打点`功能，自定义搜集策略，调用 `api` 中的接口发送
- ... 

**目录层级（仅供参考）**
```
service
├── api
    ├── index.js             // 入口文件
    ├── order.js             // 订单相关接口配置
    └── ...
├── const                   
    ├── index.js             // 入口文件
    ├── order.js             // 订单常量接口配置
    └── ...
├── store                    // vuex 状态管理
├── expands                  // 拓展
    ├── monitor.js           // 监控
    ├── beacon.js            // 打点
    ├── localstorage.js      // 本地存储
    └── ...                  // 按需拓展
└── ...

```



当开始一个项目的时候可能会有这样的困扰，文件该如何以业务来分层？

对于`后台管理系统`来说，保证设计的时候每个模块都单一职责，每个平级路由之间其实交互较少或者基本没有，按照`菜单栏`来建立对应文件夹即可，保证`路由名`和`文件路径`一致，方便定位即可。

```
// 页面 URL 上的 hash
#/hospital/baseinfo

// router 配置
import HospitalBaseinfo from 'Views/hospital/baseinfo'
...
{
    component: HospitalBaseinfo,
    path: '/hospital/baseinfo',
    ...
}

// 对应 view 文件分层
views/
    hospital/
        baseinfo/
        ...
```



