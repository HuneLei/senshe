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
  font-size: 15px /*px*/;
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


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f8f8f8;
}
</style>
