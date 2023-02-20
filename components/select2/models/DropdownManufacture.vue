<template>
  <select class="form-select" name="manufacturer_id" id="manufacture_id"></select>
</template>
<script>
export default {
  props: ['edit'],
  created() {
    // console.log(this.edit)
  },
  mounted: function () {
    const self = this
    if (this.$route.name == 'setting-asset-models-edit-id') {
      $('#manufacture_id')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/manufacture/get-manufacture',
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
            this.edit.result.manufactures.name,
            this.edit.result.manufactures.id,
            true,
            true
          )
          $('#manufacture_id').append(option).change()
    } else {
      $('#manufacture_id')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/manufacture/get-manufacture',
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
      $('#manufacture_id').val(value)
    },
    options: function (options) {
      // update options
      $('#manufacture_id').empty().select2({ data: options })
    },
  },
  destroyed: function () {
    $('#manufacture_id').off().select2('destroy')
  },
}
</script>

