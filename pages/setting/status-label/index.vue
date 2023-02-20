<template>
  <div>
    <div v-if="labels.result.role.access == 'N'">
      <component :is="errorPage" :error="errors" />
    </div>
    <div class="grid" v-else>
      <PartialsSubheader :name="name" />
      <div class="content-main">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">
                    <div class="col-12 item-title">
                      <h6 class="fw-bold">Status Label</h6>
                      <NuxtLink
                        :to="{ name: 'setting-status-label-create' }"
                        class="btn btn-icon"
                        title="Add"
                        :class="
                          labels.result.role.create == 'Y' ? '' : 'disabled'
                        "
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
                              @change="changeFilter($event)"
                            >
                              <!-- <option value="0" selected="">All</option> -->
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="50">50</option>
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
                      :items="labels.result.labels.data"
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
                      <template v-slot:cell(asset_count)="row">
                        {{ row.item.AssetCount }}
                      </template>
                      <template v-slot:cell(status_type)="row">
                        <div v-html="row.item.StatuslabelType"></div>
                      </template>
                      <template v-slot:cell(actions)="row">
                        <div class="d-flex justify-content-start">
                          <NuxtLink
                            class="btn btn-icon color-softgray-5 mr-6"
                            title="Edit"
                            :to="{
                              name: 'setting-status-label-edit-id',
                              params: { id: row.item.id },
                            }"
                            :class="
                              labels.result.role.edit == 'Y' ? '' : 'disabled'
                            "
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
                            @click="deleteRole(row.item.id)"
                            :class="
                              labels.result.role.delete == 'Y' ? '' : 'disabled'
                            "
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
                        {{ labels.result.from ? labels.result.from : 0 }} of
                        {{ labels.result.to ? labels.result.to : 0 }}
                        Showing
                        {{ labels.result.total }}
                      </span>
                      <b-pagination
                        v-model="page"
                        :total-rows="labels.result.total"
                        :per-page="labels.result.per_page"
                        @change="changePage"
                      >
                      </b-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mmt-20">
              <span class="fw-bold">About Status Labels</span>
              <div class="d-flex flex-column bd-highlight mb-3">
                <div class="box box-green mt-4">
                  <div class="box-body">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="20" height="20" rx="10" fill="#007256" />
                    </svg>
                    <span class="fw-bold">Deployable: </span>
                    Aset ini dapat diperiksa. Setelah diberikan status berubah
                    menjadi deploy.
                  </div>
                </div>
                <div class="box box-warning mt-4">
                  <div class="box-body">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="20" height="20" rx="10" fill="#E3930F" />
                    </svg>
                    <span class="fw-bold">Pending: </span>
                    Aset-aset ini belum dapat diberikan kepada siapa pun atau
                    dalam pengecekan tim, perangkat masih dalam kondisi
                    perbaikan tetapi bisa ke deployed ketika barang kondisi
                    sudah baik.
                  </div>
                </div>
                <div class="box box-danger mt-4">
                  <div class="box-body">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.31898 8.23731L15.9518 0.331009C16.063 0.199616 15.9695 0 15.7977 0H13.7813C13.6625 0 13.5488 0.0530624 13.4705 0.144027L8 6.66565L2.52951 0.144027C2.45371 0.0530624 2.34 0 2.21872 0H0.202345C0.030524 0 -0.0629672 0.199616 0.0482113 0.331009L6.68102 8.23731L0.0482113 16.1436C0.0233063 16.1729 0.00732877 16.2087 0.00217506 16.2468C-0.00297865 16.2849 0.0029079 16.3237 0.0191365 16.3585C0.035365 16.3934 0.0612539 16.4229 0.093729 16.4434C0.126204 16.464 0.163901 16.4748 0.202345 16.4746H2.21872C2.33748 16.4746 2.45118 16.4216 2.52951 16.3306L8 9.80897L13.4705 16.3306C13.5463 16.4216 13.66 16.4746 13.7813 16.4746H15.7977C15.9695 16.4746 16.063 16.275 15.9518 16.1436L9.31898 8.23731Z"
                        fill="#A71618"
                      />
                    </svg>

                    <span class="fw-bold">Undeployable: </span>
                    Aset ini tidak dapat diberikan kepada siapa pun.
                  </div>
                </div>
                <div class="box box-danger mt-4">
                  <div class="box-body">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.31898 8.23731L15.9518 0.331009C16.063 0.199616 15.9695 0 15.7977 0H13.7813C13.6625 0 13.5488 0.0530624 13.4705 0.144027L8 6.66565L2.52951 0.144027C2.45371 0.0530624 2.34 0 2.21872 0H0.202345C0.030524 0 -0.0629672 0.199616 0.0482113 0.331009L6.68102 8.23731L0.0482113 16.1436C0.0233063 16.1729 0.00732877 16.2087 0.00217506 16.2468C-0.00297865 16.2849 0.0029079 16.3237 0.0191365 16.3585C0.035365 16.3934 0.0612539 16.4229 0.093729 16.4434C0.126204 16.464 0.163901 16.4748 0.202345 16.4746H2.21872C2.33748 16.4746 2.45118 16.4216 2.52951 16.3306L8 9.80897L13.4705 16.3306C13.5463 16.4216 13.66 16.4746 13.7813 16.4746H15.7977C15.9695 16.4746 16.063 16.275 15.9518 16.1436L9.31898 8.23731Z"
                        fill="#A71618"
                      />
                    </svg>
                    <span class="fw-bold">Archived: </span>
                    Informasi tentang aset untuk tujuan disimpan menjadi history
                    dari perangkat, bisa sebagai spare/stock.
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
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import error400 from '~/components/error/400.vue'
export default {
  name: 'Labels',
  layout: 'default',
  async asyncData({ store }) {
    await Promise.all([store.dispatch('setting/status_label/getLabelsData')])
    return
  },
  data() {
    return {
      name: 'Status Label',
      fields: [
        { key: 'name', sortable: true },
        { key: 'status_type', sortable: false, tdClass: 'status' },
        { key: 'asset_count', sortable: false },

        { key: 'actions', sortable: false },
      ],
      sortBy: '',
      sortDesc: false,
      search: '',
      timeout: null,
      errors: {
        permission: '',
        message: '',
      },
    }
  },
  computed: {
    ...mapState('setting/status_label', {
      labels: (state) => state.labels,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.labels.result.role.access == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
  watch: {
    page() {
      this.getLabelsData(this.search)
    },
    limit() {
      this.getLabelsData(this.search)
    },
  },
  methods: {
    ...mapActions('setting/status_label', [
      'getLabelsData',
      'destroyLabelsData',
    ]),
    ...mapMutations('setting/status_label', ['SET_PAGE', 'SET_LIMIT']),
    findSearch(e) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        this.search = e.target.value
        this.SET_PAGE(1)
        this.getLabelsData(this.search)
      }, 600)
    },
    SortBy(e) {
      console.log(e.sortBy)
      this.sortBy = e.sortBy
    },
    changePage(val) {
      this.SET_PAGE(val)
    },
    changeFilter(e) {
      this.SET_PAGE(1)
      this.SET_LIMIT(e.target.value)
    },
    deleteRole(id) {
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
          this.destroyLabelsData(id).then()
        }
      })
    },
  },
  async fetch() {
    await this.$axios.$get('role')
  },
}
</script>
