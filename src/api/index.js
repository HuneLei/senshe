/**
 * axios初始化配置
 */

import Vue from 'vue';
import axios from 'axios';
import config from '../config';

const instance = axios.create({
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
      Vue.$vux.toast.text(response.data.message, 'middle');
    }
    if (response.data.code === 401) {
      config.removeToken();
      config.removeUserToken();
      console.log('Vue.$router', window.location.href)
      window.location.href = '/'
    }
    // if (response.data.code === 403) {
    //   Vue.$vux.toast.text(response.data.message, 'top');
    // }
    // if (response.data.code === 20000) {
    //   Vue.$vux.toast.text(response.data.message, 'top');
    // }
    return response;
  }, (error) => {
    Vue.$vux.loading.hide();
    Vue.$vux.toast.text('请检测网络', 'middle');
    return Promise.reject(error);
  }
);

export default instance;
