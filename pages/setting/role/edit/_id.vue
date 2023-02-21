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
  name: 'Edit',
  data() {
    return {
      name: 'Edit',
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('setting/role/getData', params.id),
    ])
    return
  },
}
</script>

<!-- <script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  name: 'Role',
  layout: 'default',
  data() {
    return {
      name: 'Edit',
      isLoading: false,
      list_permission: '',
      access: [],
      view: [],
      delete: [],
      edit: [],
      error: {
        name: false,
        message: {
          name: '',
        },
      },
      form: {
        name: '',
        slug: '',
      },
    }
  },
  computed: {
    slug: function () {
      this.form.slug = this.slugify(this.form.name)
      return this.slugify(this.form.name)
    },
  },
  methods: {
    reset() {
      this.form.name = ''
      this.form.slug = ''

      this.error.name = false

      this.isLoading = false
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\W+(?!$)/g, '-')
    },
    async createRole(event) {
      try {
        this.isLoading = !this.isLoading

        const data = Object.fromEntries(new FormData(event.target))

        let Response = await this.$axios.$post('role/update/'+ this.$route.params.id, this.form).catch((error) => {

          if (this.error.name == false) {
            this.error.name = true
            this.error.message.name =
              error.response.data.errors.name[0]
          }
        })

        if (Response.meta.code == 200) {
          Swal.fire({
            text: Response.meta.message,
            type: 'success',
          }).then(() => {
            this.$router.push({ name: 'role' })
          })
        }

        await this.$axios.$post('permission/update/1', data)
      } catch (error) {
        console.log(error)
      }
    },
  },
  async fetch() {
    let response = await this.$axios.$get('role', {
      params: {
        id: this.$route.params.id,
      },
    })

    this.form.name = response.result.name
    this.form.slug = response.result.slug
  },
}
</script> -->
