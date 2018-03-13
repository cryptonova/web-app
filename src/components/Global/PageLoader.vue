<template>
  <div class="pageloader" :class="{ 'is-active': isLoading }"></div>
</template>

<script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
