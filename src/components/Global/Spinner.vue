<template>
    <div class="spinner" :class="{ 'is-overlay': isOverlay }">
      <vue-simple-spinner line-fg-color="#125A63"/>
    </div>
</template>

<style scoped lang="sass">
    .spinner
        display: flex
        justify-content: center
        align-items: center
        padding: 1.5rem

    .is-overlay
        background: rgba(255, 255, 255, 0.75)
        position: absolute
        top: 3.25rem
        bottom: 3.25rem
        left: 0
        right: 0
        display: flex
        justify-content: center
        align-items: center
        z-index: 4
</style>

<script>
  import Spinner from 'vue-simple-spinner'

  export default {
    props: {
      isOverlay: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    components: {
      'vue-simple-spinner': Spinner
    }
  }
</script>
