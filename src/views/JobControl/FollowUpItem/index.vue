<!-- 进度查询详情 -->
<template>
  <scroller :style="`margin-top: ${winTop}px;`" v-model="winTop" :on-refresh="refresh" :on-infinite="infinite" noDataText='' refreshText='下拉刷新'>
    <div class="index_class">
      <group gutter='0'>
        <x-table :cell-bordered="false" class="index_table">
          <thead>
            <tr>
              <th class="first_th">客户名称</th>
              <th>进货规划</th>
              <th>进度(%)</th>
              <th>销售规划</th>
              <th>进度(%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in indexList" :key="index">
              <td class="first_td">{{item.name}}</td>
              <td>{{item.project}}</td>
              <td>{{item.scheduleOne}}</td>
              <td>{{item.target}}</td>
              <td>{{item.scheduleTwo}}</td>
            </tr>
          </tbody>
        </x-table>
      </group>
    </div>
  </scroller>
</template>

<script>

export default {
  created() { },
  mounted() {
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      indexList: [
        {
          id: 1,
          name: '上药科泽（上海）医药有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 2,
          name: '上海上虹大药房连锁有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 3,
          name: '国药控股国大药房有限公司（集采）',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 4,
          name: '上海余天成药业连锁有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 5,
          name: '上海第一医药股份有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 4,
          name: '上海余天成药业连锁有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 5,
          name: '上海第一医药股份有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 4,
          name: '上海余天成药业连锁有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 5,
          name: '上海第一医药股份有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 4,
          name: '上海余天成药业连锁有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 5,
          name: '上海第一医药股份有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 4,
          name: '上海余天成药业连锁有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 5,
          name: '上海第一医药股份有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 4,
          name: '上海余天成药业连锁有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        },
        {
          id: 5,
          name: '上海第一医药股份有限公司',
          project: 5000,
          scheduleOne: 25.12,
          target: 5000,
          scheduleTwo: 25.12
        }
      ], // 列表
    };
  },
  methods: {
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      console.log('done', done);
      done(true)
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      console.log('done', done);
      done(true)
    }
  },
};
</script>

<style scoped>
.first_th {
  width: 50px !important;
  padding-left: 12px !important;
}
.first_td {
  padding-left: 12px !important;
}
.index_table th {
  color: #222222;
  text-align: left;
  font-size: 13px;
  padding-left: 5px;
  width: 40px;
}

.index_table td {
  color: #666666;
  text-align: left;
  font-size: 13px;
  padding: 5px 0 5px 5px;
  line-height: 22px;
}
</style>
<style>
/* 去掉cell组件的前后边框 */
.index_class .weui-cells:before {
  border-top: 0 solid #d9d9d9;
}

.index_class .weui-search-bar:after {
  border-bottom: 0 solid #d7d6dc;
}
</style>
