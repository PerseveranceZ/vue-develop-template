import api from 'Plugins/api'
import consts from 'Plugins/const'
export default {
    getUserInfo({ commit }) {
        commit('SET_FRUIT', consts['OTHER/FRUIT'])
    	api['user/info']().then(resData => {
	        commit('SET_USER_INFO', resData)
    	})
    }
}
