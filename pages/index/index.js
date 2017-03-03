//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    array: [{
      mode: 'aspectFill',
    }],
    src: '../../images/index.png'
  },
  onLoad: function () {
    wx.redirectTo({
      url: '../show/show'
    })
  }
})
