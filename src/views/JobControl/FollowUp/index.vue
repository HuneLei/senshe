<!-- 进度查询 -->
<template>
  <div class="my_index">
    <div class="index_view vux-1px-b">
      <div :class="`year_index ${selectIndex == 1? 'select_view' : ''}`" :style="`border: ${selectIndex == 2? '1' : '0'}px solid #ECECEC`" @click="IndexClick(1)">年度进度</div>
      <div :class="`month_index ${selectIndex == 2? 'select_view' : ''}`" :style="`border: ${selectIndex == 1? '1' : '0'}px solid #ECECEC`" @click="IndexClick(2)">月度进度</div>
    </div>
    <group gutter='0'>
      <cell v-for="(item, index) in indexList" :key="index" :title="item.name" is-link @click.native="CellClick(item.id)"></cell>
    </group>
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
      // 当前选中的进度
      selectIndex: 1,
      indexList: [{
        name: '2018年度',
        id: 1
      }, {
        name: '2017年度',
        id: 2
      }, {
        name: '2016年度',
        id: 3
      }], // 当前进度列表
    };
  },
  methods: {
    // 点击切换进度时候
    IndexClick(index) {
      this.selectIndex = index
    },
    // 点击进度查看详情
    CellClick(id) {
      console.log('id', id);
      this.$router.push(`/JobControl/FollowUpList?id=${id}`);
    }
  },
};
</script>

<style scoped>
.select_view {
  color: #ffffff !important;
  background-color: #07bc99 !important;
}

.index_view {
  display: flex;
  font-size: 15px;
  color: #6c6c6c;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  justify-content: space-around;
  background-color: #ffffff;
}

.month_index {
  width: 80px;
  padding: 5px 10px;
  border-radius: 50px;
  background-color: #f8f8f8;
}

.year_index {
  width: 80px;
  padding: 5px 10px;
  border-radius: 50px;
  background-color: #f8f8f8;
}
</style>

<style>
/* 去掉cell组件的前边框 */
.my_index .weui-cells:before {
  border-top: 0 solid #d9d9d9 !important;
}
</style>
