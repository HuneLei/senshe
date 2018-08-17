<!-- 登录页面 -->
<template>
  <div class="login_center">
<<<<<<< HEAD
    <div class="login_logo">
      <img class="border_center" src="https://wx.qlogo.cn/mmopen/vi_32/1M0IXDDhAU1o6tQbJ4OF5aZ6D4ibhpTe4QvGUh250P0yZzdLalBicfeoicLbSjFo7unVpbrWvQ8Gkr8R53Sibwhs1g/132" alt="">
      <div>森舍会员登录</div>
=======
    <!-- 登录logo和文字 -->
    <div class="login_logo">
      <img src="https://wx.qlogo.cn/mmopen/vi_32/1M0IXDDhAU1o6tQbJ4OF5aZ6D4ibhpTe4QvGUh250P0yZzdLalBicfeoicLbSjFo7unVpbrWvQ8Gkr8R53Sibwhs1g/132" alt="">
      <div class="login_font">森舍会员登录</div>
>>>>>>> e607f00adba08c1db047f49479d2392ec3e5bf38
    </div>
    <!-- 登录手机和密码 -->
    <div class="login_input">
      <x-input type="tel" :title='`<span class="icon iconfont icon-shouji"> 手机</span>`' v-model="phone_value" show-clear></x-input>
      <x-input type="password" :title='`<span class="icon iconfont icon-mima icon"> 密码</span>`' v-model="passwd_value" show-clear></x-input>
    </div>
    <!-- 登录操作 -->
    <div class="login_button">
      <x-button :show-loading="loginLoading" text="登录" @click.native="loginClick"></x-button>
    </div>
    <!-- 忘记密码 -->
    <div class="forget_passwd" @click="forgetPass">忘记密码 ?</div>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {},
  computed: {},
  components: {},
  data() {
<<<<<<< HEAD
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
=======
    return {
      phone_value: '', // 手机号码
      passwd_value: '', // 登录密码
      loginLoading: false, // 登录按钮loading
    };
  },
  methods: {
    // 登录操作
    loginClick() {
      console.log('登录操作');
      this.loginLoading = !this.loginLoading;
    },
    // 忘记密码
    forgetPass() {
      console.log('忘记密码了');
    }
  },
};
</script>

<style scoped>
/* 登录logo和文字 */
.login_center {
  display: flex;
  padding-top: 90px;
>>>>>>> e607f00adba08c1db047f49479d2392ec3e5bf38
  color: #7a7a7a;
  flex-direction: column;
  align-items: center;
}

.login_font {
  color: #3b3b3b;
  font-size: 26px; /*px*/
}

.login_logo img {
<<<<<<< HEAD
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
=======
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* 登录时候输入手机和密码 */
.login_input {
  padding: 30px 0 15px 0;
  flex-wrap: wrap;
}

.login_input .weui-cell {
  margin: 10px 0;
  width: 280px;
  position: static;
  border-radius: 6px;
  background-color: white;
  border: 0.5px solid rgba(165, 165, 165, 0.2); /*no*/
  box-shadow: 1.5px 1px 0px rgba(165, 165, 165, 0.2); /*no*/
}

/* 登录按钮 */
.login_button {
  width: 310px;
}

.login_button .weui-btn {
  line-height: 40px;
  font-size: 18px;
}

/* 忘记密码 */
.forget_passwd {
  padding: 20px;
  font-size: 15px;
}
</style>

<style>
/* 登录时候输入手机和密码label的宽度 */
.login_input .weui-label {
  width: 50px;
  padding-right: 10px;
}

.login_input .weui-input {
  font-size: 14px;
>>>>>>> e607f00adba08c1db047f49479d2392ec3e5bf38
}
</style>

