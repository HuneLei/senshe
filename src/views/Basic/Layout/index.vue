<!-- 底部导航 -->
<template>
  <div>
    <!-- 头部导航组件 -->
    <tab-head :header_name="baseList.name" :slotRight="baseList.slotRight" :isShowBack="baseList.isShowBack" @right-click="rightClick" v-if="baseList.isTab"></tab-head>
    <!-- tab页面切换组件 -->
    <tab-swit :initIndex=0 :tabList="tabList" @index-change="rightClick" v-if="baseList.isSwit">
      <h1 v-for="(item, index) in tabList" :key="index" :slot="item.slot">{{item.name}}</h1>
    </tab-swit>
    <!-- router链接 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 底部导航组件 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import baseList from '../../../utils/baseList' // 导航页面的配置
import TabBar from './TabBar.vue' // 引入底部导航组件

export default {
  components: {
    TabBar,
  },
  computed: {
    // 根据router选择显示内容
    baseList() {
      return baseList[this.$route.path]
    }
  },
  created() { },
  mounted() {
    console.log(this.baseList);
  },
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
