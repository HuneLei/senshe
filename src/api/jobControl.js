import api from './index';
import config from '../config';

const path = {
  add: 'mobile/customer/plan/list/add', // 添加客户计划
};

// 商品列表
const add = (from) => api.get(path.add, {
  params: from,
});


export default {
  add,
};
