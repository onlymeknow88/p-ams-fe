<template>
  <div class="nuxt-error">
    <div class="error-image">
      <h1 class="text-bold text-red-validate">Error{{ error.permission }}!</h1>
      <img class="img-fluid mb-30" src="/assets/img/error.png" alt="" />
      <h3 class="text-medium text-gray">Something went wrong!</h3>
      <h3 class="text-medium text-gray" >{{ error.message }}</h3>
      <NuxtLink class="btn btn-primary color-blue back-home" to="/">Back Home</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
.nuxt-error {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background: #ffffff;
}
.error-image {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin-top: 30px; */
}
.error-image h1 {
  font-size: 38px;
}
.error-image h2 {
  font-size: 30px;
}
.error-image img {
  width: 512px;
  height: 341px;
}

.error-image .back-home {
  font-size: 18px !important;
}
</style>
