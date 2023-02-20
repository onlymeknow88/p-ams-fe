export const strict = false

export const state = () => ({
  categories: [],
  data: [],
  errors: [],
  success: [],
  limit: 10,
  page: 1, //DEFAULT PAGE YANG AKTIF ADALAH 1
  id: '',
})

export const mutations = {
  SET_CATEGORIES_DATA(state, payload) {
    state.categories = payload
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
  getCategoriesData({ commit, state }, payload) {
    let search = payload ? payload : ''
    return new Promise((resolve, reject) => {
      this.$axios
        .get(
          `/category?search=${search}&page=${state.page}&limit=${state.limit}&role=${this.$auth.user.role_id}`
        )
        .then((response) => {
          commit('SET_CATEGORIES_DATA', response.data)
          resolve()
        })
    })
  },
  storeCategoriesData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/category/create', payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getCategoriesData')
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
      this.$axios.get(`/category?id=${payload}`).then((response) => {
        commit('SET_DATA', response.data)
        resolve()
      })
    })
  },
  updateCategoriesData({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/category/update/${state.id}`, payload)
        .then((response) => {
          commit('SET_SUCCESS', response.data.meta)
          dispatch('getCategoriesData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
  destroyCategoriesData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/category/${payload}`)
        .then((response) => {
          dispatch('getCategoriesData')
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data.errors)
        })
    })
  },
}
