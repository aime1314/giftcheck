//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  tete:function(){
    console.info('yyyyyy');
    wx.requestSubscribeMessage({
      tmplIds: ['TLsI2LgfSQVcbAiiPaKEMxnFNlNYzmFvw9J4NFWtQWw'],
      success(res) {
        console.info(res);
       },
       fail(res){
         console.info('eroor');
         console.info(res);
       }
    })
  },
  tete2: function (e){
    console.info(e);
  }
})
