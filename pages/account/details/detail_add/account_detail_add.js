// pages/account/details/detail_add/account_detail_add.js
var app = getApp()
Page({
  data:{
    FriendData:[],//类型图片
    GetPayer:[],//付款人
    GetPayerCount:1,//付款人数量
    GetParticipant:[],//参与人
    GetParticipantId:0,//参与人 id [1,2,3,5]
    DataAllParticipantNum:0,//参与人数量
    CircleAlluserNum:0,//所有人数量
    PayMoney:0,//支付金额
    PaySumMoney:0,//总金额
    ParticipantMoney:0,//参与人支付金额
    c_id:"32",//选中消费类型图片
    remark:0,//备注
    cir_id:0,
    openid_id:0,
  },
  onLoad:function(options){
    var that = this
    var f_id = options.f_id//付款人
    // console.log(f_id)
    // console.log("付款人")
    that.setData({f_id:f_id});

    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '普通消费'
    })
    // 页面初始化 options为页面跳转所带来的参数
     wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
        that.setData({openid_id:openid});

          //获取圈子名称
          var cir_id = options.cir_id;//圈子ID
          that.setData({cir_id:cir_id});
          //显示付款人
          var cir_id = that.data.cir_id
          if(f_id == undefined)
          {
              wx.request({
                url: app.url + 'circle/GetShowpayerEmpty', //如果未选择付款人默认显示本人
                data: {openid:openid,cir_id:cir_id},
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                  console.log(res.data)
                  console.log("参与人数据")
                  that.setData({GetPayer:res.data.AdminData})//赋值支付人数据
                  that.setData({GetParticipant:res.data.DataAllParticipant})//赋值参与人数据
                  that.setData({DataAllParticipantNum:res.data.DataAllParticipantNum})//赋值参与人数量
                  that.setData({GetParticipantId:res.data.DataAllParticipantID})//赋值参与人Id
                  that.setData({CircleAlluserNum:res.data.CircleAlluserNum})//赋值所有人数量
                  console.log(res.data.DataAllParticipant)
                }
            })
           }
           else
           {
              wx.request({
                url: app.url + 'circle/GetShowpayer', //获取选择的付款人
                data: {openid:openid,cir_id:cir_id,f_id:f_id},
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                  console.log(res.data)
                  that.setData({GetPayer:res.data.GetpayerData})//赋值支付人数据
                  that.setData({GetPayerCount:res.data.CountPayCount})//赋值支付人数量
                  that.setData({GetParticipant:res.data.DataAllParticipant})//赋值参与人数据
                  that.setData({DataAllParticipantNum:res.data.DataAllParticipantNum})//赋值参与人数量
                  that.setData({GetParticipantId:res.data.DataAllParticipantID})//赋值参与人Id
                  that.setData({CircleAlluserNum:res.data.CircleAlluserNum})//赋值所有人数量
                  console.log("获取所选付款人")
                }
              })
           }
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
  bindTextAreaBlur:function(e){//备注数据 键盘抬起事件
    var remark = e.detail.value
    //判断备注文章长度
    var remarkLength = e.detail.value.length
    if(remarkLength > 29)
    {
        wx.showToast({
        title: '文字内容不得超过30个汉字',
        icon: 'success',
        duration: 2000
      })
        return false
    }
    else
    {
      this.setData({remark:remark})//赋值备注数据
    }
    
  },  
  GetPutmoney:function(event){//输入金额 键盘抬起事件
    //修改支付人金额
    var PayCount = this.data.GetPayerCount
    var Money = event.detail.value
    this.setData({PaySumMoney:Money})//赋值总金额
    var ParMoney = Money / PayCount
    this.setData({PayMoney:ParMoney})//赋值支付人付款金额

    //修改参与人支付金额
    var CircleAlluserNum = this.data.CircleAlluserNum//所有人数量  
    console.log(CircleAlluserNum)
    console.log("参与人消费金额")
    var ParticipantParMoney = Math.round(Money / CircleAlluserNum*100)/100

    // var ParticipantParMoney = num.toFixed(2);
    this.setData({ParticipantMoney:ParticipantParMoney})
  },
  GetCharge:function(e){//开始记账
      var c_id = this.data.c_id//记账分类
      var PaySumMoney = this.data.PaySumMoney//总支出
      // console.log(PaySumMoney)
      // console.log("55555555");
      var f_id = this.data.f_id//付款人
      var remark = this.data.remark//备注
      var friend_id = this.data.GetParticipantId//参与人 id
      var cir_id = this.data.cir_id//参与人
      var openid_id = this.data.openid_id//参与人
      var sum_money = this.data.ParticipantMoney//参与人消费金额
      if(PaySumMoney == 0)
      {
        wx.showToast({
          title: '请填写消费金额',
          icon: 'success',
          duration: 2000
        })
        return false;
      }

      if(remark == 0)
      {
        wx.showToast({
          title: '请填写备注信息',
          icon: 'success',
          duration: 2000
        })
        return false;
      }
      wx.request({
        url: app.url + 'circle/AddCircle', //添加记账
        data: {
          cir_id:cir_id,
          openid:openid_id,
          c_id:c_id,
          f_id:f_id,
          friend_id:friend_id,
          PaySumMoney:PaySumMoney,
          remark:remark,
          sum_money:sum_money,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data)
          if(res.data.msg == 1)
          {
              wx.showToast({
                title: '记账成功',
                icon: 'success',
                duration: 2000
              })
              wx.redirectTo({//返回上一页面
                url: '../account_details?cir_id='+cir_id
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
      // console.log(GetParticipant)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that = this
    // 页面显示
    // 显示账单类型图片
    wx.request({
      url: app.url + 'circle/ChargeGetimg', //获取添加账单图片
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({FriendData:res.data})//赋值全部成员数据
        console.log("获取添加账单图片")
      }
    })
  },
  BillClassClick:function(e){//选中消费图标
    var c_id = e.target.dataset.id
    this.setData({c_id:c_id})//赋值全部成员数据
  },
  GetPayer:function(){//选择付款人
    var cir_id = this.data.cir_id
    var openid = this.data.openid
    wx.redirectTo({
      url: 'payer/payer?cir_id='+cir_id
    })
    console.log("选择付款人")
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})