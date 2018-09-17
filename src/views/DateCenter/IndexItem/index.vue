<!-- 指标详情 -->
<template>
  <div>
    <search ref="IndexClassItem" :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view" id="indexSearchView" @on-submit="onSubmit" @on-cancel="onCancel"></search>
    <scroller ref="IndexItemScroller" class="index_class" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
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
              <td>{{item.sensheProduct.commonName}}</td>
              <td>{{flowType[item.flowType]}}</td>
              <td>{{item.stand}}</td>
              <td>{{item.userName}}</td>
            </tr>
          </tbody>
        </x-table>
      </group>
    </scroller>
  </div>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  mounted() {
    const that = this;
    // 屏幕高度设置
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight;
      const Top = document.querySelector('#indexSearchView').clientHeight + marginTop;
      that.$refs.IndexClassItem.$el.style.top = `${marginTop}px`;
      that.$refs.IndexItemScroller.$el.style.top = `${Top}px`;
      that.$refs.IndexItemScroller.$el.style.height = `${that.$countHeight(['.vux-header', '#indexSearchView'])}px`;
    })
  },
  computed: {
    flowType() {
      return window.validator.flowType
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
          console.log('self.indexList', data.result.listData)
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

