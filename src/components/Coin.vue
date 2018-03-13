<template>
  <div v-if="coin">
    <div class="card-header-title">
      <div class="is-flex">
        <figure class="image is-24x24 mr-1" v-if="coin.image">
          <img :src="coin.image">
        </figure>
        <span v-text="coin.name"></span>
        <a :href="coin.url" target="_blank" rel="noopener" class="button is-dark is-small ml-1" v-if="coin.url">
          <i class="material-icons">language</i>
          <span class="is-hidden-mobile" style="margin-left: 0.375rem">Website</span>
        </a>
        <a class="button is-dark is-small ml-1" @click="showWhitePaperModal = true" v-if="coin.whitePaperUrl">
          <i class="material-icons">receipt</i>
          <span class="is-hidden-mobile ml-0.5" style="margin-left: 0.375rem">White Paper</span>
        </a>
        <a class="button is-dark is-small ml-1" @click="showVideoModal = true" v-if="coin.videoUrl">
          <i class="material-icons">ondemand_video</i>
          <span class="is-hidden-mobile" style="margin-left: 0.375rem">Video</span>
        </a>
        <a class="button is-dark is-small ml-1" @click="showEditModal = true"
           v-if="$auth.check() && $store.state.user.isAdmin">
          <i class="material-icons">mode_edit</i>
          <span class="is-hidden-mobile" style="margin-left: 0.375rem">Edit</span>
        </a>
      </div>
      <toggle v-if="$auth.check()" :isChecked="isSaved" @enabled="toggleCoin" @disabled="toggleCoin"/>
    </div>

    <graph-stats :coin="coin"/>

    <graph :coin="coin"/>

    <blog :coin="coin" v-if="coin.blogFeedUrl"/>

    <transactions :coin="coin" v-if="isSaved"/>

    <transition name="modal">
      <edit-modal :coin="coin" v-if="showEditModal" @closeModal="showEditModal = false"/>
      <white-paper-modal :url="coin.whitePaperUrl"
                         v-if="coin.whitePaperUrl && showWhitePaperModal"
                         @closeModal="showWhitePaperModal = false"
      />
      <video-modal :url="coin.videoUrl"
                   v-if="coin.videoUrl && showVideoModal"
                   @closeModal="showVideoModal = false"
      />
    </transition>
  </div>
</template>

<script>
  import Blog from './Coin/Blog'
  import EditModal from './Coin/EditModal'
  import Graph from './Coin/Graph'
  import GraphStats from './Coin/GraphStats'
  import Transactions from './Coin/Transactions'
  import TransactionStats from './Coin/TransactionStats'
  import VideoModal from './Modal/VideoModal'
  import WhitePaperModal from './Modal/WhitePaperModal'

  export default {
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        isLoading: true,
        isSaved: false,
        coin: null,
        showEditModal: false,
        showVideoModal: false,
        showWhitePaperModal: false
      }
    },
    components: {
      Graph, GraphStats, Transactions, TransactionStats, Blog, EditModal, WhitePaperModal, VideoModal
    },
    computed: {},
    watch: {
      slug () {
        this.fetchCoin()
      }
    },
    methods: {
      fetchCoin () {
        this.isLoading = true
        this.axios.get(`/coins/${this.slug}`).then(response => {
          this.coin = response.data
          this.activeTab = 'Graph'
          this.isLoading = false
          if (this.$auth.check()) {
            this.isCoinSaved()
          }
        }).catch(error => {
          console.error(error.response)
          this.isLoading = false
        })
      },
      isCoinSaved () {
        this.axios.get(`/me/coins/${this.coin.id}`).then(response => {
          this.isSaved = response.data.isSaved
        }).catch(error => {
          console.error(error.response)
        })
      },
      toggleCoin () {
        const method = this.isSaved ? 'delete' : 'post'
        this.axios({ method, url: `/me/coins/${this.coin.id}` }).then(() => {
          this.isSaved = !this.isSaved
          this.$store.commit('update', 'coins')
          this.$store.commit('update', 'balance')
        }).catch(error => {
          console.error(error.response)
        })
      }
    },
    mounted () {
      this.fetchCoin()
    }
  }
</script>
