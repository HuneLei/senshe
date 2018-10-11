<!-- 进度查询列表 -->
<template>
  <div class="scroller_rela" ref="controllist">
    <group gutter='0' class="absolute_group">
      <cell title="通用名" class="common_name" id="followUplist">
        <span class="client_type">客户类型</span>
      </cell>
    </group>
    <scroller ref="followUpList" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
      <group gutter='0'>
        <cell class="cell_name" is-link v-for="(item, index) in cellList" :key="index" :title="item.commonName" @click.native="CellClick(item.clientType, item.productId)">
          <span class="cell_type">{{clientType[item.clientType]}}</span>
        </cell>
      </group>
    </scroller>
  </div>
</template>

<script>
import jobControl from '../../../api/jobControl';

export default {
  created() { },
  activated() { },
  watch: {
    $route(to, form) {
      if (to.path === '/JobControl/FollowUpList' && form.path === '/JobControl/FollowUp') {
        this.cellList = [];
        this.$refs.followUpList.triggerPullToRefresh()
      }
    }
  },
  mounted() {
    // 屏幕高度设置
    const that = this;
    this.$nextTick(() => {
      const marginTop = document.querySelector('#followUplist').clientHeight;
      that.$refs.followUpList.$el.style.marginTop = `${marginTop}px`
      that.$refs.followUpList.$el.style.height = `${that.$countHeight(['.vux-header', '#followUplist'])}px`
    })
  },
  computed: {
    clientType() {
      return window.validator.clientType
    }
  },
  components: {},
  data() {
    return {
      page: 0, // 当前页数
      noDataText: '',
      cellList: []
    };
  },
  methods: {
    // 获取进度列表
    getInvenList(callBack) {
      const from = {
        currentPage: this.page,
        year: this.$route.query.year,
        month: 0,
      }
      if (this.$route.query.month !== '0') {
        from.month = this.$route.query.month;
      }
      jobControl.threelist(from).then((res) => {
        callBack(res.data);
      })
    },
    // 点击指标查看详情
    CellClick(clientType, productId) {
      this.$router.push(`/JobControl/FollowUpItem?year=${this.$route.query.year}&month=${this.$route.query.month}&clientType=${clientType}&productId=${productId}`);
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getInvenList((data) => {
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
      this.getInvenList((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.cellList = data.result.listData;
        }
        done()
      })
    }
  },
};
</script>

<style scoped>
.common_name {
  color: #222222;
}
.client_type {
  color: #222222;
}
.cell_name {
  color: #666666;
}
.cell_type {
  color: #666666;
}
</style>
