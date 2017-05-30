// pages/statistics/statistics.js
var app = getApp()
Page({
  data:{
    IncomeType:"default",
    ExpendType:"warn",
    IncomeDisplay:"none",
    ExpendDisplay:"show",
    getShow:false,
    inout_start:2,
    avatarUrl:"/images/吃喝玩乐.png",
    desc:"吃喝",
    c_id:"1",
    date: '2017-01-01',
    remark_length:0,
    inoutClass:[],//收入数据
    expendClass:[],//支出数据
  },
  bindDateChange: function(e) {//日期选择
    var getdate = e.detail.value 
    var that = this
    //对时间进行判断 不能选择未来日期
    wx.request({
      url: app.url + 'check/TimeJson', //仅为示例，并非真实的接口地址
      data: {getdate:getdate},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        var timeDate = res.data.date
        if(res.data.start == 1)
        {
          that.setData({'date': getdate})//赋值数据
        }
        else
        {
            wx.showToast({
            title: '不能选择未来日期',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  DefaultIncome:function(e){//收入选项卡
    this.setData({"inout_start":"2"})//将收入支出状态改为1
    this.setData({"IncomeDisplay":"block"})
    this.setData({"ExpendDisplay":"none"})
    this.setData({"ExpendType":"default"})
    this.setData({"IncomeType":"warn"})
    this.setData({"avatarUrl":"/images/工资.png"})
    this.setData({"desc":"工资"})
    this.setData({"c_id":11})
  },
  DefaultExpend:function(e){//支出选项卡
    // console.log("55")
    this.setData({"inout_start":"1"})//将收入支出状态改为2
    this.setData({"ExpendDisplay":"none"})
    this.setData({"ExpendDisplay":"show"})
    this.setData({"IncomeDisplay":"none"})
    this.setData({"ExpendType":"warn"})
    this.setData({"IncomeType":"default"})
    this.setData({"avatarUrl":"/images/吃喝玩乐.png"})
    this.setData({"desc":"吃喝"})
    this.setData({"c_id":1})
  },
  BillClassClick:function(e){//图标样式
    var topImges = e.target.dataset.imgurl
    var c_id = e.target.dataset.id
    // var display = {}; 
    var topDesc = e.target.dataset.desc;
    this.setData({"avatarUrl":topImges});
    this.setData({"desc":topDesc});
    this.setData({"c_id":c_id});
  },
  formSubmit: function(e) {//提交表单
    var formData = e.detail.value
    formData.inout_start = this.data.inout_start//支出与收入状态
    formData.inout_class = this.data.c_id//支出与收入状态 id
    formData.money = formData.money;//金额
    formData.remark = formData.remark;//描述
    formData.time = formData.date;
    console.log('form发生了submit事件，携带数据为：', formData)
    if(formData.money == ""){
      wx.showToast({
          title: "请输入金额",
          icon: 'success',
          duration: 2000
        })
    }else if(formData.remark == ""){
      wx.showToast({
          title: "描述不能为空",
          icon: 'success',
          duration: 2000
        })
    }else if(formData.inout_class == ""){
      wx.showToast({
          title: "请选择消费状态",
          icon: 'success',
          duration: 2000
        })
    }
    
    wx.getStorage({
      key: 'openid',
      success: function(res) {
         var openid = res.data

          wx.request({
            url: app.url + 'check/charge', //仅为示例，并非真实的接口地址
            data: {
              openid:openid,
              formData:formData,
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              // console.log(res.data)
              if(res.data.status == 1){
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                  })
                  wx.switchTab({
                      url: '../show/show'
                  }) 
              }
              else
              {
                wx.showToast({
                  title: '添加失败',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
        })
      } 
    })
  },
  bindKeyInput:function(e){//验证备注不得超过10个字
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
    
    //调用账单收入与支出类型列表
    wx.request({
        url: app.url + 'check/inoutClass', //仅为示例，并非真实的接口地址
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.ExpendData)
          that.setData({ inoutClass: res.data.IncomeData })//收入数据赋值
          that.setData({ expendClass: res.data.ExpendData })//支出数据赋值
        }
    })

    //调用当前时间接口
     wx.request({
        url: app.url + 'check/GetTime', //仅为示例，并非真实的接口地址
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data)
          that.setData({ date: res.data})//赋值当前时间
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