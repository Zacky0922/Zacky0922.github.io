/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    debug
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
var g_debugArea = document.createElement("div");
function debugMsg(msg) {
    g_debugArea.appendChild(
        document.createElement("br")
    );
    g_debugArea.appendChild(
        document.createTextNode(msg)
    );
    var myDiv = document.getElementById('debugArea');
    if (myDiv != undefined) {
        myDiv.appendChild(g_debugArea);
    }
}
debugMsg("loaded - functions.js");

function getOnline() {
    return (location.href.indexOf("http") == -1);
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


function setDispToggle(mode0 = "[省略されているコンテンツを開く]", mode1 ="[表示されているコンテンツを閉じる]") {
    var myDiv = document.createElement("div");
    myDiv.setAttribute("onClick", "dispToggle(this)");
    myDiv.classList.add("dispToggleSW");
    myDiv.classList.add("noPrint");
    myDiv.setAttribute("onclick", "dispToggle(this)");

    for (var i = 0; i < 2; i++){
        var myDiv_ = document.createElement("div");
        myDiv_.innerText = (i == 0 ? mode0 : mode1);
        var iconSpan = document.createElement("span");
        iconSpan.classList.add("material-icons");
        iconSpan.innerText = (i == 0 ? "expand_more" : "expand_less");
        myDiv_.appendChild(iconSpan);
        myDiv.appendChild(myDiv_);
    }
    document.write(myDiv.outerHTML);

   // dispToggle(myDiv);  //myDivが生成・代入後にロードしたい

}
function dispToggle(myObj) {
    var myParentClass = myObj.parentElement.classList;
    myParentClass.toggle("SW_disp");
    myParentClass.toggle("SW_undisp");

    if (myParentClass.contains("SW_disp") && myParentClass.contains("SW_undisp")) {
        myParentClass.remove("SW_disp");
    }
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
        ["keyboard_backspace", "Back", "history.back()"],
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
    debugMsg("reMathJax - " + id);
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



//loadScript("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML");

//document.write('<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>')




//document.write('<script type="text/javascript" src="' + getParam["lv"] + 'script/design.js"></script>');
loadScript(getParam["lv"] + "script/design.js");

loadScript(getParam["lv"] + "script/abcjs/abcjs_basic_5.9.1-min.js");
loadScript(getParam["lv"] + "script/abcjs/abcjs_basic_midi_3.2.1-min.js");
//loadScript(getParam["lv"] + "script/abcjs/acoustic_grand_piano-ogg.js");
document.write('<link rel="stylesheet" href="' + getParam["lv"] + 'script/abcjs/abcjs-midi.css">');
document.write('<link rel ="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
//jQuery
document.write('<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>');





/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    init
    window.onload的処理：初期整形処理
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
function init() {
    document.write('<link rel="stylesheet" href="' + getParam["lv"] + 'script/style.css">');
    var myScore = document.getElementsByClassName("score");

    ABCJS.midi.soundfontUrl = getParam["lv"] + "script/abcjs/";
    for (var i = 0; i < myScore.length; i++) {
        var myScript = myScore[i].innerHTML;
        myScore[i].innerHTML = "";

        var myScr = document.createElement("div");
        myScr.id = "score_" + i;
        myScore[i].appendChild(myScr);

        var myMid = document.createElement("div");
        myMid.id = "midi_" + i;
        myScore[i].appendChild(myMid);

        ABCJS.renderAbc("score_" + i, myScript);
        ABCJS.renderMidi("midi_" + i, myScript, {}, { generateInline: true }, {});
    }

    setFooter();

    debugMsg("Complete - init()");
}

