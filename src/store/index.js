import Vue from 'vue'
import Vuex from 'vuex'
import demo from './demo'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web_site_name: '系统后台',
  },
  getters: {
    web_site_name: (state) => state.web_site_name,
  },
  mutations: {
    SET_WEB_SITE_NAME(state, data) {
      state.web_site_name = data;
    },
  },
  actions: {
    SET_WEB_SITE_NAME(context, data) {
      context.commit('SET_WEB_SITE_NAME', data)
    }
  },
  modules: {
    demo
  }
})