import Vue from 'vue'
import * as common from './utils/common'
import conf from './config'
import App from './App.vue'
// import router from './router'
import store from './store'

import './assets/css/reset.scss'
import 'lib-flexible/flexible'

Vue.config.productionTip = false

if (conf.dev) {
  require('./mock')
}

Vue.prototype.$funcs = common
new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
