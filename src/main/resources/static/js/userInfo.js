var serviceName = getUrlParam("serviceName");
var buildNo = getUrlParam("buildNo");

function saveUser() {
    var role = $("#role").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var gitUsername = $("#gitUsername").val();
    var gitPassword = $("#gitPassword").val();

    if (username == null || username == "") {
        alert("请输入用户名");
        return false;
    }

    if (password == null || password == "") {
        alert("请输入密码");
        return false;
    }

    if (role == "test") {
        if (gitUsername == null || gitUsername == "") {
            alert("请输入git用户名");
            return false;
        }

        if (gitPassword == null || gitPassword == "") {
            alert("请输入git密码");
            return false;
        }
    }

    $("#uploadTips").css('display','inline');
    $("#submitBtn").attr('disabled',true);

    var form = new FormData();
    form.append("userRole",role);
    form.append("username", username);
    form.append("password", password);
    form.append("gitUsername", gitUsername);
    form.append("gitPassword", gitPassword);

    $.ajax({
        url: "/user/saveUser",
        type: "POST",
        data: form,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result != undefined) {
                var code = result.code;

                switch (code){
                    case 200:
                        showTips("保存成功");
                        break;
                    case 403:
                        showTips("保存失败，用户已存在");
                        break;
                    case 404:
                    default:
                        showTips("保存失败");
                }
            }
            $("#uploadTips").css('display','none');
            $("#submitBtn").attr('disabled',false);
        }
    });
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
            parent.layer.closeAll();
            parent.location.reload();
        }
    });
}