import Vue from 'nativescript-vue'
import store from './store'
import App from './components/App'

// import VueDevtools from 'nativescript-vue-devtools'
if (TNS_ENV !== 'production') {
  // Vue.use(VueDevtools)
  Vue.config.productionTip = false
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
