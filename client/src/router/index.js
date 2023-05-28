import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{title:'Updoun Bot'} ,
    component: function () {
      return import(/* webpackChunkName: "about" */ '../Home.vue')
    }
  },
  {
    path: '/auth/login',
    name: 'Login',
    meta:{title:'Login'},
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/auth/login.vue')
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    meta:{title:'Register'},
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/auth/register.vue')
    }
  },
  {
    path: '/auth/confirm',
    name: 'Confirm',
    meta:{title:'Confirm'},
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/auth/confirm.vue')
    }
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    meta:{title:'Logout'},
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/auth/logout.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base:"",
  routes
})

export default router
