/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    グローバル利用変数
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//HTML階層指定：読込時のscriptタグを急いで取得

let zParam= (function (scripts) {
    //let scripts = document.getElementsByTagName('script');
    let src = scripts[scripts.length - 1].src;

    let query = src.substring(src.indexOf('?') + 1);
    let parameters = query.split('&');

    // URLクエリを分解して取得する
    let param = new Object();
    for (let i = 0; i < parameters.length; i++) {
        let element = parameters[i].split('=');
        let paramName = decodeURIComponent(element[0]);
        let paramValue = decodeURIComponent(element[1]);
        param[paramName] = paramValue;
    }

    //受取変数の個別処理
    //lv    数値→フォルダ指定文字列
    if (param["lv"] == undefined) {
        //階層無指定の場合、絶対参照
        param["lv"] = "https://zacky0922.github.io/";
    } else {
        let myLv = "";
        if (param["lv"] > 0) {
            for (let i = 0; i < param["lv"]; i++) {
                myLv = myLv + "../";
            }
        } else {
            myLv = "./";
        }
        param["lv"] = myLv;
    }
    return param;
})(document.getElementsByTagName('script'));
let getParam  = zParam;

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    デバッグメッセージ処理
    第二引数：階層設定（最後は必ず閉じること）
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
let debugMsgTime = new Date();
let debugMsgText = "◆debug msg";
let debugMsgLogLv = 0;
function debugMsg(msg, group = 0) {
    let indent = " > ";
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
(function () {
    debugMsg("master.js? 引渡し変数一覧", 1);
    for (i in getParam) {
        debugMsg('getParam["' + i + '"] = ' + getParam[i]);
    }
    debugMsg("", -1);
})();

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    オンライン状況取得
    online  = true
    offline = false
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
function getOnline() {
    return (location.href.indexOf("http") > -1);
}


/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    CSS/JS loader
    被読込ファイル冒頭に、必ず以下を記載
    loadJScounter_loaded++;     //JSのみ
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
class zJSloader {
    //フィールド宣言（#でプライベート：クラス内読書のみ）

    scripts = [
        //jQuery
        "https://code.jquery.com/jquery-3.4.1.min.js",
        "extTools/jQuerySetting.js",

        // jQuery Plugins

        //MathJax
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
        //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new
        "extTools/MathJaxMacro.js",

        //A-Frame
        //"https://aframe.io/releases/0.6.1/aframe.min.js",
        "https://aframe.io/releases/1.0.4/aframe.min.js",
        "extTools/A-Frame/develop.js",

        //Chart.js
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js",
        //"extTools/chartjs/chartjs_init.js",

        //prettify
        "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js",
        "extTools/prittyprint/prittyprint.js",
        //"extTools/ExCodePrettify/jquery.ex-code-prettify.js",   //Prettify,jQuery利用

        //extTools
        "extTools/abcjs/abcjs_basic_5.9.1-min.js",
        "extTools/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
        "extTools/abcjs/abcjs_zInit.js",

        "extTools/googleicon/googleicon.js",

        //自作js
        "js/txReplace.js",
        "js/customRandom.js",
        "js/date.js",
        "js/setTab.js",
        "js/pageMenu.js",   //txReplace利用

        //数学用mathTools
        "mathTools/algebra.js",
        "mathTools/matrix.js",  //algebra

        //zTools
        "zTools/develop.js",
        "zTools/burger/burger.js"
    ];

    constructor(root) {
        this.root = root;
    }

    //個別読込メソッド
    cssLoad() {

    }
    jsLoad() {
        if (true) {
            document.write('<script type="text/javascript" src="' + root + '"></script>');
        } else {
            let myScript = document.createElement("script");
            myScript.type = "text/javascript";
            myScript.src = mySrc;
            document.head.appendChild(myScript);
        }
        // memo：DOMよりdocument.writeの方が圧倒的に早い
    }

    //読込完了チェック
    checkLoaded() {

    }
}


//読込ソース作成
function jsLoader_(mySrc) {
    if (true) {
        document.write('<script type="text/javascript" src="' + mySrc + '"></script>');
    } else {
        let myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = mySrc;
        document.head.appendChild(myScript);
    }
}

//読込カウンタ
let loadJScounter_local = 0;
let loadJScounter_loaded = 0;
//読込ファイルリスト（自作分のみ）
let myScripts = [

    //jQuery
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "extTools/jQuerySetting.js",

    // jQuery Plugins

    //MathJax
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
    //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new
    "extTools/MathJaxMacro.js",

    //A-Frame
    //"https://aframe.io/releases/0.6.1/aframe.min.js",
    "https://aframe.io/releases/1.0.4/aframe.min.js",
    "extTools/A-Frame/develop.js",

    //Chart.js
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js",
    //"extTools/chartjs/chartjs_init.js",

    //prettify
    "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js",
    "extTools/prittyprint/prittyprint.js",
    //"extTools/ExCodePrettify/jquery.ex-code-prettify.js",   //Prettify,jQuery利用

    //extTools
    "extTools/abcjs/abcjs_basic_5.9.1-min.js",
    "extTools/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
    "extTools/abcjs/abcjs_zInit.js",
    "extTools/googleicon/googleicon.js",

    //自作js
    "js/txReplace.js",
    "js/customRandom.js",
    "js/date.js",
    "js/setTab.js",
    "js/pageMenu.js",   //txReplace利用

    //数学用mathTools
    "mathTools/algebra.js",
    "mathTools/matrix.js",  //algebra

    //zTools
    "zTools/develop.js",
    "zTools/burger/burger.js"
];

//読込作業
(function () {
    /*
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    ■ □ ■ □ ■ □ CSS ■ □ ■ □ ■ □
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    */
    if (getParam["css"] == undefined) {
        getParam["css"] = "master.css";
    }

    let url = getParam["lv"] + "scripts/" + getParam["css"];

    let kg = (location.href.indexOf("https://fes.kgef.ac.jp/2020jsh/") > -1 ?
        "https://fes.kgef.ac.jp/2020jsh/" :
        "https://fes.kgef.ac.jp/2020jsh-test/");
    switch (getParam["mode"]) {
        case "kgfes":
            url = kg + "scripts/KGfes.css";
            break;
        case "kgfesPre":
            url = kg + "scripts/KGfesPre.css";
            break;
    }

    let myCSS = document.createElement("link");
    myCSS.rel = "stylesheet";
    myCSS.type = "text/css";
    myCSS.href = url;
    document.head.appendChild(myCSS);
    debugMsg("loading master CSS = " + getParam["css"]);


    /*
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    ■ □ ■ □ ■ □ JavaScript ■ □ ■ □ ■ □
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    */
    //モード別実装
    switch (getParam["mode"]) {
        case "lab":
            break;
        case "kgfes":
            let url = (location.href.indexOf("https://fes.kgef.ac.jp/2020jsh/") > -1 ?
                "https://fes.kgef.ac.jp/2020jsh/" :
                "https://fes.kgef.ac.jp/2020jsh-test/");
            myScripts.push(
                url + "scripts/kgfes.js",
                //url + "scripts/kgfes-bg.js",
                url + "scripts/eventList.js"
            );
            break;
        case "kgfesPre":
            break;
        default:
            break;
    }

    debugMsg(getParam["lv"] + "scripts/");
    debugMsg("jsLoader", 1);
    for (let i = 0; i < myScripts.length; i++) {
        if (myScripts[i].indexOf("http") > -1) {
            //外部js
            debugMsg(myScripts[i]);
            jsLoader_(myScripts[i]);
        } else {
            //手持ちjs
            debugMsg(getParam["lv"] + "scripts/" + myScripts[i]);
            jsLoader_(getParam["lv"] + "scripts/" + myScripts[i]);  //相対指定
            loadJScounter_local++;
        }
    }
    debugMsg("", -1);
}
)();

//読込確認
let JSloadFunc = setInterval(function () {
    if (loadJScounter_loaded == loadJScounter_local) {
        //全部読込完了
        debugMsg("master.js - JSloadFunc Complete!", 1);
        debugMsg("js files = " + myScripts.length +
            " / local:" + loadJScounter_local +
            " + ext:" + (myScripts.length - loadJScounter_local),
            -1);
        clearInterval(JSloadFunc);  //読込完了：確認ルーチン終了
    } else {
        return;
    }
}, 3);  //読込完了チェック間隔[msec]



window.addEventListener('load', (event) => {

    //読込完了日時取得
    debugMsg("eventListener:loaded - " + (((new Date()).getTime() - debugMsgTime.getTime()) / 1000) + "sec");

    //外部js初期化
    //abc.js描画実行
    absjs_init();   //extTools/abcjs/abcjs_zInit.js
    //chartjs_init(); //extTools/chartjs_init.js

    //モード別処理
    switch (getParam["mode"]) {
        case "lab":
            getPageMenu("zPageMenu"); setAhrefSmoothLink();
            zSetUndispDate();
            document.getElementById("autoDebugMsg").value = getSpec() + "\n" + debugMsgText;
            break;
        case "kgfes":
            getPageMenu("PageMenu");
            setAhrefSmoothLink();
            KGfes_init(
                location.href.indexOf("https://fes.kgef.ac.jp/2020jsh/") > -1 ?
                    "https://fes.kgef.ac.jp/2020jsh/" :
                    "https://fes.kgef.ac.jp/2020jsh-test/"
            );
            //kgfesBG();
            document.title = document.title + " - 五峯祭2020sample";
            break;
        case "kgfesPre":
            break;
    }

});


// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
