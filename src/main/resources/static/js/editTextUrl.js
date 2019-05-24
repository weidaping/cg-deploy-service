var serviceName = getUrlParam("serviceName");
var buildNo = getUrlParam("buildNo");
var textUrl = getUrlParam("textUrl");

$(function () {
    $("#textUrl").val(textUrl);
});

function saveTextUrl() {

    $("#uploadTips").css('display','inline');
    $("#submitBtn").attr('disabled',true);

    var form = new FormData();
    form.append("serviceName",serviceName);
    form.append("buildNo", buildNo);
    form.append("textUrl", $("#textUrl").val());

    $.ajax({
        url: "/devRecord/saveTextUrl",
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