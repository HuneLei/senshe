const Layout = (resolve) => require(['@/views/Basic/Layout'], resolve);
const User = (resolve) => require(['@/views/User'], resolve);

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'User',
      component: User,
      name: '我的',
    },
  ],
};
