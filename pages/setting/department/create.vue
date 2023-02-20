<template>
  <div>
    <div v-if="departments.result.role.create == 'N'">
      <component :is="errorPage" :error="errors" />
    </div>
    <div class="grid" v-else>
      <PartialsSubheader :name="name" />
      <div class="content-main">
        <div class="container-fluid">
          <div class="col-lg-12">
            <div class="card">
              <FormSettingDepartment />
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
  name: 'Create',
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
    await Promise.all([store.dispatch('setting/department/getDepartmentsData')])
    return
  },
  computed: {
    ...mapState('setting/department', {
      departments: (state) => state.departments,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.departments.result.role.create == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
}
</script>
