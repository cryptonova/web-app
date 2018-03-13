<template>
  <div class="mb-1">
    <div class="card-header-title">
      <span>Transactions</span>
      <button class="button is-primary is-small is-uppercase is-bold" @click="toggleModal">Create</button>
    </div>

    <div class="card">
      <div class="card-level-content">
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Amount</p>
              <p class="title is-size-4 is-size-6-mobile">{{ totalAmount | number }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Value</p>
              <p class="title is-size-4 is-size-6-mobile">{{ totalValue | currency }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Profit</p>
              <p class="title is-size-4 is-size-6-mobile">{{ totalProfit | currency }}</p>
            </div>
          </div>
        </div>
      </div>
      <table class="table is-fullwidth">
        <thead>
        <tr>
          <th>
            <span class="is-size-7 is-uppercase">When</span>
          </th>
          <th class="has-text-right">
            <span class="is-size-7 is-uppercase">Amount</span>
          </th>
          <th class="has-text-right">
            <span class="is-size-7 is-uppercase">Price</span>
          </th>
          <th class="has-text-right">
            <span class="is-size-7 is-uppercase">Cost</span>
          </th>
          <th class="has-text-right">
            <span class="is-size-7 is-uppercase">Profit</span>
          </th>
          <th width="1"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in transactions">
          <td class="has-overflow"><span class="tooltip is-tooltip-right" :data-tooltip="transaction.date">{{ transaction.date | relativeDate }}</span>
          </td>
          <td class="has-text-right">{{ transaction.amount }}</td>
          <td class="has-text-right">{{ transaction.price | currency }}</td>
          <td class="has-text-right">{{ transaction.cost | currency }}</td>
          <td class="has-text-right" :class="profitClass(transaction)">{{ profit(transaction) | currency }}</td>
          <td class="has-text-right">
            <a class="delete" @click="deleteTransaction(transaction)"></a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <transition name="modal">
      <div class="modal is-active" v-if="showModal">
        <div class="modal-background" @click="toggleModal"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Transaction</p>
            <button class="delete" @click="toggleModal"></button>
          </header>
          <section class="modal-card-body">
            <div class="notification is-danger" v-if="errorMessage">{{ errorMessage }}</div>
            <div class="field">
              <label class="label">Date</label>
              <div class="control has-icons-left">
                <input v-model="date" class="input" :class="errorClass('date')" type="datetime-local"
                       @change="fetchPrice">
                <span class="icon is-small is-left">
                  <i class="material-icons">today</i>
                </span>
                <p class="help is-danger" v-if="hasError('date')" v-text="firstError('date')"></p>
              </div>
            </div>
            <div class="field">
              <label class="label">Amount</label>
              <div class="control has-icons-left">
                <input v-model="amount" class="input" :class="errorClass('amount')" type="number">
                <span class="icon is-small is-left">
                  <i class="material-icons">plus_one</i>
                </span>
                <p class="help is-danger" v-if="hasError('amount')" v-text="firstError('amount')"></p>
              </div>
            </div>
            <div class="field">
              <label class="label">Price</label>
              <div class="control has-icons-left">
                <input v-model="price" class="input" :class="errorClass('price')" type="number">
                <span class="icon is-small is-left">
                  <i class="material-icons">attach_money</i>
                </span>
                <p class="help is-danger" v-if="hasError('price')" v-text="firstError('price')"></p>
              </div>
            </div>
            <div class="field">
              <label class="label">Cost</label>
              <div class="control has-icons-left">
                <input v-model="cost" class="input" :class="errorClass('cost')" type="number" readonly>
                <span class="icon is-small is-left">
                  <i class="material-icons">attach_money</i>
                </span>
                <p class="help is-danger" v-if="hasError('cost')" v-text="firstError('cost')"></p>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-link" @click="toggleModal">Cancel</button>
            <button class="button is-primary" :class="{'is-loading': inProgress }" :disabled="inProgress"
                    @click="storeTransaction">Create
            </button>
          </footer>
        </div>
      </div>
    </transition>
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
        isLoading: true,
        transactions: [],
        showModal: false,
        amount: 0,
        price: 0,
        cost: 0,
        date: null,
        timezone: null,
        errors: [],
        errorMessage: null,
        inProgress: false
      }
    },
    components: {},
    computed: {
      computedCost () {
        return this.amount * this.price
      },
      totalAmount () {
        const amounts = this.transactions.map(transaction => {
          return transaction.amount
        })

        return amounts.reduce((prevValue, currentValue) => prevValue + currentValue, 0)
      },
      totalValue () {
        return this.totalAmount * this.coin.price.usd
      },
      totalProfit () {
        let cost = this.transactions.map(transaction => {
          return transaction.cost
        })

        cost = cost.reduce((prevValue, currentValue) => prevValue + currentValue, 0)

        return this.totalValue - cost
      }
    },
    watch: {
      coin () {
        this.fetchData()
      },
      amount () {
        this.cost = this.computedCost
      },
      price () {
        this.cost = this.computedCost
      }
    },
    methods: {
      profit (transaction) {
        return (this.coin.price.usd * transaction.amount) - transaction.cost
      },
      profitClass (transaction) {
        if (this.profit(transaction) > 0) {
          return 'has-text-success'
        }
        if (this.profit(transaction) < 0) {
          return 'has-text-danger'
        }
      },
      transactionClass (transaction) {
        return transaction.amount > 0 ? 'has-text-success' : 'has-text-danger'
      },
      hasError (field) {
        return typeof this.errors[field] !== 'undefined'
      },
      firstError (field) {
        return this.errors[field][0]
      },
      errorClass (field) {
        return this.hasError(field) ? 'is-danger' : null
      },
      toggleModal () {
        this.showModal = !this.showModal
      },
      storeTransaction () {
        this.inProgress = true
        this.axios.post(`coins/${this.coin.slug}/transactions`, {
          amount: parseFloat(this.amount),
          price: parseFloat(this.price),
          cost: parseFloat(this.cost),
          date: this.date
        }).then(() => {
          this.amount = null
          this.price = null
          this.cost = null
          this.inProgress = false
          this.fetchTransactions()
          this.toggleModal()
          this.$store.commit('update', 'balance')
        }).catch(error => {
          console.error(error.response)
          this.errors = error.response.data.errors
          this.errorMessage = error.response.data.message
          this.inProgress = false
        })
      },
      fetchTransactions () {
        this.axios.get(`me/coins/${this.coin.id}/transactions`).then(response => {
          this.transactions = response.data
        }).catch(error => {
          console.error(error.response)
        })
      },
      deleteTransaction (transaction) {
        this.axios.delete(`transactions/${transaction.id}`).then(() => {
          this.fetchTransactions()
          this.$store.commit('update', 'balance')
        }).catch(error => {
          console.error(error.response)
        })
      },
      fetchPrice () {
        this.axios.get(`coins/${this.coin.slug}/prices?date=${this.date}${this.timezone}`).then(response => {
          this.price = response.data.usd
        }).catch(error => {
          console.error(error.response)
        })
      },
      fetchData () {
        this.fetchTransactions()
        this.fetchPrice()
      }
    },
    mounted () {
      this.date = window.moment().format('YYYY-MM-DDTHH:mm:ss')
      this.timezone = window.moment().format('ZZ')
      this.fetchData()
    }
  }
</script>
