import Vue from 'vue'
import App from './App.vue'
import { routes } from './routes/routes'
import VueRouter from 'vue-router'
import store from '@/store'
import axios from 'axios-jsonp-pro'
import ToastPlugin from 'vue-toast-notification'
import './styles.js'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ToastPlugin, {
    position: 'top-right',
    duration: 1700,
})

Vue.prototype.$axios = axios

const router = new VueRouter({
    routes,
})

new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app')
