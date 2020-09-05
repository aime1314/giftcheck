// pages/setting/setting.js
const app = getApp();
const commRequest = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 退出登陆 清空storage
   */
  loginOut:function(){
    let wxcode = wx.getStorageSync(app.globalData.WXCODE_SEESION_NAME);
    commRequest.requestPost('/user/logout', { code: wxcode},(res)=>{
      if(res.data.code===100){
        wx.removeStorageSync(app.globalData.WXCODE_SEESION_NAME);
        wx.removeStorageSync(app.globalData.TOKEN_SEESION_NAME);
        wx.removeStorageSync(app.globalData.SHOPINFO_SEESION_NAME);
        wx.reLaunch({
          url: '/pages/login/login'
        })
        wx.showToast({
          title: '操作成功',
          icon:'success',
          duration:2000
        })
      }else{
        console.info(res);
        wx.showToast({
          title: '操作失败,'+res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    });
  }
})