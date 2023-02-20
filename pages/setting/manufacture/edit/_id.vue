<template>
  <div>
    <div v-if="manufactures.result.role.edit == 'N'">
      <component :is="errorPage" :error="errors" />
    </div>
    <div class="grid" v-else>
      <PartialsSubheader :name="name" />
      <div class="content-main">
        <div class="container-fluid">
          <div class="col-lg-12">
            <div class="card">
              <FormSettingManufacture />
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
      name: 'Edit',
      errors: {
        permission: '',
        message: '',
      },
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('setting/manufacture/getData', params.id),
      store.dispatch('setting/manufacture/getManufacturesData'),
    ])
    return
  },
  computed: {
    ...mapState('setting/manufacture', {
      manufactures: (state) => state.manufactures,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.manufactures.result.role.edit == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
}
</script>
