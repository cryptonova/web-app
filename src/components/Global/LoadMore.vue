<template>
    <div>
        <vue-simple-spinner v-if="isLoading && !noMorePages"></vue-simple-spinner>
    </div>
</template>

<style>

</style>

<script>
  import inViewport from 'vue-in-viewport-mixin'
  import Spinner from 'vue-simple-spinner'

  export default {
    mixins: [inViewport],
    props: ['noMorePages'],
    data() {
      return {
        isLoading: true,
        isVisible: false,
        color: '#125A63',
      }
    },
    components: {
      Spinner
    },
    computed: {},
    watch: {
      'inViewport.now': function (isVisible) {
        this.isLoading = isVisible
//        this.isVisible = isVisible
        // console.log('inViewport', isVisible)
        if (isVisible) {
          this.$emit('loadMore')
        }
      }
    },
    methods: {},
    mounted() {

    },
    created() {
    }
  }
</script>
