/**
 * axios初始化配置
 */

import Vue from 'vue';
import axios from 'axios';
import config from '../config';

const instance = axios.create({
  // baseURL: 'https://code.yuewanwan.net/mobile/product/list?page=0&size=10&access_token=1ac80b36-f129-43c4-957d-0f3052f5cf6b',
  baseURL: config.apiHost,
  withCredentials: true,
  params: {
    // access_token: config.getToken(), // 初始化params参数
  },
});

instance.interceptors.request.use((request) => {
  const axiosRequest = {
    ...request,
    headers: {},
    params: {
      ...request.params,
      // access_token: config.getToken(),
    },
  };
  return axiosRequest;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0 && response.data.code !== 20000 && response.data.code !== 401) {
      Vue.$vux.toast.text(response.data.message, 'top');
    }
    // if (response.data.code === 401) {
    //   config.removeToken();
    // }
    // if (response.data.code === 403) {
    //   Vue.$vux.toast.text(response.data.message, 'top');
    // }
    // if (response.data.code === 20000) {
    //   Vue.$vux.toast.text(response.data.message, 'top');
    // }
    return response;
  }, (error) => {
    Vue.$vux.toast.text('系统出错', 'top');
    return Promise.reject(error)
  }
);

export default instance;
