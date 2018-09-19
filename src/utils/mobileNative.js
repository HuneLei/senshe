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
const galleryImgsSelected = (callBack) => {
  if (!window.plus) return
  // 从相册中选择图片
  console.log('从相册中选择多张图片(限定最多选择3张)：');
  plus.gallery.pick(function (e) {
    lfs = e.files;
    callBack(e)
    // for (var i in e.files) {
    //   console.log('e.files[i]', e.files[i])
    // }
  }, function (error) {
    console.log('error', error)
    console.log('取消选择图片');
  }, {
      filter: 'image', multiple: true, system: false, onmaxed: function () {
        plus.nativeUI.alert('最多只能选择3张图片');
      }
    });// 最多选择3张图片
}

// 创建上传任务
const createUpload = () => {
  var task = plus.uploader.createUpload("http://www.test.com/upload.do",
    { method: "POST", blocksize: 204800, priority: 100 },
    function (t, status) {
      // 上传完成
      if (status == 200) {
        alert("Upload success: " + t.url);
      } else {
        alert("Upload failed: " + status);
      }
    }
  );
  task.addFile("_www/a.doc", { key: "testdoc" });
  task.addData("string_key", "string_value");
  //task.addEventListener( "statechanged", onStateChanged, false );
  task.start();
}

// 通过定位模块获取位置信息
const getGeocode = (callBack) => {
  if (!window.plus) return
  plus.geolocation.getCurrentPosition(function (position) {
    callBack(position.addresses, null);
  }, function (e) {
    callBack('', e.message);
  }, { geocode: true });
}

export default {
  getGeocode,
  judgePlatform,
  galleryImgsSelected,
};