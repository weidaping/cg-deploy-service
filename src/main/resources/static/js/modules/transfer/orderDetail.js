function getData(requestNo, outMerchantNo, inMerchantNo) {
    var vm = new Vue({
        el: '#rrapp',
        data: {
            q: {},
            showList: true

        }
    });

    var vm1 = new Vue({
        el: '#rrapp1',
        data: {
            q: {},
            showList: true
        }
    });

    $("#jqGrid").jqGrid({
        url: baseURL + 'transferOrder/withdraw?orderNo='+requestNo+'&merchantNo='+outMerchantNo,
        datatype: "json",
        colModel: [
            {
                label: '提现ID', name: 'id', width: 200, sortable: false
            },
            {label: '用户Id', name: 'userId', width: 200, sortable: false},
            {
                label: '状态',
                name: 'status',
                sortable: false,
                formatter: function (status, options, rowObject) {
                     if (status == "0") {
                        return "冻结（初始）";
                    } else if (status == "1") {
                        return "失败";
                    } else if (status == "2") {
                        return "成功";
                    } else {
                        return "未知";
                    }
                }
            },
            {label: '金额', name: 'amount', sortable: false}
        ],
        autowidth: true,
        viewrecords: true,
        rowNum: 20,
        height: 100,
        rowList: [20, 40, 60],
        jsonReader: {
            root: "page"
        },
    });

    debugger;
    $("#jqGrid1").jqGrid({
        url: baseURL + 'transferOrder/recharge?orderNo='+requestNo+'&merchantNo='+inMerchantNo,
        datatype: "json",
        colModel: [
            {label: '用户Id', name: 'userId', width: 200, sortable: false},
            {
                label: '状态',
                name: 'status',
                sortable: false,
                formatter: function (status, options, rowObject) {
                    if (status == "0") {
                        return "冻结（初始）";
                    } else if (status == "1") {
                        return "失败";
                    } else if (status == "2") {
                        return "成功";
                    } else {
                        return "未知";
                    }
                }
            },
            {label: '金额', name: 'amount', sortable: false}
        ],
        autowidth: true,
        viewrecords: true,
        rowNum: 20,
        height: 100,
        rowList: [20, 40, 60],
        jsonReader: {
            root: "recharge"
        },
    });

}