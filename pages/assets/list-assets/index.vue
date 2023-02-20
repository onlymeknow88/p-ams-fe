<template>
  <div>
    <div v-if="roles.result.access == 'N'">
      <component :is="errorPage" :error="errors" />
    </div>
    <div class="grid" v-else>
      <PartialsSubheader :name="name" />
      <div class="content-main">
        <div class="container-fluid">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div class="card-title">
                  <div class="col-12 item-title">
                    <h6 class="fw-bold">All Assets</h6>
                    <NuxtLink
                      :to="{ name: 'assets-list-assets-create' }"
                      class="btn btn-icon"
                      title="Add"
                      :class="roles.result.edit == 'Y' ? '' : 'disabled'"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8034 2.3584H11.1962C11.0534 2.3584 10.9819 2.42983 10.9819 2.57268V10.9834H3.00042C2.85756 10.9834 2.78613 11.0548 2.78613 11.1977V12.8048C2.78613 12.9477 2.85756 13.0191 3.00042 13.0191H10.9819V21.4298C10.9819 21.5727 11.0534 21.6441 11.1962 21.6441H12.8034C12.9462 21.6441 13.0176 21.5727 13.0176 21.4298V13.0191H21.0004C21.1433 13.0191 21.2147 12.9477 21.2147 12.8048V11.1977C21.2147 11.0548 21.1433 10.9834 21.0004 10.9834H13.0176V2.57268C13.0176 2.42983 12.9462 2.3584 12.8034 2.3584Z"
                          fill="#100F16"
                        />
                      </svg>
                    </NuxtLink>
                    <!-- <div class="col-sm-4 d-flex align-items-center justify-content-center">
                <label for="status" class="col-sm-4 col-form-label form-text text-black">Filter Status :</label>
                <div class="col-sm-8">
                    <select class="form-select">
                        <option value="" selected>All</option>
                        <option value="">Deploy</option>
                        <option value="">Ready to Deploy</option>
                        <option value="">Pending</option>
                        <option value="">Archived</option>
                        <option value="">Requeted</option>
                    </select>
                </div>

            </div> -->
                  </div>
                  <div class="item-title mt-4">
                    <div class="col-xl-12 section-title">
                      <div class="filter-length">
                        <div class="item-filter">
                          <span>Show</span>
                        </div>
                        <div class="item-filter">
                          <select
                            class="form-select"
                            v-model="limit"
                            @change="changeFilter"
                          >
                            <!-- <option value="0" selected="">All</option> -->
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                        <div class="item-filter">
                          <span>Entries</span>
                        </div>
                      </div>
                      <div class="filter-search">
                        <div class="item-search">
                          <span>Search:</span>
                        </div>
                        <div class="item-search">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search"
                            @input="findSearch($event)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <div v-if="$fetchState.pending">
                    <LoadingProsesTableSetting />
                  </div>
                  <b-table
                    v-else
                    hover
                    striped
                    :items="assets.result.data"
                    :fields="fields"
                    show-empty
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    responsive="sm"
                    label-sort-asc=""
                    label-sort-desc=""
                    label-sort-clear=""
                    @sort-changed="SortBy"
                  >
                    <template v-slot:cell(name)="row">
                      <NuxtLink
                        :to="{
                          name: 'assets-list-assets-view-id',
                          params: { id: row.item.id },
                        }"
                        >{{ row.item.name }}</NuxtLink
                      >
                    </template>
                    <template v-slot:cell(serial_no)="row">
                      {{ row.item.serialno }}
                    </template>
                    <template v-slot:cell(model)="row">
                      {{ row.item.models.name }}
                    </template>
                    <template v-slot:cell(status)="row">
                      <div v-html="row.item.Status"></div>
                    </template>
                    <template v-slot:cell(location)="row">
                      {{ row.item.locations.name }}
                    </template>
                    <template v-slot:cell(assigned_user)="row">
                      <div v-html="row.item.AssignedUser"></div>
                    </template>
                    <template v-slot:cell(assign_remove)="row">
                      <NuxtLink
                        v-if="row.item.assigned_to === null"
                        class="btn btn-success color-darkgreen btn-sm form-text-12"
                        to="/"
                        :class="
                          row.item.status_labels.StatuslabelTypeForSelect ==
                          'undeployable'
                            ? 'disabled'
                            : ''
                        "
                      >
                        assign
                      </NuxtLink>
                      <NuxtLink
                        to="/"
                        v-else
                        class="btn btn-dangerous color-red btn-sm form-text-12"
                        :class="
                          row.item.status_labels.StatuslabelTypeForSelect ==
                          'undeployable'
                            ? 'disabled'
                            : ''
                        "
                      >
                        remove
                      </NuxtLink>
                    </template>
                    <template v-slot:cell(actions)="row">
                      <div class="d-flex justify-content-start">
                        <NuxtLink
                          class="btn btn-icon color-softgray-5 mr-6"
                          title="Edit"
                          :class="roles.result.edit == 'Y' ? '' : 'disabled'"
                          :to="{
                            name: 'assets-list-assets-edit-id',
                            params: { id: row.item.id },
                          }"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7503 9.99791H17.5003C17.4021 9.99791 17.3218 10.0783 17.3218 10.1765V17.3193H2.67892V2.67648H9.82178C9.91999 2.67648 10.0003 2.59612 10.0003 2.49791V1.24791C10.0003 1.14969 9.91999 1.06934 9.82178 1.06934H1.78606C1.39097 1.06934 1.07178 1.38853 1.07178 1.78362V18.2122C1.07178 18.6073 1.39097 18.9265 1.78606 18.9265H18.2146C18.6097 18.9265 18.9289 18.6073 18.9289 18.2122V10.1765C18.9289 10.0783 18.8486 9.99791 18.7503 9.99791Z"
                              fill="white"
                            />
                            <path
                              d="M6.51583 10.5091L6.47342 13.1631C6.47118 13.3617 6.6319 13.5247 6.83056 13.5247H6.83949L9.47341 13.46C9.51806 13.4577 9.5627 13.4399 9.59395 13.4086L18.8774 4.14523C18.9466 4.07603 18.9466 3.96219 18.8774 3.893L16.1029 1.12068C16.0672 1.08496 16.0225 1.06934 15.9756 1.06934C15.9288 1.06934 15.8841 1.08719 15.8484 1.12068L6.56717 10.3841C6.53493 10.4178 6.51659 10.4624 6.51583 10.5091ZM7.93324 11.0359L15.9756 3.0113L16.9846 4.018L8.9377 12.047L7.91761 12.0716L7.93324 11.0359Z"
                              fill="white"
                            />
                          </svg>
                        </NuxtLink>
                        <button
                          type="button"
                          class="btn btn-icon color-softgray-5 mr-6"
                          title="Delete"
                          @click="deleteAssets(row.item.id)"
                          :class="roles.result.delete == 'Y' ? '' : 'disabled'"
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
                      </div>
                    </template>
                  </b-table>
                </div>
                <div class="col-xl-12 mt-4">
                  <div class="pagination-footer">
                    <span class="form-text-13 mb-3"
                      >Page
                      {{ assets.result.from ? assets.result.from : 0 }}
                      of
                      {{ assets.result.to ? assets.result.to : 0 }}
                      Showing
                      {{ assets.result.total }}
                    </span>

                    <b-pagination
                      v-model="page"
                      :total-rows="assets.result.total"
                      :per-page="assets.result.per_page"
                      @change="changePage"
                      align="center"
                      first-number
                      last-number
                      prev-text="Prev"
                      next-text="Next"
                      size="sm"
                    >
                    </b-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style>
