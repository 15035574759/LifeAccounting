// pages/user/user.js
var app = getApp()
Page({
  data:{
    avatarUrl:'https://h5php.xingyuanauto.com/FlowProject/charge/public/uploads/images/头像.png',
    username:'',
    ButgedMoney:0,
    openid:'',
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
     wx.setNavigationBarTitle({
      title: '设置'
    })

    //获取用户信息
    app.getUserInfo(function (userInfo) {
        console.log(userInfo)
        // console.log("用户信息")
         var nickName = userInfo.nickName
         var avatarUrl = userInfo.avatarUrl
         that.setData({avatarUrl:avatarUrl})
         that.setData({username:nickName})
    })


    //查询当前用户是否开启预算
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
        that.setData({openid:openid})
        //查询当前用户好友数据
        wx.request({
          url: app.url + 'set/BudgetStart', //查询当前用户是否开启预算
          data: {openid:openid},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
            if(res.data.butged_start == 1){
              //关闭状态
              that.setData({ButgedMoney:res.data.butged})//赋值预算金额
            }
            else
            {
              that.setData({ButgedMoney:'未开启'})//赋值预算金额
            }
          },
          fail:function() {
              wx.showToast({
                title: '数据请求失败',
                icon: 'success',
                duration: 2000
              })
          }
        })
      }
    })
  },
  onPullDownRefresh: function(){
    this.onLoad()
    wx.stopPullDownRefresh()
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