<template>
  <div class="header">
    <div class="sub-header">
      <div class="content-header">
        <div class="sub-items-left">
          <div class="item-breadcumb active">
            <!-- <div v-for="(item, index) in crumbs" :key="index"> -->
            <!-- <NuxtLink :to="path" class="form-text-14">{{ name
              }}</NuxtLink> -->
            <a href="">{{ name }}</a>
            <!-- </div> -->
          </div>
        </div>
        <div class="sub-items-right">
          <!-- <div class="item-button">
                <a href="add.html" class="btn btn-master btn-add" id="add">Add</a>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'Subheader',
  props: ['name'],
  data() {
    return {
      showMenu: false,
    }
  },
  created() {
    this.$nuxt.$on('toggleSidebar', () => {
      this.showMenu = !this.showMenu
    })
  },
  mounted() {},
  // computed: {
  //   crumbs() {
  //     const fullPath = this.$route.fullPath
  //     const params = fullPath.startsWith('/')
  //       ? fullPath.substring(1).split('/')
  //       : fullPath.split('/')
  //     const crumbs = []
  //     let path = ''
  //     params.forEach((param, index) => {
  //       path = `${path}/${param}`
  //       const match = this.$router.match(path)
  //       if (match.name !== null) {
  //         crumbs.push(match)
  //       }
  //     })
  //     return crumbs
  //   },
  // },
}
</script>
