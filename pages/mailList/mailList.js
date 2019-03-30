// pages/mailList/mailList.js
var page = 0;
var rows = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[]
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
    page = page + 1;
    wx.request({
      url: getApp().globalData.url + '/sys/users',
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      data:{
        // orgId: getApp().globalData.userInfo.grade,
        orgId:41,
        page:page,
        rows:rows
      },
      success: function (res) {
        var userList = that.data.userList;
        for (var i = 0; i < res.data.rows.length; i++) {
          userList.push(res.data.rows[i]);
        }
        that.setData({
          userList: userList
        })
        wx.hideLoading();
      },
      fail: function () {
        console.log('系统错误');
      }
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
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})