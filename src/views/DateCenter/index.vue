<!-- 数据中心 -->
<template>
  <div class="data_center" :style="`margin-top: ${winTop}px`">
    <keep-alive>
      <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import myGoods from './MyGoods/index.vue'; // 我的商品
import myClient from './MyClient/index.vue'; // 我的客户
import myIndex from './MyIndex/index.vue'; // 我的指标

export default {
  mounted() {
    // 导航栏高度
    this.winTop = document.querySelector('.vux-tab-container').clientHeight + window.immersed;
    console.log("this.$countHeight(['.weui-tabbar', '.vux-tab'])", this.$countHeight(['.weui-tabbar', '.vux-tab']))
  },
  computed: {
    isTabSwit() {
      return this.$store.getters.getTabSwit
    },
    // 离开时动画
    leaveAnima() {
      return this.$store.getters.getLeaveAnima;
    },
    // 进入时动画
    enteAnima() {
      return this.$store.getters.getEnteAnima;
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

<style>
/* 添加滚动条 */
.my_index_scroll {
  overflow: scroll !important;
  height: 100%;
}
</style>
