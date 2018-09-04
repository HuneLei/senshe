<!-- 顶部导航组件 -->
<template>
  <div class="tab_head" :style="`top:${immersed}px`">
    <div v-if="headIndex == 0">
      <x-header :left-options="{backText: '', preventGoBack: isBack, showBack: isShowBack}" :title="header_name">
        <span slot="right" v-for="(item, index) in slotRight" :key="index" :class="`icon ${item.icon} icon_view`" @click="rightClick(index)"></span>
      </x-header>
    </div>
    <div v-if="headIndex == 1" class="incoic_item">
      <x-header id="header" :line-width=50 title="slot:overwrite-title" :left-options="{backText: ''}">
        <div slot="overwrite-title">
          <tab class="" default-color='#fff' active-color='#fff' custom-bar-width="1rem">
            <tab-item active-class="tab_active" selected>商业</tab-item>
            <tab-item active-class="tab_active">连锁</tab-item>
            <tab-item active-class="tab_active">门店</tab-item>
          </tab>
        </div>
      </x-header>
    </div>
    <div v-if="headIndex == 2">
      <!-- tab页面切换组件 -->
      <tab-swit id='data_center_container' :winHeight="winHeight" :initIndex="initIndex" :tabList="tabList" @index-change="indexChange">
        <div v-for="(item, index) in tabList" :slot="item.slot" :key="index" class="my_index_scroll">
          <!-- router链接 -->
          <component :is="item.slot"></component>
        </div>
      </tab-swit>
    </div>
  </div>
</template>

<script>
import myGoods from '../views/DateCenter/MyGoods/index.vue'; // 我的商品
import myClient from '../views/DateCenter/MyClient/index.vue'; // 我的客户
import myIndex from '../views/DateCenter/MyIndex/index.vue'; // 我的指标
export default {
  computed: {
    // 有状态栏时距离顶部的高度
    immersed() {
      return window.immersed
    },
    // // 屏幕高度
    // winHeight() {
    //   return this.$store.getWinHeight
    // }
  },
  components: {
    myGoods,
    myClient,
    myIndex,
  },
  props: {
    // 右边图标样式组
    slotRight: {
      type: Array,
      default: () => [{ icon: '', name: '' }]
    },
    // 导航标题
    header_name: {
      type: String,
      default: '',
    },
    // 是否禁止点击返回按钮
    isBack: {
      type: Boolean,
      default: false,
    },
    // 是否显示返回文字
    isShowBack: {
      type: Boolean,
      default: true,
    },
    // Head类型s
    headIndex: {
      type: Number,
      default: 0,
    }
  },
  created() { },
  mounted() {
    // 屏幕高度
    this.winHeight = this.$countHeight(['.weui-tabbar', '.tab_head']) - window.immersed;
  },
  data() {
    return {
      winHeight: 0, // 屏幕高度
      initIndex: 0, // 导航栏默认选项
      // tab页面切换
      tabList: [
        { name: '我的商品', slot: 'myGoods', comslot: 'MyClient' },
        { name: '我的客户', slot: 'myClient', comslot: 'MyIndex' },
        { name: '我的指标', slot: 'myIndex', comslot: 'MyIndex' }
      ],
    };
  },
  methods: {
    indexChange(e) {
      console.log('e', e);
      // this.winHeight = this.$countHeight(['.weui-tabbar', '.vux-tab']) - window.immersed;
    },
    // 点击右侧按钮时候触发
    rightClick(e) {
      console.log('我点击了右侧按钮', e)
      this.$emit('right-click', e);
    },
  }
};
</script>

<style scoped>
.icon_view {
  padding-left: 10px;
}
</style>
<style>
.incoic_item .vux-header-title-area,
.vux-header .vux-header-title {
  margin: 0 30px;
}
/* tab切换的背景颜色 */
.incoic_item .vux-tab {
  background-color: #07bc99;
}
/* tab选中下边条样式 */
.incoic_item .vux-tab-ink-bar {
  margin-bottom: 6px;
}

/* 顶部导航样式 */
.tab_head {
  position: fixed;
  width: 100%;
  z-index: 9999;
}
</style>

