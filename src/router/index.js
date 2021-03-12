import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ForksSearch from "../views/ForksSearch";
import E404 from "../components/E404";
import Search from "../components/Search";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search-forks',
    name: 'search',
    component: Search
  },
  {
    path: '/search-forks?owner=:owner&repo=:repo&page=:page',
    name: 'forksSearch',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ForksSearch,
    props: true,
  },
  {
    path: '*',
    component: E404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
