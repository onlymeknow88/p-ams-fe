export const strict = false

export const state = () => ({
  assets: [],
  files: [],
  users: [],
  roles: [],
  data: [],
  dataFiles: [],
  errors: [],
  fileErrors: [],
  success: [],
  limit: 10,
  page: 1, //DEFAULT PAGE YANG AKTIF ADALAH 1
  id: '',
})

export const mutations = {
  SET_ASSETS_DATA(state, payload) {
    state.assets = payload
  },

  //fetch log file upload
  SET_FILES_DATA(state, payload) {
    state.files = payload
  },

  //fetch log file upload by id
  SET_FILE_DATA(state, payload) {
    state.dataFiles = payload
  },

  SET_USERS_DATA(state, payload) {
    state.users = payload
  },

  SET_ROLES_DATA(state, payload) {
    state.roles = payload
  },

  SET_DATA(state, payload) {
    state.data = payload
  },

  SET_DETAIL_DATA(state, payload) {
    state.data = payload
  },

  SET_ID_UPDATE(state, payload) {
    state.id = payload
  },

  SET_SUCCESS(state, payload) {
    state.success = payload
  },

  SET_ERRORS(state, payload) {
    state.errors = payload
  },

  SET_ERRORS_FILE(state, payload) {
    state.fileErrors = payload
  },
  //MUTATION UNTUK MENGUBAH VALUE DARI STATE PAGE
  SET_PAGE(state, payload) {
    state.page = payload
  },

  SET_LIMIT(state, payload) {
    state.limit = payload
  },

  SET_LIMIT(state, payload) {
    state.limit = payload
  },
}

export const actions = {
  getAssetsData({ commit, state }, payload) {
    let search = payload ? payload : ''
    return new Promise((resolve, reject) => {
      this.$axios
        .get(
          `/list-assets?search=${search}&page=${state.page}&limit=${state.limit}`
        )
        .then((response) => {
          commit('SET_ASSETS_DATA', response.data)
          // console.log(response)
          resolve()
        })
    })
  },
  getFilesData({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/list-assets/upload-file`).then((response) => {
        commit('SET_FILES_DATA', response.data)
        // console.log(response)
        resolve()
      })
    })
  },
  getFileData({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/list-assets/upload-file?id=${payload}`)
        .then((response) => {
          commit('SET_FILE_DATA', response.data)
          // console.log(response)
          resolve()
        })
    })
  },
  getUsersData({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/list-assets/users?id=${payload}`).then((response) => {
        commit('SET_USERS_DATA', response.data)
        resolve()
      })
    })
  },
  getRolesData({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/list-assets/role?role=${this.$auth.user.role_id}`)
        .then((response) => {
          commit('SET_ROLES_DATA', response.data)
          // console.log(response)
          resolve()
        })
    })
  },
  storeAssetsData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/list-assets/create', payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getAssetsData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
          // console.log(error.response.data.errors)
        })
    })
  },
  getData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/list-assets?id=${payload}`).then((response) => {
        commit('SET_DATA', response.data)
        resolve()
      })
    })
  },
  getDetailsData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/list-assets?detail=${payload}`).then((response) => {
        commit('SET_DETAIL_DATA', response.data)
        // console.log(response)
        resolve()
      })
    })
  },
  updateAssetsData({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/list-assets/update/${state.id}`, payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getAssetsData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  destroyAssetsData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/list-assets/${payload}`)
        .then((response) => {
          dispatch('getAssetsData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  destroyFileData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/list-assets/upload-file/${payload}`)
        .then((response) => {
          dispatch('getFilesData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },

  uploadFileData({ dispatch, state, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/list-assets/upload-file/upload?id=${state.id}`, payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getFilesData')
          resolve()
        })
        .catch((error) => {
          if (error.response.status == 422) {
            commit('SET_ERRORS', error.response.data.errors)
          } else if (error.response.data.meta.code == 500) {
            commit('SET_ERRORS_FILE', error.response.data.meta)
            resolve()
          }
        })
    })
  },
  removeUsersData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/list-assets/users/${payload}/remove`)
        .then((response) => {
          console.log(response)
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getUsersData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  // downloadFileData({ dispatch, commit }, payload) {
  //   const auth_token = localStorage.getItem('auth._token.local')
  //   const filename = payload ? payload : ''
  //   return new Promise((resolve, reject) => {
  //     this.$axios
  //       .get(`/list-assets/upload-file/download/${payload}`, {
  //         headers: {
  //           Authorization: auth_token,
  //         },
  //         responseType: 'blob',
  //       })
  //       .then((response) => {
  //         // var fileURL = window.URL.createObjectURL(new Blob([response.data]))
  //         // var fURL = document.createElement('a')

  //         // fURL.href = fileURL
  //         // fURL.setAttribute('download', filename)
  //         // document.body.appendChild(fURL)

  //         // fURL.click()
  //       })
  //   })
  // },
}
