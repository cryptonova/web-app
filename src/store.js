import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoginModal: false,
    showRegisterModal: false,
    showDetailedPortfolioView: false,
    errorMessage: null,
    user: null,
    update: {
      coins: null,
      balance: null
    }
  },
  mutations: {
    toggleDetailedPortfolioView () {
      this.state.showDetailedPortfolioView = !this.state.showDetailedPortfolioView
    },
    openLoginModal () {
      this.state.showLoginModal = true
    },
    closeLoginModal () {
      this.state.showLoginModal = false
    },
    openRegisterModal (state, errorMessage) {
      state.showRegisterModal = true
      state.errorMessage = errorMessage
    },
    closeRegisterModal () {
      this.state.showRegisterModal = false
    },
    update (state, component) {
      const timestamp = parseInt(window.moment().format('x'))
      state.update[component] = timestamp
    }
  }
})
