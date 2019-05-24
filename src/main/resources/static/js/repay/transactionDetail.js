var transactionNo = getUrlParam("transactionNo");
var projectNo = getUrlParam("projectNo");
$(function () {
    vm.q.transactionNo = transactionNo;
    $("#jqGrid").jqGrid({
        url: '/repay/problem/getDetails',
        datatype: "json",
        colModel: [
            {label: '明细流水号', name: 'requestNo', sortable: false, key: true},
            {label: '交易流水号', name: 'transRequestNo', sortable: false},
            {label: '标的号', name: 'projectNo', sortable: false},
            {label: '业务类型', name: 'bizType', sortable: false},
            {label: '预处理号（cgt_we_order_id）', name: 'freezeRequestNo', sortable: false},
            {label: '出款人', name: 'sourcePlatformUserNo', sortable: false},
            {label: '入款人', name: 'targetPlatformUserNo', sortable: false},
            {label: '本息', name: 'amount', sortable: false},
            {label: '利息', name: 'income', sortable: false},
            {label: '排序', name: 'internalOrder', sortable: false},
            {label: '自定义信息', name: 'customDefine', sortable: false}
        ],
        shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 1000,
        height: '600',
        rowList: [1000],
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
        postData: {
            "transRequestNo": transactionNo,
            "projectNo": projectNo
        },
        onSelectRow: function (id) {
            $("#tbxDetailRequestNo").val(id);
            $("#tbxDetailProjectNo").val($("#jqGrid").getRowData(id).projectNo);
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            //$("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $('#openResetOrderLayer').on('click', function () {
        var requestNo = $("#tbxDetailRequestNo").val();
        if (requestNo == null || requestNo.trim() === '') {
            alert("至少要选择一条记录");
            return;
        }
        var layerIndex = layer.open({
            type: 1,
            title: '修改明细的顺序',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['600px', '200px'],
            move: false,
            content: $("#transDetail"),
            end: function () {
                $("#order").val("") ;
            }
        });
        $("#tbxLayerIndex").val(layerIndex);
    });

    $('#closeResetOrderLayer').on('click', function () {
        var layerIndex = $("#tbxLayerIndex").val();
        layer.close(layerIndex);
        $("#tbxLayerIndex").val('');
    });

    $('#resetOrder').on('click', function () {
        var requestNo = $("#tbxDetailRequestNo").val();
        var projectNo = $("#tbxDetailProjectNo").val();
        var order = $("#order").val();
        if (requestNo == null || requestNo.trim() === '') {
            alert("至少要选择一条记录");
            return;
        }
        confirm("确定执行明细顺序修改吗？", function () {
            $.ajax({
                url: "/repay/repair/trans/order/reset",
                type: "POST",
                async: false,
                dataType: "json",
                data: {"requestNo": requestNo, "projectNo": projectNo, "order": order},
                success: function (result) {
                    if (result.code === 0 && result.res) {
                        alert("重置成功！");

                        var layerIndex = $("#tbxLayerIndex").val();
                        layer.close(layerIndex);
                        $("#tbxLayerIndex").val('');

                        var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                        var putData = {};
                        putData['transRequestNo'] = transactionNo;
                        $("#jqGrid").jqGrid('setGridParam', {
                            postData: putData,
                            page: page
                        }).trigger("reloadGrid");
                    }
                    else {
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
        checkedNames: []
    },
    methods: {
        reload: function () {
            vm.q.addkey = null;
            vm.q.keyDescribe = null;
            vm.keyId == null;
            vm.showList = true;
            vm.commit = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            var putData = {};
            if (vm.q.transactionNo != undefined) {
                putData['transRequestNo'] = vm.q.transactionNo.trim();
            }

            $("#jqGrid").jqGrid('setGridParam', {
                postData: putData,
                page: page
            }).trigger("reloadGrid");
        }
    }
});

