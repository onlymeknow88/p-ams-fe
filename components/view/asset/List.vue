<template>
  <div>
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

      <ul class="nav nav-pills mb-3 mt-4" id="pills-tab" role="tablist">
        <li class="nav-item" role="view-people">
          <button
            class="nav-link btn-master btn-link active"
            id="pills-info-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-info"
            type="button"
            role="tab"
            aria-controls="pills-info"
            aria-selected="true"
          >
            Info
          </button>
        </li>
        <li class="nav-item" role="view-people">
          <button
            class="nav-link btn-master btn-link"
            id="pills-users-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-users"
            type="button"
            role="tab"
            aria-controls="pills-users"
            aria-selected="false"
          >
            Users
          </button>
        </li>
        <li class="nav-item" role="view-people">
          <button
            class="nav-link btn-master btn-link"
            id="pills-file-upload-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-file-upload"
            type="button"
            role="tab"
            aria-controls="pills-file-upload"
            aria-selected="false"
          >
            File Upload
          </button>
        </li>
        <li class="nav-item ms-auto" role="view-people">
          <button
            class="nav-link btn-master btn-link"
            id="upload"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#uploadFile"
            @click="reset"
          >
            Uploads
          </button>
        </li>
      </ul>

      <!-- Modal Upload FIle -->
      <div
        class="modal fade"
        id="uploadFile"
        tabindex="-1"
        aria-labelledby="uploadFile"
        aria-hidden="false"
        ref="modal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- <form id="form" @submit="submitFiles"> -->
            <div class="modal-header">
              <h5 class="modal-title">File Upload</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="reset"
              ></button>
            </div>

            <div class="modal-body">
              <div class="mb-2 row">
                <div class="btn-upload">
                  <button
                    class="btn btn-primary color-blue text-right"
                    type="button"
                    @click="upload"
                  >
                    Select File...
                  </button>
                  <input
                    type="file"
                    class="upload_file"
                    id="upload_file"
                    style="display: none"
                    ref="fileUpload"
                    multiple
                    @change="handleFileMultpleUpload($event)"
                  />
                </div>
                <div class="error-message">
                  <div class="d-flex flex-column mt-2">
                    <span
                      class="help-block form-text-12 mb-2"
                      :class="!isFile ? 'text-gray' : 'text-success'"
                      >Accepted filetypes are jpg. Max upload size allowed is
                      2M.</span
                    >
                    <!-- <div v-for="(error, key) in errors" :key="`file.${key}`">
                      <span
                        v-for="(errorItem, inrKey) in error"
                        :key="`file.${inrKey}`"
                        class="help-block form-text-12 text-red-validate"
                        >{{ errorItem }}</span
                      >
                    </div> -->
                  </div>
                </div>
                <!-- <p
                  class="help-block form-text-10 text-gray mt-2"
                  id="uploadFile-status"
                >
                  Accepted filetypes are jpg, pdf & png. Max upload size allowed
                  is 2M.
                </p> -->
                <div class="col-sm-12">
                  <div class="d-flex flex-row mb-1">
                    <div class="d-flex flex-column">
                      <span
                        v-for="(file, key) in multiplesFIles"
                        :key="'file-' + key"
                        class="badge bg-light text-black text-left mb-2"
                        >{{ file.name }}
                      </span>
                      <div v-for="(error, key) in errors" :key="`file.${key}`">
                        <span
                          v-for="(errorItem, inrKey) in error"
                          :key="`file.${inrKey}`"
                          class="help-block form-text-12 text-red-validate"
                          >{{ errorItem }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="mb-3 row">
                  <div class="col-sm-12">
                    <textarea
                      class="form-control"
                      name="notes"
                      id="notes-file"
                      placeholder="Notes (optional)"
                    ></textarea>
                  </div>
                </div> -->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-link"
                data-bs-dismiss="modal"
                @click="reset"
              >
                Close
              </button>
              <button
                type="submit"
                id="submit"
                @click="submitFiles"
                class="btn btn-primary color-blue"
                :disabled="isLoading"
              >
                <span
                  :class="!isLoading ? 'd-none' : ''"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  style="width: 0.8rem; height: 0.8rem"
                ></span>
                {{ !this.isLoading ? 'Upload' : 'Loading ...' }}
              </button>
            </div>
            <!-- </form> -->
          </div>
        </div>
      </div>

      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-info"
          role="tabpanel"
          aria-labelledby="pills-info-tab"
        >
          <div class="row">
            <div class="col-md-9 col-xs-12 detail-item">
              <div class="items-section">
                <div class="row item-white">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Status
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="status">{{ asset.status_id }}</span>
                  </div>
                </div>
                <div class="row item">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Name
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="name">{{ asset.name }}</span>
                  </div>
                </div>
                <div class="row item-white">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Manufacture
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="manufactures">{{ asset.model_id }}</span>
                  </div>
                </div>
                <div class="row item">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Categories
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="categories">{{ asset.category }}</span>
                  </div>
                </div>
                <div class="row item-white">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Models
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="model">{{ asset.model_id }}</span>
                  </div>
                </div>
                <div class="row item">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Serial
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="serialno">{{ asset.serialno }}</span>
                  </div>
                </div>
                <div class="row item-white">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Wifi Mac Address
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="wifi_mac_address">{{
                      asset.wifi_mac_address
                    }}</span>
                  </div>
                </div>
                <div class="row item">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Lan Mac Address
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="lan_mac_address">{{
                      asset.lan_mac_address
                    }}</span>
                  </div>
                </div>
                <div class="row item-white">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    End of Warranty
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="warranty">{{ asset.end_of_warranty }}</span>
                  </div>
                </div>
                <div class="row item">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Asset Tag
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="assetTag">{{ asset.asset_tag }}</span>
                  </div>
                </div>
                <div class="row item-white">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Location Asset
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="rtd_location_id">{{
                      asset.rtd_location_id
                    }}</span>
                  </div>
                </div>
                <div class="row item">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Notes
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <p id="notes">
                      {{ asset.notes }}
                    </p>
                  </div>
                </div>
                <div class="row item-white">
                  <div
                    class="col-md-3 col-sm-2 text-right fw-bold mtext-left mmb-8"
                  >
                    Created At
                  </div>
                  <div class="col-md-9 col-sm-2">
                    <span id="created_at">{{ asset.created_at }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-xs-12">
              <div
                v-if="asset.image != null"
                class="col-md-12 d-grid gap-2 text-center"
              >
                <img
                  width="225"
                  height="225"
                  class="preview-path"
                  style="margin-bottom: 20px"
                  alt=""
                />
              </div>
              <div class="col-md-12 d-grid gap-2">
                <div id="desc">
                  <label for="description" class="form-text-14 fw-bold mb-2"
                    >Description:</label
                  >
                  <p
                    class="form-text-12"
                    style="white-space: pre-line"
                    id="description"
                  >
                    {{ asset.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-users"
          role="tabpanel"
          aria-labelledby="pills-users-tab"
        >
          <div class="table-responsive">
            <b-table
              hover
              striped
              :items="users.result.data"
              :fields="users_fields"
              show-empty
              responsive="sm"
            >
              <template v-slot:cell(departments)="row">
                {{ row.item.department_id == null ? '' : row.item.depts.name }}
              </template>
              <template v-slot:cell(companies)="row">
                {{ row.item.company_id == null ? '' : row.item.companies.name }}
              </template>
              <template v-slot:cell(locations)="row">
                {{
                  row.item.location_id == null ? '' : row.item.locations.name
                }}
              </template>
              <template v-slot:cell(action)="row">
               <button class="btn btn-dangerous color-red form-text-12" @click="removeUser(row.item.id ?? null)">Remove</button>
              </template>
            </b-table>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-file-upload"
          role="tabpanel"
          aria-labelledby="pills-file-upload-tab"
        >
          <div class="table-responsive">
            <div v-if="$fetchState.pending">
              <LoadingProsesTableSetting />
            </div>
            <b-table
              v-else
              hover
              striped
              :items="files.result.data"
              :fields="files_fields"
              show-empty
              responsive="sm"
            >
              <template v-slot:cell(file_type)="row">
                <img
                  width="50"
                  height="50"
                  v-if="row.item.FileType == 'pdf'"
                  :src="URLBackend + '/assets/icon/icon_pdf.svg'"
                  alt=""
                  class="fileType"
                />
              </template>
              <template v-slot:cell(file_image)="row">
                <img
                  v-if="row.item.FileType != 'pdf'"
                  width="60"
                  height="60"
                  :src="row.item.ImageFile"
                  alt=""
                />
              </template>
              <template v-slot:cell(file)="row">
                <a
                  v-if="row.item.FileType == 'pdf'"
                  @click="viewModalFile(row.item.filename)"
                  href="#"
                  class="viewImage"
                  >{{ row.item.filename }}</a
                >
                <a
                  v-else
                  @click="viewModalImage(row.item.filename)"
                  href="#"
                  class="viewImage"
                  >{{ row.item.filename }}</a
                >
              </template>
              <template v-slot:cell(file_size)="row">
                {{ row.item.SizeFormatBytes }}
              </template>
              <template v-slot:cell(created_at)="row">
                {{ row.item.CreatedAt }}
              </template>
              <template v-slot:cell(download)="row">
                <button
                  class="btn btn-primary"
                  @click="downloadFile(row.item.id ?? null,row.item.filename)"
                >
                  Download
                </button>
              </template>
              <template v-slot:cell(action)="row">
                <button
                  type="button"
                  class="btn btn-icon color-softgray-5 mr-6"
                  title="Delete"
                  @click="deleteFile(row.item.id)"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.6068 2.67648H6.42822C6.52644 2.67648 6.6068 2.59612 6.6068 2.49791V2.67648H13.3925V2.49791C13.3925 2.59612 13.4729 2.67648 13.5711 2.67648H13.3925V4.28362H14.9997V2.49791C14.9997 1.70996 14.359 1.06934 13.5711 1.06934H6.42822C5.64028 1.06934 4.99965 1.70996 4.99965 2.49791V4.28362H6.6068V2.67648ZM17.8568 4.28362H2.14251C1.74742 4.28362 1.42822 4.60282 1.42822 4.99791V5.71219C1.42822 5.81041 1.50858 5.89076 1.60679 5.89076H2.95501L3.50635 17.5649C3.54206 18.326 4.17153 18.9265 4.93269 18.9265H15.0666C15.83 18.9265 16.4572 18.3283 16.493 17.5649L17.0443 5.89076H18.3925C18.4907 5.89076 18.5711 5.81041 18.5711 5.71219V4.99791C18.5711 4.60282 18.2519 4.28362 17.8568 4.28362ZM14.8947 17.3193H5.10456L4.56438 5.89076H15.4349L14.8947 17.3193Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-image file d-none">
      <span class="close" @click="close">&times;</span>
      <iframe alt="" class="d-none"></iframe>
    </div>
    <div class="popup-image image d-none">
      <span class="close" @click="close">&times;</span>
      <img alt="" class="d-none img-file" />
    </div>
  </div>
</template>

<style>
.popup-image {
  position: fixed !important;
  overflow: none !important;
}
.img-file {
  background-color: #000000;
}
</style>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  created() {
    if (this.$route.name == 'assets-list-assets-view-id') {
      this.asset = {
        name: this.assets.result.asset.name,
        asset_tag: this.assets.result.asset.asset_tag,
        category: this.assets.result.asset.models.categories.name,
        serialno: this.assets.result.asset.serialno,
        model_id: this.assets.result.asset.models.name,
        assigned_type: this.assets.result.asset.assigned_type,
        status_id: this.assets.result.asset.status_labels.name,
        company_id: this.assets.result.asset.companies.name,
        rtd_location_id: this.assets.result.asset.locations.name,
        wifi_mac_address: this.assets.result.asset.wifi_mac_address,
        lan_mac_address: this.assets.result.asset.lan_mac_address,
        end_of_warranty: this.assets.result.asset.end_of_warranty,
        description: this.assets.result.asset.description,
        notes: this.assets.result.asset.notes,
        image: null,
        imageData: this.assets.result.asset.image,
        created_at: this.assets.result.asset.created_at,
      }
    }
  },
  data() {
    return {
      name: 'Detail Asset',
      URLBackend: 'http://p-ams-backend.test',
      isLoading: false,
      isFile: false,
      displayModalPDF: false,
      displayModalIMG: false,
      sortBy: '',
      sortDesc: false,
      users_fields: [
        { key: 'name' },
        { key: 'title' },
        { key: 'email' },
        { key: 'phone' },
        { key: 'companies', label: 'Company' },
        { key: 'departments', label: 'Department' },
        { key: 'locations', label: 'Locations' },
        { key: 'action' },
      ],
      files_fields: [
        { key: 'file_type' },
        { key: 'file_image' },
        { key: 'file' },
        { key: 'file_size' },
        { key: 'note' },
        { key: 'created_at' },
        { key: 'download' },
        { key: 'action' },
      ],
      items: [],
      asset: {
        name: '',
        asset_tag: '',
        category: '',
        serialno: '',
        model_id: '',
        assigned_type: '',
        status_id: '',
        company_id: '',
        wifi_mac_address: '',
        rtd_location_id: '',
        lan_mac_address: '',
        end_of_warranty: '',
        description: '',
        notes: '',
        image: null,
        imageData: '',
        created_at: '',
      },
      multiplesFIles: [],
    }
  },
  async fetch() {
    await this.$axios.$get(
      'list-assets/upload-file?id=' + this.$route.params.id
    )
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('list_assets/getFileData', this.$route.params.id),
    ])
    return
  },
  computed: {
    ...mapState('list_assets', {
      assets: (state) => state.data,
      files: (state) => state.dataFiles,
      users: (state) => state.users,
      errors: (state) => state.errors,
      fileErrors: (state) => state.fileErrors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('list_assets', [
      'getAssetsData',
      'getFileData',
      'getUserDatas',
      'getUsersData',
      'uploadFileData',
      'removeUsersData',
      'destroyFileData'
    ]),
    ...mapMutations('list_assets', [
      'SET_ID_UPDATE',
      'SET_ERRORS',
      'SET_ERRORS_FILE',
    ]),
    // fileRefresh() {
    //   this.getFileData(this.$route.params.id)
    // },
    submitFiles() {
      this.isLoading = true
      const data = new FormData()

      for (var i = 0; i < this.multiplesFIles.length; i++) {
        let file = this.multiplesFIles[i]
        data.append('file[' + i + ']', file)
      }

      if (this.$route.name == 'assets-list-assets-view-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.uploadFileData(data).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              $('#uploadFile').modal('hide')
              this.getFileData(this.$route.params.id)
              this.reset()
            })
          } else if (this.fileErrors.code == 500) {
            Swal.fire({
              text: this.fileErrors.message,
              type: 'error',
            }).then(() => {
              // location.reload()
              this.reset()
            })
          }
        })
      }
    },
    deleteFile(id) {
      Swal.fire({
        title: 'Delete?',
        text: 'Apakah anda yakin?',
        type: 'warning',
        showCancelButton: !0,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: !0,
      }).then(async (e) => {
        if (e.value == true) {
          this.destroyFileData(id).then(() => {
            this.getFileData(this.$route.params.id)
          })
        }
      })
    },
    removeUser(id) {
      Swal.fire({
        title: 'Delete?',
        text: 'Apakah anda yakin?',
        type: 'warning',
        showCancelButton: !0,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: !0,
      }).then(async (e) => {
        if (e.value == true) {
          this.removeUsersData(id).then(() => {
            this.getUsersData(this.$route.params.id)
          })
          // console.log(id)
        }
      })
    },
    async downloadFile(val,filename) {
      const auth_token = localStorage.getItem('auth._token.local')
      await this.$axios
        .get('list-assets/upload-file/download/' + val, {
          headers: {
            Authorization: auth_token,
          },
          responseType: 'blob',
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]))
          var fURL = document.createElement('a')

          fURL.href = fileURL
          fURL.setAttribute('download', filename)
          document.body.appendChild(fURL)

          fURL.click()
        })
    },
    back() {
      this.SET_ERRORS([])
      this.$router.push({ name: 'assets-list-assets' })
    },
    reset() {
      this.isLoading = false
      this.isFile = false
      this.multiplesFIles = []

      this.SET_ERRORS([])
      this.SET_ERRORS_FILE([])
      this.$refs.fileUpload.value = null
    },
    viewModalFile(file) {
      this.displayModalPDF = !this.displayModalPDF

      const fileData =
        this.URLBackend + '/storage/private_uploads/assets/' + file

      $('.file').removeClass('d-none')
      $('.file iframe').attr('src', fileData).removeClass('d-none')
      $('body').addClass('popup-show')
    },
    viewModalImage(file) {
      this.displayModalPDF = !this.displayModalPDF

      const fileData =
        this.URLBackend + '/storage/private_uploads/assets/' + file

      $('.image').removeClass('d-none')
      $('.image img').attr('src', fileData).removeClass('d-none')
      $('body').addClass('popup-show')
    },
    close() {
      $('.popup-image').addClass('d-none')
      $('.popup-image img').addClass('d-none')
      $('.popup-image iframe').addClass('d-none')
      $('body').removeClass('popup-show')
    },
    handleFileMultpleUpload(e) {
      this.isFile = true
      let uploadedFiles = e.target.files

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.multiplesFIles.push(uploadedFiles[i])
      }

      // this.getImagePreviews()
    },
    // getImagePreviews() {
    //   /*
    // 			Iterate over all of the files and generate an image preview for each one.
    // 		*/
    //   for (let i = 0; i < this.files.length; i++) {
    //     /*
    // 				Ensure the file is an image file
    // 			*/
    //     if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
    //       /*
    // 					Create a new FileReader object
    // 				*/
    //       let reader = new FileReader()
    //       /*
    // 					Add an event listener for when the file has been loaded
    // 					to update the src on the file preview.
    // 				*/
    //       reader.addEventListener(
    //         'load',
    //         function () {
    //           document.getElementById('file-' + parseInt(i)).src =
    //             reader.result
    //         }.bind(this),
    //         false
    //       )
    //       /*
    // 					Read the data for the file in through the reader. When it has
    // 					been loaded, we listen to the event propagated and set the image
    // 					src to what was loaded from the reader.
    // 				*/
    //       reader.readAsDataURL(this.files[i])
    //     }
    //   }
    // },
    upload() {
      const uploadBtn = document.getElementById('upload_file')
      uploadBtn.click()
    },
  },
  mounted() {},
}
</script>
