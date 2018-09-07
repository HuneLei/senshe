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
        <router-view></router-view>
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
  mounted() { },
  data() {
    return { };
  },
  methods: {
    // 点击右边图片时触发
    rightClick(e) {
      console.log('我过来了', this.baseList.slotRight[e].path);
      this.$router.push({ path: this.baseList.slotRight[e].path });
    },
  },
};
</script>

<style scoped>
</style>
