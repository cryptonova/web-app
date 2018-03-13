<template>
  <div>
    <div class="card-header-title has-text-white">
      <p class="is-flex">
        <i class="material-icons mr-1">show_chart</i> Balance
      </p>
      <div>
        <button class="button is-small is-uppercase is-bold has-text-white" :class="getClass(7)" @click="days = 7">Week</button>
        <button class="button is-small is-uppercase is-bold has-text-white" :class="getClass(30)" @click="days = 30">Month</button>
        <button class="button is-small is-uppercase is-bold has-text-white" :class="getClass(365)" @click="days = 365">Year</button>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <balance-chart :labels="labels" :value="value" :profits="profits" v-if="!isLoading"/>
      </div>
    </div>
  </div>
</template>

<script>
  import BalanceChart from './../Charts/Balance'

  export default {
    data () {
      return {
        isLoading: true,
        dataPoints: [],
        days: 30
      }
    },
    components: {
      BalanceChart
    },
    watch: {
      days () {
        this.fetchData()
      }
    },
    computed: {
      labels () {
        return this.dataPoints.map(dataPoint => this.$options.filters.localDateTime(dataPoint.date)).reverse()
      },
      value () {
        return this.dataPoints.map(dataPoint => dataPoint.value).reverse()
      },
      profits () {
        return this.dataPoints.map(dataPoint => dataPoint.profit).reverse()
      }
    },
    methods: {
      fetchData () {
        this.isLoading = true
        this.axios.get(`me/balance/history?days=${this.days}`).then(response => {
          this.dataPoints = response.data
          this.isLoading = false
        }).catch(error => {
          console.log(error.response)
          this.isLoading = false
        })
      },
      getClass (days) {
        return this.days === days ? 'is-primary' : 'is-transparent'
      }
    },
    mounted () {
      this.fetchData()
    }
  }
</script>
