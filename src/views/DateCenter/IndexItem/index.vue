<!-- 指标详情 -->
<template>
  <div class="scroller_rela" ref="myIndexItem">
    <search ref="IndexClassItem" :auto-fixed='false' placeholder="输入类型名称进行搜索" v-model="searchValue" class="search_view" id="indexSearchView" @on-submit="onSubmit" @on-cancel="onCancel"></search>
    <x-table :cell-bordered="true" class="table_thead" ref="IndexItemThead" id="IndexItemThead">
      <thead>
        <tr style="background-color: #F8F8F8">
          <th class="table_thead_longth">类型名称</th>
          <th class="table_tbody_medth">流向类型</th>
          <th class="table_tbody_medth">提成类型</th>
          <th>指标</th>
          <th>进度(%)</th>
        </tr>
      </thead>
    </x-table>
    <scroller ref="IndexItemScroller" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
      <div class="incoic_table">
        <x-table :cell-bordered="true">
          <tbody class="table_tbody">
            <tr v-for="(item, index) in indexList" :key="index">
              <td class="table_tbody_longth">{{item.typeName}}</td>
              <td class="table_tbody_medth">{{flowType[item.flowType]}}</td>
              <td class="table_tbody_medth">{{commissionType[item.commissionType]}}</td>
              <td>{{item.stand}}</td>
              <td>{{item.rate | twoFloatUp}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </scroller>
  </div>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  activated() {
    this.searchValue = '';
    this.indexList = [];
    this.$refs.IndexItemScroller.triggerPullToRefresh()
    const month = this.$route.query.month
    const year = this.$route.query.year
    const title = month === '0' ? `${year}年度` : `${year}年${month}月`
    this.$store.commit('updateIndexName', title)
  },
  mounted() {
    const that = this;
    // 屏幕高度设置
    this.$nextTick(() => {
      const theadTop = document.querySelector('#indexSearchView').clientHeight;
      const Top = document.querySelector('#IndexItemThead').clientHeight + theadTop;
      that.$refs.IndexItemThead.$el.style.top = `${theadTop}px`;
      that.$refs.IndexItemScroller.$el.style.top = `${Top}px`;
      that.$refs.IndexItemScroller.$el.style.height = `${that.$countHeight(['.vux-header', '#indexSearchView', '#IndexItemThead'])}px`;
    })
  },
  computed: {
    flowType() {
      return window.validator.flowType
    },
    standType() {
      return window.validator.standType
    },
    commissionType() {
      return window.validator.commissionType
    }
  },
  components: {},
  data() {
    return {
      page: 0, // 当前页数
      searchValue: '', // 搜索的值
      indexList: [], // 列表
      noDataText: '',
    };
  },
  methods: {
    // 年指标列表
    yearList(year, callBack) {
      const that = this;
      dateCenter.yearlist(that.page, that.searchValue, year).then((res) => {
        const data = res.data;
        callBack(data)
      })
    },
    // 月指标列表
    monthList(year, month, callBack) {
      const that = this;
      dateCenter.monthlist(that.page, that.searchValue, year, month).then((res) => {
        const data = res.data;
        callBack(data)
      })
    },
    // 方法引入
    indxList(callBack) {
      const type = this.$route.query.type;
      const year = this.$route.query.year;
      const month = this.$route.query.month;
      if (type === '1') {
        this.yearList(year, (data) => {
          callBack(data)
        })
      } else {
        this.monthList(year, month, (data) => {
          callBack(data)
        })
      }
    },

    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.indxList((data) => {
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
      this.indxList((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.indexList = data.result.listData;
        }
        done()
      })
    },

    // 搜索的时候触发
    onSubmit() {
      const self = this; // this指向问题
      self.page = 1;
      this.indxList((data) => {
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
      this.indxList((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.indexList = data.result.listData;
        }
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
  flex: 1.4 !important;
  /*! autoprefixer: off */
  -webkit-flex: 1.4 !important;
  /* autoprefixer: on */
  padding: 0 10px;
  text-align: left;
}

.table_tbody_longth {
  flex: 1.4 !important;
  justify-content: flex-start !important;
  /*! autoprefixer: off */
  -webkit-flex: 1.4 !important;
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

