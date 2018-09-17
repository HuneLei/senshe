// 用于移动设备的公共方法
/* eslint-disable */
// 判断当前的运行平台
const judgePlatform = () => {
  switch (plus.os.name) {
    case "Android":
      // Android平台: plus.android.*
      break;
    case "iOS":
      // iOS平台: plus.ios.*
      break;
    default:
      // 其它平台
      break;
  }
}

var lfs = null;// 保留上次选择图片列表
const galleryImgsSelected = () => {
  if (!window.plus) return
  // 从相册中选择图片
  console.log('从相册中选择多张图片(限定最多选择3张)：');
  plus.gallery.pick(function (e) {
    lfs = e.files;
    for (var i in e.files) {
      console.log('e.files[i]', e.files[i])
    }
  }, function (e) {
    console.log('取消选择图片');
  }, {
      filter: 'image', multiple: true, maximum: 3, selected: lfs, system: false, onmaxed: function () {
        plus.nativeUI.alert('最多只能选择3张图片');
      }
    });// 最多选择3张图片
}

// 通过定位模块获取位置信息
const getGeocode = (callBack) => {
  if (!window.plus) return
  plus.geolocation.getCurrentPosition(function (position) {
    callBack(position.addresses, null);
  }, function (e) {
    console.log('eeeeeee', e)
    callBack('', e.message);
  }, { geocode: true });
}

export default {
  getGeocode,
  judgePlatform,
  galleryImgsSelected,
};