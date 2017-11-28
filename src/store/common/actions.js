import CONSTS from 'Service/consts/'
export default {
    getUserInfo({ commit }) {
        commit('SET_USER_INFO', { userName: 'Zero' })
        commit('SET_MENU', CONSTS['OTHER/MENU'])
    }
}

const getters = {
    menuOriginGetter: state => state.menuOrigin,
    userinfoGetter: state => state.userinfo,
    menuTreeGetter: state => state.menuTree,
    menuMapGetter: state => state.menuMap
}