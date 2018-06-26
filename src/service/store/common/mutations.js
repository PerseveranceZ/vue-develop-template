// 全局state 存放所有模块，业务线都有可能调用的状态
// 把state放入mutations是为了方便开发，观察状态 ，和状态对应的相关方法

export const state = {
    toLoginPath: '',
    toLogin: false,
    userinfo: null,
    fruit: null
}

//全局mutations
export const mutations = {
    ['SET_TO_LOGIN'](state, boolean) {
        state.toLogin = boolean
    },
    ['SET_TO_LOGIN_PATH'](state, path) {
        state.toLoginPath = path
    },
    ['SET_USER_INFO'](state, resData) {
        state.userinfo = resData
    },
    ['SET_FRUIT'](state, resData) {
        state.fruit = resData
    }
}
