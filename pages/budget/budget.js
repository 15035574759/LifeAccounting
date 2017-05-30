// pages/budget/budget.js
var app = getApp()
Page({
  data:{
    GetSwitchShow:'none',
    checked:'false',
    openid:'',
    ButgedMoney:0,//预算金额
    flag:'none'
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '预算设置'
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
            that.setData({ButgedMoney:res.data.butged})//赋值预算金额
            if(res.data.butged_start == 0){
              //关闭状态
              that.setData({checked:'flase'})
            }
            else if(res.data.butged_start == 1){
              //开启状态
              that.setData({checked:'true'})
            }

            //显示或者不显示预算金额
            var checked = that.data.checked
            if(checked == 'true')
            {
                that.setData({GetSwitchShow:'show'})
            }
            else
            {
                that.setData({GetSwitchShow:'none'})
            }
            console.log("开启预算")
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
  switchChange:function(e){//开关事件
    var switch_start = e.detail.value
    var openid = this.data.openid
    if(switch_start == true)
    {
        this.setData({GetSwitchShow:'show'})
        //开启预算金额
         wx.request({
          url: app.url + 'set/BudgetOpen', //开启预算
          data: {openid:openid},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
           
            console.log("开启预算")
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
    else
    {
        this.setData({GetSwitchShow:'none'})
        //关闭预算金额
         wx.request({
          url: app.url + 'set/BudgetClose', //关闭预算
          data: {openid:openid},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
           
            console.log("关闭预算")
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
  },
  BoxButged:function(){//显示弹框
    // console.log("555")
    this.setData({flag:'show'})
  },
  bindKeyInput:function(e){//设置预算金额
    var ButgedMoney = e.detail.value;
    this.setData({ButgedMoney:ButgedMoney})
  },
  ButgedCancel:function(){//设置预算金额点击取消
    this.setData({flag:'none'})
  },
  ButgedConfirm:function(){//设置预算金额点击确定  修改数据库预算金额
    this.setData({flag:'none'})//先进性隐藏
    var openid = this.data.openid;
    var butgedMoney = this.data.ButgedMoney
    //修改数据库预算金额
     wx.request({
          url: app.url + 'set/BudgetMoneyUpdate', //修改预算金额
          data: {openid:openid,butgedMoney:butgedMoney},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
            console.log("修改预算金额")
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
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log("onShow");
    
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})