$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'dbTask/getTaskList',
        datatype: "json",
        colModel: [
            {label: 'IP', name: 'ip', sortable: false},
            {label: '作业名称', name: 'jobName', sortable: false},
            {
                label: '最近执行状态', name: 'stepStatus', sortable: false,
                formatter: function (cellvalue, options, rowObject) {
                    switch (cellvalue) {
                        case "Canceled":
                            return "注销";
                        case "Failed":
                            return "运行错误";
                        case "Not Running":
                            return "没有启动";
                        case "Retry":
                            return "重试";
                        case "Running":
                            return "运行中";
                        case "Successed":
                            return "正常";
                        default:
                            return "未知状态";
                    }
                }
            },
            {label: '最近执行时长', name: 'executeTime', sortable: false},
            {label: '描述', name: 'description', sortable: false},
            {label: '创建时间', name: 'dateCreated', sortable: false},
            {
                label: '是否启用', name: 'enable', sortable: false, formatter: function (cellvalue, options, rowObject) {
                    switch (cellvalue) {
                        case "1":
                            return "启用";
                        case "0":
                            return "未启用";
                        default:
                            return "全部";
                    }
                }
            },
            {label: '运行计划', name: 'executeInfo', sortable: false},
            {
                label: '操作', sortable: false,
                formatter: function (cellvalue, options, rowObject) {
                    return '<a class="btn btn-default" title="详情" onclick="viewDetail(\'' + rowObject.ip + '\',\'' + rowObject.jobId + '\')">详情</a>' +
                        ' <a class="btn btn-default" title="停止" onclick="stop(\'' + rowObject.ip + '\',\'' + rowObject.jobName + '\')">停止</a>' +
                        ' <a class="btn btn-default" title="重启" onclick="restart(\'' + rowObject.ip + '\',\'' + rowObject.jobName + '\')">重启</a>';
                }
            }
        ],
        // shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 1000,
        height: 700,
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
        gridComplete: function () {
        },
        onSelectRow: function (id) {
            $("#hidRequestNo").val(id);
        },
        beforeRequest: function () {
        }
    });

    $("#selStatus").select2();
    $("#selStatus").val("");
    $("#selStatus").change();
    $("#selOpen").select2();
    $("#selOpen").val("");
    $("#selOpen").change();
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
        turnId: null
    },
    created: function () {
        var url = baseURL + "dbTask/getDbTaskIpList";
        $.get(url, function (r) {
            if(r.resultDTO.code==200) {
                vm.q.list = r.resultDTO.data;
                for (var i = 0; i < vm.q.list.length; i++) {
                    $("#selIp").append("<option>" + vm.q.list[i] + "</option>");
                }
                $("#selIp").select2();
                $("#selIp").val("");
                $("#selIp").change();
            }
        });
    },
    methods: {
        query: function () {
            $("#hidRequestNo").val("");
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
            putData['ip'] = $("#selIp").val();
            putData['jobName'] = $("#tbxWork").val();
            putData['status'] = $("#selStatus").val();
            putData['enabled'] = $("#selOpen").val();

            $("#jqGrid").jqGrid('setGridParam', {
                postData: putData,
                page: page
            }).trigger("reloadGrid");
        }
    }
});

function viewDetail(ip, jobId) {
    var index = layer.open({
        type: 2,
        title: "任务详情列表",
        content: 'taskDetail.html?ip=' + ip + '&jobId=' + jobId
    });
    layer.full(index);
}

function stop(ip, jobName) {
    confirm("确定停止【" + jobName + "】作业？", function () {
        $.ajax({
            url: baseURL + "dbTask/manageTaskJob",
            type: "POST",
            async: true,
            dataType: "json",
            data: {"ip": ip, "jobName": jobName, "action": "stop"},
            success: function (result) {
                alert(result.resultDTO.data, function () {
                    vm.reload();
                });
            },
            error: function (xhr, status, error) {
            }
        });
    });
}

function restart(ip, jobName) {
    confirm("确定重启【" + jobName + "】作业？", function () {
        $.ajax({
            url: baseURL + "dbTask/manageTaskJob",
            type: "POST",
            async: true,
            dataType: "json",
            data: {"ip": ip, "jobName": jobName, "action": "restart"},
            success: function (result) {
                alert(result.resultDTO.data, function () {
                    vm.reload();
                });
            },
            error: function (xhr, status, error) {
            }
        });
    });
}