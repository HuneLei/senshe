<!-- 进销存详情 -->
<template>
  <div class="incoic_item">
    <x-header :line-width=50 title="slot:overwrite-title" :left-options="{backText: ''}">
      <div slot="overwrite-title">
        <tab class="" default-color='#fff' active-color='#fff' custom-bar-width="1rem">
          <tab-item active-class="tab_active" selected>商业</tab-item>
          <tab-item active-class="tab_active">连锁</tab-item>
          <tab-item active-class="tab_active">门店</tab-item>
        </tab>
      </div>
    </x-header>
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
  </div>
</template>

<script>

export default {
  created() { },
  mounted() { },
  computed: {},
  components: {},
  data() {
    return {
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
  methods: {},
};
</script>

<style scoped>
/* tab选中时候的class */
.tab_active {
  font-size: 19px !important;
}

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

<style>
.incoic_item .vux-header-title-area,
.vux-header .vux-header-title {
  margin: 0 30px;
}
/* tab切换的背景颜色 */
.incoic_item .vux-tab {
  background-color: #07bc99;
}
/* tab选中下边条样式 */
.incoic_item .vux-tab-ink-bar {
  margin-bottom: 6px;
}
</style>

