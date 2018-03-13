<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head"></header>
      <form @submit.prevent="submit">
        <section class="modal-card-body">
          <div class="notification is-danger" v-if="error.message || this.$store.state.errorMessage"
               v-text="error.message || this.$store.state.errorMessage"></div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
                            <span class="icon is-small is-left">
                                <i class="material-icons">mail</i>
                            </span>
              <input v-model="email" class="input" :class="{'is-danger': hasEmailError}" type="email" autofocus>
              <p class="help is-danger" v-if="hasEmailError" v-text="firstEmailError"></p>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
                            <span class="icon is-small is-left">
                                <i class="material-icons">vpn_key</i>
                            </span>
              <input v-model="password" class="input" :class="{'is-danger': hasPasswordError}" type="password">
              <p class="help is-danger" v-if="hasPasswordError" v-text="firstPasswordError"></p>
            </div>
          </div>
          <div class="field">
            <label class="label">Confirm password</label>
            <div class="control has-icons-left">
                            <span class="icon is-small is-left">
                                <i class="material-icons">vpn_key</i>
                            </span>
              <input v-model="passwordConfirmation" class="input" type="password">
              <p class="help is-danger" v-if="hasPasswordConfirmationError" v-text="firstPasswordConfirmationError"></p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-link" type="button" @click="openLoginModal">I already have an account</button>
          <button class="button is-primary" :class="{'is-loading': isLoading}" :disabled="isLoading" @click="submit">
            Register
          </button>
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
        passwordConfirmation: null,
        error: {
          errors: {}
        }
      }
    },
    components: {},
    computed: {
      hasEmailError () {
        return typeof this.error.errors.email !== 'undefined'
      },
      firstEmailError () {
        return this.error.errors.email[0]
      },
      hasPasswordError () {
        return typeof this.error.errors.password !== 'undefined'
      },
      firstPasswordError () {
        return this.error.errors.password[0]
      },
      hasPasswordConfirmationError () {
        return typeof this.error.errors.passwordConfirmation !== 'undefined'
      },
      firstPasswordConfirmationError () {
        return this.error.errors.passwordConfirmation[0]
      }
    },
    methods: {
      openLoginModal () {
        this.closeModal()
        this.$store.commit('openLoginModal')
      },
      closeModal () {
        this.$store.commit('closeRegisterModal')
      },
      submit () {
        this.isLoading = true
        this.axios.post('auth/register', {
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        }).then(() => {
          this.login()
        }).catch(error => {
          console.error(error.response)
          this.isLoading = false
          this.error = error.response.data
        })
      },
      login () {
        this.$auth.login({
          data: {
            email: this.email,
            password: this.password
          }
        }).then(() => {
          this.isLoading = false
          this.closeModal()
        }).catch(error => {
          console.error(error.response)
          this.isLoading = false
        })
      }
    }
  }
</script>
