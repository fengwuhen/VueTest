import Vue from 'vue'
import Vuex from 'vuex'
import demo from './modules/demo'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    themeColor: "#409EFF",
    oldThemeColor: "#409EFF",
  },
  getters: {
    isCollapse: (state) => state.isCollapse,
    themeColor: (state) => state.themeColor,
    oldThemeColor: (state) => state.oldThemeColor,
  },
  mutations: {
    onCollapse(state, data) {
      state.isCollapse = data;
    },
    themeColor(state, data) {
      state.themeColor = data;
    },
    oldThemeColor(state, data) {
      state.oldThemeColor = data;
    }
  },
  actions: {
    onCollapse(context, data) {
      context.commit('onCollapse', data);
    },
    onThemeChange(context, data) {
      context.commit("themeColor", data.themeColor);
      context.commit("oldThemeColor", data.oldThemeColor);
    }
  },
  modules: {
    demo
  }
})