// pages/account/add/account_add.js
var app = getApp()
Page({
  data:{
    ClassData:[],
    c_id:21,
    openid_id:0,
  },
  formSubmit: function(e) {
    var that = this
    var circle = e.detail.value.name //圈子名称
    var c_id = that.data.c_id
    //开始添加圈子账本
    // 页面初始化 options为页面跳转所带来的参数
     wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
        // console.log(openid)
        that.setData({openid_id:openid})
        //调用接口
        wx.request({
              url: app.url + 'circle/GetAddCircle', //添加圈子账本
              data: {openid:openid,c_id:c_id,circle:circle},
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data)
                if(res.data.code == 1)
                {
                    wx.showToast({
                      title: '添加圈子成功',
                      icon: 'success',
                      duration: 2000
                    })
                    wx.redirectTo({//返回上一页面
                      url: '../account'
                    })
                }
                else
                {
                   wx.showToast({
                      title: res.data.msg,
                      icon: 'success',
                      duration: 2000
                    })
                    wx.redirectTo({//返回上一页面
                      url: '../account'
                    }) 
                }
                console.log("参与人数据")
              }
          })
       }  
    })

  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数\
        wx.request({
          url: app.url + 'Circle/circleAdd_class', //仅为示例，并非真实的接口地址
          data: {},
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
            that.setData({ClassData:res.data})
          }
        })
  },
  BindImg:function(e){
      var c_id = e.target.dataset.id
      this.setData({c_id:c_id})
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
      }
    })
  },
  onUnload:function(){
    // 页面关闭
  }
})