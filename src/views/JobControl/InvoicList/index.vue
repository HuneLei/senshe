<!-- 进销存列表 -->
<template>
  <div ref="invoicList" class="scroller_rela">
    <group gutter='0' class="absolute_group">
      <cell title="通用名" class="common_name" id="commonname">
        <span class="client_type">客户类型</span>
      </cell>
    </group>
    <scroller ref="invoicListscroller" :on-refresh="refresh" :noDataText='noDataText' refreshText='下拉刷新'>
      <group gutter='0'>
        <cell class="cell_name" is-link v-for="(item, index) in cellList" :key="index" :title="item.name" @click.native="CellClick(item.id, item.clientType, item.name)">
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
      if (to.path === '/JobControl/InvoicList' && form.path === '/JobControl') {
        this.cellList = [];
        this.$refs.invoicListscroller.triggerPullToRefresh()
      }
    }
  },
  mounted() {
    // 屏幕高度设置
    const that = this;
    // that.page = 0;
    that.cellList = [];
    this.$nextTick(() => {
      const theadTop = document.querySelector('#commonname').clientHeight;
      that.$refs.invoicListscroller.$el.style.top = `${theadTop}px`
      that.$refs.invoicListscroller.$el.style.height = `${that.$countHeight(['.vux-header', '#commonname'])}px`
    })
    this.$refs.invoicListscroller.triggerPullToRefresh()
  },
  computed: {
    clientType() {
      return window.validator.clientType;
    }
  },
  components: {},
  data() {
    return {
      // page: 0, // 当前页数
      noDataText: '',
      cellList: []
    };
  },
  methods: {
    // 获取进销存列表
    getInvoiclist(callBack) {
      // const from = {
      //   currentPage: this.page,
      //   year: 0,
      // }
      // jobControl.threelist(from).then((res) => {
      //   callBack(res.data);
      // })
      jobControl.productlistall().then((res) => {
        callBack(res.data);
      })
    },
    // 点击指标查看详情
    CellClick(id, type, commonName) {
      const list = {
        productId: id,
        clientType: type,
        commonName,
      }
      this.$store.commit('updateClientList', list);
      this.$router.push(`/JobControl/CreatInvoicItem?id=${id}`);
    },
    // 每当向上滑动的时候就让页数加1
    // infinite(done) {
    //   this.page += 1;
    //   const self = this; // this指向问题
    //   this.getInvoiclist((data) => {
    //     if (data.code === 0) {
    //       if (data.result.listData.length < 15) {
    //         if (self.page === 1 && data.result.listData.length === 0) {
    //           self.noDataText = '暂无数据';
    //         } else if (self.page !== 1) {
    //           self.noDataText = '没有更多数据了';
    //         }
    //         self.cellList = self.cellList.concat(data.result.listData);
    //         done(true)
    //         return
    //       }
    //       self.cellList = self.cellList.concat(data.result.listData);
    //     }
    //     done()
    //   })
    // },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      // self.page = 1;
      this.getInvoiclist((data) => {
        // if (data.code === 0) {
        self.noDataText = data.length === 0 ? '暂无数据' : ''
        self.cellList = data;
        // }
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
