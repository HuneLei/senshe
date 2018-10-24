const state = {
  isLoading: false, // router切换loading
  winHeight: 0, // tab切换页的高度
  enteAnima: 'slideInRights flying', // 进来时候的动画
  leaveAnima: 'slideOutLefts flying', // 出去时候的动画
  defaultPath: '/DateCenter/MyGoods', // 默认选中的tab
  userInfo: {}, // 用户信息
  userFlush: true, // 是否刷新用户信息
  msgFlush: false, // 是否刷新留言信息
  modifier: false, // 是否修改状态
  planDate: {}, // 新增客户计划数据
  position: {}, // 保存滚动条的位置
  showSheet: false, // 退出登录
  clientList: {}, // 进销存查询
  invoicData: {}, // 进销存修改记录
  indexName: '', // 商级名称
  tabIndex: 0, // 进销存tabIndex
  dataStata: false, // 更新状态
  dateValue: '', // 选择的日期
  selectIndex: 1, // 选择的指标
  dataclient: {
    name: '',
    id: '',
  }, // 选择的客户
};

const getters = {
  getTabIndex: (state) => state.tabIndex,
  getDateValue: (state) => state.dateValue,
  getInvoicData: (state) => state.invoicData,
  getShowSheet: (state) => state.showSheet,
  getPosition: (state) => state.position,
  getLoading: (state) => state.isLoading,
  getWinHeight: (state) => state.winHeight,
  getEnteAnima: (state) => state.enteAnima,
  getLeaveAnima: (state) => state.leaveAnima,
  getDefaultPath: (state) => state.defaultPath,
  getUserInfo: (state) => state.userInfo,
  getUserFlush: (state) => state.userFlush,
  getModifier: (state) => state.modifier,
  getPlanDate: (state) => state.planDate,
  getMsgFlush: (state) => state.msgFlush,
  getClientList: (state) => state.clientList,
  getIndexName: (state) => state.indexName,
  getDataState: (state) => state.dataStata,
  getDataClient: (state) => state.dataclient,
  getSelectIndex: (state) => state.selectIndex,
};

const actions = {};

const mutations = {
  updateSelectIndex(state, index) {
    state.selectIndex = index;
  },
  updateDateValue(state, date) {
    state.dateValue = date;
  },
  updateDatacliente(state, data) {
    state.dataclient = data;
  },
  updateDataState(state) {
    state.dataStata = !state.dataStata;
  },
  updateTabIndex(state, index) {
    state.tabIndex = index;
  },
  updateIndexName(state, index) {
    state.indexName = index;
  },
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
  updateDefaultPath(state, path) {
    state.defaultPath = path;
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
