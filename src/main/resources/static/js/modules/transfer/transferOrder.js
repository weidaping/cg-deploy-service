$(function () {

    $("#jqGrid").jqGrid({
        url: baseURL + 'transferOrder/getListForPage',
        datatype: "json",
        colModel: [
            {
                label: 'requestNo', name: 'requestNo', width: 200, sortable: false
            },
            {label: 'orderNo', name: 'orderNo', width: 200, sortable: false},
            {
                label: 'orderStatus',
                name: 'orderStatus',
                sortable: false,
                formatter: function (orderStatus, options, rowObject) {
                    if (orderStatus == "-2") {
                        return "丢弃";
                    } else if (orderStatus == "-1") {
                        return "异常";
                    } else if (orderStatus == "0") {
                        return "冻结（初始）";
                    } else if (orderStatus == "1") {
                        return "转账失败(未解冻)";
                    } else if (orderStatus == "2") {
                        return "转账失败(已解冻)";
                    } else if (orderStatus == "3") {
                        return "转账成功(未解冻)";
                    } else if (orderStatus == "4") {
                        return "已入账(终态)";
                    } else {
                        return "未知";
                    }
                }
            },
            {label: 'amount', name: 'amount', sortable: false},
            {label: 'outMerchantNo', name: 'outMerchantNo', width: 250, sortable: false},
            {label: 'outUserNo', name: 'outUserNo', sortable: false},
            {label: 'inMerchantNo', name: 'inMerchantNo',  sortable: false},
            {label: 'addDate', name: 'addDate', sortable: false},
            {label: 'updateDate', name: 'updateDate', sortable: false},
            {label: 'descr', name: 'descr', width: 230, sortable: false}
        ],
        autowidth: true,
        viewrecords: true,
        rowNum: 20,
        height: 750,
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
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        },
        onSelectRow: function (id) {
            $("#tbxId").val(id);
        }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {},
        showList: true
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'outUserNo': vm.q.outUserNo,'orderStatus':vm.q.orderStatus},
                page: page
            }).trigger("reloadGrid");
        },
        queryBankResult: function () {
            var id = $('#jqGrid').jqGrid('getGridParam',"selrow");
            var rowData  = $('#jqGrid').jqGrid('getRowData',id);
            var requestNo=rowData.requestNo;
            var merchantNo=rowData.outMerchantNo;
            $.ajax({
                type: "GET",
                url: baseURL + 'transferOrder/bank?requestNo='+requestNo+'&merchantNo='+merchantNo,
                success: function (data) {
                    layer.open({
                        title: '查询银行结果',
                        area: ['500px', '300px'],
                        content: JSON.stringify(data),
                        btn: ['关闭'],
                        btnAlign: 'c',
                        cancel: function () {

                        }
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });

        },
        queryResult: function () {
            var id = $('#jqGrid').jqGrid('getGridParam',"selrow");
            var rowData  = $('#jqGrid').jqGrid('getRowData',id);
            var requestNo=rowData.requestNo;
            var outMerchantNo=rowData.outMerchantNo;
            var inMerchantNo=rowData.inMerchantNo;

            layer.open({
                type: 2,
                title: '查询充值提现订单',
                area: ['60%', '60%'],
                content: '/transfer/orderDetail.html?requestNo='+requestNo+'&outMerchantNo='+outMerchantNo+'&inMerchantNo='+inMerchantNo,
                btn: ['关闭'],
                btnAlign: 'c',
                success:function(layero,index){
                    debugger;
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    iframeWin. getData(requestNo,outMerchantNo,inMerchantNo)

                },
                cancel: function () {

                }
            });

        }
    }
});

function test() {
    alert("a");
}