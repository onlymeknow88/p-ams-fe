<template>
  <div class="row">
    <div v-bind:class="item.name != 'Assets' ? 'mmt-20' : ''" class="col-lg-3 col-12" v-for="(item, index) in items" :key="index">
      <div>
        <div class="card" :class="item.color_card">
          <div class="card-body">
            <div
              class="float-end mt-3 mr-10"
              style="position: relative; height: 40px"
            >
              <img :src="'/assets/icon/' + item.icon +'.svg'" alt="" />
            </div>
            <p class="text-softgray form-text-16">Total {{ item.name}}</p>
            <h4 class="text-softgray fw-bold">{{ item.totalCount}}</h4>
          </div>
          <div class="horizontal-line color-softgray-2"></div>
          <div class="card-footer">
            <a href="#" class="btn-group">
              <p class="text-softgray">More Info</p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3751 7.56758L7.62871 1.71222C7.57693 1.66758 7.51085 1.64258 7.44121 1.64258H5.86085C5.72871 1.64258 5.668 1.80686 5.768 1.89258L12.0216 7.32115H1.57157C1.493 7.32115 1.42871 7.38544 1.42871 7.46401V8.53544C1.42871 8.61401 1.493 8.67829 1.57157 8.67829H12.0198L5.76621 14.1069C5.66621 14.1944 5.72693 14.3569 5.85907 14.3569H7.493C7.52693 14.3569 7.56085 14.3444 7.58585 14.3212L14.3751 8.43186C14.437 8.37811 14.4865 8.31171 14.5205 8.23716C14.5545 8.16261 14.572 8.08164 14.572 7.99972C14.572 7.9178 14.5545 7.83683 14.5205 7.76228C14.4865 7.68773 14.437 7.62133 14.3751 7.56758V7.56758Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  data() {
    return {}
  },
}
</script>

<!-- <style>
.row {
  display: flex !important;
  justify-content: flex-start !important;
  flex-direction: row !important;
}
</style> -->
