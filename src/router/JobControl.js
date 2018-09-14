const Layout = (resolve) => require(['@/views/Basic/Layout'], resolve);
const JobControl = (resolve) => require(['@/views/JobControl'], resolve);
const ControlHome = (resolve) => require(['@/views/JobControl/ControlHome'], resolve);
const ControlPlan = (resolve) => require(['@/views/JobControl/ControlPlan'], resolve);
const CreatInvoic = (resolve) => require(['@/views/JobControl/CreatInvoic'], resolve);
const InvoicList = (resolve) => require(['@/views/JobControl/InvoicList'], resolve);
const CreatInvoicItem = (resolve) => require(['@/views/JobControl/CreatInvoicItem'], resolve);
const QueryInvoic = (resolve) => require(['@/views/JobControl/QueryInvoic'], resolve);
const QueryInvoicItem = (resolve) => require(['@/views/JobControl/QueryInvoicItem'], resolve);
const CreatPlan = (resolve) => require(['@/views/JobControl/CreatPlan'], resolve);
const ControlPlanList = (resolve) => require(['@/views/JobControl/ControlPlanList'], resolve);
const ControlPlanItem = (resolve) => require(['@/views/JobControl/ControlPlanItem'], resolve);
const FollowUp = (resolve) => require(['@/views/JobControl/FollowUp'], resolve);
const FollowUpList = (resolve) => require(['@/views/JobControl/FollowUpList'], resolve);
const FollowUpItem = (resolve) => require(['@/views/JobControl/FollowUpItem'], resolve);

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
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'ControlPlan',
          component: ControlPlan,
          name: '客户规划',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'InvoicList',
          component: InvoicList,
          name: '进销存列表',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'CreatInvoic',
          component: CreatInvoic,
          name: '进销存录入',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'CreatInvoicItem',
          component: CreatInvoicItem,
          name: '进销存录入详情',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'CreatPlan',
          component: CreatPlan,
          name: '添加客户计划',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'QueryInvoic',
          component: QueryInvoic,
          name: '进销存查询(末次)',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'QueryInvoicItem',
          component: QueryInvoicItem,
          name: '进销存查询详情',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'ControlPlanList',
          component: ControlPlanList,
          name: '客户规划三级',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'ControlPlanItem',
          component: ControlPlanItem,
          name: '客户规划四级',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'FollowUp',
          component: FollowUp,
          name: '进度查询',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'FollowUpList',
          component: FollowUpList,
          name: '进度查询三级',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'FollowUpItem',
          component: FollowUpItem,
          name: '进度查询四级',
          meta: {
            keepAlive: true
          }
        }
      ]
    },
  ],
};
