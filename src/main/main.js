import axios from 'axios'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
import db from './db'
Vue.prototype.$db = db.db

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
