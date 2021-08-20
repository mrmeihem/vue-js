import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/add/payment/:category/',
    name: 'addPayment',
    component: ()=>import(/* webpackChunkName: 'AddPayment' */'../components/AddPayment')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router