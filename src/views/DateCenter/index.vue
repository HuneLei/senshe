<!-- 数据中心 -->
<template>
  <div class="data_center">
    <!-- tab页面切换组件 -->
    <tab-swit :winHeight="winHeight" :initIndex="initIndex" :tabList="tabList" @index-change="indexChange" v-show="isTabSwit">
      <div v-for="(item, index) in tabList" :slot="item.slot" :key="index">
        <!-- router链接 -->
        <component :is="item.slot"></component>
      </div>
    </tab-swit>
    <!-- router链接 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import myGoods from './MyGoods/index.vue'; // 我的商品
import myClient from './MyClient/index.vue'; // 我的客户
import myIndex from './MyIndex/index.vue'; // 我的指标

export default {
  watch: {
    $route(to, from) {
      if (to.path === '/DateCenter') {
        this.$store.commit('updateTabSwitStatus', { status: true })
      }
    }
  },
  created() {
    this.$store.commit('updateTabSwitStatus', { status: true })
  },
  mounted() {
    // 屏幕高度
    this.winHeight = this.$countHeight(['.weui-tabbar', '.vux-tab']);
    // 导航栏高度
    this.winTop = document.querySelector('.vux-header').clientHeight;
  },
  computed: {
    isTabSwit() {
      return this.$store.getters.getTabSwit
    }
  },
  components: {
    myIndex,
    myGoods,
    myClient,
  },
  data() {
    return {
      initIndex: 0, // 导航栏默认选项
      winTop: 0, // 导航栏高度
      winHeight: 0, // 屏幕高度
      // tab页面切换
      tabList: [
        { name: '我的商品', slot: 'myGoods', comslot: 'MyClient' },
        { name: '我的客户', slot: 'myClient', comslot: 'MyIndex' },
        { name: '我的指标', slot: 'myIndex', comslot: 'MyIndex' }
      ],
    };
  },
  methods: {
    indexChange(e) {
      console.log('e', e);
    }
  },
};
</script>

<style scoped>
.data_center {
  background-color: #ffffff;
}
</style>
