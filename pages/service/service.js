// pages/service/service.js
var app = getApp()
Page({
  data:{
    avatarUrl:'',
    username:'',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //获取用户信息
    app.getUserInfo(function (userInfo) {
        console.log(userInfo)
        // console.log("用户信息")
         var nickName = userInfo.nickName
         var avatarUrl = userInfo.avatarUrl
         that.setData({avatarUrl:avatarUrl})
         that.setData({username:nickName})
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