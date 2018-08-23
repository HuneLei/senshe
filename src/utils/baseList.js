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
const DateCenter = {}

// 工作管理
const JobControl = {}

/**
 * name 导航页面的名字
 * isSwit 是否显示Swi页面切换组件
 * isTab 是否显示Tab页面导航组件
 * isShowBack 是否显示返回文字
 * slotRight 右边图标样式组
 */
const baseList = {
  [userPath.user]: {
    name: '我的',
    isSwit: false,
    isTab: true,
    isShowBack: false,
    isUserShow: true,
    slotRight: []
  },
  [userPath.editPassword]: {
    name: '修改密码',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: []
  },
  [userPath.leaveMessage]: {
    name: '留言详情',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: []
  },
  [userPath.myInformation]: {
    name: '我的信息',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: []
  },
  [userPath.myMessage]: {
    name: '我的留言',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: [{
      icon: 'iconfont icon-shouji',
      name: 'shouji1'
    }]
  },
  [userPath.newMessage]: {
    name: '新建留言',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: []
  },
  [userPath.systemInfo]: {
    name: '系统信息',
    isSwit: false,
    isTab: true,
    isShowBack: true,
    slotRight: []
  }
};

export default baseList
