import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Dialog, Form, Field, NavBar, Button, Tabbar, TabbarItem, Grid, GridItem, Swipe, SwipeItem, Lazyload, Image as VanImage, Cascader, Popup, NoticeBar, List, Card, SubmitBar, Search, Col, Row, Notify, Cell, CellGroup, Icon, Divider, RadioGroup, Radio, Uploader, PullRefresh, Tag, Toast, Checkbox, CheckboxGroup, Stepper, Calendar, DatetimePicker } from 'vant'
import Echarts from '@/plugins/echarts'
import '../node_modules/echarts/map/js/china'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import '@/styles/icon.css'
import '@/styles/icono.css'
import '@/styles/iconi.css'
import '@/styles/iconk.css'
import '@/styles/iconp.css'

Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.use(Calendar)
Vue.use(Stepper)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Toast)
Vue.use(Tag)
Vue.use(PullRefresh)
Vue.use(Uploader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Divider)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
// 全局注册
Vue.use(Notify)
Vue.use(Col)
Vue.use(Row)
Vue.use(Search)
Vue.use(SubmitBar)
Vue.use(Card)
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
  // 绑定全局对象
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
