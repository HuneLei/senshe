<!-- 进销存查询 -->
<template>
  <div class="scroller_rela">
    <scroller ref="queryInvic" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
      <group gutter='0'>
        <cell v-for="(item, index) in indexList" :key="index" :title="item.commonName" is-link @click.native="CellClick(item.productId)"></cell>
      </group>
    </scroller>
  </div>
</template>

<script>
import jobControl from '../../../api/jobControl';

export default {
  created() { },
  watch: {
    $route(to, form) {
      if (to.path === '/JobControl/QueryInvoic' && form.path === '/JobControl') {
        this.$refs.queryInvic.triggerPullToRefresh()
      }
    }
  },
  mounted() {
    const that = this;
    that.page = 0;
    this.$nextTick(() => {
      that.$refs.queryInvic.$el.style.height = `${that.$countHeight(['.vux-header'])}px`;
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      page: 0, // 当前页数
      // 上拉加载信息提示
      noDataText: '',
      indexList: [], // 当前进销存列表
    };
  },
  methods: {
    getProductlist(callBack) {
      jobControl.productlist(1).then((res) => {
        callBack(res.data)
      })
    },
    // 点击进销存查看详情
    CellClick(productId) {
      this.$store.commit('updateTabIndex', 100)
      this.$router.push(`/JobControl/QueryInvoicItem?productId=${productId}`);
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getProductlist((data) => {
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
      this.getProductlist((data) => {
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
</style>
