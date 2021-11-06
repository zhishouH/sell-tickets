import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
const Film = () => import('@/views/Film')
const Cinema = () => import('@/views/Cinema')
const News = () => import('@/views/News')
const Center = () => import('@/views/Center')
const City = () => import('@/views/City')
const Detail = () => import('@/views/Detail')
const Login = () => import('@/views/Login')
const FilmSearch = () => import('@/views/FilmSearch')
const CinemaSearch = () => import('@/views/CinemaSearch')
// 二级路由
const Nowplaying = () => import('@/views/film/Nowplaying')
const Comingsoon = () => import('@/views/film/Comingsoon')
Vue.use(VueRouter)

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: 'nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/filmsearch',
    component: FilmSearch
  },
  {
    path: '/cinemasearch',
    component: CinemaSearch
  },
  {
    path: '*',
    redirect: '/film'
  }
]

const router = new VueRouter({
  routes
})

export default router
