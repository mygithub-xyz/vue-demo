import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Book from "../views/Book";
import About from "../views/About";
import index from "../views/index";
import login from "../views/login";
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        // alias:'/login',
        name: '登陆',
        component: login
    },
  {
    path:'/index',
    name:'首页',
    component: index,
      children: [
          {
              path: '/index',
              redirect: '/about',
          },

          {
              path: '/book',
              name: 'Book',
              component: Book

          },
          {
              path: '/home',
              name: 'Home',
              component: Home

          },
          {
              path: '/about',
              name: 'About',
              component: About
          }
      ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
