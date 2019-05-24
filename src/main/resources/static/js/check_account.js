$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'check/getAccount',
        datatype: "json",
        colModel: [
            { label: '用户名', name: 'username', index: "user_id", width: 125, key: true },
            { label: '收支平衡差', name: 'difference', width: 75 },
            { label: '活动实际', name: 'activity_actual', width: 75 },
            { label: '显示（活动）', name: 'activity_count', width: 75 },
            { label: '计算值（活动）', name: 'actual', width: 90 },
            { label: '复x', name: 'fu_x', width: 75 },
            { label: '显示（复）', name: 'fu1', width: 75 },
            { label: '显示净利息（复）', name: 'x1', width: 75 },
            { label: '复差+活差', name: 'y1', width: 80 },
            { label: '分期we计划数量', name: 'wePlan', width: 80 },
            { label: '股票配支', name: 'gPProfit', width: 80 },
        ],
        viewrecords: true,
        rowNum: 10,
        height: 385,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});
var vm = new Vue({
    el:'#rrapp',
    data:{
        q: {
            query:""
        },
    },
    methods: {
        query: function () {
            vm.title = "查账";
            vm.reload();
        },
        reload: function () {
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'text': vm.q.query},
                page:page
            }).trigger("reloadGrid");
        }
    }
});

