<!-- 进销存录入 -->
<template>
  <div class="index_class scroller_rela" ref="creatInvoicItem">
    <search placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view" :auto-fixed='false' id="creatSearchView"></search>
    <scroller style="background-color: #ffffff;" ref="creatScroller" :noDataText='noDataText' :on-refresh="refresh" :on-infinite="infinite">
      <div class="incoic_table">
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th class="table_longth table_border">客户名称</th>
              <th>进货</th>
              <th>销售</th>
              <th>库存</th>
              <th class="table_img">陈列照片</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in incoicList" :key="index">
              <td class="table_border">{{item.date}}<br>{{item.name}}</td>
              <td>{{item.stock}}</td>
              <td>{{item.market}}</td>
              <td>{{item.inventory}}</td>
              <td>{{item.imgurl}}</td>
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
  mounted() {
    const that = this;
    this.$nextTick(() => {
      const Top = document.querySelector('#creatSearchView').clientHeight;
      that.$refs.creatScroller.$el.style.top = `${Top}px`;
      that.$refs.creatScroller.$el.style.height = `${that.$countHeight(['.vux-header', '#creatSearchView'])}px`;
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      noDataText: '',
      searchValue: '', // 搜索的值
      incoicList: [{
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }, {
        date: '2018-06-01',
        name: '上药科泽（上海）医药有限公司',
        stock: 50000,
        market: 45000,
        inventory: 5000,
        imgurl: '1'
      }]
    };
  },
  methods: {
    getMsglist(callBack) {

    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getMsglist((data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            self.messageList = self.messageList.concat(data.result.listData);
            done(true)
            return
          }
          self.messageList = self.messageList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.getMsglist((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.messageList = data.result.listData;
        }
        done()
      })
    }
  },
};
</script>

<style scoped>
/* 表格样式 */
.table_border:after {
  border-right: 0.02667rem solid #c7c7c7 !important;
}

.table_img {
  width: 60px !important;
}

.table_longth {
  width: 120px !important;
}
.incoic_table {
  overflow-y: auto;
  background-color: #ffffff;
}
.incoic_table table th {
  width: 30px;
  color: #222222;
  text-align: left;
  font-size: 15px;
  padding-left: 10px;
}

.incoic_table table td {
  color: #666666;
  text-align: left;
  font-size: 14px;
  padding: 5px 10px 5px 10px;
  line-height: 22px;
}

/* 搜索 */
.search_view {
  font-size: 15px;
  position: absolute !important;
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
