/**
 * 文档地址https://github.com/mzabriskie/axios
 * ajax为axios的实例
 */
import axios from 'axios'

import {
    TESTPATH,
    ABORT_TIME,
    DEBUG
} from 'Config/index';

let _ajaxInstance = {}

_ajaxInstance = axios.create({
    timeout: ABORT_TIME * 1000 //超时时间 nms后自动abort
})

// request 拦截器
_ajaxInstance.interceptors.request.use((config) => {
    DEBUG.req && console.info(config.url, ' request:', config)
        // 请求带上时间
    if (config.params) config.params.v = +new Date()
    return config;
}, (error) => {
    DEBUG.req && console.error('request', JSON.stringify(error))
    GLOBAL.vbus.$emit('request_error', error)
    return Promise.reject(error);
});

// response 拦截器
_ajaxInstance.interceptors.response.use((response) => {
    DEBUG.res && console.info(response.config.url, ' response:', response)
        //resCode全局处理
    if (response.data.resCode === 0) return response.data.resData;

    !!response.config.noShowDefaultError || GLOBAL.vbus.$emit('ajax_handle_error', response)
    return Promise.reject(response)

}, (error) => {
    DEBUG.res && console.error('response', JSON.stringify(error))
    GLOBAL.vbus.$emit('response_error', error)
    return Promise.reject(error);
});

export default _ajaxInstance