<template>
  <form id="form" @submit="submit">
    <div class="card-body">
      <div class="card-title">
        <div class="col-12 item-title">
          <h6 class="fw-bold">Role</h6>
          <NuxtLink :to="{ name: 'setting-role' }" class="btn btn-icon" title="Back">
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
          for="software"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Role Name</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            v-model="form.name"
            name="name"
            class="form-control"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label
          for="software"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Role Slug</label
        >
        <div class="col-sm-6">
          <input
            type="text"
            :value="slug"
            name="slug"
            id="role_slug"
            class="form-control"
            disabled
          />
        </div>
      </div>
      <div v-if="this.$route.name == 'setting-role-edit-id'" class="mb-3 row">
        <label
          for="software"
          class="col-sm-2 col-form-label form-text-12 text-black text-right mtext-left fw-bold"
          >Permission</label
        >
        <div class="col-sm-7">
          <CheckboxListMenu />
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
          :disabled="isLoading"
        >
          <span
            :class="!isLoading ? 'd-none' : ''"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
            style="width: 0.8rem; height: 0.8rem"
          ></span>
          {{ !this.isLoading ? 'Save' : 'Loading ...' }}
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
    if (this.$route.name == 'setting-role-edit-id') {
      this.form = {
        name: this.role.result.name,
        slug: this.role.result.slug,
      }
    }
  },
  data() {
    return {
      name: 'Create',
      isLoading: false,
      form: {
        name: '',
        slug: '',
      },
    }
  },
  computed: {
    ...mapState('setting/role', {
      role: (state) => state.data,
      errors: (state) => state.errors,
      success: (state) => state.success,
    }),
    slug: function () {
      this.form.slug = this.slugify(this.form.name)
      return this.slugify(this.form.name)
    },
  },
  methods: {
    ...mapActions('setting/role', [
      'storeRolesData',
      'updateRolesData',
      'updatePermissionsData',
      'uploadRolesData',
    ]),
    ...mapMutations('setting/role', ['SET_ID_UPDATE']),
    reset() {
      this.form.name = ''
      this.form.slug = null
      this.isLoading = false
    },
    submit(e) {
      e.preventDefault()
      this.isLoading = true
      const data = Object.fromEntries(new FormData(e.target))
      if (this.$route.name == 'setting-role-edit-id') {
        this.SET_ID_UPDATE(this.$route.params.id)

        this.updateRolesData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-role' })
            })
          }
          this.updatePermissionsData(data).then()
        })

      } else {
        this.storeRolesData(this.form).then(() => {
          if (this.success.code == 200) {
            Swal.fire({
              text: this.success.message,
              type: 'success',
            }).then(() => {
              this.$router.push({ name: 'setting-role' })
            })
          }
        })
      }
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\W+(?!$)/g, '-')
    },
  },

}
</script>
