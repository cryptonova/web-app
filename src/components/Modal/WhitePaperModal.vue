<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content has-pdf">
      <iframe class="is-visible-mobile" width="100%" height="100%" :src="mobileUrl" frameborder="0" allowfullscreen></iframe>
      <iframe class="is-hidden-mobile" width="100%" height="100%" :src="url" frameborder="0" allowfullscreen></iframe>
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
      mobileUrl () {
        return `https://docs.google.com/viewer?url=${this.url}&embedded=true`
      }
    },
    methods: {
      closeModal () {
        this.$emit('closeModal')
      }
    }
  }
</script>

<style scoped>
  .modal-content.has-pdf {
    width: 800px;
    max-width: 90vw;
    height: 1000px;
    max-height: 70vh
  }
</style>
