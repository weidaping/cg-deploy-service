$(function () {

    $("#jqGrid").jqGrid({
        url: '/sqlRecord/sqlList',
        datatype: "json",
        colModel: [
            {label: '需求名', name: 'demandName',width:120, sortable: false},
            {label: '文件', name: 'fileName',align:"center", width:140, sortable: false},
            {label: '发布评审地址', name: 'textUrl', align:"center",width:80, sortable: false},
            {label: '说明', name: 'remark', sortable: false},
            {
                label: '推送状态',
                name: 'alreadyPush',
                sortable: false,
                width:60,
                align:"center",
                formatter: function (cellvalue, options, rowObject) {
                    switch (cellvalue) {
                        case 1:
                            return "已推送";
                        case 0:
                            return "未推送";
                        default:
                            return "未推送";
                    }
                }
            },
            {
                label: '上线状态',
                name: 'hasSend',
                sortable: false,
                width:60,
                align:"center",
                formatter: function (cellvalue, options, rowObject) {
                    switch (cellvalue) {
                        case 1:
                            return "已上线";
                        case 0:
                            return "未上线";
                        default:
                            return "未上线";
                    }
                }
            },
            {label: '推送时间', name: 'pushTime',align:"center",width:100,  sortable: false},
            {label: '创建时间', name: 'createTime',align:"center",width:100,  sortable: false},
            {
                label: '操作', width:100, sortable: false,
                formatter: function (cellvalue, options, rowObject) {
                    return '<div style="text-align: center"><a class="btn btn-primary" style="text-align: center" title="推送" onclick="pushFile(\'' + rowObject.recordNo + '\',\'' + rowObject.alreadyPush + '\')">推送</a>'
                        + '<a class="btn btn-info" style="text-align: center" title="上线" onclick="publish(\'' + rowObject.recordNo + '\',\'' + rowObject.alreadyPush + '\', \'' + rowObject.hasSend + '\')">上线</a></div>';
                        // + '<a class="btn btn-primary" style="text-align: center" title="编辑" onclick="edit(\'' + rowObject.serviceName + '\',\'' + rowObject.textUrl + '\',\'' + rowObject.buildNo + '\')">编辑</a></div>';
                }
            }
        ],
        // shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 10,
        height: 700,
        rowList: [10,20,50,1000],
        rownumbers: true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        // postData: {
        //     "serviceName": serviceName
        // },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
        },
        onSelectRow: function (id) {
        },
        beforeRequest: function () {
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
        turnId: null
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
            var page = 1;//$("#jqGrid").jqGrid('getGridParam', 'page');
            console.log(page);
            var putData = {};

            $("#jqGrid").jqGrid('setGridParam', {
                postData: putData,
                page: page
            }).trigger("reloadGrid");
        }
    }
});


function searchList() {
    vm.query();
}

//推送
function pushFile(recordNo, alreadyPush) {
    if (alreadyPush == 1) {
       confirm("已经推送过，是否再次推送？", function () {
           layer.open({
               type: 2,
               title: "填写说明",
               area: ['400px', '250px'],
               content:'description.html?recordNo=' + recordNo + "&&url=/testRecord/pushSql"
           });
       });
    } else {
        layer.open({
            type: 2,
            title: "填写说明",
            area: ['400px', '250px'],
            content: 'description.html?recordNo=' + recordNo + "&&url=/testRecord/pushSql"
        });
    }
}


//上线
function publish(recordNo, alreadyPush, hasSend) {

    if (alreadyPush != 1) {
        alert("还没有推送过，不能上线！");
    } else {
        if (hasSend == 1) {
            confirm("已经上线过，是否再次上线？", function () {
                $.ajax({
                    url: '/testRecord/publishSql',
                    type: "POST",
                    data: {recordNo: recordNo},
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 200) {
                            showTips("操作成功！");
                        } else {
                            showTips("操作失败！");
                        }
                    }
                });
            });
        } else {
            $.ajax({
                url: '/testRecord/publishSql',
                type: "POST",
                data: {recordNo: recordNo},
                dataType: "json",
                success: function (data) {
                    if (data.code == 200) {
                        showTips("操作成功！");
                    } else {
                        showTips("操作失败！");
                    }
                }
            });
        }
    }
}


function showTips(message) {
    layer.open({
        type: 0,
        title: "结果",
        area: ['260px', '150px'],
        content: message,
        btn: ['确定'],
        yes: function(index, layero){
            //事件
            location.reload();
        }
    });
}

/**
 * 编辑按钮
 * @param serviceName
 * @param textUrl
 * @param buildNo
 */
function edit(serviceName, textUrl, buildNo) {
    // alert(serviceName + textUrl + buildNo);
    layer.open({
        type: 2,
        title: "编辑发布评审地址",
        area: ['360px', '230px'],
        content:'editTextUrl.html?serviceName=' + serviceName + "&&buildNo=" + buildNo + "&&textUrl=" + textUrl
    });
}