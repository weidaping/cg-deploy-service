$(function () {

    getUserList();

    $("#jqGrid").jqGrid({
        url: '/user/userList',
        datatype: "json",
        colModel: [
            {label: '用户名', name: 'username',align:"center", width:120, sortable: false},
            {label: 'git用户名', name: 'gitUsername', align:"center",width:80, sortable: false},
            {label: '角色', name: 'userRole',align:"center",width:100,  sortable: false},
            // {label: '组别', name: 'groupId',align:"center",width:100,  sortable: false},
            {
                label: '操作', align:"center", width:80, sortable: false,
                formatter: function (cellvalue, options, rowObject) {
                    return '<div>无</div>';
                      //return '<div style="text-align: center"><a class="btn btn-primary" style="text-align: center" title="推送" onclick="pushFile(\'' + rowObject.serviceName + '\',\'' + rowObject.buildNo + '\',\'' + rowObject.alreadyPush + '\')">推送</a></div>';
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
            putData['username'] = $("#username").val();

            $("#jqGrid").jqGrid('setGridParam', {
                postData: putData,
                page: page
            }).trigger("reloadGrid");
        }
    }
});

//获取用户名
function getUserList() {
    $.ajax({
        url:  '/user/getAllUser',
        type: "GET",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var username = data[i].username;
                var html = $("#usernames").html() + "<option value=\"" + username + "\">" + username + "</option>";
                $("#usernames").html(html);
            }
        }
    })
}

function searchUser() {
    vm.query();
}

//新增用户的页面
function addUserPage() {
    layer.open({
        type: 2,
        title: "用户信息",
        area: ['400px', '400px'],
        content: 'userInfo.html'
    });
}
