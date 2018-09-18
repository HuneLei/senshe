<!-- 进度查询 -->
<template>
  <div ref="followrela" class="scroller_rela">
    <div class="index_view vux-1px-b" id="myFollow">
      <div :class="`year_index ${selectIndex == 1? 'select_view' : ''}`" :style="`border: ${selectIndex == 2? '1' : '0'}px solid #ECECEC`" @click="IndexClick(1)">年度进度</div>
      <div :class="`month_index ${selectIndex == 2? 'select_view' : ''}`" :style="`border: ${selectIndex == 1? '1' : '0'}px solid #ECECEC`" @click="IndexClick(2)">月度进度</div>
    </div>
    <scroller ref="followUp" class="my_index">
      <group gutter='0'>
        <div v-show="showIndex">
          <cell v-for="(item, index) in indexYearList" :key="index" :title="item.name" is-link @click.native="CellClick(item.year)"></cell>
        </div>
        <div v-show="!showIndex">
          <cell v-for="(item, index) in indexMonthList" :key="index" :title="item.name" is-link @click.native="CellClick(item.year, item.month)"></cell>
        </div>
      </group>
    </scroller>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    // 屏幕高度设置
    const that = this;
    that.page = 0;
    this.$nextTick(() => {
      const marginTop = document.querySelector('#myFollow').clientHeight;
      that.$refs.followUp.$el.style.top = `${marginTop}px`;
      that.$refs.followUp.$el.style.height = `${that.$countHeight(['.vux-header', '#myFollow'])}px`
    })
    const myDate = new Date(); // 获取系统当前时间
    const nowYear = myDate.getFullYear() + 1; // 当前年份
    const nowMonth = myDate.getMonth(); // 当前月份
    this.indexYearList = [];
    this.indexMonthList = [];
    // 获取最近三年列表
    for (let i = 0; i < 3; i += 1) {
      const yearList = {
        name: `${nowYear - i}年度`,
        year: nowYear - i,
        id: nowYear - i
      }
      this.indexYearList.push(yearList);
    }
    // 获取最近三年月份列表
    for (let i = 0; i < 3; i += 1) {
      const monthall = 12;
      for (let m = monthall; m !== 0; m -= 1) {
        const monthList = {
          name: `${nowYear - i}年${m}月`,
          year: nowYear - i,
          month: m,
          id: nowYear - i
        }
        this.indexMonthList.push(monthList);
      }
    }
  },
  computed: {},
  components: {},
  data() {
    return {
      // 当前选中的进度
      selectIndex: 1,
      showIndex: true, // 显示内容
      indexMonthList: [],
      indexYearList: [], // 当前指标列表
    };
  },
  methods: {
    // 点击切换进度时候
    IndexClick(index) {
      console.log('index', index)
      this.selectIndex = index
      if (index === 1) {
        this.showIndex = true;
      } else {
        this.showIndex = false;
      }
    },
    // 点击进度查看详情
    CellClick(year, month) {
      this.$router.push(`/JobControl/FollowUpList?year=${year}&month=${month || 0}`);
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
#myFollow {
  position: absolute;
  width: 100%;
}
</style>

<style>
/* 去掉cell组件的前边框 */
.my_index .weui-cells:before {
  border-top: 0 solid #d9d9d9 !important;
}
</style>
