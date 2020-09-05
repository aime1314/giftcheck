//发送请求
const app = getApp();
const requestPost = (url, data, success) =>{
  let current = this
  let token = wx.getStorageSync(app.globalData.TOKEN_SEESION_NAME)
  wx.request({
    url: app.globalData.host+url,
    data: data,
    method: "post",
    header: {
      "accept": "application/json",
      "X-REQUESTED-SO-V-TOKEN": token,
      "X-REQUESTED-SO-V-TYPE":2
    },
    dataType: 'json',
    success: (res)=>{
      //检测token 过期跳转
      if (res.data.status == 500 && !/user\/wxlogin/.test(url)){
        cleanLoginStorage();
      }else{
        success(res);
      }
    },
    fail: function (res) { 
      wx.showToast({
        title: '请求失败',
        icon:'none',
        duration:2000
      })
    },
    complete: function (res) { },
  })
}
/**
   * 清空登录storage 跳转到登录页
   */
const cleanLoginStorage = () => {
  wx.removeStorageSync(app.globalData.WXCODE_SEESION_NAME);
  wx.removeStorageSync(app.globalData.TOKEN_SEESION_NAME);
  wx.removeStorageSync(app.globalData.SHOPINFO_SEESION_NAME);
  wx.reLaunch({
    url:'/pages/login/login'
  });
}

module.exports = {
  requestPost: requestPost,
  cleanLoginStorage: cleanLoginStorage
}
