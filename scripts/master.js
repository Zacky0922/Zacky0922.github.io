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
    デバッグメッセージ処理
    第二引数：階層設定（最後は必ず閉じること）
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
var debugMsgTime = new Date();
var debugMsgText = "◆debug msg";
var debugMsgLogLv = 0;
function debugMsg(msg, group = 0) {
    var indent = " > ";
    msg = (debugMsgLogLv == 0 ? "" : indent) + msg;
    switch (group) {
        case 1:
            debugMsgText = debugMsgText + "\n" + msg;
            console.groupCollapsed(msg);
            debugMsgLogLv++;
            break;
        case 0:
            debugMsgText = debugMsgText + "\n" + msg;
            console.log(msg);
            break;
        case -1:
            if (msg != "" && msg != indent) {
                debugMsgText = debugMsgText + "\n" + msg;
                console.log(msg);
            }
            console.groupEnd();
            debugMsgLogLv--;
            break;
        default:
    }
}


// 引渡し変数確認
debugMsg("master.js? 引渡し変数一覧", 1);
for (i in getParam) {
    debugMsg("getParam[" + i + "] = " + getParam[i]);
}
debugMsg("", -1);

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    オンライン状況取得
    online  = true
    offline = false
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
function getOnline() {
    return (location.href.indexOf("http") > -1);
}


/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    CSS loader
    被読込ファイル冒頭に、必ず以下を記載
    loadJScounter_loaded++;
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
if (getParam["css"] == undefined) {
    getParam["css"] = "master.css";
}

var myCSS = document.createElement("link");
myCSS.rel = "stylesheet";
myCSS.type = "text/css";
myCSS.href = getParam["lv"] + "scripts/" + getParam["css"];
document.head.appendChild(myCSS);



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    JS loader
    被読込ファイル冒頭に、必ず以下を記載
    loadJScounter_loaded++;
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

//読込ファイルリスト（自作分のみ）
var myScripts = [

    //jQuery
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "extTools/jQuerySetting.js",

    //MathJax
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
    //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new
    "extTools/MathJaxMacro.js",

    //prettify
    "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js",
    //Chart.js
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js",
    //"extTools/chartjs/chartjs_init.js",

    //自作js
    "js/customRandom.js",
    "js/date.js",
    "js/setTab.js",
    "js/txReplace.js",
    "js/pageMenu.js",

    //extTools
    "extTools/abcjs/abcjs_basic_5.9.1-min.js",
    "extTools/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
    "extTools/abcjs/abcjs_zInit.js",
    "extTools/googleicon/googleicon.js",

    //zTools
    "zTools/develop.js",
    "zTools/burger/burger.js"
];
//モード別実装
switch (getParam["mode"]) {
    case "kgfes":
        myScripts.push(
            "KGfes/kgfes.js",
            "KGfes/kgfes-bg.js",
            "KGfes/eventList.js",
        );
        break;
    default:
}

//読込カウンタ
var loadJScounter_local = 0;
var loadJScounter_loaded = 0;

//読込
function jsLoader_(mySrc) {
    if (false) {
        var myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = mySrc;
        document.head.appendChild(myScript);
    } else {
        document.write('<script type="text/javascript" src="' + mySrc + '"></script>');
    }
}
function jsLoader() {
    debugMsg("jsLoader", 1);
    for (var i = 0; i < myScripts.length; i++) {
        if (myScripts[i].indexOf("http") > -1) {
            jsLoader_(myScripts[i]);
        } else {
            jsLoader_(getParam["lv"] + "scripts/" + myScripts[i]);
            loadJScounter_local++;
        }
        debugMsg(myScripts[i]);
    }
    debugMsg("", -1);
}
jsLoader();


var JSloadFunc = setInterval(function () {
    if (loadJScounter_loaded == loadJScounter_local) {
        //全部読込完了
        debugMsg("master.js - JSloadFunc Complete!", 1);
        debugMsg("js files = " + myScripts.length +
            " / local:" + loadJScounter_local +
            " + ext:" + (myScripts.length - loadJScounter_local),
            -1);
        clearInterval(JSloadFunc);
        jsLoaded();
    } else {
        return;
    }
}, 1);


//js onload：js読込完了＝body未確定
function jsLoaded() {


}

//標準onload
function zOnload() {


}



window.addEventListener('load', (event) => {

    //外部js初期化
    //abc.js描画実行
    absjs_init();   //extTools/abcjs/abcjs_zInit.js
    //chartjs_init(); //extTools/chartjs_init.js

    // init
    zOnload();

    getPageMenu("PageMenu");

    //五峯祭フォーマット
    if (getParam["mode"] == "kgfes") {
        KGfes_init(getParam["lv"]);
        kgfesBG();
        document.title = document.title + " - 五峯祭2020sample";
    }
    debugMsg("eventListener:loaded - " + (((new Date()).getTime() - debugMsgTime.getTime()) / 1000) + "sec");

});





