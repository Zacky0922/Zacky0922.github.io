
/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    デバッグメッセージ処理
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
var debugMsgText = "◆debug msg";
function debugMsg(msg) {
    debugMsgText = debugMsgText + "\n" + msg;
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

    debugMsg("master.js? 引渡し変数一覧");

    // URLクエリを分解して取得する
    var param = new Object();
    for (var i = 0; i < parameters.length; i++) {
        var element = parameters[i].split('=');
        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);
        param[paramName] = paramValue;
        debugMsg("// param[" + paramName + "] = " + paramValue);
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
    JS loader
    被読込ファイル冒頭に、必ず以下を記載
    loadJScounter_loaded++;
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
debugMsg("JS loader");
var loadJScounter_loaded = 0;

//読込ファイルリスト（自作分のみ）
var myScripts = [
    "ext-js/abcjs/abcjs_basic_5.9.1-min.js",
    //"ext-js/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
    //"ext-js/jquery-3.5.1.min.js",
    "js/setTab.js",
    "js/txReplace.js",
    "js/date.js"
];
var extScripts = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"
];

for (var i = 0; i < extScripts.length; i++) {
    var extScript = document.createElement("script");
    extScript.type = "text/javascript";
    extScript.src = extScripts[i];
    document.head.appendChild(extScript);
    debugMsg("// js loading - " + extScripts[i]);
}
for (var i = 0; i < myScripts.length; i++) {
    var myScript = document.createElement("script");
    myScript.type = "text/javascript";
    myScript.src = getParam["lv"] + "scripts/" + myScripts[i];
    document.head.appendChild(myScript);
    debugMsg("// js loading - " + myScripts[i]);
}
/*
var JSloadFunc = setInterval(function () {
    if (loadJScounter_loaded == myScripts.length) {
        //全部読込完了
        debugMsg("master.js:JSloadFunc [" + loadJScounter_loaded +"] Complete!");
        clearInterval(JSloadFunc);
        zOnload();
    }else{
        return;
    }
}, 50);
*/
for (var i = 0; i < 1; ){}
if (loadJScounter_loaded == myScripts.length) {
    //全部読込完了
    debugMsg("master.js:JSloadFunc [" + loadJScounter_loaded + "] Complete!");
    //clearInterval(JSloadFunc);
    i++;
    zOnload();
} else {
    return;
}
}


//各種js読込完了後、実行
function zOnload() {
    //abc.js描画実行
    var myScore = document.getElementsByClassName("score");
    //ABCJS.midi.soundfontUrl = getParam["lv"] + "scripts/ext-js/abcjs/";
    for (var i = 0; i < myScore.length; i++) {
        var myScript = myScore[i].innerHTML;
        myScore[i].innerHTML = "";

        var myScr = document.createElement("div");
        myScr.id = "score_" + i;
        myScore[i].appendChild(myScr);
        ABCJS.renderAbc("score_" + i, myScript);
        /*
        //midi関連処理
        var myMid = document.createElement("div");
        myMid.id = "midi_" + i;
        myScore[i].appendChild(myMid);

        ABCJS.renderMidi("midi_" + i, myScript, {}, { generateInline: true }, {});
        */
    }




}