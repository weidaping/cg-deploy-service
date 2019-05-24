var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            db: 0,
            key: "",
            value: "",
            redisDb: "",
        },
        zkServiceList: null,
        showList: true,
        title: null,
        select_db: false
    },
    created: function () {
        this.query();
    },
    methods: {
        query: function () {
            $.ajax({
                type: "GET",
                url: baseURL + "zkService/getServiceList",
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.zkServiceList = r.zkServiceList;
                        if (vm.zkServiceList != null && vm.zkServiceList.length > 0) {
                            for (var i = 0; i < vm.zkServiceList.length; i++) {
                                var serviceTable = $(serviceTemplate).clone(true), serviceData = vm.zkServiceList[i];
                                serviceTable.attr('data-serviceName', serviceData.serviceName);
                                serviceTable.attr('data-serviceProfile', serviceData.profile);
                                serviceTable.find('thead:nth-of-type(1) tr th:nth-of-type(1) span:nth-of-type(2)').html(parseServiceName(serviceData));
                                serviceTable.find('tbody:nth-of-type(1) tr td:nth-of-type(1)').append(parseClusterNodes(serviceData.clusterNodes));
                                parseJob(serviceTable, serviceData.zkJobProp.clusterConfigs);
                                $('#table-container').append(serviceTable);
                            }
                        } else {
                            alert('暂时查询不到使用zk协调调度框架的服务')
                        }
                    } else {
                        console.log(r);
                    }
                }
            });
        },
        reloadTable: function () {
            $('#table-container').html('');
            vm.query();
        }
    }
});

function parseClusterNodes(clusterNodes) {
    if (clusterNodes.length > 0) {
        var html = "<div style='display: inline-block; position: relative; left: 6%;'></div>";
        var h = $(html);
        for (var i = 0; i < clusterNodes.length; i++) {
            var clusterNode = $(buttonTemplate).clone(true), nodeValue = clusterNodes[i];
            clusterNode.text(nodeValue);
            h.append(clusterNode);
        }
        return h;
    } else {
        return '';
    }
}

function parseJob(serviceTable, clusterConfigs) {
    for (var i = 0; i < clusterConfigs.length; i++) {
        var clusterConfig = clusterConfigs[i],
            jobtemp = $(jobTemplate).clone(true);
        jobtemp.find('td:nth-of-type(1)').text(i + 1);
        jobtemp.find('td:nth-of-type(2)').text(clusterConfig.jobName);
        jobtemp.find('td:nth-of-type(4)').text(clusterConfig.cron);
        var isSuspend = validator.equals(clusterConfig.suspend.toLowerCase(), "ON".toLowerCase());
        jobtemp.find('td:nth-of-type(3)').text(clusterConfig.remark);
        if (isSuspend) {
            jobtemp.find('td:nth-of-type(6) span').addClass('label-danger');
            jobtemp.find('td:nth-of-type(6) span').text('下线');
        } else {
            jobtemp.find('td:nth-of-type(6) span').addClass('label-success');
            jobtemp.find('td:nth-of-type(6) span').text('上线');
        }
        serviceTable.find('tbody:nth-of-type(2)').append(jobtemp);
    }
}

function switchTask(event) {
    var parents = $(event).parents('div[data-serviceName]');
    var trParent = $(event).parents('tr');
    var serviceName = parents.attr('data-serviceName'),
        profile = parents.attr('data-serviceProfile'),
        jobName = trParent.find('td:nth-of-type(2)').text(),
        isClose = $(event).attr('data-isClose'),
        state = trParent.find('td:nth-of-type(6) span').text();
    if (!judgeJobState(trParent, isClose)) {
        alert('该任务状态为  “' + state + "”  无需变更");
        return;
    }
    $.ajax({
        type: "POST",
        url: baseURL + "zkService/switchTask",
        dataType: "json",
        data: {
            "serviceName": serviceName,
            "profile": profile,
            "jobName": jobName,
            "isClose": isClose
        },
        success: function (data) {
            if (data.result == true) {
                parseState(isClose, trParent)
                alert('操作成功！！！');
            } else {
                alert("更新任务状态失败！！请稍后再试");
                vm.reloadTable();
            }
        },
        error: function (data) {
            alert("异常，请与管理员联系！！ " + data);
        }
    })
}


function switchService(event) {
    var serviceTable = $(event).parents('div[data-serviceName]');
    var isClose = $(event).attr('data-isClose'),
        serviceName = serviceTable.attr('data-serviceName'),
        profile = serviceTable.attr('data-serviceProfile'),
        jobsTr = serviceTable.find('tbody:nth-of-type(2) tr');
    if (!judgeAllJobState(jobsTr, isClose)) {
        alert('该服务全部任务已处于  “' + $(event).text() + "”  无需变更");
        return;
    }
    $.ajax({
        type: "POST",
        url: baseURL + "zkService/switchService",
        dataType: "json",
        data: {
            "serviceName": serviceName,
            "profile": profile,
            "isClose": isClose
        },
        success: function (data) {
            if (data.code == 0 && data.result == true) {
                for (var i = 0; i < jobsTr.length; i++) {
                    parseState(isClose, $(jobsTr[i]));
                }
                alert('操作成功！！！');
            } else {
                alert("更新任务状态失败！！请稍后再试");
                vm.reloadTable();
            }
        },
        error: function (data) {
            alert("异常，请与管理员联系！！ " + data);
        }
    })
}

