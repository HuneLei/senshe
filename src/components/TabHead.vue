<!-- 顶部导航组件 -->
<template>
  <div class="tab_head">
    <!-- 导航顶部类型 -->
    <div v-if="headIndex == 0">
      <x-header :left-options="{backText: '', preventGoBack: isBack, showBack: isShowBack}" :title="header_name" @on-click-back='onClickBack'>
        <span v-if="!modifier" slot="right" v-for="(item, index) in slotRight" :key="index" :class="`icon ${item.icon} icon_view`" @click="rightClick(index)"></span>
        <span v-if="modifier" slot="right" v-for="(item, index) in slotRight" :key="index" class="right_name" @click="rightClick(index)">{{item.name}}</span>
      </x-header>
    </div>
    <!-- 带tab切换导航顶部类型 -->
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
    <!-- tab页面切换组件 -->
    <div v-show="headIndex == 2">
      <tab-swit id='data_center_container' :initIndex="defaultIndex" :tabList="tabList" @index-change="indexChange" ref="swiper">
        <!-- <div v-for="(item, index) in tabList" :slot="item.slot" :key="index" :class="item.slot != 'myIndex' || 'my_index_scroll'" style="height: 100%;"> -->
        <!-- <transition :enter-active-class="`animated ${enteAnima}`" :leave-active-class="`animated ${leaveAnima}`">
            <component v-if="headIndex == 2" :is="item.slot"></component>
          </transition> -->
        <!-- <component v-if="headIndex == 2" :is="item.slot"></component> -->
        <!-- <component :is="item.slot"></component> -->
        <!-- </div> -->
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
    // 修改状态切换
    modifier() {
      return this.$store.getters.getModifier
    },
    // 离开时动画
    leaveAnima() {
      return this.$store.getters.getLeaveAnima;
    },
    // 进入时动画
    enteAnima() {
      return this.$store.getters.getEnteAnima;
    },
    // 选中的tab
    defaultIndex() {
      return this.$store.getters.getDefaultIndex
    }
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
      default: true,
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
    },
  },
  created() { },
  mounted() { },
  data() {
    return {
      // tab页面切换
      tabList: [
        { name: '我的商品', slot: 'myGoods', comslot: 'MyClient' },
        { name: '我的客户', slot: 'myClient', comslot: 'MyIndex' },
        { name: '我的指标', slot: 'myIndex', comslot: 'MyIndex' }
      ],
    };
  },
  methods: {
    // tab页面切换的时候触发
    indexChange(e) {
      console.log('e', e);
      let url = '';
      switch (e) {
        case 0:
          url = '/DateCenter/MyGoods';
          break;
        case 1:
          url = '/DateCenter/MyClient';
          break;
        case 2:
          url = '/DateCenter/MyIndex';
          break;
        default:
          break;
      }
      this.$router.push(url)
      // this.$store.commit('updateDefaultIndex', e)
    },
    // 点击右侧按钮时候触发
    rightClick(e) {
      console.log('我点击了右侧按钮', e)
      console.log('slotRight', this.slotRight[e].path)
      if (!this.slotRight[e].path) {
        this.$store.commit('updateModifier', !this.modifier)
      }
      this.$emit('right-click', e);
    },
    // 点击返回按钮触发
    onClickBack() {
      console.log('route', this.$route.path)
      if (this.$route.path === '/JobControl/ControlPlanItem' && this.modifier) {
        // 显示
        const that = this
        this.$vux.confirm.show({
          content: '记录未保存是否退出?',
          onCancel() { },
          onConfirm() {
            that.$store.commit('updateModifier', true)
            that.$router.back()
          }
        })
      } else {
        this.$router.back()
      }
    }
  }
};
</script>

<style scoped>
.icon_view {
  padding-left: 10px;
}
.right_name {
  font-size: 16px;
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

/* tab选中时候的class */
.incoic_item .tab_active {
  font-size: 19px !important;
}
/* 顶部导航样式 */
.tab_head {
  width: 100%;
  z-index: 9999;
}
</style>

