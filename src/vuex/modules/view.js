const state = {
  isLoading: false, // router切换loading
  winHeight: 0, // tab切换页的高度
  enteAnima: 'fadeInRight faster', // 进来时候的动画
  leaveAnima: 'fadeOutLeft faster', // 出去时候的动画
};

const getters = {
  getLoading: (state) => state.isLoading,
  getWinHeight: (state) => state.winHeight,
  getEnteAnima: (state) => state.enteAnima,
  getLeaveAnima: (state) => state.leaveAnima,
};

const actions = {};

const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  },
  updateWinHeight(state, payload) {
    state.winHeight = payload.height;
  },
  updateEnteAnima(state, anima) {
    state.enteAnima = anima;
  },
  updateLeaveAnima(state, anima) {
    state.leaveAnima = anima;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
