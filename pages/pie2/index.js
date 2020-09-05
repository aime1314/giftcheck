import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    // title: {
    //   text: '接单信息图',
    //   left: 'center'
    // },
    // tooltip: {
    //   trigger: 'item',
    //   formatter: '{a} <br/>{b} : {c} ({d}%)',
    //   show: true,
    //   trigger: 'axis'
    // },
    legend: {
      orient: 'vertical',
      right:10,
      top:40,
    },
    backgroundColor: "#ffffff",
    color: ["#FF9F7F", "#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C"],
    series: [{
      type: 'pie',
      radius: ['45%', '60%'],
      center:[145,95],
      avoidLabelOverlap: false,
      label: {
        normal: {
          formatter: ' {b|{b}}  \n  {c|{c}} \n\n',       //图形外文字上下显示
          borderWidth: 0,
          borderRadius: 0,
          padding: [0, -10],          //文字和图的边距
          rich: {
            a: {
              fontSize: 14,
              lineHeight: 18
            },
            b: {                        //name 文字样式
              fontSize: 14,
              lineHeight: 18,
              // color: '#CDCDD0'
            },
            c: {                   //value 文字样式
              fontSize: 14,
              lineHeight: 18,
              color: '#333',
              align: "center"
            }
          }
        }
      },
      data: [{
        value: 55,
        name: '待确定'
      }, {
        value: 20,
        name: '已确定'
      }, {
        value: 10,
        name: '已拒绝'
      }, {
        value: 20,
        name: '已取消'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
    }
  },

  onReady() {
  },

  echartInit (e) {
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  }
});
