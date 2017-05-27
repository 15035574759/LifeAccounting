// pages/account/details/circle_friend_add/circle_friend_add.js
var app = getApp()
Page({
  data:{
    username:'',
    avatarUrl:'',
    cir_id:0,
    openid_id:0,
    FriendData:[],
    add_start:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     var that = this
     wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
        that.setData({openid_id:openid});

        //获取圈子名称
          var cir_id = options.cir_id;//圈子ID
          that.setData({cir_id:cir_id});
          
        //获取所有好友
          wx.request({
            url: app.url + 'circle/UserMyFriend', //查询当前圈子所有好友
            data: {openid:openid,cir_id:cir_id},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              that.setData({FriendData:res.data})//赋值全部成员数据
              console.log("查询当前圈子所有好友")
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
    //获取用户信息
    app.getUserInfo(function (userInfo) {
        console.log(userInfo)
         var nickName = userInfo.nickName
         var avatarUrl = userInfo.avatarUrl
         that.setData({avatarUrl:avatarUrl})
         that.setData({username:nickName})
    })

    
    
    //获取圈子对应好友
    wx.request({
      url: app.url + 'circle/circleName', //查询当前圈子好友
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.circle_name)
        wx.setNavigationBarTitle({
          title: res.data.circle_name
        })
      }
    })
  },
  AddFriend:function(e){
    var f_id = e.target.dataset.id
    var openid = this.data.openid_id
    var cir_id = this.data.cir_id
    wx.request({
      url: app.url + 'circle/AddFriend', //查询当前圈子所有好友
      data: {openid:openid,cir_id:cir_id,f_id:f_id},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        console.log("给当前圈子添加好友")
        if(res.data.msg == 1)
        {
          wx.showToast({
            title: '添加好友成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../account_details?cir_id='+cir_id
          })
        }
        else
        {
          wx.showToast({
            title: '添加好友失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  onPullDownRefresh: function(){//下拉刷新页面
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.onLoad()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})