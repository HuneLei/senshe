<!-- 工作管理 -->
<template>
  <div :style="`margin-top: ${winTop}px;`">
    <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`">
      <!-- router链接 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    // 导航栏高度
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
  },
  computed: {
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
</style>
