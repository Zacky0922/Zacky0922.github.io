
/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    読込時、変数受取
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
onloadFunc();
function onloadFunc() {
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;

    var query = src.substring(src.indexOf('?') + 1);
    var parameters = query.split('&');

    // URLクエリを分解して取得する
    var result = new Object();
    for (var i = 0; i < parameters.length; i++) {
        var element = parameters[i].split('=');

        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);

        result[paramName] = paramValue;
    }

    //受取変数処理
    //lv
    if (result["lv"] > 0) {
        for (var i = 0; i < result["lv"]; i++){
            g_Lv = g_Lv + "../";
        }
    } else {
        g_Lv = "./";
    }

}



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    グローバル利用変数
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//HTML階層指定
var g_Lv = "";

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    head実行系
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//  service workerの登録関係
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    init
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//init
function init() {
    //外部ファイル
    document.write('<script type="text/javascript" src="' + g_Lv + 'script/MathJaxMacro.js"></script >');
    document.write('<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML"></script >');

    //フッター作成
    setFooter();
}

function setFooter() {
    var myFt = document.createElement("footer");
    var myDiv = document.createElement("div");
    var myMenu = [
        ["menu",    "メニュー"],
        ["event_note",  "日程"],
        ["link",    "リンク"],
        ["settings",    "設定"],
    ];
    for (var i = 0; i < myMenu.length; i++){
        var menuEle = document.createElement("div");
        var myIcon = document.createElement("span");
        myIcon.classList.add("material-icons");
        myIcon.innerText = myMenu[i][0];
        menuEle.appendChild(myIcon);
        var myMenuName = document.createElement("span");
        myMenuName.innerText = myMenu[i][1];
        menuEle.appendChild(myMenuName);
        myDiv.appendChild(menuEle);
    }
    myFt.appendChild(myDiv);
    (document.getElementById("container")).appendChild(myFt);
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
    myWrapper.insertBefore(myTabMenu,myWrapper.children[0]);
    for (var i = 1; i < myWrapper.children.length; i++){
        //コンテンツの設定
        myWrapper.children[i].classList.add("tabContent");
        //タブメニューの設定
        var mySpan = document.createElement("span");
        mySpan.classList.add("tabMenuSpan");
        mySpan.setAttribute("onClick","dispTab('"+myId+"','"+myWrapper.children[i].id+"')");
        mySpan.innerText = (myWrapper.children[i].id.replace(myId+"_",""));
        myTabMenu.appendChild(mySpan);
    }
    myWrapper.children[0].children[0].classList.add("tabActive");
    myWrapper.children[1].classList.add("tabActive");
}
function dispTab(wrapperId,tabId) {
//引数：ラッパーid,アクティブにするタブid
    var myWrapper = document.getElementById(wrapperId);
    for (var i = 1; i < myWrapper.children.length; i++){
        if (tabId == myWrapper.children[i].id ) {
            myWrapper.children[0].children[i - 1].classList.add("tabActive");
            myWrapper.children[i].classList.add("tabActive");
        } else {
            myWrapper.children[0].children[i - 1].classList.remove("tabActive");
            myWrapper.children[i].classList.remove("tabActive");
        }
    }
}




