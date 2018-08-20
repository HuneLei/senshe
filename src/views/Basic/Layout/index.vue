<!-- 底部导航 -->
<template>
  <div>
    <!-- tab页面切换组件 -->
    <tab-swit :initIndex=0 :tabList="tabList" @index-change="rightClick">
      <h1 v-for="(item, index) in tabList" :key="index" :slot="item.slot">{{item.name}}</h1>
    </tab-swit>
    <!-- 头部导航组件 -->
    <!-- <tab-head :header_name="headerName" :slotRight="slotRight" @right-click="rightClick"></tab-head> -->
    <!-- 底部导航组件 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from './TabBar.vue' // 引入底部导航组件

export default {
  components: {
    TabBar,
  },
  created() { },
  mounted() { },
  data() {
    return {
      // tab页面切换
      tabList: [{ name: '我的商品', slot: 'myGoods' }, { name: '我的客户', slot: 'myClient' }, { name: '我的指标', slot: 'myIndex' }],
      // 导航标题
      headerName: '我的',
      // 右边图标样式组
      slotRight: [{
        icon: 'iconfont icon-shouji',
        name: 'shouji1'
      }, {
        icon: 'iconfont icon-shouji',
        name: 'shouji2'
      }]
    };
  },
  methods: {
    // 点击右边图片时触发
    rightClick(e) {
      console.log('我过来了', e);
    }
  },
};
</script>

<style scoped>
</style>
