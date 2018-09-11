<!-- 登录页面 -->
<template>
  <div class="login_center" ref="LoginCenter">
    <!-- 登录logo和文字 -->
    <div class="login_logo">
      <img src="https://wx.qlogo.cn/mmopen/vi_32/1M0IXDDhAU1o6tQbJ4OF5aZ6D4ibhpTe4QvGUh250P0yZzdLalBicfeoicLbSjFo7unVpbrWvQ8Gkr8R53Sibwhs1g/132" alt="">
      <div class="login_font">森舍会员登录</div>
    </div>
    <!-- 登录手机和密码 -->
    <div class="login_input">
      <x-input type="tel" :title='`<span class="icon-login iconfont icon-shouji"> 手机</span>`' v-model="phone_value" show-clear></x-input>
      <x-input type="password" :title='`<span class="icon-login iconfont icon-mima"> 密码</span>`' v-model="passwd_value" show-clear></x-input>
    </div>
    <!-- 登录操作 -->
    <div class="login_button">
      <x-button :show-loading="loginLoading" text="登录" @click.native="loginClick"></x-button>
    </div>
    <!-- 忘记密码 -->
    <div class="forget_passwd">
      <span @click="forgetPass"> 忘记密码 ?</span>
    </div>
  </div>
</template>

<script>
import config from '../../config';
import login from '../../api/login';

let that = this;
export default {
  beforeRouteEnter(to, from, next) {
    const token = config.getToken();
    console.log('token', token)
    // if (token) next({ path: '/User', replace: true });
    next();
  },
  created() {
    // 保存this的值和赋值当前页面
    that = this;
  },
  computed: {},
  mounted() {
    // 屏幕高度设置
    this.$nextTick(() => {
      that.$refs.LoginCenter.style.height = `${that.$countHeight()}px`;
      document.getElementById('head_state').style.backgroundColor = '#f8f8f8'
    })
  },
  components: {},
  data() {
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
      // 校验手机号
      if (!this.phone_value) {
        this.$vux.toast.text('请输入手机号码', 'middle');
        return;
      }
      // if (!window.validator.regPhone.test(this.phone_value)) {
      //   this.$vux.toast.text('请输入正确的手机号', 'middle');
      //   return;
      // }
      // 校验密码
      if (!this.passwd_value) {
        this.$vux.toast.text('请输入密码', 'middle');
        return;
      }
      // this.checkPass(this.passwd_value, (state) => {
      //   this.loginLoading = false;
      //   if (!state) {
      //     that.$vux.toast.text('密码错误', 'middle');
      //     return;
      //   }
      // this.$router.replace('/User?id=1');
      this.loginLoading = true;
      // that.$router.push('/User?');
      this.userLogin(this.phone_value, this.passwd_value, (data) => {
        console.log('data', data)
        if (data.code !== 0) {
          this.$vux.toast.text(data.message, 'middle');
          return;
        }
        this.$store.commit('updateUserInfo', data.result);
        this.$store.commit('updateUserFlush', false)
        document.getElementById('head_state').style.backgroundColor = '#07BC99'
        console.log('data', data.result.id);
        that.$router.push(`/User?id=${data.result.id}`);
        config.setToken('Hune');
      })
      // })
    },
    // 校验密码是否正确
    checkPass(value, callBack) {
      setTimeout(() => {
        if (value !== '123') {
          callBack(false)
          return;
        }
        callBack(true)
      }, 1000);
    },
    // 登录操作
    userLogin(username, password, callBack) {
      login.login(username, password).then((res) => {
        this.loginLoading = false;
        if (res) {
          const data = res.data;
          callBack(data)
        }
      }, (error) => {
        this.loginLoading = false;
      });
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
  color: #7a7a7a;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.login_font {
  color: #3b3b3b;
  font-size: 26px; /*px*/
}

.login_logo {
  padding-top: 90px;
}

.login_logo img {
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
  padding-left: 10px;
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

.head_state {
  background-color: #ffffff;
}
</style>

<style>
/* 登录时候输入手机和密码label的宽度 */
.login_input .weui-label {
  width: 60px;
  padding-right: 10px;
}

.login_input .weui-input {
  font-size: 14px;
}
</style>
