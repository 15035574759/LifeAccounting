// pages/account/particulars/account_particulars.js
Page({
  data:{
    circle:"室友"
  },
  GetDelete:function(){//删除
    wx.showModal({
      title: '提示',
      content: '你确定删除当前账单吗',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '明细'
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