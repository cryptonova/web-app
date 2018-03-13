<template>
  <div class="card mb-1">
    <div class="card-level-content">
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Price</p>
            <p class="title is-size-4 is-size-6-mobile">{{ coin.price.usd | currency }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">All-Time High</p>
            <p class="title is-size-4 is-size-6-mobile">{{ coin.price.ath.usd | currency }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Market Cap</p>
            <p class="title is-size-4 is-size-6-mobile">{{ coin.marketCap.usd | currency }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      coin: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        isLoading: true
      }
    }
  }
</script>
