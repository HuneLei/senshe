const state = {
  isLoading: false, // router切换loading
  winHeight: 0, // tab切换页的高度
  enteAnima: 'slideInRight faster', // 进来时候的动画
  leaveAnima: 'slideOutLeft faster', // 出去时候的动画
  defaultIndex: 0, // 默认选中的tab
  userInfo: {}, // 用户信息
  userFlush: true // 是否刷新用户信息
};

const getters = {
  getLoading: (state) => state.isLoading,
  getWinHeight: (state) => state.winHeight,
  getEnteAnima: (state) => state.enteAnima,
  getLeaveAnima: (state) => state.leaveAnima,
  getDefaultIndex: (state) => state.defaultIndex,
  getUserInfo: (state) => state.userInfo,
  getUserFlush: (state) => state.userFlush,
};

const actions = {};

const mutations = {
  updateUserFlush(state, flush) {
    state.userFlush = flush;
  },
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
  },
  updateUserInfo(state, data) {
    state.userInfo = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
