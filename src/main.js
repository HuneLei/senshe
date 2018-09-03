// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'lib-flexible/flexible';
import 'animate.css'; // 动画库
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import config from './config';

import './vux-ui';
import './assets/css/iconfont/iconfont.css'; // 图标字体
import './assets/css/reset.css';
import store from './vuex/store';

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// 路由进来时开启isLoading载入
router.beforeEach((to, from, next) => {
  console.log('config.getToken()', config.getToken())
  console.log('router正在跳转')
  store.commit('updateLoadingStatus', { isLoading: true })
  next()
})

// 路由出去时关闭isLoading载入
router.afterEach((to) => {
  console.log('router关闭了')
  store.commit('updateLoadingStatus', { isLoading: false })
})

// 移除移动端页面点击延迟
const FastClick = require('fastclick');
if (window.plus) {
  FastClick.attach(document.body);
}
