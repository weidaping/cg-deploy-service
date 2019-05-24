(function() {
     function getStatus() {
        $.ajax({
            url: '/cg/webSite/html/status',
            type: 'get',
            dataType: 'json',
            data: {
                userDevice: 'app',
                serviceName: 'totalStop'
            },
            success: function (data) {
                console.info("data—charts-", data);
                if (data && data.code == "1") {
                    (data && data.respData == 1 ) || Jsbridge.closeWeb();
                }
            }
        }); 
    }

    //不允许webview回弹
    function noBounce() {
        if(navigator.userAgent.match(/(iPad|iPhone)/)) {
            Jsbridge.exec('ToSetWebviewBounceProperty', {bounce: false})
        }
    }

    Jsbridge.appLifeHook(null, noBounce, getStatus, null, getStatus);
    
})();