<!-- 工作管理 -->
<template>
  <scroller ref="controlHome">
    <div class="my_client">
      <div class="client_view" v-for="(item, index) in clientList" :key="index">
        <div class="client_amount" :style="`background-color:${item.color}`" @click="goClient(item.path)">
          <i :class="`tab_icon ${item.icon}`"></i>
        </div>
        <div class="client_title">{{item.title}}</div>
      </div>
    </div>
  </scroller>
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
        icon: 'iconfont icon-xinxiluru',
        title: '进销存录入',
        color: '#3477E5',
        path: 'InvoicList',
      }, {
        icon: 'iconfont icon-guihuaxiangmu',
        title: '客户规划设置',
        color: '#07bc99',
        path: 'ControlPlan',
      }, {
        icon: 'iconfont icon-banlijinduchaxun',
        title: '规划进度查询',
        color: '#07A5BC',
        path: 'FollowUp',
      }, {
        icon: 'iconfont icon-chaxun',
        title: '末次进销存查询',
        color: '#E68A07',
        path: 'QueryInvoic',
      }]
    };
  },
  methods: {
    // 去相应的客户页面
    goClient(data) {
      this.$router.push(`/JobControl/${data}`);
    }
  },
};
</script>

<style scoped>
.my_client {
  display: flex;
  display: -webkit-flex;
  padding-top: 10px;
  text-align: center;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  background-color: #ffffff;
}

.client_view {
  width: 33.33%;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  padding-top: 15px;
  flex-direction: column;
  align-items: center;
  /*! autoprefixer: off */
  -webkit-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-align-items: center;
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
</style>
