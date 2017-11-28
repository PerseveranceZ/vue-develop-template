import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import car from './car'

export default new Router({
  routes: [
    ...car
  ]
})
