/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    head実行系
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//service workerの登録関係
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    debug
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
function debugMsg(msg) {
    document.getElementById('debugArea').appendChild(
        document.createElement("br")
    );
    document.getElementById('debugArea').appendChild(
        document.createTextNode(msg)
    );
}


/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    汎用関数
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//外部JS読込
function loadScript(myScripts, myType = "text/javascript") {
    var script = document.createElement('script');
    script.src = myScripts;
    script.type = myType;
    //document.head.appendChild(script);
    document.write(script.outerHTML);
}


/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    グローバル利用変数 g_hoge
    初期読込Script
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//HTML階層指定：読込時、変数受取
function getParam() {
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;

    var query = src.substring(src.indexOf('?') + 1);
    var parameters = query.split('&');

    // URLクエリを分解して取得する
    var param = new Object();
    for (var i = 0; i < parameters.length; i++) {
        var element = parameters[i].split('=');
        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);
        param[paramName] = paramValue;
    }

    //受取変数の個別処理
    //lv    数値→フォルダ指定文字列
    var myLv = "";
    if (param["lv"] > 0) {
        for (var i = 0; i < param["lv"]; i++) {
            myLv = myLv + "../";
        }
    } else {
        myLv = "./";
    }
    param["lv"] = myLv;
    return param;
}
var getParam = getParam();



//MathJax読込
//document.write('<script src="./script/MathJaxMacro.js" type="text/x-mathjax-config"></script>');
//loadScript(getParam["lv"] + "script/MathJaxMacro.js", "text/x-mathjax-config");
//loadScript(getParam["lv"] + "script/MathJaxMacro.js");
//document.write('<script defer src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML" type="text/javascript"></script>');
//loadScript("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML");

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    init    onload実行
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
loadScript(getParam["lv"] + "script/design.js");

//loadScript(getParam["lv"] + "script/style.css","text/css");
document.write('<link rel="stylesheet" href="' + getParam["lv"] + 'script/style.css">');


/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    init    plugin系
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

function init() {
    //MathJax
    loadScript(getParam["lv"] + "script/MathJaxMacro.js", "text/x-mathjax-config");
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML");
   
    //フッター作成
    setFooter();

    debugMsg("Complete - init()");
}