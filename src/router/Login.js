const Login = (resolve) => require(['@/views/Login'], resolve);

export default {
  path: '/login',
  component: Login,
  name: '登录',
};