<!-- 我的信息 -->
<template>
  <!-- router链接 -->
  <div :style="`margin-top: ${winTop}px;`">
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
    this.winTop = document.querySelector('.vux-header').clientHeight;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
