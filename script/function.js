
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
    グローバル利用変数
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
    汎用関数
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//外部JS読込
function loadScript(myScripts, myType = "text/javascript") {
    var script = document.createElement('script');
    script.src = myScripts;
    script.type = myType;
    document.head.appendChild(script);
    //document.write(script.outerHTML);
}

//MathJax逐次実行
function reMathJax(id = null) {
    if (id == null) {
        id = "myBody";
        document.body.id = id;
    }
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
    if (id == "myBody") {
        document.body.id = "";
    }
}

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    init
    onload実行  PWA設定・plugin系
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

//service workerの登録関係
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(getParam["lv"] + 'service_worker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}

//document.write('<script type="text/javascript" src="' + getParam["lv"] + 'script/design.js"></script>');
loadScript(getParam["lv"] + "script/design.js");
//jQuery
document.write('<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>');

//document.write('<script type="text/x-mathjax-config" src="' + getParam["lv"] + 'script/MathJaxMacro.js"></script>');
loadScript(getParam["lv"] + "script/MathJaxMacro.js", "text/x-mathjax-config");




/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    init
    window.onload的処理：初期整形処理
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
function init() {
    document.write('<link rel="stylesheet" href="' + getParam["lv"] + 'script/style.css">');
    //MathJax
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML");
   

    //フッター作成：debugArea生成
    setFooter();
    //これ以降、debugMsg()実行可
    debugMsg("Complete - init()");
}

