import axios from './axios'
import api from './api'
import consts from './const'
GLOBAL.ajax = axios
 
export default {
    install: (Vue, options) => {
        Vue.prototype.$api = api
        Vue.prototype.$ajax = axios
        Vue.prototype.$const = consts
        // 需要挂载的都放在这里
    }
}
