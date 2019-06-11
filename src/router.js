import Vue from 'vue'
import Router from 'vue-router'
import Load from './views/loading.vue'
import Intro from './views/intro.vue'
import Game from './views/game.vue'
import Result from './views/result.vue'
import P404 from './views/404.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'load',
      component: Load
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    },
    {
      path: '*',
      name: '404',
      component: P404
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
