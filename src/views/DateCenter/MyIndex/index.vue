<!-- 我的指标 -->
<template>
  <div class="my_index">
    <div class="index_view vux-1px-b">
      <div :class="`year_index ${selectIndex == 1? 'select_view' : ''}`" :style="`border: ${selectIndex == 2? '1' : '0'}px solid #ECECEC`" @click="IndexClick(1)">年度指标</div>
      <div :class="`month_index ${selectIndex == 2? 'select_view' : ''}`" :style="`border: ${selectIndex == 1? '1' : '0'}px solid #ECECEC`" @click="IndexClick(2)">月度指标</div>
    </div>
    <group gutter='0'>
      <cell v-for="(item, index) in indexList" :key="index" :title="item.name" is-link @click.native="CellClick(item.id)"></cell>
    </group>
  </div>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  mounted() { },
  computed: {},
  components: {},
  data() {
    return {
      // 当前选中的指标
      selectIndex: 1,
      indexList: [{
        name: '2017年度',
        id: 1
      }, {
        name: '2017年度',
        id: 2
      }, {
        name: '2017年度',
        id: 3
      }, {
        name: '2017年度',
        id: 4
      }, {
        name: '2017年度',
        id: 5
      }, {
        name: '2017年度',
        id: 6
      }, {
        name: '2017年度',
        id: 7
      }, {
        name: '2017年度',
        id: 8
      }, {
        name: '2017年度',
        id: 7
      }, {
        name: '2017年度',
        id: 8
      }, {
        name: '2017年度',
        id: 7
      }, {
        name: '2017年度',
        id: 8
      }, {
        name: '2017年度',
        id: 7
      }, {
        name: '2017年度',
        id: 8
      }, {
        name: '2017年度',
        id: 7
      }, {
        name: '2017年度',
        id: 8
      }, {
        name: '2017年度',
        id: 7
      }, {
        name: '2017年度',
        id: 8
      }], // 当前指标列表
    };
  },
  methods: {
    // 点击切换指标时候
    IndexClick(index) {
      console.log('index', index)
      this.selectIndex = index
      if (index === 1) {
        this.yearList()
      } else {
        this.monthList()
      }
    },
    // 年指标列表
    yearList(index) {
      dateCenter.yearlist().then((res) => {
        const data = res.data;
        console.log('data', data);
      })
    },
    // 月指标列表
    monthList(index) {
      dateCenter.monthlist().then((res) => {
        const data = res.data;
        console.log('data', data);
      })
    },
    // 点击指标查看详情
    CellClick(id) {
      console.log('id', id);
      this.$router.push(`/DateCenter/IndexItem?id=${id}&type=${this.selectIndex}`);
    },
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
