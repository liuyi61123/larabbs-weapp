// pages/user/edit/edit.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avatar: '',
    email: '',
    introduction:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户个人信息
    // app.request({
    //   needAuth:true,
    //   method: 'GET',
    //   url: app.globalData.config.service.userUrl,
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       name: res.data.name,
    //       avatar: res.data.avatar,
    //       email: res.data.email,
    //       introduction: res.data.introduction
    //     })
    //   }
    // })
    this.setData({
      name: app.globalData.userInfo.name,
      avatar: app.globalData.userInfo.avatar,
      email: app.globalData.userInfo.email,
      introduction: app.globalData.userInfo.introduction
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //选择照片
  chooseImage:function(){
    wx.chooseImage({
      count:1,
      success: res => {
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
          success: res => {
            this.setData({
              avatar: JSON.parse(res.data).path
            })
            console.log(res.data)
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },
  //提交表单
  userSubmit:function(e){
    let data = e.detail.value
    data.avatar = this.data.avatar

    wx.showLoading({
      title:'提交中'
    })
    //修改登录用户信息
    app.request({
      needAuth: true,
      method: 'PUT',
      data: data,
      url: app.globalData.config.service.userUrl,
      success: res => {
        app.updateUserInfo(res.data)
        wx.hideLoading()

        wx.showToast({
          title:'更新成功',
          icon:'success'
        })
      }
    })
  }
})