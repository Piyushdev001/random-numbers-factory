import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const socket = io(process.env.VUE_APP_SOCKET_IO_URL as string)

Vue.use(VueSocketIOExt, socket)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
