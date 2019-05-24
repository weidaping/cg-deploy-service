$(function () {
    $.ajax({
        url: baseURL + "FundDetailTimeConsuming/getList",
        type: "POST",
        async: true,
        success: function (result) {
            if (result) {
                ini(result.data);
            }
            else {
                alert("数据查询失败！");
            }
        }
    });
});

function ini(list) {
    var xLineArr = [];
    var totalTimeArr = [];
    var getSpiltDatatimeArr = [];
    var getUserBasicInfoTimeArr = [];
    var getdqFundAccountInfoTimeArr = [];
    var getP2pFundAccountInfoTimeArr = [];
    var getFtbDueTimeArr = [];
    var getP2pFundAccountExtTimeArr = [];
    var getFundDetailTimeArr = [];
    var getHisFundDetailTimeArr = [];
    var getGrantingAmountTimeArr = [];
    var getZijinThreeTimeArr = [];
    var getZxAccountInfoTimeArr = [];
    var getZxFundStatisticsTimeArr = [];
    var getJzlxTimeArr = [];
    var getCommissionTimeArr = [];
    var getHdUserPrizeTimeArr = [];
    var getHdZxRechargeRewardTimeArr = [];
    var getHousebabyTimeArr = [];
    var getOutHao8daiTimeArr = [];
    var getInHao8daiTimeArr = [];
    var getTuandaiOutLjsTimeArr = [];
    var getLjsInTuandaiTimeArr = [];
    var getLsjZxInTuandaiTimeArr = [];
    var getOverDueInterstTimeArr = [];
    var getP2pToHtAmountTimeArr = [];
    var getHtToP2pAmountTimeArr = [];
    var getP2pToOtherAmountTimeArr = [];
    var getOtherToP2pAmoutTimeArr = [];
    var getZijinduizhangResultTimeArr = [];
    var getFzTimeArr = [];
    var getDqzxDueInAmountTimeArr = [];

    var legendArr = ["总耗时", "获取拆分数据库配置时间", "获取用户信息时间", "获取定期账号信息时间", "获取P2P账号信息时间", "获取复投宝收益时间", "获取用户资金表扩展信息花费时间", "获取实时流水记录花费时间（最近两天时间）", "获取历史流水花费时间", "获取冻结数值时间", "资金三项公司计算时间", "获取已同步代付本息步金额时间", "获取智享库总代付本息金额花费时间", "获取非复投宝净赚利息花费时间", "获取佣金花费时间", "获取团宝箱花费时间", "获取智享充值返现花费时间", "获取房宝宝资金花费时间", "团贷网转出好帮贷花费时间", "好帮贷转入团贷网花费时间", "查询团贷网转联交所花费时间", "查询联交所转入团贷网花费时间", "查询联交所智享回款转入团贷网花费时间", "累计逾期收益", "获取p2p转账到鸿特花费时间", "获取鸿特转账到p2p花费时间", "获取p2p转账到other花费时间", "获取other转账到p2p花费时间", "获取资金对账信息花费时间", "资金赋值花费时间", "获取定期智享时间"];
    for (var i = 0; i < list.length; i++) {
        xLineArr.push(list[i].requestDate);
        totalTimeArr.push(list[i].totalTime);
        getSpiltDatatimeArr.push(list[i].getSpiltDatatime);
        getUserBasicInfoTimeArr.push(list[i].getUserBasicInfoTime);
        getdqFundAccountInfoTimeArr.push(list[i].getDqFundAccountInfoTime);
        getP2pFundAccountInfoTimeArr.push(list[i].getP2pFundAccountInfoTime);
        getFtbDueTimeArr.push(list[i].getFtbDueTime);
        getP2pFundAccountExtTimeArr.push(list[i].getP2pFundAccountExtTime);
        getFundDetailTimeArr.push(list[i].getFundDetailTime);
        getHisFundDetailTimeArr.push(list[i].getHisFundDetailTime);
        getGrantingAmountTimeArr.push(list[i].getGrantingAmountTime);
        getZijinThreeTimeArr.push(list[i].getZijinThreeTime);
        getZxAccountInfoTimeArr.push(list[i].getZxAccountInfoTime);
        getZxFundStatisticsTimeArr.push(list[i].getZxFundStatisticsTime);
        getJzlxTimeArr.push(list[i].getJzlxTime);
        getCommissionTimeArr.push(list[i].getCommissionTime);
        getHdUserPrizeTimeArr.push(list[i].getHdUserPrizeTime);
        getHdZxRechargeRewardTimeArr.push(list[i].getHdZxRechargeRewardTime);
        getHousebabyTimeArr.push(list[i].getHousebabyTime);
        getOutHao8daiTimeArr.push(list[i].getOutHao8daiTime);
        getInHao8daiTimeArr.push(list[i].getInHao8daiTime);
        getTuandaiOutLjsTimeArr.push(list[i].getTuandaiOutLjsTime);
        getLjsInTuandaiTimeArr.push(list[i].getLjsInTuandaiTime);
        getLsjZxInTuandaiTimeArr.push(list[i].getLsjZxInTuandaiTime);
        getOverDueInterstTimeArr.push(list[i].getOverDueInterstTime);
        getP2pToHtAmountTimeArr.push(list[i].getP2pToHtAmountTime);
        getHtToP2pAmountTimeArr.push(list[i].getHtToP2pAmountTime);
        getP2pToOtherAmountTimeArr.push(list[i].getP2pToOtherAmountTime);
        getOtherToP2pAmoutTimeArr.push(list[i].getOtherToP2pAmoutTime);
        getZijinduizhangResultTimeArr.push(list[i].getZijinduizhangResultTime);
        getFzTimeArr.push(list[i].getFzTime);
        getDqzxDueInAmountTimeArr.push(list[i].getDqzxDueInAmountTime);
    }

// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
            right: 10,
            top: 20,
            bottom: 20,
            data: legendArr,
            selected: {
                "获取P2P账号信息时间": false,
                "获取复投宝收益时间": false,
                "获取用户资金表扩展信息花费时间": false,
                "获取实时流水记录花费时间（最近两天时间）": false,
                "获取历史流水花费时间": false,
                "获取冻结数值时间": false,
                "资金三项公司计算时间": false,
                "获取已同步代付本息步金额时间": false,
                "获取智享库总代付本息金额花费时间": false,
                "获取非复投宝净赚利息花费时间": false,
                "获取佣金花费时间": false,
                "获取团宝箱花费时间": false,
                "获取智享充值返现花费时间": false,
                "获取房宝宝资金花费时间": false,
                "团贷网转出好帮贷花费时间": false,
                "好帮贷转入团贷网花费时间": false,
                "查询团贷网转联交所花费时间": false,
                "查询联交所转入团贷网花费时间": false,
                "查询联交所智享回款转入团贷网花费时间": false,
                "累计逾期收益": false,
                "获取p2p转账到鸿特花费时间": false,
                "获取鸿特转账到p2p花费时间": false,
                "获取p2p转账到other花费时间": false,
                "获取other转账到p2p花费时间": false,
                "获取资金对账信息花费时间": false,
                "资金赋值花费时间": false,
                "获取定期智享时间": false,
                "获取拆分数据库配置时间": false,
                "获取用户信息时间": false,
                "获取定期账号信息时间": false
            }
        },
        xAxis: {
            data: xLineArr
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '总耗时',
                type: 'line',
                data: totalTimeArr
            },
            {
                name: "获取拆分数据库配置时间",
                type: 'line',
                data: getSpiltDatatimeArr
            },
            {
                name: "获取用户信息时间",
                type: 'line',
                data: getUserBasicInfoTimeArr
            },
            {
                name: "获取定期账号信息时间",
                type: 'line',
                data: getdqFundAccountInfoTimeArr
            },
            {
                name: "获取P2P账号信息时间",
                type: 'line',
                data: getP2pFundAccountInfoTimeArr
            },
            {
                name: "获取复投宝收益时间",
                type: 'line',
                data: getFtbDueTimeArr
            },
            {
                name: "获取用户资金表扩展信息花费时间",
                type: 'line',
                data: getP2pFundAccountExtTimeArr
            },
            {
                name: "获取实时流水记录花费时间（最近两天时间）",
                type: 'line',
                data: getFundDetailTimeArr
            },
            {
                name: "获取历史流水花费时间",
                type: 'line',
                data: getHisFundDetailTimeArr
            },
            {
                name: "获取冻结数值时间",
                type: 'line',
                data: getGrantingAmountTimeArr
            },
            {
                name: "资金三项公司计算时间",
                type: 'line',
                data: getZijinThreeTimeArr
            },
            {
                name: "获取已同步代付本息步金额时间",
                type: 'line',
                data: getZxAccountInfoTimeArr
            },
            {
                name: "获取智享库总代付本息金额花费时间",
                type: 'line',
                data: getZxFundStatisticsTimeArr
            },
            {
                name: "获取非复投宝净赚利息花费时间",
                type: 'line',
                data: getJzlxTimeArr
            },
            {
                name: "获取佣金花费时间",
                type: 'line',
                data: getCommissionTimeArr
            },
            {
                name: "获取团宝箱花费时间",
                type: 'line',
                data: getHdUserPrizeTimeArr
            },
            {
                name: "获取智享充值返现花费时间",
                type: 'line',
                data: getHdZxRechargeRewardTimeArr
            },
            {
                name: "获取房宝宝资金花费时间",
                type: 'line',
                data: getHousebabyTimeArr
            },
            {
                name: "团贷网转出好帮贷花费时间",
                type: 'line',
                data: getOutHao8daiTimeArr
            },
            {
                name: "好帮贷转入团贷网花费时间",
                type: 'line',
                data: getInHao8daiTimeArr
            },
            {
                name: "查询团贷网转联交所花费时间",
                type: 'line',
                data: getTuandaiOutLjsTimeArr
            }
            ,
            {
                name: "查询联交所转入团贷网花费时间",
                type: 'line',
                data: getLjsInTuandaiTimeArr
            }
            ,
            {
                name: "查询联交所智享回款转入团贷网花费时间",
                type: 'line',
                data: getLsjZxInTuandaiTimeArr
            }
            ,
            {
                name: "累计逾期收益",
                type: 'line',
                data: getOverDueInterstTimeArr
            }
            ,
            {
                name: "获取p2p转账到鸿特花费时间",
                type: 'line',
                data: getP2pToHtAmountTimeArr
            },
            {
                name: "获取鸿特转账到p2p花费时间",
                type: 'line',
                data: getHtToP2pAmountTimeArr
            },
            {
                name: "获取p2p转账到other花费时间",
                type: 'line',
                data: getP2pToOtherAmountTimeArr
            },
            {
                name: "获取other转账到p2p花费时间",
                type: 'line',
                data: getOtherToP2pAmoutTimeArr
            },
            {
                name: "获取资金对账信息花费时间",
                type: 'line',
                data: getZijinduizhangResultTimeArr
            },
            {
                name: "资金赋值花费时间",
                type: 'line',
                data: getFzTimeArr
            },
            {
                name: "获取定期智享时间",
                type: 'line',
                data: getDqzxDueInAmountTimeArr
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}