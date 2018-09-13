const Layout = (resolve) => require(['@/views/Basic/Layout'], resolve);
const User = (resolve) => require(['@/views/User'], resolve);
const UserInfo = (resolve) => require(['@/views/User/UserInfo'], resolve);
const editPassword = (resolve) => require(['@/views/User/EditPassword'], resolve);
const leaveMessage = (resolve) => require(['@/views/User/LeaveMessage'], resolve);
const myInformation = (resolve) => require(['@/views/User/MyInformation'], resolve);
const myMessage = (resolve) => require(['@/views/User/MyMessage'], resolve);
const newMessage = (resolve) => require(['@/views/User/NewMessage'], resolve);
const systemInfo = (resolve) => require(['@/views/User/SystemInfo'], resolve);

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'User',
      component: User,
      children: [
        {
          path: '/',
          component: UserInfo,
          name: '我的',
        },
        {
          path: 'editPassword',
          component: editPassword,
          name: '修改密码',
        },
        {
          path: 'myInformation',
          component: myInformation,
          name: '我的信息',
          children: [
            {
              path: 'systemInfo',
              component: systemInfo,
              name: '系统信息',
            },
          ]
        },
        {
          path: 'myMessage',
          component: myMessage,
          name: '我的留言',
          children: [
            {
              path: 'leaveMessage',
              component: leaveMessage,
              name: '留言详情',
            },
            {
              path: 'newMessage',
              component: newMessage,
              name: '新建留言',
            },
          ]
        },
      ]
    },
  ],
};
