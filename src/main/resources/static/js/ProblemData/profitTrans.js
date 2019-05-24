var projectNo = getUrlParam("projectNo");

$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'ProfitTrans/getList',
        datatype: "json",
        colModel: [
            {label: 'requestNo', name: 'requestNo', sortable: false, key: true},
            {label: 'transRequestNo', name: 'transRequestNo', sortable: false},
            {label: 'projectNo', name: 'projectNo', sortable: false},
            {label: 'bizType', name: 'bizType', sortable: false},
            {label: 'internalOrder', name: 'internalOrder', sortable: false},
            {label: 'freezeRequestNo', name: 'freezeRequestNo', sortable: false},
            {label: 'sourcePlatformUserNo', name: 'sourcePlatformUserNo', sortable: false},
            {label: 'targetPlatformUserNo', name: 'targetPlatformUserNo', sortable: false},
            {label: 'amount', name: 'amount', sortable: false},
            {label: 'income', name: 'income', sortable: false},
            {label: 'shareNo', name: 'shareNo', sortable: false},
            {label: 'investType', name: 'investType', sortable: false},
            {label: 'customDefine', name: 'customDefine', sortable: false},
            {label: 'createdDate', name: 'createdDate', sortable: false},
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