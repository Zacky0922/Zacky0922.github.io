//head内要素生成
function setHead(lv) { 
//引数：rootからの階層

    //階層設定
    var myLv = "";
    if (i != 0) {
        for (var i = 0; i < lv; i++) {
            myLv = myLv + "../";
        }
    }

                

    //PWA設定
    document.write('' +
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
        '<link rel="manifest" href="'+myLv+'manifest.json">');
    //service workerの登録関係
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service_worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}