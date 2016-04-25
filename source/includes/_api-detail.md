# Chart Styles

## CSS

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
hm-series-are | 面积图面积部分的单独样式
hm-series-are-{number} | 同样 number 对应数据传入的顺序，可单独定义某个面积展现的样式
hm-grid-mask | 整体图形覆盖层，用于事件监听，默认无样式，也不建议修改其样式
503 | Service Unavailable -- We're temporarially offline for maintanance. Please try again later.

## Settings

<aside class="notice">以下列举了所有可以自定义的 api 接口信息，使用时可以通过 setting 去覆盖已达到你所需要的样式</aside>

Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request sucks
401 | Unauthorized -- Your API key is wrong
403 | Forbidden -- The kitten requested is hidden for administrators only
404 | Not Found -- The specified kitten could not be found
405 | Method Not Allowed -- You tried to access a kitten with an invalid method
406 | Not Acceptable -- You requested a format that isn't json
410 | Gone -- The kitten requested has been removed from our servers
418 | I'm a teapot
429 | Too Many Requests -- You're requesting too many kittens! Slow down!
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintanance. Please try again later.
