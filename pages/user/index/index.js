// pages/user/index/index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {
    }
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  }
})
