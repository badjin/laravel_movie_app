import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'movies.popular'}
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "blog" */ '../views/movies/movies'),
    children: [
      {
        path: 'popular',
        name: 'movies.popular',
        component: () => import(/* webpackChunkName: "blog" */ '../views/movies/popular')
      },
      {
        path: 'now',
        name: 'movies.now',
        component: () => import(/* webpackChunkName: "blog" */ '../views/movies/now')
      },
    ],
  },
  {
    path: '/movies/show/:id',
    name: 'movies.show',
    component: () => import(/* webpackChunkName: "blog" */ '../views/movies/show')
  },
  {
    path: '/actors',
    name: 'Actors',
    component: () => import(/* webpackChunkName: "blog" */ '../views/actors/actors'),
    children: [
      {
        path: 'index',
        name: 'actors.index',
        component: () => import(/* webpackChunkName: "blog" */ '../views/actors/index')
      },
      {
        path: 'show/:id',
        name: 'actors.show',
        component: () => import(/* webpackChunkName: "blog" */ '../views/actors/show')
      },
    ],
  },
  {
    path: '/tv',
    name: 'tvShows',
    component: () => import(/* webpackChunkName: "blog" */ '../views/tv/tvShows'),
    children: [
      {
        path: 'popular',
        name: 'tv.popular',
        component: () => import(/* webpackChunkName: "blog" */ '../views/tv/popular')
      },
      {
        path: 'rated',
        name: 'tv.rated',
        component: () => import(/* webpackChunkName: "blog" */ '../views/tv/rated')
      },
    ],
  },
  {
    path: '/tv/show/:id',
    name: 'tv.show',
    component: () => import(/* webpackChunkName: "blog" */ '../views/tv/show')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
