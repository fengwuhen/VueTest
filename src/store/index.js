import Vue from 'vue'
import Vuex from 'vuex'
import demo from './demo'
import config from '../config/server'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web_site_name: config.system_name,
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