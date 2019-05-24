$(function () {
    loadGrid(repayColumn);
});

function loadGrid(column) {
    $("#jqGrid").jqGrid({
        url: '/repay/problem/getListForPage',
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
            putData['projectNo'] = vm.q.projectNo;
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
            $.jgrid.gridUnload("#jqGrid");
            loadGrid(repayColumn);
        },
        resetError: function () {
            confirm("确定执行重置错误操作吗？", function () {
                $.ajax({
                    url: "/repay/repair/trans/error/reset",
                    type: "POST",
                    async: false,
                    dataType: "json",
                    success: function (result) {
                        if (result.code === 0) {
                            alert("重置成功！");
                        } else {
                            alert("重置失败")
                        }
                    },
                    error: function (xhr, status, error) {
                    }
                });
            });
        },
        resetTransferError: function () {
            confirm("确定修复债权结清的数据吗？", function () {
                var requestNo = $("#tbxRequestNo").val();
                if (requestNo == undefined || requestNo.trim() === "") {
                    alert("请先选择需要查看的行!");
                    return false;
                }
                $.ajax({
                    url: "/repay/repair/solve/transferError",
                    type: "POST",
                    async: false,
                    data: {"requestNo": requestNo},
                    dataType: "json",
                    success: function (result) {
                        if (result.code === 0) {
                            alert(result.retMsg);
                        } else {
                            alert("重置失败")
                        }
                    },
                    error: function (xhr, status, error) {
                        if(xhr.status==494){
                            window.location.href = xhr.responseText ;
                        }
                    }
                });
            });
        },
        resetClaim: function () {
            confirm("确定修复债权不足的数据吗？", function () {
                var requestNo = $("#tbxRequestNo").val();
                if (requestNo == undefined || requestNo.trim() === "") {
                    alert("请先选择需要查看的行!");
                    return false;
                }
                $.ajax({
                    url: "/repay/repair/reset/transDetailClaim",
                    type: "POST",
                    async: false,
                    data: {"requestNo": requestNo},
                    dataType: "json",
                    success: function (result) {
                        if (result.code === 0) {
                            alert(result.retMsg);
                        } else {
                            alert("重置失败")
                        }
                    },
                    error: function (xhr, status, error) {
                        if(xhr.status==494){
                            window.location.href = xhr.responseText ;
                        }
                    }
                });
            });
        },
        queryDetail: function () {
            var requestNo = $("#tbxRequestNo").val();
            var projectNo = $("#tbxProjectNo").val();
            if (requestNo == undefined || requestNo.trim() === "") {
                alert("请先选择需要查看的行!");
                return false;
            }
            var index = layer.open({
                title: "交易表明细",
                type: 2,
                content: '/repay/transactionDetail.html?transactionNo=' + requestNo + '&projectNo=' + projectNo
            });
            layer.full(index);
        }
    }
});

var repayColumn = [
    {label: '表名', name: 'tableName', width: 320},
    {label: '原始请求流水号', name: 'requestNo', sortable: false, width: 320, key: true},
    {label: '银行请求流水号', name: 'sendRequestNo', sortable: false, width: 320},
    {label: '预处理请求流水号', name: 'preSendRequestNo', sortable: false, width: 320},
    {label: '标的号', name: 'projectNo', sortable: false, width: 320},
    {label: '是否预处理', name: 'isPreHandleStr', sortable: false},
    {label: '是否请求', name: 'isSendStr', sortable: false},
    {label: '是否受理', name: 'acceptedStatusStr', sortable: false, width: 320},
    {label: '银行返回信息', name: 'retMsg', sortable: false},
    {label: '请求次数', name: 'requestCount', sortable: false, width: 320},
    {label: '创建时间', name: 'createdDate', sortable: false, width: 320},
    {label: '请求时间', name: 'requestTime', sortable: false},
    {label: '是否回到可用', name: 'isAviBack', sortable: false},
    {label: '交易类型', name: 'tradeType', sortable: false},
    {label: '交易类型(内部)', name: 'tradeTypeId', sortable: false},
    {label: '标的类型', name: 'projectType', sortable: false}
];