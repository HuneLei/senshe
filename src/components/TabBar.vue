<!-- 底部导航组件 -->
<template>
  <div>
    <tabbar class="tab_view" v-model="tab_index" @on-index-change="indexChange">
      <tabbar-item v-for="(item, index) in tab_item" :key="index" :link="item.tabLink" :badge="badgeList[index]" :show-dot="item.tabShowdot">
        <span slot="icon" :class='`tab_icon ${item.tabIcon}`'></span>
        <span slot="label" class="tab_font">{{item.tabName}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    this.tab_index = this.initIndex;
  },
  computed: {
    // 选中的tab
    defaultPath() {
      return this.$store.getters.getDefaultPath;
    }
  },
  mounted() { },
  props: {
    // 顶部badge组
    badgeList: {
      type: Array,
      default: () => ['', '', '']
    },
    // 默认选中的tab
    initIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      // 默认选项
      tab_index: 2,
      // tab切换链接
      tab_item: [
        {
          tabLink: '?',
          tabName: '数据中心',
          tabIcon: 'iconfont icon-shujuzhongxin',
          tabShowdot: false,
          tabBadge: '',
          selected: true,
        },
        {
          tabLink: '?',
          tabName: '工作管理',
          tabIcon: 'iconfont icon-gongzuoguanli',
          tabShowdot: false,
          tabBadge: '',
          selected: false,
        },
        {
          tabLink: '?',
          tabName: '我的',
          tabIcon: 'iconfont icon-denglu',
          tabShowdot: false,
          tabBadge: '1',
          selected: false,
        }
      ]
    };
  },
  methods: {
    // tab切换时候触发
    indexChange(index) {
      switch (index) {
        case 0:
          this.$router.push(this.defaultPath);
          break;
        case 1:
          this.$router.push('/JobControl');
          break;
        case 2:
          this.$router.push('/User');
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style scoped>
.tab_view {
  background-color: #ffffff;
}
</style>
<style>
.tab_view .weui-tabbar__item {
  padding: 8px 0 0 0;
}
.tab_view .weui-tabbar__icon > sup {
  top: -5px;
}
</style>

