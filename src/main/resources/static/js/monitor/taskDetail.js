var ip = getUrlParam("ip");
var jobId = getUrlParam("jobId");

$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'dbTask/getTaskDolist',
        datatype: "json",
        colModel: [
            {label: '实例', name: 'instanceId', sortable: false, width: '50'},
            {label: '起始时间', name: 'startTime', sortable: false, width: '50'},
            {label: '持续时间', name: 'duration', sortable: false, width: '50'},
            {
                label: '运行状态', name: 'runStatus', sortable: false, width: '50',
                formatter: function (cellvalue, options, rowObject) {
                    switch (cellvalue) {
                        case "1":
                            return "成功";
                        case "0":
                            return "失败";
                        case "2":
                            return "重试";
                        case "3":
                            return "取消";
                        case "4":
                            return "正常进行";
                        default:
                            return "未知状态";
                    }
                }
            },
            {label: '信息详情', name: 'message', sortable: false}
        ],
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
            root: "resultDTO.data"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        postData: {
            "ip": ip,
            "jobId": jobId
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
    methods: {}
});