// pages/personalData/personalData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {},
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: options.id
    })
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: getApp().globalData.url + '/rest/sys/users/'+options.id+'/'+getApp().globalData.userInfo.id,
      method: 'get',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': getApp().globalData.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          if (/\*\*/.test(res.data.data.phone)){
            res.data.data.isPhone = true;
          }else{
            res.data.data.isPhone = false;
          }
          console.log(res.data.data)
          that.setData({
            userData: res.data.data
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '系统错误',
            icon:'none'
          })
        }
      },
      fail: function () {
        console.log('系统错误');
        wx.hideLoading();
      }
    })
  },
  // 申请查看电话
  apply(){
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/apply',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': getApp().globalData.token
      },
      data:{
        fromUserId: getApp().globalData.userInfo.id,//发起申请的用户id，
        toUserId:that.data.id,//被申请的用户的id,
        applyMessage:''//申请信息
      },
      success: function (res) {
        if (res.data.code == '200') {
          wx.showToast({
            title: '申请成功',
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