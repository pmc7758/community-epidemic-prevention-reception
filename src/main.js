import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Form, Field, NavBar, Button, Tabbar, TabbarItem, Grid, GridItem } from 'vant'
import Echarts from '@/plugins/echarts'
import '../node_modules/echarts/map/js/china'

Vue.use(Echarts)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Grid)
Vue.use(GridItem)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
