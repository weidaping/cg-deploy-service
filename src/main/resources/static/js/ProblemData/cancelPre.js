$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'CancelPre/getList',
        datatype: "json",
        colModel: [
            {label: 'requestNo', name: 'requestNo', sortable: false, key: true},
            {label: 'originalRequestNo', name: 'originalRequestNo', sortable: false},
            {label: 'amount', name: 'amount', sortable: false},
            {label: 'sendRequestNo', name: 'sendRequestNo', sortable: false},
            {label: 'status', name: 'status', sortable: false},
            {label: 'retCode', name: 'retCode', sortable: false},
            {label: 'retMsg', name: 'retMsg', sortable: false},
            {label: 'requestCount', name: 'requestCount', sortable: false},
            {label: 'errorCount', name: 'errorCount', sortable: false},
            {label: 'createdDate', name: 'createdDate', sortable: false},
            {label: 'modifyDate', name: 'modifyDate', sortable: false},
            {label: 'version', name: 'version', sortable: false}
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
        },
        onSelectRow: function (id) {
            $("#hidRequestNo").val(id);
        },
        beforeRequest: function () {
            var requestNo = getUrlParam("requestNo");
            var originalRequestNo = getUrlParam("originalRequestNo");
            var searchRequestNo = vm.q.requestNo;
            var searchOriginalRequestNo = vm.q.originalRequestNo;
            var searchType = 0;
            if (searchRequestNo != undefined || searchOriginalRequestNo != undefined) {
                searchType = 0;
            }
            else {
                searchType = 1;
            }
            var putData = {};
            if (searchType == 1) {
                putData['requestNo'] = requestNo;
                putData['originalRequestNo'] = originalRequestNo;
            } else {
                if (searchRequestNo != undefined) {
                    putData['requestNo'] = searchRequestNo;
                }
                else {
                    putData['requestNo'] = "";
                }
                if (searchOriginalRequestNo != undefined) {
                    putData['originalRequestNo'] = searchOriginalRequestNo;
                }
                else {
                    putData['originalRequestNo'] = "";
                }
            }
            $("#jqGrid").jqGrid('setGridParam', {
                postData: putData
            });
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
            putData['requestNo'] = vm.q.requestNo;
            putData['originalRequestNo'] = vm.q.originalRequestNo;

            $("#jqGrid").jqGrid('setGridParam', {
                postData: putData,
                page: page
            }).trigger("reloadGrid");
        },
        addRecord: function () {
            var content = $("#layoutContent").html();
            layer.open({
                type: 1,
                title: '单条录入',
                content: content,
                maxWidth: '1000',
                btn: ['保存', '关闭'],
                yes: function (index, layero) {
                    var tempObj = $("#layui-layer" + index);
                    var originalRequestNo = tempObj.contents().find("#tbxOriginalRequestNo").val();
                    var amount = tempObj.contents().find("#tbxAmount").val();
                    var oriRequestCount = tempObj.contents().find("#tbxOriRequestCount").val();
                    if (originalRequestNo == null || originalRequestNo.length <= 0) {
                        alert("请输入原预处理流水号！", function () {
                            $("#tbxOriginalRequestNo").focus();
                        });
                        return false;
                    }
                    if (!isUUID(originalRequestNo.trim())) {
                        alert("请输入正确UUID！", function () {
                            $("#tbxOriginalRequestNo").focus();
                        });
                        return false;
                    }
                    if (amount == null || amount.length <= 0) {
                        alert("请输入取消预金额！", function () {
                            $("#tbxAmount").focus();
                        });
                        return false;
                    }
                    if (!isDecimalTwo(amount)) {
                        alert("请输入正确的小数！小数点后保留两位", function () {
                            $("#tbxAmount").focus();
                        });
                        return false;
                    }
                    /*  if (oriRequestCount.length > 0 && !isPositiveNumber(oriRequestCount.trim())) {
                          alert("请输入正确的数值！", function () {
                              $("#tbxOriRequestCount").focus();
                          });
                          return false;
                      }
                      if (oriRequestCount.length <= 0) {
                          oriRequestCount = 0;
                      }*/
                    $.ajax({
                        url: "/CancelPre/addRecord",
                        type: "POST",
                        async: false,
                        dataType: "json",
                        data: {
                            "originalRequestNo": originalRequestNo.trim(),
                            "amount": amount
                        },
                        success: function (result) {
                            if (result.isSuccess > 0) {
                                alert("成功录入！");
                                vm.reload();
                                layer.close(index);
                            }
                            else {
                                alert("录入失败！")
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                },
                cancel: function () {
                }
            });
        },
        discardedOrder: function () {
            var requestNo = $("#hidRequestNo").val();
            if (requestNo == undefined || requestNo.length <= 0) {
                alert("请先选择要废弃的行数据！");
                return false;
            }
            confirm("确定废弃此条数据？", function () {
                $.ajax({
                    url: "/CancelPre/discardedOrder",
                    type: "POST",
                    async: false,
                    dataType: "json",
                    data: {
                        "requestNo": requestNo
                    },
                    success: function (result) {
                        if (result.isSuccess > 0) {
                            alert("废弃成功！", function () {
                                vm.reload();
                            });
                        }
                        else {
                            alert("废弃失败！")
                        }
                    },
                    error: function (xhr, status, error) {
                    }
                });
            });
        },
        batIn: function () {
            var content = $("#layout_batIn").html();
            layer.open({
                type: 1,
                title: '批量录入',
                content: content,
                maxWidth: '1000',
                offset: '100px',
                btn: ['保存', '关闭'],
                yes: function (index, layero) {
                    var tempObj = $("#layui-layer" + index);
                    if (tempObj.contents().find("#fileUpload").length > 0) {
                        var files = tempObj.contents().find("#fileUpload")[0].files;
                        var form = new FormData();
                        form.append("file", files[0]);
                        $.ajax({
                            url: "/CancelPre/batIn",
                            type: "POST",
                            data: form,
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                if (result.isSuccess > 0) {
                                    alert("批量导入成功！");
                                    vm.reload();
                                    layer.close(index);
                                }
                                else {
                                    alert("批量导入失败，请检查Excel文档格式与数据是否正确！")
                                }
                            }
                        });
                    }
                    else {
                        alert("请选择需要导入的文件！")
                    }
                },
                cancel: function () {

                }
            });
        }
    }
});
function isDecimalTwo(val) {
    return /^\d+(\.\d{1,2})?$/.test(val);
}
