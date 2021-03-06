import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "./plugins/axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入Echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts
import VCharts from 'v-charts'
Vue.use(VCharts)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
