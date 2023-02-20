export const strict = false

export const state = () => ({
  menus: [],
  data: [],
  errors: [],
  success: [],
  limit: 10,
  page: 1, //DEFAULT PAGE YANG AKTIF ADALAH 1
  id: '',
})

export const mutations = {
  SET_MENUS_DATA(state, payload) {
    state.menus = payload
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

  SET_PAGE(state, payload) {
    state.page = payload
  },

  SET_LIMIT(state, payload) {
    state.limit = payload
  },
}

export const actions = {
  getMenusData({ commit, state }, payload) {
    let search = payload ? payload : ''
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/menu?search=${search}&page=${state.page}&limit=${state.limit}`)
        .then((response) => {
          commit('SET_MENUS_DATA', response.data) //JIKA BERHASIL, SET DATA BARU
          resolve()
        })
    })
  },
  storeMenusData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/menu/create', payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getMenusData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  getData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/menu?id=${payload}`).then((response) => {
        commit('SET_DATA', response.data)
        resolve()
      })
    })
  },
  updateMenusData({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/menu/update/${state.id}`, payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getMenusData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  destroyMenusData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/menu/${payload}`)
        .then((response) => {
          dispatch('getMenusData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
}
