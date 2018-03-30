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
              this.globalData.token = res.data.token_type + ' ' + res.data.access_token
              this.globalData.expiration = (res.data.expires_in*1000) + Date.parse(new Date())//设置token过期时间
              // 获取用户信息
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    this.getUserInfo();
                  } else {
                    //获取用户授权
                    wx.authorize({
                      scope: 'scope.userInfo',
                      success: res => {
                        this.getUserInfo();
                      },
                      fail: err => {
                        //用户不同意
                      }
                    })
                  }
                }
              })
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
  //获取用户信息
  getUserInfo: function () {
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        // 可以将 userInfo 发送给后台
        this.request({
          needAuth:true,
          header: {
            'Authorization': this.globalData.token
          },
          method: 'POST',
          url: config.service.userInfoUrl,
          data: res,
          success: res => {
            console.log(res)
            this.globalData.userInfo = res.data
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },
  //自己封装的request组件
  request:function(data){
    //先判断是否需要用户认证，再判断token是否过期
    if(data.needAuth || false){
      if (this.expiration < Date.parse(new Date())){
        //token过期了，先刷新token
        this.refreshToken()
      } 
    } 
    wx.request({
      header: data.header ||{},
      method: data.method,
      url: data.url,
      data: data.data || {},
      success: data.success,
      fail: data.fail || {}
    })
  },
  globalData: {
    config:config,
    userInfo: null,
    token: '',//token
    expiration:''//token过期时间
  }
})