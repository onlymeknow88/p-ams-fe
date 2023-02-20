<template>
  <div class="grid">
    <PartialsSubheader :name="name" />
    <div class="content-main">
      <div class="container-fluid py-4">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h6>All Licenses</h6>
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
              <div class="table-responsive">
                <table class="table" width="100%">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>License</th>
                      <th>Product Key</th>
                      <th>License to Name</th>
                      <th>License to Email</th>
                      <th>Company</th>
                      <th>Manufacture</th>
                      <th>Total</th>
                      <th>Available</th>
                      <th>Assign/Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr role="row" class="odd">
                      <td class="sorting_1">
                        <div class="d-flex justify-content-start">
                          <a
                            class="btn btn-icon color-softgray-5 mr-6"
                            title="Edit"
                            href="http://p-ams.test/license/1/edit"
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
                              ></path>
                              <path
                                d="M6.51583 10.5091L6.47342 13.1631C6.47118 13.3617 6.6319 13.5247 6.83056 13.5247H6.83949L9.47341 13.46C9.51806 13.4577 9.5627 13.4399 9.59395 13.4086L18.8774 4.14523C18.9466 4.07603 18.9466 3.96219 18.8774 3.893L16.1029 1.12068C16.0672 1.08496 16.0225 1.06934 15.9756 1.06934C15.9288 1.06934 15.8841 1.08719 15.8484 1.12068L6.56717 10.3841C6.53493 10.4178 6.51659 10.4624 6.51583 10.5091ZM7.93324 11.0359L15.9756 3.0113L16.9846 4.018L8.9377 12.047L7.91761 12.0716L7.93324 11.0359Z"
                                fill="white"
                              ></path>
                            </svg>
                          </a>
                          <button
                            type="button"
                            class="btn btn-icon color-softgray-5 mr-6"
                            title="Delete"
                            onclick="deleteData(`http://p-ams.test/license/1`)"
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td>
                        <a href="http://p-ams.test/license/view/1"
                          >Microsoft Project 2016</a
                        >
                      </td>
                      <td>
                        <div class="td_auto">78DJ8-NBH94-KY747-2VBYH-FJRHD</div>
                      </td>
                      <td><div class="td_auto">Zakaria Rainal Anoi</div></td>
                      <td><div class="td_w_8">zakaria.anoi@adaro.com</div></td>
                      <td>PT Maruwai Coal</td>
                      <td>MIcrosoft</td>
                      <td>5</td>
                      <td>5</td>
                      <td>
                        <a href="http://p-ams.test/license/checkout/1"
                          ><button
                            type="button"
                            class="btn btn-success color-green btn-sm"
                            data-toggle="tooltip"
                            title="Check this item out"
                          >
                            Assign
                          </button></a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  name: 'Menu',
  layout: 'default',
  data() {
    return {
      name: 'License',
    }
  },
}
</script>
