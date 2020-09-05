const commRequest = require('../../utils/request.js');
const app = getApp();
const append = 'append';
Page({
  onShareAppMessage() {
    return {
      title: '订单中心',
      path: '/pages/order/order'
    }
  },
  data: {
    currentTab: 0,
    tiptext: '手机号和订单号',
    verifiOrderList: {},
    refuseOrderList: {},
    historyOrderList: {},
    totalPages: 0,
    currentPage: 1,
    isLoading: true,
    seachInfo: '',
    size:10,
    isCpn:false
  },
  //seachInfo  搜索
  onLoad: function() {
    // this.getVerifiOrderList({});
    // let shopInfo = wx.getStorageSync(app.globalData.SHOPINFO_SEESION_NAME);
    // if (shopInfo.shopType ==='coupon'){
    //     this.setData({
    //       isCpn:true
    //     });
    // }
  },
  onShow:function(){
    this.getVerifiOrderList({});
    let shopInfo = wx.getStorageSync(app.globalData.SHOPINFO_SEESION_NAME);
    if (shopInfo.shopType === 'coupon') {
      this.setData({
        isCpn: true,
      });
    }
    this.tabindex(0)
  },
  clickTab: function(e) {
    const index = e.target.dataset.current;
    this.tabindex(index);
  },
  tabindex: function (index){
    var that = this;
    if (this.data.currentTab === index) {
      return false;
    } else {
      switch (index) {
        case '0':
          that.getVerifiOrderList({});
          that.setData({
            tiptext: '手机号和订单号',
            seachInfo: '',
            totalPages: 0,
            currentPage: 1,
            isLoading: true
          });
          break;
        case '1':
          that.getHistoryOrderList({});
          that.setData({
            tiptext: '手机号、订单号和核销码',
            seachInfo: '',
            totalPages: 0,
            currentPage: 1,
            isLoading: true
          });
          break;
        case '2':
          that.setData({
            tiptext: '手机号和订单号',
            seachInfo: '',
            totalPages: 0,
            currentPage: 1,
            isLoading: true
          });
          that.getRefuseOrderList({});
          break;
        default:
      }
      that.setData({
        currentTab: index,
      })
    }
  },
  search: function(e) {
    this.setValue(e);
    let value = e.detail.value;
    console.info(value);
    let {
      currentTab
    } = this.data;
    let data = {
      seachInfo: value
    };
    if (currentTab == 0) {
      this.getVerifiOrderList(data);
    } else if (currentTab == 1) {
      this.getHistoryOrderList(data);
    } else if (currentTab == 2) {
      this.getRefuseOrderList(data);
    }
  },
  getVerifiOrderList: function(param) {
    let current = this;
    commRequest.requestPost("/verifi/verification", param, (res) => {
      let data = current.fallback(res);
      current.setData({
        verifiOrderList: data
      });

    });
  },
  getRefuseOrderList: function (param, type) {
    let current = this;
    commRequest.requestPost("/refuse/getRefuseOrderList", param, (res) => {
      let data = current.fallback(res);
      if (!!type && type == append) {
        data = [...current.data.refuseOrderList, ...data];
      }
      current.setData({
        refuseOrderList: data,
        isLoading: false,
        totalPages: res.data.result.total,
        currentPage: res.data.result.current
      });
    });
  },
  getHistoryOrderList: function(param,type) {
    let current = this;
    commRequest.requestPost("/history/getHistoryOrderList", param, (res) => {
      let data = current.fallback(res);
      if (!!type && type == append){
        data = [...current.data.historyOrderList,...data];
      }
      current.setData({
        historyOrderList: data,
        isLoading: false,
        totalPages: res.data.result.total,
        currentPage: res.data.result.current
      });

    });
  },
  fallback: function(res) {
    let data;
    if (res.data.code === 100) {
      data = res.data.result.records
    } else {
      wx.showToast({
        title: '获取列表信息异常' + res.data.msg,
        icon: "none"
      })
      data = {};
    }
    return data;
  },
  /**
   * 页面下拉到底事件
   */
  onReachBottom() {
    let { currentPage, totalPages, isLoading, currentTab, size, seachInfo } = this.data

    if (currentPage >= totalPages || isLoading) {
      return;
    }

    this.setData({
      isLoading: true
    })

    currentPage = currentPage + 1;
    let data = {
      seachInfo: seachInfo,
      current: currentPage,
      pageNo: currentPage,
      pageSize: size,
      size: size
    };
    if (currentTab==1){
      this.getHistoryOrderList(data, append);
    } else if (currentTab == 2){
      this.getRefuseOrderList(data, append);
    }
  },
  /**
   * 监听输入框输入
   */
  setValue:function(e){
    this.setData({
      seachInfo: e.detail.value
    });
  },
})