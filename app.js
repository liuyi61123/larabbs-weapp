//app.js
var config = require('./config.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //login
    this.login();
   
  },
  onShow:function(){
    console.log(this.globalData.token)
  },
  onError:function(msg){
    console.log(msg)
  },
  // 登录
  login:function(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            method: 'POST',
            url: config.service.loginUrl,
            data: {
              code: res.code
            },
            success: res => {
              //登录成功
              console.log(res)
              this.globalData.token = res.data.token_type + ' ' + res.data.access_token
              this.globalData.expiration = (res.data.expires_in*1000) + Date.parse(new Date())//设置token过期时间
            },
            fail: err => {
              //登录失败
              console.log(errres)
            }
          })
        } else {
          console.log('获取用户信息失败')
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  //刷新token
  refreshToken:function(){
    wx.request({
      header: {
        'Authorization': this.globalData.token
      },
      method: 'PUT',
      url: config.service.refreshTokenUrl,
      data: res,
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  //自己封装的request组件
  request:function(data){
    let header  = {}
    //先判断是否需要用户认证，再判断token是否过期
    if(data.needAuth || false){
      if (this.globalData.expiration < Date.parse(new Date())){
        //token过期了，先刷新token
        this.refreshToken()
      } 
      header = {
        'Authorization': this.globalData.token
      }
    } 
    wx.request({
      header: header,
      method: data.method,
      url: data.url,
      data: data.data || {},
      success: data.success,
      fail: data.fail || {},
      complete: data.complete || function (com) {
        wx.hideLoading()
        if (com.statusCode == 429) {
          wx.showModal({
            content: '操作频繁，请稍后再试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        } else if (com.statusCode == 401){
          //没有登录
        }
      },
    })
  },
  globalData: {
    config:config,
    token: '',//token
    expiration:''//token过期时间
  }
})