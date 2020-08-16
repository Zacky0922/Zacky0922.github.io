


function setHeader() {
    /*  section#header
            div.headTitle
                span#KGfesTitle
                span#KGfesPeriod
    */
    let head = document.getElementById("header");

    //タイトル表示部
    let title = document.createElement("div");
    title.classList.add("headTitle");
    title.innerHTML = '<div id="KGfesTitle">第23回 五峯祭</div>' +
        '<div id="KGfesPeriod">2020.09.12-13(Sat-Sun)</div>';
    head.appendChild(title);

    // メニュー
    // burgerメニュー：小画面用アイコンlabel_inner要素
    let label_ = document.createElement("span");
    label_.innerHTML = "KG";
    let img = document.createElement("img");
    img.src = "pict/logo.png";
    let burger = new burgerMenu(img);
    with (burger) {
        addLink(getGicon("home").outerHTML + " Top");
        addLink(getGicon("tag_faces").outerHTML + " Intro");
        addLink(getGicon("event_note").outerHTML + " Events");
        addLink(getGicon("collections_bookmark").outerHTML + " Gallery");
        addLink(getGicon("fact_check").outerHTML + " Contest");
        addLink(getGicon("cast").outerHTML + " Live!");
        addLink(getGicon("star_border").outerHTML + " Special");
        
        addLink("test");
        addLink("test");
        addLink("test");
        addLink("test");
        addLink("test");
        addLink("test");
        addLink("test");
        addLink("test");
        addLink("test");
        addLink("test");
    }
    head.appendChild(burger.get());
}


window.addEventListener('load', (event) => {
    setHeader();
});