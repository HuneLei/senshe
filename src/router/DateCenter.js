const Layout = (resolve) => require(['@/views/Basic/Layout'], resolve);
const DateCenter = (resolve) => require(['@/views/DateCenter'], resolve);
const ClientItem = (resolve) => require(['@/views/DateCenter/ClientItem'], resolve);
const IndexClass = (resolve) => require(['@/views/DateCenter/IndexClass'], resolve);
const IndexItem = (resolve) => require(['@/views/DateCenter/IndexItem'], resolve);
const MyGoodsItem = (resolve) => require(['@/views/DateCenter/MyGoodsItem'], resolve);
const MyGoods = (resolve) => require(['@/views/DateCenter/MyGoods'], resolve);
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
          path: 'MyGoods',
          component: MyGoods,
          name: '我的商品',
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
        {
          path: 'MyGoodsItem',
          component: MyGoodsItem,
          name: '商品详情',
        },
      ]
    },
  ],
};
