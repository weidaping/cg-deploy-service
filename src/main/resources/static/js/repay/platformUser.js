$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'repay/platformUser/query/all',
        datatype: "json",
        colModel: [
            {label: 'userId', name: 'userId', sortable: false, key: true,hidden:true},
            {label: 'userName', name: 'userName', sortable: false},
            {label: 'cgtUserCode', name: 'cgtUserCode', sortable: false},
            {label: 'mType(类型)', name: 'mType', sortable: false},
            {label: '是否有效', name: 'isValid', sortable: false,formatter: function(value, options, row){
                if(value==1){
                    return '是'
                }else{
                    return '否'
                }
    }}
        ],
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 20,
        height: 700,
        rowList: [20, 40, 60],
        rownumbers: true,
        multiselect: true,
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
        }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        turnId: null,
        platformUser:{}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
           /* var putData = {};
            putData['requestNo'] = vm.q.requestNo;
            putData['projectNo'] = vm.q.projectNo;*/
            $("#jqGrid").jqGrid('setGridParam', {
                page: page
            }).trigger("reloadGrid");
        },
        add:function(){
            vm.showList = false;
            vm.title = "新增";
            vm.platformUser = {};
        },update: function () {
            var userId = getSelectedRow();
            if(userId == null){
                return ;
            }
            $.get(baseURL + "repay/platformUser/query/one/"+userId, function(data){
                vm.showList = false;
                vm.title = "修改";
                vm.platformUser = data.user;
            });
            vm.platformUser.updateTime = '' ;
        },
        saveOrUpdate: function (event) {
            vm.platformUser.updateTime = '';
            var url = vm.platformUser.id == null ? "repay/platformUser/insert" : "repay/platformUser/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.platformUser),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                            vm.reload();
                        });
                    }else{
                        alert(r.msg);
                    }
                },
                error:function(data){
                    if(data.status==494){
                        window.location.href = data.responseText ;
                    }
                }
            });
        }

    }
});