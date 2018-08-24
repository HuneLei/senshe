<!-- 底部导航 -->
<template>
  <div>
    <!-- 头部导航组件 -->
    <tab-head :header_name="baseList.name" :slotRight="baseList.slotRight" :isShowBack="baseList.isShowBack" @right-click="rightClick" v-if="baseList.isTab"></tab-head>
    <!-- tab页面切换组件 -->
    <tab-swit :winHeight="winHeight" :initIndex=baseList.initIndex :tabList="tabList" @index-change="rightClick" v-if="baseList.isSwit">
      <div v-for="(item, index) in baseList.tabList" :slot="item.slot" :key="index">
        <!-- router链接 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </tab-swit>
    <!-- router链接 -->
    <div :style="`margin-top: ${winTop}px;`">
      <keep-alive v-if="!baseList.isSwit">
        <router-view></router-view>
      </keep-alive>
    </div>
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
    },
  },
  mounted() {
    // 屏幕高度
    this.winHeight = this.$countHeight(['.weui-tabbar', '.vux-tab']);
    // 导航栏高度
    this.winTop = document.querySelector('.vux-header').clientHeight;
  },
  data() {
    return {
      winTop: 0, // 导航栏高度
      winHeight: 0, // 屏幕高度
      // tab页面切换
      tabList: [{ name: '我的商品', slot: 'myGoods' }, { name: '我的客户', slot: 'myClient' }, { name: '我的指标', slot: 'myIndex' }],
      headerName: '我的', // 导航标题
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
      console.log('我过来了', this.baseList.tabList[e].path);
      this.$router.push({ path: this.baseList.tabList[e].path });
    }
  },
};
</script>

<style scoped>
</style>
