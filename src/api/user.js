import api from './index';
import config from '../config';

const path = {
  userInfo: '/mobile/manage/info', // 获取用户信息
  mobileAnnt: '/mobile/annt/list', // 我的消息
  mobileItem: '/mobile/annt/item', // 消息详情
  updatePwd: '/mobile/manage/update/pwd', // 修改密码
  msglist: '/mobile/msg/list', // 我的留言
  msgitem: '/mobile/msg/item', // 留言详情
  msgcreate: '/mobile/msg/create', // 新建留言
};

// 登录
const userinfo = (id) => api.get(path.userInfo, {
  params: {
    id,
  },
});

// 我的消息
const mobileAnnt = (currentPage) => api.get(path.mobileAnnt, {
  params: {
    currentPage
  }
});

// 修改密码
const updatePwd = (form) => api.post(path.updatePwd, {
  id: form.id,
  newPwd: form.newPassWord,
  password: form.ageinPassWord,
});

// 修改密码
// const updatePwd = (form) => api.get(path.updatePwd, {
//   params: {
//     id: form.id,
//     newPwd: form.newPassWord,
//     password: form.ageinPassWord,
//   },
// });

// 消息详情
const mobileItem = (id) => api.get(path.mobileItem, {
  params: {
    id,
  },
});

// 我的留言
const msglist = (currentPage) => api.get(path.msglist, {
  params: {
    currentPage
  }
});

// 留言详情
const msgitem = (id) => api.get(path.msgitem, {
  params: {
    id,
  },
});

// 新建留言
const msgcreate = (content) => api.post(path.msgcreate, {
  content
});

export default {
  msglist,
  msgitem,
  userinfo,
  updatePwd,
  mobileAnnt,
  mobileItem,
  msgcreate,
}
