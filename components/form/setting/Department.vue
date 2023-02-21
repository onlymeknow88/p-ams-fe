<template>
  <form id="form" @submit="submit" ref="form">
    <div class="card-body">
      <div class="card-title">
        <div class="col-12 item-title">
          <h6 class="fw-bold">Department</h6>
          <NuxtLink
            :to="{ name: 'setting-department' }"
            class="btn btn-icon"
            title="Back"
          >
            <img
              src="/assets/icon/icon_arrow_left.svg"
              alt=""
              width="20"
              height="20"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="nama"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Nama Department</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.name }"
            v-model="form.name"
          />
          <div v-if="errors.name" class="invalid-feedback" id="feedback-1">
            {{ errors.name[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="nama"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Company</label
        >
        <div class="col-sm-6">
          <!-- <Select2DepartmentDropdownCompany
            v-model="form.company_id"
            :error="errors"
            :edit="department.result"
          /> -->
          <Select2DepartmentDropdownCompany
            v-model="form.company_id"
            :error="errors"
            :edit="department"
          />
          <div v-if="errors.company_id">
            <span class="help-block form-text-12 text-red-validate">{{
              errors.company_id[0]
            }}</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="nama"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Location</label
        >
        <div class="col-sm-6">
          <Select2DepartmentDropdownLocation
            v-model="form.location_id"
            :error="errors"
            :edit="department"
          />
          <div v-if="errors.location_id">
            <span class="help-block form-text-12 text-red-validate">{{
              errors.location_id[0]
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="horizontal-line color-shadow"></div>
    <div class="card-footer mb-10">
      <div class="button-group col-12">
        <button
          type="submit"
          class="btn btn-primary color-blue col-12"
          id="submit"
          :disabled="isLoading"
        >
          <span
            :class="!isLoading ? 'd-none' : ''"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
            style="width: 0.8rem; height: 0.8rem"
          ></span>
          {{ !this.isLoading ? 'Save' : 'Loading ...' }}
        </button>
        <button type="button" class="btn btn-link col-12" @click="reset">
          Reset
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'Create',
  created() {
    if (this.$route.name == 'setting-department-edit-id') {
      this.form = {
        name: this.department.result.name,
        company_id: this.department.result.companies.id,
        location_id: this.department.result.locations.id,
      }
    }
  },
  data() {
    return {
      isLoading: false,
      form: {
        name: '',
        company_id: '',
        location_id: '',
      },
    }
  },
  computed: {
    ...mapState('setting/department', {
      department: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/department', [
      'storeDepartmentsData',
      'updateDepartmentsData',
    ]),
    ...mapMutations('setting/department', ['SET_ID_UPDATE','SET_ERRORS']),
    reset() {
      this.form.name = ''
      this.form.company_id = ''
      this.form.location_id = ''

      this.SET_ERRORS([])

      this.isLoading = false
    },
    submit(e) {
      e.preventDefault()
      this.isLoading = true

      if (this.$route.name == 'setting-department-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateDepartmentsData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-department' })
            })
          }
        })
      } else {
        this.storeDepartmentsData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-department' })
            })
          }
        })
      }
    },
  },
}
</script>
