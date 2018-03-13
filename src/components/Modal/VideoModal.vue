<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <iframe width="640" height="360" :src="iFrameUrl" frameborder="0" allowfullscreen></iframe>
    </div>
    <button class="modal-close is-large" @click="closeModal"></button>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        required: true
      }
    },
    computed: {
      iFrameUrl () {
        const parser = document.createElement('a')
        parser.href = this.url

        const hostname = parser.hostname

        if (hostname === 'www.youtube.com') {
          const id = parser.search.split('v=')[1]

          return `https://www.youtube.com/embed/${id}?rel=0`
        }

        if (hostname === 'vimeo.com') {
          const id = parser.pathname

          return `https://player.vimeo.com/video${id}`
        }
      }
    },
    methods: {
      closeModal () {
        this.$emit('closeModal')
      }
    },
    mounted () {
      console.log(this.iFrameUrl)
    }
  }
</script>

<style scoped>
  iframe {
    max-width: 90vw;
  }
</style>
