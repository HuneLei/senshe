<!-- 进销存录入 -->
<template>
  <div class="index_class">
    <search placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view" :auto-fixed='false'></search>
    <div class="incoic_table">
      <x-table :cell-bordered="false">
        <thead>
          <tr>
            <th class="table_longth table_border">客户名称</th>
            <th>进货</th>
            <th>销售</th>
            <th>库存</th>
            <th class="table_img">陈列照片</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in incoicList" :key="index">
            <td class="table_border">{{item.date}}<br>{{item.name}}</td>
            <td>{{item.stock}}</td>
            <td>{{item.market}}</td>
            <td>{{item.inventory}}</td>
            <td>{{item.imgurl}}</td>
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
      searchValue: '', // 搜索的值
      incoicList: [{
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }]
    };
  },
  methods: {},
};
</script>

<style scoped>
/* 表格样式 */
.table_border:after {
  border-right: 0.02667rem solid #c7c7c7 !important;
}

.table_img {
  width: 60px !important;
}

.incoic_table table {
  width: 420px;
}

.table_longth {
  width: 120px !important;
}
.incoic_table {
  overflow-y: auto;
  background-color: #ffffff;
}
.incoic_table table th {
  width: 30px;
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

/* 搜索 */
.search_view {
  font-size: 15px;
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
