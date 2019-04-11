//index.js
//获取应用实例
const app = getApp();
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';
var couTime;

// let chart;
function initChart(canvas, width, height) {
  setTimeout(function() {
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
  }, 2000)
}
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
  onLoad: function() {
    var that = this;
    couTime = setInterval(function(){
      if(app.globalData.token){
        clearInterval(couTime)
        that.getTop()
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },
  // 获取前三名省市
  getTop() {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/rest/sys/usersTop',
      method: 'get',
      header: {
        'X-AUTH-TOKEN': app.globalData.token
      },
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