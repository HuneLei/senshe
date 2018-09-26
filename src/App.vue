<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>


<style lang="less">
.animated.flying {
  -webkit-animation-duration: 350ms;
  animation-duration: 350ms;
}
/**
* vux-1px-l 左边框
* vux-1px-r 右边框
* vux-1px-t 上边框
* vux-1px-b 下边框
* vux-1px-tb 上下边框
* vux-1px 全边框
* vux-close 关闭图标主要应用于弹窗(dialog)关闭按钮以及弹窗(popup)头部的关闭按钮。
*/
@import '~vux/src/styles/1px.less'; /*no*/
@import '~vux/src/styles/close.less'; /*no*/

/* icon size设置 */
.icon {
  font-size: 20px /*px*/;
}

.icon-login {
  font-size: 17px;
}

// tab切换页icon设置
.tab_icon {
  font-size: 25px /*px*/;
}

// tab切换页字体设置
.tab_font {
  font-size: 12px /*px*/;
}

// 信息图标icon设置
.info_icon {
  font-size: 20px /*px*/;
}

// 编辑图标icon设置
.iconbianji {
  font-size: 17.5px /*px*/;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f8f8f8;
}

// Picker组件样式修改
.scroller-component {
  display: block;
  position: relative;
  height: 238px !important;
  overflow: hidden;
  width: 100%;
}

.scroller-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
}

.scroller-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  z-index: 3;
  transform: translateZ(0px) !important;
  background-image: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.6)
    ),
    -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)) !important;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)),
    linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)) !important;
  background-position: top, bottom;
  background-size: 100% 102px !important;
  background-repeat: no-repeat;
}

.scroller-item {
  text-align: center;
  font-size: 16px !important;
  height: 34px !important;
  line-height: 34px !important;
  color: #000;
}

.scroller-indicator {
  width: 100%;
  height: 34px !important;
  position: absolute;
  left: 0;
  top: 102px !important;
  z-index: 3;
  background-image: -webkit-linear-gradient(top, #d0d0d0, #d0d0d0, transparent, transparent),
    -webkit-linear-gradient(bottom, #d0d0d0, #d0d0d0, transparent, transparent) !important;
  background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
    linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent) !important;
  background-position: top, bottom !important;
  background-size: 100% 1px !important;
  background-repeat: no-repeat;
}

.scroller-item {
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 上拉刷新下拉加载
._v-container > ._v-content > .loading-layer .spinner-holder .text,
._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder .text {
  font-size: 10px !important;
}
._v-container > ._v-content > .loading-layer {
  font-size: 12px !important;
}

// 搜索组件样式
.weui-search-bar {
  padding: 8px 12px !important;
}
.weui-search-bar:before {
  border-top: 0 !important;
}
.weui-icon-search {
  font-size: 15px !important;
}
.weui-search-bar__label span {
  font-size: 15px !important;
}
.weui-search-bar__box {
  border-radius: 17.5px !important;
  padding-top: 1px;
  padding-bottom: 2px;
}
.weui-search-bar__box .weui-icon-search {
  top: inherit !important;
}
.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn {
  display: flex !important;
  align-items: center;
  font-size: 13px !important;
  /*! autoprefixer: off */
  display: -webkit-flex !important;
  -webkit-align-items: center;
  /* autoprefixer: on */
}
.weui-search-bar__box .weui-search-bar__input {
  font-size: 14px !important;
  color: #2c3e50;
}
.weui-search-bar__box .weui-search-bar__input::-moz-placeholder {
  font-size: 14px !important;
}

.weui-search-bar__box .weui-search-bar__input::-webkit-input-placeholder {
  color: #b2b2b2;
}
.weui-search-bar__box .weui-search-bar__input:-moz-placeholder {
  color: #b2b2b2;
}
.weui-search-bar__box .weui-search-bar__input::-moz-placeholder {
  color: #b2b2b2;
}
.weui-search-bar__box .weui-search-bar__input:-ms-input-placeholder {
  color: #b2b2b2;
}

.weui-search-bar__label {
  display: flex;
  top: 1px !important;
  bottom: 2px !important;
  align-items: center;
  justify-content: center;
  /*! autoprefixer: off */
  -webkit-justify-content: center;
  -webkit-align-items: center;
  display: -webkit-flex;
  /* autoprefixer: on */
}
.vue-waterfall-easy-container .vue-waterfall-easy .over {
  font-size: 13px !important;
}

.weui-icon_toast.weui-loading {
  margin: 0.4rem 0 0;
}
.weui-toast__content {
  margin: 0 0 0.4rem;
}
.weui-toast {
  width: 3rem;
  top: 5.8rem;
}

.vux-tab-container {
  height: 47px !important;
}
.vux-tab {
  height: 47px !important;
}
.tab_swit {
  height: 47px !important;
}

.weui-dialog {
  max-width: 8rem !important;
}
</style>
