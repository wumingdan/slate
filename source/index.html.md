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

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Bar

```javscript
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```html
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```css
curl "http://example.com/api/kittens/2"
  -H "Authorization: meowmeowmeow"
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve

## Area

## StackBar

## Pie

## Radar

## Bubble

## Maps