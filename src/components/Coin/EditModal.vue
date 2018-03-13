<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head"></header>
      <form @submit.prevent="submit">
        <section class="modal-card-body">
          <div class="field">
            <label class="label" for="url">URL</label>
            <div class="control">
              <input id="url" v-model="url" class="input" type="url" :class="errorClass('url')">
              <p class="help is-danger" v-if="hasError('url')" v-text="firstError('url')"></p>
              <a class="help" v-if="!url" :href="urlHelperLink" target="_blank" rel="noopener">
                https://coinmarketcap.com
              </a>
            </div>
          </div>
          <div class="field">
            <label class="label" for="whitePaperUrl">White Paper URL</label>
            <div class="control">
              <input id="whitePaperUrl" v-model="whitePaperUrl" class="input" type="url"
                     :class="errorClass('whitePaperUrl')">
              <p class="help is-danger" v-if="hasError('whitePaperUrl')" v-text="firstError('whitePaperUrl')"></p>
              <a class="help" v-if="!whitePaperUrl" :href="whitePaperHelperLink" target="_blank" rel="noopener">
                https://google.com
              </a>
            </div>
          </div>
          <div class="field">
            <label class="label" for="videoUrl">Video URL</label>
            <div class="control">
              <input id="videoUrl" v-model="videoUrl" class="input" type="url" :class="errorClass('videoUrl')">
              <p class="help is-danger" v-if="hasError('videoUrl')" v-text="firstError('videoUrl')"></p>
              <a class="help" :href="videoHelperLink" target="_blank" rel="noopener" v-text="videoHelperQuery"></a>
            </div>
          </div>
          <div class="field">
            <label class="label" for="blogFeedUrl">RSS Feed URL</label>
            <div class="control">
              <input id="blogFeedUrl" v-model="blogFeedUrl" class="input" type="url" :class="errorClass('blogFeedUrl')">
              <p class="help is-danger" v-if="hasError('blogFeedUrl')" v-text="firstError('blogFeedUrl')"></p>
              <a class="help" v-if="!blogFeedUrl" :href="blogFeedHelperLink" target="_blank" rel="noopener">
                https://google.com
              </a>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-link" type="button" @click="closeModal">Cancel</button>
          <button class="button is-primary" :class="buttonClass" :disabled="isLoading">Update</button>
        </footer>
      </form>
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
        isLoading: false,
        errors: {},
        url: null,
        whitePaperUrl: null,
        blogFeedUrl: null,
        videoUrl: null
      }
    },
    computed: {
      buttonClass () {
        return this.isLoading ? 'is-loading' : null
      },
      urlHelperLink () {
        return `https://coinmarketcap.com/currencies/${this.coin.slug}`
      },
      whitePaperHelperLink () {
        return `https://www.google.com/search?q="${this.coin.name}"+"whitepaper+OR+white+paper"`
      },
      videoHelperQuery () {
        return `"${this.coin.name}"+presentation+OR+talk+OR+speech+OR+meetup&sp=CAASBBgCIAE%253D`
      },
      videoHelperLink () {
        return `https://www.youtube.com/results?search_query=${this.videoHelperQuery}`
      },
      blogFeedHelperLink () {
        return `https://www.google.com/search?q="${this.coin.name}"+rss+feed`
      }
    },
    methods: {
      hasError (label) {
        return typeof this.errors[label] !== 'undefined'
      },
      firstError (label) {
        return this.errors[label][0]
      },
      errorClass (label) {
        return this.hasError(label) ? 'is-danger' : null
      },
      closeModal () {
        this.$emit('closeModal')
      },
      submit () {
        this.isLoading = true

        const body = {
          url: this.url,
          whitePaperUrl: this.whitePaperUrl,
          blogFeedUrl: this.blogFeedUrl,
          videoUrl: this.videoUrl
        }

        this.axios.patch(`coins/${this.coin.slug}`, body).then(() => {
          this.isLoading = false
          this.closeModal()
        }).catch(error => {
          console.error(error.response)
          this.errors = error.response.data.errors
          this.isLoading = false
        })
      }
    },
    mounted () {
      this.url = this.coin.url
      this.whitePaperUrl = this.coin.whitePaperUrl
      this.blogFeedUrl = this.coin.blogFeedUrl
      this.videoUrl = this.coin.videoUrl
    }
  }
</script>

<style scoped>

</style>
