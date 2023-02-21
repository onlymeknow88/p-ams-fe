<template>
  <div>
    <form @submit="submit">
      <div class="card-body">
        <div class="card-title">
          <div class="col-12 item-title">
            <h6 class="fw-bold">Category</h6>
            <NuxtLink
              :to="{ name: 'setting-category' }"
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
            >Category Name</label
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
            for="type"
            class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
            >Type</label
          >
          <div class="col-sm-4">
            <select
              class="form-select"
              :class="{ 'is-invalid': errors.category_type }"
              name="category_type"
              v-model="form.category_type"
              type="text"
              @input="selected($event)"
            >
              <option value="" selected disabled>Select an option</option>
              <option value="Accesories">Accesories</option>
              <option value="Asset">Asset</option>
              <option value="Consumable">Consumable</option>
              <option value="Component">Component</option>
              <option value="License">License</option>
            </select>
            <div
              class="invalid-feedback"
              id="feedback-1"
              v-if="errors.category_type"
            >
              {{ errors.category_type[0] }}
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
                class="mb-3"
                :src="
                  $route.name != 'setting-category-edit-id'
                    ? '/assets/img/default.png'
                    : URLBackend + '/storage/categories/' + form.imageData
                "
              />
              <div class="btn-upload">
                <button
                  class="btn btn-primary"
                  :class="errors.image ? 'color-red' : 'color-blue'"
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
    if (this.$route.name == 'setting-category-edit-id') {
      this.form = {
        name: this.category.result.name,
        category_type: this.category.result.category_type,
        image: null,
        imageData: this.category.result.image,
      }
    }
  },
  data() {
    return {
      name: 'Create',
      URLBackend: 'http://p-ams-backend.test',
      isLoading: false,
      isFile: false,
      fileURLImage: '',
      form: {
        name: '',
        category_type: '',
        image: null,
        imageData: '',
      },
    }
  },
  computed: {
    ...mapState('setting/category', {
      category: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/category', [
      'storeCategoriesData',
      'updateCategoriesData',
      'uploadCategoriesData',
    ]),
    ...mapMutations('setting/category', ['SET_ID_UPDATE']),
    reset() {
      this.form.name = ''
      this.form.category_type = null
      this.form.image = null
      this.form.imageData = ''

      this.$refs.image.value = null

      this.isFile = false
      this.isLoading = false
    },
    submit(e) {
      e.preventDefault()
      this.isLoading = true
      const data = new FormData()
      data.append('image', this.form.image)
      data.append('name', this.form.name)
      data.append('category_type', this.form.category_type)

      if (this.$route.name == 'setting-category-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateCategoriesData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-category' })
            })
          }
        })
      } else {
        this.storeCategoriesData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-category' })
            })
          }
        })
      }
    },
    selected(e) {
      this.form.category_type = e.target.value
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
