<!-- 我的客户 -->
<template>
  <div class="my_client">
    <div class="client_view" v-for="(item, index) in clientList" :key="index">
      <div class="client_amount" :style="`background-color:${item.color}`" @click="goClient(item.path)">{{item.amount}}</div>
      <div class="client_title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() { },
  computed: {},
  components: {},
  data() {
    return {
      // 客户列表
      clientList: [{
        amount: 50,
        title: '一级商',
        color: '#07bc99',
        path: '1',
      }, {
        amount: 123,
        title: '二级连锁',
        color: '#3477E5',
        path: '2',
      }, {
        amount: 4565,
        title: '终端门店',
        color: '#E68A07',
        path: '3',
      }]
    };
  },
  methods: {
    // 去相应的客户页面
    goClient(data) {
      console.log(`我点击了${data}`)
    }
  },
};
</script>

<style scoped>
.my_client {
  display: flex;
  padding-top: 20px;
  text-align: center;
}

.client_view {
  display: flex;
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
