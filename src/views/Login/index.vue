<!-- 登录页面 -->
<template>
  <div class="login_center" ref="LoginCenter">
    <!-- 登录logo和文字 -->
    <div class="login_logo">
      <!-- <img src="../../assets/img/logo.jpg" alt=""> -->
      <img src="../../assets/img/logo.png" alt="">
      <div class="login_font">森舍会员登录</div>
    </div>
    <!-- 登录手机和密码 -->
    <div class="login_input" v-if="!noteShow">
      <x-input type="text" placeholder='手机号/账号' :title='`<span class="icon-login iconfont icon-shouji"></span>`' v-model="phone_value" show-clear></x-input>
      <x-input type="password" placeholder='密码' :title='`<span class="icon-login iconfont icon-mima"></span>`' v-model="passwd_value" show-clear></x-input>
    </div>
    <!-- 短信验证码登录 -->
    <div class="login_input" v-if="noteShow">
      <x-input type="text" placeholder='手机号' :title='`<span class="icon-login iconfont icon-shouji"></span>`' v-model="phone_note" show-clear></x-input>
      <x-input placeholder='验证码' :title='`<span class="icon-login iconfont icon-yanzhengma"></span>`' v-model="verify_value">
        <span slot="right" class="right_view">
          <span v-if="!codeStatus" :class="phone_note ? 'verify_view_no' : 'verify_view'" @click="getCode()">获取验证码</span>
          <span v-if="codeStatus" class="verify_view">再次获取({{codeTime}})</span>
        </span>
      </x-input>
    </div>
    <!-- 短信验证码登录 -->
    <div class="forget_note" v-if="!noteShow">
      <div @click="forgetNote">
        <span class="icon-note iconfont icon-shouji"></span> 短信验证码登录 </div>
    </div>
    <!-- 账号登录 -->
    <div class="forget_note" v-if="noteShow">
      <div @click="forgetNote">
        <span class="icon-note iconfont icon-denglu"></span> 会员账号登录 </div>
    </div>
    <!-- 登录操作 -->
    <div class="login_button">
      <x-button :show-loading="loginLoading" text="登录" @click.native="loginClick"></x-button>
    </div>
    <!-- 忘记密码 -->
    <!-- <div class="forget_passwd" v-if="!noteShow">
      <div @click="forgetPass"> 忘记密码 ?</div>
    </div> -->
  </div>
</template>

<script>
import config from '../../config';
import login from '../../api/login';

