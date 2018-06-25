import config from './config'

export function get (url) {
  return new Promise((resolve, reject) => {
    wx.request({
      // data,
      url: config.host + url,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
