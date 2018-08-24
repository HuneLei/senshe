/**
 * Created by yaoling on 2018/8/16.
 * <p>
 * 江苏摇铃网络科技有限公司，版权所有。
 * Copyright (C) 2015-2018 All Rights Reserved.
 */

import Vue from 'vue';
import Router from 'vue-router';
import User from './User';
import Login from './Login';
import DateCenter from './DateCenter';

Vue.use(Router)

export default new Router({
  routes: [
    User,
    Login,
    DateCenter,
  ]
})
