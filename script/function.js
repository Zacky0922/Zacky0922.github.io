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
        myWrapper.children[i].classList.add("tabInactive");
        //タブメニューの設定
        var mySpan = document.createElement("span");
        mySpan.classList.add("tabMenuSpan");
        mySpan.classList.add("tabInactive");
        mySpan.setAttribute("onClick","dispTab('"+myId+"','"+myWrapper.children[i].id+"')");
        mySpan.innerText = (myWrapper.children[i].id.replace(myId+"_",""));
        myTabMenu.appendChild(mySpan);
    }
    myWrapper.children[0].children[0].classList.remove("tabInactive");
    myWrapper.children[1].classList.remove("tabInactive");
}
function dispTab(wrapperId,tabId) {
//引数：ラッパーid,アクティブにするタブid
    var myWrapper = document.getElementById(wrapperId);
    for (var i = 1; i < myWrapper.children.length; i++){
        if (tabId == myWrapper.children[i].id ) {
            myWrapper.children[0].children[i-1].classList.remove("tabInactive");
            myWrapper.children[i].classList.remove("tabInactive");
        } else {
            myWrapper.children[0].children[i-1].classList.add("tabInactive");
            myWrapper.children[i].classList.add("tabInactive");
        }
    }
}