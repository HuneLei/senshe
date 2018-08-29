// 导航页面的配置

// 我的
const userPath = {
  user: '/User',
  editPassword: '/User/editPassword',
  leaveMessage: '/User/leaveMessage',
  myInformation: '/User/myInformation',
  myMessage: '/User/myMessage',
  newMessage: '/User/newMessage',
  systemInfo: '/User/systemInfo',
}

// 数据中心
const DateCenter = {
  dateCenter: '/DateCenter',
  MyClient: '/DateCenter/MyClient',
  IndexItem: '/DateCenter/IndexItem',
  IndexClass: '/DateCenter/IndexClass'
}

// 工作管理
const JobControl = {
  JobControl: '/JobControl',
  CreatPlan: '/JobControl/CreatPlan',
  ControlPlan: '/JobControl/ControlPlan',
  ControlPlanOne: '/JobControl/ControlPlanOne',
  ControlPlanTwo: '/JobControl/ControlPlanTwo',
  CreatInvoic: '/JobControl/CreatInvoic',
  CreatInvoicOne: '/JobControl/CreatInvoicOne'
}

/**
 * name 导航页面的名字
 * isSwit 是否显示Swi页面切换组件
 * isTab 是否显示Tab页面导航组件
 * isShowBack 是否显示返回文字
 * slotRight 右边图标样式组
 * tabList tab页面切换列表
 * initIndex tab的默认页面
 * barIndex bar的默认选项
 */
const baseList = {
  // 工作管理
  [JobControl.CreatInvoicOne]: {
    name: '进销存录入',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: []
  },
  [JobControl.CreatInvoic]: {
    name: '进销存录入',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: []
  },
  [JobControl.JobControl]: {
    name: '工作管理',
    isSwit: false,
    isTab: true,
    isBar: true,
    isShowBack: false,
    isUserShow: true,
    barIndex: 1,
    slotRight: []
  },
  [JobControl.ControlPlan]: {
    name: '客户规划',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: []
  },
  [JobControl.CreatPlan]: {
    name: '添加客户计划',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: []
  },
  [JobControl.ControlPlanOne]: {
    name: '客户规划三级',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: []
  },
  [JobControl.ControlPlanTwo]: {
    name: '客户规划四级',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: []
  },
  // 数据中心
  [DateCenter.dateCenter]: {
    name: '数据中心',
    isSwit: true,
    isTab: false,
    isBar: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: [],
    initIndex: 0,
    barIndex: 0,
    tabList: [
      { name: '我的商品', slot: 'myGoods', path: '/DateCenter' },
      { name: '我的客户', slot: 'myClient', path: '/DateCenter/MyClient' },
      { name: '我的指标', slot: 'myIndex', path: '/DateCenter/IndexItem' }
    ],
  },
  [DateCenter.MyClient]: {
    name: '我的客户',
    isSwit: true,
    isTab: false,
    isShowBack: false,
    isUserShow: true,
    slotRight: [],
    initIndex: 1,
    tabList: [
      { name: '我的商品', slot: 'myGoods', path: '/DateCenter' },
      { name: '我的客户', slot: 'myClient', path: '/DateCenter/MyClient' },
      { name: '我的指标', slot: 'myIndex', path: '/DateCenter/IndexItem' }
    ],
  },
  [DateCenter.IndexItem]: {
    name: '我的指标',
    isSwit: true,
    isTab: false,
    isShowBack: false,
    isUserShow: true,
    slotRight: [],
    initIndex: 2,
    tabList: [
      { name: '我的商品', slot: 'myGoods', path: '/DateCenter' },
      { name: '我的客户', slot: 'myClient', path: '/DateCenter/MyClient' },
      { name: '我的指标', slot: 'myIndex', path: '/DateCenter/IndexItem' }
    ],
  },
  [DateCenter.IndexClass]: {
    name: '商级',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: [],
  },
  // 我的
  [userPath.user]: {
    name: '我的',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: [],
    barIndex: 2,
    isBar: true,
  },
  [userPath.editPassword]: {
    name: '修改密码',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
  },
  [userPath.leaveMessage]: {
    name: '留言详情',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
  },
  [userPath.myInformation]: {
    name: '我的信息',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
  },
  [userPath.myMessage]: {
    name: '我的留言',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    barIndex: 2,
    isBar: false,
    slotRight: [{
      icon: 'iconfont icon-shouji',
      path: 'newMessage'
    }]
  },
  [userPath.newMessage]: {
    name: '新建留言',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    barIndex: 2,
    isBar: false,
    slotRight: []
  },
  [userPath.systemInfo]: {
    name: '系统信息',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
  }
};

export default baseList
