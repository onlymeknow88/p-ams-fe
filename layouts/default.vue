<template>
  <div>
    <partialsHeader />

    <div
      class="mobile-bottom-sheet"
      :class="show ? 'show' : ''"
      id="bottomSheet"
    >
      <div class="backdrop" @click="closeBottom"></div>
      <div class="content" id="content" :class="show ? 'show' : ''">
        <div class="bottom-header">
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeBottom"
          ></button>
        </div>
        <div class="bottom-body">
          <a href="">Account Setting</a>
          <a href="#" @click="logout" id="logout">Logout</a>
        </div>
      </div>
    </div>

    <partialsSidebar :showMenu="showMenu" />

    <div
      class="main-wrapper app-wrapper"
      id="app-wrapper"
      :class="{ 'show-menu': !showMenu }"
    >
      <div class="content">
        <div class="home-two-column">
          <div id="primary" :class="{ 'show-menu': !showMenu }">
            <!-- <div class="grid" > -->
            <!-- <div class="header">
                <div class="sub-header">
                  <div class="content-header" id="content-header">
                    <PartialsSubheader :name="title"/>
                  </div>
                </div>
              </div> -->
            <nuxt />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      show: false,
      showMenu: true,
    }
  },
  created() {
    this.$nuxt.$on('showBottom', ($event) => this.showBottom($event))
    this.$nuxt.$on('toggleSidebar', () => {
      this.showMenu = !this.showMenu
    })
  },
  methods: {
    closeBottom() {
      this.show = false
      document.body.classList.toggle('mobile-bottom')
    },
    showBottom(e) {
      this.show = e
      document.body.classList.toggle('mobile-bottom')
    },
    logout() {
      this.show = false
      document.body.classList.remove('mobile-bottom')
      this.$auth.logout()
    },
  },
}
</script>
