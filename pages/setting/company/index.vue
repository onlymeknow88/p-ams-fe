<template>
  <div>
    <div v-if="companies.result.role.access == 'N'">
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
                    <h6 class="fw-bold">Locations</h6>
                    <NuxtLink
                      :to="{ name: 'setting-company-create' }"
                      class="btn btn-icon"
                      title="Add"
                      :class="
                        companies.result.role.create == 'Y' ? '' : 'disabled'
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
                            v-model="search"
                            @input="findSearch"
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
                    :items="companies.result.companies.data"
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
                    <template v-slot:cell(actions)="row">
                      <div class="d-flex justify-content-start">
                        <NuxtLink
                          class="btn btn-icon color-softgray-5 mr-6"
                          title="Edit"
                          :to="{
                            name: 'setting-company-edit-id',
                            params: { id: row.item.id },
                          }"
                          :class="
                            companies.result.role.edit == 'Y' ? '' : 'disabled'
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
                          @click="deleteCompany(row.item.id)"
                          :class="
                            companies.result.role.delete == 'Y'
                              ? ''
                              : 'disabled'
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
                      {{
                        companies.result.companies.from
                          ? companies.result.companies.from
                          : 0
                      }}
                      of
                      {{
                        companies.result.companies.to
                          ? companies.result.companies.to
                          : 0
                      }}
                      Showing
                      {{ companies.result.companies.total }}
                    </span>
                    <b-pagination
                      v-model="page"
                      :total-rows="companies.result.companies.total"
                      :per-page="companies.result.companies.per_page"
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

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import error400 from '~/components/error/400.vue'
export default {
  name: 'Company',
  layout: 'default',
  async asyncData({ store }) {
    await Promise.all([store.dispatch('setting/company/getCompaniesData')])
    return
  },
  data() {
    return {
      name: 'Company',
      fields: [
        { key: 'name', sortable: true },
        { key: 'company_tag', sortable: false },
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
    ...mapState('setting/company', {
      companies: (state) => state.companies,
      page: (state) => state.page,
      limit: (state) => state.limit,
    }),
    errorPage() {
      if (this.companies.result.role.access == 'N') {
        this.errors.permission = 400
        this.errors.message = "Don't have permission this page"
        return error400
      }
    },
  },
  methods: {
    ...mapActions('setting/company', [
      'getCompaniesData',
      'destroyCompaniesData',
    ]),
    ...mapMutations('setting/company', ['SET_PAGE', 'SET_LIMIT']),
    findSearch() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        // this.search = e.target.value
        this.SET_PAGE(1)
        this.getCompaniesData(this.search)
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
    deleteCompany(id) {
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
          this.destroyCompaniesData(id).then()
        }
      })
    },
    // sort: function (s) {
    //   //if s == current sort, reverse
    //   if (s === this.currentSort) {
    //     this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
    //   }
    //   this.currentSort = s
    // },
  },
  watch: {
    page() {
      this.getCompaniesData(this.search)
    },
    limit() {
      this.getCompaniesData(this.search)
    },
  },
  async fetch() {
    await this.$axios.$get('company')
  },
}
</script>
