<!-- 我的信息 -->
<template>
  <div>
    <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`">
      <!-- router链接 -->
      <router-view></router-view>
    </transition>
    <actionsheet v-model="showSheet" :menus="menusSheet" @on-click-menu-delete="goLogin" show-cancel></actionsheet>
  </div>
</template>

<script>
import config from '../../config';
import user from '../../api/user';

let that = {};
export default {
  created() { },
  beforeCreate() {
    that = this;
  },
  watch: {
    // showSheet: (newVal, oldVal) => {
    //   // that.isSheet = newVal;
    // }
  },
  computed: {
    // 离开时动画
    leaveAnima() {
      return this.$store.getters.getLeaveAnima;
    },
    // 进入时动画
    enteAnima() {
      return this.$store.getters.getEnteAnima;
    },
    // 退出登录
    showSheet: {
      get: () => that.$store.getters.getShowSheet,
      set: (v) => {
        that.$store.commit('updateShowSheet', v)
      }
    }
  },
  components: {},
  methods: {
    // 退出登录
    goLogin() {
      config.removeToken();
      config.removeUserToken();
      window.mobileNative.setNavigator('dark', '#F8F8F8')
      this.$router.replace('/');
    },
  },
  data() {
    return {
      isSheet: false,
      menusSheet: {
        'title.noop': '<span style="color:#666">确定退出登录？</span>',
        delete: '<span style="color:red">退出</span>'
      },
    }
  },
};
</script>

<style scoped>
</style>
