// pages/mailList/mailList.js
var page = 0;
var rows = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getData() {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: getApp().globalData.url + '/sys/users/list',
      method: 'get',
      header: {
        "Content-Type": "applciation/json",
        "token": getApp().globalData.userInfo.openid
      },
      data:{
        orgId: getApp().globalData.userInfo.classes,
        openid: getApp().globalData.userInfo.openid,
        page:page,
        rows:rows
      },
      success: function (res) {
        that.setData({
          userList: res.data.data
        })
        wx.hideLoading();
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  toDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personalData/personalData?id='+id,
    })
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