// pages/coupon/surecoupon.js
const app = getApp();
const commRequest = require('../../utils/request.js');
const utils = require('../../utils/util.js');
Page({
  onShareAppMessage() {
    return {
      title: '核销管理',
      path: '/pages/coupon/surecoupon'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    showdailog: false,
    verifiInfo: {},
    statusText: '',
    tabBartype: 1,
    receiptNum: '1',
    source: '',
    verifiDate: '',
    showNum: '',
    isCpn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let current = this;
    let verifiCode = options.verifiCode;
    let source = options.source;
    commRequest.requestPost("/verifi/getCodeInfo", {
      code: verifiCode
    }, (res) => {
      console.info(res);
      if (res.data.code === 100) {
        let verifiInfo = res.data.result;
        let isCpn = /_cpn$/.test(verifiInfo.serviceType);
        current.setData({
          verifiInfo: verifiInfo,
          source: source,
          isCpn: isCpn
        });
        current.getStatusText(res.data.result.varStatus);
        current.getDiscountNum(verifiInfo.giftType, verifiInfo.giftPeopleNum);
      } else {
        wx.navigateBack()
        wx.showToast({
          title: '核销信息请求出错,' + res.data.msg,
          icon: 'none',
          duration: 4000
        })

      }
    });
  },

  sureCoupon: function(e) {
    let {
      verifiInfo,
      isCpn
    } = this.data;
    const formId = e.detail.formId;
    console.info(formId);
    let wxcode = wx.getStorageSync(app.globalData.WXCODE_SEESION_NAME);
    let that = this;
    wx.showModal({
      title: '确认核销' + verifiInfo.varCode + '核销码吗?',
      success: (modelRes) => {
        if (modelRes.confirm) {
          commRequest.requestPost("/verifi/singleVerifi", {
            code: verifiInfo.varCode,
            orderId: verifiInfo.id
          }, (res) => {
            console.info(res);
            if (res.data.code === 100) {
              let date = utils.formatTime(new Date());
              this.setData({
                showdailog: true,
                verifiDate: date
              })
              let mealName;
              if (isCpn) {
                mealName = verifiInfo.shopItemName;
              } else {
                mealName = !!verifiInfo.shopItemName ? verifiInfo.giftTypeName + "(" + verifiInfo.shopItemName + ")" : verifiInfo.giftTypeName;
              }
              let param = {
                "orderId": verifiInfo.id,
                "successTime": date,
                "mealName": mealName,
                "code": verifiInfo.varCode,
                "amount": verifiInfo.shopAmount+"元",
                "phone": verifiInfo.giftPhone,
                "remark": verifiInfo.reservRemark,
                "firstData": "核销成功通知",
                "wxcode": wxcode,
                "formId": formId
              };
              commRequest.requestPost("/sendWxMsg/writeOffSuccessAPP", param, (res) => {
                console.info(res);
              });
            } else {
              wx.showToast({
                title: '核销出错,' + res.data.msg,
                icon: 'none',
                duration: 2000
              })
              this.gotoindex(3000)
            }
          });
        }
      },
      fail: () => {
        this.gotoindex(1000)
      }
    })
  },

  gotoindex:function(time){
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/index/index'
      }, time)
    })
  },
  
  gotopage: function(event) {
    if (event.currentTarget.dataset.key == 1) {
      // commontab.showtabpage(1)
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else if (event.currentTarget.dataset.key == 2) {
      wx.switchTab({
        url: '/pages/receipt/receipt'
      })
    } else if (event.currentTarget.dataset.key == 3) {
      wx.switchTab({
        url: '/pages/order/order'
      })
    }
  },
  closeCoupon: function() {
    this.setData({
      showdailog: false
    })
    let source = this.data.source;
    let url = '/pages/index/index'
    if (source === 'input') {
      wx.navigateTo({
        url: '/pages/coupon/coupon',
      })
    } else {
      wx.switchTab({
        url: url
      })
    }

  },

  getStatusText: function(status) {
    let text = "";
    if ((this.data.isCpn && status == 1) || (!this.data.isCpn && status == 0)) {
      text = "未使用";
      this.setData({
        statusText: text
      });
    } else {
      wx.navigateBack()
      wx.showToast({
        title: '当前核销码状态不能核销',
        icon: 'none',
        duration: 4000
      })
    }
  },
  getDiscountNum: function(giftType, bookNum) {
    //当预约人数超出减免人数时赋值 showNum
    let showNum = '';
    if (giftType === '2F1' || giftType === '3F1' || giftType === 'D5') {
      showNum = '1';
    } else if (giftType === 'F1' && bookNum > 1 || giftType === 'F2' && bookNum > 2) {
      showNum = '2';
    }
    this.setData({
      showNum: showNum
    });
  }
})