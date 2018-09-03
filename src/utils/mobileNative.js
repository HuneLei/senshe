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
const getGeocode = () => {
  if (!window.plus) return
  plus.geolocation.getCurrentPosition(geoInf, function (e) {
    console.log("获取定位位置信息失败：" + e.message);
  }, { geocode: true });
}

const geoInf = (position) => {
  var str = "";
  str += "地址：" + position.addresses + "\n";//获取地址信息
  str += "坐标类型：" + position.coordsType + "\n";
  var timeflag = position.timestamp;//获取到地理位置信息的时间戳；一个毫秒数；
  str += "时间戳：" + timeflag + "\n";
  var codns = position.coords;//获取地理坐标信息；
  var lat = codns.latitude;//获取到当前位置的纬度；
  str += "纬度：" + lat + "\n";
  var longt = codns.longitude;//获取到当前位置的经度
  str += "经度：" + longt + "\n";
  var alt = codns.altitude;//获取到当前位置的海拔信息；
  str += "海拔：" + alt + "\n";
  var accu = codns.accuracy;//地理坐标信息精确度信息；
  str += "精确度：" + accu + "\n";
  var altAcc = codns.altitudeAccuracy;//获取海拔信息的精确度；
  str += "海拔精确度：" + altAcc + "\n";
  var head = codns.heading;//获取设备的移动方向；
  str += "移动方向：" + head + "\n";
  var sped = codns.speed;//获取设备的移动速度；
  str += "移动速度：" + sped;
  console.log(JSON.stringify(position));
  console.log(str);
}


export default {
  getGeocode,
  judgePlatform,
  galleryImgsSelected,
};