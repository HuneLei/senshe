<!-- 我的留言 -->
<template>
  <div ref="MyMessScroller" class="scroller_rela">
    <scroller ref="MyScroller" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
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
    <transition enter-active-class="animated slideInRights flying" leave-active-class="animated slideOutRights flying">
      <!-- router链接 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import user from '../../../api/user';

export default {
  created() { },
  mounted() {
    const that = this;
    that.page = 0;
    // 屏幕高度设置
    this.$nextTick(() => {
      that.$refs.MyMessScroller.style.height = `${that.$countHeight(['.vux-header'])}px`
    })
  },
  computed: {
    // 是否刷新
    msgFlush() {
      return this.$store.getters.getMsgFlush
    }
  },
  components: {},
  data() {
    return {
      page: 0, // 当前页数
      // 留言列表
      messageList: [],
      noDataText: '',
    };
  },
  watch: {
    $route(to, from) {
      if (from.path === '/User/myMessage/newMessage' && this.msgFlush) {
        const self = this; // this指向问题
        self.page = 0;
        this.$refs.MyScroller.scrollTo(0, 0, false)
        this.$refs.MyScroller.triggerPullToRefresh()
        self.messageList = [];
      }
    }
  },
  methods: {
    // 点击留言信息
    clickMsg(index) {
      this.$router.push(`/User/myMessage/leaveMessage?id=${index}`);
    },
    // 获取留言信息
    getMsglist(callBack) {
      user.msglist(this.page).then((res) => {
        const data = res.data;
        callBack(data)
      });
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getMsglist((data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            self.messageList = self.messageList.concat(data.result.listData);
            done(true)
            return
          }
          self.messageList = self.messageList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.getMsglist((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.messageList = data.result.listData;
        }
        done()
      })
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
