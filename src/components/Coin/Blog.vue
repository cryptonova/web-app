<template>
  <div>
    <div class="card-header-title">
      <span>Blog</span>
    </div>
    <div class="card">
      <spinner v-if="isLoading"/>
      <div class="box is-shadowless" v-for="item in items" v-if="!isLoading">
        <blog-item :item="item"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .box {
    margin-bottom: 0;
    border-radius: 0;
    background: none;
    border-bottom: 1px solid #eeeeee;
  }
</style>

<script>
  import BlogItem from './BlogItem'

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
        items: []
      }
    },
    components: {
      BlogItem
    },
    computed: {},
    watch: {
      coin () {
        this.fetchItems()
      }
    },
    methods: {
      fetchItems () {
        this.isLoading = true
        this.axios.get(`/coins/${this.coin.slug}/feed`).then(response => {
          this.items = response.data
          this.isLoading = false
        }).catch(error => {
          console.error(error.response)
          this.links = []
          this.isLoading = false
        })
      }
    },
    mounted () {
      this.fetchItems()
    }
  }
</script>
