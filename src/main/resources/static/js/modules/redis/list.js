var vm = new Vue({
        el: '#rrapp',
        data: {
            q: {
                db: 0,
                key: "",
                value: "",
                redisDb: "",
            },
            showList: true,
            title: null,
            select_db: false
        },
        mounted: function () {
            this.check_url();
        },
        methods: {
            query: function () {
                $.ajax({
                    type: "GET",
                    url: baseURL + "cache/search_allDb",
                    contentType: "application/x-www-form-urlencoded",
                    data: {key: vm.q.key},
                    success: function (r) {
                        if (r.code == 0) {
                            alert('查询成功', function () {
                                vm.q.value = r.msg;
                                vm.q.db = r.db;
                                vm.q.redisDb = r.db;
                            });
                        } else {
                            alert(r.msg);
                            vm.q.value = "";
                        }
                    }
                });
            }
            ,
            back: function () {
                window.location.href = "/redisKey/list.html";
                vm.select_db = false;
            }
            ,
            reset: function () {
                if (vm.q.key == null) {
                    alert('请填写key', function () {
                        return;
                    });
                }
                if (vm.q.value == null) {
                    alert('请填写value', function () {
                        return;
                    });
                }
                $.ajax({
                    type: "POST",
                    url: baseURL + "cache/reset",
                    contentType: "application/x-www-form-urlencoded",
                    data: {db: vm.q.db, key: vm.q.key, value: vm.q.value},
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功');
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            }
            ,
            del: function () {
                if (vm.q.key == null) {
                    alert('请输入key', function () {
                        return;
                    });
                }
                confirm('确定要删掉key? -> ' + vm.q.key, function () {
                    $.ajax({
                        type: "POST",
                        url: baseURL + "cache/find_first_Del",
                        contentType: "application/x-www-form-urlencoded",
                        data: {key: vm.q.key},
                        success: function (r) {
                            if (r.code == 0) {
                                alert('删除成功', function () {
                                    vm.q.value = "";
                                    if (vm.select_db)
                                        window.location.href = "/redisKey/list.html";
                                });
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                });
            }
            ,
            parseUrl: function () {
                var url = location.href;
                var i = url.indexOf('?');
                if (i == -1) return;
                var querystr = url.substr(i + 1);
                var arr1 = querystr.split('&');
                var arr2 = new Object();
                for (i in arr1) {
                    var ta = arr1[i].split('=');
                    arr2[ta[0]] = ta[1];
                }
                return arr2;
            }
            ,
            get_db: function () {
                $.ajax({
                    type: "GET",
                    url: baseURL + "cache/search_allDb",
                    data: {key: vm.q.key},
                    success: function (r) {
                        if (r.code == 0) {
                            vm.q.value = r.msg;
                            vm.q.db = r.db;
                            vm.q.redisDb = r.db;
                        } else {
                            vm.q.value = '';
                            alert("key_db获取失败,不存在该key在Cache");
                        }
                    }
                });
            }
            ,
            check_url: function () {
                var v = this.parseUrl();//解析所有参数
                var getid = v['turnId'];
                if (getid != null) {
                    this.select_db = true;
                    $.ajax({
                        type: "GET",
                        url: baseURL + "rediskey/getkeyById",
                        data: {id: getid},
                        success: function (r) {
                            if (r.code == 0) {
                                vm.q.key = r.redisKey.keyName;
                                vm.get_db();
                            } else {
                                alert("修改错误");
                            }
                        }
                    });

                }
            }
            ,
            clean: function () {
                vm.q.db = 0;
                vm.q.key = '';
                vm.q.value = '';
                vm.q.redisDb = 0;
            }
        }
    })
;