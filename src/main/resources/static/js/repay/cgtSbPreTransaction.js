var jqgridtemp;

$(function () {
    jqgridtemp = $("#jqGrid").jqGrid({
        url: baseURL + 'repay/preProblem/getList',
        datatype: "json",
        colModel: colData,
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
        postData: {
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
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'requestNo': vm.q.requestNo,
                    'projectNo': vm.q.projectNo,
                    'comRequestNo': vm.q.comRequestNo,
                    'bizType': vm.q.bizType,
                    'cbuse': vm.q.cbuse,
                    'isUnion': vm.q.isUnion
                },
                page: page
            }).trigger("reloadGrid");
        },
        resetError: function () {
            confirm("确认重置预处理错误次数吗？",function(){
                $.ajax({
                    url: baseURL + "repay/preProblem/resetError",
                    type: "POST",
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 0) {
                            alert("重置成功！！！");
                        } else {
                            alert("出错了" + data);
                        }
                    },
                    error:function(data){
                        if(data.status==494){
                            window.location.href = data.responseText ;
                        }
                    }
                })
            }) ;
        }
    }
});
var columnData2 = [
    {label: '表名', name: 'tableIndex', width: 130, sortable: false},
    {label: '原始流水号', name: 'requestNo', width: 300, sortable: false},
    {label: '银行请求流水号', name: 'sendRequestNo', sortable: false},
    {label: '标的号', name: 'projectNo', width: 300, sortable: false},
    {label: '银行返回信息', name: 'retMsg', sortable: false},
    {label: '请求次数', name: 'requestCount', sortable: false},
    {label: '创建时间', name: 'createdDate', sortable: false},
    {label: '是否回到可用', name: 'isAviBack', sortable: false,formatter: function(value, options, row){
            if(value==1){
                return '是'
            }else{
                return '否'
            }
        }},
    {label: '需要合并处理', name: 'needUnion', sortable: false,formatter: function(value, options, row){
            if(value==1){
                return '是'
            }else{
                return '否'
            }
        }},
    {label: '合并流水号', name: 'unionRequestNo', sortable: false},
    {label: '金额', name: 'amount', sortable: false},
    {label: '用户', name: 'platformUserNo', sortable: false},
    {label: '业务类型', name: 'bizType', sortable: false},
    {label: '标的类型', name: 'projectType', sortable: false}
];
var colData = columnData2;
