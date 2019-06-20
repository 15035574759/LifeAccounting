// pages/statistics/statistics.js
var app = getApp()
Page({
  data:{
    // IncomeType:"default",
    // ExpendType:"warn",
    IncomeDisplay:"none",
    ExpendDisplay:"show",
    active:1, //tab切换默认选中
    getShow:false,
    inout_start:2,
    avatarUrl:"https://www.qinlh.com/charge/public/uploads/images/吃喝玩乐.png",
    desc:"吃喝",
    c_id:1,
    date: '2017-01-01',
    remark_length:0,
    inoutClass:[],//收入数据
    expendClass:[],//支出数据
  },
  bindDateChange: function(e) {//日期选择器
    var getdate = e.detail.value //选择时间
    console.log(getdate)
    console.log("选择时间")
    var that = this
    //对时间进行判断 不能选择未来日期
    wx.request({
      url: app.url + 'check/TimeJson', //对时间进行判断 不能选择未来日期
      data: {getdate:getdate},
      header: {'content-type': 'application/json'},
      success: function(res) {
        console.log(res.data)
        var timeDate = res.data.date //获取当前时间
        console.log(timeDate)
        console.log("当前时间")
        if(res.data.start == 1)
        {
          that.setData({'date': getdate})//赋值数据
        }
        else
        {
            wx.showToast({
            title: '不能选择未来日期',
            icon: 'success',
            duration: 2000,
            success:function(){
              that.setData({'date': timeDate})//赋值当前时间
            },
            fail:function(){
              console.log("赋值失败");
            }
          })
        }
      }
    })
  },
  onClickDefault: function(event) {
    if(event.detail.index == 0) {
      this.setData({ "inout_start": 1 })//将收入支出状态改为1
      this.setData({ "IncomeDisplay": "block" })
      this.setData({ "ExpendDisplay": "none" })
      this.setData({ "ExpendType": "default" })
      this.setData({ "IncomeType": "warn" })
      this.setData({ "avatarUrl": "https://www.qinlh.com/charge/public/uploads/images/其他01.png" })
      this.setData({ "desc": "其他" })
      this.setData({ "c_id": 34 })
    } else {
      this.setData({ "inout_start": 2 })//将收入支出状态改为2
      this.setData({ "ExpendDisplay": "none" })
      this.setData({ "ExpendDisplay": "show" })
      this.setData({ "IncomeDisplay": "none" })
      this.setData({ "ExpendType": "warn" })
      this.setData({ "IncomeType": "default" })
      this.setData({ "avatarUrl": "https://www.qinlh.com/charge/public/uploads/images/吃喝玩乐.png" })
      this.setData({ "desc": "吃喝" })
      this.setData({ "c_id": 1 })
    }
  },
  // DefaultIncome:function(e){//收入选项卡
  //   this.setData({"inout_start":1})//将收入支出状态改为1
  //   this.setData({"IncomeDisplay":"block"})
  //   this.setData({"ExpendDisplay":"none"})
  //   this.setData({"ExpendType":"default"})
  //   this.setData({"IncomeType":"warn"})
  //   this.setData({ "avatarUrl":"https://www.qinlh.com/charge/public/uploads/images/其他01.png"})
  //   this.setData({"desc":"其他"})
  //   this.setData({"c_id":34})
  // },
  // DefaultExpend:function(e){//支出选项卡
  //   // console.log("55")
  //   this.setData({"inout_start":2})//将收入支出状态改为2
  //   this.setData({"ExpendDisplay":"none"})
  //   this.setData({"ExpendDisplay":"show"})
  //   this.setData({"IncomeDisplay":"none"})
  //   this.setData({"ExpendType":"warn"})
  //   this.setData({"IncomeType":"default"})
  //   this.setData({ "avatarUrl":"https://www.qinlh.com/charge/public/uploads/images/吃喝玩乐.png"})
  //   this.setData({"desc":"吃喝"})
  //   this.setData({"c_id":1})
  // },
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
    formData.inout_class_name = this.data.desc//支出与收入状态 名称
    formData.money = formData.money;//金额
    formData.remark = formData.remark;//描述
    formData.time = formData.date;
    formData.formId = e.detail.formId;
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
    else
    {
      wx.getStorage({//获取当前用户openid
        key: 'openid',
        success: function(res) {
           var openid = res.data
            // console.log(formData)
            // console.log("formData")
            wx.request({
              url: app.url + 'check/charge', //提交表单，入库操作
              data:{openid:openid,formData:formData},
              header: {'content-type': 'application/json'},
              success: function(res) {
                console.log(res.data)
                if(res.data.status == 1){
                  wx.showToast({
                      title: '添加成功',
                      icon: 'success',
                      duration: 1000,
                      success:function(){
                        wx.reLaunch({//关闭所有页面跳转到指定页面
                            url: '../show/show'
                        }) 
                      },
                      fail:function(){
                        console.log("跳转失败")
                      }
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
    }
  },
  bindKeyInput:function(e){//验证备注不得超过10个字
    var StringLength = e.detail.value.length
    this.setData({"remark_length":StringLength})
    if(StringLength > 20){
      wx.showToast({
        title: '文字内容不得超过20个汉字',
        icon: 'success',
        duration: 2000
      })
    }
  },
  onLoad:function(options){
     var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '添加记账'
    })
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
  onPullDownRefresh: function(){//下拉刷新页面
    this.setData({inoutClass:[]})
    this.setData({expendClass:[]})
    this.onLoad();
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