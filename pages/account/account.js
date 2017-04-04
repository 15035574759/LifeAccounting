// pages/account/account.js
var app = getApp()
Page({
  data:{
    username:'',
    avatarUrl:'',
    circleData:[],
  },
  GetDelete:function(){
    wx.showModal({
      title: '提示',
      content: '你确定删除吗',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //获取用户信息
    var that = this
    app.getUserInfo(function (userInfo) {
        console.log(userInfo)
         var nickName = userInfo.nickName
         var avatarUrl = userInfo.avatarUrl
         that.setData({avatarUrl:avatarUrl})
         that.setData({username:nickName})
    })
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
         wx.request({
          url: app.url + 'circle/circleUser', //查询当前用户下所有圈子
          data: {openid:openid},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
            that.setData({circleData:res.data})
          }
        })
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
  },
  onUnload:function(){
    // 页面关闭
  }
})