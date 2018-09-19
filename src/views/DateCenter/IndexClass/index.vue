<!-- 商级 -->
<template>
  <div ref="myIndexClass" class="scroller_rela">
    <search ref="clientClassItem" :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view" id="clientSearchView" @on-submit="onSubmit" @on-cancel="onCancel"></search>
    <scroller ref="IndexClass" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
      <div class="index_class">
        <group gutter='0'>
          <cell v-for="(item, index) in cellList" :key="index" :title="item.clientName" is-link @click.native="goCellItem(item.id)"></cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  activated() {
    this.cellList = [];
    this.$refs.IndexClass.triggerPullToRefresh()
  },
  mounted() {
    const that = this;
    // 屏幕高度设置
    this.$nextTick(() => {
      const Top = document.querySelector('#clientSearchView').clientHeight;
      that.$refs.IndexClass.$el.style.top = `${Top}px`;
      that.$refs.myIndexClass.style.height = `${that.$countHeight(['.vux-header', '#clientSearchView'])}px`;
    })
    this.clientIndex = this.$route.query.index;
  },
  computed: {},
  components: {},
  data() {
    return {
      page: 0, // 当前页数
      clientIndex: '', // 当前客户类型 100一级商 200二级连锁 300终端门店
      winTop: 0, // 自动固定时距离顶部的距离
      searchValue: '', // 搜索的值
      noDataText: '',
      cellList: [], // 列表
    };
  },
  methods: {
    // 我的客户列表
    clientList(index, callBack) {
      dateCenter.list(this.page, this.searchValue, index).then((res) => {
        const data = res.data;
        callBack(data)
      });
    },
    // 去列表详情页面
    goCellItem(id) {
      this.$router.push(`/DateCenter/ClientItem?id=${id}`);
      console.log(`点击的id是${id}`)
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.clientList(self.$route.query.index, (data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            self.cellList = self.cellList.concat(data.result.listData);
            done(true)
            return
          }
          self.cellList = self.cellList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.clientList(self.$route.query.index, (data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.cellList = data.result.listData;
        }
        done()
      })
    },
    // 搜索的时候触发
    onSubmit() {
      const self = this; // this指向问题
      self.page = 1;
      this.clientList(this.$route.query.index, (data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.cellList = data.result.listData;
        }
      })
    },
    // 点击取消的时候触发
    onCancel() {
      const self = this; // this指向问题
      self.page = 1;
      this.searchValue = '';
      this.clientList(this.$route.query.index, (data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.cellList = data.result.listData;
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

