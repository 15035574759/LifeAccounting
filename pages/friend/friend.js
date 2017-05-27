// pages/friend/friend.js
var app = getApp()
Page({
  data:{
    'openid':0,
    MyFriend:[],
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
     wx.setNavigationBarTitle({
      title: '我的好友'
    })

     wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data

        //查询当前用户好友数据
        wx.request({
        url: app.url + 'friend/MyFriend', //查询我的好友
        data: {openid:openid},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          var MyFriend = that.setData({MyFriend:res.data});//赋值我的好友数据
          console.log(res.data)
          console.log("我的好友")
        },
        fail:function() {
            wx.showToast({
              title: '数据请求失败',
              icon: 'success',
              duration: 2000
            })
        }
      })
        console.log(openid)
        console.log("你好")
        that.setData({openid:openid})
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