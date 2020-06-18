
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
debugMsg("JS loader");

var loadJScounter_loaded = 0;

//読込ファイルリスト（自作分のみ）
var myScripts = [
    //外部js＝ローカルDL
    "ext-js/abcjs/abcjs_basic_5.9.1-min.js",
    "ext-js/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
    "ext-js/jquery-3.5.1.min.js",

    //外部jsの初期化
    "ext-js/abcjs_init.js",
    //"ext-js/chartjs_init.js",

    //自作js
    "js/burger.js",
    "js/customRandom.js",
    "js/date.js",
    "js/develop.js",
    "js/setTab.js",
    "js/txReplace.js",
    "js/pageMenu.js",

    //特殊版
    "KGfes/kgfes.js",
    "KGfes/kgfes-bg.js"
];
//CDN jsファイル
var extScripts = [
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML",
    "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?lang=css",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"
];

//読込
function jsLoader(mySrc) {
    if (false) {
        var myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = mySrc;
        document.head.appendChild(myScript);
    } else {
        document.write('<script type="text/javascript" src="' + mySrc + '"></script>');
    }
    debugMsg("// js loading - " + mySrc);
}

for (var i = 0; i < extScripts.length; i++) {
    jsLoader(extScripts[i]);
}
for (var i = 0; i < myScripts.length; i++) {
    jsLoader(getParam["lv"] + "scripts/" + myScripts[i]);
}

var JSloaded_flag = false;
var JSloadFunc = setInterval(function () {
    if (loadJScounter_loaded == myScripts.length) {
        //全部読込完了
        debugMsg("master.js:JSloadFunc Complete!\n" +
            "// local = " + myScripts.length +
            " / ext = " + extScripts.length);
        clearInterval(JSloadFunc);
        jsLoaded();
        JSloaded_flag = true;
    }else{
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
    absjs_init();   //ext-js/abcjs_init.js
    //chartjs_init(); //ext-js/chartjs_init.js

    // init
    zOnload();

    getPageMenu("PageMenu");

    //五峯祭フォーマット
    if (getParam["mode"] == "kgfes") {
        KGfes_init();
        kgfesBG();
    }

});