<template>
  <select class="form-select" id="master_menu"></select>
</template>
<script>
export default {
  props: ['edit'],
  created() {
    console.log(this.edit)
  },
  mounted: function () {
    const self = this
    if (this.$route.name == 'setting-menu-edit-id') {
      $('#master_menu')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/menu/master-menu',
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

        if(this.edit.result.parent != null) {
          var option = new Option(
            this.edit.result.parent.nama_menu,
            this.edit.result.parent.id,
            true,
            true
          )
          $('#master_menu').append(option).change()
        }
    } else {
      $('#master_menu')
        .select2({
          theme: 'bootstrap-5',
          minimumInputLength: 2,
          placeholder: 'Choose an option',
          allowClear: true,
          ajax: {
            url: 'http://p-ams-backend.test/api/menu/master-menu',
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
      $('#master_menu').val(value)
    },
    options: function (options) {
      // update options
      $('#master_menu').empty().select2({ data: options })
    },
  },
  destroyed: function () {
    $('#master_menu').off().select2('destroy')
  },
}
</script>

<!-- <template>
  <div class="dropdown-wrapper">
    <div @click="isLoading = !isLoading" class="selected-item" v-bind:class="{ 'is-invalid': error.master_menu }">
      <span v-if="selectedItem">{{ selectedItem.name }}</span>
      <span v-else-if="this.$route.name == 'menu-edit-id'">{{ edit.parent != null ? edit.parent.nama_menu : 'Choose an option' }}</span>
      <span v-else>Choose an option</span>
      <div class="button-group">
        <img
          v-if="selectedItem"
          @click="close"
          class="icon-dropdown"
          src="/assets/icon/icon_close.svg"
          alt=""
          width="14"
          height="14"
        />
        <img v-if="error.master_menu" class="icon-dropdown" src="/assets/icon/icon_info_error.svg" alt="" width="14" height="14">
        <img
          :class="isLoading ? 'dropdown' : ''"
          class="icon-dropdown"
          src="/assets/icon/icon_arrow_up.svg"
          alt=""
          width="14"
          height="14"
        />
      </div>
    </div>
    <div v-show="isLoading" class="dropdown-popover" id="dropdown-popover">
      <div class="item-popover">
        <input
          @input="debouncesearch($event)"
          type="text"
          placeholder="Search"
          class="form-control"
        />
      </div>
      <span class="form-text-12 text-center mt-2 mb-2" v-if="data.length == 0"
        >Data not found</span
      >
      <div v-else class="options">
        <ul>
          <li
            @click="selected(m)"
            v-for="(m, index) in data"
            :value="m.id"
            :key="index"
          >
            <span>{{ m.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error','edit'],
  data() {
    return {
      search: '',
      selectedItem: null,
      isLoading: false,
      timeout: null,
      data: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    selected(val) {
      this.selectedItem = val
      this.isLoading = false
      this.$emit('input', this.selectedItem.id)
    },
    close() {
      this.selectedItem = null
      this.isLoading = false
      this.$emit('input', null)
    },
    async getData() {
      const Response = await this.$axios.$get('menu/master-menu')
      this.data = Response
    },
    debouncesearch(e) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        const query = e.target.value.toLowerCase()

        const Response = await this.$axios.$get('menu/master-menu', {
          params: {
            search: query,
          },
        })
        this.data = Response
        this.getData
      }, 600)
    },
  },
}
</script> -->
