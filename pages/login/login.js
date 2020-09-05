const commRequest = require('../../utils/request.js');
const app = getApp();
Page({
  onShareAppMessage() {
    return {
      title: '登录',
      path: '/pages/login/login'
    }
  },
  data: {
    wxcode:'',
    oldCode:''
  },
  onLoad: function() {
    let current = this;
    //检查登录态是否过期。
    wx.checkSession({
      success() {
        console.info("session未过期");
        //没有过期 从缓存中读取code  获取登陆信息   静默登陆
        let wxcode = wx.getStorageSync(app.globalData.WXCODE_SEESION_NAME);
        let oldCode = '';
        let token = wx.getStorageSync(app.globalData.TOKEN_SEESION_NAME);
        let shopInfo = wx.getStorageSync(app.globalData.SHOPINFO_SEESION_NAME);
        //如果没有 重新登陆 
        if(!wxcode||!token||!shopInfo){
          wx.login({
            success(res) {
              //缓存中读取原来的code 根据返回值获取最新code  setdata
              wxcode = res.code;
              wx.setStorageSync(app.globalData.WXCODE_SEESION_NAME, wxcode);
              current.setData({
                oldCode: oldCode,
                wxcode: wxcode
              });
              current.silentLogin(wxcode, oldCode);
            }
          })
        }else{
          console.info('2222');
          current.setData({
            oldCode: oldCode,
            wxcode: wxcode
          })
          current.silentLogin(wxcode, oldCode);
        }
        
      },
      fail(){
        wx.login({
          success(res) {
           //缓存中读取原来的code 根据返回值获取最新code  setdata
            let oldCode = wx.getStorageSync(app.globalData.WXCODE_SEESION_NAME);
            let wxcode = res.code;
            wx.setStorageSync(app.globalData.WXCODE_SEESION_NAME, wxcode);
            current.setData({
              oldCode: oldCode,
              wxcode: wxcode
            })
          }
        })
      }
    })
  },
  /**
   * 静默登陆
   */
  silentLogin:function(wxcode,oldCode){
    commRequest.requestPost("/user/wxlogin", { code: wxcode,oldCode:oldCode }, (res) => {
      console.info(res);
       //300是当前openid未与用户绑定 不操作  让用户停留在登陆页登陆 
      if (res.data.code != 300) {
        this.loginSuccess(res);
      }
    });
  },
  /**
   * 登陆回调
   */
  loginSuccess: function(res) {
    if (res.data.code === 100) {
      let globalData = app.globalData;
      wx.setStorageSync(globalData.TOKEN_SEESION_NAME, res.data.msg);
      wx.setStorageSync(globalData.SHOPINFO_SEESION_NAME, res.data.result);
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.showToast({
        title: "登陆失败,"+res.data.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 登陆
   */
  merchantLogin: function(e) {
    let loginSuccess = this.loginSuccess;
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    let code = this.data.wxcode;
    let oldCode = this.data.oldCode;
    let flag = this.valid(username,"用户名不能为空!!!");
    if(!flag){
      return;
    }
    flag = this.valid(password, "密码不能为空!!!");
    if (!flag) {
      return;
    }
    let data = {
      type: 'account',
      username:username,
      password:password,
      code:code,
      oldCode:oldCode
    };
    commRequest.requestPost("/user/login", data, loginSuccess);
  },
  /**
   * 非空校验
   */
  valid:function(param,errMsg){
    if (!param) {
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 2000
      });
      
    }
    return !!param;
  }
})