// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    pics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  chooseImg(){
    var that = this,
      pics = this.data.pics;  
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });
        that.uploadimg({
          url: getApp().globalData.url + '/sys/photo/upload',//这里是你图片上传的接口
          path: imgsrc//这里是选取的图片的地址数组
        });
        // wx.uploadFile({
        //   url: getApp().globalData.url+'/sys/photo/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   // formData: {
        //   //   'user': 'test'
        //   // },
        //   success: function (res) {
        //     var data = res.data
        //     pics = pics.concat(imgsrc);
        //     that.setData({
        //       pics: pics
        //     });
        //   }
        // })
      }
    })
  },
  submit(){
    var that = this;
    if(that.data.message){
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: getApp().globalData.url + '/sys/message/allcascade',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          // openid: getApp().globalData.userInfo.openid,
          orgId: 41,
          message: that.data.message,
          photo: ''
        },
        success: function (res) {
          if (res.data.code == 200) {
            var messageList = that.data.messageList;
            for (var i = 0; i < res.data.rows.length; i++) {
              messageList.push(res.data.rows[i]);
            }
            that.setData({
              messageList: messageList
            })
            wx.hideLoading();
          } else {
            console.log('')
          }
        },
        fail: function () {
          console.log('系统错误');
        }
      })
    }else{
      wx.showToast({
        title: '请填写内容',
      })
    }
    
  },
  uploadimg(data){
    var that = this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'uploadFile',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    })
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