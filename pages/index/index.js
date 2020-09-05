//index.js
const commRequest = require('../../utils/request.js');
const util = require('../../utils/util.js');
const app = getApp();
Page({
  onShareAppMessage() {
    return {
      title: '核销管理',
      path: '/pages/index/index'
    }
  },
  data: {
    shopInfo: {}
  },
  onLoad: function() {
    let t = this;
    wx.getStorage({
      key: 'shopInfo',
      success(res) {
        t.setData({
          shopInfo: res.data
        });
      }
    });
    let OrderCount = this.OrderCount;
    commRequest.requestPost("/confirm/getOrderCount", {}, OrderCount);

  },
  OrderCount: function(res) {
    console.log(res)
    wx.setStorageSync(app.globalData.receiptNum, res.data.result.confirmCount + "");
    if (res.data.result.confirmCount != 0) {
      wx.setTabBarBadge({
        index: 1,
        text: res.data.result.confirmCount + ""
      });
    }else{
      wx.removeTabBarBadge({
        index: 1,
      })
    }
  },
  scanCode: function() {
    util.scanCode();
  },
  jump: function(e) {
    wx.navigateTo({
      url: e.target.dataset.url,
    })
  }
})