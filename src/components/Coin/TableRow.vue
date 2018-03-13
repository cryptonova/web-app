<template>
  <tr v-if="coin">
    <td>
      <figure class="image is-32x32">
        <span class="badge" v-text="coin.rank"></span>
        <img :src="coin.image" v-if="coin.image">
      </figure>
    </td>
    <td>
      <router-link :to="`/${coin.slug}`" v-text="coin.name"/>
      <p class="is-size-7" v-text="coin.ticker"></p>
    </td>
    <td class="has-text-right is-hidden-mobile pr-0">
      <a class="is-flex align-center has-no-underline" v-if="coin.videoUrl" @click="showVideoModal = true">
        <i class="material-icons">ondemand_video</i>
      </a>
      <a class="is-flex align-center has-no-underline" v-if="coin.whitePaperUrl"
         @click="showWhitePaperModal = true">
        <i class="material-icons">receipt</i>
      </a>
    </td>
    <td class="has-text-right">
      {{ coin.price.usd | currency }}
      <progress ref="progress"
                class="progress is-small"
                :class="getProgressClass"
                :value="coin.price.ath.percentage"
                :max="100"
                v-text="coin.price.ath.percentage"
                :title="`${coin.price.ath.percentage}% of All-Time High`">
      </progress>
    </td>
    <td class="has-text-right is-hidden-mobile">
      {{ coin.price.ath.usd | currency }}
    </td>
    <td class="has-text-right is-hidden-mobile">
      {{ coin.marketCap.usd | currency }}
    </td>
    <td class="has-text-right is-hidden-mobile">
      {{ coin.supply.available | number }}
    </td>
    <td class="has-text-right is-hidden-mobile">
      {{ coin.price.volume['1d'] | currency }}
    </td>
    <td class="has-text-right" :class="getColor(coin.price.change['1d'])">
      {{ coin.price.change['1d'] }}%
    </td>
    <td class="has-text-right is-hidden-mobile" :class="getColor(coin.price.change['1w'])">
      {{ coin.price.change['1w'] }}%
    </td>
    <transition name="modal">
      <white-paper-modal :url="coin.whitePaperUrl"
                         v-if="coin.whitePaperUrl && showWhitePaperModal"
                         @closeModal="showWhitePaperModal = false"
      />
      <video-modal :url="coin.videoUrl"
                   v-if="coin.videoUrl && showVideoModal"
                   @closeModal="showVideoModal = false"
      />
    </transition>
  </tr>
</template>

<script>
  import VideoModal from './../Modal/VideoModal'
  import WhitePaperModal from './../Modal/WhitePaperModal'

  export default {
    props: ['coin'],
    data () {
      return {
        isLoading: true,
        showVideoModal: false,
        showWhitePaperModal: false
      }
    },
    components: {
      WhitePaperModal, VideoModal
    },
    computed: {
      getProgressClass () {
        if (this.coin.price.change['1h'] < 0) {
          return 'is-danger'
        }
        if (this.coin.price.change['1h'] > 0) {
          return 'is-success'
        }
      }
    },
    filters: {
      flipDollarSign (value) {
        return value.replace('$-', '-$')
      }
    },
    methods: {
      getColor (value) {
        return value > 0 ? 'has-text-success' : 'has-text-danger'
      }
    },
    mounted () {
      this.$refs.progress.style.opacity = (Math.abs(this.coin.price.change['1d'] * 3) / 100) + 0.7
    }
  }
</script>
