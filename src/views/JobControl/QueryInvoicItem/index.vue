<!-- 进销存详情 -->
<template>
  <div class="scroller_rela">
    <search placeholder="输入客户名称进行搜索" v-model="searchValue" class="search_view" :auto-fixed='false' @on-submit="onSubmit" @on-cancel="onCancel" id="creatSearchView"></search>
    <x-table class="table_thead" :cell-bordered="false" ref="invoicThead" id="invoicThead">
      <thead>
        <tr style="background-color: #F8F8F8">
          <th class="table_thead_longth table_border">客户名称</th>
          <th>进货</th>
          <th>进度%</th>
          <th>销售</th>
          <th>进度%</th>
          <th>库存</th>
        </tr>
      </thead>
    </x-table>
    <scroller ref="queryInvoicItem" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
      <div class="incoic_table">
        <x-table :cell-bordered="false">
          <tbody class="table_tbody">
            <tr v-for="(item, index) in incoicList" :key="index">
              <td class="table_border table_tbody_longth">
                {{item.createTime | convertNewDate}}<br v-show="item.createTime" />{{item.clientName}}</td>
              <td>{{item.stock}}</td>
              <td>{{item.stockInventory | twoFloatUp}}</td>
              <td>{{item.sale}}</td>
              <td>{{item.saleInventory | twoFloatUp}}</td>
              <td>{{item.inventory}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </scroller>
  </div>
</template>

<script>
import jobControl from '../../../api/jobControl';

export default {
  created() { },
  activated() {
    this.incoicList = [];
    this.page = 0;
    this.year = Number(this.dateValue.split('-')[0]);
    this.month = Number(this.dateValue.split('-')[1]);
    this.$refs.queryInvoicItem.triggerPullToRefresh();
  },
  mounted() {
    // 导航栏高度
    const that = this;
    this.$nextTick(() => {
      const Top = document.querySelector('#invoicThead').clientHeight;
      const theadTop = document.querySelector('#creatSearchView').clientHeight;
      that.$refs.invoicThead.$el.style.top = `${theadTop}px`;
      that.$refs.queryInvoicItem.$el.style.top = `${Top + theadTop}px`;
      that.$refs.queryInvoicItem.$el.style.height = `${that.$countHeight(['.vux-tab-container', '#creatSearchView', '#invoicThead'])}px`;
    })
  },
  watch: {
    tabIndex(newVal, oldVal) {
      this.page = 0;
      this.incoicList = [];
      this.$refs.queryInvoicItem.triggerPullToRefresh()
    },
    dateValue(newVal, oldVal) {
      this.year = Number(newVal.split('-')[0]);
      this.month = Number(newVal.split('-')[1]);
      this.$refs.queryInvoicItem.triggerPullToRefresh()
    }
  },
  computed: {
    tabIndex() {
      return this.$store.getters.getTabIndex
    },
    dateValue() {
      return this.$store.getters.getDateValue
    }
  },
  components: {},
  data() {
    return {
      page: 0, // 当前页数
      noDataText: '',
      searchValue: '', // 搜索的值
      incoicList: [],
      year: 0, // 查询年份
      month: 0, // 查询月份
    };
  },
  methods: {
    // 搜索的时候触发
    onSubmit() {
      const that = this;
      this.page = 1;
      this.getLnventorylast((data) => {
        if (data.code === 0) {
          this.incoicList = data.result.listData;
        }
      })
    },
    // 点击取消的时候触发
    onCancel() {
      this.searchValue = '';
      this.$refs.queryInvoicItem.triggerPullToRefresh()
    },
    // 获取详情
    getLnventorylast(callBack) {
      jobControl.inventorylast(this.page, this.tabIndex, this.$route.query.productId, this.searchValue, this.year, this.month).then((res) => {
        callBack(res.data)
      })
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getLnventorylast((data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            self.incoicList = self.incoicList.concat(data.result.listData);
            done(true)
            return
          }
          self.incoicList = self.incoicList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.getLnventorylast((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.incoicList = data.result.listData;
        }
        done()
      })
    }
  },
};
</script>

<style scoped>
/* 搜索 */
.search_view {
  font-size: 15px;
  position: absolute !important;
}
.table_thead {
  font-size: 15px;
  position: absolute;
}

.table_thead tr {
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-flex-wrap: wrap;
  /* autoprefixer: on */
  display: flex;
  flex-wrap: wrap;
}

.table_thead tr th {
  flex: 1;
  /*! autoprefixer: off */
  -webkit-flex: 1;
  /* autoprefixer: on */
  word-wrap: break-word;
  word-break: break-all;
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
.incoic_table table td {
  color: #666666;
  font-size: 14px;
  line-height: 22px;
  word-wrap: break-word;
  word-break: break-all;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  /* autoprefixer: on */
  display: flex;
  justify-content: center;
  align-items: center;
}
.incoic_table {
  overflow-y: auto;
  background-color: #ffffff;
}
.table_thead_longth {
  flex: 2.4 !important;
  /*! autoprefixer: off */
  -webkit-flex: 2.4 !important;
  /* autoprefixer: on */
  padding: 0 5px;
  text-align: left;
}

.table_tbody_longth {
  flex: 2.4 !important;
  justify-content: flex-start !important;
  /*! autoprefixer: off */
  -webkit-flex: 2.4 !important;
  -webkit-justify-content: flex-start !important;
  /* autoprefixer: on */
  text-align: left;
  padding: 5px 5px;
}
</style>
