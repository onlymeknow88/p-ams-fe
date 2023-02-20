<template>
  <select class="form-select" name="location_id" id="location"></select>
</template>

<script>
export default {
  props: ['error','edit'],
  mounted: function () {
    const self = this
    if (this.$route.name == 'setting-department-edit-id') {
      $('#location')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/location/get-location',
            type: 'post',
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                search: params.term, // search term
              }
            },
            processResults: function (response) {
              console.log(response)
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
          console.log(this.value)
          self.$emit('input', this.value)
        })

      var option = new Option(
        this.edit.result.locations.name,
        this.edit.result.locations.id,
        true,
        true
      )
      $('#location').append(option).change()
    } else {
      $('#location')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/location/get-location',
            type: 'post',
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                search: params.term, // search term
              }
            },
            processResults: function (response) {
              console.log(response)
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
          console.log(this.value)
          self.$emit('input', this.value)
        })
    }
  },
  watch: {
    value: function (value) {
      // update value
      $('#location').val(value)
    },
    options: function (options) {
      // update options
      $('#location').empty().select2({ data: options })
    },
  },
  destroyed: function () {
    $('#location').off().select2('destroy')
  },
}
</script>
