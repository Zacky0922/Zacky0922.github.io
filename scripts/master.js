
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



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    オンライン状況取得
    online  = true
    offline = false
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
function getOnline() {
    return (location.href.indexOf("http") > -1);
}



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    デバッグメッセージ処理
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
var debugMsgText = "";
var debugMsgHTML = document.createTextNode("");
function debugMsg(msg) {
    debugMsgText = debugMsgText + "\n" + msg;
    //debugMsgHTML.appendChild(document.createElement("br"));
    //debugMsgHTML.appendChild(document.createTextNode(msg));
    //console.log(msg);
    //document.getElementById("debugArea").innerHTML = debugMsgHTML;
}



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    JS loader
    被読込ファイル冒頭に、必ず以下を記載
    loadJScounter_loaded++;
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//読込ファイルリスト（自作分のみ）
var myScripts = [
    "countDays.js",
    "setTab.js"
];
var loadJScounter_setScriptTag = 0; //タグ設置数
var loadJScounter_loaded = 0;       //読込完了数

var z_JSloadFunc = setInterval(function () {
    if (loadJScounter_loaded == myScripts.length) {
        //全部読込完了
        clearInterval(z_JSloadFunc);
    } else if (loadJScounter_setScriptTag == loadJScounter_loaded) {
        //既設置分、読込完了
        var myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = getParam["lv"] + "scripts/js/" + myScripts[loadJScounter_setScriptTag++];
        document.head.appendChild(myScript);
        debugMsg(loadJScounter_setScriptTag);
    }else{
        return;
    }
}, 50);

