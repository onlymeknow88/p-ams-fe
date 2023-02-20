<template>
  <select class="form-select" id="company"></select>
</template>
<script>
export default {
  props: ['edit'],
  created(){
    console.log(this.edit)
  },
  mounted: function () {
    const self = this
    if (this.$route.name == 'setting-department-edit-id') {
      $('#company')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/company/get-company',
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
        this.edit.result.companies.name,
        this.edit.result.companies.id,
        true,
        true
      )
      $('#company').append(option).change()
    } else {
      $('#company')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/company/get-company',
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
      $('#company').val(value)
    },
    options: function (options) {
      // update options
      $('#company').empty().select2({ data: options })
    },
  },
  destroyed: function () {
    $('#company').off().select2('destroy')
  },
}
</script>
