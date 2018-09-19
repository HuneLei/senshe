<!-- 我的客户 -->
<template>
  <scroller style="background-color: #ffffff;" ref="myClientscroll">
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
    this.listcount();
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
    listcount() {
      dateCenter.listcount().then((res) => {
        console.log('res', res)
        const data = res.data;
        this.clientList[0].amount = data.oneCustomer;
        this.clientList[1].amount = data.tweCustomer;
        this.clientList[2].amount = data.threeCustomer;
      });
    },
    // 去相应的客户页面
    goClient(data, title) {
      this.$router.push(`/DateCenter/IndexClass?index=${data}`);
      this.$store.commit('updateIndexName', title)
    }
  },
};
</script>

<style scoped>
.my_client {
  display: flex;
  padding-top: 10px;
  text-align: center;
  flex-wrap: wrap;
}

.client_view {
  display: flex;
  width: 33.33%;
  flex-direction: column;
  align-items: center;
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
