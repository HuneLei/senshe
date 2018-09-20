<!-- 我的指标 -->
<template>
  <div ref="myIndexView" class="scroller_rela">
    <div class="my_index" id="myIndexs">
      <div class="index_view vux-1px-b">
        <div :class="`year_index ${selectIndex == 1? 'select_view' : ''}`" :style="`border: ${selectIndex == 2? '1' : '0'}px solid #ECECEC`" @click="IndexClick(1)">年度指标</div>
        <div :class="`month_index ${selectIndex == 2? 'select_view' : ''}`" :style="`border: ${selectIndex == 1? '1' : '0'}px solid #ECECEC`" @click="IndexClick(2)">月度指标</div>
      </div>
    </div>
    <scroller ref="myIndexScroll" :on-refresh="refresh" refreshText='下拉刷新'>
      <div class="my_index">
        <group gutter='0'>
          <div v-show="showIndex">
            <cell v-for="(item, index) in indexYearList" :key="index" :title="item.name" is-link @click.native="CellClick(item.year)"></cell>
          </div>
          <div v-show="!showIndex">
            <cell v-for="(item, index) in indexMonthList" :key="index" :title="item.name" is-link @click.native="CellClick(item.year, item.month)"></cell>
          </div>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      const myIndexTop = document.querySelector('#myIndexs').clientHeight;
      that.$refs.myIndexScroll.$el.style.top = `${myIndexTop}px`;
      that.$refs.myIndexScroll.$el.style.height = `${that.$countHeight(['.vux-tab-container', '#myIndexs', '.weui-tabbar'])}px`
    })
    const myDate = new Date(); // 获取系统当前时间
    const nowYear = myDate.getFullYear() + 1; // 当前年份
    const nowMonth = myDate.getMonth(); // 当前月份
    this.indexYearList = [];
    this.indexMonthList = [];
    this.$refs.myIndexScroll.triggerPullToRefresh();
  },
  computed: {},
  components: {},
  data() {
    return {
      nowYear: '', // 当前年份
      showIndex: true, // 显示内容
      selectIndex: 1, // 当前选中的指标
      indexMonthList: [],
      indexYearList: [], // 当前指标列表
    };
  },
  methods: {
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      // 获取年度指标
      this.getYearall((data) => {
        this.indexYearList = [];
        data.sort((a, b) => b.year - a.year)
        for (let i = 0; i < data.length; i += 1) {
          const yearList = {
            name: `${data[i].year}年度`,
            year: data[i].year,
            id: data[i].year
          }
          this.indexYearList.push(yearList);
        }
        done()
      })
      // 获取月度指标
      this.getMonthall((data) => {
        this.indexMonthList = [];
        data.sort((a, b) => {
          if (b.year === a.year) {
            return b.month - a.month
          }
          return b.year - a.year
        })
        for (let i = 0; i < data.length; i += 1) {
          const monthList = {
            name: `${data[i].year}年${data[i].month}月`,
            year: data[i].year,
            month: data[i].month,
            id: data[i].year
          }
          this.indexMonthList.push(monthList);
        }
        done()
      })
    },
    // 获取年度指标
    getYearall(callBack) {
      dateCenter.yearall().then((res) => {
        callBack(res.data)
      })
    },
    // 获取月度指标
    getMonthall(callBack) {
      dateCenter.monthall().then((res) => {
        callBack(res.data)
      })
    },
    // 点击切换指标时候
    IndexClick(index) {
      console.log('index', index)
      this.selectIndex = index
      if (index === 1) {
        this.showIndex = true;
      } else {
        this.showIndex = false;
      }
    },
    // 点击指标查看详情
    CellClick(year, month) {
      this.$router.push(`/DateCenter/IndexItem?year=${year}&month=${month || 0}&type=${this.selectIndex}`);
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
#myIndexs {
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
