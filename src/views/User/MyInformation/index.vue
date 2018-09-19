<!-- 我的信息 -->
<template>
  <div ref="MyInfoScroller" class="scroller_rela">
    <scroller ref="MyScroller" :on-refresh="refresh" :on-infinite="infinite" :noDataText='noDataText' refreshText='下拉刷新'>
      <div v-for="(item, index) in infoList" :key="index" class="my_infor" style="border-bottom: 1px solid #d9d9d9;" @click="clickInfo(item.id)">
        <div class="infor_icon">
          <span class="info_icon iconfont icon-xinfeng"></span>
        </div>
        <div class="infor_content">
          <div class="system_infor">
            <div>系统信息</div>
            <div class="system_time">{{item.announcementTime | convertTime}}</div>
          </div>
          <div class="system_text">{{item.content}}</div>
        </div>
      </div>
    </scroller>
    <transition enter-active-class="animated slideInRight flying" leave-active-class="animated slideOutRight flying">
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
    // 屏幕高度设置
    const that = this;
    that.page = 0;
    this.$nextTick(() => {
      that.$refs.MyInfoScroller.style.height = `${that.$countHeight(['.vux-header'])}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      page: 0, // 当前页数
      // 上拉加载信息提示
      noDataText: '',
      // 信息列表
      infoList: []
    };
  },
  methods: {
    // 系统消息详情
    clickInfo(index) {
      console.log(`我点击了这条消息${index}`);
      this.$router.push(`/User/myInformation/systemInfo?id=${index}`);
    },
    // 获取留言信息
    getMobileAnnt(callBack) {
      user.mobileAnnt(this.page).then((res) => {
        const data = res.data;
        callBack(data)
      });
    },
    // 每当向上滑动的时候就让页数加1
    infinite(done) {
      this.page += 1;
      const self = this; // this指向问题
      this.getMobileAnnt((data) => {
        if (data.code === 0) {
          if (data.result.listData.length < 15) {
            if (self.page === 1 && data.result.listData.length === 0) {
              self.noDataText = '暂无数据';
            } else if (self.page !== 1) {
              self.noDataText = '没有更多数据了';
            }
            self.infoList = self.infoList.concat(data.result.listData);
            done(true)
            return
          }
          self.infoList = self.infoList.concat(data.result.listData);
        }
        done()
      })
    },
    // 这是向下滑动的时候请求最新的数据
    refresh(done) {
      const self = this; // this指向问题
      self.page = 1;
      this.getMobileAnnt((data) => {
        if (data.code === 0) {
          self.noDataText = data.result.listData.length === 0 ? '暂无数据' : ''
          self.infoList = data.result.listData;
        }
        done()
      })
    }
  },
};
</script>

<style scoped>
.my_infor {
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  align-items: center;
  justify-content: space-between;
}

.infor_icon {
  background-color: #07bc99;
  border-radius: 50%;
  width: 37.5px;
  height: 37.5px;
  text-align: center;
  color: #ffffff;
  line-height: 37.5px;
}

.infor_icon_yes {
  background-color: #cccccc;
}

.system_infor {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 17px;
}

.infor_content {
  width: 310px;
  font-size: 15px;
}

.system_time {
  font-size: 13.5px;
  color: #999999;
}

.system_text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
