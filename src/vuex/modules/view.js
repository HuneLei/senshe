const state = {
  isLoading: false, // router切换loading
  winHeight: 0, // tab切换页的高度
  enteAnima: 'fadeInRight faster', // 进来时候的动画
  leaveAnima: 'fadeOutLeft faster', // 出去时候的动画
  defaultIndex: 0, // 默认选中的tab
};

const getters = {
  getLoading: (state) => state.isLoading,
  getWinHeight: (state) => state.winHeight,
  getEnteAnima: (state) => state.enteAnima,
  getLeaveAnima: (state) => state.leaveAnima,
  getDefaultIndex: (state) => state.defaultIndex
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
  },
  updateDefaultIndex(state, index) {
    state.defaultIndex = index;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