let that = this;
export default {
  beforeRouteEnter(to, from, next) {
    const token = config.getToken();
    // if (token) next({ path: '/User', replace: true });
    next();
  },
  created() {
    // 保存this的值和赋值当前页面
    that = this;
  },
  computed: {},
  mounted() {
    this.noteShow = false;
    this.verify_value = '';
    this.codeTime = 60;
    this.codeStatus = false;
    window.mobileNative.setNavigator('dark', '#F8F8F8')
    // 屏幕高度设置
    this.$nextTick(() => {
      that.$refs.LoginCenter.style.height = `${that.$countHeight()}px`;
    })
  },
  components: {},
  data() {
    return {
      phone_value: config.getToken() || '', // 手机号码
      passwd_value: '', // 登录密码
      verify_value: '', // 验证码登录
      loginLoading: false, // 登录按钮loading
      noteShow: false, // 验证码登录
      phone_note: '', // 验证号码
      codeStatus: false, // 获取验证码的状态
      codeTime: 60,
    };
  },
  methods: {
    // 登录操作
    loginClick() {
      // 校验手机号
      if (!this.noteShow) {
        if (!this.phone_value) {
          this.$vux.toast.text('请输入账号', 'middle');
          return;
        }
        // 校验密码
        if (!this.passwd_value) {
          this.$vux.toast.text('请输入密码', 'middle');
          return;
        }
        this.loginLoading = true;
        this.$vux.loading.show({
          text: '登录中'
        })
        this.userLogin(this.phone_value, this.passwd_value, (data) => {
          this.$vux.loading.hide()
          if (data.code !== 0) {
            this.$vux.toast.text(data.message, 'middle');
            return;
          }
          const checkSystem = window.mobileNative.checkSystem()
          if (checkSystem) {
            that.logCreate(data, checkSystem);
          }
          that.$store.commit('updateShowSheet', false)
          that.$store.commit('updateUserInfo', data.result);
          that.$store.commit('updateUserFlush', false)
          that.$router.push(`/User?id=${data.result.id}`);
          window.mobileNative.setNavigator('light', '#07BC99')
          config.setToken(this.phone_value);
          config.setUserToken(data.result);
        })
      } else {
        if (!this.phone_note) {
          this.$vux.toast.text('请输入手机号', 'middle');
          return;
        }
        if (!window.validator.regPhone.test(this.phone_note)) {
          this.$vux.toast.text('请输入正确的手机号', 'middle');
          return;
        }
        if (!this.verify_value) {
          this.$vux.toast.text('请输入手机验证码', 'middle');
        }
        this.loginLoading = true;
        this.$vux.loading.show({
          text: '登录中'
        })
        login.phonelogin(this.phone_note, this.verify_value).then((res) => {
          this.$vux.loading.hide()
          this.loginLoading = false;
          const data = res.data;
          if (data.code !== 0) {
            this.$vux.toast.text(data.message, 'middle');
            return;
          }
          const checkSystem = window.mobileNative.checkSystem()
          if (checkSystem) {
            that.logCreate(data, checkSystem);
          }
          that.$store.commit('updateShowSheet', false)
          that.$store.commit('updateUserInfo', data.result);
          that.$store.commit('updateUserFlush', false)
          that.$router.push(`/User?id=${data.result.id}`);
          window.mobileNative.setNavigator('light', '#07BC99')
          config.setToken(this.phone_value);
          config.setUserToken(data.result);
        }, (error) => {
          this.loginLoading = false;
        });
      }
    },
    logCreate(data, checkSystem) {
      const from = {
        companyId: data.result.companyId || '',
        companyName: data.result.companyName || '',
        name: data.result.name || '',
        jobName: data.result.jobName || '',
        accessMode: checkSystem || '',
      }
      login.logCreate(from);
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
    // 获取验证码
    getCode() {
      if (!window.validator.regPhone.test(this.phone_note)) {
        this.$vux.toast.text('请输入正确的手机号', 'middle');
        return;
      }
      this.$vux.loading.show({
        text: '获取中'
      })
      login.sendcode(this.phone_note).then((res) => {
        if (res.data.code === 0) {
          this.$vux.loading.hide()
          this.$vux.toast.text(`验证码已经发送至手机${this.phone_note}，有效时长10分钟，请注意查收`, 'middle');
          this.codeStatus = true;
          const vcodeTimer = setInterval(() => {
            that.codeTime -= 1
            if (that.codeTime <= 0) {
              that.codeStatus = false;
              that.codeTime = 60;
            }
          }, 1000);
        } else {
          this.$vux.loading.hide()
          this.$vux.toast.text(res.data.message, 'middle');
        }
      })
    },
    // 忘记密码
    forgetPass() {
      this.noteShow = !this.noteShow;
      // if (this.$plus) {
      //   const bts = ['取消', '确定'];
      //   this.$plus.nativeUI.confirm('是否用短信验证登录修改密码', (e) => {
      //     if (e.index === 1) {
      //       that.noteShow = !that.noteShow;
      //     }
      //   }, '', bts)
      // } else {
      //   this.$vux.confirm.show({
      //     content: '是否用短信验证登录修改密码?',
      //     onCancel() { },
      //     onConfirm() {
      //       that.noteShow = !that.noteShow;
      //     }
      //   })
      // }
    },
    // 验证码登录
    forgetNote() {
      this.noteShow = !this.noteShow;
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
  /* width: 100px; */
  /* height: 100px; */
  /* border-radius: 50%; */
}

/* 登录时候输入手机和密码 */
.login_input {
  padding: 30px 0 5px 0;
  flex-wrap: wrap;
}

.icon-note {
  font-size: 14px;
}

.right_view {
  font-size: 13px;
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

.verify_view_no {
  color: rgba(7,188,153, 0.8);
}

.verify_view {
  color: rgba(7,188,153, 0.2);
}

/* 短信验证码登录 */
.forget_note {
  color: #07BC99;
  cursor: pointer;
  padding: 0px 20px 20px 20px;
  font-size: 13px;
  width: 300px;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  /* autoprefixer: on */
  display: flex;
  justify-content: space-between;
}

.forget_note::hover {
  color: #07BC99;
}

/* 忘记密码 */
.forget_passwd {
  padding: 15px;
  font-size: 13px;
  cursor: pointer;
}

.head_state {
  background-color: #ffffff;
}
</style>

<style>
/* 登录时候输入手机和密码label的宽度 */
.login_input .weui-label {
  width: 20px;
  padding-right: 5px;
}

.login_input .weui-input {
  font-size: 15px;
}

.login_input .weui-cell:before {
  border-top: 0 !important;
}
</style>
