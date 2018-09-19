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
    store.commit('updateEnteAnima', 'slideInLeft flying')
    store.commit('updateLeaveAnima', 'slideOutRight flying')
    toPath.pop(); fromPath.pop();
  } else {
    toPath.push(to.path); fromPath.push(from.path);
    store.commit('updateEnteAnima', 'slideInRight flying')
    store.commit('updateLeaveAnima', 'slideOutLeft flying')
  }
  console.log('router正在跳转')
  store.commit('updateLoadingStatus', { isLoading: true })
  next()
})

// 路由出去时关闭isLoading载入
router.afterEach((to, from) => {
  console.log('router关闭了')
  console.log('to.path', to.path)
  console.log('from.path', from.path)
  if (to.path === '/JobControl/ControlPlanItem' && from.path === '/JobControl/CreatPlan') {
    store.commit('updateModifier', true)
  } else if ((to.path !== '/JobControl/CreatPlan' && from.path !== '/JobControl/ControlPlanItem') &&
    (to.path !== '/JobControl/CreatInvoicItem' && from.path !== '/JobControl/CreatInvoic') &&
    (to.path !== '/JobControl/CreatInvoic' && from.path !== '/JobControl/CreatInvoicItem')) {
    store.commit('updateModifier', false)
  }
  store.commit('updateLoadingStatus', { isLoading: true })
})

// 移除移动端页面点击延迟
const FastClick = require('fastclick');
if (window.plus) {
  FastClick.attach(document.body);
}
