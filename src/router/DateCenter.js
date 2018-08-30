const Layout = (resolve) => require(['@/views/Basic/Layout'], resolve);
const DateCenter = (resolve) => require(['@/views/DateCenter'], resolve);
const ClientItem = (resolve) => require(['@/views/DateCenter/ClientItem'], resolve);
const IndexClass = (resolve) => require(['@/views/DateCenter/IndexClass'], resolve);
const IndexItem = (resolve) => require(['@/views/DateCenter/IndexItem'], resolve);

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'DateCenter',
      component: DateCenter,
      children: [
        {
          path: 'ClientItem',
          component: ClientItem,
          name: '客户详情',
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
      ]
    },
  ],
};
