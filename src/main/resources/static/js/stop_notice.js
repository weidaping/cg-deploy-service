(function() {
    FastClick.attach(document.body);
    Jsbridge.appLifeHook(null, function() {
        if(navigator.userAgent.match(/(iPad|iPhone)/)) {
            //是否允许webview回弹
            Jsbridge.exec('ToSetWebviewBounceProperty', {bounce: false})
        }
    });
    $('.icon-close').on('click', function(e) {
        Jsbridge.closeWeb();
    });

})();