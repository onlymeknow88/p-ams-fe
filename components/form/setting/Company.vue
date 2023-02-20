<template>
  <form id="form" @submit="submit">
    <div class="card-body">
      <div class="card-title">
        <div class="col-12 item-title">
          <h6 class="fw-bold">Company</h6>
          <NuxtLink
            :to="{ name: 'setting-company' }"
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
          >Nama Company</label
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
          >Company Tag</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.company_tag }"
            v-model="form.company_tag"
          />
          <div
            v-if="errors.company_tag"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.company_tag[0] }}
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
          :disabled="isVisible"
        >
          <span
            :class="!isVisible ? 'd-none' : ''"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
            style="width: 0.8rem; height: 0.8rem"
          ></span>
          {{ !this.isVisible ? 'Save' : 'Loading ...' }}
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
    if (this.$route.name == 'setting-company-edit-id') {
      this.form = {
        name: this.company.result.name,
        company_tag: this.company.result.company_tag,
      }
    }
  },
  data() {
    return {
      isVisible: false,
      form: {
        name: '',
        company_tag: '',
      },
    }
  },
  computed: {
    ...mapState('setting/company', {
      company: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/company', [
      'storeCompaniesData',
      'updateCompaniesData',
    ]),
    ...mapMutations('setting/company', ['SET_ID_UPDATE']),
    reset() {
      this.form.name = ''
      this.form.company_tag = ''

      this.isVisible = false
    },
    submit(e) {
      e.preventDefault()
      this.isVisible = true

      if (this.$route.name == 'setting-company-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateCompaniesData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-company' })
            })
          }
        })
      } else {
        this.storeCompaniesData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-company' })
            })
          }
        })
      }
    },
  },
}
</script>
