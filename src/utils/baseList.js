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
  IndexClass: '/DateCenter/IndexClass',
  IndexItem: '/DateCenter/IndexItem',
  clientItem: '/DateCenter/ClientItem'
}

// 工作管理
const JobControl = {
  JobControl: '/JobControl',
  CreatPlan: '/JobControl/CreatPlan',
  QueryInvoic: '/JobControl/QueryInvoic',
  QueryInvoicItem: '/JobControl/QueryInvoicItem',
  ControlPlan: '/JobControl/ControlPlan',
  ControlPlanList: '/JobControl/ControlPlanList',
  ControlPlanItem: '/JobControl/ControlPlanItem',
  CreatInvoic: '/JobControl/CreatInvoic',
  CreatInvoicItem: '/JobControl/CreatInvoicItem',
  FollowUp: '/JobControl/FollowUp',
  FollowUpList: '/JobControl/FollowUpList',
  FollowUpItem: '/JobControl/FollowUpItem',
  InvoicList: '/JobControl/InvoicList'
}

/**
 * name 导航页面的名字
 * isTab 是否显示Tab页面导航组件
 * isShowBack 是否显示返回文字
 * slotRight 右边图标样式组
 * tabList tab页面切换列表
 * initIndex tab的默认页面
 * barIndex bar的默认选项
 * isTabSiw 是否带有切换
 * headIndex 头部导航的类型
 */
const baseList = {
  // 工作管理
  [JobControl.CreatInvoicItem]: {
    name: '进销存录入',
    isTab: true,
    isShowBack: true,
    headIndex: 0,
    slotRight: [{
      icon: 'iconfont icon-jiahao',
      path: 'CreatInvoic'
    }, {
      icon: 'iconfont icon-bianji',
      path: 'CreatPlan'
    }]
  },
  [JobControl.InvoicList]: {
    name: '进销存录入',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0,
  },
  [JobControl.CreatInvoic]: {
    name: '进销存录入',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0,
    isBar: false,
  },
  [JobControl.JobControl]: {
    name: '工作管理',
    isTab: true,
    isBar: true,
    isShowBack: false,
    barIndex: 1,
    slotRight: [],
    headIndex: 0,
  },
  [JobControl.ControlPlan]: {
    name: '客户规划',
    isTab: true,
    isShowBack: true,
    slotRight: [{
      icon: 'iconfont icon-jiahao',
      path: 'CreatPlan'
    }],
    headIndex: 0,
  },
  [JobControl.QueryInvoic]: {
    name: '进销存查询(末次)',
    isTab: true,
    isBar: false,
    isShowBack: true,
    barIndex: 1,
    slotRight: [],
    headIndex: 0,
  },
  [JobControl.QueryInvoicItem]: {
    name: '进销存查询(末次)',
    isTab: true,
    isBar: false,
    isTabSiw: true,
    isShowBack: true,
    barIndex: 1,
    slotRight: [],
    headIndex: 1,
  },
  [JobControl.CreatPlan]: {
    name: '添加客户计划',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0
  },
  [JobControl.ControlPlanList]: {
    name: '客户规划',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0,
  },
  [JobControl.ControlPlanItem]: {
    name: '客户规划',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0,
  },
  [JobControl.FollowUp]: {
    name: '进度查询',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0,
  },
  [JobControl.FollowUpList]: {
    name: '进度查询',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0,
  },
  [JobControl.FollowUpItem]: {
    name: '进度查询',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    headIndex: 0,
  },
  // 数据中心
  [DateCenter.dateCenter]: {
    name: '数据中心',
    isTab: true,
    isBar: true,
    isShowBack: false,
    slotRight: [],
    initIndex: 0,
    barIndex: 0,
    headIndex: 2,
  },
  [DateCenter.IndexClass]: {
    name: '商级',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 0,
    headIndex: 0,
  },
  [DateCenter.IndexItem]: {
    name: '指标详情',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 0,
    headIndex: 0,
  },
  [DateCenter.clientItem]: {
    name: '客户详情',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 0,
    headIndex: 0,
  },
  // 我的
  [userPath.user]: {
    name: '我的',
    isTab: true,
    isShowBack: false,
    slotRight: [],
    barIndex: 2,
    isBar: true,
    headIndex: 0,
  },
  [userPath.editPassword]: {
    name: '修改密码',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
    headIndex: 0,
  },
  [userPath.leaveMessage]: {
    name: '留言详情',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
    headIndex: 0,
  },
  [userPath.myInformation]: {
    name: '我的信息',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
    headIndex: 0,
  },
  [userPath.myMessage]: {
    name: '我的留言',
    isTab: true,
    isShowBack: true,
    barIndex: 2,
    isBar: false,
    slotRight: [{
      icon: 'iconfont icon-jiahao',
      path: 'newMessage'
    }],
    headIndex: 0,
  },
  [userPath.newMessage]: {
    name: '新建留言',
    isTab: true,
    isShowBack: true,
    barIndex: 2,
    isBar: false,
    slotRight: [],
    headIndex: 0,
  },
  [userPath.systemInfo]: {
    name: '系统信息',
    isTab: true,
    isShowBack: true,
    slotRight: [],
    barIndex: 2,
    isBar: false,
    headIndex: 0,
  }
};

export default baseList
