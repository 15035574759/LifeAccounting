// pages/account/details/circle_friend/circle_friend.js
var app = getApp()
Page({
  data:{
    FriendData:[],
    cir_id:0,
    openid:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '成员'
    })
    var that = this
    var cir_id = options.cir_id;//圈子id
    that.setData({cir_id:cir_id})//赋值圈子id
     wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
        that.setData({openid:openid})//赋值openid

        //获取当前圈子好友列表
          wx.request({
            url: app.url + 'circle/CircleFriendAll', //获取当前圈子好友列表 全部成员
            data: {cir_id:cir_id,openid:openid},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              console.log("全部成员信息数据")
              that.setData({FriendData:res.data})//赋值全部成员数据
            },
            fail:function() {
                wx.showToast({
                  title: '数据请求失败',
                  icon: 'success',
                  duration: 2000
                })
            }
          })
      },
      fail:function() {
          wx.showToast({
            title: 'oppenId 获取失败',
            icon: 'success',
            duration: 2000
          })
      }

    })
  },
  AddMember:function(){
    var cir_id = this.data.cir_id
    // var openid = this.data.openid
    
    //添加成员
    wx.navigateTo({
      url: '../circle_friend_add/circle_friend_add?cir_id='+cir_id
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