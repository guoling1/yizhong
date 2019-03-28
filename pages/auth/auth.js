// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: '年级选项',
    gradeId: '',
    gradeList: [{
      "id": 27,
      "text": "2012届",
      "seq": 0,
      "state": "open",
      "checked": false,
      "children": null,
      "iconCls": "",
      "pid": null,
      "isLeaf": 1,
      "attributes": null
    }, {
      "id": 41,
      "text": "2011届",
      "seq": 0,
      "state": "open",
      "checked": false,
      "children": null,
      "iconCls": "",
      "pid": null,
      "isLeaf": 1,
      "attributes": null
    }, {
      "id": 26,
      "text": "2013届",
      "seq": 0,
      "state": "open",
      "checked": false,
      "children": null,
      "iconCls": "",
      "pid": null,
      "isLeaf": 1,
      "attributes": null
    }, {
      "id": 30,
      "text": "2014届",
      "seq": 0,
      "state": "open",
      "checked": false,
      "children": null,
      "iconCls": "",
      "pid": null,
      "isLeaf": 1,
      "attributes": null
    }],
    class:'班级选择',
    classId:'',
    classList: [{
      "id": 42,
      "text": "一班",
      "seq": 0,
      "state": "open",
      "checked": false,
      "children": null,
      "iconCls": "",
      "pid": 41,
      "isLeaf": 0,
      "attributes": null
    }, {
      "id": 43,
      "text": "二班",
      "seq": 0,
      "state": "open",
      "checked": false,
      "children": null,
      "iconCls": "",
      "pid": 41,
      "isLeaf": 0,
      "attributes": null
    }, {
      "id": 44,
      "text": "三班",
      "seq": 0,
      "state": "open",
      "checked": false,
      "children": null,
      "iconCls": "",
      "pid": 41,
      "isLeaf": 0,
      "attributes": null
    }]

  },
  bindPickerGrade(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeId: this.data.gradeList[e.detail.value].id,
      grade: this.data.gradeList[e.detail.value].text
    })
  },
  bindPickerClass(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    
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
        //4.解密成功后 获取自己服务器返回的结果
        if (res.data.code == 200) {
          that.setData({
            gradeList: [{
              "id": 27,
              "text": "2012届",
              "seq": 0,
              "state": "open",
              "checked": false,
              "children": null,
              "iconCls": "",
              "pid": null,
              "isLeaf": 1,
              "attributes": null
            }, {
              "id": 41,
              "text": "2011届",
              "seq": 0,
              "state": "open",
              "checked": false,
              "children": null,
              "iconCls": "",
              "pid": null,
              "isLeaf": 1,
              "attributes": null
            }, {
              "id": 26,
              "text": "2013届",
              "seq": 0,
              "state": "open",
              "checked": false,
              "children": null,
              "iconCls": "",
              "pid": null,
              "isLeaf": 1,
              "attributes": null
            }, {
              "id": 30,
              "text": "2014届",
              "seq": 0,
              "state": "open",
              "checked": false,
              "children": null,
              "iconCls": "",
              "pid": null,
              "isLeaf": 1,
              "attributes": null
            }]

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
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/sys/orgs/treeClass',//自己的服务接口地址
      method: 'post',
      header: {
        "Content-Type": "applciation/json"
      },
      data:{
        pid:this.data.gradeId
      },
      success: function (res) {
        //4.解密成功后 获取自己服务器返回的结果
        if (res.data.code == 200) {
          that.setData({
            classList: res.data
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