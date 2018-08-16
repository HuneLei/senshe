<!-- 登录页面 -->
<template>
  <div class="login_center">
    <div class="login_logo vux-1px">
      <img src="https://wx.qlogo.cn/mmopen/vi_32/1M0IXDDhAU1o6tQbJ4OF5aZ6D4ibhpTe4QvGUh250P0yZzdLalBicfeoicLbSjFo7unVpbrWvQ8Gkr8R53Sibwhs1g/132" alt="">
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
  created() { },
  mounted() { },
  computed: {},
  components: {},
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style scoped>
.login_center {
  text-align: center;
  padding-top: 40px;
  color: #7a7a7a;
}
.login_logo img {
  width: 100px; /*px*/
  height: 100px; /*no*/
  font-size: 26px; /*no*/
  border-radius: 50%;
}
</style>
