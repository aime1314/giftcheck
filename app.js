//app.js
// import 'umtrack-wx';

App({
  globalData: {
    userInfo: null,
    host: 'https://e.colourfulchina.com/qiongqi',
    // host: 'https://bigan.icolourful.cn/qiongqi',
    TOKEN_SEESION_NAME:"token",
    SHOPINFO_SEESION_NAME:"shopInfo",
    WXCODE_SEESION_NAME:'wxcode',
    receiptNum: "0"
  },
  onLaunch: function () {
    this.setUnreadMessage();
  },
  //未读消息条数
  setUnreadMessage:function(){
    wx.setTabBarBadge({//这个方法的意思是，为小程序某一项的tabbar右上角添加文本
      index: 1,   //代表哪个tabbar（从0开始）
      text: null   //显示的内容
    })
  },
  // umengConfig: {
  //   appKey: '5e71c60b978eea0774044d5c', //由友盟分配的APP_KEY
  //   // 是否使用openid进行统计，此项为false时将使用友盟+随机ID进行用户统计。
  //   // 使用openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用OpenID。
  //   useOpenid: false,
  //   autoGetOpenid: false, // 是否需要通过友盟后台获取openid，如若需要，请到友盟后台设置appId及secret
  //   debug: true //是否打开调试模式
  // }
})