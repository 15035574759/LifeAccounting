// pages/statistics/statistics.js
var app = getApp()
Page({
  data:{
    IncomeType:"warn",
    ExpendType:"default",
    IncomeDisplay:"show",
    ExpendDisplay:"none",
    inout_start:1,
    avatarUrl:"../../images/user.png",
    desc:"加油",
    date: '2017-01-01',
    remark_length:0,
    array:[
      {
        "img-id":"img01",
        "src":"../../images/交通.png",
        "desc":"交通"
      },
      {
        "img-id":"img02",
        "src":"../../images/服饰.png",
        "desc":"服饰"
      }
    ],
    inoutClass:[],
    expendClass:[]
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  DefaultIncome:function(e){//收入选项卡
    this.setData({"inout_start":"1"})//将收入支出状态改为1
    this.setData({"IncomeDisplay":"block"})
    this.setData({"ExpendDisplay":"none"})
    this.setData({"ExpendType":"default"})
    this.setData({"IncomeType":"warn"})
  },
  DefaultExpend:function(e){//支出选项卡
    // console.log("55")
    this.setData({"inout_start":"2"})//将收入支出状态改为2
    this.setData({"ExpendDisplay":"none"})
    this.setData({"ExpendDisplay":"show"})
    this.setData({"IncomeDisplay":"none"})
    this.setData({"ExpendType":"warn"})
    this.setData({"IncomeType":"default"})
  },
  BillClassClick:function(e){//图标样式
    var topImges = e.target.dataset.imgurl
    // var display = {}; 
    var topDesc = e.target.dataset.desc;
    this.setData({"avatarUrl":topImges});
    this.setData({"desc":topDesc});
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var inout_start = this.data.inout_start//支出与收入状态
    wx.getStorage({
      key: 'openid',
      success: function(res) {
         var openid = res.data
          wx.request({
            url: app.url + 'check/charge', //仅为示例，并非真实的接口地址
            data: {
              openid:openid,
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
            }
        })
      } 
    })
  },
  bindKeyInput:function(e){
    var StringLength = e.detail.value.length
    this.setData({"remark_length":StringLength})
    if(StringLength > 10){
      wx.showToast({
        title: '文字内容不得超过10个汉字',
        icon: 'success',
        duration: 2000
      })
    }
  },
  onLoad:function(options){
     var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
        url: app.url + 'check/inoutClass', //仅为示例，并非真实的接口地址
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.ExpendData)
          that.setData({ inoutClass: res.data.ExpendData })//收入数据赋值
          that.setData({ expendClass: res.data.IncomeData })//支出数据赋值
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