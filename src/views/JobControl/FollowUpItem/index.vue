<!-- 进度查询详情 -->
<template>
  <div class="scroller_rela" ref="followUpItem">
    <search ref="clientClassItem" :auto-fixed='false' placeholder="输入客户名进行搜索" v-model="searchValue"
    class="search_view" id="clientSearchView" @on-submit="onSubmit" @on-cancel="onCancel"></search>
    <x-table class="table_thead" :cell-bordered="false" ref="followThead" id="followThead">
      <thead>
        <tr style="background-color: #F8F8F8">
          <th class="table_thead_longth table_border">客户名称</th>
          <th class="table_long">进货规划</th>
          <th>进度%</th>
          <th class="table_long">销售规划</th>
          <th>进度%</th>
        </tr>
      </thead>
    </x-table>
    <scroller ref="followScroller" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
      <div class="index_class incoic_table">
        <x-table :cell-bordered="false" class="index_table">
          <tbody class="table_tbody">
            <tr v-for="(item, index) in indexList" :key="index">
              <td class="table_tbody_longth table_border">{{item.clientName}}</td>
              <td class="table_long">{{item.stock}}</td>
              <td>{{item.stockInventory | twoFloatUp}}</td>
              <td class="table_long">{{item.sale}}</td>
              <td>{{item.saleInventory | twoFloatUp}}</td>
            </tr>
            <tr class="total_view" v-if="(indexList.length == totals) && (totals != 0)">
              <td class="table_tbody_longth">合计：</td>
              <td class="table_long">{{countStock || 0}}</td>
              <td>{{inventoryStock || 0 | twoFloatUp}}</td>
              <td class="table_long">{{countSale || 0}}</td>
              <td>{{inventorySale || 0 | twoFloatUp}}</td>
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
  activated() {
    this.searchValue = '';
    this.$refs.followScroller.triggerPullToRefresh()
  },
  created() { },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      const Top = document.querySelector('#followThead').clientHeight;
      const SearchTop = document.querySelector('#clientSearchView').clientHeight;
      that.$refs.followThead.$el.style.top = `${SearchTop}px`;
      // const SearchTop = 0
      that.$refs.followScroller.$el.style.top = `${Top + SearchTop}px`;
      that.$refs.followScroller.$el.style.height = `${that.$countHeight(['.vux-header', '#followThead', '#clientSearchView'])}px`;
      // that.$refs.followScroller.$el.style.height = `${that.$countHeight(['.vux-header', '#followThead'])}px`;
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      totals: '', // 总数量
      searchValue: '', // 搜索的值
      indexList: [], // 列表
      page: 0, // 当前页数
      noDataText: '',
      countSale: '',
      countStock: '',
      inventorySale: '',
      inventoryStock: '',
    };
  },
  methods: {
    // 搜索的时候触发
    onSubmit() {
      const self = this; // this指向问题
      self.page = 1;
      this.getInvenItem((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.indexList = data.result.listData;
        }
      })
    },
    // 点击取消的时候触发
    onCancel() {
      const self = this; // this指向问题
      self.page = 1;
      this.searchValue = '';
      this.getInvenItem((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.indexList = data.result.listData;
        }
      })
    },
    // 获取进度列表
    getInvenItem(callBack) {
      const from = {
        clientName: this.searchValue,
        currentPage: this.page,
        year: this.$route.query.year,
        month: 0,
        clientType: this.$route.query.clientType,
        productId: this.$route.query.productId,
      }
      if (this.$route.query.month !== '0') {
        from.month = this.$route.query.month;
      }
      jobControl.planinventory(from).then((res) => {
        this.totals = res.data.result.totals;
        this.countSale = res.data.result.countSale;
        this.countStock = res.data.result.countStock;
        this.inventorySale = res.data.result.inventorySale;
        this.inventoryStock = res.data.result.inventoryStock;
        callBack(res.data);
      })
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getInvenItem((data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            self.indexList = self.indexList.concat(data.result.listData);
            done(true)
            return
          }
          self.indexList = self.indexList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.getInvenItem((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.indexList = data.result.listData;
        }
        done()
      })
    }
  },
};
</script>

<style scoped>
.search_view {
  font-size: 15px;
  position: absolute !important;
}

.table_thead {
  font-size: 15px;
  position: absolute;
}

.table_thead tr {
  display: flex;
  flex-wrap: wrap;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-flex-wrap: wrap;
  /* autoprefixer: on */
}

.table_long {
  flex: 1.5 !important;
  /*! autoprefixer: off */
  -webkit-flex: 1.5 !important;
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
  flex: 2.5 !important;
  /*! autoprefixer: off */
  -webkit-flex: 2.5 !important;
  /* autoprefixer: on */
  padding: 0 6px;
  text-align: left;
}

.table_tbody_longth {
  flex: 2.5 !important;
  justify-content: flex-start !important;
  /*! autoprefixer: off */
  -webkit-flex: 2.5 !important;
  -webkit-justify-content: flex-start !important;
  /* autoprefixer: on */
  text-align: left;
  padding: 5px 6px;
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
