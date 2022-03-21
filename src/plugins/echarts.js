import echarts from 'echarts'

const install = function (Vue) {
  // 将其挂载到原型属性上
  Object.defineProperties(Vue.prototype, {
    $charts: {
      get () {
        return {
          // 方法，提供外部访问
          chinaMap: function (id, data) {
            // 定义容器接收并初始化
            var chartDom = document.getElementById(id)
            var myChart = echarts.init(chartDom)
            var option = {
              // 鼠标移动上去提示框
              tooltip: {
                triggerOn: 'click', // 事件类型
                enterable: true, // 鼠标是否允许滑入悬浮框中
                // 对数据进行格式化操作
                formatter (data) {
                  return data.name + '<br>' + data.value
                  // return `<a href='/#/city/${ data.name }' style='color:#fff'>省:${data.name}<br/>病例:${ data.value }个</a>`;
                }
              },
              // 将数值的大小映射到明暗度
              visualMap: [{
                // 如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）
                orient: 'vertical',
                type: 'piecewise', // 分段型
                pieces: [ // 匹配数据
                  { min: 0, max: 0, color: '#fff' },
                  { min: 1, max: 10, color: '#fdfdcf' },
                  { min: 10, max: 100, color: '#fe9e83' },
                  { min: 100, max: 1000, color: '#e55a4e' },
                  { min: 1000, max: 100000, color: '#4f070d' }
                ]
              }],
              // 呈现出来的样式的系列（柱状图、饼图...）
              series: [{
                name: '中国地图',
                type: 'map', // 选择类型为地图
                map: 'china', // 中国地图
                roam: false, // 是否允许缩放
                zoom: 1.2, // 放大比例
                label: { // 配置文本
                  normal: {
                    show: true, // 是否允许地图显示文字
                    textStyle: { // 配置字体样式
                      fontSize: 8
                    }
                  }
                },
                // 地图区域多边形图形样式(包含字体颜色、阴影等)
                itemStyle: {
                  // 地图的区域颜色，线和区块的颜色
                  normal: {
                    areaColor: 'rgba(0,255,236,0)',
                    borderColor: 'rgba(0,0,0,0.2)'
                  },
                  // 区域颜色与阴影
                  emphasis: {
                    areaColor: 'rgba(255,180,0,0.8)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0
                  }
                },
                // data: [
                //         { name: "内蒙古", value: 130 },
                //         { name: "新疆", value: 12 },
                //         { name: "西藏", value: 8 },
                //         { name: "青海", value: 0 },
                //     ]
                data
              }]
            }
            myChart.setOption(option)
          }
        }
      }
    }
  })
}

// 导出
export default install
