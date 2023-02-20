<template>
  <select class="form-select" name="category_id" id="category_id"></select>
</template>
<script>
export default {
  props: ['edit'],
  created() {
    // console.log(this.edit.result.id)
  },
  mounted: function () {
    const self = this
    if (this.$route.name == 'setting-asset-models-edit-id') {
      $('#category_id')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/category/get-category',
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
            this.edit.result.categories.name,
            this.edit.result.categories.id,
            true,
            true
          )
          $('#category_id').append(option).change()
    } else {
      $('#category_id')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/category/get-category',
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
      $('#category_id').val(value)
    },
    options: function (options) {
      // update options
      $('#category_id').empty().select2({ data: options })
    },
  },
  destroyed: function () {
    $('#category_id').off().select2('destroy')
  },
}
</script>

