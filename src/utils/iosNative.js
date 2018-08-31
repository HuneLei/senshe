/**
 * 用于ios设备的NJS代码
 */

// iOS平台导入NSNotificationCenter类
var NSNotificationCenter = plus.ios.importClass("NSNotificationCenter");

// iOS平台导入NSDictionary类
var NSDictionary = plus.ios.importClass("NSDictionary");
// 创建NSDictionary的实例对象
var ns = new NSDictionary()

/**
 * 在iOS平台通过NJS显示系统提示框
 */
function njsAlertForiOS() {
  // 导入UIAlertView类
  var UIAlertView = plus.ios.importClass("UIAlertView");
  // 创建UIAlertView类的实例对象
  var view = new UIAlertView();
  // 设置提示对话上的内容
  view.initWithTitlemessagedelegatecancelButtonTitleotherButtonTitles("自定义标题" // 提示框标题
    , "使用NJS的原生弹出框，可自定义弹出框的标题、按钮" // 提示框上显示的内容
    , null // 操作提示框后的通知代理对象，暂不设置
    , "确定(或者其他字符)" // 提示框上取消按钮的文字
    , null); // 提示框上其它按钮的文字，设置为null表示不显示
  // 调用show方法显示提示对话框，在JS中使用()语法调用对象的方法
  view.show();
}