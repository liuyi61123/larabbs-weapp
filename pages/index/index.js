//index.js
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
  },
  //事件处理函数
  bindViewTap: function () {
   //上传图片
    wx.chooseImage({
      count: 1,
      success: res=> {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          header: {
            'Authorization': app.globalData.token
          },
          url: app.globalData.config.service.imageUrl, 
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            'type': 'avatar'
          },
          success: res=> {
            this.setData({
              "userInfo.avatar": JSON.parse(res.data).path
            })
            console.log(res.data)
          },
          fail:err=>{
            console.log(err)
          }
        })
      }
    })
  }
})
