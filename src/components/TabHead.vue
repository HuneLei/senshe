<!-- 顶部导航组件 -->
<template>
  <div class="tab_head">
    <!-- 导航顶部类型 -->
    <div v-if="headIndex == 0">
      <x-header :left-options="{backText: '', preventGoBack: isBack, showBack: isShowBack}" :title="header_name || indexName" @on-click-back='onClickBack'>
        <span v-if="!modifier && item.icon && !item.iconShow" slot="right" v-for="(item, index) in slotRight" :key="index" :class="`icon ${item.icon} icon_view`" @click="rightClick(index)"></span>
        <span v-if="modifier && !item.iconShow" slot="right" v-for="(item, index) in slotRight" :key="index" class="right_name icon_view" @click="rightClick(index)">{{item.name}}</span>
      </x-header>
    </div>
    <!-- 带tab切换导航顶部类型 -->
    <div v-if="headIndex == 1" class="incoic_item">
      <x-header id="header" title="slot:overwrite-title" :left-options="{backText: ''}">
        <div slot="overwrite-title">
          <tab class="" default-color='#fff' active-color='#fff' custom-bar-width="1rem" :line-width='6'>
            <tab-item active-class="tab_active" selected @on-item-click="itemTabClick(100)">商业</tab-item>
            <tab-item active-class="tab_active" @on-item-click="itemTabClick(200)">连锁</tab-item>
            <tab-item active-class="tab_active" @on-item-click="itemTabClick(300)">门店</tab-item>
          </tab>
        </div>
        <div slot="right">
          <div @click="selectDate()" class="date_value">
            {{dateValue}}
            <span v-show="shangla" class="icon-wite iconfont icon-shangla"></span>
            <span v-show="!shangla" class="icon-wite iconfont icon-xiala"></span>
          </div>
        </div>
      </x-header>
    </div>
    <!-- tab页面切换组件 -->
    <div v-show="headIndex == 2">
      <tab-swit id='data_center_container' :tabList="tabList" @index-change="indexChange" ref="swiper">
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
    // 商级名称
    indexName() {
      return this.$store.getters.getIndexName
    },
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
  mounted() {
    const myDate = new Date();
    this.dateValue = `${myDate.getFullYear()}-${myDate.getMonth() + 1 > 9 ? myDate.getMonth() + 1 : `0${myDate.getMonth() + 1}`}`
    this.$store.commit('updateDateValue', this.dateValue)
  },
  activated() {},
  data() {
    return {
      shangla: false,
      dateValue: '',
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
      this.$store.commit('updateDefaultPath', url)
      this.$router.push(url)
    },
    // 点击右侧按钮时候触发
    rightClick(e) {
      if (!this.slotRight[e].path) {
        if (e === 1) {
          this.$store.commit('updateModifier', !this.modifier)
        }
        if (e === 0) {
          this.$store.commit('updateDataState')
        }
      }
      this.$emit('right-click', e);
    },
    // tab切换的时候触发
    itemTabClick(index) {
      this.$store.commit('updateTabIndex', index)
    },
    // 选择日期
    selectDate() {
      // 组件内使用
      const that = this
      this.$vux.datetime.show({
        value: that.dateValue, // 其他参数同 props
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM',
        yearRow: '{value}年',
        monthRow: '{value}月',
        onConfirm(val) {
          that.dateValue = val;
          that.$store.commit('updateDateValue', val)
        },
        onHide() {
          that.shangla = false
        },
        onShow() {
          that.shangla = true
        }
      })
    },
    // 点击返回按钮触发
    onClickBack() {
      if (this.$route.path === '/JobControl/ControlPlanItem' && this.modifier) {
        // 显示
        const that = this
        if (this.$plus) {
          const bts = ['取消', '确定'];
          this.$plus.nativeUI.confirm('记录未保存是否退出?', (e) => {
            if (e.index === 1) {
              that.$store.commit('updateModifier', true)
              that.$router.back()
            }
          }, '', bts)
        } else {
          this.$vux.confirm.show({
            content: '记录未保存是否退出?',
            onCancel() { },
            onConfirm() {
              that.$store.commit('updateModifier', true)
              that.$router.back()
            }
          })
        }
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
.icon-wite {
  color: #ffffff !important;
  font-size: 11px;
  padding-left: 5px;
}
.date_value {
  font-size: 13px;
  display: flex;
  padding: 2px 0px 2px 4px;
  align-items: center;
  /*! autoprefixer: off */
  display: -webkit-flex;
  -webkit-align-items: center;
  /* autoprefixer: on */
}
</style>
<style>
.incoic_item .vux-header-title-area,
.vux-header .vux-header-title {
  margin: 0 60px;
}
/* tab切换的背景颜色 */
.incoic_item .vux-tab {
  background-color: #07bc99;
  right: 20px;
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

