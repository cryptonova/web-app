<template>
  <div class="card-content">
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Holdings</p>
          <p class="title is-size-6">{{ totalAmount }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Total Value</p>
          <p class="title is-size-6">{{ totalValue | currency }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Profit</p>
          <p class="title is-size-6">{{ totalProfit | currency }}</p>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>

</style>

<script>
  export default {
    props: ['coin'],
    data () {
      return {
        isLoading: true,
        totalAmount: 0,
        totalValue: 0,
        totalProfit: 0
      }
    },
    components: {},
    computed: {},
    methods: {
      fetchHoldings () {
        this.axios.get(`/coins/${this.coin.id}/holdings`)
          .then(response => {
            this.totalAmount = response.data.total_amount
            this.totalValue = response.data.total_value
            this.totalProfit = response.data.total_profit
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    mounted () {
      this.fetchHoldings()
    }
  }
</script>
