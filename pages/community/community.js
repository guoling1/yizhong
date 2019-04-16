// pages/community/community.js
var page = 0;
var rows = 10;
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    myId: '',
    noticeTitle: '',
    messageList: [],
    // swiperData: [{
    //   picurl: '../../images/banner.png'
    // }, {
    //   picurl: '../../images/banner.png'
    // }],
    swiperData:[],
    news: [],
    page: 0,
    more: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  // 获取轮播图
  getSwiper() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/pic/allcascade',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      success: function (res) {
          that.setData({
            swiperData: res.data
          })
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  // 获取公告
  getNotice() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/notice/activate',
      method: 'get',
      header: {
        "Content-Type": "applciation/json",
        'X-AUTH-TOKEN': app.globalData.token
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
  openBig(event){
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    for(var i=0;i<imgList.length;i++){
      imgList[i] = this.data.url + "/resources/images/actimg/"+imgList[i]
    }
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
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
      url: getApp().globalData.url + '/rest/sys/message/allcascade',
      method: 'get',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        orgId: getApp().globalData.userInfo.classes,
        // userId: getApp().globalData.userInfo.id,
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
        url: getApp().globalData.url + '/rest/sys/messageDetailList',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-AUTH-TOKEN': app.globalData.token
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
    if (this.data.messageList[e.target.dataset.index].content==''){
      wx.showToast({
        title: '请填写评论内容',
        icon:'none'
      })
    }else{
      wx.request({
        url: getApp().globalData.url + '/rest/sys/reply',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-AUTH-TOKEN': app.globalData.token
        },
        data: {
          replyMessage: this.data.messageList[e.target.dataset.index].content,//评论内容，
          mId: e.target.dataset.id,//被评论的信息的id，
          userId: getApp().globalData.userInfo.id//当前登录账户的id
        },
        success: function (res) {
          if (res.data.code == '200') {
            wx.showToast({
              title: '评论成功',
            })
            var list = that.data.messageList;
            list[e.target.dataset.index].content = '';
            that.setData({
              messageList: list
            })

            wx.request({
              url: getApp().globalData.url + '/rest/sys/messageDetailList',
              method: 'get',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'X-AUTH-TOKEN': app.globalData.token
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
    }
  },
  // 点赞
  agree(e) {
    var that = this;
    console.log(e)
    wx.request({
      url: getApp().globalData.url + '/rest/sys/messagePointsAdd',
      method: 'get',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded",
        'X-AUTH-TOKEN': app.globalData.token
      },
      data: {
        userId: getApp().globalData.userInfo.id,//点赞用户id, 
        messageId: e.target.dataset.id//消息id
      },
      success: function (res) {
        if (res.data.code == '200') {
          // 变蓝
          wx.showToast({
            title: '点赞成功',
          })
          var list = that.data.messageList;
          list[e.currentTarget.dataset.index].isPoints = 1
          list[e.currentTarget.dataset.index].numberOfPoints = list[e.currentTarget.dataset.index].numberOfPoints+1
          that.setData({
            messageList: list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }

      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  delete(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该话题吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.url + '/rest/sys/message/' + e.target.dataset.id,
            method: 'DELETE',
            header: {
              // "Content-Type": "application/x-www-form-urlencoded",
              'X-AUTH-TOKEN': getApp().globalData.token
            },
            success: function (res) {
              wx.showToast({
                title: '删除成功',
              })
              page = 0
              that.setData({
                messageList: []
              })
              that.getMessage()
            },
            fail: function () {
              console.log('系统错误');
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

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
    page = 0;
    this.setData({
      messageList: [],
      myId: getApp().globalData.userInfo.id
    })
    this.getNotice();
    this.getMessage();
    this.getSwiper();
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
    page = 0;
    this.setData({
      messageList: []
    })
    this.getNotice();
    this.getMessage();
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})