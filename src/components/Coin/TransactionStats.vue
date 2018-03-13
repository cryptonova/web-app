<template>
  <div class="level is-mobile mt-1">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Amount</p>
        <p class="title is-size-4 is-size-6-mobile">{{ amount }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Value</p>
        <p class="title is-size-4 is-size-6-mobile">{{ value | currency }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Profit</p>
        <p class="title is-size-4 is-size-6-mobile" :class="changeClass(profit)">{{ profit | currency }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['coin', 'update'],
    data () {
      return {
        isLoading: true,
        amount: null,
        value: null,
        profit: null
      }
    },
    components: {},
    computed: {},
    watch: {
      update () {
        this.fetchData()
      },
      coin () {
        this.fetchData()
      }
    },
    methods: {
      changeClass (change) {
        if (change > 0) {
          return 'has-text-success'
        }

        if (change < 0) {
          return 'has-text-danger'
        }
      },
      fetchData () {
        this.axios.get(`/me/coins/${this.coin.id}`)
          .then(response => {
            this.amount = response.data.total_amount
            this.value = response.data.total_value
            this.profit = response.data.total_profit
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    mounted () {
      this.fetchData()
    },
    created () {
    }
  }
</script>
