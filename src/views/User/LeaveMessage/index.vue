<!-- 留言详情 -->
<template>
  <scroller ref="LeaveMessScroller">
    <!-- 留言内容 -->
    <div class="leave_smg_div">
      <div class="msg_content">
        <div>留言内容：</div>
        <div class="msg_time">{{messageList.createTime | convertTime}}</div>
      </div>
      <div class="msg_text" v-html="messageList.content"></div>
    </div>
    <!-- 森舍回复 -->
    <div class="leave_smg_div" v-show="messageList.replyType == 200">
      <div class="msg_content">
        <div>森舍回复：</div>
        <div class="msg_time">{{messageList.replyTime | convertTime}}</div>
      </div>
      <div class="msg_text" v-html="messageList.replyContent"></div>
    </div>
  </scroller>
</template>

<script>
import user from '../../../api/user';

export default {
  created() { },
  mounted() {
    const that = this;
    const id = this.$route.query.id;
    // 获取详情
    this.getMobileItem(id, (data) => {
      if (data.code === 0) {
        console.log('result', data.result)
        that.messageList = data.result
      }
    })
    // 屏幕高度设置
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.LeaveMessScroller.$el.style.marginTop = `${marginTop}px`
      that.$refs.LeaveMessScroller.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      // 留言信息和回复
      messageList: {},
    };
  },
  methods: {
    // 留言详情
    getMobileItem(id, callBack) {
      user.msgitem(id).then((res) => {
        callBack(res.data)
      })
    }
  },
};
</script>

<style scoped>
.msg_content {
  display: flex;
  color: #999999;
  align-items: baseline;
  justify-content: space-between;
}

.msg_time {
  font-size: 13px;
}

.leave_smg_div {
  font-size: 15px;
  padding: 16px 15px 0 15px;
  background-color: #ffffff;
}

.msg_text {
  padding-top: 5px;
  height: 100%;
}
</style>
