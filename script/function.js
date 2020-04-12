


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


//  MathJax マクロ設定
document.write('<script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>');

//if(false)		//MathJax.js直接記述Macro有効化の為
MathJax = {
    tex: {
        packages: ['base'],        // extensions to use
        inlineMath: [              // start/end delimiter pairs for in-line math
            ['$','$'],
            ['\\(', '\\)']
        ],
        displayMath: [             // start/end delimiter pairs for display math
            ['$$', '$$'],
            ['\\[', '\\]']
        ],

    }
};


/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    init
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//init
function init() {
    //外部ファイル

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


//head内要素生成
function setHead(lv) { 
//引数：rootからの階層

    //階層設定
    var myLv = "";
    if (i != 0) {
        for (var i = 0; i < lv; i++) {
            myLv = myLv + "../";
        }
    }

                


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




