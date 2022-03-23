import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Form, Field, NavBar, Button, Tabbar, TabbarItem, Grid, GridItem, Swipe, SwipeItem, Lazyload, Image as VanImage, Cascader, Popup, NoticeBar, List } from 'vant'
import Echarts from '@/plugins/echarts'
import '../node_modules/echarts/map/js/china'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

Vue.use(List)
Vue.use(NoticeBar)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Field)
Vue.use(Cascader)
Vue.use(VanImage)
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Echarts)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
