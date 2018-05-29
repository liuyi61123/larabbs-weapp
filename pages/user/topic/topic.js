// pages/user/topic/topic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    userTopics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        id: options.id
      })
    }else{
      this.setData({
        id: app.globalData.userInfo.id
      })
    }
    //获取用户发布的帖子
    app.request({
      method: 'GET',
      url: app.globalData.config.service.host + '/users/'+this.data.id+'/topics?include=user,category',
      success: res => {
        console.log(res)
        this.setData({
          userTopics: res.data.data
        })
      }
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

  }
})