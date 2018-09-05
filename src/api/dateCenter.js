import api from './index';

const path = {
  list: '/mobile/customer/list', // 我的客户列表 100一级商200二级连锁300终端门店
  listcount: '/mobile/customer/list/count', // 我的客户统计
};

// 我的客户列表
const list = () => api.get(path.list, {});

// 我的客户统计
const listcount = (customerType) => api.get(path.listcount, {
  params: {
    customerType,
  },
});

// 我的客户统计
// const listcount = (customerType) => api.get();

export default {
  list,
  listcount,
};
