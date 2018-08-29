const Layout = (resolve) => require(['@/views/Basic/Layout'], resolve);
const JobControl = (resolve) => require(['@/views/JobControl'], resolve);
const ControlHome = (resolve) => require(['@/views/JobControl/ControlHome'], resolve);
const ControlPlan = (resolve) => require(['@/views/JobControl/ControlPlan'], resolve);
const CreatInvoic = (resolve) => require(['@/views/JobControl/CreatInvoic'], resolve);
const CreatInvoicOne = (resolve) => require(['@/views/JobControl/CreatInvoicOne'], resolve);
const CreatPlan = (resolve) => require(['@/views/JobControl/CreatPlan'], resolve);
const QueryInvoic = (resolve) => require(['@/views/JobControl/QueryInvoic'], resolve);
const ControlPlanOne = (resolve) => require(['@/views/JobControl/ControlPlanOne'], resolve);
const ControlPlanTwo = (resolve) => require(['@/views/JobControl/ControlPlanTwo'], resolve);

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'JobControl',
      component: JobControl,
      children: [
        {
          path: '/',
          component: ControlHome,
          name: '工作管理',
        },
        {
          path: 'ControlPlan',
          component: ControlPlan,
          name: '客户规划',
        },
        {
          path: 'CreatInvoic',
          component: CreatInvoic,
          name: '进销存录入',
        },
        {
          path: 'CreatInvoicOne',
          component: CreatInvoicOne,
          name: '进销存录入一级',
        },
        {
          path: 'CreatPlan',
          component: CreatPlan,
          name: '添加客户计划',
        },
        {
          path: 'QueryInvoic',
          component: QueryInvoic,
          name: '进销存查询',
        },
        {
          path: 'ControlPlanOne',
          component: ControlPlanOne,
          name: '客户规划三级',
        },
        {
          path: 'ControlPlanTwo',
          component: ControlPlanTwo,
          name: '客户规划四级',
        },
      ]
    },
  ],
};
