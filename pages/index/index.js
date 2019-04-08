//index.js
//获取应用实例
const app = getApp();
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';

// let chart;
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  

  const option = {
    geo: {
      show: true,
      map: 'china',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false,
        }
      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#01215c',
          borderWidth: 2, //设置外层边框
          borderColor: '#9ffcff',
          shadowColor: 'rgba(0,54,255, 1)',
          shadowBlur: 10
        }
      }
    },
    series: [{
      name: '数据',
      type: 'map',
      mapType: 'china',
      roam: false,
      aspectScale: 0.75,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#01215c',
          borderColor: '#9ffcff',
        },
        emphasis: {
          // show: false
          areaColor: '#0ad3e9',
          borderColor: '#9ffcff',
        }
      },
      animation: false,

      data: getApp().globalData.chartsData

    }],

  };
  canvas.setChart(chart);
  echarts.registerMap('china', geoJson);
  chart.setOption(option);

  return chart;
}
Page({
  data: {
    top: [],
    userInfo: {},
    hasMap: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ec: {
      onInit: initChart
    }
  },
  onLoad: function() {
    var that = this
    if (app.globalData.chartsData.length != 0) {
      this.setData({
        hasMap: true
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employIdCallback = employId => {
        if (employId != '') {
          this.setData({
            hasMap: true
          });
        }
      }
    }
    if (this.data.hasMap) {
      console.log(11)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.login({
      success: function(res) {
        var code = res.code; //登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function(res) {
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: getApp().globalData.url + '/decodeUserInfo',
                method: 'get',
                header: {
                  "Content-Type": "applciation/json"
                },
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code
                },
                success: function(res) {
                  //4.解密成功后 获取自己服务器返回的结果
                  if (res.data.code == 200) {
                    var data = res.data.data;
                    getApp().globalData.userInfo = data
                    if (data.status == 1) {
                      wx.reLaunch({
                        url: '/pages/auth/auth',
                      })
                    } else if (data.status == 2) {
                      wx.reLaunch({
                        url: '/pages/wait/wait',
                      })
                    }
                  } else {
                    console.log('2解密失败')
                  }
                },
                fail: function() {
                  console.log('1系统错误')
                }
              })
            },
            fail: function() {
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function() {
        console.log('登陆失败')
      }
    })
    this.getTop();
  },
  // 获取前三名省市
  getTop() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/sys/usersTop',
      method: 'get',
      // header: {
      //   "Content-Type": "applciation/json"
      // },
      success: function(res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          that.setData({
            top: data
          })
        } else {
          console.log('2解密失败')
        }
      },
      fail: function() {
        console.log('1系统错误')
      }
    })
  },
  onReady() {
    
  }
})