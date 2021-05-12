// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/store'
// import echart from "./views/echart";
import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
Vue.component('v-chart', ECharts)
// import  echarts from "echarts"

// Vue.prototype.$echarts = echarts;
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false
// 全局使用axios
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'text/plain'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'



const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
