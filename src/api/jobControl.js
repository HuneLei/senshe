import api from './index';

const path = {
  add: 'mobile/customer/plan/list/add', // 添加客户计划
  threelist: 'mobile/customer/plan/three/list', // 客户计划查询
  threeitem: 'mobile/customer/plan/three/list/item', // 客户计划详情
  updateplan: 'mobile/customer/plan/update', // 更新客户计划
  createInventory: 'mobile/inventory/create', // 新增进销存
  customerlist: 'mobile/customer/list/all', // 我的客户列表
};

// 客户列表下拉
const customerlist = (clientType) => api.get(path.customerlist, {
  params: {
    clientType,
  }
});

// 添加客户计划
const add = (from) => api.get(path.add, {
  params: from,
});

// 客户计划查询
const threelist = (from) => api.get(path.threelist, {
  params: from,
});

// 客户计划详情查询
const threeitem = (from) => api.get(path.threeitem, {
  params: from,
});

// 更新客户计划
const updateplan = (list) => api.post(path.updateplan, {
  list,
});

// 新增进销存
const createInventory = (from) => api.post(path.createInventory, from);

export default {
  add,
  threelist,
  threeitem,
  updateplan,
  customerlist,
  createInventory,
};
