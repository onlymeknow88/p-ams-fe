<template>
  <div>
    <form @submit="submit">
      <div class="card-body">
        <div class="card-title">
          <div class="col-12 item-title">
            <h6 class="fw-bold">Manufacture</h6>
            <NuxtLink
              :to="{ name: 'setting-manufacture' }"
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
            for="name"
            class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
            >Manufacture Name</label
          >
          <div class="col-sm-6">
            <input
              type="text"
              name="name"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              v-model="form.name"
            />
            <div class="invalid-feedback" id="feedback-1" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label
            for="uploadimage"
            class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
            >Upload Image</label
          >
          <div class="col-sm-8">
            <div class="upload-group">
              <img
                v-if="isFile"
                width="100"
                height="100"
                alt=""
                class="mb-3"
                :src="fileURLImage"
              />
              <img
                v-else
                width="100"
                height="100"
                alt=""
                class="mb-3"
                :src="
                  $route.name != 'setting-manufacture-edit-id'
                    ? '/assets/img/default.png'
                    : URLBackend + '/storage/manufactures/' + form.imageData
                "
              />
              <div class="btn-upload">
                <button
                  class="btn btn-primary"
                  :class="
                    errors.image
                      ? 'color-red'
                      : !isFile
                      ? 'color-blue'
                      : 'color-green'
                  "
                  type="button"
                  @click="upload"
                >
                  Select File...
                </button>
                <input
                  type="file"
                  name="image"
                  class="upload_file"
                  id="upload_file"
                  style="display: none"
                  ref="image"
                  @change="handleFileUpload($event)"
                />
                <div class="error-message">
                  <div class="d-flex flex-column mt-2">
                    <span
                      class="help-block form-text-12"
                      :class="!isFile ? 'text-gray' : 'text-success'"
                      >Accepted filetypes are jpg. Max upload size allowed is
                      2M.</span
                    >
                    <span
                      v-if="errors.image"
                      class="help-block form-text-12 text-red-validate"
                      >{{ errors.image[0] }}</span
                    >
                  </div>
                </div>
              </div>
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
          <button
            type="button"
            class="btn btn-link col-12"
            @click="reset($event)"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'Create',
  created() {
    if (this.$route.name == 'setting-manufacture-edit-id') {
      this.form = {
        name: this.manufacture.result.name,
        image: null,
        imageData: this.manufacture.result.image,
      }
    }
  },
  data() {
    return {
      name: 'Create',
      URLBackend: 'http://p-ams-backend.test',
      isVisible: false,
      isFile: false,
      fileURLImage: '',
      form: {
        name: '',
        image: null,
        imageData: '',
      },
    }
  },
  computed: {
    ...mapState('setting/manufacture', {
      manufacture: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/manufacture', [
      'storeManufacturesData',
      'updateManufacturesData',
    ]),
    ...mapMutations('setting/manufacture', ['SET_ID_UPDATE', 'SET_ERRORS']),
    reset() {
      this.form.name = ''
      this.form.image = 'null'
      this.form.imageData = ''

      this.$refs.image.value = null
      this.SET_ERRORS([])

      this.isFile = false
      this.isVisible = false
    },
    submit(e) {
      e.preventDefault()
      this.isVisible = true
      const data = new FormData()
      data.append('image', this.form.image)
      data.append('name', this.form.name)

      if (this.$route.name == 'setting-manufacture-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateManufacturesData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-manufacture' })
            })
          }
        })
      } else {
        this.storeManufacturesData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-manufacture' })
            })
          }
        })
      }
    },
    handleFileUpload(e) {
      this.isFile = true
      this.form.image = e.target.files[0]

      this.fileURLImage = URL.createObjectURL(this.form.image)
    },
    upload() {
      const uploadBtn = document.getElementById('upload_file')
      uploadBtn.click()
    },
  },
}
</script>
