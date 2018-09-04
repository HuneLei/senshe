<!-- 我的信息 -->
<template>
  <!-- router链接 -->
  <div :style="`margin-top: ${winTop}px;`">
    <keep-alive>
      <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    console.log(1111);
    // 导航栏高度
    console.log("document.querySelector('.vux-header').clientHeight", document.querySelector('.vux-header').clientHeight)
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
    this.$nextTick(() => {
      // DOM 现在更新了
      // `this` 绑定到当前实例
      // console.log('this.$refs.myscroller', this.$refs.myscroller)
      // this.$refs.myscroller.triggerPullToRefresh()
    })
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
    }
  },
  methods: {
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      console.log('done', done);
      done(true)
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      console.log('done', done);
      done(true)
    }
  },
};
</script>

<style scoped>
</style>
