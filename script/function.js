
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

//MathJax 
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
//loadScript(getParam["lv"] + "script/MathJaxMacro.js", "text/x-mathjax-config");


//	===	MathJax マクロ設定 ===
MathJax.Hub.Config({
    extensions: [	//拡張機能			個別読込($$～$$内記述)		説明		
        //	'AMScd.js'		//	\(\require{AMScd}\)  		//可換図式	
    ],
    tex2jax: {
        inlineMath: [['$', '$'], ["\\(", "\\)"]],
        displayMath: [['$$', '$$'], ["\\[", "\\]"]]
    },
    TeX: {
        Macros: {
            //\displaystyle簡略表記
            d: '\\displaystyle ',
            //定義⇔{def}
            def: '{\\overset{def}{\\iff}}',
            //\color簡略表記
            black: ['\\color{black}{ #1 }', 1],
            red: ['\\color{red}{ #1 }', 1],
            blue: ['\\color{blue}{ #1 }', 1],
            green: ['\\color{green}{ #1 }', 1],
            //such that記号
            st: '{\\quad\\text{s.t.}\\quad}',
            //増分記号
            diff: '{\\mathit{\\Delta}}',
            //微分記号
            dydx: '{\\dfrac{dy}{dx}}',
            ddx: '{\\dfrac{d}{dx}}',
            ddt: '{\\dfrac{d}{dt}}',
            dd: ['{\\dfrac{d}{d #1}}', 1],
            //増減凹凸表の矢印

            //ベクトル記号
            vec: ['{\\overrightarrow{ \\mathstrut \\it{#1} } }', 1],
            //大文字立体ベクトル記号
            Vec: ['{\\overrightarrow{ \\mathstrut \\rm{#1}}}', 1],
            //行列
            tr: '{ \\rm tr }',
            //BlackBoardBold
            bbb: ['{ {\\mathbb \\it #1 } }', 1],
            //列ベクトル成分表記
            cvec: ['{ \\left\( \\mathstrut \\begin\{array\} \{c\} {#1} \\\\ {#2} \\\\ \\end\{array\} \\right\) }', 2],
            ccvec: ['{ \\left\( \\mathstrut \\begin\{array\} \{c\} {#1} \\\\ {#2} \\\\ {#3} \\\\ \\end\{array\} \\right\) }', 3],
            //ccvec：cubic col vector
            //ノルム・絶対値
            norm: ['{\\left| \\mathstrut #1 \\right|}', 1],
            //区切り縦棒(群数列など)：section barの略語のつもり
            secBar: '{\\ \\LARGE{|} \\ }',
            //平行記号
            parallel: '\\verb+\/+\\verb+\/+',	//∥∦
            //かっこ
            bracket: ['\\left\( \\mathstrut #1 \\right\)', 1],
            Bracket: ['\\left\\{ \\mathstrut #1 \\right\\}', 1],
            BRACKET: ['\\left\[ \\mathstrut #1 \\right\]', 1],
            abs: ['\\left\| \\mathstrut #1 \\right\|', 1],
            //場合の数
            permutation: ['_{#1} {\\rm P}_{#2}', 2],
            combination: ['_{#1} {\\rm C}_{#2}', 2],

            /* trial macro */

        }
    }
});

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



function setFooter() {

    var myFt = document.createElement("footer");
    //Popupメニュー
    var myMenu = document.createElement("div");
    myMenu.id = "ftMenuPopup";
    var myMenuContents = [
        [document.createElement("a"), "TOP", getParam["lv"]],
        [document.createElement("a"), "数学解説", getParam["lv"] + "高校数学"],
        [document.createElement("a"), "dummy", ""],
        [document.createElement("a"), "dummy", ""],
        [document.createElement("a"), "dummy", ""],
        [document.createElement("a"), "dummy", ""],
        [document.createElement("a"), "dummy", ""],
        [document.createElement("a"), "dummy", ""],
        [document.createElement("a"), "dummy", ""],
        [document.createElement("a"), "dummy", ""]
    ];
    for (var i = 0; i < myMenuContents.length; i++) {
        myMenuContents[i][0].innerText = myMenuContents[i][1];
        myMenuContents[i][0].classList.add("zBtn");
        myMenuContents[i][0].href = myMenuContents[i][2];
        myMenu.appendChild(myMenuContents[i][0]);
    }
    myFt.appendChild(myMenu);

    //debugArea
    var debugArea = document.createElement("div");
    debugArea.id = "debugArea";
    debugArea.innerText = "<<< debug >>>";
    myFt.appendChild(debugArea);

    //フッター
    var myDiv = document.createElement("div");
    myDiv.id = "ftMenu";
    var myFtMenu = [
        ["menu", "メニュー", "document.getElementById('ftMenuPopup').classList.toggle('dispActiveBlock')"],
        ["event_note", "日程", ""],
        ["link", "リンク", ""],
        ["settings", "debug", "document.getElementById('debugArea').classList.toggle('dispActiveBlock')"]
    ];
    for (var i = 0; i < myFtMenu.length; i++) {
        var menuEle = document.createElement("div");
        myDiv.appendChild(menuEle);
        //icon追加
        var myIcon = document.createElement("span");
        myIcon.classList.add("material-icons");
        myIcon.innerText = myFtMenu[i][0];
        menuEle.appendChild(myIcon);
        //見出し追加
        var myFtMenuName = document.createElement("span");
        myFtMenuName.innerText = myFtMenu[i][1];
        menuEle.appendChild(myFtMenuName);
        //機能追加
        menuEle.setAttribute("onclick", myFtMenu[i][2]);
    }
    myFt.appendChild(myDiv);
    document.getElementById("container").appendChild(myFt);
}





/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    タブ
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
/*  テンプレ
<div id="myId">
    <div id="myId_title0"></div>
    <div id="myId_title1"></div>
</div>
<script type="text/javascript"><!--
	setTab("myId");
--></script>
*/
function setTab(myId) {
    //引数：ラッパーid
    var myWrapper = document.getElementById(myId);
    myWrapper.classList.add("tabWrapper");
    var myTabMenu = document.createElement("div");
    myTabMenu.classList.add("tabMenu");
    myWrapper.insertBefore(myTabMenu, myWrapper.children[0]);
    for (var i = 1; i < myWrapper.children.length; i++) {
        //コンテンツの設定
        myWrapper.children[i].classList.add("tabContent");
        //タブメニューの設定
        var mySpan = document.createElement("span");
        mySpan.classList.add("tabMenuSpan");
        mySpan.setAttribute("onClick", "dispTab('" + myId + "','" + myWrapper.children[i].id + "')");
        mySpan.innerText = (myWrapper.children[i].id.replace(myId + "_", ""));
        myTabMenu.appendChild(mySpan);
    }
    myWrapper.children[0].children[0].classList.add("tabActive");
    myWrapper.children[1].classList.add("tabActive");
}
function dispTab(wrapperId, tabId) {
    //引数：ラッパーid,アクティブにするタブid
    var myWrapper = document.getElementById(wrapperId);
    for (var i = 1; i < myWrapper.children.length; i++) {
        if (tabId == myWrapper.children[i].id) {
            myWrapper.children[0].children[i - 1].classList.add("tabActive");
            myWrapper.children[i].classList.add("tabActive");
        } else {
            myWrapper.children[0].children[i - 1].classList.remove("tabActive");
            myWrapper.children[i].classList.remove("tabActive");
        }
    }
}

