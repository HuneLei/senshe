const state = {
  isLoading: false, // router切换loading
  winHeight: 0 // tab切换页的高度
};

const getters = {
  getWinHeight: (state) => state.winHeight,
};

const actions = {};

const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  },
  updateWinHeight(state, payload) {
    console.log(1111111)
    state.winHeight = payload.height;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
