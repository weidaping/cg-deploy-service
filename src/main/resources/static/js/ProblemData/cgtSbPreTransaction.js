var jqgridtemp;

$(function () {
    jqgridtemp = $("#jqGrid").jqGrid({
        url: baseURL + 'cgtSbPreTransaction/getListForPage',
        datatype: "json",
        colModel: colData,
        shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 20,
        height: 700,
        rowList: [10, 40, 60],
        rownumbers: true,
        multiselect: false,
        pager: "#jqGridPager",
        gridview: true,
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
        postData:{
            'bizType': vm.q.bizType
        }
    });

});

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            bizType: "REPAYMENT"
        },
        showList: true
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData: {
                    'requestNo': vm.q.requestNo,
                    'projectNo': vm.q.projectNo,
                    'comRequestNo': vm.q.comRequestNo,
                    'bizType': vm.q.bizType,
                    'cbuse': vm.q.cbuse
                },
                page: page
            }).trigger("reloadGrid") ;
        }
    }
});
var columnData = [
        {label: 'requestNo', name: 'requestNo', sortable: false},
        {
            label: 'transactionNo',
            name: 'detailList',
            width: 200,
            sortable: false,
            formatter: function (detailList, options, rowObject) {
                var o = detailList[0];
                if (o != null) {
                    return o.transactionNo
                }
                return "";
            }
        },
        {label: 'platformUserNo', name: 'platformUserNo', width: 200, sortable: false},
        {label: 'bizType', name: 'bizType', width: 200, sortable: false},
        {label: 'amount', name: 'amount', width: 150, sortable: false},
        {label: 'remark', name: 'remark', sortable: false},
        {label: 'projectNo', name: 'projectNo', sortable: false},
        {label: 'share', name: 'share', width: 100, sortable: false},
        {label: 'creditsaleRequestNo', name: 'creditsaleRequestNo', width: 250, sortable: false},
        {label: 'isFullLoan', name: 'isFullLoan', sortable: false},
        {label: 'projectStatus', name: 'projectStatus', width: 200, sortable: false},
        {label: 'addDate', name: 'addDate', width: 200, sortable: false},
        {label: 'updateDate', name: 'updateDate', width: 200, sortable: false},
        {label: 'callbackStatus', name: 'callbackStatus', width: 200, sortable: false},
        {label: 'errorCount', name: 'errorCount', sortable: false},
        {label: 'requestCount', name: 'requestCount', width: 200, sortable: false},
        {label: 'isSend', name: 'isSend', sortable: false},
        {label: 'projectType', name: 'projectType', sortable: false},
        {label: 'isRepaymentBack', name: 'isRepaymentBack', width: 230, sortable: false},
        {label: 'comRequestNo', name: 'comRequestNo', width: 200, sortable: false},
        {label: 'isCombine', name: 'isCombine', sortable: false}
    ],
    columnData2 = [
        {label: 'requestNo', name: 'requestNo', sortable: false},
        {label: 'transactionNo', name: 'transactionNo', sortable: false},
        {label: 'bizType', name: 'bizType', width: 200, sortable: false},
        {label: 'platformUserNo', name: 'platformUserNo', width: 200, sortable: false},
        {label: 'amount', name: 'amount', width: 150, sortable: false},
        {label: 'isAviBack', name: 'isAviBack', sortable: false},
        {label: 'remark', name: 'remark', sortable: false},
        {label: 'projectNo', name: 'projectNo', width: 100, sortable: false},
        {label: 'errorCount', name: 'errorCount', width: 250, sortable: false},
        {label: 'requestCount', name: 'requestCount', sortable: false},
        {label: 'requestTime', name: 'requestTime', width: 200, sortable: false},
        {label: 'unionRequestNo', name: 'unionRequestNo', width: 200, sortable: false},
        {label: 'isUnionMaster', name: 'isUnionMaster', width: 200, sortable: false},
        {label: 'needUnion', name: 'needUnion', width: 200, sortable: false},
        {label: 'projectType', name: 'projectType', sortable: false},
        {label: 'unionStatus', name: 'unionStatus', width: 200, sortable: false},
        {label: 'status', name: 'status', sortable: false},
        {label: 'retCode', name: 'retCode', sortable: false},
        {label: 'retMsg', name: 'retMsg', width: 230, sortable: false},
        {label: 'createdDate', name: 'createdDate', width: 200, sortable: false},
        {label: 'modifyDate', name: 'modifyDate', sortable: false},
        {label: 'version', name: 'version', sortable: false},
        {label: 'sendRequestNo', name: 'sendRequestNo', sortable: false}
    ];
var colData = columnData2;
