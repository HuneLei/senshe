<!-- 三级界面进度详情 -->
<template>
  <div class="scroller_rela" ref="myIndexItem">
    <x-table :cell-bordered="true" class="table_thead" ref="RateIndexThead" id="RateIndexThead">
      <thead>
        <tr style="background-color: #F8F8F8">
          <th class="table_thead_longth">客户名称</th>
          <th class="table_tbody_medth">数量</th>
          <th class="table_tbody_medth">金额</th>
        </tr>
      </thead>
    </x-table>
    <scroller ref="RateIndexScroller" :on-refresh="refresh" :noDataText='noDataText' refreshText='下拉刷新'>
      <div class="incoic_table">
        <x-table :cell-bordered="true">
          <tbody class="table_tbody">
            <tr v-for="(item, index) in indexList" :key="index">
              <td class="table_tbody_longth">{{item.clientName}}</td>
              <td class="table_tbody_medth">
                <span :class='$route.query.month == 0 ? "route_span" : ""' @click="amountLink(item)">{{item.num}}</span>
              </td>
              <td class="table_tbody_medth">{{item.money | twoFloatDown}}</td>
            </tr>
            <tr v-if="!noDataText" class="total_view">
              <td class="table_tbody_longth">合计：</td>
              <td class="table_tbody_medth">{{totalNum}}</td>
              <td class="table_tbody_medth">{{totalMoney | twoFloatDown}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
      <div class="nodata_text">{{noDataText}}</div>
    </scroller>
  </div>
</template>

<script>
/* eslint-disable */ 
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  watch: {
    $route(to, form) {
      if (to.path === '/DateCenter/RateIndex' && form.path === '/DateCenter/IndexItem') {
        this.indexList = [];
        this.$refs.RateIndexScroller.triggerPullToRefresh()
      }
    }
  },
  activated() { },
  mounted() {
    const that = this;
    // 屏幕高度设置
    this.$nextTick(() => {
      const Top = document.querySelector('#RateIndexThead').clientHeight;
      that.$refs.RateIndexScroller.$el.style.top = `${Top}px`;
      that.$refs.RateIndexScroller.$el.style.height = `${that.$countHeight(['.vux-header', '#RateIndexThead'])}px`;
    })
    this.indexList = [];
    this.$refs.RateIndexScroller.triggerPullToRefresh()
  },
  computed: {},
  components: {},
  data() {
    return {
      indexList: [], // 列表
      noDataText: ' ',
      totalNum: 0, // 合计数量
      totalMoney: 0, // 合计金额
    };
  },
  methods: {
    // 数量详情
    amountLink(e) {
      if (this.$route.query.month !== '0') {
        return;
      }
      this.$router.push(`/DateCenter/AmountItem?year=${this.$route.query.year}&month=${this.$route.query.month}&clientName=${e.clientName}&tagName=${this.$route.query.tagName}&productName=${this.$route.query.productName}&standType=${this.$route.query.standType}&flowType=${this.$route.query.flowType}`);
    },
    // 进度详情查询
    rateList(callBack) {
      const from = this.$route.query;
      from.clientName = '';
      dateCenter.listgroup(from).then((res) => {
        const data = res.data;
        callBack(data)
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      this.totalNum = 0;
      this.totalMoney = 0;
      const self = this; // this指向问题
      this.rateList((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.length === 0 ? '暂无数据' : ''
          self.indexList = data.result;
          for (let i = 0; i < data.result.length; i += 1) {
            this.totalNum += data.result[i].num;
            this.totalMoney += data.result[i].money;
          }
        }
        done()
      })
    },
  },
};
</script>

<style scoped>
.search_view {
  font-size: 15px;
  position: absolute !important;
}

.table_thead tr {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-flex-wrap: wrap;
  /* autoprefixer: on */
}

.table_thead tr th {
  flex: 1;
  /*! autoprefixer: off */
  -webkit-flex: 1;
  /* autoprefixer: on */
  word-wrap: break-word;
  word-break: break-all;
}

.table_thead {
  font-size: 14px;
  position: absolute;
}

.table_tbody tr {
  display: flex;
  /*! autoprefixer: off */
  display: -webkit-flex;
  /* autoprefixer: on */
}

.table_tbody tr td {
  flex: 1;
  /*! autoprefixer: off */
  -webkit-flex: 1;
  /* autoprefixer: on */
}

.incoic_table {
  overflow-y: auto;
  background-color: #ffffff;
}

.table_tbody_medth {
  flex: 1.2 !important;
  /*! autoprefixer: off */
  -webkit-flex: 1.2 !important;
  /* autoprefixer: on */
}

.table_thead_longth {
  flex: 1.6 !important;
  /*! autoprefixer: off */
  -webkit-flex: 1.6 !important;
  /* autoprefixer: on */
  padding: 0 10px;
  text-align: left;
}

.table_tbody_longth {
  flex: 1.6 !important;
  justify-content: flex-start !important;
  /*! autoprefixer: off */
  -webkit-flex: 1.6 !important;
  -webkit-justify-content: flex-start !important;
  /* autoprefixer: on */
  text-align: left;
  padding: 6px 10px;
}

.incoic_table table td {
  color: #666666;
  font-size: 13px;
  line-height: 22px;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  justify-content: center;
  align-items: center;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  /* autoprefixer: on */
}
.route_span {
  color: #0ea5f3;
  text-decoration: underline;
}
.nodata_text {
  color: rgb(170, 170, 170);
  text-align: center;
  padding: 10px;
}
.total_view {
  background-color: #ffffc8;
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

