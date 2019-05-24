$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'rediskey/getAllKey',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: "user_id", width: 45, key: true },
			{ label: 'key名字', name: 'keyName', width: 75 },
            { label: 'key注释', name: 'dscb', width: 75 },
			{ label: '创建时间', name: 'addTime', width: 90 },
			{ label: '修改时间', name: 'updateTime', width: 80 },
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
            keyName:"",
            addkey:"",
            keyDescribe:""
		},
		showList: true,
		title:null,
		keyId:null,
        commit:true,
        turnId: null,
	},
	methods: {
        check: function () {
            vm.commit = false;
            var keyId = getSelectedRow();
            if(keyId == null){
                return ;
            }
            vm.showList = false;
            vm.title = "查看";
            $.ajax({
                type: "GET",
                url: baseURL + "rediskey/getkeyById",
                data: {id: keyId},
                success: function (r) {
                    if (r.code == 0) {
                        vm.q.addkey=r.redisKey.keyName;
                        vm.q.keyDescribe=r.redisKey.dscb;
                        vm.keyId=keyId;
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
            vm.keyId==null;
    		vm.showList = false;
		},
		addKey: function(){
			if( vm.keyId==null) {
                $.ajax({
                    type: "POST",
                    url: baseURL + "rediskey/addKey",
                    data: {key: vm.q.addkey, describe: vm.q.keyDescribe},
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
                    url: baseURL + "rediskey/update",
                    data: {id:vm.keyId ,key: vm.q.addkey, describe: vm.q.keyDescribe},
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
		update: function () {
			var keyId = getSelectedRow();
			if(keyId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            $.ajax({
                type: "GET",
                url: baseURL + "rediskey/getkeyById",
                data: {id: keyId},
                success: function (r) {
                    if (r.code == 0) {
                        vm.q.addkey=r.redisKey.keyName;
                        vm.q.keyDescribe=r.redisKey.dscb;
                        vm.keyId=keyId;
                    } else {
                        alert("修改错误");
                    }
                }
            });
		},
		del: function () {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "DELETE",
				    url: baseURL + "rediskey/delete",
                    contentType: "application/json",
                    data: JSON.stringify(userIds),
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
        reset: function (id) {
			$.ajax({
				type: "POST",
			    url: baseURL + "rediskey/update",
                contentType: "application/json",
			    data: JSON.stringify(id),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(){
							vm.keyId=null;
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
        getid: function(){
            this.q.turnId = null;
            this.q.turnId= getSelectedRow();
            if(this.q.turnId == null){
                return ;
            }
            window.location.href="/redis/list.html"+"?turnId="+this.q.turnId;
        },
		reload: function () {
            vm.q.addkey=null;
            vm.q.keyDescribe=null;
            vm.keyId==null;
			vm.showList = true;
			vm.commit=true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'keyName': vm.q.keyName},
                page:page
            }).trigger("reloadGrid");
		}
	}
});

// var turnId;
// function getid(){
//     turnId = null;
//     turnId= getSelectedRow();
//     if(turnId == null){
//         return ;
//     }
//     window.location.href="/redis/list.html"+"?turnId="+turnId;
// }