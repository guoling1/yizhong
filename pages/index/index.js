//index.js
//获取应用实例
const app = getApp();
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';

function randomData() {
  return Math.round(Math.random() * 500);
}
var mydata = []

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  // console.log(geoJson)
  echarts.registerMap('china', geoJson);

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

          // borderColor: '#389BB7',
          // areaColor: '#000',
          // borderWidth: 2,
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

  chart.setOption(option);

  return chart;
}
let chart;
Page({
  data: {
    top: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ec: {
      onInit: initChart
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../community/community'
    })
  },
  onLoad: function() {
    
    // ajax请求好数据后，调用获取option函数，传一些数据，
    // 然后用全局变量echarts元素chartLine 来 setOption即可。
    // var xData=[1,2,3]
    // var data_cur = [1, 2, 3]
    // var data_his = [1, 2, 3]
    // var option = getOption(xData, data_cur, data_his);
    // chartLine.setOption(option);
    // //如果上面初始化时候，已经chartLine已经setOption了，
    // //那么建议不要重新setOption，官方推荐写法，重新赋数据即可。
    // chartLine.setOption({
    //   xAxis: {
    //     data: [1, 2, 3]
    //   },
    //   series: [{
    //     data: data_cur
    //   }, {
    //       data: [1, 2, 3]
    //   }]
    // });

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.login({
      success: function(res) {
        var code = res.code; //登录凭证
        if (code) {
          console.log(getApp().globalData)

          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function(res) {
              console.log({
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code
              })
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
    // this.getData();
  },
  getData() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/sys/usersAllProvince',
      method: 'get',
      // header: {
      //   "Content-Type": "applciation/json"
      // },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          for(var i in data){
            for(var j in mydata){
              if (mydata[j].name == data[i].province){
                mydata[j].selected = true;
              }
            }
          }
          demo2.series[0].data = mydata;

        } else {
          console.log('2解密失败')
        }
      },
      fail: function () {
        console.log('1系统错误')
      }
    })
  },
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
    setTimeout(function() {
      // 获取 chart 实例的方式
      console.log(echarts.setOption)
    }, 2000);
  }
})