function executorTask(event) {
    var trParent = $(event).parents('tr');
    var serviceTable = $(event).parents('div[data-serviceName]'),
        serviceName = serviceTable.attr('data-serviceName'),
        profile = serviceTable.attr('data-serviceProfile'),
        jobName = trParent.find('td:nth-of-type(2)').text();
    var nodeLength = serviceTable.find('tbody:nth-of-type(1) tr td:nth-of-type(1) div').length;
    if (nodeLength == 0) {
        alert("该服务不存在运行节点，本次退出.");
        return
    }
    $.ajax({
        type: "POST",
        url: baseURL + "zkService/executeTask",
        dataType: "json",
        data: {
            "serviceName": serviceName,
            "profile": profile,
            "jobName": jobName
        },
        success: function (data) {
            if (data.code == 0 && data.result == true) {
                alert("执行成功")
            } else {
                alert("执行任务失败！！请稍后再试");
            }
        },
        error: function (data) {
            alert("异常，请与管理员联系！！ " + data);
        }
    })


}

function parseState(isClose, trParent) {
    if (isClose == "true") {
        trParent.find('td:nth-of-type(6) span').removeClass('label-danger label-success');
        trParent.find('td:nth-of-type(6) span').addClass('label-danger');
        trParent.find('td:nth-of-type(6) span').text('下线');
    } else {
        trParent.find('td:nth-of-type(6) span').removeClass('label-danger label-success');
        trParent.find('td:nth-of-type(6) span').addClass('label-success');
        trParent.find('td:nth-of-type(6) span').text('上线');
    }
}

function judgeAllJobState(jobsTr, isClose) {
    for (var i = 0; i < jobsTr.length; i++) {
        if (judgeJobState($(jobsTr[i]), isClose)) {
            return true;
        }
    }
    return false;
}

function judgeJobState(trParent, isClose) {
    var state = trParent.find('td:nth-of-type(6) span').text();
    if (isClose == "true") {
        if (state == "上线") {
            return true;
        } else {
            return false;
        }
    } else {
        if (state == "上线") {
            return false;
        } else {
            return true;
        }
    }
}

function parseServiceName(serviceData) {
    var text = serviceData.serviceName;
    if (serviceData.zkJobProp.systemName) {
        text += '<span class="label badge-warning" style="margin-left: 10px; background-color: #f89406;">DQSYSTEM</span>'
    }
    return text ;
}

var serviceTemplate = '<div class="panel panel-primary">' +
    '            <div class="panel-heading"></div>' +
    '            <table class="table table-bordered">' +
    '                <thead>' +
    '                <tr>' +
    '                    <th colspan="5">' +
    '                        <span style="font-weight: bold">服务名:</span>' +
    '                        <span style="position: relative;font-weight: normal;left: 10%;">cg-repay-consumer-job</span>\n' +
    '                    </th>' +
    '                    <th colspan="2">操作</th>' +
    '                </tr>' +
    '                </thead>' +
    '                <tbody>' +
    '                <tr>' +
    '                    <td colspan="5">' +
    '                        <span style="font-weight: bold;margin-right: 20px">服务器列表:</span>' +
    '                    </td>' +
    '                    <td colspan="2">' +
    '                        <button type="button" class="btn btn-primary" data-isClose=true onclick="switchService(this)" data-loading-text="加载中...">停服</button>' +
    '                        <button type="button" class="btn btn-primary" data-isClose=false onclick="switchService(this)" data-loading-text="加载中...">开服</button>' +
    '                    </td>' +
    '                </tr>' +
    '                </tbody>' +
    '                <thead>' +
    '                <tr>' +
    '                    <th>顺序</th>' +
    '                    <th>作业</th>' +
    '                    <th>备注</th>' +
    '                    <th>cron表达式</th>' +
    '                    <th>负责人</th>' +
    '                    <th>状态</th>' +
    '                    <th>操作</th>' +
    '                </tr>' +
    '                </thead>' +
    '                <tbody>' +
    '                </tbody>' +
    '            </table>' +
    '        </div>',
    buttonTemplate = '<button type="button" class="btn btn-default">（默认样式）Default</button>',
    jobTemplate = '<tr>' +
        '<td>1</td>' +
        '<td>BatchTransJob</td>' +
        '<td></td>' +
        '<td>* * * * * *</td>' +
        '<td></td>' +
        '<td><span class="label" style="font-size: 15px;">下线</span></td>' +
        '<td><button type="button" class="btn btn-primary" data-loading-text="加载中..." onclick="executorTask(this)" data-complete-text="Loading finished">执行</button>' +
        '    <button type="button" class="btn btn-primary" data-isClose=true data-loading-text="加载中..." onclick="switchTask(this)" data-complete-text="Loading finished">停止</button>' +
        '    <button type="button" class="btn btn-primary" data-isClose=false data-loading-text="加载中..." onclick="switchTask(this)" data-complete-text="Loading finished">恢复</button>' +
        '   </td>' +
        '</tr>';