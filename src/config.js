/* eslint-disable */
// 配置文件
// (地址配置均以/结尾，后续无需再加)

// 开发环境 (dev)
let apiHost = `${location.protocol}//${location.host}/api/`;
let uploadHost = '';
let imgHost = '';

const setConfig = (base) => {
  apiHost = `${location.protocol}//${location.host}/api/`;
  imgHost = 'http://180.101.144.247:8010';
  // imgHost = 'http://localhost:9898';
  uploadHost = '';

  // // 生产环境 （master）
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'master') {
    // apiHost = 'http://172.18.91.113:9898/';
    // apiHost = 'http://195q4l5760.imwork.net:56573';
    // imgHost = 'http://195q4l5760.imwork.net:56573';
    imgHost = 'http://180.101.144.247:8010';
    apiHost = 'http://180.101.144.247:8010';
    // uploadHost = 'http://195q4l5760.imwork.net:56573/mobile/fileUpload';
    uploadHost = 'http://180.101.144.247:8010/mobile/fileUpload';
  }
};

const baseConfig = 'baseConfig';

let config = window.sessionStorage.getItem(baseConfig);

if (config) {
  config = JSON.parse(config);
} else {
  config = {};
}

setConfig(config);

const getAuthServer = () => {
  const sessionConfig = window.sessionStorage.getItem(baseConfig);
  setConfig(JSON.parse(sessionConfig));
  return authServer;
};

const getUploadHost = () => {
  const sessionConfig = window.sessionStorage.getItem(baseConfig);
  setConfig(JSON.parse(sessionConfig));
  return uploadHost;
};

const tokenName = 'ss_token';
const tokenUser = 'user_token';

//  设置 当前用户的userinfo
const setUserToken = (data) => {
  if (window.plus) {
    plus.storage.setItem(tokenUser, JSON.stringify(data));
  }
  sessionStorage.setItem(tokenUser, JSON.stringify(data));
};

//  获取 当前用户的userinfo
const getUserToken = () => {
  if (window.plus) {
    return JSON.parse(plus.storage.getItem(tokenUser));
  }
  return JSON.parse(sessionStorage.getItem(tokenUser));
};

//  删除 当前用户的userinfo
const removeUserToken = () => {
  sessionStorage.removeItem(tokenUser);
  if (window.plus) {
    plus.storage.removeItem(tokenUser);
  }
};

//  设置 当前用户的access_token
const setToken = (token) => {
  if (window.plus) {
    plus.storage.setItem(tokenName, token);
  }
  sessionStorage.setItem(tokenName, token);
};

//  获取 当前用户的access_token
const getToken = () => {
  if (window.plus) {
    return plus.storage.getItem(tokenName);
  }
  return sessionStorage.getItem(tokenName)
};

//  删除 当前用户的access_token
const removeToken = () => {
  sessionStorage.removeItem(tokenName);
  if (window.plus) {
    plus.storage.removeItem(tokenName);
  }
};

export default {
  apiHost,
  imgHost,
  tokenName,
  uploadHost,
  baseConfig,
  getAuthServer, // 登录服务器
  getUploadHost, // 上传服务器
  setToken, //  设置 当前用户的access_token
  getToken, //  获取 当前用户的access_token
  removeToken, //  删除 当前用户的access_token
  getUserToken, // 获取 当前用户的userinfo
  setUserToken, // 设置 当前用户的userinfo
  removeUserToken, // 删除 当前用户的userinfo
};
