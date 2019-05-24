var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            keyName: "",
            addkey: "",
            keyDescribe: ""
        },
        showList: true,
        title: null,
        keyId: null,
        commit: true,
        turnId: null,
        projectNo: "",
        i:0
    },
    methods: {
        query: function () {
            $("#preTips").css('background','white');
            $("#projModifyTips").css('background','white');
            $("#transTips").css('background','white');
            vm.getData();
        },
        getData: function () {
            var requestNo = $.trim($("#requestNo").val());
            var projectNo = $.trim($("#projectNo").val());
            if (requestNo == "" && projectNo == "") {
                alert("未输入查询条件");
                return;
            }
            $.getJSON(baseURL + "SubscribeInfo/getCountInfo", {projectNo:projectNo, requestNo:requestNo}, function (r) {
                // vm.subscribePreCount = r.subscribePreCount;
                console.log(r.code);
                if (r.code != 10003) {
                    vm.projectNo = r.projectNo;
                    vm.setData(r);
                    vm.showStatus(r);
                } else {
                    alert(r.msg);
                    vm.resetSbPre();
                    vm.resetProjModify();
                    vm.resetTrans();
                    vm.resetSplit();
                    vm.resetProfit();
                    return;
                }
            }).error(function() {
                alert("调用后台查询接口出错。");
            });
        },
        resetSbPre: function() {
            //重置预处理信息
            $("#labSbPreTotalCount").html("");
            $("#labSbPreFinishedCount").html("");
            $("#labSbPreFinishedAmount").html("");
            $("#labSbPreUnfinishedCount").html("");
        },
        resetProjModify: function() {
            //重置标的变更信息
            $("#labProjModifyStatus").html("");
            $("#labProjModifyAmount").html("");
            $("#labProjModifyCallbackStatus").html("");
        },
        resetTrans: function() {
            //重置交易信息
            $("#labTransTransRecordCount").html("");
            $("#labTransTransAmount").html("");
            $("#labTransDetailRecordCount").html("");
            $("#labTransDetailAmount").html("");
            $("#labTransIsNeedSplit").html("");
            $("#labTransIsNeedPre").html("");
            $("#labTransTransStatus").html("");
            $("#labProjectTableNum").html("");
            $("#labCommissionRate").html("");
            $("#labProfitRate").html("");
            $("#labStzfRate").html("");
        },
        resetSplit: function() {
            //重置交易信息
            $("#labTransIsCanSplit").html("");
            $("#labTransNeedSplitCount").html("");
            $("#labTransSplitAmount").html("");
            $("#labTransSplitTransUnfinishedCount").html("");
            $("#labTransCommissionAmount").html("");
            $("#labTransProfitAmount").html("");
            $("#labTransSplitCommissionAmount").html("");
            $("#labTransSplitProfitAmount").html("");
            $("#labTransSplitCommissionRepayAmount").html("");
            $("#labTransSplitProfitRepayAmount").html("");
            $("#labTransSTZFAmount").html("");
            $("#labTransSplitSTZFAmount").html("");

            $("#labSubscribeDetailRecordCount").html("");
            $("#labCommissionDetailRecordCount").html("");
            $("#labProfitDetailRecordCount").html("");
            $("#labSTZFDetailRecordCount").html("");
            $("#labSplitTransCount").html("");
        },
        resetProfit: function() {
            $("#labRepayTransStatus").html("");
            $("#labRepayTransDetailCount").html("");
        },
        setData: function (r) {
            if (r.subscribePreCount.totalCount != 0) {
                //预处理信息
                $("#labSbPreTotalCount").html(r.subscribePreCount.totalCount);
                $("#labSbPreFinishedCount").html(r.subscribePreCount.finishedCount);
                $("#labSbPreFinishedAmount").html(r.subscribePreCount.finishedAmount);
                $("#labSbPreUnfinishedCount").html(r.subscribePreCount.unfinishedCount);
            } else {
                vm.resetSbPre();
            }
            if (r.projectModifyCountInfo != null) {
                //标的变更信息
                $("#labProjModifyStatus").html(r.projectModifyCountInfo.status);
                $("#labProjModifyAmount").html(r.projectModifyCountInfo.tdAmount);
                $("#labProjModifyCallbackStatus").html(r.projectModifyCountInfo.callbackStatus);
            } else {
                vm.resetProjModify();
            }
            if (r.subscribeTransCount != null) {
                //交易信息
                $("#labTransTransRecordCount").html(r.subscribeTransCount.projectDetailCount);
                $("#labTransDetailRecordCount").html(r.subscribeTransCount.detailCount);
                $("#labTransTransAmount").html(r.subscribeTransCount.transAmount);
                $("#labTransDetailAmount").html(r.subscribeTransCount.detailAmount);
                $("#labTransIsNeedSplit").html(r.subscribeTransCount.isNeedSplit);
                $("#labTransTransStatus").html(r.subscribeTransCount.transStatus);
                $("#labTransIsNeedPre").html(r.subscribeTransCount.isNeedPre);

                $("#labSubscribeDetailRecordCount").html(r.subscribeTransCount.subscribeDetailCount);
                $("#labCommissionDetailRecordCount").html(r.subscribeTransCount.commissionDetailCount);
                $("#labProfitDetailRecordCount").html(r.subscribeTransCount.profitDetailCount);
                $("#labSTZFDetailRecordCount").html(r.subscribeTransCount.stzfDetailCount);

                $("#labTransIsCanSplit").html(r.subscribeTransCount.isCanSplit);
                $("#labTransNeedSplitCount").html(r.subscribeTransCount.needSplitCount);
                $("#labTransSplitAmount").html(r.subscribeTransCount.splitAmount);
                $("#labTransSplitTransUnfinishedCount").html(r.subscribeTransCount.splitTransUnfinishedCount);
                //$("#labTransNeedFYCount").html(r.subscribeTransCount.needFYCount);
                //$("#labTransUnfinishedFYCount").html(r.subscribeTransCount.unfinishedFYCount);
                $("#labTransCommissionAmount").html(r.subscribeTransCount.detailCommissionAmount);
                $("#labTransProfitAmount").html(r.subscribeTransCount.detailProfitAmount);
                $("#labTransSTZFAmount").html(r.subscribeTransCount.detailSTZFAmount);
                $("#labTransSplitCommissionAmount").html(r.subscribeTransCount.subscribeCommissionAmount);
                $("#labTransSplitProfitAmount").html(r.subscribeTransCount.subscribeProfitAmount);
                $("#labTransSplitSTZFAmount").html(r.subscribeTransCount.subscribeSTZFAmount);

                $("#labTransSplitCommissionRepayAmount").html(r.subscribeTransCount.repayCommissionAmount);
                $("#labTransSplitProfitRepayAmount").html(r.subscribeTransCount.repayProfitAmount);

                $("#labRepayTransStatus").html(r.subscribeTransCount.repayTransStatus);
                $("#labRepayTransDetailCount").html(r.subscribeTransCount.repayDetailCount);

                $("#labProjectTableNum").html(r.subscribeTransCount.tableNum);

                $("#labSplitTransCount").html(r.subscribeTransCount.splitTransCount);

                $("#labCommissionRate").html(r.subscribeTransCount.commissionRate);
                $("#labProfitRate").html(r.subscribeTransCount.profitRate);
                $("#labStzfRate").html(r.subscribeTransCount.stzfRate);
            } else {
                vm.resetTrans();
            }
        },showStatus: function (r) {
            //根据未完成数量判断预处理是否完成
            if (r.subscribePreCount == null || r.subscribePreCount.totalCount == 0){
                $("#preTips").css('background','gray');
                vm.resetSbPre();
            }
            else if (r.subscribePreCount.unfinishedCount == 0){
                $("#preTips").css('background','green');
            }
            else {
                $("#preTips").css('background','red');
            }

            //根据交易状态判断交易是否完成
            if (r.subscribeTransCount == null){
                $("#transTips").css('background','gray');
                vm.resetTrans();
            }
            else if (r.subscribeTransCount.transStatus == "200"){
                $("#transTips").css('background','green');
            }
            else {
                $("#transTips").css('background','red');
            }

            //根据是否完成拆分判断 满标拆分 是否完成
            if (r.subscribeTransCount == null || r.subscribeTransCount.isNeedSplit == "0") {
                $("#transSplitTips").css('background','gray');
                vm.resetSplit();
            }
            else if (r.subscribeTransCount.isCanSplit == "1"){
                $("#transSplitTips").css('background','green');
            }
            else {
                $("#transSplitTips").css('background','red');
            }

            //根据是否不存在0和1状态的还款分佣记录判断满标分佣是否完成
            if (r.subscribeTransCount == null ||
                r.subscribeTransCount.repayDetailCount == "0"){
                $("#transRepayTips").css('background','gray');
                vm.resetProfit();
            }
            else if (r.subscribeTransCount.repayTransStatus == 2){
                $("#transRepayTips").css('background','green');
            }
            else {
                $("#transRepayTips").css('background','red');
            }

            //根据变更标的状态判断 标的变更 是否已完成
            if (r.projectModifyCountInfo == null){
                $("#projModifyTips").css('background','gray');
                vm.resetProjModify();
            }
            else if (r.projectModifyCountInfo.callbackStatus == 2){
                $("#projModifyTips").css('background','green');
            }
            else {
                $("#projModifyTips").css('background','red');
            }
        }
    }
});

