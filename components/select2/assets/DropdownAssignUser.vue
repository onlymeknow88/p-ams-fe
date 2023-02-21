<template>
  <select class="form-select" name="assigned_to" id="assigned_to"></select>
</template>
<script>
export default {
  created() {
    // console.log(this.edit.result.id)
  },
  mounted: function () {
    const self = this
    const auth_token = localStorage.getItem('auth._token.local')
    if (this.$route.name == 'assets-list-assets-assign-id') {
      $('#assigned_to')
        .select2({
          theme: 'bootstrap-5',
          // minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/list-assets/get-user',
            headers: {
              Authorization: auth_token,
            },
            type: 'post',
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                search: params.term, // search term
              }
            },
            processResults: function (response) {
              return {
                results: response,
              }
            },
            templateResult: function (repo) {
              if (repo.id) {
                return repo.id + ' : ' + repo.text
              }
              return repo.text
            },
            templateSelection: function (repo) {
              if (repo.id) {
                return repo.id + ' : ' + repo.text
              }
              return repo.text
            },
            cache: true,
          },
        })
        .val(this.value)
        .trigger('change')
        .on('change', function () {
          // console.log(this.value)
          self.$emit('input', this.value)
        })
    }
  },
  watch: {
    value: function (value) {
      // update value
      $('#assigned_to').val(value)
    },
    options: function (options) {
      // update options
      $('#assigned_to').empty().select2({ data: options })
    },
  },
  destroyed: function () {
    $('#assigned_to').off().select2('destroy')
  },
}
</script>
