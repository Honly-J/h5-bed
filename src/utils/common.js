export function isWXBrowser () {
  return navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
}

export function isIOS () {
  return navigator.userAgent.toLowerCase().match(/iphone|ipad/i)
}

export function getParam (key) {
  const search = location.search
  let result = {}
  if (search) {
    const paramArr = location.search.slice(1).split('&')
    paramArr.map(item => {
      result[item.slice(0, item.indexOf('='))] = item.slice(item.indexOf('=') + 1)
    })
  }
  return result[key] || ''
}
export function setHtmlFontSize (fs) {
  console.log('setHtmlFontSize' + fs)
  document.querySelector('html').style.fontSize = fs
}
export function resetHtmlFontSize (htmlFontSize) {
  /* eslint-disable */ 
  const hfs = htmlFontSize || document.querySelector('html').style.fontSize
  console.log('old font-size', hfs)
  const winHeight = window.screen.height
  const docWidth = document.documentElement.clientWidth
  const docHeight = document.documentElement.clientHeight
  const radio = parseInt(document.querySelector('html').getAttribute('data-dpr') || 1)
  const rate = docHeight / (winHeight * radio)
  const realV = docWidth / docHeight
  const statandV = 750 / 1333
  let resf = parseFloat(hfs) * rate + 'px'
  if (realV > statandV) {
    console.log('压缩的' + realV / statandV)
  } else {
    console.log('超长的' + realV / statandV)
  }
  resf = parseFloat(hfs) *  statandV / realV + 'px'
  console.log(realV, statandV, resf)
  console.log(docHeight / radio + '_' + winHeight + '_' + docHeight + '_' + docWidth + '__' + radio + '_' + rate)
  setHtmlFontSize(resf)
}
// init微信
export function share2wx () {
  console.log('share2wx')
  const wx = window.wx || ''
  const confS = window.shareConfig
  const wxConfig = window.wxConfig
  console.log('wx:', wx)
  console.log('shareConfig:', confS)
  console.log('wxConfig:', wxConfig)
  var _c = Object.assign({
    debug: false,
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: '',
    jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareWeibo' ]
  }, wxConfig)
  wx.config(_c)
  // this.getWxInfo()
  wx.ready(function () {
    // 朋友圈
    wx.onMenuShareTimeline({
      title: confS.title, // 分享标题
      link: confS.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: confS.img, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    })
    // 朋友
    wx.onMenuShareAppMessage({
      title: confS.title, // 分享标题
      desc: confS.desc, // 分享描述
      link: confS.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: confS.img, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    })
    wx.onMenuShareWeibo({
      title: confS.title, // 分享标题
      desc: confS.desc, // 分享描述
      link: confS.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: confS.img, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    })
  })
  wx.error(function (res) {
    wx.config(_c)
  })
}
