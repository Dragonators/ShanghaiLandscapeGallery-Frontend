import { createStore } from 'vuex'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '@/oidc/oidc.js'

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
  },
  modules: {
    oidcStore: vuexOidcCreateStoreModule(
      oidcSettings,
      {
        namespaced: true,
        dispatchEventsOnWindow: true,
      },
      {
        userLoaded: (user) => console.log('OIDC user is loaded:', user),
        userUnloaded: () => console.log('OIDC user is unloaded'),
        accessTokenExpiring: () => console.log('Access token will expire'),
        accessTokenExpired: () => console.log('Access token did expire'),
        silentRenewError: () => console.log('OIDC user is unloaded'),
        userSignedOut: () => console.log('OIDC user is signed out'),
        oidcError: (payload) => console.log('OIDC error', payload),
        automaticSilentRenewError: (payload) => console.log('OIDC automaticSilentRenewError', payload)
      })
  }
})

export default store
