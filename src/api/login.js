import api from './index';
import config from '../config';

const path = {
  login: '/mobile/login', // 我的客户列表 100一级商200二级连锁300终端门店
  logCreate: '/mobile/login/log/create', // 登录场景
  phonelogin: '/mobile/phone/login', // 验证码登录
  sendcode: '/mobile/send/code', // 获取验证码
};

// 登录
const login = (username, password) => api.get(path.login, {
  params: {
    username,
    password,
  },
});

// 验证码登录
const phonelogin = (phone, code) => api.get(path.phonelogin, {
  params: {
    phone,
    code,
  },
});

// 获取验证码
const sendcode = (phone) => api.get(path.sendcode, {
  params: {
    phone,
  },
});

// 登录
const logCreate = (from) => api.post(path.logCreate, from);

export default {
  login,
  sendcode,
  logCreate,
  phonelogin,
}
