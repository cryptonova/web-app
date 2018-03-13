import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

export default new Router({
  hashbang: false,
  mode: 'history',
  routes: [
    {
      path: '/balance',
      component: require('./components/User/BalanceHistory.vue').default,
      meta: {
        auth: true
      }
    },
    {
      path: '/portfolio',
      component: require('./components/User/Portfolio.vue').default,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      component: require('./components/Home.vue').default,
      beforeEnter: (to, from, next) => {
        store.commit('openLoginModal', 'You need an account to continue, it\'s free and takes only a few seconds to set up.')
      }
    },
    {
      path: '/:slug',
      component: require('./components/Coin.vue').default,
      props: true
    },
    {
      path: '/',
      component: require('./components/Home.vue').default
    }
  ]
})
