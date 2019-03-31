// pages/personalData/personalData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: { "page": 1,
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
		"userStation": null, 
  "delFlag": 0,
  "updateTime": "2019-03-16 16:23:22",
		"createTime": null,
		"lastTime": null,
		"grade": "2011届",
		"classes": "二班",
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
		"orgId": 27}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: getApp().globalData.url + '/sys/users/'+options.id,
      method: 'get',
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            userData: res.data.data
          })
          wx.hideLoading();
        } else {
          console.log('')
        }
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  // 申请查看电话
  apply(){
    wx.request({
      url: getApp().globalData.url + '/sys/apply',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        fromUserId:'',//发起申请的用户id，
        toUserId:'',//被申请的用户的id,
        applyMessage:''//申请信息
      },
      success: function (res) {
        if (res.data.code == '200') {
          wx.showToast({
            title: '删除成功',
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