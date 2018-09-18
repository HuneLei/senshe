const state = {
  isLoading: false, // router切换loading
  winHeight: 0, // tab切换页的高度
  enteAnima: 'slideInRight faster', // 进来时候的动画
  leaveAnima: 'slideOutLeft faster', // 出去时候的动画
  defaultIndex: 0, // 默认选中的tab
  userInfo: {}, // 用户信息
  userFlush: true, // 是否刷新用户信息
  msgFlush: false, // 是否刷新留言信息
  modifier: false, // 是否修改状态
  planDate: {}, // 新增客户计划数据
  position: {}, // 保存滚动条的位置
  showSheet: false, // 退出登录
  clientList: {}, // 进销存查询
  invoicData: {}, // 进销存修改记录
};

const getters = {
  getInvoicData: (state) => state.invoicData,
  getShowSheet: (state) => state.showSheet,
  getPosition: (state) => state.position,
  getLoading: (state) => state.isLoading,
  getWinHeight: (state) => state.winHeight,
  getEnteAnima: (state) => state.enteAnima,
  getLeaveAnima: (state) => state.leaveAnima,
  getDefaultIndex: (state) => state.defaultIndex,
  getUserInfo: (state) => state.userInfo,
  getUserFlush: (state) => state.userFlush,
  getModifier: (state) => state.modifier,
  getPlanDate: (state) => state.planDate,
  getMsgFlush: (state) => state.msgFlush,
  getClientList: (state) => state.clientList,
};

const actions = {};

const mutations = {
  updateInvoicData(state, data) {
    state.invoicData = data;
  },
  updateClientList(state, list) {
    state.clientList = list;
  },
  updateShowSheet(state, show) {
    state.showSheet = show;
  },
  updatePosition(state, position) {
    state.position = position;
  },
  updatemsgFlush(state, instate) {
    state.msgFlush = instate;
  },
  updatePlanDate(state, data) {
    state.planDate = data;
  },
  updateModifier(state, instate) {
    state.modifier = instate;
  },
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
