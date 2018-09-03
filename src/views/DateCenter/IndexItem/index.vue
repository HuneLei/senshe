<!-- 指标详情 -->
<template>
  <div class="index_class">
    <search :top="`${winTop}px`" :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view"></search>
    <group gutter='0'>
      <x-table :cell-bordered="false" class="index_table">
        <thead>
          <tr>
            <th>通用名</th>
            <th>流向类型</th>
            <th>指标</th>
            <th>进度(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in indexList" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.type}}</td>
            <td>{{item.target}}</td>
            <td>{{item.schedule}}</td>
          </tr>
        </tbody>
      </x-table>
    </group>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    this.winTop = document.querySelector('.vux-header').clientHeight;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 自动固定时距离顶部的距离
      searchValue: '', // 搜索的值
      indexList: [
        {
          id: 1,
          name: '强力枇杷膏',
          type: '连锁流向',
          target: 5000,
          schedule: 25.12
        },
        {
          id: 2,
          name: '福牌阿胶(250g)',
          type: '商批流向',
          target: 5000,
          schedule: 25.12
        },
        {
          id: 3,
          name: '爱捷康（感冒药）(20粒)',
          type: '连锁流向',
          target: 5000,
          schedule: 25.12
        },
        {
          id: 4,
          name: '清喉利咽颗粒(10g*10袋)',
          type: '连锁流向',
          target: 5000,
          schedule: 25.12
        },
        {
          id: 5,
          name: '复方枣仁胶囊(0.4g*6粒)',
          type: '连锁流向',
          target: 5000,
          schedule: 25.12
        }
      ], // 列表
    };
  },
  methods: {},
};
</script>

<style scoped>
.search_view {
  font-size: 15px;
}

.index_table th {
  color: #222222;
  text-align: left;
  padding-left: 15px;
}

.index_table td {
  color: #666666;
  text-align: left;
  font-size: 13px;
  padding-left: 15px;
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

