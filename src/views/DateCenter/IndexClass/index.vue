<!-- 商级 -->
<template>
  <scroller :style="`margin-top: ${winTop}px;`" v-model="winTop" :on-refresh="refresh" :on-infinite="infinite" noDataText='' refreshText='下拉刷新'>
    <div class="index_class">
      <search :top="`${winTop}px`" :auto-fixed='false' placeholder="输入通用名进行搜索" v-model="searchValue" class="search_view"></search>
      <group gutter='0'>
        <cell v-for="(item, index) in cellList" :key="index" :title="item.title" is-link @click.native="goCellItem(item.id)"></cell>
      </group>
    </div>
  </scroller>
</template>

<script>
import dateCenter from '../../../api/dateCenter';

export default {
  created() { },
  mounted() {
    this.winTop = document.querySelector('.vux-header').clientHeight + window.immersed;
    console.log('this.$route.query.index', this.$route.query.index)
    this.clientIndex = this.$route.query.index;
    this.clientList(this.$route.query.index);
  },
  computed: {},
  components: {},
  data() {
    return {
      clientIndex: '', // 当前客户类型 100一级商 200二级连锁 300终端门店
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
    // 我的客户列表
    clientList(index) {
      dateCenter.list(index).then((res) => {
        const data = res.data;
        console.log('data', data)
      });
    },
    // 去列表详情页面
    goCellItem(id) {
      this.$router.push(`/DateCenter/ClientItem?id=${id}`);
      console.log(`点击的id是${id}`)
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

