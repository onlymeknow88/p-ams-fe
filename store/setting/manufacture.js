export const strict = false

export const state = () => ({
  manufactures: [],
  data: [],
  errors: [],
  success: [],
  limit: 10,
  page: 1, //DEFAULT PAGE YANG AKTIF ADALAH 1
  id: '',
})

export const mutations = {
  SET_MANUFACTURES_DATA(state, payload) {
    state.manufactures = payload
  },

  SET_DATA(state, payload) {
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
  //MUTATION UNTUK MENGUBAH VALUE DARI STATE PAGE
  SET_PAGE(state, payload) {
    state.page = payload
  },

  SET_LIMIT(state, payload) {
    state.limit = payload
  },
}

export const actions = {
  getManufacturesData({ commit, state }, payload) {
    let search = payload ? payload : ''
    return new Promise((resolve, reject) => {
      this.$axios
        .get(
          `/manufacture?search=${search}&page=${state.page}&limit=${state.limit}&role=${this.$auth.user.role_id}`
        )
        .then((response) => {
            commit('SET_MANUFACTURES_DATA', response.data)
            resolve()
        })
    })
  },
  storeManufacturesData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/manufacture/create', payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getManufacturesData')
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
      this.$axios.get(`/manufacture?id=${payload}`).then((response) => {
        commit('SET_DATA', response.data)
        resolve()
      })
    })
  },
  updateManufacturesData({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/manufacture/update/${state.id}`, payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getManufacturesData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  destroyManufacturesData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/manufacture/${payload}`)
        .then((response) => {
          dispatch('getManufacturesData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
}
