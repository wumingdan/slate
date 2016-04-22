---
title: hm-charts API Reference

language_tabs:
  - javascript
  - html
  - css

toc_footers:
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

# Introduction

[hm-charts](https://github.com/wumingdan/hm-charts) 是一个基于修改版 [Raphael](http://dmitrybaranovskiy.github.io/raphael/) 的 SVG/VML 绘图库。

兼容所有高级浏览器，以及 IE6+，如有发现兼容性问题随时联系 [wumingdan](baidu://message/?id=wumingdan2011) 修复。

以下是相关 API 接口以及代码示例。

# APIs

## Namespace

[hm-charts](https://github.com/wumingdan/hm-charts) 在 [webpack](https://webpack.github.io/) 构建之后生成一个全局变量名为 `hmcharts`

`hmcharts` 对象提供了所有已支持图像的原型对象，当你需要使用特定图像时作为参数传入 `hmcharts.create` 方法，所有目前已支持的列表如下

Name | Type | Description
--------- | ------- | -----------
create | Function | 创建所有图像都通过此接口
bubble | Object | 气泡图
flow | Object | 上下游图
heatMap | Object | 点击图（待完善）
maps | Object | 地图合集，可选中国和世界 {china: Object, world: Object}
pie | Object | 饼图
radar | Object | 雷达图
series | Object | 线图/柱状图/面积图/上述3种任意混合图
stackBar | Object | 堆积图

## Line

```javascript
var lineData = {
    containerId: 'lineContainer',
    xAxis: [
        {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    ],
    yAxis: [
        {
            type: 'value',
        }
    ],
    series: [
        {
            name: '新访客',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        },
        {
            name: '旧访客',
            yAxis: 1,
            data: [217.0, 316.9, 419.5, 714.5, 218.2, 321.5, 1115.2, 726.5, 323.3, 418.3, 313.9, 519.6]
        },
        {
            name: 'any访客',
            yAxis: 1,
            data: [27.0, 36.9, 41.5, 74.5, 18.2, 32.5, 115.2, 422.5, 123.3, 818.3, 130.9, 19.6]
        }
    ],
    legend: {
        position: 'top-right'
    }
};

// 初始化图形
var lineChart = hmcharts.create(hmcharts.series, lineData)
```

```html
<div id="lineContainer" class="chart"></div>
```

```css
.chart {
    width: 80%;
    height: 400px;
}

.hm-axis {
    // ...
}

.hm-serie {
    // ...
}

.hm-grid {
    // ...
}

// ...
```

创建一个折线图

### Interface

`var lineChart = hmcharts.create(hmcharts.series, lineData)`

### Parameter

Parameter | Type | Description
--------- | ------- | -----------
prototype | Object | 需要绘制的图像原型，必选，例如 hmcharts.series / hmcharts.pie
settingData | Object | 图形数据，具体参照右侧代码示例


### Sample

<p id="lineContainer" class="chart">hi</p>

<aside class="warning">
TODO — 待补充全右侧全部接口极其相关注释
</aside>

## Bar

```javascript
var barData = {
    containerId: 'barContainer',
    xAxis: [
        {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    ],
    yAxis: [
        {
            type: 'value',
        }
    ],
    series: [
        {
            name: '新访客',
            yAxis: 1,
            type: 'bar',    // 这里可以通过 type 指定 series 类型
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        },
        {
            name: '旧访客',
            yAxis: 1,
            type: 'bar',    // 这里可以通过 type 指定 series 类型
            data: [217.0, 316.9, 419.5, 714.5, 218.2, 321.5, 1115.2, 726.5, 323.3, 418.3, 313.9, 519.6]
        },
        {
            name: 'any访客',
            yAxis: 1,
            type: 'bar',    // 这里可以通过 type 指定 series 类型
            data: [27.0, 36.9, 41.5, 74.5, 18.2, 32.5, 115.2, 422.5, 123.3, 818.3, 130.9, 19.6]
        }
    ],
    legend: {
        position: 'top-right'
    }
};

// 初始化图形
var barChart = hmcharts.create(hmcharts.series, barData)
```

```html
<div id="barContainer" class="chart"></div>
```

```css
.chart {
    width: 80%;
    height: 400px;
}

.hm-axis {
    // ...
}

.hm-serie {
    // ...
}

.hm-grid {
    // ...
}

// ...
```

创建一个柱状图

### Interface

`var barChart = hmcharts.create(hmcharts.series, barData)`

### Parameter

Parameter | Type | Description
--------- | ------- | -----------
prototype | Object | 需要绘制的图像原型，必选，例如 hmcharts.series / hmcharts.pie
settingData | Object | 基本同折线图，通过 type 参数指定 series 类型


### Sample

<p id="barContainer" class="chart">hi</p>

<aside class="warning">
TODO — 待补充全右侧全部接口极其相关注释
</aside>

## Area

```javascript
var areaData = {
    containerId: 'areaContainer',
    xAxis: [
        {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    ],
    yAxis: [
        {
            type: 'value',
        }
    ],
    series: [
        {
            name: '新访客',
            yAxis: 1,
            type: 'line',
            isArea: true,    // 面积图是折线图的一种，可以指定为是否是面积图，不指定为普通折线图
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        },
        {
            name: '旧访客',
            yAxis: 1,
            type: 'line',
            isArea: true,    // 面积图是折线图的一种，可以指定为是否是面积图，不指定为普通折线图
            data: [217.0, 316.9, 419.5, 714.5, 218.2, 321.5, 1115.2, 726.5, 323.3, 418.3, 313.9, 519.6]
        },
        {
            name: 'any访客',
            yAxis: 1,
            type: 'bar',    // 也可以混搭，可选 line / bar
            data: [27.0, 36.9, 41.5, 74.5, 18.2, 32.5, 115.2, 422.5, 123.3, 818.3, 130.9, 19.6]
        }
    ],
    legend: {
        position: 'top-right'
    }
};

// 初始化图形
var areaChart = hmcharts.create(hmcharts.series, areaData)
```

```html
<div id="areaContainer" class="chart"></div>
```

```css
.chart {
    width: 80%;
    height: 400px;
}

.hm-axis {
    // ...
}

.hm-serie {
    // ...
}

.hm-grid {
    // ...
}

// ...
```

创建一个面积图

### Interface

`var stackChart = hmcharts.create(hmcharts.series, stackData)`

### Parameter

Parameter | Type | Description
--------- | ------- | -----------
prototype | Object | 需要绘制的图像原型，必选，例如 hmcharts.series / hmcharts.pie
settingData | Object | 基本同折线图，通过 type 参数指定 series 类型，可选 line/bar/area


### Sample

<p id="areaContainer" class="chart">hi</p>

<aside class="warning">
TODO — 待补充全右侧全部接口极其相关注释
</aside>

## StackBar

```javascript
var stackData = {
    containerId: 'stackContainer',
    xAxis: [
        {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    ],
    yAxis: [
        {
            type: 'value',
        }
    ],
    series: [
        {
            name: 'iPhone',
            type: 'stack-bar',
            stack: 'IOS',
            yAxis: 1,
            data: [349.9, 471.5, 506.4, 529.2, 644.0, 676.0, 435.6, 548.5, 616.4, 994.1, 995.6, 654.4],
            tooltip: {
                valueSuffix: ' 台'
            }
        },
        {
            name: 'Samsung',
            type: 'stack-bar',
            stack: '安卓',
            yAxis: 1,
            data: [217.0, 316.9, 419.5, 714.5, 318.2, 321.5, 1115.2, 726.5, 323.3, 418.3, 313.9, 319.6],
            tooltip: {
                valueSuffix: ' 台'
            }
        },
        {
            name: '华为',
            type: 'stack-bar',
            stack: '安卓',
            yAxis: 1,
            data: [127.0, 136.9, 141.5, 274.5, 218.2, 232.5, 315.2, 522.5, 323.3, 818.3, 230.9, 219.6],
            tooltip: {
                valueSuffix: ' 台'
            }
        },
        {
            name: '小米',
            type: 'stack-bar',
            stack: '安卓',
            yAxis: 1,
            data: [127.0, 236.9, 241.5, 174.5, 118.2, 132.5, 115.2, 422.5, 323.3, 418.3, 130.9, 119.6],
            tooltip: {
                valueSuffix: ' 台'
            }
        }
    ],
    legend: {
        position: 'top-right'
    },
    canvasLayout: {
        margin: [70, 90, 70, 50]
    }
};

// 初始化图形
var stackChart = hmcharts.create(hmcharts.stackBar, stackData);
```

```html
<div id="stackContainer" class="chart"></div>
```

```css
.chart {
    width: 80%;
    height: 400px;
}

.hm-axis {
    // ...
}

.hm-serie {
    // ...
}

.hm-grid {
    // ...
}

// ...
```

创建一个堆积图

### Interface

`var barChart = hmcharts.create(hmcharts.series, stackData)`

### Parameter

Parameter | Type | Description
--------- | ------- | -----------
prototype | Object | 需要绘制的图像原型，必选，例如 hmcharts.series / hmcharts.pie
settingData | Object | 基本同折线图，通过 type 参数指定 series 类型为 stack-bar，再通过 stack 指定分组信息


### Sample

<p id="stackContainer" class="chart">hi</p>

<aside class="warning">
TODO — 待补充全右侧全部接口极其相关注释
</aside>


## Pie

## Radar

## Bubble

## Maps