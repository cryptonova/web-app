import Vue from 'vue'
import App from './components/App'
import router from './router.js'
import store from './store.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VueClipboards from 'vue-clipboards'

import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: process.env.GOOGLE_ANALYTICS_ID
})

Vue.use(VueClipboards)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = process.env.API_URL
Vue.router = router
Vue.use(VueAuth, {
  auth: {
    request (request, token) {
      this.options.http._setHeaders.call(this, request, {
        Authorization: `Bearer ${token}`
      })
    },
    response (response) {
      try {
        if (response.data.error.name === 'TokenExpiredError') {
          this.logout()
        }
      } catch (error) {}

      return response.data.token
    }
  },
  // auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  authRedirect: {
    path: '/login'
  },
  registerData: {
    url: '/auth/register',
    method: 'POST',
    redirect: '/auth/login'
  },
  loginData: {
    url: '/auth/login',
    method: 'POST',
    redirect: false,
    fetchUser: true
  },
  logoutData: {
    redirect: '/',
    makeRequest: false
  },
  fetchData: {
    url: '/me',
    method: 'GET',
    enabled: true
  },
  parseUserData (response) {
    store.state.user = response
  },
  refreshData: {
    url: '/auth/refresh',
    method: 'GET',
    enabled: true,
    interval: 30
  }
})

window._ = require('lodash')
window.moment = require('moment')
window.momentTimezone = require('moment-timezone')

Vue.filter('currency', function (value) {
  return '$' + amount(value)
})

Vue.filter('number', function (value) {
  return amount(value)
})

Vue.filter('relativeDate', function (datetime) {
  return window.moment(datetime).fromNow()
  // return window.moment.tz(datetime.date, datetime.timezone).fromNow()
})

Vue.filter('localDateTime', function (datetime) {
  const localTimezone = window.moment.tz.guess()

  return window.moment(datetime).tz(localTimezone).format('YY-MM-DD HH:mm:ss')
  // return window.moment.tz(datetime.date, datetime.timezone).tz(localTimezone).format('YY-MM-DD HH:mm:ss')
})

function amount (value) {
  let zeros = 0

  if (Math.abs(value) < 1) {
    zeros = -Math.floor(Math.log(value) / Math.log(10) + 1) + 2
  }

  if (window._.isNaN(zeros) || !window._.isFinite(zeros)) {
    zeros = 0
  }

  return Math.abs(Number(value)) >= 1.0e+9
    ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2).replace('.00', '') + ' B'
    : Math.abs(Number(value)) >= 1.0e+6
      ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2).replace('.00', '') + ' M'
      : new Intl.NumberFormat('en-US', { minimumFractionDigits: zeros }).format(value)
}

window.amount = amount

Vue.config.productionTip = false

// Global Components
Vue.component('Spinner', require('./components/Global/Spinner.vue').default)
Vue.component('Toggle', require('./components/Global/Switch.vue').default)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
