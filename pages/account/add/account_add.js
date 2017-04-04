// pages/account/add/account_add.js
var app = getApp()
Page({
  data:{
    ClassData:[],
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数\
        wx.request({
          url: app.url + 'Circle/circleAdd_class', //仅为示例，并非真实的接口地址
          data: {},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            that.setData({ClassData:res.data})
          }
        })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
      }
    })
  },
  onUnload:function(){
    // 页面关闭
  }
})