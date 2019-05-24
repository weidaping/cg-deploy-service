var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        itemTitle: '通知p2p入账',
        notifyTrans: {
            requestNo: '',
            projectNo: '',
            dataSource: 'p2p'
        },
        resendTitle:'同步交易数据',
        resendUrl:'trans'
    },
    methods: {
        confirmLayer: function (event) {
            vm.itemTitle = event.target.innerText;
            vm.notifyTrans.dataSource = event.target.dataset.datasource;
            layer.open({
                type: 1 //Page层类型
                , area: ['500px', '331px']
                , title: '入账处理'
                , shade: 0.6 //遮罩透明度
                , anim: 1 //0-6的动画形式，-1不开启
                , content: $('.confirm')
                , end: function () {
                    vm.notifyTrans.requestNo = '';
                    vm.notifyTrans.projectNo = '';
                }
            });
        },
        confirmTrans: function () {
            if(!isUUID(vm.notifyTrans.requestNo)||!isUUID(vm.notifyTrans.projectNo)){
                alert("数据格式不对，请检查！") ;
                return
            }
            $.ajax({
                url: baseURL + "repay/repair/notifyTrans",
                type: "POST",
                dataType: "json",
                data: {
                    requestNo: vm.notifyTrans.requestNo,
                    projectNo: vm.notifyTrans.projectNo,
                    dataSource: vm.notifyTrans.dataSource
                },
                success:function(data){
                    if(data.code==0){
                        alert("推送成功",function(){
                            layer.closeAll() ;
                        }) ;
                    }else{
                        alert("推送失败，请检查数据格式是否正确！及数据是否已成功"+data) ;
                    }
                },
                error:function(data){
                   if(data.status==494){
                       window.location.href = data.responseText ;
                   }
                }
            })
        },
        resendLayer:function(event){
            vm.resendTitle = event.target.innerText;
            vm.resendUrl = event.target.dataset.resendsource;
            layer.open({
                type: 1 //Page层类型
                , area: ['549px', '485px']
                , title: '数据同步'
                , shade: 0.6 //遮罩透明度
                , anim: 1 //0-6的动画形式，-1不开启
                , content: $('.resend')
                , end: function () {
                    $("#resendArea").val("") ;
                }
            });
        },
        resendTrans:function(){
            var busIds = $("#resendArea").val().replace(/[\r\n ]/g,"").split(",");
            for(var i=0;i<busIds.length;i++){
                if(!isUUID(busIds[i])||!isUUID(busIds[i])){
                    alert("数据格式不对，请检查！") ;
                    return
                }
            }
            var url =  baseURL + "repay/repair/resend/"+vm.resendUrl ;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                contentType:"application/json",
                data: JSON.stringify(busIds),
                success:function(data){
                    if(data.code==0){
                        alert("推送成功",function(){
                            layer.closeAll() ;
                        }) ;
                    }else{
                        alert("推送失败，请检查数据是否正确！"+data.message) ;
                    }
                },
                error:function(data){
                    if(data.status==494){
                        window.location.href = data.responseText ;
                    }
                }
            })
        },
        tipLayer:function(){
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['517px', '316px'],
                skin: 'layui-layer-nobg', //没有背景色
                shadeClose: true,
                content: $('#tip')
            });
        }

    }
});