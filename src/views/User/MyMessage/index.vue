<!-- 我的留言 -->
<template>
  <div>
    <div style="border-bottom: 1px solid #d9d9d9;" v-for="(item, index) in messageList" :key="index" :class="`message_list ${!item.type || 'no_color'}`" @click="clickMsg(index)">
      <div class="message_text">{{item.text}}</div>
      <div>
        <div class="message_time">{{item.time}}</div>
        <div class="message_deal">
          <p :class="`message_viewp ${item.type? 'yes_deal' : 'no_deal'}`" v-html="`${item.type? ' 已回复' : '未处理'}`"></p>
        </div>
      </div>
    </div>
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
      // 留言列表
      messageList: [{
        text: '这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言',
        time: '2018-05-03 19:00:20',
        type: 0
      }, {
        text: '这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言',
        time: '2018-05-03 19:00:20',
        type: 1
      }, {
        text: '这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言',
        time: '2018-05-03 19:00:20',
        type: 2
      }]
    };
  },
  methods: {
    // 点击留言信息
    clickMsg(index) {
      console.log(`我点击了这条留言${index}`);
    }
  },
};
</script>

<style scoped>
.message_list {
  display: flex;
  padding: 12px;
  font-size: 14.5px;
  background-color: white;
  align-items: baseline;
  justify-content: space-between;
}

.message_time {
  font-size: 13px;
  color: #999999;
  padding-bottom: 2px;
}

.message_deal {
  text-align: end;
}

.message_viewp {
  font-size: 13px;
  display: inline-block;
  padding: 1px 13px;
  border-radius: 25px;
}

.no_color {
  color: #999999;
}

.no_deal {
  border: 1px solid #ff9eaf;
  color: #ff1d41;
}

.yes_deal {
  border: 1px solid #86decd;
  color: #2ec6a8;
}

.message_text {
  width: 190px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
