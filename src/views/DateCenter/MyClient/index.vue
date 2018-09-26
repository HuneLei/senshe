<!-- 我的客户 -->
<template>
  <scroller style="background-color: #ffffff;" ref="myClientscroll" :on-refresh="refresh" refreshText='下拉刷新'>
    <div class="my_client">
      <div class="client_view" v-for="(item, index) in clientList" :key="index">
        <div class="client_amount" :style="`background-color:${item.color}`" @click="goClient(item.path, item.title)">{{item.amount}}</div>
        <div class="client_title">{{item.title}}</div>
      </div>
    </div>
  </scroller>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      that.$refs.myClientscroll.$el.style.height = `${that.$countHeight(['.vux-tab-container', '#tableThead'])}px`;
    })
    this.listcount((data) => {
      that.clientList[0].amount = data.oneCustomer;
      that.clientList[1].amount = data.tweCustomer;
      that.clientList[2].amount = data.threeCustomer;
    });
  },
  computed: {},
  components: {},
  data() {
    return {
      // 客户列表
      clientList: [{
        amount: 0,
        title: '一级商',
        color: '#07bc99',
        path: '100',
      }, {
        amount: 0,
        title: '二级连锁',
        color: '#3477E5',
        path: '200',
      }, {
        amount: 0,
        title: '终端门店',
        color: '#E68A07',
        path: '300',
      }]
    };
  },
  methods: {
    // 我的客户统计
    listcount(callBack) {
      dateCenter.listcount().then((res) => {
        const data = res.data;
        callBack(data)
      });
    },
    // 去相应的客户页面
    goClient(data, title) {
      this.$router.push(`/DateCenter/IndexClass?index=${data}`);
      this.$store.commit('updateIndexName', title)
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.listcount((data) => {
        self.clientList[0].amount = data.oneCustomer;
        self.clientList[1].amount = data.tweCustomer;
        self.clientList[2].amount = data.threeCustomer;
        done()
      })
    },
  },
};
</script>

<style scoped>
.my_client {
  display: flex;
  padding-top: 10px;
  text-align: center;
  flex-wrap: wrap;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-flex-wrap: wrap;
  /* autoprefixer: on */
}

.client_view {
  display: flex;
  width: 33.33%;
  flex-direction: column;
  align-items: center;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-flex-direction: column;
  /* autoprefixer: on */
}

.client_amount {
  color: #ffffff;
  font-size: 16px;
  width: 52px;
  height: 52px;
  text-align: center;
  line-height: 52px;
  border-radius: 50%;
  background-color: #07bc99;
}

.client_title {
  padding: 5px;
  font-size: 15px;
}

.my_client div {
  flex: 1;
}
</style>
