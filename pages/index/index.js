//index.js
//获取应用实例
const app = getApp();
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';
function randomData() {
  return Math.round(Math.random() * 500);
} 
var mydata = [
  { name: '北京', value: '100' }, { name: '天津', value: randomData() },
  { name: '上海', value: randomData() }, { name: '重庆', value: randomData() },
  { name: '河北', value: randomData() }, { name: '河南', value: randomData() },
  { name: '云南', value: randomData() }, { name: '辽宁', value: randomData() },
  { name: '黑龙江', value: randomData() }, { name: '湖南', value: randomData() },
  { name: '安徽', value: randomData() }, { name: '山东', value: randomData() },
  { name: '新疆', value: randomData() }, { name: '江苏', value: randomData() },
  { name: '浙江', value: randomData() }, { name: '江西', value: randomData() },
  { name: '湖北', value: randomData() }, { name: '广西', value: randomData() },
  { name: '甘肃', value: randomData() }, { name: '山西', value: randomData() },
  { name: '内蒙古', value: randomData() }, { name: '陕西', value: randomData() },
  { name: '吉林', value: randomData() }, { name: '福建', value: randomData() },
  { name: '贵州', value: randomData() }, { name: '广东', value: randomData() },
  { name: '青海', value: randomData() }, { name: '西藏', value: randomData() },
  { name: '四川', value: randomData() }, { name: '宁夏', value: randomData() },
  { name: '海南', value: randomData() }, { name: '台湾', value: randomData() },
  { name: '香港', value: randomData() }, { name: '澳门', value: randomData() }
];  

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  // console.log(geoJson)
  echarts.registerMap('china', geoJson);

  const option = {
    // backgroundColor: '#FFFFFF',
    // tooltip: {
    //   trigger: 'item'
    // },

    visualMap: { //左侧导航
      show:false,
      min: 0,
      max: 100,
      // left: 'left',
      // top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: false,
      splitNumber:1,
      splitList:[
        {start:1,end:1000000000,label:'有'},
        { start: 0, end: 1, label: '无' },
      ],
      color: ['#389BB7','#000']
    },
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
          borderWidth: 2,//设置外层边框
          borderColor: '#9ffcff',
          shadowColor: 'rgba(0,54,255, 1)',
          shadowBlur: 10
        }
      }
    },
    series: [{
      name:'数据',
      type: 'map',
      mapType: 'china',
      roam: false, 
      aspectScale: 0.75,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show:false
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
          show:false
        }
      },
      animation: false,

      data: [
        { name: '北京', value: '100' }, { name: '天津', value: '0' },
        { name: '上海', value: '56' }, { name: '重庆', value: randomData() },
        { name: '河北', value: 0 }, { name: '河南', value: randomData() },
        { name: '云南', value: randomData() }, { name: '辽宁', value: randomData() },
        { name: '黑龙江', value: randomData() }, { name: '湖南', value: randomData() },
        { name: '安徽', value: randomData() }, { name: '山东', value: randomData() },
        { name: '新疆', value: randomData() }, { name: '江苏', value: randomData() },
        { name: '浙江', value: randomData() }, { name: '江西', value: randomData() },
        { name: '湖北', value: randomData() }, { name: '广西', value: randomData() },
        { name: '甘肃', value: randomData() }, { name: '山西', value: randomData() },
        { name: '内蒙古', value: randomData() }, { name: '陕西', value: randomData() },
        { name: '吉林', value: randomData() }, { name: '福建', value: randomData() },
        { name: '贵州', value: randomData() }, { name: '广东', value: randomData() },
        { name: '青海', value: randomData() }, { name: '西藏', value: randomData() },
        { name: '四川', value: randomData() }, { name: '宁夏', value: randomData() },
        { name: '海南', value: randomData() }, { name: '台湾', value: randomData() },
        { name: '香港', value: randomData() }, { name: '澳门', value: randomData() }
      ]

    }],

  };

  chart.setOption(option);

  return chart;
}
let chart;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ec: {
      onInit: initChart
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../community/community'
    })
  },
  onLoad: function () {
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
  onShow: function () {
    wx.login({
      success: function (res) {
        var code = res.code;//登录凭证
        if (code) {
          console.log(getApp().globalData)
          
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'http://hdjincheng.6655.la/decodeUserInfo',//自己的服务接口地址
                method: 'get',
                header: {
                  "Content-Type": "applciation/json"
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                success: function (res) {
                  //4.解密成功后 获取自己服务器返回的结果
                  if (res.data.code == 200) {
                    var data = res.data.data;
                    if (data.status == 1) {
                      // wx.navigateTo({
                      //   url: '/pages/auth/auth',
                      // })
                    }
                  } else {
                    console.log('2解密失败')
                  }
                },
                fail: function () {
                  console.log('1系统错误')
                  // wx.navigateTo({
                  //   url: '/pages/auth/auth',
                  // })
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    })
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
})
