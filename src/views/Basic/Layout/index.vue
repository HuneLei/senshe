<!-- 底部导航 -->
<template>
  <div>
    <!-- 头部导航组件 -->
    <tab-head
     :header_name="baseList.name"
     :slotRight="baseList.slotRight"
     :isShowBack="baseList.isShowBack"
     :headIndex="baseList.headIndex"
     @right-click="rightClick"
     v-show="baseList.isTab"></tab-head>
    <!-- router链接 -->
    <div>
      <keep-alive>
        <router-view class="animated bounceInUp bounce"></router-view>
      </keep-alive>
    </div>
    <!-- 底部导航组件 -->
    <tab-bar :initIndex="baseList.barIndex" v-show="baseList.isBar"></tab-bar>
  </div>
</template>

<script>
import baseList from '../../../utils/baseList' // 导航页面的配置

export default {
  components: {},
  computed: {
    // 根据router选择显示内容
    baseList() {
      return baseList[this.$route.path]
    },
  },
  mounted() {
    // 状态栏高度设置
    // this.$plusHeight()
  },
  data() {
    return {
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
      console.log('this.baseList', this.baseList)
      console.log('我过来了', this.baseList.slotRight[e].path);
      this.$router.push({ path: this.baseList.slotRight[e].path });
    },
    indexChange(e) {
      console.log('e', this.baseList.tabList[e].path);
      this.$router.push({ path: this.baseList.tabList[e].path });
    }
  },
};
</script>

<style scoped>
</style>
