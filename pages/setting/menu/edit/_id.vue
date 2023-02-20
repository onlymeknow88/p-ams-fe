<template>
  <div class="grid">
    <PartialsSubheader :name="name" />
    <div class="content-main">
      <div class="container-fluid">
        <div class="col-lg-12">
          <div class="card">
            <FormSettingMenus/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  data() {
    return {
      name: 'Edit',
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('setting/menu/getData', params.id),
    ])
    return
  },
}
</script>
