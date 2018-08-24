<!-- 系统信息 -->
<template>
  <div>
    <div class="leave_smg_div">
      <div class="msg_content">
        <div>
          <span class="info_icon iconfont icon-mima"></span> {{systeminfo.title}}</div>
        <div class="msg_time">{{systeminfo.time}}</div>
      </div>
      <div class="msg_text">{{systeminfo.content}}</div>
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
      // 系统信息
      systeminfo: {
        title: '系统信息',
        time: '2018-05-25 19:00:30',
        content: '系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息系统信息'
      },
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

