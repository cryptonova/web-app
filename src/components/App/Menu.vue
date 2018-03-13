<template>
  <div>
    <div class="menu-backdrop" :class="{ 'is-active': $parent.showMenu }" @click="closeMenu"></div>
    <aside class="menu" :class="{ 'is-active': $parent.showMenu }">
      <div class="card">
        <p class="menu-label">
          Portfolio
          <toggle :isChecked="$store.state.showDetailedPortfolioView"
                  @enabled="toggleDetailedView"
                  @disabled="toggleDetailedView"
          />
        </p>
        <ul class="menu-list">
          <li v-for="coin in coins" @click="closeMenu">
            <router-link :to="coin.slug">
              <p class="is-flex align-center">
                <img :src="coin.image" v-if="coin.image" width="20" height="20" class="mr-1">
                <span class="has-ellipsis" v-text="coin.name"></span>
              </p>
              <p class="is-size-7 is-bold" :class="getColor(coin)">
                {{ coin.price.change['1d'] }}%
              </p>
            </router-link>
            <ul class="menu-list-details" v-if="$store.state.showDetailedPortfolioView">
              <li class="is-flex justify-between">
                <span>Price</span>
                <span>{{ coin.price.usd | currency }}</span>
              </li>
              <li class="is-flex justify-between">
                <span>Amount</span>
                <span>{{ coin.amount | number }}</span>
              </li>
              <li class="is-flex justify-between">
                <span>Value</span>
                <span>{{ coin.value | currency }}</span>
              </li>
            </ul>
          </li>
        </ul>
        <spinner v-if="isLoading"/>
      </div>
    </aside>
  </div>
</template>

<style>

</style>

<script>
  export default {
    props: ['update'],
    data () {
      return {
        isLoading: true,
        coins: []
      }
    },
    watch: {
      update () {
        this.fetchCoins()
      }
    },
    methods: {
      toggleDetailedView () {
        this.$store.commit('toggleDetailedPortfolioView')
      },
      closeMenu () {
        this.$emit('closeMenu')
      },
      getColor (coin) {
        const priceChange = coin.price.change['1d']

        if (priceChange > 0) {
          return 'has-text-success'
        }

        if (priceChange < 0) {
          return 'has-text-danger'
        }
      },
      fetchCoins () {
        this.axios.get('me/coins').then(response => {
          this.coins = response.data
          this.isLoading = false
        }).catch(error => {
          console.error(error.response)
          this.isLoading = false
        })
      }
    },
    mounted () {
      this.fetchCoins()
    }
  }
</script>
