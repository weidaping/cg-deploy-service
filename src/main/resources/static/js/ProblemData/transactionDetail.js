var transactionNo = getUrlParam("transactionNo");
var projectNo = getUrlParam("projectNo");

$(function () {
    vm.q.transactionNo = transactionNo;
    $("#jqGrid").jqGrid({
        url: baseURL + 'transactionDetailV3/getList',
        datatype: "json",
        colModel: [
            {label: 'requestNo', name: 'requestNo', sortable: false, key: true},
            {label: 'transRequestNo', name: 'transRequestNo', sortable: false},
            {label: 'bizType', name: 'bizType', sortable: false},
            {label: 'bizTypeId', name: 'bizTypeId', sortable: false},
            {label: 'projectNo', name: 'projectNo', sortable: false},
            {label: 'internalOrder', name: 'internalOrder', sortable: false},
            {label: 'freezeRequestNo', name: 'freezeRequestNo', sortable: false},
            {label: 'sourcePlatformUserNo', name: 'sourcePlatformUserNo', sortable: false},
            {label: 'targetPlatformUserNo', name: 'targetPlatformUserNo', sortable: false},
            {label: 'amount', name: 'amount', sortable: false},
            {label: 'income', name: 'income', sortable: false},
            {label: 'shareNo', name: 'shareNo', sortable: false, width: 180},
            {label: 'customDefine', name: 'customDefine', sortable: false},
            {label: 'createdDate', name: 'createdDate', sortable: false}
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
        gridComplete: function () {
            //隐藏grid底部滚动条
            //$("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
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
        checkedNames: []
    },
    methods: {
        query: function () {
            if (vm.q.transactionNo == undefined || vm.q.transactionNo.trim() === "") {
                alert("请输入交易表requestNo", function () {
                    $("#tbxFreezeRequestNo").focus();
                });
                return false;
            }
            if (!isUUID(vm.q.transactionNo.trim())) {
                alert("交易表requestNo格式不正确，请重新输入", function () {
                    $("#tbxFreezeRequestNo").focus();
                });
                return false;
            }
            vm.reload();
        },
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