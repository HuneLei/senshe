import api from './index';

const path = {
  list: '/mobile/customer/list', // 我的客户列表 100一级商200二级连锁300终端门店
  listcount: '/mobile/customer/list/count', // 我的客户统计
  customeritem: '/mobile/customer/list/item', // 我的客户详情
  yearlist: '/mobile/myindex/year/list', // 年度指标数据
  monthlist: '/mobile/myindex/month/list', // 月度指标数据
  yearitem: '/mobile/myindex/year/item', // 年度指标详情
  monthitem: '/mobile/myindex/month/item', // 年度指标详情
  productlist: '/mobile/myproduct/list', // 商品列表
  productitem: '/mobile/myproduct/item', // 商品详情
};

// 商品列表
const productlist = () => api.get(path.productlist, {});

// 商品详情
const productitem = (id) => api.get(path.productitem, {
  params: {
    id,
  },
});

// 我的客户列表
const list = (customerType) => api.get(path.list, {
  params: {
    customerType,
  },
});

// 我的客户统计
const listcount = () => api.get(path.listcount, {});

// 我的客户统计
const customeritem = (id) => api.get(path.customeritem, {
  params: {
    id,
  },
});

// 年度指标数据
const yearlist = () => api.get(path.yearlist, {});

// 月度指标数据
const monthlist = () => api.get(path.monthlist, {});

// 年度指标详情
const yearitem = (id) => api.get(path.yearitem, {
  params: {
    id,
  },
});

// 月度指标详情
const monthitem = (id) => api.get(path.monthitem, {
  params: {
    id,
  },
});

export default {
  list,
  listcount,
  yearlist,
  monthlist,
  yearitem,
  monthitem,
  productlist,
  productitem,
  customeritem,
};
