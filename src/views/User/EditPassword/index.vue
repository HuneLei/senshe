<!-- 修改密码 -->
<template>
  <scroller :style="`margin-top: ${winTop}px;`" v-model="winTop">
    <div class="edit_password">
      <!-- 输入密码 -->
      <group gutter='0' style="width: 100%">
        <x-input type="password" placeholder="请输入新密码" v-model="newPassWord"></x-input>
        <x-input type="password" placeholder="再次输入新密码" v-model="ageinPassWord"></x-input>
      </group>
      <!-- 确认提交 -->
      <div class="submit_button">
        <x-button :show-loading="submitLoading" text="确认提交" @click.native="submitClick"></x-button>
      </div>
    </div>
  </scroller>
</template>

<script>

export default {
  created() { },
  mounted() {
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      newPassWord: '123', // 新密码
      ageinPassWord: '134', // 再次输入的新密码
      submitLoading: false, // 提交时候的loading
    };
  },
  methods: {
    // 确认提交
    submitClick() {
      if (this.newPassWord !== this.ageinPassWord) {
        this.$vux.toast.text('两次密码不一致', 'top');
      }
    }
  },
};
</script>

<style scoped>
/* 修改密码 */
.edit_password {
  display: flex;
  color: #7a7a7a;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
}
/* 提交按钮 */
.submit_button {
  width: 350px;
  margin-top: 15px;
}

.submit_button .weui-btn {
  line-height: 40px;
  font-size: 15px;
}
</style>
