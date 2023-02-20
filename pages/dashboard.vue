<template>
  <div class="grid">
    <PartialsSubheader :name="name" />
    <div class="content-main">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-12" v-if="$fetchState.pending">
            <div class="card">
              <LoadingProsesCard />
            </div>
          </div>
          <div class="col-lg-3 col-12 mmt-20" v-if="$fetchState.pending">
            <div class="card">
              <LoadingProsesCard />
            </div>
          </div>
          <div class="col-lg-3 col-12 mmt-20" v-if="$fetchState.pending">
            <div class="card">
              <LoadingProsesCard />
            </div>
          </div>
          <div class="col-lg-3 col-12 mmt-20" v-if="$fetchState.pending">
            <div class="card">
              <LoadingProsesCard />
            </div>
          </div>
        </div>
        <CardTotalCard :items="totalLists" />
        <div class="row">
          <div class="col-xl-8 mt-4">
            <div class="card">
              <div v-if="$fetchState.pending" class="card-body">
                <LoadingProsesTable />
              </div>
              <div v-else class="card-body">
                <div class="card-title d-flex justify-content-between">
                  <h6 class="fw-bold">Recent Activity</h6>
                </div>
                <div class="table-responsive">
                  <table class="table hover" id="actionLogs" width="100%">
                    <thead>
                      <tr>
                        <th>Tanngal</th>
                        <th>Admin</th>
                        <th>Action</th>
                        <th>Item</th>
                        <th>Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="action of actionLogs">
                        <td>{{ action.created_at }}</td>
                        <td>{{ action.user_id }}</td>
                        <td>{{ action.item }}</td>
                        <td>{{ action.target }}</td>
                        <td>
                          <span
                            class="badge form-text-11"
                            :class="action.color"
                            >{{ action.action_type }}</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-12 mt-10">
                  <a
                    href="../job/details.html"
                    class="btn btn-primary btn-sm color-darkblue"
                    style="width: 100%"
                    >All View</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 mt-4">
            <div class="card">
              <highchartsPie />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-5 mt-4">
            <div class="card">
              <div v-if="$fetchState.pending" class="card-body">
                <LoadingProsesTable />
              </div>
              <div v-else class="card-body">
                <div class="card-title d-flex justify-content-between">
                  <h6 class="fw-bold">Asset Location</h6>
                </div>
                <div class="table-responsive">
                  <table class="table hover" id="assetLocations" width="100%">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Asset</th>
                        <th>Assigned</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="asset in assetLocations">
                        <td>{{ asset.name }}</td>
                        <td>{{ asset.assets_count }}</td>
                        <td>{{ asset.assigned_assets_count }}</td>
                        <td>{{ asset.users_count }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-12 mt-10">
                  <a
                    href="../job/details.html"
                    class="btn btn-primary btn-sm color-darkblue"
                    style="width: 100%"
                    >All View</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-7 mt-4">
            <div class="card">
              <div v-if="$fetchState.pending" class="card-body">
                <LoadingProsesTable />
              </div>
              <div v-else class="card-body">
                <div class="card-title d-flex justify-content-between">
                  <h6 class="fw-bold">Asset Category</h6>
                </div>
                <div class="table-responsive">
                  <table class="table hover" id="category" width="100%">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>
                          <span title="Asset">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_659_3704)">
                                <path
                                  d="M1.25 2.13879H0.178571C0.0803571 2.13879 0 2.21915 0 2.31737V17.6745C0 17.7727 0.0803571 17.8531 0.178571 17.8531H1.25C1.34821 17.8531 1.42857 17.7727 1.42857 17.6745V2.31737C1.42857 2.21915 1.34821 2.13879 1.25 2.13879ZM19.8438 2.13879H18.7723C18.6741 2.13879 18.5938 2.21915 18.5938 2.31737V17.6745C18.5938 17.7727 18.6741 17.8531 18.7723 17.8531H19.8438C19.942 17.8531 20.0223 17.7727 20.0223 17.6745V2.31737C20.0223 2.21915 19.942 2.13879 19.8438 2.13879ZM3.03571 14.9959H5.53571C5.63393 14.9959 5.71429 14.9156 5.71429 14.8174V2.31737C5.71429 2.21915 5.63393 2.13879 5.53571 2.13879H3.03571C2.9375 2.13879 2.85714 2.21915 2.85714 2.31737V14.8174C2.85714 14.9156 2.9375 14.9959 3.03571 14.9959ZM10.2009 14.9959H11.2723C11.3705 14.9959 11.4509 14.9156 11.4509 14.8174V2.31737C11.4509 2.21915 11.3705 2.13879 11.2723 2.13879H10.2009C10.1027 2.13879 10.0223 2.21915 10.0223 2.31737V14.8174C10.0223 14.9156 10.1027 14.9959 10.2009 14.9959ZM13.0134 14.9959H16.9866C17.0848 14.9959 17.1652 14.9156 17.1652 14.8174V2.31737C17.1652 2.21915 17.0848 2.13879 16.9866 2.13879H13.0134C12.9152 2.13879 12.8348 2.21915 12.8348 2.31737V14.8174C12.8348 14.9156 12.9152 14.9959 13.0134 14.9959ZM7.32143 14.9959H8.39286C8.49107 14.9959 8.57143 14.9156 8.57143 14.8174V2.31737C8.57143 2.21915 8.49107 2.13879 8.39286 2.13879H7.32143C7.22321 2.13879 7.14286 2.21915 7.14286 2.31737V14.8174C7.14286 14.9156 7.22321 14.9959 7.32143 14.9959ZM5.55804 16.4245H3.05804C2.95982 16.4245 2.87946 16.5049 2.87946 16.6031V17.6745C2.87946 17.7727 2.95982 17.8531 3.05804 17.8531H5.55804C5.65625 17.8531 5.73661 17.7727 5.73661 17.6745V16.6031C5.73661 16.5049 5.65625 16.4245 5.55804 16.4245ZM11.2946 16.4245H10.2232C10.125 16.4245 10.0446 16.5049 10.0446 16.6031V17.6745C10.0446 17.7727 10.125 17.8531 10.2232 17.8531H11.2946C11.3929 17.8531 11.4732 17.7727 11.4732 17.6745V16.6031C11.4732 16.5049 11.3929 16.4245 11.2946 16.4245ZM17.0089 16.4245H13.0357C12.9375 16.4245 12.8571 16.5049 12.8571 16.6031V17.6745C12.8571 17.7727 12.9375 17.8531 13.0357 17.8531H17.0089C17.1071 17.8531 17.1875 17.7727 17.1875 17.6745V16.6031C17.1875 16.5049 17.1071 16.4245 17.0089 16.4245ZM8.41518 16.4245H7.34375C7.24554 16.4245 7.16518 16.5049 7.16518 16.6031V17.6745C7.16518 17.7727 7.24554 17.8531 7.34375 17.8531H8.41518C8.51339 17.8531 8.59375 17.7727 8.59375 17.6745V16.6031C8.59375 16.5049 8.51339 16.4245 8.41518 16.4245Z"
                                  fill="#100F16"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_659_3704">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </th>
                        <th>
                          <span title="Accesories">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.7778 4.44446H2.22223C1.92754 4.44446 1.64493 4.56152 1.43655 4.7699C1.22818 4.97827 1.11111 5.26088 1.11111 5.55557V14.4445C1.11111 14.7391 1.22818 15.0218 1.43655 15.2301C1.64493 15.4385 1.92754 15.5556 2.22223 15.5556H17.7778C18.0725 15.5556 18.3551 15.4385 18.5635 15.2301C18.7718 15.0218 18.8889 14.7391 18.8889 14.4445V5.55557C18.8889 5.26088 18.7718 4.97827 18.5635 4.7699C18.3551 4.56152 18.0725 4.44446 17.7778 4.44446V4.44446ZM17.7778 14.4445H2.22223V5.55557H17.7778V14.4445Z"
                                fill="black"
                              />
                              <path
                                d="M3.88889 7.22217H5V8.33328H3.88889V7.22217Z"
                                fill="black"
                              />
                              <path
                                d="M6.11111 7.22217H7.22223V8.33328H6.11111V7.22217Z"
                                fill="black"
                              />
                              <path
                                d="M8.33334 7.22217H9.44446V8.33328H8.33334V7.22217Z"
                                fill="black"
                              />
                              <path
                                d="M10.5555 7.22217H11.6667V8.33328H10.5555V7.22217Z"
                                fill="black"
                              />
                              <path
                                d="M12.7778 7.22217H13.8889V8.33328H12.7778V7.22217Z"
                                fill="black"
                              />
                              <path
                                d="M15 7.22217H16.1111V8.33328H15V7.22217Z"
                                fill="black"
                              />
                              <path
                                d="M3.88889 9.44446H5V10.5556H3.88889V9.44446Z"
                                fill="black"
                              />
                              <path
                                d="M6.11111 9.44446H7.22223V10.5556H6.11111V9.44446Z"
                                fill="black"
                              />
                              <path
                                d="M8.33334 9.44446H9.44446V10.5556H8.33334V9.44446Z"
                                fill="black"
                              />
                              <path
                                d="M10.5555 9.44446H11.6667V10.5556H10.5555V9.44446Z"
                                fill="black"
                              />
                              <path
                                d="M12.7778 9.44446H13.8889V10.5556H12.7778V9.44446Z"
                                fill="black"
                              />
                              <path
                                d="M15 9.44446H16.1111V10.5556H15V9.44446Z"
                                fill="black"
                              />
                              <path
                                d="M15 12.2222H16.0778V13.3333H15V12.2222Z"
                                fill="black"
                              />
                              <path
                                d="M3.88889 12.2222H5V13.3333H3.88889V12.2222Z"
                                fill="black"
                              />
                              <path
                                d="M6.18332 12.2222H13.8222V13.3333H6.18332V12.2222Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </th>
                        <th>
                          <span title="License">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.5115 5.12097L14.882 1.49151C14.7146 1.3241 14.5093 1.20133 14.2861 1.13436V1.0741H1.78606C1.39097 1.0741 1.07178 1.39329 1.07178 1.78838V18.217C1.07178 18.612 1.39097 18.9312 1.78606 18.9312H18.2146C18.6097 18.9312 18.9289 18.612 18.9289 18.217V6.1299C18.9289 5.75044 18.7794 5.38883 18.5115 5.12097ZM7.14321 2.68124H12.8575V5.00267H7.14321V2.68124ZM17.3218 17.3241H2.67892V2.68124H5.71463V5.71695C5.71463 6.11204 6.03383 6.43124 6.42892 6.43124H13.5718C13.9669 6.43124 14.2861 6.11204 14.2861 5.71695V3.16785L17.3218 6.20356V17.3241ZM10.0003 8.44017C8.2258 8.44017 6.78606 9.8799 6.78606 11.6545C6.78606 13.429 8.2258 14.8687 10.0003 14.8687C11.7749 14.8687 13.2146 13.429 13.2146 11.6545C13.2146 9.8799 11.7749 8.44017 10.0003 8.44017ZM10.0003 13.4402C9.01374 13.4402 8.21464 12.6411 8.21464 11.6545C8.21464 10.6678 9.01374 9.86874 10.0003 9.86874C10.987 9.86874 11.7861 10.6678 11.7861 11.6545C11.7861 12.6411 10.987 13.4402 10.0003 13.4402Z"
                                fill="#100F16"
                              />
                            </svg>
                          </span>
                        </th>
                        <th>
                          <span title="Component">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_659_4558)">
                                <path
                                  d="M17.1423 0H2.85662C2.46153 0 2.14233 0.319196 2.14233 0.714286V19.2857C2.14233 19.6808 2.46153 20 2.85662 20H17.1423C17.5374 20 17.8566 19.6808 17.8566 19.2857V0.714286C17.8566 0.319196 17.5374 0 17.1423 0ZM3.74948 1.60714H16.2495V6.25H3.74948V1.60714ZM16.2495 12.3214H3.74948V7.67857H16.2495V12.3214ZM16.2495 18.3929H3.74948V13.75H16.2495V18.3929ZM9.64233 3.21429H5.53519C5.43698 3.21429 5.35662 3.29464 5.35662 3.39286V4.46429C5.35662 4.5625 5.43698 4.64286 5.53519 4.64286H9.64233C9.74055 4.64286 9.82091 4.5625 9.82091 4.46429V3.39286C9.82091 3.29464 9.74055 3.21429 9.64233 3.21429ZM5.53519 10.7143H9.64233C9.74055 10.7143 9.82091 10.6339 9.82091 10.5357V9.46429C9.82091 9.36607 9.74055 9.28571 9.64233 9.28571H5.53519C5.43698 9.28571 5.35662 9.36607 5.35662 9.46429V10.5357C5.35662 10.6339 5.43698 10.7143 5.53519 10.7143ZM12.8566 16.1607C12.8566 16.3975 12.9507 16.6246 13.1181 16.7921C13.2856 16.9595 13.5127 17.0536 13.7495 17.0536C13.9863 17.0536 14.2134 16.9595 14.3808 16.7921C14.5483 16.6246 14.6423 16.3975 14.6423 16.1607C14.6423 15.9239 14.5483 15.6968 14.3808 15.5294C14.2134 15.3619 13.9863 15.2679 13.7495 15.2679C13.5127 15.2679 13.2856 15.3619 13.1181 15.5294C12.9507 15.6968 12.8566 15.9239 12.8566 16.1607V16.1607Z"
                                  fill="#100F16"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_659_4558">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="category of categorys">
                        <td>{{ category.name }}</td>
                        <td>{{ category.type }}</td>
                        <td>{{ category.assets_count }}</td>
                        <td>{{ category.accessories_count }}</td>
                        <td>{{ category.licenses_count }}</td>
                        <td>{{ category.components_count }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-12 mt-10">
                  <a
                    href="../job/details.html"
                    class="btn btn-primary btn-sm color-darkblue"
                    style="width: 100%"
                    >All View</a
                  >
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
export default {
  name: 'Dashboard',
  // layout: 'default',
  data() {
    return {
      name: 'Dashboard',
      categorys: '',
      assetLocations: '',
      actionLogs: '',
      totalLists: [],
      baseURL: 'http://p-ams-backend.test.test/',
    }
  },
  async fetch() {
    const categoryResponse = await this.$axios.$get('dashboard/category')
    this.categorys = categoryResponse.result.data

    const locationAssetResponse = await this.$axios.$get(
      'dashboard/asset-locations'
    )
    this.assetLocations = locationAssetResponse.result.data

    const actionLogResponse = await this.$axios.$get('dashboard/action-log')
    this.actionLogs = actionLogResponse.result.data

    const totalListresponse = await this.$axios.$get('dashboard/total-list')
    this.totalLists = totalListresponse.result.data
    console.log(this.totalLists)
  },
}
</script>

<style>
.table thead th {
  font-size: 13px;
}

.table tbody td {
  font-size: 12px;
}
</style>
