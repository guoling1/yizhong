// pages/help/help.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpTitle: '',
    helpAnswer: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  getData() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/help/activate',
      method: 'get',
      header: {
        "Content-Type": "applciation/json",
        'X-AUTH-TOKEN': app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          res.data.data.helpAnswer = res.data.data.helpAnswer.replace(/http:\/\/localhost\//, getApp().globalData.url)
          that.setData({
            helpTitle: res.data.data.helpTitle,
            // helpAnswer: res.data.data.helpAnswer
          })
          WxParse.wxParse('helpAnswer', 'html', res.data.data.helpAnswer, that, 15);
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