<template>
  <form @submit="submit">
    <div class="card-body">
      <div class="card-title">
        <div class="col-12 item-title">
          <h6 class="fw-bold">Assets</h6>
          <button type="button" @click="back" class="btn btn-icon" title="Back">
            <img
              src="/assets/icon/icon_arrow_left.svg"
              alt=""
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="name"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Model</label
        >
        <div class="col-sm-6 d-flex align-items-center">
          <span class="form-text-14 d-flex justify-content-start">{{
            this.assets.result.models.name
          }}</span>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="status"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Status
        </label>
        <div class="col-sm-4">
          <select
            class="form-select"
            :class="{ 'is-invalid': errors.status_id }"
            name="status_id"
            id="status_label"
            @input="selected($event)"
          >
            <option value="0" selected disabled>Select on option</option>
            <option value="2">Ready to Deploy</option>
          </select>
          <div
            v-if="errors.status_id"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.status_id[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="company"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Assign to User</label
        >
        <div class="col-sm-4">
          <Select2AssetsDropdownAssignUser
            :errror="errors"
            v-model="form.assigned_to"
          />
          <div v-if="errors.assigned_to">
            <span class="help-block form-text-12 text-red-validate">{{
              errors.assigned_to[0]
            }}</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="date"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Date</label
        >
        <div class="col-sm-3">
          <date-picker
            v-model="form.assignedto_date"
            format="YYYY-MM-DD"
            value-type="format"
            type="date"
            placeholder="Select date"
          ></date-picker>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="notes"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Notes</label
        >
        <div class="col-sm-4">
          <textarea
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.notes }"
            v-model="form.notes"
            rows="3"
          ></textarea>
          <div v-if="errors.notes" class="invalid-feedback" id="feedback-1">
            {{ errors.notes[0] }}
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
          {{ !this.isLoading ? 'Assign' : 'Loading ...' }}
        </button>
        <button type="button" class="btn btn-link col-12 ms-2" @click="reset">
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<style>
.mx-input {
  color: #292929 !important;
  background-color: #fff;
  border: 1px solid #ced4da !important;
  font-size: 12px !important;
  height: 32px !important;
}
.mx-input:focus {
  border: 1px solid #8a9cd7 !important;
}

.mx-calendar-content .cell:hover {
  background-color: #f2f2f2 !important;
  border-radius: 50%;
  color: #040b23 !important;
}

.mx-calendar-content .cell.active {
  background-color: #0a1c57 !important;
  border-radius: 50%;
}
</style>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  name: 'Create',
  created() {
  },
  data() {
    return {
      name: 'Create',
      URLBackend: 'http://p-ams-backend.test',
      isLoading: false,
      form: {
        status_id: '',
        assigned_to: '',
        assignedto_date: '',
        notes: '',
      },
    }
  },
  computed: {
    ...mapState('list_assets', {
      assets: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('list_assets', ['assignAssetsData']),
    ...mapMutations('list_assets', ['SET_ID_UPDATE', 'SET_ERRORS']),
    selected(e) {
      this.form.status_id = e.target.value
    },
    back() {
      this.SET_ERRORS([])
      this.$router.push({ name: 'assets-list-assets' })
    },
    submit(e) {
      e.preventDefault()
      this.isLoading = true

      if (this.$route.name == 'assets-list-assets-assign-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.assignAssetsData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'assets-list-assets' })
            })
          }
        })
      }
    },
    reset() {
      this.form.status_id = ''
      this.form.assigned_to = ''
      this.form.assignedto_date = ''
      this.form.notes = ''

      this.SET_ERRORS([])

      this.isLoading = false
    },
  },
}
</script>
