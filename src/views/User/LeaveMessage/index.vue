<!-- 留言详情 -->
<template>
  <div>
    <!-- 留言内容 -->
    <div class="leave_smg_div">
      <div class="msg_content">
        <div>留言内容</div>
        <div>2018-05-25 19:00:30</div>
      </div>
      <div>{{text}}</div>
    </div>
    <!-- 森舍回复 -->
    <div class="leave_smg_div">
      <div class="msg_content">
        <div>留言内容</div>
        <div>2018-05-25 19:00:30</div>
      </div>
      <div>{{text}}</div>
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
      text: '这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言这是一条留言'
    };
  },
  methods: {},
};
</script>

<style scoped>
.msg_content {
  display: flex;
  color: #999999;
  justify-content: space-between;
}

.leave_smg_div {
  padding: 20px 20px 0 20px;
  font-size: 11px;
  background-color: #ffffff;
}
</style>