@media screen and (min-width: 320px) and (max-width: 480px) {
  .tes {
    width: 100% !important;
    padding: 0 !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
}

.tes {
  position: relative;
  padding: 1rem;
  margin: 1rem -15px 0;
}
</style> -->

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import error400 from '~/components/error/400.vue'
export default {
  name: 'Assets',
  data() {
    return {
      name: 'Assets',
      URLbackend: 'http://p-ams-backend.test',
      sortBy: '',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true, label: 'Computer Name' },
        { key: 'serial_no', sortable: false },
        { key: 'model', sortable: false },
        // { key: 'assigned_to', sortable: false },
        { key: 'assigned_type', sortable: false },
        { key: 'assigned_user', sortable: false },
        { key: 'status', sortable: false },
        { key: 'location', sortable: false },
        { key: 'assign_remove', sortable: false, label: 'Assign/Remove' },
        { key: 'actions', sortable: false },
      ],
      search: '',
      items: [],
      timeout: null,
      errors: {
        permission: '',
        message: '',
      },
    }
  },
  async fetch() {
    await this.$axios.$get('list-assets')
  },
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('list_assets/getAssetsData'),
      store.dispatch('list_assets/getRolesData'),
    ])
    return
  },
  computed: {
    ...mapState('list_assets', {
      assets: (state) => state.assets,
      roles: (state) => state.roles,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.roles.result.access == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
  watch: {
    page() {
      this.getAssetsData(this.search)
    },
    limit() {
      this.getAssetsData(this.search)
    },
  },
  methods: {
    ...mapActions('list_assets', [
      'getAssetsData',
      'destroyAssetsData',
      'getRolesData',
    ]),
    ...mapMutations('list_assets', ['SET_PAGE', 'SET_LIMIT']),
    SortBy(e) {
      this.sortBy = e.sortBy
      this.getAssetsData(this.search)
    },
    findSearch(e) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        this.search = e.target.value
        this.SET_PAGE(1)
        this.getAssetsData(this.search)
      }, 600)
    },
    changePage(val) {
      this.SET_PAGE(val)
    },
    changeFilter(e) {
      this.SET_PAGE(1)
      this.SET_LIMIT(e.target.value)
    },
    deleteAssets(id) {
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
          this.destroyAssetsData(id).then()
        }
      })
    },
  },
  mounted() {},
}
</script>
