loadJScounter_loaded++;


function createKGfesMenu(){
    var ul = document.createElement("ul");
    ul.id = "KGfesMenu";
    var menu = [
        ["Top", "#"],
        ["Event",   "#"],
        ["Special", "#"]
    ];
    for(var i = 0 ; i < menu.length; i++){
        var li = document.createElement("li");
        li.innerText = menu[i][0];
        li.classList.add("zBtn");
        li.setAttribute("onclick","document.location='" + menu[i][1]+"'");
        ul.appendChild(li);
    }
    document.body.prepend(ul);
}


function KGfes_init() {
    var ele = document.createElement("div");
    ele.classList.add("z工事中");
    ele.innerHTML = "準備中";
    document.body.prepend(ele);

    createKGfesMenu();

    var myHeader = document.createElement("header");
    myHeader.innerHTML = '<span id="KGfesTitle">第23回 五峯祭</span>（サイト下書き）<br />' +
        '<span id="KGfesPeriod">2020.09.12-13(Sat-Sun)</span >';
    document.body.prepend(myHeader);




    //burder menu
    document.body.prepend(
        setBurgerMenu(
            createMenuUl(
                [
                    ["index", "index.html"],
                    ["sub", "index.html"]
                ]
            )
        )
    );






    var myFooter = document.createElement("footer");
    myFooter.innerHTML = '(C) <a href="https://jsh.kgef.ac.jp/">Kokusai Gakuin Junior & Senior High School</a> 2020';
    document.body.appendChild(myFooter);





}
