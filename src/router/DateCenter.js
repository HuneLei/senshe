const Layout = (resolve) => require(['@/views/Basic/Layout'], resolve);
const DateCenter = (resolve) => require(['@/views/DateCenter'], resolve);
const ClientItem = (resolve) => require(['@/views/DateCenter/ClientItem'], resolve);
const IndexClass = (resolve) => require(['@/views/DateCenter/IndexClass'], resolve);
const IndexItem = (resolve) => require(['@/views/DateCenter/IndexItem'], resolve);
const MyClient = (resolve) => require(['@/views/DateCenter/MyClient'], resolve);
const MyIndex = (resolve) => require(['@/views/DateCenter/MyIndex'], resolve);

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'DateCenter',
      component: DateCenter,
      children: [
        {
          path: '/',
          component: ClientItem,
          name: '数据中心',
        },
        {
          path: 'IndexClass',
          component: IndexClass,
          name: '商级',
        },
        {
          path: 'IndexItem',
          component: IndexItem,
          name: '指标详情',
        },
        {
          path: 'MyClient',
          component: MyClient,
          name: '我的客户',
        },
        {
          path: 'MyIndex',
          component: MyIndex,
          name: '我的指标',
        },
      ]
    },
  ],
};
