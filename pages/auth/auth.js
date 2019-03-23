// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade:'年级选项',
    gradeId:'',
    gradeList: ['美国', '中国', '巴西', '日本'],
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeId: e.detail.value,
      grade: this.data.gradeList[e.detail.value]
    })
  },
  // 获取年级
  getGrade(){
    wx.request({
      url: getApp().globalData.url +'/sys/orgs/treeGrade',//自己的服务接口地址
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        //4.解密成功后 获取自己服务器返回的结果
        if (res.data.code == 200) {
          this.setData({
            gradeList: res.data
          })
        } else {
          console.log('')
        }
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  // 获取班级
  getClass() {
    wx.request({
      url: getApp().globalData.url + '/sys/orgs/treeClass',//自己的服务接口地址
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        //4.解密成功后 获取自己服务器返回的结果
        if (res.data.code == 200) {
          this.setData({
            gradeList: res.data
          })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGrade()
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