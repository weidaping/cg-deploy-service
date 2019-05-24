var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            key: "",
            value: ""
        },
        showList: true,
        title: null
    },
    methods: {
        update: function () {  //升级用户信息
            $.ajax({
                type: "POST",
                url: baseURL + "onepassport/update",
                contentType: "application/x-www-form-urlencoded",
                data: {userId: vm.q.userId},
                success: function (r) {
                    if (r.code == 0) {
                        alert("升级成功");
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }
    }
});