<template>
  <div>
    <div v-if="roles.result.edit == 'N'">
      <component :is="errorPage" :error="errors" />
    </div>
    <div class="grid" v-else>
      <PartialsSubheader :name="name" />
      <div class="content-main">
        <div class="container-fluid">
          <div class="col-lg-12">
            <div class="card">
              <FormAssetList />
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
  name: 'Edit',
  data() {
    return {
      name: 'Create',
      errors: {
        permission: '',
        message: '',
      },
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('list_assets/getData', params.id),
      store.dispatch('list_assets/getRolesData'),
    ])
    return
  },
  computed: {
    ...mapState('list_assets', {
      assets: (state) => state.assets,
      roles: (state) => state.roles,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.assets.result.edit == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
  mounted() {},
}
</script>
