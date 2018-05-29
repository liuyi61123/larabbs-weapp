// pages/topic/show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {},
    replies: [],
    replyContent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取文章详情
    app.request({
      method: 'GET',
      url: app.globalData.config.service.host + '/topics/' + options.id + '?include=user,category',
      success: res => {
        console.log(res)
        this.setData({
          topic: res.data
        })
      }
    });

    //获取文章评论列表
    this.getReplies(options.id)
    
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
  getReplies:function(id){
    app.request({
      method: 'GET',
      url: app.globalData.config.service.host + '/topics/' + id + '/replies?include=user',
      success: res => {
        console.log(res)
        this.setData({
          replies: res.data.data
        })
      }
    })
  },
  //提交评论
  replySubmit:function(e){
    let form = e.detail.value;
    this.setData({
      replyContent: form
    })
    //验证评论内容
    if (form.content){
      //提交表单
      wx.showLoading({
        title: '提交中',
      })
      app.request({
        needAuth:true,
        method: 'POST',
        data: form,
        url: app.globalData.config.service.host + '/topics/' + this.data.topic.id + '/replies',
        success: res => {
          console.log(res)
          //更新评论列表
          this.getReplies(this.data.topic.id)
          //清空input的值
          this.setData({
            replyContent: ''
          })
          wx.hideLoading()
          
        }
      })
    }else{
      wx.showToast({
        title: '内容不能为空',
      })
    }
  }
})