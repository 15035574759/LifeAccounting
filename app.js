//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
     //调用登录接口
      wx.login({
        success: function (res) {
          // console.log("code"+res.code);
          if (res.code) {
            wx.request({
              url: that.url + 'login/sendCode', //仅为示例，并非真实的接口地址
              data: {
                code: res.code,
                PHPSESSID: wx.getStorageSync('PHPSESSID')//设置session值
              },
              success: function (res) {
                if(res.data.code == -1){
                   wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000
                  })
                }
                // //缓存session_id
                wx.setStorageSync('PHPSESSID', res.data.PHPSESSID)
                wx.setStorageSync('openid', res.data.openid)

                //获取用户信息
                wx.getUserInfo({
                  success: function (res) {
                    var data = res.encryptedData
                    console.log("加密用户数据")
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)

                    wx.request({//修改用户信息
                      url: that.url + 'login/saveUserInfo', //仅为示例，并非真实的接口地址
                      data: {
                        encryptedData : res.encryptedData,
                        PHPSESSID: wx.getStorageSync('PHPSESSID'),
                        iv:res.iv
                      },
                      success: function (res) {
                        // console.log(res.data)
                        // console.log("返回用户数据")
                      }
                    })
                  },
                  fail:function(){
                    console.log("获取用户信息失败");
                  }
                })
              }
            })
          } else {
              console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  url: "https://www.qinlh.com/charge/public/index.php/port/",
  img_url: "https://www.qinlh.com/charge/public/uploads/images/账本.png"
    // url : "http://localhost/charge/public/index.php/port/"
})
