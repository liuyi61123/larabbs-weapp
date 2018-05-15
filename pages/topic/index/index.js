// pages/topic/index.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    listData: [],
    activeIndex: '',
    page: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据
    app.request({
      method: 'GET',
      url: app.globalData.config.service.categoryUrl,
      success: res => {
        console.log(res)
        this.setData({
          tabs: res.data.data,
          activeIndex: res.data.data[0].id
        })
        this.getListData(res.data.data[0].id)
      },
      fail: err => {
        console.log(err)
      }
    })

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    //获取更多文章信息
    wx.showLoading({
      title: '加载中',
    })
    //发送请求
    let page = this.data.page + 1
    app.request({
      method: 'GET',
      url: app.globalData.config.service.topicsUrl + '?category_id=' + this.data.activeIndex + '&page=' + page + '&include=user,category',
      success: res => {
        console.log(res)
        this.setData({
          listData: this.data.listData.concat(res.data.data),
          page: page,
        })
        wx.hideLoading()
      }
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabClick: function (e) {
    console.log(e)
    let id = e.currentTarget.id;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      page: 1,
    });

    //获取对应的分类信息列表
    this.getListData(id)

  },
  getListData(id) {
    app.request({
      method: 'GET',
      url: app.globalData.config.service.topicsUrl + '?category_id=' + id + '&page=' + this.data.page + '&include=user,category',
      success: res => {
        console.log(res)
        this.setData({
          listData: res.data.data,
        })
      }
    })
  }

})