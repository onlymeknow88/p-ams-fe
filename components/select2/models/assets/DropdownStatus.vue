<template>
  <select class="form-select" name="status_id" id="status_id"></select>
</template>
<script>
export default {
  props: ['edit'],
  created() {
    // console.log(this.edit.result.id)
  },
  mounted: function () {
    const self = this
    if (this.$route.name == 'assets-list-assets-edit-id') {
      $('#status_id')
        .select2({
          theme: 'bootstrap-5',
          // minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/status-label/get-status',
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

          var option = new Option(
            this.edit.result.status_labels.name,
            this.edit.result.status_labels.id,
            true,
            true
          )
          $('#status_id').append(option).change()
    } else {
      $('#status_id')
        .select2({
          theme: 'bootstrap-5',
          // minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/status-label/get-status',
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
          // console.log(this.value)
          self.$emit('input', this.value)
        })
    }
  },
  watch: {
    value: function (value) {
      // update value
      $('#status_id').val(value)
    },
    options: function (options) {
      // update options
      $('#status_id').empty().select2({ data: options })
    },
  },
  destroyed: function () {
    $('#status_id').off().select2('destroy')
  },
}
</script>

