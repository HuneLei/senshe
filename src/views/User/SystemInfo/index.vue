<!-- 系统信息 -->
<template>
  <scroller ref="SysInfoScroller">
    <div class="leave_smg_div">
      <div class="msg_content">
        <div>
          <span class="info_icon iconfont icon-xinfeng1"></span> 系统信息 </div>
        <div class="msg_time">{{systeminfo.announcementTime | convertTime}}</div>
      </div>
      <div class="msg_text">{{systeminfo.content}}</div>
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
    this.getSysInfoItem(id, (data) => {
      if (data.code === 0) {
        console.log('result', data.result)
        that.systeminfo = data.result
      }
    })
    // 屏幕高度设置
    this.$nextTick(() => {
      const marginTop = document.querySelector('.vux-header').clientHeight + window.immersed;
      that.$refs.SysInfoScroller.$el.style.marginTop = `${marginTop}px`
      that.$refs.SysInfoScroller.$el.style.height = `${that.$countHeight(['.vux-header']) - window.immersed}px`
    })
  },
  computed: {},
  components: {},
  data() {
    return {
      // 系统信息
      systeminfo: {},
    };
  },
  methods: {
    // 信息详情
    getSysInfoItem(id, callBack) {
      user.mobileItem(id).then((res) => {
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

