// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

window.GLOBAL = {}
GLOBAL.vbus = window.vbus = new Vue()

// import 'Components'// 全局组件注册
import 'Config/ajax'
import 'Directives' // 指令

// Webpack CSS import
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

//插件
import VueOnsen from 'vue-onsenui'
import injector from 'Config/inject'

Vue.use(injector)
Vue.use(VueOnsen)

Vue.config.productionTip = false

// vue debug
import { DEBUG } from 'Config/index'

Vue.config.debug = DEBUG.v_debug
Vue.config.devtools = DEBUG.v_devtools

import App from './App'
import store from 'Store'
import router from './router'

// render
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})