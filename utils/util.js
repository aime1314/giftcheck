const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getCurrentPageUrlWithArgs = data => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route
  const options = currentPage.options
  let urlWithArgs = `/${url}?`
  for (let key in options) {
    const value = options[key]
    urlWithArgs += `${key}=${value}&`
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  console.log(urlWithArgs)
  return urlWithArgs
}
/**
 * 扫码
 */
const scanCode=()=> {
  wx.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log("扫码结果");
      console.log(res);
      if (/^[0-9]+$/.test(res.result)){
        wx.navigateTo({
          url: '/pages/coupon/surecoupon?source=scan&verifiCode=' + res.result,
        })
      }else{
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/index/index'
          }, 3000)
        })
      }
      
    },
    fail: (res) => {
      console.log(res)
      // wx.showToast({
      //   title: '扫码失败',
      //   icon: 'none',
      //   duration: 2000
      // })
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  getCurrentPageUrlWithArgs:getCurrentPageUrlWithArgs,
  scanCode: scanCode
}
