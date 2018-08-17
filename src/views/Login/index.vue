<!-- 登录页面 -->
<template>
  <div class="login_center">
    <div class="login_logo">
      <img class="border_center" src="https://wx.qlogo.cn/mmopen/vi_32/1M0IXDDhAU1o6tQbJ4OF5aZ6D4ibhpTe4QvGUh250P0yZzdLalBicfeoicLbSjFo7unVpbrWvQ8Gkr8R53Sibwhs1g/132" alt="">
      <div>森舍会员登录</div>
    </div>
    <div></div>
    <div>
      <x-button>登录</x-button>
    </div>
    <div>忘记密码 ?</div>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {},
  computed: {},
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="less">
@color: red;

.login_center() {
  text-align: center;
  padding-top: 40px;
  color: #7a7a7a;
}
.login_logo img {
  width: 100px /*px*/;
  height: 100px /*no*/;
  font-size: 26px /*no*/;
  border-radius: 50%;
}

.border(@width:5px; @style: solid; @color: #000) {
  // border: @width @style @color;
  border: @arguments;
}

.triangle(top; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-bottom-color: @border_color;
}
.triangle(bottom; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-top-color: @border_color;
}
.triangle(left; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-right-color: @border_color;
}
.triangle(right; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-left-color: @border_color;
}
// 默认执行(无论是否匹配，都会执行)
.triangle(@_; @border_width: 5px; @border_color: #000;) {
  width: 0px;
  height: 0px;
  overflow: hidden;
}
.box {
  .triangle(top);
}
</style>
