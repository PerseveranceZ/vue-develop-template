// 全局state 存放所有模块，业务线都有可能调用的状态
// 把state放入mutations是为了方便开发，观察状态 ，和状态对应的相关方法
export const state = {
    toLoginPath: '',
    toLogin: false,
    userinfo: null,
    menuOrigin: [],
    menuTree: [],
    menuMap: []
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
    ['SET_MENU'](state, resData) {
        let dataMap = {},
            tree = []
        state.menuOrigin = resData
        resData.map((item) => {
            if (!dataMap[item.id]) {
                dataMap[item.id] = item
            }
            // 父节点添加到tree中
            if (item.parentId === 0) {
                tree.push(item)
            }
        })
        resData.map((item) => {
            if (item.id !== item.parentId && dataMap[item.parentId]) {
                if (!dataMap[item.parentId]['children']) {
                    dataMap[item.parentId]['children'] = []
                }
                // 父节点中push子节点
                dataMap[item.parentId]['children'].push(item)
            }
        })
        for (var i in dataMap) {
            var item = dataMap[i]
                // 添加各种状态
            if (!item.children) {
                item.children = []
            }
        }
        state.menuTree = tree
        state.menuMap = dataMap
    }
}
