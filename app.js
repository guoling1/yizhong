//app.js
var mydata = [{
  name: '北京',
  selected: false
}, {
  name: '天津',
  selected: false
},
{
  name: '上海',
  selected: false
}, {
  name: '重庆',
  selected: true
},
{
  name: '河北',
  selected: true
}, {
  name: '河南',
  selected: false
},
{
  name: '云南',
  selected: false
}, {
  name: '辽宁',
  selected: false
},
{
  name: '黑龙江',
  selected: false
}, {
  name: '湖南',
  selected: false
},
{
  name: '安徽',
  selected: false
}, {
  name: '山东',
  selected: false
},
{
  name: '新疆',
  selected: false
}, {
  name: '江苏',
  selected: false
},
{
  name: '浙江',
  selected: false
}, {
  name: '江西',
  selected: false
},
{
  name: '湖北',
  selected: false
}, {
  name: '广西',
  selected: false
},
{
  name: '甘肃',
  selected: false
}, {
  name: '山西',
  selected: false
},
{
  name: '内蒙古',
  selected: false
}, {
  name: '陕西',
  selected: false
},
{
  name: '吉林',
  selected: false
}, {
  name: '福建',
  selected: false
},
{
  name: '贵州',
  selected: false
}, {
  name: '广东',
  selected: false
},
{
  name: '青海',
  selected: false
}, {
  name: '西藏',
  selected: false
},
{
  name: '四川',
  selected: false
}, {
  name: '宁夏',
  selected: false
},
{
  name: '海南',
  selected: false
}, {
  name: '台湾',
  selected: false
},
{
  name: '香港',
  selected: false
}, {
  name: '澳门',
  selected: false
}
];

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // this.getData()
    var that = this
    wx.request({
      url: this.globalData.url + '/sys/usersAllProvince',
      method: 'get',
      // header: {
      //   "Content-Type": "applciation/json"
      // },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          for (var i in data) {
            for (var j in mydata) {
              if (mydata[j].name == data[i].province) {
                mydata[j].selected = true;
              }
            }
          }
          that.globalData.chartsData = mydata

        } else {
          console.log('2解密失败')
        }
      },
      fail: function () {
        console.log('1系统错误')
      }
    })
  },
  globalData: {
    userInfo: null,
    // url:'http://hdjincheng.6655.la',
    url:'http://24323j007d.wicp.vip',
    // url: 'http://tbk.o87.net',
    chartsData:[]
    
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
          for (var i in data) {
            for (var j in mydata) {
              if (mydata[j].name == data[i].province) {
                mydata[j].selected = true;
              }
            }
          }
          that.globalData.chartsData = res.userInfo

        } else {
          console.log('2解密失败')
        }
      },
      fail: function () {
        console.log('1系统错误')
      }
    })
  },
})