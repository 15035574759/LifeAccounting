// pages/show/show.js
var app = getApp()
Page({
  data:{
    username:'',
    avatarUrl:'',
    money:0,
    incomes:0,
    pay:0,
    BillDisplay:"show",
    AccountBookDisplay:"none",
    newsList:[{
          "id":"10",
          "time":"2017-2-16",
          "month_income":300,
          "month_pay":50,
          "array":[{
            "month_img":"../../images/user.png",
            "month_name":"工资",
            "month_desc":"晚餐",
            "month_money":300,
            "imgs_br":"11"
          },
          {
            "month_img":"../../images/user.png",
            "month_name":"工资",
            "month_desc":"晚餐",
            "month_money":300,
            "imgs_br":"22"
          }]
        },
        {
          "id":"10",
          "time":"2017-2-16",
          "month_income":300,
          "month_pay":50,
          "array":[{
            "month_img":"../../images/user.png",
            "month_name":"工资",
            "month_desc":"晚餐",
            "month_money":300,
            "imgs_br":"33"
          },
          {
            "month_img":"../../images/user.png",
            "month_name":"工资",
            "month_desc":"晚餐",
            "month_money":300,
            "imgs_br":"44"
          }]
        }]
  },
  AccountBook:function(){//账本
     this.setData({"BillDisplay":"none"})
     this.setData({"AccountBookDisplay":"show"})
  },
  Bill:function(){//账单
      this.setData({"BillDisplay":"show"})
      this.setData({"AccountBookDisplay":"none"})
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