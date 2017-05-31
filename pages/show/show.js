// pages/show/show.js
var app = getApp()
Page({
  data:{
    username:'',
    avatarUrl:'',
    money:0,
    incomes:0,
    pay:0,
    display:"none",
    BillDisplay:"show",
    AccountBookDisplay:"none",
    newsList:[],
    lastid: 0,
    Loading: true,//加载中 默认 true
    moreHidden: 'none',//默认加载更多true
    budget:0,//预算金额状态
    budgetMoney:0,//预算余额金额
    openid:'',
    ResidueBox:'none',//预算余额是否显示
    SurplusBox:'show',//结余余额是否显示
  },
  AccountBook:function(){//账本
     this.setData({"BillDisplay":"none"})
     this.setData({"AccountBookDisplay":"show"})
  },
  Bill:function(){//账单
      this.setData({"BillDisplay":"show"})
      this.setData({"AccountBookDisplay":"none"})
  },
  loadData:function(lastid){
    var that = this;
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
        console.log(lastid)
        // console.log(5555)
         var openid = res.data
         var limit = 3;
          wx.request({
            url: app.url + 'check/UserCheck', //调用用户账单
            data: {openid:openid,limit:limit,lastid:lastid},
            success: function(res) {
              console.log(res.data)
              console.log("444");
              //判断数据是否为空
              

              if(res.data.start == 0){
                that.setData({'display':'show'})//没有数据
              }
              else if(res.data.code == -1) //获取用户ID错误
              {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 2000
                })
              }
              else if (!res.data.data) //没有数据了
              {
                wx.showToast({
                  title: '没有更多数据了',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.hideToast()
                }, 2000)
                that.setData({ moreHidden: 'none' })//隐藏加载更多
              }
              else  //成功
              {
                var len = res.data.data.length
                console.log(len);
                var dataArr = that.data.newsList
                var newData = dataArr.concat(res.data.data)
                that.setData({ newsList: newData })//数据赋值
                // that.setData({ newsList: res.data.data })//数据赋值
                that.setData({ lastid: res.data.data[len - 1].a_id })

                that.setData({ money: res.data.MonthBalance})//赋值月预算余额
                that.setData({ incomes: res.data.MonthIncome})//赋值月收入
                that.setData({ pay: res.data.MonthExpend})//赋值月支出
                that.setData({ moreHidden: '' })//显示加载更多
              }
            },
            complete: function () {
              //隐藏加载中的提示
              that.setData({ Loading: true })
            }
          })
       }
    })
  },
  onLoad:function(){
    // console.log("onLoad");
    // 页面初始化 options为页面跳转所带来的参数
    //获取用户信息
    var that = this
    app.getUserInfo(function (userInfo) {
        // console.log(userInfo)
         var nickName = userInfo.nickName
         var avatarUrl = userInfo.avatarUrl
         that.setData({avatarUrl:avatarUrl})
         that.setData({username:nickName})
    })

    //查询预算是否开启 
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function(res) {
          var openid = res.data
          that.setData({openid:openid})
           wx.request({
                url: app.url + 'check/BudgetMoney', //查询预算是否开启 
                data: {openid:openid},
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                  console.log(res.data)
                  if(res.data.code == 1)
                  {
                    //预算开启 预算余额显示 赋值数据
                    that.setData({ResidueBox:'show'})
                    that.setData({SurplusBox:'none'})
                    that.setData({budgetMoney:res.data.data})
                  }
                  else
                  {
                     //预算未开启 结余余额显示 赋值数据
                    that.setData({SurplusBox:'show'})
                    that.setData({ResidueBox:'none'})
                  }
                  console.log("查询预算是否开启")
                  // that.setData({ time: res.data.data})//赋值当前时间
                }
            }) 
        },
        fail:function() {
            wx.showToast({
              title: 'openid获取失败',
              icon: 'success',
              duration: 2000
            })
        }
      })
    that.loadData(0);
  },
  onShow:function(){
    // 页面显示
    // var that = this
    // console.log("onShow");
    // this.setData({newsList:[]})
    // this.onLoad()
  },
  onPullDownRefresh: function(){//下拉刷新页面
    this.setData({newsList:[]})
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  loadMore:function(event){//加载更多
    var id = event.currentTarget.dataset.lastid
    // console.log(id);
    this.loadData(id);
  },
  GetNav:function(event){//点击账单跳转页面
    var id = event.currentTarget.dataset.lastid
    wx.navigateTo({
      url: 'show_list/show_list?a_id='+id
    })
  },
  onReady:function(){
    // // 页面渲染完成
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})