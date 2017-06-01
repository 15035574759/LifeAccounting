// pages/account/details/account_details.js
var app = getApp()
Page({
  data:{
    username:'',
    avatarUrl:'',
    cir_id:0,
    FriendData:[],
    friend_show:'show',
    friend_length:0,
    CircleList:[],
    payMoney:0, //查询当前圈子需要付款金额
    MyconsumeMoney:0, //查询我的消费金额
    AllconsumeMoney:0,  //查询全员消费金额
  },
  onLoad:function(options){
    var that = this
    var cir_id = that.data.cir_id
    if(cir_id == 0)
    {//如果第一次加载获取getcir_id
        var cirid = options.cir_id;//圈子ID
        that.setData({cir_id:cirid})
        var cir_id = that.data.cir_id
    }

    // 页面初始化 options为页面跳转所带来的参数
     wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
          wx.request({
            url: app.url + 'circle/CircleName', //查询当前圈子标题
            data: {cir_id:cir_id,openid:openid},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              console.log("当前圈子标题")
              wx.setNavigationBarTitle({
                title: res.data.circle_name,//赋值圈子标题
                success:function(){
                  console.log("标题设置成功")
                },
                fail:function(){
                  console.log("标题设置失败")
                }
              })
            },
            fail:function() {
                wx.showToast({
                  title: '获取账单标题失败',
                  icon: 'success',
                  duration: 2000
                })
            }
          })
          
        //获取圈子好友
          wx.request({
            url: app.url + 'circle/CircleFriend', //查询当前圈子对应好友
            data: {cir_id:cir_id,openid:openid},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              console.log("查询当前圈子对应好友")
              that.setData({FriendData:res.data.arr})
              that.setData({friend_length:res.data.friend_length})
              // if(res.data.friend_length > 3){
              //   that.setData({friend_show:"show"})
              // }
            }
          })

          //获取当前圈子下我的消费金额  以及我的账单列表
          wx.request({
            url: app.url + 'circle/CircleMyconsume', //获取当前圈子下我的消费金额  以及我的账单列表api
            data: {cir_id:cir_id,openid:openid},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              that.setData({payMoney:res.data.payMoney})
              that.setData({MyconsumeMoney:res.data.MyconsumeMoney})
              that.setData({payMoney:res.data.payMoney})
              that.setData({AllconsumeMoney:res.data.AllconsumeMoney})
              console.log("消费金额  以及我的账单列表")
            }
          })

          //获取当前圈子账单列表
          wx.request({
            url: app.url + 'circle/CircleList', //获取当前圈子账单列表 api
            data: {cir_id:cir_id,openid:openid},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              that.setData({CircleList:res.data})
              console.log("当前圈子账单列表")
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
    // app.getUserInfo(function (userInfo) {
    //     console.log(userInfo)
    //      var nickName = userInfo.nickName
    //      var avatarUrl = userInfo.avatarUrl
    //      that.setData({avatarUrl:avatarUrl})
    //      that.setData({username:nickName})
    // })
  },
  onPullDownRefresh: function(){//下拉刷新页面
    var that = this
    var cir_id = that.data.cir_id
    that.onLoad()
    wx.stopPullDownRefresh()
  },
  GetCharge:function(){
   var cir_id = this.data.cir_id
    wx.navigateTo({//跳转到记账页面
      url: 'detail_add/account_detail_add?cir_id='+cir_id
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