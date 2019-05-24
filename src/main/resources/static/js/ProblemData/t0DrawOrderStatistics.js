var arrT0List;
var arrT1List;
$(function () {
    $.ajax({
        url: baseURL + "T0DrawOrderStatistics/getStatistics",
        type: "GET",
        async:true,
        success:function(result){
            arrT0List = result.arrT0List;
            arrT1List = result.arrT1List;
            ini();
        }
    });
});
function ini()
{
    var myT0SumChart = echarts.init(document.getElementById("T0DrawOrderSum"));
    var myT0RateChart = echarts.init(document.getElementById("T0DrawOrderRate"));
    var myT1SumChart = echarts.init(document.getElementById("T1DrawOrderSum"));
    var myT1RateChart = echarts.init(document.getElementById("T1DrawOrderRate"));
    var T0Sumoption = {
        title: {
            text: 'T0订单数量统计'
            //subtext: 'dataZoom支持'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (paramss) {
                var viewstr = "日期:";
                for (var i = 0; i < paramss.length; i++) {
                    params = paramss[i];
                    if (i == 0) {
                        var date = new Date(params.value[0]);
                        viewstr = viewstr + date.getFullYear() + '-'
                            + (date.getMonth() + 1) + '-'
                            + date.getDate() + ' <br>'
                        $("#T0AddDate").text(date.getFullYear() + '-'
                            + (date.getMonth() + 1) + '-'
                            + date.getDate())
                    }
                    viewstr = viewstr + params.seriesName + ":" + params.value[1] + " <br/>"
                    $("#T0Orderdata").find("label[seriesName='" + params.seriesName + "']").text(params.value[1]);

                }
                return viewstr;
            }
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        dataZoom: {
            show: true,
            start: 0
        },
        legend: {
            width: "500",
            color: "auto",
            data: ['总数', '审核总数', '审核通过数', '人工审核数', '逾期金额不过', '净值标还款不过', '可用金额不过', '快捷同卡不过', '充值提现不过', '15天充值投资不过', '收支平衡不过'],
            selected: {
                '逾期金额不过': false,
                '净值标还款不过': false,
                '可用金额不过': false,
                '快捷同卡不过': false,
                '充值提现不过': false,
                '15天充值投资不过': false,
                '收支平衡不过': false
            }
        },
        grid: {
            y2: 80
        },
        xAxis: [
            {
                type: 'time',
                splitNumber: 10
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '总数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.orderSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '审核总数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.auditSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '审核通过数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.autoPassSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '人工审核数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.noAutoSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '逾期金额不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.overdueAmountFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '净值标还款不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.jingZhiBiaoReFundFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '可用金额不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.aviMoneyFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '快捷同卡不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.kJTongKaFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '充值提现不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.rechargeOrDrawFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '15天充值投资不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.rechargeOrInvestFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '收支平衡不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.incomeAndExpensesFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
        ]
    };

    var T0Rateoption = {
        title: {
            text: 'T0订单比率统计'
            //subtext: 'dataZoom支持'
        },
        tooltip: {
            trigger: 'axis'
            //formatter: function (params) {
            //    var date = new Date(params.value[0]);
            //    data = date.getFullYear() + '-'
            //           + (date.getMonth() + 1) + '-'
            //           + date.getDate() + ' '
            //    return params.seriesName + "<br/>" + data + '<br/>'
            //           + params.value[1] + "%";
            //}
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        dataZoom: {
            show: true,
            start: 0
        },
        legend: {
            width: "500",
            color: "auto",
            data: ['审核通过率', '逾期金额不过率', '净值标还款不过率', '可用金额不过率', '快捷同卡不过率', '充值提现不过率', '15天充值投资不过率', '收支平衡不过率'],
            selected: {
                '逾期金额不过率': false,
                '净值标还款不过率': false,
                '可用金额不过率': false,
                '快捷同卡不过率': false,
                '充值提现不过率': false,
                '15天充值投资不过率': false,
                '收支平衡不过率': false
            }

        },
        grid: {
            y2: 80
        },
        xAxis: [
            {
                type: 'time',
                splitNumber: 10
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                }

            }
        ],
        series: [
            {
                name: '审核通过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,

                data: (function () {

                    var str = arrT0List.autoPassRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '逾期金额不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.overdueAmountFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '净值标还款不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.jingZhiBiaoReFundFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '可用金额不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.aviMoneyFailRateLit;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '快捷同卡不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.kJTongKaFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '充值提现不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.rechargeOrDrawFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '15天充值投资不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.rechargeOrInvestFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '收支平衡不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT0List.incomeAndExpensesFailRateList;
                    var json = eval(str);
                    return json;
                })()
            }
        ]
    };
    var T1Sumoption = {
        title: {
            text: 'T1订单数量统计'
            //subtext: 'dataZoom支持'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (paramss) {
                var viewstr = "日期:";
                for (var i = 0; i < paramss.length; i++) {
                    params = paramss[i];
                    if (i == 0) {
                        var date = new Date(params.value[0]);
                        viewstr = viewstr + date.getFullYear() + '-'
                            + (date.getMonth() + 1) + '-'
                            + date.getDate() + ' <br>'
                        $("#T1AddDate").text(date.getFullYear() + '-'
                            + (date.getMonth() + 1) + '-'
                            + date.getDate())
                    }
                    viewstr = viewstr + params.seriesName + ":" + params.value[1] + " <br/>"
                    $("#T1Orderdata").find("label[seriesName='" + params.seriesName + "']").text(params.value[1]);

                }
                return viewstr;
            }
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        dataZoom: {
            show: true,
            start: 0
        },
        legend: {
            width: "500",
            color: "auto",
            data: ['总数', '审核总数', '审核通过数', '人工审核数', '逾期金额不过', '净值标还款不过', '可用金额不过', '快捷同卡不过', '充值提现不过', '15天充值投资不过', '收支平衡不过'],
            selected: {
                '逾期金额不过': false,
                '净值标还款不过': false,
                '可用金额不过': false,
                '快捷同卡不过': false,
                '充值提现不过': false,
                '15天充值投资不过': false,
                '收支平衡不过': false
            }

        },
        grid: {
            y2: 80
        },
        xAxis: [
            {
                type: 'time',
                splitNumber: 10
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '总数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,

                data: (function () {

                    var str = arrT1List.orderSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '审核总数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.auditSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '审核通过数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.autoPassSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '人工审核数',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.noAutoSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '逾期金额不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.overdueAmountFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '净值标还款不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.jingZhiBiaoReFundFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '可用金额不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.aviMoneyFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '快捷同卡不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.kJTongKaFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '充值提现不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.rechargeOrDrawFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '15天充值投资不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.rechargeOrInvestFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '收支平衡不过',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.incomeAndExpensesFailSumList;
                    var json = eval(str);
                    return json;
                })()
            },
        ]
    };

    var T1Rateoption = {
        title: {
            text: 'T1订单比率统计'
            //subtext: 'dataZoom支持'
        },
        tooltip: {
            trigger: 'axis'
            //formatter: function (params) {
            //    var date = new Date(params.value[0]);
            //    data = date.getFullYear() + '-'
            //           + (date.getMonth() + 1) + '-'
            //           + date.getDate() + ' '
            //    return params.seriesName + "<br/>" + data + '<br/>'
            //           + params.value[1] + "%";
            //}
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        dataZoom: {
            show: true,
            start: 0
        },
        legend: {
            width: "500",
            color: "auto",
            data: ['审核通过率', '逾期金额不过率', '净值标还款不过率', '可用金额不过率', '快捷同卡不过率', '充值提现不过率', '15天充值投资不过率', '收支平衡不过率'],
            selected: {
                '逾期金额不过率': false,
                '净值标还款不过率': false,
                '可用金额不过率': false,
                '快捷同卡不过率': false,
                '充值提现不过率': false,
                '15天充值投资不过率': false,
                '收支平衡不过率': false
            }

        },
        grid: {
            y2: 80
        },
        xAxis: [
            {
                type: 'time',
                splitNumber: 10
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                }

            }
        ],
        series: [
            {
                name: '审核通过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,

                data: (function () {

                    var str = arrT1List.autoPassRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '逾期金额不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.overdueAmountFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '净值标还款不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.jingZhiBiaoReFundFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '可用金额不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.aviMoneyFailRateLit;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '快捷同卡不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.kJTongKaFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '充值提现不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.rechargeOrDrawFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '15天充值投资不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.rechargeOrInvestFailRateList;
                    var json = eval(str);
                    return json;
                })()
            },
            {
                name: '收支平衡不过率',
                type: 'line',
                showAllSymbol: true,
                symbolSize: 5,
                data: (function () {
                    var str = arrT1List.incomeAndExpensesFailRateList;
                    var json = eval(str);
                    return json;
                })()
            }
        ]
    };

    myT0SumChart.setOption(T0Sumoption);
    myT0RateChart.setOption(T0Rateoption);
    myT1SumChart.setOption(T1Sumoption);
    myT1RateChart.setOption(T1Rateoption);
}