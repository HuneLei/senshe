<!-- 我的信息 -->
<template>
  <div>
    <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`">
      <!-- router链接 -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import user from '../../api/user';

export default {
  created() { },
  mounted() {
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
    return {}
  },
  methods: {},
};
</script>

<style scoped>
</style>
