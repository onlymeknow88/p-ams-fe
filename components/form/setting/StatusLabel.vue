<template>
  <form id="form" @submit="submit">
    <div class="card-body">
      <div class="card-title">
        <div class="col-12 item-title">
          <h6 class="fw-bold">Status Label</h6>
          <NuxtLink
            :to="{ name: 'setting-status-label' }"
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
          >Nama Status</label
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
          >Type</label
        >
        <div class="col-sm-6">
          <select
            class="form-select"
            name="type"
            v-bind:class="{ 'is-invalid': errors.type }"
            v-model="form.type"
            @change="selected($event)"
          >
            <option value="" selected disabled>Choose an option</option>
            <option value="deployable">Deployable</option>
            <option value="pending">Pending</option>
            <option value="undeployable">Undeployable</option>
            <option value="archived">Archived</option>
          </select>
          <div v-if="errors.type" class="invalid-feedback" id="feedback-1">
            {{ errors.type[0] }}
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label
          for="nama"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Notes</label
        >
        <div class="col-sm-6">
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
    if (this.$route.name == 'setting-status-label-edit-id') {
      this.form = {
        name: this.labels.result.name,
        type: this.labels.result.StatuslabelTypeForSelect,
        notes: this.labels.result.notes,
      }
    }
  },
  data() {
    return {
      isVisible: false,
      form: {
        name: '',
        type: '',
        notes: '',
      },
    }
  },
  computed: {
    ...mapState('setting/status_label', {
      labels: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/status_label', [
      'storeLabelsData',
      'updateLabelsData',
    ]),
    ...mapMutations('setting/status_label', ['SET_ID_UPDATE', 'SET_ERRORS']),
    selected(e) {
      this.type = e.target.value
    },
    reset() {
      this.form.name = ''
      this.form.type = ''
      this.form.notes = ''

      this.SET_ERRORS([])
      this.isVisible = false
    },
    submit(e) {
      e.preventDefault()
      this.isVisible = true

      if (this.$route.name == 'setting-status-label-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateLabelsData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-status-label' })
            })
          }
        })
      } else {
        this.storeLabelsData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-status-label' })
            })
          }
        })
      }
    },
  },
}
</script>
