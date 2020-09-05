const commRequest = require('../../../utils/request.js');
Page({
  onShareAppMessage() {
    return {
      title: '拒绝订单',
      path: '/pages/receipt/refuse/refuse'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 最大字符数
    maxTextLen: 50,
    // 当前文本长度
    textLen: 0,
    // 文本内容
    contentStr: "",
    isChoose2:false,
    isChoose1:false,
    orderId:null,
    dataSource:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
      dataSource: options.dataSource,
    })
  },
  getWords(e) {
    let page = this;
    // 设置最大字符串长度(为-1时,则不限制)
    let maxTextLen = page.data.maxTextLen;
    // 文本长度
    let textLen = e.detail.value.length;

    this.setData({
      maxTextLen: maxTextLen,
      textLen: textLen,
      contentStr: e.detail.value
    });
  },
  otherResean: function(e){
    this.setData({
      isChoose1: false,
      isChoose2: true,
    })
  },
  fullCostmer: function (e) {
    this.setData({
      isChoose1: true,
      isChoose2: false,
    })
  },
  refuseOk:function (e){
    let returnRefuse = this.returnRefuse;
    //确认拒绝
    var data={};
    data.orderId =this.data.orderId;
    data.dataSource = this.data.dataSource;
    if(this.data.isChoose1){
      data.reason="客满拒绝";
    }else if (this.data.isChoose2) {
      if(this.data.contentStr === ''){
        wx.showToast({
          title: '请输入拒绝原因',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
      data.reason = "其他原因："+this.data.contentStr;
    }else{
      wx.showToast({
        title: '请选择原因',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    commRequest.requestPost("/confirm/refuse", data, returnRefuse);
  },
  returnRefuse: function (res){
    if (res.data.code == 100) {
      wx.showToast({
        title: '拒绝成功',
        icon: 'success',
        duration: 1000
      })
      wx.switchTab({
        url: '../../receipt/receipt',
      })
    }
    if (res.data.code == 200) {
      wx.showToast({
        title: '拒绝失败',
        icon: 'none',
        duration: 1000
      })
    }
  }
})