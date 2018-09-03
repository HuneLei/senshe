<!-- 商级 -->
<template>
  <div class="index_class">
    <search :top="`${winTop}px`" :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view"></search>
    <group gutter='0'>
      <cell v-for="(item, index) in cellList" :key="index" :title="item.title" is-link @click.native="goCellItem(item.id)"></cell>
    </group>
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
      winTop: 0, // 自动固定时距离顶部的距离
      searchValue: '', // 搜索的值
      cellList: [
        {
          id: 1,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 3,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }, {
          id: 2,
          title: '上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东上海浦东'
        }
      ], // 列表
    };
  },
  methods: {
    // 去列表详情页面
    goCellItem(id) {
      this.$router.push(`/DateCenter/ClientItem?id=${id}`);
      console.log(`点击的id是${id}`)
    }
  },
};
</script>

<style scoped>
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

