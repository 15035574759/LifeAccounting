// pages/account/details/circle_friend_add/circle_friend_add.js
var app = getApp()
Page({
  data:{
    cir_id:0,
    openid_id:0,
    FriendData:[],
    f_id:[],
    str:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     var that = this
     wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        var openid = res.data
        that.setData({openid_id:openid});

        //获取圈子名称
          var cir_id = options.cir_id;//圈子ID
          that.setData({cir_id:cir_id});
          
        //获取所有好友
          wx.request({
            url: app.url + 'circle/GetPayer', //查询当前圈子所有好友
            data: {openid:openid,cir_id:cir_id},
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              that.setData({FriendData:res.data})//赋值全部成员数据
              console.log("选择付款人当前圈子所有好友")
            }
          })
      },
      fail:function() {
          wx.showToast({
            title: 'oppenId 获取失败',
            icon: 'success',
            duration: 2000
          })
      }

    })
    //获取用户信息
    app.getUserInfo(function (userInfo) {
        console.log(userInfo)
         var nickName = userInfo.nickName
         var avatarUrl = userInfo.avatarUrl
         that.setData({avatarUrl:avatarUrl})
         that.setData({username:nickName})
    })
  },
  onPullDownRefresh: function(){//下拉刷新页面
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  checkboxChange: function(e){//判断用户所选的付款人复选框的值

    var f_id = e.detail.value;//当前点击的value 值，若为未选中状态，为“”；
    var no_id=e.target.dataset.id;//当前点击的data-id
    
    // 判断当前是否被选中
    if(f_id == "" || f_id == undefined){
      //取消选中,删除已添加的value
      if(this.data.f_id.length>0){
          for(var i=0;i<this.data.f_id.length;i++){
            if(this.data.f_id[i]==no_id){
                this.data.f_id.splice(i,1);
            }
          }
      }else{
        return false;
      }
    }else{
      //添加value
      this.data.f_id.push(f_id[0]);
    }
  },
  GetButton:function(){//点击完成按钮
    //拼接value
    var str = this.data.f_id.join(",");//用户最终选择的数据   例如：【1,2,3】
    var cir_id = this.data.cir_id;//用户圈子id
    // console.log(str);
    wx.redirectTo({//返回上一页面
      url: '../account_detail_add?f_id='+str+'&cir_id='+cir_id
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