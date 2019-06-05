import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          show: false,
        },
        splitLine: {
          show : false,
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show : false,
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
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  // onShareAppMessage: function (res) {
  //   return {
  //     title: 'ECharts 可以在微信小程序中使用啦！',
  //     path: '/pages/index/index',
  //     success: function () { },
  //     fail: function () { }
  //   }
  // },
  data: {
    ec: {
      onInit: initChart
    }
  },

  // onReady() {
  //   setTimeout(function () {
  //     // 获取 chart 实例的方式
  //     console.log(chart)
  //   }, 2000);
  // }
});
