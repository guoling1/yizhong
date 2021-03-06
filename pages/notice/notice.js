// pages/about/about.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeTitle: '',
    noticeAnswer: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.noticeId)
  },
  getData(id) {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/notice/'+id,
      method: 'get',
      header: {
        "Content-Type": "applciation/json",
        'X-AUTH-TOKEN': app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          res.data.data.noticeAnswer = res.data.data.noticeAnswer.replace(/http:\/\/localhost\//, getApp().globalData.url)
          that.setData({
            noticeTitle: res.data.data.noticeTitle,
            // helpAnswer: res.data.data.helpAnswer
          })
          WxParse.wxParse('noticeAnswer', 'html', res.data.data.noticeAnswer, that, 15);
        } else {
          console.log('')
        }
      },
      fail: function () {
        console.log('系统错误');
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