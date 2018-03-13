<template>
  <div class="field">
    <div class="control" :class="{ 'is-loading': isLoading }">
      <input v-model="query" class="input" :class="{ 'has-no-bottom-radius': coins.length }" type="text"
             placeholder="Search..." @keydown="select">
    </div>
    <ul>
      <li v-for="(coin, index) in coins">
        <div class="box" @click="goTo(coin.slug)" :class="{ 'is-selected': index === selectedIndex }">
          <div class="media">
            <div class="media-left">
              <figure class="image is-32x32">
                <img :src="coin.image">
              </figure>
            </div>
            <div class="media-content">
              <p class="is-size-6 is-medium-bold" v-text="coin.name">BCH</p>
              <p class="is-size-7" v-text="coin.ticker">BCH</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped type="scss">
  .field {
    position: relative;
  }

  ul {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1;
  }

  ul li:last-child .box {
    border-bottom-left-radius: 3px !important;
    border-bottom-right-radius: 3px !important;
  }

  .input[type="text"] {
    border: none !important;
    border-radius: 3px;
    height: 3rem;
    padding: 0 1rem;
  }

  .control.is-loading::after {
    height: 1.25rem;
    width: 1.25rem;
    right: 1rem;
    top: calc((3.25rem - 1.25rem) / 2);
  }

  ::placeholder {
    color: hsl(0, 0%, 48%)
  }

  .has-no-bottom-radius {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .box {
    padding: 0.625rem;
    border-radius: 0;
  }

  .box:hover, .box.is-selected {
    background: whitesmoke;
    cursor: pointer;
  }

  .box .media {
    align-items: center;
  }
</style>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        isLoading: false,
        query: '',
        coins: [],
        selectedIndex: 0
      }
    },
    watch: {
      query (value, oldValue) {
        value = value.trim()
        oldValue = oldValue.trim()

        if (value.length < 1) {
          this.coins = []
        } else {
          if (value !== oldValue) {
            this.isLoading = true
            this.search()
          }
        }
      }
    },
    methods: {
      search: _.debounce(function () {
        const query = this.query.trim()

        if (query.length > 0) {
          this.axios.get(`coins/search?query=${this.query}`).then(response => {
            this.coins = response.data
            this.isLoading = false
          }).catch(error => {
            console.error(error)
            this.isLoading = false
          })
        } else {
          this.isLoading = false
        }
      }, 300),
      select (event) {
        const key = event.key

        if (key === 'Escape') {
          this.reset()
        }

        if (key === 'ArrowDown') {
          if (this.coins.length - 1 > this.selectedIndex) {
            this.selectedIndex = this.selectedIndex + 1
          }
        }

        if (key === 'ArrowUp') {
          if (this.selectedIndex > 0) {
            this.selectedIndex = this.selectedIndex - 1
          }
        }

        if (key === 'Enter') {
          const selectedCoin = this.coins[this.selectedIndex]
          if (typeof selectedCoin !== 'undefined') {
            this.goTo(selectedCoin.slug)
          } else {
            this.isLoading = false
          }
        }
      },
      goTo (slug) {
        this.reset()
        this.$router.push(slug)
      },
      reset () {
        this.query = ''
        this.coins = []
        this.selectedIndex = 0
      }
    }
  }
</script>
