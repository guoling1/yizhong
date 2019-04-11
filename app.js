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
  onLaunch: function() {
    // if (this.getUser){
      this.getUser()
    // }
    // this.getUser()
    // this.getData()
  },
  globalData: {
    userInfo: null,
    token:'',
    url: 'http://hdjincheng.6655.la',
    // url:'http://24323j007d.wicp.vip',
    // url: 'http://tbk.o87.net',
    chartsData: []
  },
  // 获取登录信息
  getUser(){
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; //登录凭证
        if (code) {
          wx.getUserInfo({  //2、调用获取用户信息接口
            success: function (res) {
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: that.globalData.url + '/decodeUserInfo',
                method: 'get',
                header: {
                  "Content-Type": "applciation/json"
                },
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code
                },
                success: function (res) {
                  if (res.data.code == 200) {
                    var data = res.data.data;
                    that.globalData.userInfo = data.user;
                    that.globalData.token = data.token;
                    that.getData()
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
                fail: function () {
                  console.log('1系统错误')
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
  // 获取地图信息
  getData() {
    var that = this
    wx.request({
      url: that.globalData.url + '/sys/usersAllProvince',
      method: 'get',
      header:{
        'X-AUTH-TOKEN': that.globalData.token
      },
      success: function(res) {
        var data = res.data.data;
        for (var i in data) {
          for (var j in mydata) {
            if (mydata[j].name == data[i].province) {
              mydata[j].selected = true;
            }
          }
        }
        that.globalData.chartsData = mydata;
      },
      fail: function() {
        console.log('1系统错误')
      }
    })
  },
})