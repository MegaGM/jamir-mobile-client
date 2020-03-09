import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { Color } from 'tns-core-modules/color'
import Auth from './Auth'

export default new Vuex.Store({
  modules: {
    Auth,
  },
  state: {
    activePage: null,
    bgColor: new Color('#2b71b1'),
  },
  getters: {
    activePage: (state) => state.activePage,
    bgColor: (state) => state.bgColor,
  },
  mutations: {
    setActivePage: (state, activePage) => {
      if (activePage && activePage.__file) {
        console.info('[Vuex] setActivePage', activePage.__file)
      }
      state.activePage = activePage
    },
  },
  actions: {}
})
