// 用于移动设备的公共方法

// 判断当前的运行平台
function judgePlatform(){
  switch ( plus.os.name ) {
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