<template>
  <div>
    <div v-if="roles.result.view == 'N'">
      <component :is="errorPage" :error="errors" />
    </div>
    <div class="grid" v-else>
      <PartialsSubheader :name="name" />
      <div class="content-main">
        <div class="container-fluid">
          <div class="col-lg-12">
            <div class="card">
              <ViewAssetList />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import error400 from '~/components/error/400.vue'
export default {
  // name: 'details',
  data() {
    return {
      name: 'Detail',
      errors: {
        permission: '',
        message: '',
      },
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('list_assets/getRolesData'),
      store.dispatch('list_assets/getFileData', params.id),
      store.dispatch('list_assets/getDetailsData', params.id),
      store.dispatch('list_assets/getUsersData', params.id)
    ])
    return
  },
  computed: {
    ...mapState('list_assets', {
      roles: (state) => state.roles,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.roles.result.view == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
  mounted() {},
}
</script>
