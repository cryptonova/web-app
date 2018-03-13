<template>
  <div class="card">
    <table class="table is-fullwidth" id="table">
      <thead>
      <tr>
        <th></th>
        <th>
          <span class="is-size-7 is-uppercase">Name</span>
        </th>
        <th class="is-hidden-mobile"></th>
        <th class="has-text-right">
          <span class="is-size-7 is-uppercase">Price</span>
        </th>
        <th class="has-text-right is-hidden-mobile">
          <span class="is-size-7 is-uppercase">All-Time High</span>
        </th>
        <th class="has-text-right is-hidden-mobile">
          <span class="is-size-7 is-uppercase">Market Cap</span>
        </th>
        <th class="has-text-right is-hidden-mobile">
          <span class="is-size-7 is-uppercase">Supply</span>
        </th>
        <th class="has-text-right is-hidden-mobile">
          <span class="is-size-7 is-uppercase">Volume (24 h)</span>
        </th>
        <th class="has-text-right">
          <span class="is-size-7 is-uppercase is-hidden-mobile">Change (24 h)</span>
          <span class="is-size-7 is-uppercase is-visible-mobile">24 h</span>
        </th>
        <th class="has-text-right is-hidden-mobile">
          <span class="is-size-7 is-uppercase">Change (7 d)</span>
        </th>
      </tr>
      </thead>
      <tbody v-if="hasCoins">
      <table-row v-for="coin in coins" :coin="coin" :key="coin.id"/>
      </tbody>
      <tfoot class="has-simple-pagination" v-if="hasCoins">
      <tr>
        <td colspan="10">
          <nav class="simple-pagination">
            <a class="button is-link is-uppercase is-semi-bold"
               @click="fetchPrevPage"
               :disabled="!prevPageUrl || isLoadingPreviousPage">
              <i class="material-icons">arrow_back</i>
            </a>
            <a class="button is-link is-uppercase is-semi-bold"
               @click="fetchNextPage"
               :disabled="!nextPageUrl || isLoadingNextPage">
              <i class="material-icons">arrow_forward</i>
            </a>
          </nav>
        </td>
      </tr>
      </tfoot>
    </table>
    <spinner :is-overlay="hasCoins" v-if="isLoading"/>
  </div>
</template>

<script>
  import TableRow from './TableRow'

  export default {
    data () {
      return {
        isLoading: true,
        isLoadingPreviousPage: false,
        isLoadingNextPage: false,
        coins: [],
        prevPageUrl: null,
        nextPageUrl: null
      }
    },
    components: {
      TableRow
    },
    watch: {
      '$route.query.page' (page) {
        if (typeof page === 'undefined') {
          this.fetchCoins('coins')
        }
      }
    },
    computed: {
      getPage () {
        return typeof this.$route.query.page !== 'undefined' ? this.$route.query.page : 0
      },
      hasCoins () {
        return this.coins.length > 0
      }
    },
    methods: {
      openLoginModal () {
        this.$emit('openLoginModal')
      },
      getColor (value) {
        return value > 0 ? 'has-text-success' : 'has-text-danger'
      },
      fetchPrevPage () {
        if (this.getPage > 0) {
          this.isLoading = true
          this.isLoadingPreviousPage = true
          this.fetchCoins(this.prevPageUrl)
        }
        document.getElementById('table').scrollIntoView({ behavior: 'smooth' })
      },
      fetchNextPage () {
        this.isLoading = true
        this.isLoadingNextPage = true
        this.fetchCoins(this.nextPageUrl)
        document.getElementById('table').scrollIntoView({ behavior: 'smooth' })
      },
      fetchCoins (url) {
        this.isLoading = true
        this.axios.get(url).then(response => {
          this.coins = response.data.coins
          this.prevPageUrl = response.data.pagination.prevPageUrl
          this.nextPageUrl = response.data.pagination.nextPageUrl
          this.isLoading = false
          this.isLoadingPreviousPage = false
          this.isLoadingNextPage = false
          this.$router.push({
            query: {
              page: response.data.pagination.page
            }
          })
        }).catch(error => {
          console.error(error)
          this.isLoading = false
        })
      },
      fetchData () {
        this.fetchCoins(`coins?page=${this.getPage}`)
      },
      addArrowNavigation (event) {
        if (event.key === 'ArrowLeft') {
          this.fetchPrevPage()
        }
        if (event.key === 'ArrowRight') {
          this.fetchNextPage()
        }
      }
    },
    mounted () {
      this.fetchData()
      document.addEventListener('keydown', this.addArrowNavigation)
    },
    beforeDestroy () {
      document.removeEventListener('keydown', this.addArrowNavigation)
    }
  }
</script>
