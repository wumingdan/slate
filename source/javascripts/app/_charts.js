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
    var lineChart = hmcharts.create(hmcharts.series, lineData)
};

$(document).ready(function () {
    // 线图
    initLineChartDemo();
    
    
});