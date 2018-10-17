import api from './index';

const path = {
  list: '/mobile/customer/list', // 我的客户列表 100一级商200二级连锁300终端门店
  listcount: '/mobile/customer/list/count', // 我的客户统计
  customeritem: '/mobile/customer/item', // 我的客户详情
  yearlist: '/mobile/myindex/year/list', // 年度指标数据
  monthlist: '/mobile/myindex/month/list', // 月度指标数据
  yearitem: '/mobile/myindex/year/item', // 年度指标详情
  monthitem: '/mobile/myindex/month/item', // 年度指标详情
  productlist: '/mobile/myproduct/list', // 商品列表
  productitem: '/mobile/myproduct/item', // 商品详情
  productlistall: 'mobile/myproduct/list/all', // 商品下拉列表
  monthall: 'mobile/myindex/month/list/all', // 客户计划月度指标
  yearall: 'mobile/myindex/year/list/all', // 客户计划年度指标
  authdata: 'mobile/customer/list/auth/data', // 客户类型下拉
  listgroup: 'mobile/myindex/year/list/group', // 进度详情
};

// 进度详情
const listgroup = (from) => api.get(path.listgroup, {
  params: from
});

// 客户计划月度指标
const monthall = () => api.get(path.monthall, {});

// 客户计划年度指标
const yearall = () => api.get(path.yearall, {});

// 商品列表
const productlist = (currentPage, commonName) => api.get(path.productlist, {
  params: {
    currentPage,
    commonName,
  },
});

// 商品详情
const productitem = (id) => api.get(path.productitem, {
  params: {
    id,
  },
});

// 我的客户列表
const list = (currentPage, clientName, clientType) => api.get(path.list, {
  params: {
    currentPage,
    clientName,
    clientType,
  },
});

// 我的客户统计
const listcount = () => api.get(path.listcount, {});

// 我的客户详情
const customeritem = (id) => api.get(path.customeritem, {
  params: {
    id,
  },
});

// 年度指标数据
const yearlist = (currentPage, commonName, year) => api.get(path.yearlist, {
  params: {
    currentPage,
    commonName,
    year,
  },
});

// 月度指标数据
const monthlist = (currentPage, commonName, year, month) => api.get(path.monthlist, {
  params: {
    currentPage,
    commonName,
    year,
    month,
  },
});

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

// 商品下拉列表
const productlistall = () => api.get(path.productlistall, {});

// 客户类型下拉列表
const authdata = () => api.get(path.authdata, {});

export default {
  list,
  listgroup,
  authdata,
  yearall,
  monthall,
  listcount,
  yearlist,
  monthlist,
  yearitem,
  monthitem,
  productlist,
  productitem,
  customeritem,
  productlistall,
};
