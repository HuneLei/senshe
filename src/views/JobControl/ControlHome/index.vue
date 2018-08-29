<!-- 工作管理 -->
<template>
  <div class="my_client">
    <div class="client_view" v-for="(item, index) in clientList" :key="index">
      <div class="client_amount" :style="`background-color:${item.color}`" @click="goClient(item.path)">
        <i :class="`tab_icon ${item.icon}`"></i>
      </div>
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
      // 工作管理列表
      clientList: [{
        icon: 'iconfont icon-shouji',
        title: '客户规划',
        color: '#07bc99',
        path: '1',
      }, {
        icon: 'iconfont icon-shouji',
        title: '进度查询',
        color: '#07A5BC',
        path: '2',
      }, {
        icon: 'iconfont icon-shouji',
        title: '进销存录入',
        color: '#3477E5',
        path: '3',
      }, {
        icon: 'iconfont icon-shouji',
        title: '进销存查询',
        color: '#E68A07',
        path: '4',
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
  padding-top: 10px;
  text-align: center;
  flex-wrap: wrap;
  background-color: #ffffff;
}

.client_view {
  width: 33.33%;
  display: flex;
  padding-top: 15px;
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
</style>
