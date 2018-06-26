import Vue from 'vue'
import Vuex from 'vuex'
import {VUEX_DEFAULT_CONFIG} from 'Config'
import commonStore from 'Service/store/common'

Vue.use(Vuex)

export default new Vuex.Store({
    ...commonStore,
    ...VUEX_DEFAULT_CONFIG
})