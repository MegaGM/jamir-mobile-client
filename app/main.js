/**
 * Build files are located at /platforms/android/app/src/main/assets/app
 */

import Vue from 'nativescript-vue'
import store from './store'
import './style.less'

import SCVue from './plugins/socketcluster-client.plugin'
Vue.use(SCVue)

// import VueDevtools from 'nativescript-vue-devtools'
if (TNS_ENV !== 'production') {
  // Vue.use(VueDevtools)
  Vue.config.productionTip = false
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.config.silent = true

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

import EntryPoint from './pages/EntryPoint'

new Vue({
  store,
  methods: {
    gracefullyNavigateTo(Page) {
      this.$store.commit('setActivePage', Page)
      this.$navigateTo(Page)
    },
    async AuthMiddleware() {
      const unauthenticated = !this.$store.getters['Auth/authToken']
      if (unauthenticated) {
        const { default: Auth } = await import('./pages/Auth.vue')
        this.$navigateTo(Auth)
      }
    },
  },
  render: h => h('frame', [h(EntryPoint)])
}).$start()
