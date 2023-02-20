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
  name: 'Create',
  data() {
    return {
      name: 'Create'
    }
  }
}
</script>

<!-- <script>
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'Create',
  data() {
    return {
      name: 'Create',
      masterMenu: [],
      isVisible: false,
      error: {
        nama_menu: false,
        level_menu: false,
        url: false,
        master_menu: false,
        message: {
          nama_menu: '',
          level_menu: '',
          url: '',
          master_menu: '',
        },
      },
      menu: {
        nama_menu: '',
        master_menu: '',
        level_menu: '',
        url: '',
        icon: '',
        link: '',
        no_urut: '',
      },
    }
  },
  methods: {
    reset() {
      this.menu.nama_menu = ''
      this.menu.master_menu = ''
      this.menu.level_menu = ''
      this.menu.url = ''
      this.menu.icon = ''
      this.menu.link = ''
      this.menu.no_urut = ''

      this.error.nama_menu = false
      this.error.level_menu = false

      this.isVisible = false
    },
    async createMenu() {
      try {
        this.isVisible = !this.isVisible
        let Response = await this.$axios
          .$post('menu/create', this.menu)
          .catch((error) => {
            console.log(error.response.data)

            if (this.error.nama_menu == false) {
              this.error.nama_menu = true
              this.error.message.nama_menu =
                error.response.data.errors.nama_menu[0]
            }
            if (this.error.level_menu == false) {
              this.error.level_menu = true
              this.error.message.level_menu =
                error.response.data.errors.level_menu[0]
            }
          })

        if (Response.meta.code == 200) {
          Swal.fire({
            text: Response.meta.message,
            type: 'success',
          }).then(() => {
            this.$router.push({ name: 'menu' })
          })
        }

        console.log(Response)
      } catch (error) {
        console.log(error)
      }
    },
    selectedMenu(e) {
      this.menu.master_menu = e.target.value
      // alert(this.master_menu)
    },
    selectedLevel(e) {
      this.menu.level_menu = e.target.value
      // alert(this.menu.level_menu)
    },
  },
}
</script> -->
