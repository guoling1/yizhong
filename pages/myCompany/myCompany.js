// pages/myCompany/myCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:'',
    post:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      company: getApp().globalData.userInfo.company,
      post: getApp().globalData.userInfo.post
    })
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
        company: this.data.company,
        post: this.data.post
      },
      success: function (res) {
        if (res.data.code == '200') {
          wx.hideLoading();
          wx.showToast({
            title: '修改成功',
          })
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