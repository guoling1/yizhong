// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit(e) {
    var message = e.detail.value.message;
    var that = this;
    if (message) {
      wx.showLoading({
        title: '反馈中',
      })
      wx.request({
        url: getApp().globalData.url + '/sys/feedback',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          userId: getApp().globalData.userInfo.id,
          feedbackMessage: message
        },
        success: function (res) {
          if (res.data.code == 200) {
            wx.hideLoading();
            wx.showToast({
              title: '反馈成功',
            })
          } else {
            console.log('')
          }
        },
        fail: function () {
          console.log('系统错误');
        }
      })
    } else {
      wx.showToast({
        title: '请填写内容',
        icon:'none'
      })
    }

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