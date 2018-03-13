<template>
  <div class="level is-mobile">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading has-text-shadow">Total Value</p>
        <p class="title is-size-6-mobile has-text-shadow">
          <count-up
            :startVal="startValue"
            :endVal="value"
            :decimals="2"
            :duration="2.5"
            :options="options"
            :callback="valueCallback"
          />
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading has-text-shadow">Total Profit</p>
        <p class="title is-size-6-mobile has-text-shadow">
          <count-up
            :startVal="startProfit"
            :endVal="profit"
            :decimals="2"
            :duration="2.5"
            :options="options"
            :callback="profitCallback"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import CountUp from 'vue-countup-v2'

  export default {
    props: {
      update: {
        type: Number,
        required: false
      }
    },
    data () {
      return {
        startValue: 0,
        startProfit: 0,
        value: 0,
        profit: 0,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '$',
          suffix: ''
        },
        timeout: null
      }
    },
    components: {
      CountUp
    },
    computed: {},
    watch: {
      update () {
        this.fetchBalance()
      }
    },
    methods: {
      fetchBalance () {
        this.axios.get('me/balance').then(response => {
          this.value = response.data.value
          this.profit = response.data.profit
        }).catch(error => {
          console.error(error.response)
        })
      },
      valueCallback (event) {
        this.startValue = event.endVal
      },
      profitCallback (event) {
        this.startProfit = event.endVal
      }
    },
    mounted () {
      this.fetchBalance()
    }
  }
</script>
