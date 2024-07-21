import { createStore } from 'vuex'

const store = createStore({
  state: {
    // backParam: '',

    ImageQuery: { isPaged: true },
    refreshing: false,
    isLoggedIn: false
  },
  mutations: {
    // setBackParam(state, param) {
    //   state.backParam = param;
    // },
    setImageSearch(state, searchQuery) {
      Object.assign(state.ImageQuery, searchQuery)
    },
    setImagePage(state, pageConfig) {
      Object.assign(state.ImageQuery, pageConfig)
    },
    beginRefresh(state) {
      state.refreshing = true
    },
    endRefresh(state) {
      state.refreshing = false
    }
  },
  actions: {
    // updateBackParam({ commit }, param) {
    //   commit('setBackParam', param);
    // },
    updateImageSearch({ commit }, searchQuery) {
      commit('setImageSearch', searchQuery)
    },
    updateImagePage({ commit }, pageConfig) {
      commit('setImagePage', pageConfig)
    },
    beginRefresh({ commit }) {
      commit('beginRefresh')
    },
    endRefresh({ commit }) {
      commit('endRefresh')
    }
  },
  getters: {
    // backParam: (state) => state.backParam,
    ImageQuery: (state) => state.ImageQuery,
    refreshing: (state) => state.refreshing
  }
})

export default store
