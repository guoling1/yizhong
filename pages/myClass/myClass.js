// pages/myClass/myClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    graduationTime: '2019',
    university:''
  },
  formSubmit(e) {
    wx.showLoading({
      title: '修改中',
    })
    wx.request({
      url: getApp().globalData.url + '/rest/sys/usersByOpenid',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': getApp().globalData.token
      },
      data: {
        openid: getApp().globalData.userInfo.openid,
        graduationTime: this.data.graduationTime,
        university: this.data.university
      },
      success: function (res) {
        if (res.data.code == '200') {
          wx.showToast({
            title: '修改成功',
          })
          wx.hideLoading()
        } else {
          console.log('系统错误1')
        }

      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      graduationTime: getApp().globalData.userInfo.graduationTime,
      university: getApp().globalData.userInfo.university
    })
  },
  bindgraduationTimeChange(e) {
    this.setData({
      graduationTime: e.detail.value
    })
  },
  binduniversityChange(e) {
    this.setData({
      university: e.detail.value
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