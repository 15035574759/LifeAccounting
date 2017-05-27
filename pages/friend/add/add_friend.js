// pages/friend/add/add_friend.js
var app = getApp()
Page({
  data:{
    openid:0,//用户openid
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '添加好友'
    })

    //获取用户openid
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
        // console.log(openid)
        that.setData({openid:openid})
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
   formSubmit: function(e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var openid = this.data.openid
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(phone == "" || name == "")
    {
      wx.showToast({
        title: '手机号码或者姓名不能为空',
        icon: 'success',
        duration: 2000
      })
      return false
    }
    else
    {
      if(!myreg.test(phone)) 
      { 
         wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'success',
          duration: 2000
        })
        return false  
      } 
    }

    //开始添加入库数据
     wx.request({
        url: app.url + 'friend/friend_add', //查询当前圈子标题
        data: {phone:phone,name:name,openid:openid},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          // console.log(res.data)
         if(res.data.code = 1)
         {
            wx.showToast({
              title: '添加用户成功',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({//返回上一页面
              url: '../friend'
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
              url: '../friend'
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
    //页面显示
    var that = this
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})