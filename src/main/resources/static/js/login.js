
//输入框的enter事件
$('#password').bind('keypress',function(event){
    if(event.keyCode == 13) {
        login();
    }
});

function login() {

    if ($("#username").val() == null || $("#username").val() == "") {
        showTips("请输入用户名");
        return false;
    }

    if ($("#password").val() == null || $("#password").val() == "") {
        showTips("请输入密码");
        return false;
    }

    $("#uploadTips").css('display','inline');
    $("#submitBtn").attr('disabled',true);

    var form = new FormData();
    form.append("username",$("#username").val());
    form.append("password", $("#password").val());

    $.ajax({
        url: "/login",
        type: "POST",
        data: form,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var code = result.code;

                switch (code){
                    case 200:
                        window.location.href = "/index";
                        break;
                    case 404:
                        showTips("用户名不存在");
                        break;
                    case 96:
                        showTips("密码错误");
                        break;
                    default:
                        showTips("登录异常");
                }
            }
            $("#uploadTips").css('display','none');
            $("#submitBtn").attr('disabled',false);
        }
    });
}


function showTips(message) {
    var html = "<h4 style=\"margin-bottom: 0px;\"><i class=\"fa fa-exclamation-triangle\"></i> 登录失败: " + message + "</h4>";
    $("#failTips").html(html);
    $("#failTips").css('display','block');
}