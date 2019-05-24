$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'cgtAlarmInfo/getListForPage',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', sortable: false, key: true,hidden:true},
            {label: 'uuid', name: 'uuid', sortable: false},
            //{label: '服务名', name: 'serviceName', sortable: false},
            {label: '问题类型', name: 'type', sortable: false},
            {
                label: '解决方案',
                name: 'descr',
                sortable: false,
                formatter: function (descr, options, rowObject) {
                    if(descr!=""){
                        return "有";
                    }else {
                        return "无";
                    }
                }
            },
             //{label: '负责人', name: 'principal', sortable: false},
            {label: '创建时间', name: 'createTime', sortable: false},
            {label: '更新时间', name: 'updateTime', sortable: false}
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
            searchType:"-1",
            type:"-1",
            descr:""
		},
		showList: true,
		title:null,
		keyId:null,
        commit:true
	},
	methods: {
        findById: function (isUpdateOrDetail) {
            if(isUpdateOrDetail==1){
                vm.commit = true;
                vm.title = "修改";
            }else {
                vm.commit = false;
                vm.title = "查看";
            }
            var keyId = getSelectedRow();
            if(keyId == null){
                return ;
            }
            vm.showList = false;
            $.ajax({
                type: "GET",
                url: baseURL + "cgtAlarmInfo/findById",
                data: {id: keyId},
                success: function (r) {
                    if (r.code == 0) {
                        vm.q.type=r.cgtAlarmInfo.type;
                        vm.q.descr=r.cgtAlarmInfo.descr;
                        vm.keyId=keyId;
                        editor.html(vm.q.descr);
                    } else {
                        alert("查看失败");
                    }
                }
            });
        },
		query: function () {
			vm.reload();
		},
		add: function(){
            vm.title = "新增";
            vm.keyId=null;
            vm.q.type="-1";
            vm.q.descr="";
    		vm.showList = false;
            editor.html("");
		},
        insert: function(){
            editor.sync();//将KindEditor的数据同步到textarea标签。
            var descr = $("#descr").val();
            vm.q.descr=descr;
			if( vm.keyId==null) {
                $.ajax({
                    type: "POST",
                    url: baseURL + "cgtAlarmInfo/insert",
                    data: {type: vm.q.type, descr: vm.q.descr},
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功');
                            vm.reload();
                            vm.showList = true;
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            }
            else{
                $.ajax({
                    type: "PUT",
                    url: baseURL + "cgtAlarmInfo/update",
                    data: {id:vm.keyId,descr: vm.q.descr},
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功');
                            vm.reload();
                            vm.showList = true;
                        } else {
                            alert(r.msg);
                        }
                    }
                });
			}
		},
		del: function () {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "DELETE",
				    url: baseURL + "cgtAlarmInfo/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(){
                                vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
        reset: function () {
            vm.reload();
		},
		reload: function () {
            vm.q.type=null;
            vm.q.descr=null;
            vm.keyId==null;
			vm.showList = true;
			vm.commit=true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'type': vm.q.searchType},
                page:page
            }).trigger("reloadGrid");
		}
	}
});