// pages/setting/password.wxml.js
const commRequest = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  loginSuccess: function (res) {
    if (res.data.code === 100) {
      wx.navigateTo({
        url: '/pages/setting/setting',
      })
      wx.showToast({
        title: res.data.msg,
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000
      })
    } 
  },
  formSubmit:function(e){
    let value = e.detail.value;
    if (value.newpwd != value.newpwdCheck){
      wx.showToast({
        title: '两次输入的密码不一致，请重新输入！！！',
        icon: 'none',
        duration: 2000
      })
    }
    commRequest.requestPost("/account/changePassword", value, this.loginSuccess);
  }
})