<template>
  <div>
    <page-loader :is-loading="!$auth.ready()"/>
    <div v-if="$auth.ready()">
      <app-menu v-if="$auth.check()" :update="$store.state.update.coins" @closeMenu="showMenu = false"/>
      <main class="main" :class="{ 'is-centered': $auth.check() }">
        <app-hero @toggleMenu="showMenu = !showMenu"/>
        <div class="container is-widescreen">
          <transition name="slide-up" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../assets/sass/app";
</style>

<script>
  import AppFooter from './App/Footer'
  import AppHero from './App/Hero'
  import AppMenu from './App/Menu'
  import PageLoader from './Global/PageLoader'

  export default {
    data () {
      return {
        isLoading: true,
        showMenu: false
      }
    },
    components: {
      AppHero, AppMenu, AppFooter, PageLoader
    }
  }
</script>
