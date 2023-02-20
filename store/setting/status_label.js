export const strict = false

export const state = () => ({
  labels: [],
  data: [],
  errors: [],
  success: [],
  limit: 10,
  page: 1, //DEFAULT PAGE YANG AKTIF ADALAH 1
  id: '',
})

export const mutations = {
  SET_LABELS_DATA(state, payload) {
    state.labels = payload
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
  getLabelsData({ commit, state }, payload) {
    let search = payload ? payload : ''
    return new Promise((resolve, reject) => {
      this.$axios
        .get(
          `/status-label?search=${search}&page=${state.page}&limit=${state.limit}&role=${this.$auth.user.role_id}`
        )
        .then((response) => {
            commit('SET_LABELS_DATA', response.data)
            resolve()
        })
    })
  },
  storeLabelsData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/status-label/create', payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getLabelsData')
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
      this.$axios.get(`/status-label?id=${payload}`).then((response) => {
        commit('SET_DATA', response.data)
        resolve()
      })
    })
  },
  updateLabelsData({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/status-label/update/${state.id}`, payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getLabelsData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  destroyLabelsData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/status-label/${payload}`)
        .then((response) => {
          dispatch('getLabelsData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
}
