//index.js
//获取应用实例
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

function getOption(xData, data_cur, data_his) {
  var option = {
    backgroundColor: "#f5f4f3",
    color: ["#37A2DA", "#f2960d", "#67E0E3", "#9FE6B8"],
    title: {
      text: '实时运行速度',
      textStyle: {
        fontWeight: '500',
        fontSize: 15,
        color: '#000'
      },
      x: 'center',
      y: '0'
    },
    legend: {
      data: ['今日', '昨日'],
      right: 10
    },
    grid: {
      top: '15%',
      left: '1%',
      right: '3%',
      bottom: '60rpx',
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData || [],
      axisLabel: {
        interval: 11,
        formatter: function (value, index) {
          return value.substring(0, 2) * 1;
        },
        textStyle: {
          fontsize: '10px'
        }
      }
    },
    yAxis: {
      x: 'center',
      name: 'km/h',
      type: 'value',
      min: 0,
      max: 120
    },
    series: [{
      name: '今日',
      zIndex: 2,
      type: 'line',
      smooth: true,
      symbolSize: 0,
      data: data_cur || []
    }, {
      name: '昨日',
      zIndex: 1,
      type: 'line',
      smooth: true,
      symbolSize: 0,
      data: data_his || []
    }]
  };
  return option;
}
let chartLine;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ecLine: {
      onInit: function (canvas, width, height) {
        //初始化echarts元素，绑定到全局变量，方便更改数据
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);

        //可以先不setOption，等数据加载好后赋值，
        //不过那样没setOption前，echats元素是一片空白，体验不好，所有我先set。
        var xData = arrayTime(5).slice(100);
        var option = getOption(xData);
        chartLine.setOption(option);
      }
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../community/community'
    })
  },
  onLoad: function () {
    //ajax请求好数据后，调用获取option函数，传一些数据，
    //然后用全局变量echarts元素chartLine 来 setOption即可。
    // var option = getOption(xData, data_cur, data_his);
    // chartLine.setOption(option);
    // //如果上面初始化时候，已经chartLine已经setOption了，
    // //那么建议不要重新setOption，官方推荐写法，重新赋数据即可。
    // chartLine.setOption({
    //   xAxis: {
    //     data: xData
    //   },
    //   series: [{
    //     data: data_cur
    //   }, {
    //     data: data_his
    //   }]
    // });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
