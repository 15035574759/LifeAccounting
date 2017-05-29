// pages/tally/tally.js
var app = getApp()
Page( {  
    data:{
      openid:'',
      IncomeColor:'#F8F8F8',//背景颜色
      ExpendColor:'#FF8800',
      incomeFontColor:'#FF8800',//字体颜色
      expendFontColor:'#FFFFFF',
      IncomeDisplay:"none",//收入显示状态
      ExpendDisplay:"show",//支出显示状态
      mypie_stsrt:1, //1 支出  2 收入
      TotalParice:'',//总的金额
      totalStart:'总支出',//收入  支出
      IncomeData:[],//收入数据
      ExpendData:[],//支出数据
      IncomeMonerArray:[],//收入金额
      IncomeColorArray:[],//收入金额颜色
      ExpendMonerArray:[],//支出金额
      ExpendColorArray:[],//支出金额颜色
      ExpendTotalMoney:0,//支出总金额
      IncomeTotalMoney:0,//收入总金额
    },
    DefaultIncome:function(e){//收入选项卡
      this.setData({"inout_start":"1"})//将收入支出状态改为1
      this.setData({"IncomeDisplay":"block"})
      this.setData({"ExpendDisplay":"none"})
      this.setData({"IncomeColor":"#FF8800"})//改变背景颜色
      this.setData({"ExpendColor":"#F8F8F8"})
      this.setData({"incomeFontColor":"#FFFFFF"})//字体颜色
      this.setData({"expendFontColor":"#FF8800"})
      this.setData({"mypie_stsrt":0})//改变收入状态
      // this.setData({"TotalParice":"100"})//金额
      // this.setData({"totalStart":"总收入"})//收入还是支出
      this.onShow()
    },
    DefaultExpend:function(e){//支出选项卡
      // console.log("55")
      this.setData({"inout_start":"2"})//将收入支出状态改为2
      this.setData({"ExpendDisplay":"show"})
      this.setData({"IncomeDisplay":"none"})
      this.setData({"IncomeColor":"#F8F8F8"})//改变背景颜色
      this.setData({"ExpendColor":"#FF8800"})
      this.setData({"incomeFontColor":"#FF8800"})//字体颜色
      this.setData({"expendFontColor":"#FFFFFF"})
      this.setData({"mypie_stsrt":1})//改变支出状态
      // this.setData({"TotalParice":"100"})//金额
      // this.setData({"totalStart":"总支出"})//收入还是支出
      this.onShow()
    },
    onLoad:function(){
      // 页面初始化 options为页面跳转所带来的参数
    },
    onShow: function() {  
        // 页面渲染完成 
        var that = this
        //获取用户身份
        wx.getStorage({//获取当前用户openid
          key: 'openid',
          success: function(res) {
            var openid = res.data
            that.setData({openid:res.data})
             wx.request({
              url: app.url + 'check/ThisIncomOut', //查询本月收入与支出数据
              data: {openid:openid},
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data)
                console.log("查询本月收入与支出数据")
                that.setData({IncomeData:res.data.IncomeData})//赋值收入数据
                that.setData({ExpendData:res.data.ExpendData})//赋值支出数据
                that.setData({IncomeMonerArray:res.data.IncomeMonerArray})//收入金额
                that.setData({ExpendMonerArray:res.data.ExpendMonerArray})//支出金额
                that.setData({ExpendColorArray:res.data.ExpendColorArray})//支出颜色
                that.setData({IncomeColorArray:res.data.IncomeColorArray})//收入颜色
               
                // 画饼图  
                // 数据源 
                var mypie_start = that.data.mypie_stsrt
                // console.log(mypie_start)
                // console.log("画饼图")
                if(mypie_start == 1)
                {//1 支出
                    var ExpendMonerArray = that.data.ExpendMonerArray //获取支金额数组
                    var ExpendColorArray = that.data.ExpendColorArray //获取支出颜色数组
                    // console.log(ExpendMonerArray)
                    var array = ExpendMonerArray //赋值
                    var colors = ExpendColorArray   //赋值
                    that.setData({TotalParice:res.data.ExpendTotalMoney})//支出总金额
                    that.setData({totalStart:"总支出"})//收入还是支出
                    
                }
                else if(mypie_start == 0)
                {// 收入
                    var IncomeMonerArray = that.data.IncomeMonerArray //获取支金额数组
                    var IncomeColorArray = that.data.IncomeColorArray //获取支出颜色数组
                    // console.log(IncomeMonerArray)
                    // console.log("宾图")
                    var array = IncomeMonerArray //赋值
                    var colors = IncomeColorArray   //赋值
                    that.setData({TotalParice:res.data.IncomeTotalMoney})//收入总金额
                    that.setData({totalStart:"总收入"})//收入还是支出
                    // var array = [ 20, 30, 40, 50, 60, 70];  
                    // var colors = [ "#ff0000", "#ffff00", "#00ff00", "#ff8800", "#3A3736", "#F29289"];
                }
                  
                that.GetCreate(array,colors)
              },
              fail:function() {
                  wx.showToast({
                    title: '获取数据失败',
                    icon: 'success',
                    duration: 2000
                  })
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
        wx.setNavigationBarTitle({
          title: '本月数据统计'
        }) 
    },
    GetCreate:function(array,colors){
      //使用wx.createContext获取绘图上下文context  
      var context = wx.createContext();
      var total = 0;  
        //    计算总量  
        for( var index = 0;index < array.length;index++ ) {  
            total += array[ index ];  
        }
        // console.log( total );   
        //    定义圆心坐标  
        var point = { x: 120, y: 120 };  
        //    定义半径大小  
        var radius = 120;  
        /*    循环遍历所有的pie */  
         
        for( var i = 0;i < array.length;i++ ) {  
            context.beginPath();  
            //      起点弧度  
            var start = 0; 
            if( i > 0 ) {  
                // 计算开始弧度是前几项的总和，即从之前的基础的上继续作画  
                for( var j = 0;j < i;j++ ) {  
                    start += array[ j ] / total * 2 * Math.PI;  
                }  

            } 

            // console.log( "i:" + i );  
            // console.log( "start:" + start,array[ i ] / total * 2 * Math.PI);  
            //      1.先做第一个pie  
            //      2.画一条弧，并填充成三角饼pie，前2个参数确定圆心，第3参数为半径，第4参数起始旋转弧度数，第5参数终止的弧度数，第6个参数为时针方向-false为顺时针  
            context.arc( point.x, point.y, radius, start, start+array[ i ] / total * 2 * Math.PI,false);  
            //      3.连线回圆心  
            context.lineTo( point.x, point.y );  
            //      4.填充样式  
            context.setFillStyle( colors[ i ] );  
            //      5.填充动作  
            context.fill();  
            context.closePath();  
            context.save();
        }

        //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为  
        wx.drawCanvas( {  
            //指定canvasId,canvas 组件的唯一标识符  
            canvasId: 'mypie',   
            actions: context.getActions()  
        });  
    }
})