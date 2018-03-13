<template>
    <div class="switch-container">
        <span v-text="label"></span>
        <input :id="id" type="checkbox" class="switch" :class="sizeClass" :checked="isChecked">
        <label @click="toggle" :for="id"></label>
    </div>
</template>

<style scoped>
    .switch-container {
        display: flex;
        height: 1.5rem;
        min-width: 3rem;
        max-width: 100%;
    }
    span {
        color: white;
        margin-right: 1rem;
    }
</style>

<script>
  export default {
    props: ['isChecked', 'size', 'label'],
    data () {
      return {}
    },
    components: {},
    computed: {
      id () {
        return this._uid
      }
    },
    watch: {},
    methods: {
      sizeClass () {
        if (this.size) {
          return `is-${this.size}`
        }
      },
      toggle () {
        // console.log(this.isChecked)
        if (this.isChecked) {
          this.$emit('disabled')
        } else {
          this.$emit('enabled')
        }
      }
    }
  }
</script>
