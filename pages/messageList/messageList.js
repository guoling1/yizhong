// pages/messageList/messageList.js
var page=0;
var rows=10;
var params;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    messageList:[]
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    page=0
    this.setData({
      messageList: [],
      type: 1,
    })
    params = {
      fromUserId: getApp().globalData.userInfo.id,
      rows: rows
    }
    this.getMessage(params)
  },
  change(e){
    var that = this;
    this.setData({
      type:e.currentTarget.dataset.type,
      messageList:[]
    })
    if(that.data.type==1){
      params = {
        fromUserId: getApp().globalData.userInfo.id,
        rows: rows
      }
    }else{
      params = {
        toUserId: getApp().globalData.userInfo.id,
        rows: rows
      }
    }
    page = 0;
    that.getMessage(params)
  },
  // 获取话题
  getMessage(params) {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    page = page + 1;
    params.page = page;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/apply',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: params,
      success: function (res) {
        if (res.data.code == 0) {
          var messageList = that.data.messageList;
          for (var i = 0; i < res.data.rows.length; i++) {
            messageList.push(res.data.rows[i]);
          }
          that.setData({
            messageList: messageList
          })
          wx.hideLoading();
        } else {
          console.log('')
          wx.hideLoading();
        }
      },
      fail: function () {
        console.log('系统错误');
        wx.hideLoading();
      }
    })
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
    var that = this;
    if (that.data.type == 1) {
      params = {
        fromUserId: getApp().globalData.userInfo.id,
        rows: rows
      }
    } else {
      params = {
        toUserId: getApp().globalData.userInfo.id,
        rows: rows
      }
    }
    this.getMessage(params);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})