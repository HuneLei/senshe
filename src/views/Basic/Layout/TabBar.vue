<!-- 底部导航组件 -->
<template>
  <div>
    <tabbar class="tab_view" v-model="tab_index" @on-index-change="indexChange">
      <tabbar-item v-for="(item, index) in tab_item" :key="index" :link="item.tabLink" :badge="item.tabBadge"
        :show-dot="item.tabShowdot">
        <span slot="icon" :class='`tab_icon ${item.tabIcon}`'></span>
        <span slot="label" class="tab_font">{{item.tabName}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  created() {},
  mounted() {},
  data() {
    return {
      // 默认选项
      tab_index: 0,
      // tab切换链接
      tab_item: [
        {
          tabLink: '?',
          tabName: '数据中心',
          tabIcon: 'iconfont icon-shouji',
          tabShowdot: false,
          tabBadge: '',
          selected: true,
        },
        {
          tabLink: '?',
          tabName: '工作管理',
          tabIcon: 'iconfont icon-shouji',
          tabShowdot: true,
          tabBadge: '',
          selected: false,
        },
        {
          tabLink: '?',
          tabName: '我的',
          tabIcon: 'iconfont icon-shouji',
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
      console.log('在切换tab', index);
    },
  }
};
</script>

<style scoped>
</style>
<style>
  .tab_view .weui-tabbar__item {
    padding: 8px 0 0 0;
  }
  .tab_view .weui-tabbar__icon > sup {
    top: -5px;
  }
</style>

