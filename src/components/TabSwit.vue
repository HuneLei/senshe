<!-- Tab切换组件 -->
<template>
  <div class="tab_swit">
    <tab :line-width=5 active-color='#fff' default-color='#fff' :custom-bar-width="barWidth" v-model="index">
      <tab-item active-class="tab_active" v-for="(item, index) in tabList" @on-item-click="tabClick" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" height="600px" :show-dots="false">
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <div class="tab-swiper vux-center">{{item}} Container</div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    itIndex: {
      get: () => this.initIndex,
      set: (index) => {
        console.log('index', index)
        this.initIndex = index;
      }
    }
  },
  props: {
    // 顶部tab组
    tabList: {
      type: Array,
      default: () => ['精选', '美食', '电影', '酒店']
    },
    // 底部bar的长度
    barWidth: {
      type: String,
      default: '90px',
    },
    // 默认选中的tab
    initIndex: {
      type: Number,
      default: 0,
    }
  },
  created() {},
  mounted() {},
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    // 被点击tab的时候触发
    tabClick() {
      console.log('我被点击了')
    },
  }
};
</script>
<style scoped>
  /* tab选中时候的class */
  .tab_active {
    font-size: 19px !important;
  }
</style>

<style>
  /* tab切换的背景颜色 */
  .tab_swit .vux-tab {
    background-color: #07BC99;
  }
  /* tab选中下边条样式 */
  .tab_swit .vux-tab-ink-bar {
    margin-bottom: 6px;
  }
</style>

