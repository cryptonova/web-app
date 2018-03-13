<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head"></header>
      <form @submit.prevent="submit">
        <section class="modal-card-body">
          <div class="notification is-danger" v-if="errorMessage" v-text="errorMessage"></div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
                            <span class="icon is-small is-left">
                                <i class="material-icons">mail</i>
                            </span>
              <input v-model="email" class="input" :class="addErrorClass('email')" type="email" placeholder="Email"
                     autofocus>
            </div>
            <p class="help is-danger" v-if="hasError('email')" v-text="firstError('email')"></p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
                            <span class="icon is-small is-left">
                                <i class="material-icons">vpn_key</i>
                            </span>
              <input v-model="password" class="input" :class="addErrorClass('password')" type="password"
                     placeholder="Password">
            </div>
            <p class="help is-danger" v-if="hasError('password')" v-text="firstError('password')"></p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" :class="{'is-loading': isLoading}" :disabled="isLoading">Login</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<style>

</style>

<script>
  export default {
    data () {
      return {
        isLoading: false,
        email: null,
        password: null,
        errorMessage: null,
        errors: {}
      }
    },
    components: {},
    computed: {},
    methods: {
      hasError (label) {
        return typeof this.errors[label] !== 'undefined'
      },
      firstError (label) {
        return this.errors[label][0]
      },
      addErrorClass (label) {
        return this.hasError(label) ? 'is-danger' : null
      },
      closeModal () {
        this.$store.commit('closeLoginModal')
      },
      submit () {
        this.isLoading = true
        this.$auth.login({
          data: {
            email: this.email,
            password: this.password
          }
        }).then(() => {
          this.isLoading = false
          this.errorMessage = null
          this.errors = {}
          this.closeModal()
        }).catch(error => {
          console.log(error.response)
          this.isLoading = false
          this.errorMessage = error.response.data.message
          this.errors = error.response.data.errors
        })
      }
    },
    mounted () {
    }
  }
</script>
