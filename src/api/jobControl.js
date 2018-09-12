import api from './index';
import config from '../config';

const path = {
  create: '/mobile/customer/plan/create', // 添加客户计划
};

// 商品列表
const create = (page, productName) => api.get(path.create, {
  page,
  productName,
});


export default {
  create,
};
