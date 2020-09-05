// pages/receipt/receipt.js
const commRequest = require('../../utils/request.js');
Page({
  onShareAppMessage() {
    return {
      title: '自主接单',
      path: '/pages/receipt/receipt'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
      receiptList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  setReceiptList: function (res){
    if(res.data.result.length > 0 ){
      wx.setTabBarBadge({
        index: 1,
        text: res.data.result.length + ""
      });
    }else{
      wx.removeTabBarBadge({
        index: 1,
      })
    }
    this.setData({
      receiptList: res.data.result
    }, function () {
      // this is setData callback
    })
  },
  couponOk: function (e){//点击确定
    let onAccept = this.onAccept;
    console.log(e)
    wx.showModal({
      title: '接受订单',
      content: '是否接受此订单？',
      cancelColor:'#666',
      confirmColor:'#f60',
      success(res) {
        if (res.confirm) {
          var data ={};
          data.orderId = e.currentTarget.id;
          data.dataSource = e.currentTarget.dataset.datasource;
          commRequest.requestPost("/confirm/accept", data, onAccept);
          
        } else if (res.cancel) {

        }
      }
    })
  },
  //回调方法
  onAccept: function(res){
    if (res.data.code == 100){
      wx.showToast({
        title: '接受成功',
        icon: 'success',
        duration: 1000
      })
      let setReceiptList = this.setReceiptList;
      commRequest.requestPost("/confirm/getConfimOrderList", {}, setReceiptList);
    }
    if (res.data.code == 200) {
      wx.showToast({
        title: '接受失败',
        icon: 'none',
        duration: 1000
      })
    }
  },
  couponRefruse: function (e) {
    console.log(e)
    var orderId = e.currentTarget.id;
     var dataSource = e.currentTarget.dataset.datasource;
    wx.navigateTo({
      url: '../receipt/refuse/refuse?orderId=' + orderId +'&dataSource='+dataSource,
    })
  },
  //搜索
  searchList: function(e){
    console.log(e)
    let setReceiptList = this.setReceiptList;
    commRequest.requestPost("/confirm/getConfimOrderList", { "seachInfo": e.detail.value}, setReceiptList);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let setReceiptList = this.setReceiptList;
    commRequest.requestPost("/confirm/getConfimOrderList", {}, setReceiptList);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})