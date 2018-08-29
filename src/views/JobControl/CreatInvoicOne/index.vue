<!-- 进销存录入 -->
<template>
  <div class="index_class" :style="`margin-top: ${winTop}px;`">
    <search :top="`${winTop}px`" placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view"></search>
    <div class="invoic_index border_top border_bottom">
      <div class="invoic_one" >
        <div class="client_name vux-1px-r">客户名称</div>
        <div class="client_view">销售</div>
        <div class="client_view">库存</div>
        <div class="client_view">陈列照片</div>
        <div class="client_view vux-1px-t">进货</div>
      </div>
      <div class="invoic_one border_top">
        <div class="client_name vux-1px-r">客户名称</div>
        <div class="client_view">销售</div>
        <div class="client_view">库存</div>
        <div class="client_view">陈列照片</div>
        <div class="client_view">进货</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  created() { },
  mounted() {
    this.winTop = document.querySelector('.vux-header').clientHeight;
  },
  computed: {
    // 屏幕宽度
    WinWidth: () => window.innerWidth
  },
  components: {},
  data() {
    return {
      winTop: 0, // 自动固定时距离顶部的距离
      searchValue: '', // 搜索的值
    };
  },
  methods: {},
};
</script>

<style scoped>
.client_view {
  width: 80px;
}
.client_name {
  width: 200px;
}
.invoic_index {
  overflow-x: auto;
  background-color: #ffffff;
}
.invoic_one {
  display: flex;
  font-weight: 600;
  color: #4d4d4d;
  width: 100%;
  font-size: 15px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.invoic_one div {
  flex-shrink: 0;
}

/* 搜索 */
.search_view {
  font-size: 15px;
}
</style>
<style>
/* 去掉cell组件的前后边框 */
.index_class .weui-cells:before {
  border-top: 0 solid #d9d9d9;
}

.index_class .weui-search-bar:after {
  border-bottom: 0 solid #d7d6dc;
}
</style>
