var projectNo = getUrlParam("projectNo");

$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'SubscribeTrans/getList',
        datatype: "json",
        colModel: [
            {label: 'requestNo', name: 'requestNo', sortable: false, key: true},
            {label: 'mainRequestNo', name: 'mainRequestNo', sortable: false},
            {label: 'projectNo', name: 'projectNo', sortable: false},
            {label: 'projectAmount', name: 'projectAmount', sortable: false},
            {label: 'isNeedPre', name: 'isNeedPre', sortable: false},
            {label: 'isNeedSplit', name: 'isNeedSplit', sortable: false},
            {label: 'isCanSplit', name: 'isCanSplit', sortable: false},
            {label: 'transStatus', name: 'transStatus', sortable: false},
            {label: 'errorCount', name: 'errorCount', sortable: false},
            {label: 'requestCount', name: 'requestCount', sortable: false},
            {label: 'retCode', name: 'retCode', sortable: false},
            {label: 'retMsg', name: 'retMsg', sortable: false},
            {label: 'version', name: 'version', sortable: false},
            {label: 'systemName', name: 'systemName', sortable: false},
            {label: 'acceptDate', name: 'acceptDate', sortable: false},
            {label: 'createdDate', name: 'createdDate', sortable: false},
            {label: 'modifyDate', name: 'modifyDate', sortable: false},
            {label: 'tradeType', name: 'tradeType', sortable: false},
            {label: 'tradeTypeId', name: 'tradeTypeId', sortable: false},
            {label: 'projectType', name: 'projectType', sortable: false},
            {label: 'sendRequestNo', name: 'sendRequestNo', sortable: false},
            {label: 'saleRequestNo', name: 'saleRequestNo', sortable: false}
        ],
        shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 10,
        height: 480,
        rowList: [10, 20, 40],
        rownumbers: true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        postData: {
            "projectNo": projectNo
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
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
    },
    methods: {
        query: function () {
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
            putData['requestNo'] = vm.q.requestNo;
            putData['projectNo'] = vm.q.projectNo;

            $("#jqGrid").jqGrid('setGridParam', {
                postData: putData,
                page: page
            }).trigger("reloadGrid");
        }
    }
});