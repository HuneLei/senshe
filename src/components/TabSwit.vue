<!-- Tab切换组件 -->
<template>
  <div class="tab_swit">
    <tab :line-width=5 active-color='#fff' default-color='#fff' :custom-bar-width="barWidth" v-model="index">
      <tab-item active-class="tab_active" v-for="(item, index) in tabList" @on-item-click="tabClick" :key="index">{{item.name}}</tab-item>
    </tab>
    <swiper v-model="index" :threshold='120' :show-dots="false" ref="swiper">
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <slot :name="item.slot"></slot>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
let that = {};
export default {
  computed: {},
  components: {},
  watch: {
    // 当tab页面切换的时候监听方法
    index: (val) => {
      that.$emit('index-change', val);
    },
  },
  props: {
    // 顶部tab组
    tabList: {
      type: Array,
      default: () => []
    },
    // 底部bar的长度
    barWidth: {
      type: String,
      default: '2rem',
    },
    // 默认选中的tab
    initIndex: {
      type: Number,
      default: 0,
    },
  },
  beforeCreate() {
    // 保存this的值和赋值当前页面
    that = this;
  },
  mounted() {
    this.$nextTick(() => {
      // that.index = that.initIndex;
      that.$refs.swiper.xheight = `${that.$countHeight(['.weui-tabbar', '.tab_head'])}px`;
    })
  },
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
  background-color: #07bc99;
}
/* tab选中下边条样式 */
.tab_swit .vux-tab-ink-bar {
  margin-bottom: 6px;
}
</style>

