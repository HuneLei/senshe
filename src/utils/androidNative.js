/**
 * 用于安卓设备的NJS代码
 */


// Android平台导入Intent类
var Intent = plus.android.importClass("android.content.Intent");

// 创建Intent的实例对象
var intent = new Intent();

/**
 * 在Android平台通过NJS显示系统提示框
 */
function njsAlertForAndroid() {
  // 导入AlertDialog类
  var AlertDialog = plus.android.importClass("android.app.AlertDialog");
  // 创建提示框构造对象，构造函数需要提供程序全局环境对象，通过plus.android.runtimeMainActivity()方法获取
  var dlg = new AlertDialog.Builder(plus.android.runtimeMainActivity());
  // 设置提示框标题
  dlg.setTitle("自定义标题");
  // 设置提示框内容
  dlg.setMessage("使用NJS的原生弹出框，可自定义弹出框的标题、按钮");
  // 设置提示框按钮
  dlg.setPositiveButton("确定(或者其他字符)", null);
  // 显示提示框
  dlg.show();
}
//...