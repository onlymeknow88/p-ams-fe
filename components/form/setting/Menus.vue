<template>
  <form id="form" @submit="submit">
    <div class="card-body">
      <div class="card-title">
        <div class="col-12 item-title">
          <h6 class="fw-bold">Menus</h6>
          <NuxtLink :to="{ name: 'setting-menu' }" @click="reset" class="btn btn-icon" title="Back">
            <img
              src="/assets/icon/icon_arrow_left.svg"
              alt=""
              width="20"
              height="20"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="nama"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Nama Menu</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.nama_menu }"
            v-model="form.nama_menu"
          />
          <div v-if="errors.nama_menu" class="invalid-feedback" id="feedback-1">
            {{ errors.nama_menu[0]}}
          </div>
        </div>
      </div>
      <!-- <div class="mb-3 row">
                <label
                  for="master"
                  class="col-sm-2 col-form-label form-text-12 text-black text-right"
                  >Master Menu</label
                >
                <div class="col-sm-6">
                  <select
                    type="text"
                    class="form-select"
                    data-placeholder="Choose one thing"
                    @input="selectedMenu($event)"
                  >
                    <option v-for="m in masterMenu" :value="m.id">
                      {{ m.name }}
                    </option>
                  </select>
                </div>
              </div> -->
      <div class="mb-3 row">
        <label
          for="name"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Master Menu</label
        >
        <div class="col-sm-6">
          <Select2MenuDropdownMasterMenu
            v-model="form.master_menu"
            :error="errors"
            :edit="menu"
          />
          <div
            class="invalid-feedback-costum"
            id="feedback-1"
            v-if="errors.master_menu"
          >
            {{ errors.message.master_menu }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="level"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Level Menu</label
        >
        <div class="col-sm-6">
          <select
            type="text"
            class="form-select"
            @input="selectedLevel($event)"
            v-bind:class="{ 'is-invalid': errors.level_menu }"
          >
            <option value="main_menu">Main Menu</option>
            <option value="sub_menu">Sub Menu</option>
          </select>
          <div
            v-if="errors.level_menu"
            class="invalid-feedback visible"
            id="feedback-1"
          >
            {{ errors.level_menu[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="url"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Url</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            v-model="form.url"
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.url }"
          />
          <div
            v-if="errors.url"
            class="invalid-feedback visible"
            id="feedback-1"
          >
            {{ errors.url[0] }}
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="link"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Link</label
        >
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="form.link" />
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="icon"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Icon</label
        >
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="form.icon" />
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="no"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Urutan</label
        >
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="form.no_urut" />
        </div>
      </div>
    </div>
    <div class="horizontal-line color-shadow"></div>
    <div class="card-footer mb-10">
      <div class="button-group col-12">
        <button
          type="submit"
          class="btn btn-primary color-blue col-12"
          id="submit"
          :disabled="isVisible"
        >
          <span
            :class="!isVisible ? 'd-none' : ''"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
            style="width: 0.8rem; height: 0.8rem"
          ></span>
          {{ !this.isVisible ? 'Save' : 'Loading ...' }}
        </button>
        <button type="button" class="btn btn-link col-12 ms-2" @click="reset">
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'Create',
  created() {
    if (this.$route.name == 'setting-menu-edit-id') {
      this.form = {
        nama_menu: this.menu.result.nama_menu,
        master_menu: this.menu.result.master_menu,
        level_menu: this.menu.result.level_menu,
        url: this.menu.result.url,
        link: this.menu.result.link,
        icon: this.menu.result.icon,
        no_urut: this.menu.result.no_urut,
      }
    }
  },
  data() {
    return {
      name: 'Create',
      isVisible: false,
      form: {
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
  computed: {
    ...mapState('setting/menu', {
      menu: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
  },
  methods: {
    ...mapActions('setting/menu', [
      'storeMenusData',
      'updateMenusData',
      'uploadMenusData',
    ]),
    ...mapMutations('setting/menu', ['SET_ID_UPDATE']),
    reset() {
      this.form.nama_menu = ''
      this.form.master_menu = ''
      this.form.level_menu = ''
      this.form.url = ''
      this.form.icon = ''
      this.form.link = ''
      this.form.no_urut = ''

      this.menu = ''

      this.isVisible = false
    },
    submit(e) {
      e.preventDefault()
      this.isVisible = true

      if (this.$route.name == 'menu-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateMenusData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-menu' })
            })
          }
        })
      } else {
        this.storeMenusData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-menu' })
            })
          }
        })
      }
    },
    selectedMenu(e) {
      this.form.master_menu = e.target.value
    },
    selectedLevel(e) {
      this.form.level_menu = e.target.value
    },
  },
}
</script>
