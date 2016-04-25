# Chart Styles

## CSS

```css
.hm-grid {
    fill: #f00;
    stroke-width: 2;
}

.hm-axis {
}

.hm-category-axis {
}

.hm-value-axis {
}

.hm-axis-labels {
}

.hm-category-axis-labels {
}

.hm-value-axis-labels {
}

.hm-serie {
}

.hm-serie-0,
.hm-serie-1 {
}

.hm-series-area {
}

.hm-series-area-0,
.hm-series-area-1 {
}

.hm-grid-mask {
}

```

Line/bar/area chart classNames

ClassName| Meaning
---------- | -------
hm-grid | 图形网格，可以自定义网格线条颜色等
hm-axis | 可以自定义 axis 轴（包括所有横轴，所有纵轴，所有极坐标轴）相关样式
hm-category-axis | 类目轴（横向图形中的横轴）
hm-value-axis | 数值轴（横向图形中的纵轴）
hm-axis-labels  | 可自定义坐标轴文字的样式
hm-category-axis-labels | 类目坐标轴样式
hm-value-axis-labels | 数值坐标轴样式
hm-serie | 数据展现的线条或者柱
hm-serie-{number} | number对应数据传入时的顺序，可单独定义某条数据展示线的样式
hm-series-area | 面积图面积部分的单独样式
hm-series-area-{number} | 同样 number 对应数据传入的顺序，可单独定义某个面积展现的样式
hm-grid-mask | 整体图形覆盖层，用于事件监听，默认无样式，也不建议修改其样式

<img src="images/svg.png" />

## Settings

```javascript
var settingData = {
    containerId: 'lineContainer',
    xAxis: [
        {
            type: 'category',           // 轴类型，可选 category/value
            position: 'bottom',         // 轴位置，可选 top/right/bottom/left
            axisTick: {
                show: true,             // 是否展示 axis tick
                inside: false,          // 往坐标系内部绘制还是往外绘制
                length: 4,              // tick 长度
                lineStyle: {
                    color: '#dedede',   // tick 颜色
                    width: 1            // tick 宽度
                }
                interval: 0             // 坐标轴 tick 显示规则，可定义间隔多少显示一个 tick
            },
            axisLine: {
                show: true,             // 是否展示 axis line
                style: {
                    width: 1,           // axis line 线条宽度
                    color: '#dedede'    // axis line 线条颜色
                }
            },
            axisLabel: {
                show: true,             // 是否展示
                margin: 10,             // 坐标轴文本标签与坐标轴的间距
                maxLength: 20,          // 最多显示多少位，超出截断
                rotate: 40,             // 可定义该 axis 文字的旋转样式
                textStyle: {
                    color: '#5b5d61',   // axis label color 设置
                    align: 'center',    // axis label 对齐方式，可选为：left/right/center
                    fontFamily: Resource.fontInfo.family,       // axisLabel 字体类型
                    fontSize: Resource.fontInfo.fontSizeSmall,  // axisLabel 字体大小
                    fontStyle: 'normal',                        // 样式，可选为：normal/italic
                    fontWeight: 'normal'                        // 粗细，可选为：normal/bold 
                }
            },
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']  // 类目数据
        }
    ],
    yAxis: [                            // 基本参照 xAixs
        {
            type: 'value',              // 轴类型，可选 category/value
            position: 'left',           // 轴位置，可选 top/right/bottom/left
            axisTick: {
                show: true,
                interval: 'auto',
                inside: false,
                length: 5,
                lineStyle: {
                    color: '#dedede',
                    width: 1
                }
            },
            axisLine: {
                show: true,             // 是否展示 axis line
                style: {
                    width: 1,           // axis line 线条宽度
                    color: '#e6e9ed'    // axis line 线条颜色
                }
            },
            axisLabel: {
                format: '{value}',
                show: true,
                interval: 'auto',
                rotate: 0,
                margin: 10,
                maxLength: 20,
                shareSuffix: false,
                textStyle: {
                    color: '#787a7d',
                    align: 'center',
                    fontFamily: Resource.fontInfo.family,
                    fontSize: Resource.fontInfo.fontSizeSmall,
                    fontStyle: 'normal',
                    fontWeight: 'normal'
                }
            },
            split: 5                    // 纵轴分隔数目
        }
    ],
    series: [                           // 数据
        {
            name: '三星',                // 数据名称，例如`新房客`，`访问时长`，`降水量`等
            yAxis: 1,                   // 如果有多条 y 轴时对应到哪条轴，只有一条数据轴时为 1
            type: 'stack-bar',          // 数据展示类型，可选为 line/bar/area/stack-bar
            stack: '安卓',               // 当 type 为 stack-bar 时可选该参数，可定义此条数据的分组类型
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: ' 台'       // 如果需要单独定义该条数据展示时 tooltip 内坐标时，可以设置此选项
            }
        },
        {
            name: '苹果',
            yAxis: 1,
            type: 'stack-bar',
            stack: 'IOS',
            data: [217.0, 316.9, 419.5, 714.5, 218.2, 321.5, 1115.2, 726.5, 323.3, 418.3, 313.9, 519.6]
        },
        {
            name: '小米',
            yAxis: 1,
            type: 'stack-bar',
            stack: '安卓',
            data: [27.0, 36.9, 41.5, 74.5, 18.2, 32.5, 115.2, 422.5, 123.3, 818.3, 130.9, 19.6]
        }
    ],
    legend: {
        position: 'top-right'           // 可选 legend 的展示位置：top-left/top-center/top-right
    },
    plotOptions: {
        radar: {
            dataLabels: {
                enabled: true,
                showLabelNumber: 5,
                color: '#000',
                connectorColor: '#000'
            },

            showInLegend: true,

            radius: 180,
            margin: [80, 50, 50, 110]
        },
        pie: {
            donut: true,                // 甜甜圈图还是普通饼图
            cursor: 'pointer',          // 鼠标交互时样式
            dataLabels: {
                enabled: true,          // 每个扇区是否展示文字
                showLabelNumber: 5,     // 由于某些数据长尾很多，该选项可控制只显示前多少个扇区的文字
                color: '#000',          // 文字颜色
                connectorColor: '#000'  // 文字与扇区连线的颜色
            },
            animate: false,             // 绘制时是否需要动画
            showInLegend: true,         // 是否需要 legend
            margin: [80, 50, 50, 50]    // 画布 margin
        }
    },
    radius: [130, 90],                  // 设置半径饼图为 {Number}，甜甜圈图为 Array.<Number>
    canvasLayout: {
        orign: {x: 0, y: 0},            // 坐标系原点指定
        margin: [70, 90, 70, 90],       // 上下左右的留白设置
        width: 0,                       // 画布宽度
        height: 0                       // 画布高度
    }
};

// 初始化图形
var chart = hmcharts.create(hmcharts.{{prop}}, settingData);
```

<aside class="notice">以下列举了所有可以自定义的 api 接口信息，使用时可以通过 setting 去覆盖已达到你所需要的样式</aside>

Error Code | Meaning
---------- | -------

