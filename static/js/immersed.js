//取消浏览器的所有事件，使得active的样式在手机上正常生效
document.addEventListener('touchstart', function () {
  return false;
}, true);
// 禁止鼠标右键选择
document.oncontextmenu = function () {
  return false;
};
// H5 plus事件处理
var as = 'pop-in';// 默认窗口动画
function plusReady() {
  // 隐藏滚动条
  plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' });
  // Android处理返回键
  plus.key.addEventListener('backbutton', function () {
    if (window.location.hash !== '#/login') {
      window.history.back()
    } else {
      ('iOS' == plus.os.name) ? plus.nativeUI.confirm('确认退出？', function (e) {
        if (e.index > 0) {
          plus.runtime.quit();
        }
      }, '', ['取消', '确定']) : (confirm('确认退出？') && plus.runtime.quit());
    }
  }, false);
  compatibleAdjust();
}

if (window.plus) {
  plusReady();
} else {
  document.addEventListener('plusready', plusReady, false);
}

// DOMContentLoaded事件处理
var _domReady = false;
document.addEventListener('DOMContentLoaded', function () {
  _domReady = true;
  compatibleAdjust();
}, false);

// 兼容性样式调整
var _adjust = false;
function compatibleAdjust() {
  if (_adjust || !window.plus || !_domReady) {
    return;
  }
  _adjust = true;
  // 关闭启动界面
  setTimeout(function () {
    plus.navigator.closeSplashscreen();
  }, 200);
}