<!-- 留言详情 -->
<template>
  <scroller :style="`margin-top: ${winTop}px;`">
    <!-- 森舍回复 * 留言内容 -->
    <div class="leave_smg_div" v-for="(item, index) in messageList" :key="index">
      <div class="msg_content">
        <div>{{item.title}}</div>
        <div class="msg_time">{{item.time}}</div>
      </div>
      <div class="msg_text">{{item.content}}</div>
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
      // 留言信息和回复
      messageList: [{
        title: '留言内容:',
        time: '2018-05-25 19:00:30',
        content: '这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言'
      }, {
        title: '森舍回复:',
        time: '2018-05-25 19:00:30',
        content: '这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言'
      }],
    };
  },
  methods: {},
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
