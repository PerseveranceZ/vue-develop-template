import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import common from './common';

export default new Vuex.Store({
    ...common,
    strict: process.env.NODE_ENV !== 'production'
})