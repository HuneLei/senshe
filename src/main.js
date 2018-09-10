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

const toPath = [];
const fromPath = [];

// 路由进来时开启动画效果
router.beforeEach((to, from, next) => {
  const toLength = toPath.length - 1;
  const fromLength = fromPath.length - 1;
  if (toPath[toLength] === from.path && fromPath[fromLength] === to.path) {
    store.commit('updateEnteAnima', 'slideInLeft faster')
    store.commit('updateLeaveAnima', 'slideOutRight faster')
    toPath.pop(); fromPath.pop();
  } else {
    toPath.push(to.path); fromPath.push(from.path);
    store.commit('updateEnteAnima', 'slideInRight faster')
    store.commit('updateLeaveAnima', 'slideOutLeft faster')
  }
  console.log('router正在跳转')
  store.commit('updateLoadingStatus', { isLoading: true })
  next()
})

// 路由出去时关闭isLoading载入
router.afterEach((to) => {
  console.log('router关闭了')
  store.commit('updateLoadingStatus', { isLoading: true })
})

// 移除移动端页面点击延迟
const FastClick = require('fastclick');
if (window.plus) {
  FastClick.attach(document.body);
}
