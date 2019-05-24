//上传文件
function uploadFile() {
    $("#result").html("");


    if ($("#name").val() == null || $("#name").val() == "") {
        alert("请输入名称");
        return false;
    }

    if ($("#file").val() == null || $("#file").val() == "") {
        alert("请选择文件");
        return false;
    }

    // if ($("#textUrl").val() == null || $("#textUrl").val() == "") {
    //     alert("请输入发布评审地址");
    //     return false;
    // }

    if ($("#remark").val() == null || $("#remark").val() == "") {
        alert("请输入说明");
        return false;
    }

    $("#uploadTips").css('display','inline');
    $("#submitBtn").attr('disabled',true);

    var form = new FormData();
    form.append("remark", $("#remark").val());
    form.append("name", $("#name").val());
    form.append("textUrl", $("#textUrl").val());
    for (var i = 0; i < $("#file")[0].files.length; i++) {
        form.append("files", $("#file")[0].files[i]);
    }

    $.ajax({
        url: "/sqlRecord/uploadFile",
        type: "POST",
        data: form,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result != undefined) {
                var code = result.code;

                switch (code){
                    case 200:
                        $("#result").html("上传成功");
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

