// pages/account/account.js
var app = getApp()
Page({
  data:{
    username:'',
    avatarUrl:'https://h5php.xingyuanauto.com/FlowProject/charge/public/uploads/images/头像.png',
    circleData:[],
  },
  GetDelete:function(e){
    var cir_id = e.target.dataset.id
    wx.showModal({
      title: '提示',
      content: '你确定删除吗',
      success: function(res) {
        if (res.confirm) {
           wx.request({
              url: app.url + 'circle/circleDel', //删除当前用户下圈子
              data: {cir_id:cir_id},
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data)
                if(res.data.code == 1)
                {
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000
                    })
                    wx.navigateTo({//关闭当前页面，跳转到应用内的某个页面。
                        url: 'account'
                    })
                }
                else
                {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'success',
                      duration: 2000
                    })
                }
              }
            })
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
            console.log("当前用户下所有圈子")
            that.setData({circleData:res.data})
          }
        })
      }
    })
  },
  onPullDownRefresh: function(){//下拉刷新页面
    this.setData({circleData:[]})
    this.onLoad();
    wx.stopPullDownRefresh()
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