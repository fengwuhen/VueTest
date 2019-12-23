const state = {
    moduleTip: '欢迎使用Vuex模块',
};

const getters = {
    moduleTip: state => state.moduleTip,
};

const mutations = {
    SET_MODULE_TIP(state, data) {
        state.moduleTip = data;
    },
};

const actions = {
    SET_MODULE_TIP(context, data) {
        context.commit('SET_MODULE_TIP', data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};