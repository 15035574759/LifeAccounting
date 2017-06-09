//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    src: '../../images/index.jpg',
    second: 3 
  },
  onLoad: function () {
    var that = this
    that.countdown();
    var time = that.data.second
  },
  Skip:function(){//点击跳过
    wx.switchTab({//跳转到首页
        url: '/pages/show/show'
    })
  },
  countdown:function(that){//设置一个倒计时
    var that = this
    var second = that.data.second
     if (second == 0) {
      console.log("倒计时结束");
        wx.switchTab({//跳转到首页
          url: '/pages/show/show'
        })
      return ;
     }
     var time = setTimeout(function(){
      that.setData({
       second: second - 1
      });
      that.countdown(that);
     },1000)
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
