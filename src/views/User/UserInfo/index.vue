<!-- 我的信息 -->
<template>
  <scroller ref="InfoScroller" style="background-color: white;">
    <div class="message_group">
      <!-- 用户基本信息 -->
      <group gutter='0'>
        <cell v-for="(value, index) in userForm" :key="index" :title="value.name" :value="value.value"></cell>
      </group>
      <!-- 留言等信息 -->
      <group gutter='0.26rem'>
        <cell :title="value.name" is-link v-for="(value, index) in messageFrom" :key="index" @click.native="goRouter(value.path)">
          <div class="badge-value">
            <badge v-show="value.text" :text="value.text"></badge>
          </div>
        </cell>
      </group>
      <group gutter='0.26rem'>
        <cell @click.native="$store.commit('updateShowSheet', true)" class="go_login">
          <div slot="title" class="web-font">退出登录</div>
        </cell>
      </group>
      <!-- 底部白底 -->
      <div class="white_div"></div>
    </div>
  </scroller>
</template>

<script>
import config from '../../../config';
import user from '../../../api/user';

export default {
  created() { },
  mounted() {
    const that = this;
    // 检测是否有保存过用户信息
    if (!Object.keys(this.UserInfo).length || this.UserFlush) {
      this.userinfo(config.getToken(), (data) => {
        if (data.code !== 0) {
          this.$router.replace('/');
          return;
        }
        this.pushinfo(data.result)
        this.$store.commit('updateUserInfo', data.result);
        this.$store.commit('updateUserFlush', false)
        this.userId = data.result.id;
        config.setUserToken(data.result);
      })
    } else {
      config.setUserToken(this.UserInfo);
      this.pushinfo(this.UserInfo)
      this.userId = this.UserInfo.id;
    }
    // 屏幕高度设置
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight;
      that.$refs.InfoScroller.$el.style.marginTop = `${marginTop}px`
      that.$refs.InfoScroller.$el.style.height = `${that.$countHeight(['.vux-header', '.weui-tabbar'])}px`
    })
  },
  computed: {
    // 用户信息
    UserInfo() {
      return this.$store.getters.getUserInfo
    },
    // 是否刷新
    UserFlush() {
      return this.$store.getters.getUserFlush
    }
  },
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      // 留言等信息
      messageFrom: {
        myMessage: {
          name: '我的留言',
          path: 'myMessage',
          text: ''
        },
        myInformation: {
          name: '系统消息',
          path: 'myInformation',
          text: ''
        },
        editPassword: {
          name: '修改密码',
          path: 'editPassword',
          text: ''
        }
      },
      // 用户基本信息
      userForm: {
        username: {
          name: '登录名',
          value: ''
        },
        name: {
          name: '真实姓名',
          value: ''
        },
        phone: {
          name: '手机号',
          value: ''
        },
        companyName: {
          name: '所属分公司',
          value: ''
        },
        businessType: {
          name: '岗位类型',
          value: ''
        },
        jobName: {
          name: '岗位名称',
          value: ''
        },
      },
    };
  },
  methods: {
    // 点击router去向
    goRouter(name) {
      const pathname = name;
      this.$router.push(`/User/${pathname}?id=${this.userId}`);
    },
    // 获取用户信息
    userinfo(id, callBack) {
      user.userinfo(id).then((res) => {
        const data = res.data;
        callBack(data)
      });
    },
    // 给用户信息赋值
    pushinfo(data) {
      Object.keys(data).forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(this.userForm, item)) {
          this.userForm[item].value = data[item]
        }
      })
    }
  },
};
</script>

<style scoped>
/* 底部白色div */
.white_div {
  height: 10px;
  background-color: #f8f8f8;
}
.message_group {
  background-color: #f8f8f8;
}
.go_login {
  text-align: center;
}
</style>

<style>
/* badge居中显示 */
.message_group .badge-value {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
