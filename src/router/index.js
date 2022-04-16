import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/home'
import User from '@/views/user'
import Layout from '@/views/layout'
import Vod from '@/views/vod'
import Goods from '@/views/goods'
import Info from '@/views/user/Info.vue'
import EditInfo from '@/views/user/EditInfo'
import QRcode from '@/views/user/QRcode'
import EditEmail from '@/views/user/EditEmail'
import EditPwd from '@/views/user/EditPwd'
import { getToken } from '@/utils/token'
import NucleicAcidInfo from '@/views/information/NucleicAcidInfo'
import Trip from '@/views/information/Trip'
import Vaccines from '@/views/information/Vaccines'
import HisNa from '@/views/information/Historical_NucleicAcidInfo'
import HisTrip from '@/views/information/Historical_Trip'
import HisVac from '@/views/information/Historical_Vaccines'
import Notice from '@/views/user/notice'
import Order from '@/views/user/Order'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home' // 重定向到此路径
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        meta: {
          requiresAuth: true // 要求验证的页面,在此情况下其子页面也会被验证.
        },
        component: User
      },
      {
        path: 'vod',
        component: Vod
      },
      {
        path: 'goods',
        component: Goods
      }
    ]
  },
  {
    path: '/info',
    component: Info
  },
  {
    path: '/edit',
    component: EditInfo
  },
  {
    path: '/qrcode',
    component: QRcode
  },
  {
    name: 'EditEmail',
    path: '/editEmail',
    component: EditEmail
  },
  {
    path: '/editPwd',
    component: EditPwd
  },
  {
    path: '/nainfo',
    component: NucleicAcidInfo
  },
  {
    path: '/notice',
    component: Notice
  },
  {
    path: '/trip',
    component: Trip
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/vaccines',
    component: Vaccines
  },
  {
    path: '/HisNa',
    component: HisNa
  },
  {
    path: '/HisTrip',
    component: HisTrip
  },
  {
    path: '/HisVac',
    component: HisVac
  }

]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // 哪些需要验证
    if (!getToken()) { // token存在条件
      next({
        path: '/login' // 验证失败要跳转的页面
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
