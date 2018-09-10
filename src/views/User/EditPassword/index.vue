<!-- 修改密码 -->
<template>
  <scroller ref="EditPassScroller">
    <div class="edit_password">
      <!-- 输入密码 -->
      <group gutter='0' style="width: 100%">
        <x-input type="password" placeholder="请输入新密码" v-model="form.newPassWord"></x-input>
        <x-input type="password" placeholder="再次输入新密码" v-model="form.ageinPassWord"></x-input>
      </group>
      <!-- 确认提交 -->
      <div class="submit_button">
        <x-button :show-loading="submitLoading" text="确认提交" @click.native="submitClick"></x-button>
      </div>
    </div>
  </scroller>
</template>

<script>
import user from '../../../api/user';

export default {
  created() { },
  mounted() {
    // 屏幕高度设置
    const that = this;
    that.form.id = that.$route.query.id;
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.EditPassScroller.$el.style.marginTop = `${marginTop}px`
      that.$refs.EditPassScroller.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      userId: '', // 用户id
      winTop: 0, // 导航栏高度
      form: {
        id: '',
        newPassWord: '',
        ageinPassWord: '',
      },
      // newPassWord: '123', // 新密码
      // ageinPassWord: '134', // 再次输入的新密码
      submitLoading: false, // 提交时候的loading
    };
  },
  methods: {
    // 确认提交
    submitClick() {
      if (this.form.newPassWord === '' || this.form.ageinPassWord === '') {
        this.$vux.toast.text('请输入新秘密', 'middle');
        return;
      }
      if (this.form.newPassWord !== this.form.ageinPassWord) {
        this.$vux.toast.text('两次密码不一致', 'middle');
        return;
      }
      user.updatePwd(this.form).then((res) => {
        console.log('res', res.data)
      })
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
