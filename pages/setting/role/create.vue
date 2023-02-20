<template>
  <div class="grid">
    <PartialsSubheader :name="name" />
    <div class="content-main">
      <div class="container-fluid">
        <div class="col-lg-12">
          <div class="card">
            <FormSettingRole/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Role',
  layout: 'default',
}
</script>
