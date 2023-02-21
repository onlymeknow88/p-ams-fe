<template>
  <form id="form" @submit="submit">
    <div class="card-body">
      <div class="card-title">
        <div class="col-12 item-title">
          <h6 class="fw-bold">Locations</h6>
          <NuxtLink
            :to="{ name: 'setting-location' }"
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
          >Nama Location</label
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
          >Location</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.location_tag }"
            v-model="form.location_tag"
          />
          <div
            v-if="errors.location_tag"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.location_tag[0] }}
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
    if (this.$route.name == 'setting-location-edit-id') {
      this.form = {
        name: this.location.result.name,
        location_tag: this.location.result.location_tag,
      }
    }
  },
  data() {
    return {
      isLoading: false,
      form: {
        name: '',
        location_tag: '',
      },
    }
  },
  computed: {
    ...mapState('setting/location', {
      location: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/location', [
      'storeLocationsData',
      'updateLocationsData',
      'uploadLocationsData',
    ]),
    ...mapMutations('setting/location', ['SET_ID_UPDATE']),
    reset() {
      this.form.name = ''
      this.form.location_tag = ''

      this.isLoading = false
    },
    submit(e) {
      e.preventDefault()
      this.isLoading = true

      if (this.$route.name == 'setting-location-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateLocationsData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-location' })
            })
          }
        })
      } else {
        this.storeLocationsData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-location' })
            })
          }
        })
      }
    },
  },
}
</script>
