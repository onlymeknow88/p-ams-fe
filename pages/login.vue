<template>
  <div class="col-12 login-form">
    <a href="#"><img src="/assets/img/logo.png" class="logo" alt="" /></a>
    <h1 class="title-welcome">Welcome</h1>
    <h1 class="title-signin">Sign in.</h1>
    <h6 class="title">Asset Management System</h6>
    <form @submit.prevent="userLogin" class="sign-in">
      <div class="form-group mb-16">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          v-model="login.username"
          placeholder="Username"
          autofocus
        />
      </div>
      <div class="form-group mb-24">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="login.password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-signin mb-30">
          <span
            :class="!isLoading ? 'd-none' : ''"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
            style="width: 0.8rem; height: 0.8rem"
          ></span>
          {{ !this.isLoading ? 'Login' : 'Loading ...' }}
        </button>
      </div>
    </form>
    <div class="d-flex justify-content-center or">
      <span class="form-text-14 mb-30">OR</span>
    </div>
    <button class="btn btn-link-signin mb-15">Login with Adaro Email</button>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  layout: 'login',
  data() {
    return {
      isLoading: false,
      login: {
        username: 'fwivindi',
        password: '12345678',
      },
    }
  },
  methods: {
    async userLogin() {
      this.isLoading = true
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        this.$router.push({ path: '/' })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
  mounted() {
    const body = document.body,
    signIn = document.querySelector('.btn-signin')
      if(signIn){
        signIn.addEventListener('click', () => {
            body.classList.remove('mobile-bottom')
        })
      }
  }
}
</script>
