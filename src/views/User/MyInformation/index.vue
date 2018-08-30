<!-- 我的信息 -->
<template>
  <div>
    <div v-for="(item, index) in infoList" :key="index" class="my_infor" style="border-bottom: 1px solid #d9d9d9;" @click="clickInfo(index)">
      <div :class="`infor_icon ${!item.type || 'infor_icon_yes'}`">
        <span :class="`info_icon iconfont ${item.type ? 'icon-xinfeng1' : 'icon-xinfeng'}`"></span>
      </div>
      <div class="infor_content">
        <div class="system_infor">
          <div>系统信息</div>
          <div class="system_time">{{item.time}}</div>
        </div>
        <div class="system_text" :style="`color:${!item.type || '#999999'}`">{{item.text}}</div>
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
      // 信息列表
      infoList: [{
        type: 0,
        time: '2018-05-03 19:00:20',
        text: '这是一条后台发向前端的系统信息,请注意查收请注意查收'
      }, {
        type: 1,
        time: '2018-05-03 19:00:20',
        text: '这是一条后台发向前端的系统信息,请注意查收请注意查收'
      }, {
        type: 1,
        time: '2018-05-03 19:00:20',
        text: '这是一条后台发向前端的系统信息,请注意查收请注意查收'
      }, {
        type: 1,
        time: '2018-05-03 19:00:20',
        text: '这是一条后台发向前端的系统信息,请注意查收请注意查收'
      }]
    };
  },
  methods: {
    // 系统消息详情
    clickInfo(index) {
      console.log(`我点击了这条消息${index}`);
      this.$router.push(`/User/systemInfo?id=${index}`);
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
