Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#f60",
    list: [
      {
        "text": "核销管理",
        "iconPath": "/images/iconTab/icon_WriteOff.png",
        "selectedIconPath": "/images/iconTab/icon_WriteOff_HL.png",
        "pagePath": "/pages/index/index"
      },
      {
        "text": "自主接单",
        "iconPath": "/images/iconTab/icon_Receipt.png",
        "selectedIconPath": "/images/iconTab/icon_Receipt_HL.png",
        "pagePath": "/pages/order/order"
      },
      {
        "text": "订单中心",
        "iconPath": "/images/iconTab/icon_Order.png",
        "selectedIconPath": "/images/iconTab/icon_Order_HL.png",
        "pagePath": "/pages/order/order"
      }
      ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})