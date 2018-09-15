<!-- 工作管理 -->
<template>
  <div style="background-color: white;">
    <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`" v-if="$route.meta.keepAlive">
      <!-- router链接 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`" v-if="!$route.meta.keepAlive">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    // 导航栏高度
    const that = this;
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
