// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:getApp().globalData.url,
    message:'',
    pics: []
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
        var imgsrc = res.tempFilePaths;
        console.log(imgsrc)
        that.uploadimg({
          url: getApp().globalData.url + '/sys/photo/upload',//这里是你图片上传的接口
          path: imgsrc//这里是选取的图片的地址数组
        });
      }
    })
  },
  submit(e){
    console.log(e)
    var that = this;
    var message = e.detail.value.message
    if(message){
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: getApp().globalData.url + '/sys/message',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          openid: getApp().globalData.userInfo.openid,
          orgId: getApp().globalData.userInfo.grade,
          userId: getApp().globalData.userInfo.id,
          userName: getApp().globalData.userInfo.name,
          message: message,
          photo: that.data.pics.join(';')
        },
        success: function (res) {
          if (res.data.code == 200) {
            wx.hideLoading();
            wx.showToast({
              title: '发布成功',
              icon:'none'
            })
            that.setData({
              message: '',
              pics: []
            })
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
        icon:'none'
      })
    }
    
  },
  uploadimg(data){
    wx.showLoading({
      title: '上传中',
    })
    console.log(data)
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
        var data = JSON.parse(resp.data)
        if(data.success){
          success++;
          var pcs = that.data.pics;
          pcs.push(data.fileName)
          that.setData({
            pics:pcs
          })
        }
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用   
          wx.hideLoading()       
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          setTimeout(function(){
            that.uploadimg(data);
          },500)
          
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