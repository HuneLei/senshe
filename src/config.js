/* eslint-disable */
// 配置文件
// (地址配置均以/结尾，后续无需再加)

// 开发环境 (dev)
let apiHost = `${location.protocol}//${location.host}/api/`;
let uploadHost = '/api/upload/';
let authServer = '';
let authHost = '' || `${location.protocol}//${location.host}/`;
let socketUrl = 'api.develop.iyaoling.com';

const setConfig = (base) => {
  apiHost = `${location.protocol}//${location.host}/api/`;
  uploadHost = 'http://api.develop.iyaoling.com/manage/aliyun/upload';
  authServer = base.SSO_SERVER;
  authHost = base.SSO_SERVER || `${location.protocol}//${location.host}/`;

  // 开发线上环境 (develop)
  // if (process.env.NODE_ENV && process.env.NODE_ENV === 'develop') {
  //   apiHost = 'http://api.develop.iyaoling.com/';
  //   uploadHost = 'http://api.develop.iyaoling.com/manage/aliyun/upload';
  //   socketUrl = 'api.develop.iyaoling.com'; // socket地址
  // }

  // // 生产环境 （master）
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'master') {
    // apiHost = 'http://172.18.91.113:9898/';
    apiHost = 'http://195q4l5760.imwork.net:15359';
    uploadHost = 'http://api.master.iyaoling.com/manage/aliyun/upload';
    socketUrl = 'api.master.iyaoling.com'; // socket地址
  }
  console.log('apiHost', apiHost);
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

console.log(process.env.NODE_ENV);

export default {
  apiHost,
  tokenName,
  refreshToken: 'refresh_token',
  client_id: config.client_id || '',
  uploadHost,
  resource_id: config.resource_id || null,
  baseConfig,
  getAuthServer, // 登录服务器
  getUploadHost, // 上传服务器
  setToken, //  设置 当前用户的access_token
  getToken, //  获取 当前用户的access_token
  removeToken, //  删除 当前用户的access_token
  socketUrl, // socket地址
};
