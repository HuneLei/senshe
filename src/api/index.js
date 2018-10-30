/**
 * axios初始化配置
 */
import Vue from 'vue';
import axios from 'axios';
import config from '../config';
import router from '../router';

const instance = axios.create({
  baseURL: config.apiHost,
  withCredentials: true,
  params: {
    // access_token: config.getToken(), // 初始化params参数
  },
});

const CancelToken = axios.CancelToken // 取消请求

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
    if (response.data.code === 401 && window.location.hash !== '#/login') {
      response.data.code = 0;
      config.removeUserToken();
      Vue.$vux.loading.hide();
      if (window.plus) {
        const bts = ['确定'];
        window.plus.nativeUI.confirm('登录信息已失效, 请重新登录', (e) => {
          config.removeUserToken();
          router.replace('/login');
        }, '', bts)
      } else {
        Vue.$vux.alert.show({
          content: '登录信息已失效, 请重新登录',
          onCancel() { },
          onHide() {
            config.removeUserToken();
            router.replace('/login');
          }
        })
      }
    }
    return response;
  }, (error) => {
    Vue.$vux.loading.hide();
    Vue.$vux.toast.text('系统出错了! 请检测网络', 'middle');
    return Promise.reject(error);
  }
);

export default instance;
