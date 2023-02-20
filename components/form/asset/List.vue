<template>
  <form id="form" @submit="submit">
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
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Computer Name</label
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
          for="assettag"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Asset Tag</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.asset_tag }"
            v-model="form.asset_tag"
          />
          <div v-if="errors.asset_tag" class="invalid-feedback" id="feedback-1">
            {{ errors.asset_tag[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="serialno"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Serial No</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.serialno }"
            v-model="form.serialno"
          />
          <div v-if="errors.serialno" class="invalid-feedback" id="feedback-1">
            {{ errors.serialno[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="model"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Models</label
        >
        <div class="col-sm-4">
          <Select2ModelsAssetsDropdownModels
            :errror="errors"
            :edit="assets"
            v-model="form.model_id"
          />
          <div v-if="errors.model_id">
            <span class="help-block form-text-12 text-red-validate">{{
              errors.model_id[0]
            }}</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="assign"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Assigned Type</label
        >
        <div class="col-sm-4">
          <select
            class="form-select"
            :class="{ 'is-invalid': errors.assigned_type }"
            name="assigned_type"
            v-model="form.assigned_type"
            id="type"
            @input="selected($event)"
          >
            <option value="0" selected disabled>Select an option</option>
            <option value="Accesories">Accesories</option>
            <option value="Asset">Asset</option>
            <option value="Consumable">Consumable</option>
            <option value="Component">Component</option>
            <option value="License">License</option>
          </select>
          <div
            v-if="errors.assigned_type"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.assigned_type[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="status"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Status</label
        >
        <div class="col-sm-4">
          <Select2ModelsAssetsDropdownStatus
            :errror="errors"
            :edit="assets"
            v-model="form.status_id"
          />
          <div v-if="errors.status_id">
            <span class="help-block form-text-12 text-red-validate">{{
              errors.status_id[0]
            }}</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="location"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Location</label
        >
        <div class="col-sm-4">
          <Select2ModelsAssetsDropdownRTDLocation
            :errror="errors"
            :edit="assets"
            v-model="form.rtd_location_id"
          />
          <div v-if="errors.rtd_location_id">
            <span class="help-block form-text-12 text-red-validate">{{
              errors.rtd_location_id[0]
            }}</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="company"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Company</label
        >
        <div class="col-sm-4">
          <Select2ModelsAssetsDropdownCompany
            :errror="errors"
            :edit="assets"
            v-model="form.company_id"
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
          for="wifi"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Wifi Mac Addrees</label
        >
        <div class="col-sm-4">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.wifi_mac_address }"
            v-model="form.wifi_mac_address"
          />
          <div
            v-if="errors.wifi_mac_address"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.wifi_mac_address[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="lan"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >LAN Mac Addrees</label
        >
        <div class="col-sm-4">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.lan_mac_address }"
            v-model="form.lan_mac_address"
          />
          <div
            v-if="errors.lan_mac_address"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.lan_mac_address[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="lan"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >End Of Warranty</label
        >
        <div class="col-sm-2">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.end_of_warranty }"
            v-model="form.end_of_warranty"
          />
          <div
            v-if="errors.end_of_warranty"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.end_of_warranty[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="notes"
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
      <div class="mb-3 row">
        <label
          for="description"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Description</label
        >
        <div class="col-sm-4">
          <textarea
            type="text"
            name="description"
            id="description"
            class="form-control"
            v-model="form.description"
            v-bind:class="{ 'is-invalid': errors.description }"
            rows="4"
          >
          </textarea>
          <div
            v-if="errors.description"
            class="invalid-feedback"
            id="feedback-1"
          >
            {{ errors.description[0] }}
          </div>
        </div>
        <div class="col-sm-4">
          <button
            type="button"
            class="btn btn-primary open-window mt-2"
            data-bs-toggle="modal"
            data-bs-target="#descmodal"
          >
            open window
          </button>
          <!-- Modal -->
          <div
            class="modal modal-window fade"
            id="descmodal"
            data-bs-backdrop="static"
            tabindex="-1"
            aria-labelledby="descmodalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="descmodalLabel">Description</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="col-sm-8">
                    <textarea
                      class="form-control form-text-13"
                      id="desc_modal"
                      cols="30"
                      rows="10"
                      v-model="form.description"
                    >
                    </textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-link color-softgray-5"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="uploadimage"
          class="required col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
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
    if (this.$route.name == 'assets-list-assets-edit-id') {
      this.form = {
        name: this.assets.result.name,
        asset_tag: this.assets.result.asset_tag,
        serialno: this.assets.result.serialno,
        model_id: this.assets.result.model_id,
        assigned_type: this.assets.result.assigned_type,
        status_id: this.assets.result.status_id,
        company_id: this.assets.result.company_id,
        rtd_location_id: this.assets.result.rtd_location_id,
        wifi_mac_address: this.assets.result.wifi_mac_address,
        lan_mac_address: this.assets.result.lan_mac_address,
        end_of_warranty: this.assets.result.end_of_warranty,
        description: this.assets.result.description,
        notes: this.assets.result.notes,
        image: null,
        imageData: this.assets.result.image,
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
        asset_tag: '',
        serialno: '',
        model_id: '',
        assigned_type: '',
        status_id: '',
        company_id: '',
        wifi_mac_address: '',
        rtd_location_id: '',
        lan_mac_address: '',
        end_of_warranty: '',
        description: 'Lengkapi Informasi dibawah ini :\nDescription:',
        notes: '',
        image: null,
        imageData: '',
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
    ...mapActions('list_assets', ['storeAssetsData', 'updateAssetsData']),
    ...mapMutations('list_assets', ['SET_ID_UPDATE', 'SET_ERRORS']),
    reset() {
      this.form.name = ''
      this.form.asset_tag = ''
      this.form.serialno = ''
      this.form.model_id = ''
      this.form.status_id = ''
      this.form.assigned_type = ''
      this.form.wifi_mac_address = ''
      this.form.rtd_location_id = ''
      this.form.lan_mac_address = ''
      this.form.description = ''
      this.form.end_of_warranty = ''
      this.form.notes = ''

      this.form.image = null
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
      data.append('asset_tag', this.form.asset_tag)
      data.append('serialno', this.form.serialno)
      data.append('model_id', this.form.model_id)
      data.append('rtd_location_id', this.form.rtd_location_id)
      data.append('end_of_warranty', this.form.end_of_warranty)
      data.append('company_id', this.form.company_id)
      data.append('lan_mac_address', this.form.lan_mac_address)
      data.append('wifi_mac_address', this.form.wifi_mac_address)
      data.append('notes', this.form.notes)
      data.append('description', this.form.description)
      data.append('assigned_type', this.form.assigned_type)
      data.append('status_id', this.form.status_id)

      if (this.$route.name == 'assets-list-assets-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateAssetsData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'assets-list-assets' })
            })
          }
        })
      } else {
        this.storeAssetsData(data).then(() => {
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
    selected(e) {
      this.form.assigned_type = e.target.value
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
    back() {
      this.SET_ERRORS([])
      this.$router.push({ name: 'assets-list-assets' })
    },
  },
  mounted() {},
}
</script>
