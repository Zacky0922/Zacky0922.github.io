//フッター作成
setFooter();

function setFooter() {
    var myFt = document.createElement("footer");
    //Popupメニュー
    var myMenu = document.createElement("div");
    myMenu.id = "ftMenuPopup";
    var myMenuContents = [
        [document.createElement("a"), "TOP", g_Lv],
        [document.createElement("a"), "高校数学", g_Lv + "高校数学"]
    ];
    for (var i = 0; i < myMenuContents.length; i++) {
        myMenuContents[i][0].innerText = myMenuContents[i][1];
        myMenuContents[i][0].onclick = "menuDisp()";
        myMenu.appendChild(myMenuContents[i][0]);
    }
    myFt.appendChild(myMenu);

    //フッター
    var myDiv = document.createElement("div");
    myDiv.id = "ftMenu";
    var myFtMenu = [
        ["menu", "メニュー", "document.getElementById('ftMenuPopup').classList.toggle('menuActive')"],
        ["event_note", "日程", ""],
        ["link", "リンク", ""],
        ["settings", "設定", ""],
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
    alert(myId);
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