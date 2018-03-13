<template>
  <section class="hero is-medium">
    <div class="hero-head">
      <nav class="nav">
        <div class="container is-widescreen">
          <!-- Hamburger menu -->
          <span class="nav-toggle is-visible-fullhd-down" @click="toggleMenu" v-if="$auth.check()">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <!-- Brand -->
          <div class="nav-left">
            <router-link to="/" class="nav-item is-brand">Crypto<strong>nova</strong></router-link>
            <a href="https://github.com/cryptonova" target="_blank" rel="noopener" class="nav-item"><i class="fab fa-github"></i></a>
          </div>

          <!-- User -->
          <div class="nav-right" v-if="$auth.check()">
            <a class="nav-item">
              <div class="dropdown is-right is-hoverable">
                <div class="dropdown-trigger is-flex">
                  {{ $store.state.user.email }} <i class="material-icons">arrow_drop_down</i>
                </div>
                <div class="dropdown-menu">
                  <div class="dropdown-content">
                    <router-link class="dropdown-item" to="/portfolio">
                      Portfolio Overview <i class="material-icons">insert_chart</i>
                    </router-link>
                    <router-link class="dropdown-item" to="/balance">
                      Balance History <i class="material-icons">show_chart</i>
                    </router-link>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" @click="$auth.logout()">
                      Logout <i class="material-icons">power_settings_new</i>
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <!-- Auth -->
          <div class="nav-right" v-if="!$auth.check()">
            <a class="nav-item" @click="$store.commit('openLoginModal')">Login</a>
            <span class="nav-item" @click="$store.commit('openRegisterModal')">
              <a class="button is-primary is-inverted">
                <span class="icon"><i class="material-icons">lock_open</i></span>
                <span>Register</span>
              </a>
            </span>
          </div>
        </div>
      </nav>
    </div>

    <!-- Search -->
    <div class="hero-body">
      <div class="container is-widescreen">
        <balance v-if="$auth.check()" :update="$store.state.update.balance"/>
        <search/>
      </div>
    </div>

    <!-- Modals -->
    <transition name="modal">
      <login v-if="$store.state.showLoginModal"/>
      <register v-if="$store.state.showRegisterModal"/>
    </transition>
  </section>
</template>

<style lang="sass" scoped>
  a.dropdown-item
    justify-content: space-between
</style>

<script>
  import Login from './Login'
  import Register from './Register'
  import Balance from '../User/Balance'
  import Search from './Search'

  export default {
    data () {
      return {
        isLoading: true,
        showLoginModal: false,
        showRegisterModal: false
      }
    },
    components: {
      Login, Register, Balance, Search
    },
    computed: {},
    watch: {},
    methods: {
      toggleMenu () {
        this.$emit('toggleMenu')
      }
    }
  }
</script>
