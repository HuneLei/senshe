<!-- 进销存详情 -->
<template>
         <!-- <scroller  :style="`overflow-y: auto;margin-top: ${winTop}px;`" v-model="winTop" :on-refresh="refresh" :on-infinite="infinite" noDataText='' refreshText='下拉刷新'> -->
               <div class="incoic_table">
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th class="table_longth table_border">客户名称</th>
              <th>进货</th>
              <th>进度%</th>
              <th>销售</th>
              <th>进度%</th>
              <th>库存</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in incoicList" :key="index">
              <td class="table_border">{{item.date}}<br>{{item.name}}</td>
              <td>{{item.stock}}</td>
              <td>{{item.scheduleOne}}</td>
              <td>{{item.market}}</td>
              <td>{{item.scheduleTwo}}</td>
              <td>{{item.inventory}}</td>
            </tr>
          </tbody>
        </x-table>
       </div>
                <!-- </scroller> -->
</template>

<script>

export default {
  created() { },
  mounted() {
    // 导航栏高度
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      incoicList: [{
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        scheduleOne: 15.12,
        market: 45000,
        scheduleTwo: 8.97,
        inventory: 5000,
      }]
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

/* 表格样式 */
.table_border:after {
  border-right: 0.02667rem solid #c7c7c7 !important;
}

.incoic_table table {
  width: 480px;
}

.table_longth {
  width: 80px !important;
}
.incoic_table {
  overflow-y: auto;
  background-color: #ffffff;
}
.incoic_table table th {
  width: 25px;
  color: #222222;
  text-align: left;
  font-size: 15px;
  padding-left: 10px;
}

.incoic_table table td {
  color: #666666;
  text-align: left;
  font-size: 14px;
  padding: 5px 5px 5px 10px;
  line-height: 22px;
}
</style>
