const state = {
  isLoading: false, // router切换loading
  isTabSwit: true // tab切换页是否显示
};

const getters = {
  getTabSwit: (state) => state.isTabSwit,
};

const actions = {};

const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  },
  updateTabSwitStatus(state, payload) {
    state.isTabSwit = payload.status;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
