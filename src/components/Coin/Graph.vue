<template>
  <div class="mb-1">
    <div class="card-header-title">
      <span>Price</span>
      <div>
        <button class="button is-small is-uppercase is-bold" :class="getClass(1)" @click="days = 1">Day</button>
        <button class="button is-small is-uppercase is-bold" :class="getClass(7)" @click="days = 7">Week</button>
        <button class="button is-small is-uppercase is-bold" :class="getClass(30)" @click="days = 30">Month</button>
        <button class="button is-small is-uppercase is-bold" :class="getClass(365)" @click="days = 365">Year</button>
      </div>
    </div>
    <div class="card">
      <div class="card-level-content pb-0">
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Change (Hour)</p>
              <p class="title is-size-4 is-size-6-mobile" :class="changeClass(coin.price.percentChange1h)">
                {{ coin.price.percentChange1h }}%
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Change (Day)</p>
              <p class="title is-size-4 is-size-6-mobile" :class="changeClass(coin.price.percentChange1d)">
                {{ coin.price.percentChange1d }}%
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Change (Week)</p>
              <p class="title is-size-4 is-size-6-mobile" :class="changeClass(coin.price.percentChange1w)">
                {{ coin.price.percentChange1w }}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content has-fixed-height">
        <spinner v-if="isLoading"/>
        <chart :labels="labels" :prices="prices" v-if="!isLoading"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .has-fixed-height {
    height: 35vh;
    display: flex;
    justify-content: center;
    align-items: stretch;
    div {
      width: 100%
    }
  }
  .is-transparent {
    color: whitesmoke;
  }
</style>

<script>
  import Chart from '../Charts/Price'

  export default {
    props: {
      coin: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        labels: [],
        prices: [],
        isLoading: true,
        color: '#125A63',
        days: 30
      }
    },
    components: {
      Chart
    },
    computed: {},
    watch: {
      coin () {
        this.fetchData()
      },
      days () {
        this.fetchData()
      }
    },
    methods: {
      getClass (days) {
        return this.days === days ? 'is-primary' : 'is-transparent'
      },
      changeClass (change) {
        if (change > 0) {
          return 'has-text-success'
        }

        if (change < 0) {
          return 'has-text-danger'
        }

        return 'has-text-white'
      },
      fetchData () {
        this.isLoading = true
        this.axios.get(`/coins/${this.coin.slug}/prices?days=${this.days}`).then(response => {
          this.labels = response.data.map(data => data.date)
          this.prices = response.data.map(data => data.usd)
          this.isLoading = false
        }).catch(error => {
          console.error(error.response)
          this.isLoading = false
        })
      }
    },
    mounted () {
      this.fetchData()
    }
  }
</script>
