import * as echarts from '../../ec-canvas/echarts';
var app = getApp()
let chart = null;
Page({  
    data:{
      openid:'',
      IncomeColor:'#F8F8F8',//背景颜色
      ExpendColor:'#FF8800',
      incomeFontColor:'#FF8800',//字体颜色
      expendFontColor:'#FFFFFF',
      IncomeDisplay:"none",//收入显示状态
      ExpendDisplay:"show",//支出显示状态
      mypie_stsrt:2, //1 支出  2 收入
      TotalParice:0,//总的金额
      totalStart:'总支出',//收入  支出
      IncomeData:[],//收入数据
      ExpendData:[],//支出数据
      IncomeMonerArray:[],//收入金额
      IncomeColorArray:[],//收入金额颜色
      ExpendMonerArray:[],//支出金额
      ExpendColorArray:[],//支出金额颜色
      ExpendTotalMoney:0,//支出总金额
      IncomeTotalMoney:0,//收入总金额
      ColumnarExpendMonths:[], //柱状图支出月份
      ColumnarIncomeMonths:[], //柱状图收入月份
      ColumnarExpendMoney: 0, //柱状图支出金额
      ColumnarIncomeMoney: 0, //柱状图收入金额
      active: 1, //tab切换默认选中
      ec: {
        onInit: initChart
      },
      startDate: '2019-06',
      choceDate: '2019-06',
      ExpendIncome: '支出',
    },
    onClickDefault:function(event) {
      if (event.detail.index == 0) {
        this.setData({ "inout_start": 1 })//改变收入状态
        this.setData({ "ExpendDisplay": "none" })
        this.setData({ "IncomeDisplay": "block" })
        this.setData({ "mypie_stsrt": 1 })//改变收入状态
        this.setData({ "ExpendIncome": '收入' })
        this.GetCreateColors();//切换饼图数据
        this.init_bar(this.data.ColumnarIncomeMonths, this.data.ColumnarIncomeMoney);//切换柱状图数据
      } else {
        this.setData({ "inout_start": 2 })//将收入支出状态改为2
        this.setData({ "ExpendDisplay": "show" })
        this.setData({ "IncomeDisplay": "none" })
        this.setData({ "mypie_stsrt": 2 })//改变支出状态
        this.setData({ "ExpendIncome": '支出' })
        this.GetCreateColors();//切换饼图数据
        this.init_bar(this.data.ColumnarExpendMonths, this.data.ColumnarExpendMoney);//切换柱状图数据
      }
    },
    onLoad:function(event){
      var _this = this;
      _this.GetTimeDate(); //获取默认时间
      // 页面初始化 options为页面跳转所带来的参数
      this.UserInfoOpenid(function (openid){
        if(openid) {
          _this.GetShowYearMoneyData(openid); //获取本年度每个月的收支金额
          _this.GetThisMonthBudget(openid, _this.data.choceDate); //获取本月收支明细数据 饼图数据
        } else {
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'success',
            duration: 2000
          })
        }
      }); //获取用户openid
    },
    onShow: function() {  
      // 页面渲染完成 
      this.barComponent = this.selectComponent('#mychart-dom-bar'); //获取页面柱状图标签元素
    },
    GetShowYearMoneyData(openid) { //获取柱状图每个月收入支出数据
      var that = this;
      wx.request({
        url: app.url + 'check/ShowYearMoneyData', 
        data: { openid: openid },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var ExpendMonths = []; //支出月份
          var ExpendMoney = [];//支出金额
          var IncomeMonths = [];//收入月份
          var IncomeMoney = [];//收入金额
          for (var index in res.data.data.ExpendTotalMoneyArray) { //支出数据
            ExpendMonths.push(res.data.data.ExpendTotalMoneyArray[index]['months']);
            ExpendMoney.push(res.data.data.ExpendTotalMoneyArray[index]['money']);
          }
          //默认展示支出数据
          that.init_bar(ExpendMonths, ExpendMoney);
          that.setData({ ec: { onInit : initChart }});//重新初始化修改渲染柱状图数据
          for (var index in res.data.data.IncomeTotalMoneyArray) { //收入数据
            IncomeMonths.push(res.data.data.IncomeTotalMoneyArray[index]['months']);
            IncomeMoney.push(res.data.data.IncomeTotalMoneyArray[index]['money']);
          }
          //修改柱状图数据
          that.setData({ ColumnarExpendMonths: ExpendMonths }); //柱状图支出月份
          that.setData({ ColumnarIncomeMonths: IncomeMonths }); //柱状图收入月份
          that.setData({ ColumnarExpendMoney: ExpendMoney }); //柱状图支出金额
          that.setData({ ColumnarIncomeMoney: IncomeMoney }); //柱状图收入金额
        },
        fail: function () {
          wx.showToast({
            title: '获取数据失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
    GetThisMonthBudget(openid, time) { //获取本月收支明细数据
      var that = this
      //获取用户身份
      wx.request({
        url: app.url + 'check/ThisIncomOut', //查询本月收入与支出数据
        data: { openid: openid, time: time},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data)
          // console.log("查询本月收入与支出数据")
          if (res.data.code == -1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          }
          that.setData({ IncomeData: res.data.IncomeData })//赋值收入数据
          that.setData({ ExpendData: res.data.ExpendData })//赋值支出数据
          that.setData({ IncomeMonerArray: res.data.IncomeMonerArray })//收入金额
          that.setData({ ExpendMonerArray: res.data.ExpendMonerArray })//支出金额
          that.setData({ IncomeTotalMoney: res.data.IncomeTotalMoney })//收入总金额
          that.setData({ ExpendTotalMoney: res.data.ExpendTotalMoney })//支出总金额
          that.setData({ ExpendColorArray: res.data.ExpendColorArray })//支出颜色
          that.setData({ IncomeColorArray: res.data.IncomeColorArray })//收入颜色
          that.GetCreateColors(); //绘画饼图之前进行数组状态判断
        },
        fail: function () {
          wx.showToast({
            title: '获取数据失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
      wx.setNavigationBarTitle({
        title: '本月数据统计'
      }) 
    },
    GetCreateColors() { //绘画饼图之前进行状态判断
      var that = this;
      // 画饼图  
      // 数据源 
      var mypie_start = that.data.mypie_stsrt
      if (mypie_start == 2) {//1 支出
        var ExpendMonerArray = that.data.ExpendMonerArray //获取支金额数组
        if (ExpendMonerArray.length == 0) {
          wx.showToast({
            title: '您本月没有支出记录',
            icon: 'success',
            duration: 2000
          })
          that.setData({ TotalParice: 0 })//支出总金额
          that.setData({ totalStart: "总支出" })//收入还是支出
          var array = [100];
          var colors = ["#E4E4E4"];
        }
        else {
          var ExpendColorArray = that.data.ExpendColorArray //获取支出颜色数组
          // console.log(ExpendMonerArray)
          var array = ExpendMonerArray //赋值
          var colors = ExpendColorArray   //赋值
          that.setData({ TotalParice: that.data.ExpendTotalMoney })//支出总金额
          that.setData({ totalStart: "总支出" })//收入还是支出
        }

      }
      else if (mypie_start == 1) {// 收入
        var IncomeMonerArray = that.data.IncomeMonerArray //获取支金额数组
        console.log(IncomeMonerArray)
        // console.log(IncomeMonerArray.length)
        console.log("用户点击收入")
        if (IncomeMonerArray.length == 0) {
          wx.showToast({
            title: '您本月没有收入记录',
            icon: 'success',
            duration: 2000
          })
          that.setData({ TotalParice: 0 })//收入总金额
          that.setData({ totalStart: "总收入" })//收入还是支出
          var array = [100];
          var colors = ["#E4E4E4"];
        }
        else {
          var IncomeColorArray = that.data.IncomeColorArray //获取支出颜色数组
          var array = IncomeMonerArray //赋值
          var colors = IncomeColorArray   //赋值
          that.setData({ TotalParice: that.data.IncomeTotalMoney })//收入总金额
          that.setData({ totalStart: "总收入" })//收入还是支出
        }
        // var array = [ 20, 30, 40, 50, 60, 70];  
        // var colors = [ "#ff0000", "#ffff00", "#00ff00", "#ff8800", "#3A3736", "#F29289"];
      }

      that.GetCreate(array, colors)
    },
    UserInfoOpenid(Callback) { //获取用户OpenId
      var that = this;
      wx.getStorage({//获取当前用户openid
        key: 'openid',
        success: function (res) {
          var openid = res.data
          that.setData({ openid: res.data });
          typeof Callback == "function" && Callback(openid)
        },
        fail: function () {
          wx.showToast({
            title: 'oppenId 获取失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
    GetTimeDate() { //获取默认本月时间
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      var n = timestamp * 1000;
      var date = new Date(n);
      var Y = date.getFullYear();
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      this.setData({
        choceDate: Y + '年' + M + '月'
      })
    },
    GetCreate: function (array, colors) { //使用wx.createContext获取绘图上下文context
      var context = wx.createCanvasContext();
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
            //画中间小圆
            context.beginPath(); 
            context.arc(point.x, point.y, radius/2 - 10, 0, 2 * Math.PI, false);
            // //      3.连线回圆心  
            // context.lineTo( point.x, point.y );  
            //      4.填充样式  
            context.setFillStyle( "#FFFFFF" );  
            //      5.填充动作  
            context.fill();  
            context.closePath();  
            context.save();

            //在小圆中间写文字 总支出
            context.setFontSize(14)
            context.setTextAlign('center')
            context.setFillStyle("#FF8800");
            context.fillText(this.data.totalStart, 120, 130);

            //在小圆中间写文字 支出与收入总金额
            context.setFontSize(15);
            context.setTextAlign('center');
            context.setFillStyle("#54514C");
            context.fillText(this.data.TotalParice, 120, 110);

        //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为  
        wx.drawCanvas( {  
            //指定canvasId,canvas 组件的唯一标识符  
            canvasId: 'mypie',   
            actions: context.getActions()  
        }); 
    },
    bindDateChange: function (e) { //获取时间选择器事件
      var time = e.detail.value.split('-');
      this.setData({
        choceDate: time[0]+'年'+time[1]+'月'
      })
      this.GetThisMonthBudget(this.data.choceDate);
    },
    init_bar: function (ExpendMonths, ExpendMoney) { //渲染柱状图数据
      this.barComponent.init((canvas, width, height) => {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        var option = {
          color: ['#9170D9'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            // bottom: '3%',
            height: '280',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ExpendMonths,
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              tooltip: {
                show: true,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '￥{c}',
                    textStyle: {
                      color: '#9170D9'
                    }
                  }
                }
              },
              barWidth: '50%',
              data: ExpendMoney
            }
          ]
        };
        chart.setOption(option);
        return chart;
      })
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
    onHide:function(){
      // 页面隐藏
    },
    onUnload:function(){
      // 页面关闭
    }
})

//默认初始化方法
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {};
  chart.setOption(option);
  return chart;
}