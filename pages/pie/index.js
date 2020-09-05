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
      left:150,
      top:15,
    },
    backgroundColor: "#ffffff",
    color: ["#FF9F7F", "#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C"],
    series: [{
      type: 'pie',
      radius: ['60%', '85%'],
      center:[80,60],
      avoidLabelOverlap: false,
      label: {
        show:false,
        normal: {
          show:false,
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
        name: '待确定订单'
      }, {
        value: 20,
          name: '已确定订单'
      }, {
        value: 10,
          name: '拒绝订单'
      }, {
        value: 20,
          name: '取消订单'
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
