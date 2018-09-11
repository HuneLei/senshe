<!-- 数据中心 -->
<template>
  <div class="data_center" ref="dataCenter">
    <!-- <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`">
      <router-view></router-view>
    </transition> -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  mounted() {
    // 导航栏高度
    const that = this;
    this.$nextTick(() => {
      that.$refs.dataCenter.style.marginTop = document.querySelector('.vux-tab-container').clientHeight + window.immersed;
    })
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
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
    };
  },
  methods: {},
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
}
</style>
