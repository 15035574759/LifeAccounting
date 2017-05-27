// pages/account/particulars/account_particulars.js
var app = getApp()
Page({
  data:{
    cbl_id:0,
    cir_id:0,
    CircleData:[],//详情数据
  },
  GetDelete:function(){//删除
    var that = this
    wx.showModal({
      title: '提示',
      content: '你确定删除当前账单吗',
      success: function(res) {
        if (res.confirm) {
          var cbl_id = that.data.cbl_id
          var cir_id = that.data.cir_id
           //调用接口删除账单数据
            wx.request({
              url: app.url + 'circle/DeleteCirclePayment', //查询当前圈子账单明细数据
              data: {cbl_id:cbl_id},
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data)
                console.log("用户点击确定")
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                wx.redirectTo({
                  url: '../details/account_details?id=1&cir_id='+cir_id
                })
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
      }
    })
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    var cir_id = options.cir_id//账单ID
    var cbl_id = options.cbl_id//账单ID
    that.setData({cbl_id:cbl_id}) //赋值账单ID
    that.setData({cir_id:cir_id}) //赋值账单ID

    //调用接口查询明细数据
    wx.request({
      url: app.url + 'circle/CircleDetails', //查询当前圈子账单明细数据
      data: {cbl_id:cbl_id},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({CircleData:res.data});
        console.log("明细数据")
        // wx.setNavigationBarTitle({
        //   title: res.data.circle_name//赋值圈子标题
        // })
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
  GetSettle:function(e){//点击付款状态按钮
    var f_id = e.target.dataset.id
    var cbl_id = this.data.cbl_id
    wx.request({
      url: app.url + 'circle/UpdateCirclePayment', //查询当前圈子账单明细数据
      data: {cbl_id:cbl_id,f_id:f_id},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        if(res.data.code == 1)
        {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 5000,
            complete:function(){
              wx.redirectTo({
                url: 'account_particulars?cbl_id='+cbl_id
              })
            }
          })
        }
        else
        {
          wx.showToast({
            title: '支付失败',
            icon: 'success',
            duration: 5000
          })
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
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
     wx.setNavigationBarTitle({
      title: '明细'
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})