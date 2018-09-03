<!-- 工作管理 -->
<template>
  <!-- router链接 -->
  <div class="margin-bottom: 200px;" :style="`margin-top: ${winTop}px;`">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    // 导航栏高度
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      winHeight: 0, // 屏幕高度
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
