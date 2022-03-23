import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/home'
import User from '@/views/user'
import Layout from '@/views/layout'
import Vod from '@/views/vod'
import Goods from '@/views/goods'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
