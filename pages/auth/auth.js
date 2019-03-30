// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: '年级选项',
    gradeId: '',
    gradeList: [],
    class:'班级选择',
    classId:'',
    classList: [],
    quest: {}, 
    questName:'认证问题',
    answer:''

  },
  // 选择年级并获取班级和问题
  bindPickerGrade(e) {
    this.setData({
      gradeId: this.data.gradeList[e.detail.value].id,
      grade: this.data.gradeList[e.detail.value].text
    })
    this.getClass();
    this.getQuest();
  },
  // 选择班级
  bindPickerClass(e) {
    this.setData({
      classId: this.data.classList[e.detail.value].id,
      class: this.data.classList[e.detail.value].text
    })
  },
  // 获取年级
  getGrade() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/sys/orgs/treeGrade',//自己的服务接口地址
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
          that.setData({
            gradeList: res.data
          })
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  // 获取班级
  getClass() {
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/sys/orgs/treeClass',
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      data:{
        pid:this.data.gradeId
      },
      success: function (res) {
          that.setData({
            classList: res.data
          })
      },
      fail: function () {
        console.log('系统错误');
      }
    })
  },
  // 获取问题
  getQuest() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/sys/questionrandom/' + that.data.gradeId,
      method: 'get',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            quest: res.data.data,
            questName: res.data.data.questionTitle
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
  inputTyping: function (e) {
    this.setData({
      answer: e.detail.value
    });
  },
  submit(){
    if (this.data.gradeId == '' || this.data.classId == '' ||this.data.answer==''){
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    } else if (this.data.answer != this.data.quest.questionAnswer){
      wx.showToast({
        title: '回答错误',
        icon: 'none'
      })
    }else{
      wx.setStorage({
        key: 'auth',
        data: {
          gradeId: this.data.gradeId,
          classId: this.data.classId
        },
      })
      wx.navigateTo({
        url: '/pages/registMsg/registMsg',
      })
    }
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