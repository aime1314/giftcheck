var commontab = require('../../common/common.js')
var commontab1 = require('../../utils/util.js')
const commRequest = require('../../utils/request.js');
Page({
  onShareAppMessage() {
    return {
      title: '核销管理',
      path: '/pages/coupon/coupon'
    }
  },
  data:{
    mycoupon:'',
    mycouponTip: '请输入核销码',
    mycouponTipFlag:true,
    // realymycoupon:'123456789012',
    tabBartype:1,
    receiptNum:'0'
  },
  onLoad: function (options) {
    commontab.showtabpage()
    commontab1.getCurrentPageUrlWithArgs()
    let OrderCount = this.OrderCount;
    commRequest.requestPost("/confirm/getOrderCount", {}, OrderCount);

  },
  OrderCount: function (res) {
    this.setData({
      receiptNum: res.data.result.confirmCount + ""
    })
  },
  scanCode: function () {
    commontab1.scanCode();
  },
  inputCouponword:function(e) {
    this.data.mycoupon = this.data.mycoupon + e.currentTarget.dataset.key;
    this.setData({
      mycoupon: this.data.mycoupon,
      mycouponTipFlag:false
    });
    if (this.data.mycoupon.length > 12){
      // wx.showModal({
      //   title: "提示",
      //   content: "核销码输入有误",
      // })
      var newmyCoupon = this.data.mycoupon.substr(0, 12);
      this.setData({
        mycoupon: newmyCoupon,
      });
    }
    
  },
  gotopage: function (event) {
    if(event.currentTarget.dataset.key == 1){
      // commontab.showtabpage(1)
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else if (event.currentTarget.dataset.key == 2){
      wx.switchTab({
        url: '/pages/receipt/receipt'
      })
    } else if (event.currentTarget.dataset.key == 3){
      wx.switchTab({
        url: '/pages/order/order'
      })
    }
  },
  showcouponMsg:function(){
    let verifiCode = this.data.mycoupon;
    //verifiCode.length == 12 && this.data.realymycoupon == verifiCode 测试暂时去掉
    if (verifiCode) {
      wx.navigateTo({
        url: 'surecoupon?source=input&verifiCode=' + verifiCode,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx.showModal({
        title: "提示",
        content: "核销码输入有误",
      })
    } 
    this.setData({
      mycoupon: '',
      mycouponTipFlag: true
    });
  },
  clearCoupon:function() {
    var index = this.data.mycoupon.length;
    if (index > 0) {
      var newmyCoupon = this.data.mycoupon.substr(0, index - 1);
      this.setData({
        mycoupon: newmyCoupon
      });
    }else{
      this.setData({
        mycoupon: '',
        mycouponTipFlag: true
      });
    }
  }

})