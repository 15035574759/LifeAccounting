// pages/show/show_list/show_list.js
var app = getApp()
Page({
  data:{
    a_id:0,
    money:0,
    inout_class:0,
    describe:"工资",
    time:0,
    remark:"未填写",
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
     wx.setNavigationBarTitle({
      title: '明细'
    })
    var a_id = options.a_id
    wx.request({
    url: app.url + 'check/CheckFind', //仅为示例，并非真实的接口地址
    data: {a_id:a_id},
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      that.setData({'money':res.data.money})
      that.setData({'inout_class':res.data.inout_class})
      that.setData({'describe':res.data.describe})
      that.setData({'time':res.data.time})
      that.setData({'remark':res.data.remark})
      that.setData({'a_id':res.data.a_id})
    }
  })
  },
  GetDel:function(event){//删除数据
    wx.showModal({
      title: '提示',
      content: '你确定要删除吗',
      success: function(res) {
        if (res.confirm) {
          var a_id = event.currentTarget.dataset.lastid
          wx.request({
            url: app.url + 'check/CheckDel', //删除数据
            data: {a_id:a_id},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if(res.data.start == 1){
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                  wx.switchTab({
                      url: '../show'
                  })
                }
                else
                {
                  wx.showToast({
                    title: '删除失败',
                    icon: 'success',
                    duration: 2000
                  })
                  wx.switchTab({
                      url: '../show'
                  })
                }
            }
          })
        }
      }
    })
    
  },
  GetSave:function(event){//修改数据

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