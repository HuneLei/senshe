import api from './index';

const path = {
  add: 'mobile/customer/plan/list/add', // 添加客户计划
  threelist: 'mobile/customer/plan/three/list', // 客户计划查询
  threeitem: 'mobile/customer/plan/three/list/item', // 客户计划详情
  updateplan: 'mobile/customer/plan/update', // 更新客户计划
  createInventory: 'mobile/inventory/create', // 新增进销存
  updateInventory: 'mobile/inventory/update', // 更新进销存
  customerlist: 'mobile/customer/list/all', // 我的客户列表
  inventorylist: 'mobile/inventory/list', // 进销存查询
  planinventory: 'mobile/customer/plan/list/inventory', // 进度查询
  productlist: 'mobile/inventory/list/product', // 进销存查询(末次)
  inventorylast: 'mobile/inventory/last/inventory', // 进销存查询详情(末次)
};

// 进销存查询(末次)
const inventorylast = (currentPage, clientType, productId) => api.get(path.inventorylast, {
  params: {
    currentPage,
    clientType,
    productId,
  }
})

// 进销存查询(末次)
const productlist = (currentPage) => api.get(path.productlist, {
  params: {
    currentPage,
  }
})
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

// 更新进销存
const updateInventory = (from, id) => api.post(path.updateInventory, from, {
  params: { id },
});

// 进销存查询
const inventoryList = (currentPage, clientName, clientType, productId) => api.get(path.inventorylist, {
  params: {
    currentPage,
    clientName,
    clientType,
    productId
  }
});

// 进度查询
const planinventory = (from) => api.get(path.planinventory, {
  params: from
});


export default {
  add,
  threelist,
  threeitem,
  updateplan,
  productlist,
  customerlist,
  inventoryList,
  createInventory,
  updateInventory,
  planinventory,
  inventorylast,
};
