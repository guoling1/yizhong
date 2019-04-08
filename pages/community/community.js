// pages/community/community.js
var page = 0;
var rows = 10;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    noticeTitle: '',
    messageList: [],
    swiperData: [{
      picurl: '../../images/banner.png'
    }, {
      picurl: '../../images/banner.png'
    }],
    news: [],
    page: 0,
    more: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 获取公告
  getNotice() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/sys/notice/activate',
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            noticeTitle: res.data.data.noticeTitle
          })
        } else {
          console.log('')
        }
      },
      fail: function() {
        console.log('系统错误');
      }
    })
  },
  // 获取同学消息
  getMessage() {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    page = page + 1;
    wx.request({
      url: getApp().globalData.url + '/sys/message/allcascade',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        orgId: getApp().globalData.userInfo.grade,
        userId: getApp().globalData.userInfo.id,
        page: page,
        rows: rows
      },
      success: function(res) {
          var messageList = that.data.messageList;
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].isZan = false;
            res.data.rows[i].isReply = false;
            res.data.rows[i].replyList = [];
            res.data.rows[i].photos = res.data.rows[i].photo.split(';')
            messageList.push(res.data.rows[i]);
          }
          that.setData({
            messageList: messageList
          })
          wx.hideLoading();
      },
      fail: function() {
        console.log('系统错误');
      }
    })
  },
  // 展开评论区
  openReply(e){
    var list = this.data.messageList;
    var that = this;
    if (list[e.target.dataset.index].isReply){
      list[e.target.dataset.index].isReply = false;
      that.setData({
        messageList: list
      })
    }else{
      list[e.target.dataset.index].isReply = !list[e.target.dataset.index].isReply;
      list[e.target.dataset.index].content = '';
      that.setData({
        messageList: list
      })
      wx.request({
        url: getApp().globalData.url + '/sys/messageDetailList',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          messageId: e.target.dataset.id,
        },
        success: function (res) {
          list[e.target.dataset.index].replyList = res.data.rows;
          
          that.setData({
            messageList: list
          })
        },
        fail: function () {
          console.log('系统错误');
        }
      })
    }
    
  },
  textValue(e){
    var list = this.data.messageList;
    list[e.target.dataset.index].content = e.detail.value
    this.setData({
      messageList: list
    })
  },
  // 发表评论
  msgSubmit(e){
    var that = this
    wx.request({
      url: getApp().globalData.url + '/sys/reply',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        replyMessage: this.data.messageList[e.target.dataset.index].content,//评论内容，
        mId: e.target.dataset.id,//被评论的信息的id，
        userId:getApp().globalData.userInfo.id//当前登录账户的id
      },
      success: function (res) {
        if (res.data.code == '200') {
          wx.showToast({
            title: '评论成功',
          })
          list[e.target.dataset.index].content = '';
          that.setData({
            messageList: list
          })
          var list = that.data.messageList;
          wx.request({
            url: getApp().globalData.url + '/sys/messageDetailList',
            method: 'get',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              messageId: e.target.dataset.id
            },
            success: function (res) {
              list[e.target.dataset.index].replyList = res.data.rows;
              list[e.target.dataset.index].content = '';
              that.setData({
                messageList: list
              })
            },
            fail: function () {
              console.log('系统错误');
            }
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
  // 点赞
  agree(e) {
    console.log(e)
    wx.request({
      url: getApp().globalData.url + '/sys/messagePointsAdd',
      method: 'get',
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      data: {
        userId: getApp().globalData.userInfo.id,//点赞用户id, 
        messageId: e.target.dataset.id//消息id
      },
      success: function (res) {
        if (res.data.code == '200') {
          // 变蓝
        } else {
          console.log('系统错误1')
        }

      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  // 删除评论
  // msgSubmit() {
  //   wx.request({
  //     url: getApp().globalData.url + '/sys/reply/{ids}',
  //     method: 'post',
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     success: function (res) {
  //       if (res.data.code == '200') {
  //         wx.showToast({
  //           title: '删除成功',
  //         })
  //       } else {
  //         console.log('系统错误1')
  //       }

  //     },
  //     fail: function () {
  //       console.log('系统错误');
  //     }
  //   })
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    that.getMessage();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNotice();
    this.getMessage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})