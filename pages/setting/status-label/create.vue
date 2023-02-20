<template>
  <div>
    <div v-if="labels.result.role.create == 'N'">
      <component :is="errorPage" :error="errors" />
    </div>
    <div class="grid" v-else>
      <PartialsSubheader :name="name" />
      <div class="content-main">
        <div class="container-fluid">
          <div class="col-lg-12">
            <div class="card">
              <FormSettingStatusLabel />
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
  name: 'Labels',
  data() {
    return {
      name: 'Create',
      errors: {
        permission: '',
        message: '',
      },
    }
  },
  async asyncData({ store }) {
    await Promise.all([store.dispatch('setting/status_label/getLabelsData')])
    return
  },
  computed: {
    ...mapState('setting/status_label', {
      labels: (state) => state.labels,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.labels.result.role.create == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
}
</script>
