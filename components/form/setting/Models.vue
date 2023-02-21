<template>
  <div>
    <form @submit="submit">
      <div class="card-body">
        <div class="card-title">
          <div class="col-12 item-title">
            <h6 class="fw-bold">Models</h6>
            <NuxtLink
              :to="{ name: 'setting-asset-models' }"
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
            >Models Name</label
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
            for="manufacture"
            class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
            >Manufacture</label
          >
          <div class="col-sm-4">
            <Select2ModelsDropdownManufacture
              :errror="errors"
              :edit="models"
              v-model="form.manufacturer_id"
            />
            <div v-if="errors.manufacture_id">
              <span class="help-block form-text-12 text-red-validate">{{
                errors.manufacture_id[0]
              }}</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label
            for="manufacture"
            class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
            >Category</label
          >
          <div class="col-sm-4">
            <Select2ModelsDropdownCategory
              :errror="errors"
              :edit="models"
              v-model="form.category_id"
            />
            <div v-if="errors.category_id">
              <span class="help-block form-text-12 text-red-validate">{{
                errors.category_id[0]
              }}</span>
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
            <input
              type="text"
              name="models_type"
              class="form-control"
              :class="{ 'is-invalid': errors.models_type }"
              v-model="form.models_type"
            />
            <div
              class="invalid-feedback"
              id="feedback-1"
              v-if="errors.models_type"
            >
              {{ errors.models_type[0] }}
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label
            for="date"
            class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
            >EOL</label
          >
          <div class="col-sm-2">
            <div class="input-group">
              <input
                type="number"
                name="eol"
                id="eol"
                class="form-control"
                aria-describedby="basic-addon2"
                :class="{ 'is-invalid': errors.eol }"
                v-model="form.eol"
              />
              <span
                class="input-group-text form-text-12 color-lightgray"
                id="basic-addon2"
              >
                Years
              </span>
              <div class="invalid-feedback" id="feedback-1" v-if="errors.eol">
                {{ errors.eol[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label
            for="software"
            class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
            >Notes</label
          >
          <div class="col-sm-6">
            <textarea
              type="text"
              name="notes"
              id="notes"
              class="form-control"
              :class="{ 'is-invalid': errors.notes }"
              v-model="form.notes"
            ></textarea>
            <div class="invalid-feedback" id="feedback-1" v-if="errors.notes">
              {{ errors.notes[0] }}
            </div>
          </div>
        </div>
        <div v-if="form.imageData != null" class="mb-3 row">
          <label
            for="iamge_delete"
            class="col-sm-2 col-form-label form-text-12 text-black text-right"
          ></label>
          <div class="col-sm-6">
            <div class="checkbox-group">
              <div class="checkbox-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="delete_image"
                    id="delete_image"
                    value="1"
                    @change="handleCheckbox($event)"
                  />
                  <label class="form-check-label" for="delete_image">
                    Delete Image
                  </label>
                </div>
              </div>
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
                  'http://p-ams-backend.test/storage/asset-models/' +
                  form.imageData
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
                  ref="image"
                  class="upload_file"
                  id="upload_file"
                  style="display: none"
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
          <button type="button" class="btn btn-link col-12" @click="reset">
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
    if (this.$route.name == 'setting-asset-models-edit-id') {
      this.form = {
        name: this.models.result.name,
        models_type: this.models.result.models_type,
        eol: this.models.result.eol,
        manufacturer_id: this.models.result.manufacturer_id,
        category_id: this.models.result.category_id,
        notes: this.models.result.notes,
        image: null,
        imageData: this.models.result.image,
      }
    }
  },
  data() {
    return {
      name: 'Create',
      isLoading: false,
      isFile: false,
      fileURLImage: '',
      form: {
        name: '',
        models_type: '',
        eol: '',
        manufacturer_id: '',
        category_id: '',
        notes: '',
        image: null,
        imageData: '',
        delete_image: ''
      },
    }
  },
  computed: {
    ...mapState('setting/asset_models', {
      models: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/asset_models', [
      'storeModelsData',
      'updateModelsData',
    ]),
    ...mapMutations('setting/asset_models', ['SET_ID_UPDATE', 'SET_ERRORS']),
    handleCheckbox(e){
      this.delete_image = e.target.value
    },
    reset() {
      this.form.name = ''
      this.form.manufacturer_id = ''
      this.form.category_id = ''
      this.form.models_type = ''
      this.form.eol = ''
      this.form.notes = ''
      this.form.image = null
      this.form.imageData = ''

      this.$refs.image.value = null

      this.SET_ERRORS([])

      this.isFile = false
      this.isLoading = false
    },
    submit(e) {
      e.preventDefault()
      this.isLoading = true
      const data = new FormData()
      data.append('image', this.form.image)
      data.append('name', this.form.name)
      data.append('models_type', this.form.models_type)
      data.append('manufacture_id', this.form.manufacturer_id)
      data.append('category_id', this.form.category_id)
      data.append('eol', this.form.eol)
      data.append('notes', this.form.notes)
      data.append('delete_image', this.delete_image)

      if (this.$route.name == 'setting-asset-models-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateModelsData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-asset-models' })
            })
          }
        })
      } else {
        this.storeModelsData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-asset-models' })
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
