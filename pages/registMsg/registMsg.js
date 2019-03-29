// pages/registMsg/registMsg.js

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auth:{},
    sex:'请选择',
    sexList:['男','女'],
    industryList:[],
    industry:'请选择',
    learningTime:'请选择',
    graduationTime:'请选择',
    province: '',
    city:'',
    latitude:'',
    longitude:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'XOIBZ-6ZQK4-3NDUE-XGC3E-AMDDZ-E5FPJ' //自己的key秘钥 http://lbs.qq.com/console/mykey.html 在这个网址申请
    });

    var that = this;
    wx.getStorage({
      key: 'auth',
      success: function(res) {
        that.setData({
          auth: res.data
        })
      },
    })
  },
  bindSexChange(e){
    this.setData({
      sex: this.data.sexList[e.detail.value]
    })
  },
  bindIndustryChange(e){
    this.setData({
      industry: this.data.industryList[e.detail.value].dictName
    })
  },
  bindlearningTimeChange(e) {
    this.setData({
      learningTime: e.detail.value
    })
  },
  bindgraduationTimeChange(e) {
    this.setData({
      graduationTime: e.detail.value
    })
  },
  formSubmit(e) {
    e.detail.value.industry = this.data.industryList[e.detail.value.industry].dictName;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value;
    
  },
  // 获取行业
  getGrade() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/sys/dict/allDictByInfo',
      method: 'post',
      header: {
        "Content-Type": "applciation/json"
      },
      data:{
        dictInfo:'dictInfo'
      },
      success: function (res) {
        that.setData({
          industryList: JSON.parse(res.data.data)
        })
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
    this.getGrade()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude);
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
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