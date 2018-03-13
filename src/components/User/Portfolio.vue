<template>
  <div>
    <div class="card-header-title">
      <p class="is-flex has-text-white">
        <i class="material-icons mr-1">insert_chart</i> Portfolio
      </p>
      <toggle :isChecked="shouldRenderPieChart" @enabled="togglePieChart" @disabled="togglePieChart" label="Pie Chart"/>
    </div>
    <div class="card has-overflow">
      <div class="notification is-size-7" v-if="unit === ' ppm'">
        One part per million (<strong>ppm</strong>) is equivalent to
        <strong class="tooltip" data-tooltip="1% = 10,000 ppm">0.0001%</strong> of
        a coin's supply or market cap.
      </div>
      <div class="card-content" :class="{ 'has-pie-chart': shouldRenderPieChart }">
        <chart :labels="labels" :values="values" :colors="colors" :unit="unit" :height="chartHeight"
               v-if="!isLoading && !shouldRenderPieChart"/>
        <pie-chart :labels="labels" :values="values" :colors="colors" v-if="!isLoading && shouldRenderPieChart"/>
        <spinner v-if="isLoading"/>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="showPercentageOf('value')" :class="{'is-active': source === 'value'}">% of
          Value</a>
        <a class="card-footer-item" @click="showPercentageOf('profit')" :class="{'is-active': source === 'profit'}">% of
          Profit</a>
        <a class="card-footer-item" @click="showPercentageOf('marketCap')"
           :class="{'is-active': source === 'marketCap'}">PPM of Market Cap</a>
        <a class="card-footer-item" @click="showPercentageOf('totalSupply')"
           :class="{'is-active': source === 'totalSupply'}">PPM of Supply</a>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card-header-title {
    justify-content: space-between
  }

  .card-footer {
    overflow-x: auto
  }

  .card-footer-item {
    white-space: nowrap
  }

  .has-pie-chart {
    height: 50vmax;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 100%;
      height: 100%;
    }
  }

  .notification {
    margin-bottom: 0;
  }
</style>

<script>
  import Chart from './../Charts/Portfolio'
  import PieChart from './../Charts/Portfolio.PieChart'

  export default {
    data () {
      return {
        isLoading: true,
        coins: [],
        source: 'value',
        shouldRenderPieChart: false
      }
    },
    components: {
      Chart, PieChart
    },
    computed: {
      derivedSource () {
        if (this.source === 'value') {
          return 'percentageOfValue'
        }
        if (this.source === 'profit') {
          return 'percentageOfProfit'
        }
        if (this.source === 'marketCap') {
          return 'ppmOfMarketCap'
        }
        if (this.source === 'totalSupply') {
          return 'ppmOfTotalSupply'
        }
      },
      unit () {
        if (this.source === 'value' || this.source === 'profit') {
          return '%'
        }
        if (this.source === 'marketCap' || this.source === 'totalSupply') {
          return ' ppm'
        }
      },
      filteredCoins () {
        let filteredCoins

        if (this.shouldRenderPieChart) {
          filteredCoins = this.coins.filter(coin => coin[this.derivedSource] > 0)
        } else {
          filteredCoins = this.coins
        }

        return filteredCoins.sort(this.compare).reverse()
      },
      labels () {
        return this.filteredCoins.map(coin => `${coin.name} (${coin[this.derivedSource]}${this.unit})`)
      },
      values () {
        return this.filteredCoins.map(coin => coin[this.derivedSource])
      },
      colors () {
        return this.filteredCoins.map(coin => coin.hexColor ? coin.hexColor : '#125A63')
      },
      chartHeight () {
        return this.filteredCoins.length * 40
      }
    },
    watch: {},
    methods: {
      showPercentageOf (source) {
        this.source = source
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      },
      compare (a, b) {
        return a[this.derivedSource] === b[this.derivedSource] ? 0 : +(a[this.derivedSource] > b[this.derivedSource]) || -1
      },
      togglePieChart () {
        this.shouldRenderPieChart = !this.shouldRenderPieChart
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      },
      fetchData () {
        this.axios.get('/me/portfolio').then(response => {
          this.coins = response.data
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
