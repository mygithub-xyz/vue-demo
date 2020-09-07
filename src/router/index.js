import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Book from "../views/Book";
import About from "../views/About";
import view from "../views/view";
import index from "../views/index";
import login from "../views/login";
import echart from "../views/echart";
import vchart from "../views/vchart";
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
              path: '/echart',
              name: 'echart',
              component: echart

          },
          {
              path: '/vchart',
              name: 'vchart',
              component: vchart

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
          } ,
          {
              path: '/view',
              name: 'view',
              component: view
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
