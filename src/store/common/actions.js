import CONST from 'Plugins/const'
export default {
    getUserInfo({ commit }) {
        commit('SET_USER_INFO', { userName: 'Zero' })
        commit('SET_MENU', CONST['OTHER/MENU'])
    }
}
