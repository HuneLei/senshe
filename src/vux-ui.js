/* eslint-disable */
import Vue from 'vue';
import VueScroller from 'vue-scroller'

import {
  // Icon,
  Badge,
  LoadMore,
  XButton,
  XHeader,
  Previewer,
  LoadingPlugin,
  // Divider,
  // Flexbox,
  // FlexboxItem,
  // Grid,
  // GridItem,
  // Sticky,
  // ViewBox,
  // Calendar,
  // CellBox,
  // CellFormPreview,
  Cell,
  Card,
  // CheckIcon,
  // Checker,
  // CheckerItem,
  // Checklist,
  // DatetimeView,
  // DatetimeRange,
  Datetime,
  // FormPreview,
  Group,
  // GroupTitle,
  // InlineXSwitch,
  // InlineXNumber,
  // InlineCalendar,
  // Popup,
  // Popover,
  PopupPicker,
  // PopupRadio,
  // Picker,
  // Rater,
  // Radio,
  // Range,
  // Selector,
  // Swipeout,
  // SwipeoutItem,
  // SwipeoutButton,
  Search,
  XInput,
  XTextarea,
  XTable,
  // XNumber,
  // XAddress,
  // Marquee,
  // MarqueeItem,
  // Panel,
  // Qrcode,
  Swiper,
  SwiperItem,
  // XProgress,
  Actionsheet,
  // Alert,
  // Confirm,
  // InlineLoading,
  Loading,
  // LoadMore,
  // Msg,
  // Spinner,
  // Toast,
  // XDialog,
  // ButtonTab,
  // ButtonTabItem,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  TransferDom,
  // VChart,
  // VLine,
  // VArea,
  // VBar,
  // VPie,
  // VPoint,
  // VScale,
  // VAxis,
  // VGuide,
  // VTooltip,
  // VLegend,
  // XCircle,
  // Scroller,
  ConfirmPlugin,
  ToastPlugin,
} from 'vux';

import MyCom from './components'; // 引入公共组件
Vue.component('TabHead', MyCom.TabHead); // 顶部导航组件
Vue.component('TabSwit', MyCom.TabSwit); // Tab页面切换组件
Vue.component('TabBar', MyCom.TabBar); // 底部导航组件

Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);
Vue.use(VueScroller)
Vue.use(LoadingPlugin) // loading加载

Vue.component('Actionsheet', Actionsheet); // 模态弹出框
Vue.component('LoadMore', LoadMore); // 底部加载
Vue.component('Tabbar', Tabbar); // 底部导航
Vue.component('Previewer', Previewer); // 图片预览
Vue.component('TransferDom', TransferDom); // 图片预览
Vue.component('TabbarItem', TabbarItem);
Vue.component('XHeader', XHeader);
Vue.component('PopupPicker', PopupPicker); // PopupPicker底部弹窗
// Vue.component('Marquee', Marquee); // 公告
// Vue.component('MarqueeItem', MarqueeItem);
Vue.component('Cell', Cell);
Vue.component('Group', Group);
Vue.component('x-button', XButton);
// Vue.component('ViewBox', ViewBox);
// Vue.component('CellBox', CellBox);
Vue.component('Card', Card);
// Vue.component('Flexbox', Flexbox);
// Vue.component('FlexboxItem', FlexboxItem);
Vue.component('XInput', XInput);
Vue.component('XTextarea', XTextarea);
// Vue.component('Icon', Icon);
Vue.component('Tab', Tab);
Vue.component('TabItem', TabItem);
// Vue.component('Grid', Grid);
// Vue.component('GridItem', GridItem);

// Vue.component('VChart', VChart);
// Vue.component('VArea', VArea);
// Vue.component('VLine', VLine);
// Vue.component('VTooltip', VTooltip);
// Vue.component('VLegend', VLegend);
// Vue.component('VScale', VScale);

// Vue.component('Icon', Icon);
// Vue.component('Divider', Divider);
// Vue.component('Flexbox', Flexbox);
// Vue.component('FlexboxItem', FlexboxItem);
// Vue.component('Sticky', Sticky);
// Vue.component('VChart', VChart);
// Vue.component('Flexbox', Flexbox);
// Vue.component('FlexboxItem', FlexboxItem);
// Vue.component('Sticky', Sticky);
Vue.component('Swiper', Swiper);
Vue.component('SwiperItem', SwiperItem);
// Vue.component('Checker', Checker);
// Vue.component('CheckerItem', CheckerItem);
// Vue.component('XDialog', XDialog);
// Vue.component('InlineCalendar', InlineCalendar);
// Vue.component('Popup', Popup);
// Vue.component('Popover', Popover);
// Vue.component('Checklist', Checklist);
// Vue.component('CheckIcon', CheckIcon);
// Vue.component('Selector', Selector);
Vue.component('Badge', Badge);
Vue.component('Search', Search);
// Vue.component('LoadMore', LoadMore);
// Vue.component('Toast', Toast);
Vue.component('XTable', XTable);
// Vue.component('XNumber', XNumber);
// Vue.component('GroupTitle', GroupTitle);
Vue.component('Loading', Loading);
// Vue.component('Confirm', Confirm);
Vue.component('Datetime', Datetime);
// Vue.component('Rater', Rater);

// 注册全局指令
Vue.directive('transfer-dom', TransferDom)

// 全局方法的引入
// 计算屏幕剩余高度
Vue.prototype.$countHeight = (array) => {
  let h = 0;
  let data = [];
  if (typeof array !== 'object') {
    data = [array];
  } else {
    data = array;
  }
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    try {
      const $e = document.querySelector(item);
      if ($e !== null) {
        h += $e.clientHeight;
      }
    } catch (e) {
      h += parseFloat(item) || 0;
    }
  }
  return window.innerHeight - h;
};

if (window.plus) {
  Vue.prototype.$plus = plus;
} 

import convert from './utils/convert'; //  常用方法
import validator from './utils/validator'; //  数据校验
import mobileNative from './utils/mobileNative'; //  手机共用方法

// 定义全局过滤器
Object.keys(convert).forEach(k => {
  Vue.filter(k, convert[k])
})

window.validator = validator;
window.mobileNative = mobileNative;
