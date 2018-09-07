<!-- 我的留言 -->
<template>
  <scroller ref="MyMessScroller" :on-refresh="refresh" :on-infinite="infinite" noDataText='' refreshText='下拉刷新'>
    <div style="border-bottom: 1px solid #d9d9d9;" v-for="(item, index) in messageList" :key="index" :class="`message_list ${!item.type || 'no_color'}`" @click="clickMsg(item.id)">
      <div class="message_text">{{item.content}}</div>
      <div>
        <div class="message_time">{{(item.replyType == 200 ? item.replyTime : item.createTime) | convertTime }}</div>
        <div class="message_deal">
          <p :class="`message_viewp ${item.replyType == 200 ? 'yes_deal' : 'no_deal'}`" v-html="`${item.replyType == 200 ? ' 已回复' : '未处理'}`"></p>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import user from '../../../api/user';

export default {
  created() { },
  mounted() {
    const that = this;
    this.getMsglist((data) => {
      console.log('data', data)
      if (data.code === 0) {
        this.messageList = data.result
      }
    })
    // 屏幕高度设置
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.MyMessScroller.$el.style.marginTop = `${marginTop}px`
      that.$refs.MyMessScroller.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      winTop: 0, // 导航栏高度
      // 留言列表
      // replyType 100 是未处理 200 是已经回复
      messageList: [],
    };
  },
  methods: {
    // 点击留言信息
    clickMsg(index) {
      console.log(`我点击了这条留言${index}`);
      this.$router.push(`/User/leaveMessage?id=${index}`);
    },
    // 获取留言信息
    getMsglist(callBack) {
      user.msglist().then((res) => {
        const data = res.data;
        callBack(data)
      });
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      console.log('done', done);
      done(true)
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      console.log('done', done);
      done(true)
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
