// pages/mailList/mailList.js
var page = 0;
var rows = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [{
      "page": 1,
      "rows": 10,
      "id": 57,
      "loginName": "oxzPj5PaJ9zsBq7lcBrX6NPFvucw",
      "name": "小伙",
      "password": "060fdbbf77d0af2157e10eb9cdfe6cec",
      "sex": 0,
      "age": 0,
      "phone": "123****8901",
      "userType": 0,
      "status": 0,
      "userStation": "医药",
      "delFlag": 0,
      "updateTime": "2019-03-16 16:23:22",
      "createTime": null,
      "lastTime": null,
      "grade": "41",
      "classes": "43",
      "province": "河北",
      "city": "Shijiazhuang",
      "company": "锦诚科技",
      "post": "开发",
      "industry": "医药",
      "openid": "oxzPj5PaJ9zsBq7lcBrX6NPFvucw",
      "sessionKey": null,
      "avatarUrl": "111",
      "latitude": "553.2",
      "longitude": "553.2",
      "learningTime": "2008-2012",
      "graduationTime": "2012",
      "university": "河北工程大学",
      "headmaster": "王忠",
      "teacherInClass": "张峰，李琼，王赛",
      "competitionCoach": "詹飞谷",
      "others": "很好很强大",
      "orgId": null,
      "roleId": null,
      "identifyCode": null
    }]
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
      url: getApp().globalData.url + '/sys/users/list',
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      data:{
        orgId: getApp().globalData.userInfo.grade,
        // orgId:41,
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
  toDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personalData/personalData?id='+id,
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