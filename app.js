//app.js
var config = require('./config.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code){
          wx.request({
            method:'POST',
            url: config.service.loginUrl,
            data: {
              code:res.code
            },
            success: res=>{
              console.log(res)
              //将服务器返回的session存储到本地
              wx.setStorageSync('session', res.code)
            },
            fail: err=>{
              console.log(errres)
            }
          })
        }else{
          console.log('获取用户信息失败')
        } 
      },
      fail: err=>{
        console.log(err)
      },
      complete: ()=>{
        console.log('执行完毕')
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})