//显示未完成预处理信息
function showPreUnfinishedInfo() {
    if ($("#labSbPreUnfinishedCount").text() == "0") {
         alert("数据条数为0");
    } else {
        layer.open({
            type: 2,
            title: "预处理表信息",
            area: ['1400px', '700px'],
            content: 'subPreDetail.html?projectNo=' + vm.projectNo
        });
    }

}

//显示未完成交易信息
function showUnfinishedTransInfo() {
    if ($("#labTransSplitTransUnfinishedCount").text() == "0") {
        alert("数据条数为0");
    } else {
        layer.open({
            type: 2,
            title: "交易表信息",
            area: ['1400px', '700px'],
            content: 'subscribeTrans.html?projectNo=' + vm.projectNo
        });
    }

}


//显示未拆分的交易明细信息
function showUnsplitTransDetailInfo() {
    if ($("#labTransNeedSplitCount").text() == "0") {
        alert("数据条数为0");
    } else {
        layer.open({
            type: 2,
            title: "交易明细表信息",
            area: ['1400px', '700px'],
            content: 'subscribeTransDetail.html?projectNo=' + vm.projectNo
        });
    }

}


//显示分佣明细信息
function showFYDetail(count) {
    if (count == "0") {
        alert("数据条数为0");
    } else {
        layer.open({
            type: 2,
            title: "分佣明细信息",
            area: ['1400px', '700px'],
            content: 'profitTrans.html?projectNo=' + vm.projectNo
        });
    }
}


//显示拆分后交易信息
function showSplitTransCountInfo(count) {
    if (count == "0") {
        alert("数据条数为0");
    } else {
        layer.open({
            type: 2,
            title: "拆分后交易信息",
            area: ['1400px', '700px'],
            content: 'subscribeTransSplit.html?projectNo=' + vm.projectNo
        });
    }
}