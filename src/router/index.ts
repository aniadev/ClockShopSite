import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: MainLayout,
    props: { header: 'MainNavbar' },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../modules/landing/view/Home.vue')
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('../modules/landing/view/ItemDetail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
