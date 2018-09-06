import api from './index';
import config from '../config';

const path = {
  login: '/mobile/login', // 我的客户列表 100一级商200二级连锁300终端门店
};

// 登录
const login = (username, password) => api.get(path.login, {
  params: {
    username,
    password,
  },
});

export default {
  login,
}
