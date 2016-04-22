//= require ./_hmcharts

var initLineChartDemo = function () {
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
        },
        canvasLayout: {
            margin: [70, 90, 70, 50]
        }
    };

    // 初始化图形
    window.lineChart = hmcharts.create(hmcharts.series, lineData);
};

var initBarChartDemo = function () {
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
                type: 'bar',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            },
            {
                name: '旧访客',
                yAxis: 1,
                type: 'bar',
                data: [217.0, 316.9, 419.5, 714.5, 218.2, 321.5, 1115.2, 726.5, 323.3, 418.3, 313.9, 519.6]
            },
            {
                name: 'any访客',
                yAxis: 1,
                type: 'bar',
                data: [27.0, 36.9, 41.5, 74.5, 18.2, 32.5, 115.2, 422.5, 123.3, 818.3, 130.9, 19.6]
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
    window.barChart = hmcharts.create(hmcharts.series, barData);
};

var initAreaChartDemo = function () {
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
                isArea: true,
                data: [149.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            },
            {
                name: '旧访客',
                yAxis: 1,
                type: 'line',
                isArea: true,
                data: [217.0, 316.9, 419.5, 714.5, 218.2, 321.5, 1115.2, 726.5, 323.3, 418.3, 313.9, 519.6]
            },
            {
                name: 'any访客',
                yAxis: 1,
                type: 'bar',
                data: [27.0, 36.9, 41.5, 74.5, 18.2, 32.5, 115.2, 422.5, 123.3, 818.3, 130.9, 19.6]
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
    window.areaChart = hmcharts.create(hmcharts.series, areaData);
};

var initStackBarChartDemo = function () {
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
    window.stackChart = hmcharts.create(hmcharts.stackBar, stackData);
};

$(document).ready(function () {
    // 线图
    initLineChartDemo();
    
    // 柱状图
    initBarChartDemo();
    
    // 面积图
    initAreaChartDemo();
    
    // 堆积图
    initStackBarChartDemo();

});