$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'ProjectCreate/getList',
        datatype: "json",
        colModel: [
            {label: 'requestNo', name: 'requestNo', sortable: false, key: true},
            {label: 'platformUserNo', name: 'platformUserNo', sortable: false},
            {label: 'projectNo', name: 'projectNo', sortable: false},
            {label: 'projectName', name: 'projectName', sortable: false},
            {label: 'projectDescription', name: 'projectDescription', sortable: false},
            {label: 'projectType', name: 'projectType', sortable: false},
            {label: 'annualInterestRate', name: 'annualInterestRate', sortable: false},
            {label: 'projectAmount', name: 'projectAmount', sortable: false},
            {label: 'repaymentWay', name: 'repaymentWay', sortable: false},
            {label: 'repayInstallment', name: 'repayInstallment', sortable: false},
            {label: 'callbackStatus', name: 'callbackStatus', sortable: false},
            {label: 'requestCount', name: 'requestCount', sortable: false},
            {label: 'errorCount', name: 'errorCount', sortable: false},
            {label: 'lastRequestNo', name: 'lastRequestNo', sortable: false},
            {label: 'createTime', name: 'createTime', sortable: false},
            {label: 'updateTime', name: 'updateTime', sortable: false},
            {label: 'callbackTime', name: 'callbackTime', sortable: false},
            {label: 'returnMsg', name: 'returnMsg', sortable: false},
            {label: 'version', name: 'version', sortable: false},
            {label: 'bizTime', name: 'bizTime', sortable: false}
        ],
        shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 20,
        height: 700,
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