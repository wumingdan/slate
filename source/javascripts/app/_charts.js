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

var initPieChartDemo = function () {
    var data = {
        containerId: 'pieContainer',
        plotOptions: {
            pie: {
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    showLabelNumber: 5,
                    color: '#000',
                    connectorColor: '#000'
                },
                animate: false,
                showInLegend: true,
                margin: [80, 50, 50, 50]
            }
        },
        series: [{
            name: '浏览器品牌',
            type: 'pie',
            data: [
                { name: 'Microsoft Internet Explorer', value: 11156.33 },
                { name: 'Chrome', value: 11124.03 },
                { name: 'Firefox', value: 11110.38 },
                { name: 'Safari', value: 1114.77 },
                { name: 'Opera', value: 111.91 },
                { name: 'Proprietary or Undetectable', value: 111.2 }
            ]
        }]
    };

    // 初始化图形
    window.pieChart = hmcharts.create(hmcharts.pie, data);
};


var initRadarChartDemo = function () {
    var radarData = {
        containerId: 'radarContainer',
        xAxis: {
            data: ['销售', '市场', '研发', '客服', '信息技术', '社交', '售后', '折旧']
        },
        yAxis: {
        },
        grid: {
            type: 'polygon',
            split: 3
        },
        plotOptions: {
            radar: {
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    showLabelNumber: 5,
                    color: '#000',
                    connectorColor: '#000'
                },
                animate: false,
                showInLegend: true,
                radius: 150
            }
        },
        series: [
            {
                name: '预算分配',
                type: 'line',   // bar, line, area
                data: [43000, 19000, 60000, 35000, 17000, 10000, 21000, 31000],
                tooltip: {
                    valueSuffix: ' 元'
                }
            },
            {
                name: '实际开销',
                data: [50000, 39000, 42000, 31000, 26000, 14000, 26000, 39000],
                tooltip: {
                    valueSuffix: ' 元'
                }
            },
            {
                name: '预算&实际差额',
                type: 'line',   // bar, line, area
                data: [7000, 20000, 18000, 4000, 9000, 4000, 5000, 8000],
                tooltip: {
                    valueSuffix: ' 元'
                }
            }
        ]
    };

    // 初始化图形
    window.radarChart = hmcharts.create(hmcharts.radar, radarData);
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
    
    // 饼图
    initPieChartDemo();
    
    // 雷达图
    initRadarChartDemo();

});