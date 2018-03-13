<template>
  <footer class="footer" :class="{ 'is-pushed-by-menu': $auth.check() }">
    <div class="container">
      <div class="content has-text-centered">
        <a class="is-size-4 has-text-white" v-for="link in links" :href="link.url" v-html="link.icon"
           target="_blank" rel="noopener"></a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  a {
    margin: 0 0.5rem;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        links: [
          {
            icon: '<i class="fab fa-github"></i>',
            url: 'https://github.com/cryptonova'
          },
          {
            icon: '<i class="fab fa-reddit"></i>',
            url: 'https://www.reddit.com/r/cryptonova/'
          }
        ]
      }
    },
    methods: {
      fetchDonationAddresses () {
        // this.axios.get('donations')
      }
    },
    mounted () {
      // this.fetchDonationAddresses()
    }
  }
</script>
