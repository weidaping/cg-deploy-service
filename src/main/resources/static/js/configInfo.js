var serviceName = getUrlParam("serviceName");
var buildNo = getUrlParam("buildNo");

function saveConfig() {
    var serviceName = $("#serviceName").val();

    if (serviceName == null || serviceName == "") {
        alert("请输入服务名");
        return false;
    }


    $("#uploadTips").css('display','inline');
    $("#submitBtn").attr('disabled',true);

    var form = new FormData();
    form.append("serviceName",serviceName);

    $.ajax({
        url: "/config/saveConfig",
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
                        showTips("保存失败，服务名已存在");
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
        area: ['260px', '120px'],
        content: message,
        btn: ['确定'],
        yes: function(index, layero){
            //事件
            parent.layer.closeAll();
            parent.location.reload();
        }
    });
}