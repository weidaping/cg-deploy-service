$(function () {
    getServiceName();
});

//获取服务名
function getServiceName() {
    $.ajax({
        url:  '/config/getAllInUse',
        type: "GET",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var serviceName = data[i].serviceName;
                var html = $("#ddlType").html() + "<option value=\"" + serviceName + "\">" + serviceName + "</option>";
                $("#ddlType").html(html);
            }
        }
    })
}

//上传文件
function uploadFile() {
    $("#result").html("");

    if ($("#file").val() == null || $("#file").val() == "") {
        alert("请选择文件");
        return false;
    }

    if ($("#gitVersion").val() == null || $("#gitVersion").val() == "") {
        alert("请输入git版本号");
        return false;
    }

    if ($("#remark").val() == null || $("#remark").val() == "") {
        alert("请输入说明");
        return false;
    }

    $("#uploadTips").css('display','inline');
    $("#submitBtn").attr('disabled',true);

    var form = new FormData();
    form.append("remark", $("#remark").val());
    form.append("file", $("#file")[0].files[0]);
    form.append("serviceName", $("#ddlType").val());
    form.append("gitVersion", $("#gitVersion").val());

    $.ajax({
        url: "/devRecord/uploadFile",
        type: "POST",
        data: form,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result != undefined) {
                var code = result.code;
                var buildNo = result.buildNo;

                switch (code){
                    case 200:
                        $("#result").html("上传成功,当前构建号：" + buildNo);
                        break;
                    case 404:
                    case 503:
                    case -1:
                        $("#result").html("上传失败");
                        break;
                    default:
                        $("#result").html("上传失败");
                }
            }
            $("#uploadTips").css('display','none');
            $("#submitBtn").attr('disabled',false);
        }
    });
}
