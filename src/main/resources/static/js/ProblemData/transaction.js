$(function () {
    $("#ddlType").val("2");
    loadGrid(repayColumn);
});

function loadGrid(column) {
    $("#jqGrid").jqGrid({
        url: baseURL + 'Transaction/getList',
        datatype: "json",
        colModel: column,
        shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 20,
        height: '700',
        rowList: [20, 40, 60],
        rownumbers: true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            //$("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        },
        onSelectRow: function (id) {
            $("#tbxRequestNo").val(id);
            $("#tbxProjectNo").val($("#jqGrid").getRowData(id).projectNo);
        },
        beforeRequest: function () {
            vm.q.addkey = null;
            vm.q.keyDescribe = null;
            vm.keyId == null;
            vm.showList = true;
            vm.commit = true;
            $("#tbxRequestNo").val("");
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            var putData = {};
            putData['requestNo'] = vm.q.requestNo;
            putData['ddlType'] = $("#ddlType").val();
            putData['projectNo'] = vm.q.projectNo;
            putData['ddlType'] = $("#ddlType").val();
            $("#jqGrid").setGridParam({postData: putData});
        }
    });
}

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
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            if ($("#ddlType").val() === "2") {
                tempColumn = repayColumn;
            }
            else {
                tempColumn = redpacketColumn;
            }
            $.jgrid.gridUnload("#jqGrid");
            loadGrid(tempColumn);
        },
        resetError: function () {
            confirm("确定执行重置错误操作吗？", function () {
                $.ajax({
                    url: "/Transaction/resetError",
                    type: "POST",
                    async: false,
                    dataType: "json",
                    success: function (result) {
                        if (result.isSuccess > 0) {
                            alert("重置成功！");
                        }
                        else {
                            alert("重置失败")
                        }
                    },
                    error: function (xhr, status, error) {
                    }
                });
            });
        },
        returnFix: function () {
            confirm("确定执行回调状态补漏操作吗？", function () {
                $.ajax({
                    url: "/Transaction/returnFix",
                    type: "POST",
                    async: false,
                    dataType: "json",
                    success: function (result) {
                        if (result.isSuccess > 0) {
                            alert("补漏成功！");
                        }
                        else {
                            alert("补漏失败")
                        }
                    },
                    error: function (xhr, status, error) {
                    }
                });
            });
        },
        returnFix2: function () {
            confirm("确定执行【补漏2】吗？", function () {
                $.ajax({
                    url: "/Transaction/returnFixTwo",
                    type: "POST",
                    async: false,
                    dataType: "json",
                    success: function (result) {
                        if (result.isSuccess > 0) {
                            alert("补漏成功！");
                        }
                        else {
                            alert("补漏失败")
                        }
                    },
                    error: function (xhr, status, error) {
                    }
                });
            });
        },
        queryDetail: function () {
            var ddlType = $("#ddlType").val();
            if (ddlType === "4") {
                alert("平台营销款无交易明细！");
                return false;
            }
            var requestNo = $("#tbxRequestNo").val();
            var projectNo = $("#tbxProjectNo").val();
            if (requestNo == undefined || requestNo.trim() === "") {
                alert("请先选择需要查看的行!");
                return false;
            }
            var index = layer.open({
                type: 2,
                title: "交易表明细",
                content: 'transactionDetail.html?transactionNo=' + requestNo + '&projectNo=' + projectNo
            });
            layer.full(index);
        }
    }
});

var repayColumn = [
    {label: 'requestNo', name: 'requestNo', sortable: false, width: 320, key: true},
    {label: 'preRequestNo', name: 'preRequestNo', sortable: false, width: 320},
    {label: 'tradeType', name: 'tradeType', sortable: false},
    {label: 'tradeTypeId', name: 'tradeTypeId', sortable: false},
    {label: 'projectNo', name: 'projectNo', sortable: false, width: 320},
    {label: 'projectType', name: 'projectType', sortable: false},
    {label: 'sendRequestNo', name: 'sendRequestNo', sortable: false, width: 320},
    {label: 'saleRequestNo', name: 'saleRequestNo', sortable: false, width: 320},
    {label: 'requestCount', name: 'requestCount', sortable: false},
    {label: 'requestTime', name: 'requestTime', sortable: false},
    {label: 'requestResult', name: 'requestResult', sortable: false},
    {label: 'acceptedStatus', name: 'acceptedStatus', sortable: false},
    {label: 'requestType', name: 'requestType', sortable: false},
    {label: 'callbackCode', name: 'callbackCode', sortable: false},
    {label: 'callbackTime', name: 'callbackTime', sortable: false},
    {label: 'errorCount', name: 'errorCount', sortable: false},
    {label: 'isNeedPre', name: 'isNeedPre', sortable: false},
    {label: 'transStatus', name: 'transStatus', sortable: false},
    {label: 'createdDate', name: 'createdDate', sortable: false},
    {label: 'modifyDate', name: 'modifyDate', sortable: false},
    {label: 'version', name: 'version', sortable: false},
    {label: 'retMsg', name: 'retMsg', sortable: false}
];
var redpacketColumn = [
    {label: 'requestNo', name: 'requestNo', sortable: false, width: 320, key: true},
    {label: 'outUserNo', name: 'outUserNo', sortable: false, width: 320},
    {label: 'inUserNo', name: 'inUserNo', sortable: false, width: 320},
    {label: 'prizeId', name: 'prizeId', sortable: false},
    {label: 'prizeTypeId', name: 'prizeTypeId', sortable: false},
    {label: 'amount', name: 'amount', sortable: false},
    {label: 'status', name: 'status', sortable: false},
    {label: 'requestCount', name: 'requestCount', sortable: false},
    {label: 'errorCount', name: 'errorCount', sortable: false},
    {label: 'projectNo', name: 'projectNo', sortable: false},
    {label: 'type', name: 'type', sortable: false},
    {label: 'createDate', name: 'createDate', sortable: false},
    {label: 'modifyDate', name: 'modifyDate', sortable: false},
    {label: 'successDate', name: 'successDate', sortable: false},
    {label: 'returnMsg', name: 'returnMsg', sortable: false},
    {label: 'descr', name: 'descr', sortable: false},
    {label: 'version', name: 'version', sortable: false},
    {label: 'systemName', name: 'systemName', sortable: false},
    {label: 'requestBankNo', name: 'requestBankNo', sortable: false},
    {label: 'acceptDate', name: 'acceptDate', sortable: false},
    {label: 'source', name: 'source', sortable: false}
];