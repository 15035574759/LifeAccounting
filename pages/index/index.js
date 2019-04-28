//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo') ,
    TextContent: '开启'
  },
  onLoad: function () {
    let UserInfo = wx.getStorageSync('USERINFO');
    if (UserInfo) {
      // this.setData({'TextContent':'进入'});
      wx.switchTab({//跳转到首页
        url: '/pages/show/show'
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  bindGetUserInfo(e) { //用户授权
    if (e.detail.userInfo) {
       //获取用户信息 判断是否授权
      app.getUserInfo(function (userInfo) {
        if(userInfo) {
          wx.switchTab({//跳转到首页
            url: '/pages/show/show'
          })
        }
    })
    }
  },
  onShareAppMessage: function () {//转发功能
    return {
      title: '账本小精灵',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})
