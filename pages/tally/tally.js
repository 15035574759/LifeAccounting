// pages/tally/tally.js
Page( {  
    data:{
      IncomeColor:'#F8F8F8',//背景颜色
      ExpendColor:'#FF8800',
      incomeFontColor:'#FF8800',//字体颜色
      expendFontColor:'#FFFFFF',
      IncomeDisplay:"none",
      ExpendDisplay:"show",
      mypie_stsrt:'1',
      TotalParice:'0',//总的金额
      totalStart:'总支出',//收入  支出
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
      this.setData({"TotalParice":"100"})//金额
      this.setData({"totalStart":"总收入"})//收入还是支出
      this.onShow()
    },
    DefaultExpend:function(e){//支出选项卡
      // console.log("55")
      this.setData({"inout_start":"2"})//将收入支出状态改为2
      this.setData({"ExpendDisplay":"none"})
      this.setData({"ExpendDisplay":"show"})
      this.setData({"IncomeDisplay":"none"})
      this.setData({"IncomeColor":"#F8F8F8"})//改变背景颜色
      this.setData({"ExpendColor":"#FF8800"})
      this.setData({"incomeFontColor":"#FF8800"})//字体颜色
      this.setData({"expendFontColor":"#FFFFFF"})
      this.setData({"mypie_stsrt":1})//改变支出状态
      this.setData({"TotalParice":"100"})//金额
      this.setData({"totalStart":"总支出"})//收入还是支出
      this.onShow()
    },
    onShow: function() {  
        // 页面渲染完成 
        wx.setNavigationBarTitle({
          title: '本月数据统计'
        }) 
        // 画饼图  
        // 数据源 
        var mypie_start = this.data.mypie_stsrt
        if(mypie_start == 1)
        {
            var array = [ 50, 50, 50, 100]; 
            var colors = [ "#ff0000", "#ffff00", "#00ff00", "#ff8800"];  
        }
        else
        {
            var array = [ 20, 30, 40, 50, 60, 70];  
            var colors = [ "#ff0000", "#ffff00", "#00ff00", "#ff8800", "#3A3736", "#F29289"];
        }
          
        this.GetCreate(array,colors)
    },
    GetCreate:function(array,colors){
      //使用wx.createContext获取绘图上下文context  
      var context = wx.createContext();
      console.log("0201112");
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

            console.log( "i:" + i );  
            console.log( "start:" + start,array[ i ] / total * 2 * Math.PI);  
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