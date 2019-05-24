$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'FundDetailCGT/getList',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', sortable: false},
            {label: 'userId', name: 'userId', sortable: false},
            {label: 'type', name: 'type', sortable: false},
            {label: 'amount', name: 'amount', sortable: false},
            {
                label: 'addDate',
                name: 'addDate',
                width: 200,
                sortable: false,
                formatter: function (cellvalue, options, rowObject) {
                    var cellTime = new Date().format(cellvalue);
                    var nowTime = getNowFormatDate();
                    var dateDiff = GetDateDiff(cellTime, nowTime, "minute");
                    if (dateDiff >= 20) {
                        return "<font color=red>" + cellTime + "</font>";
                    }
                    return cellTime;
                }
            },
            {label: 'desc', name: 'desc', width: 300, sortable: false},
            {label: 'operationId', name: 'operationId', sortable: false},
            {label: 'fundProjectId', name: 'fundProjectId', sortable: false},
            {label: 'payOutAmount', name: 'payOutAmount', sortable: false},
            {label: 'inAmount', name: 'inAmount', sortable: false},
            {label: 'type2', name: 'type2', sortable: false},
            {label: 'cgtStatus', name: 'cgtStatus', sortable: false},
            {label: 'requestNo', name: 'requestNo', sortable: false},
            {label: 'requestNo2', name: 'requestNo2', sortable: false},
            {label: 'requestNo3', name: 'requestNo3', sortable: false}
        ],
        shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 20,
        height: 650,
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
            $("#tbxId").val(id);
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
            putData['keyName'] = vm.q.keyName;
            putData['ddlType'] = $("#ddlType").val();
            $("#jqGrid").setGridParam({postData: putData});
        }
    });
});


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
            $("#tbxId").val("");
            vm.q.addkey = null;
            vm.q.keyDescribe = null;
            vm.keyId == null;
            vm.showList = true;
            vm.commit = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'keyName': vm.q.keyName, 'ddlType': vm.q.ddlType},
                page: page
            }).trigger("reloadGrid");
        },
        add: function () {
            var id = $("#tbxId").val();
            if (id.length > 0) {
                confirm("确定将此条记录添加到异常排除表吗？", function () {
                    $.ajax({
                        url: "/FundDetailCGT/getCountForNotIn",
                        type: "POST",
                        async: true,
                        dataType: "json",
                        data: {"id": $("#tbxId").val()},
                        success: function (result) {
                            if (result.count > 0) {
                                alert("此笔数据已经排除！");
                            }
                            else {
                                vm.addAction();
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            }
            else {
                alert("请先选择需要添加到异常排除的行！");
            }
        },
        addAction: function () {
            $.ajax({
                url: "/FundDetailCGT/insertNotInRecord",
                type: "POST",
                async: true,
                dataType: "json",
                data: {"id": $("#tbxId").val()},
                success: function (result) {
                    if (result.isSuccess > 0) {
                        alert("排除成功！");
                    }
                    else {
                        alert("排除失败")
                    }
                },
                error: function (xhr, status, error) {
                }
            });
        }
    }
});