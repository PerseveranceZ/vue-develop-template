import Vue from 'vue'

GLOBAL.vbus = new Vue()

// import 'Components'// 全局组件注册
import 'Directives' // 指令

// 引入插件
import router from 'Plugins/router'
import inject from 'Plugins/inject'
import store from 'Plugins/store'
// 引入组件库及其组件库样式
import VueOnsen from 'vue-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
// 引入根组件
import App from './App'

Vue.use(inject)
Vue.use(VueOnsen)

// render
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})