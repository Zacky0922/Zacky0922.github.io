loadJScounter_loaded++;




function KGfes_init() {
    var ele = document.createElement("div");
    ele.classList.add("z工事中", "debug");
    ele.innerHTML = "準備中";
    document.body.prepend(ele);


    var myHeader = document.createElement("header");
    myHeader.innerHTML = '<span id="KGfesTitle">第23回 五峯祭</span>（サイト下書き）<br />' +
        '<span id="KGfesPeriod">2020.09.12-13(Sat-Sun)</span >';
    document.body.prepend(myHeader);

    //burder menu
    var menuUl = createMenuUl([
        [getGicon("home").outerHTML + " Top", "index.html"],
        [getGicon("tag_faces").outerHTML + " Intro", "intro.html"],
        [getGicon("cast").outerHTML + " Live!", " live.html"],
        [getGicon("event_note").outerHTML + " Events", "index.html"],
        [getGicon("fact_check").outerHTML + " Contest", "contest.html"],
        [getGicon("star_border").outerHTML + " Special", "index.html"],
        ["Link先：未作成", "index.html"]
    ]);
    menuUl.classList.add("KGfesMenu");
    myHeader.appendChild(
        setBurgerMenu(menuUl)
    );

    var myFooter = document.createElement("footer");
    myFooter.innerHTML = '(C) <a href="https://jsh.kgef.ac.jp/">Kokusai Gakuin Junior & Senior High School</a> 2020';
    document.body.appendChild(myFooter);





}
