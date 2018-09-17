<!-- 新的留言 -->
<template>
  <scroller style="background-color: #ffffff;">
    <div class="new_message">
      <!-- 输入留言 -->
      <group gutter='0' style="width: 100%">
        <x-textarea :max="300" placeholder="请输入留言内容"  v-model="textValue"></x-textarea>
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
  activated() {
    this.textValue = '';
    this.$store.commit('updatemsgFlush', false)
  },
  created() { },
  mounted() { },
  computed: {},
  components: {},
  data() {
    return {
      textValue: '', // 留言内容
      submitLoading: false, // 提交时候的loading
    };
  },
  methods: {
    // 确认提交
    submitClick() {
      console.log('this.textValue', this.textValue)
      if (!this.textValue) {
        this.$vux.toast.text('请输入留言内容', 'middle');
      } else {
        user.msgcreate(this.textValue).then((res) => {
          console.log('res', res.data)
          // 重新获取用户信息
          this.$store.commit('updatemsgFlush', true)
          this.$store.commit('updateUserFlush', true)
          this.$vux.toast.text('新增成功', 'middle');
          this.$router.back()
        });
      }
    }
  },
};
</script>

<style scoped>
/* 新建留言 */
.new_message {
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

<style>
.new_message textarea {
  height: 6.5rem !important;
}
</style>

