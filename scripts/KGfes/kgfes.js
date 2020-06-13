loadJScounter_loaded++;


function createKGfesMenu(){
    var ul = document.createElement("ul");
    ul.id = "KGfesMenu";
    var menu = [
        ["Top", ""],
        ["Event",   "event.html"],
        ["Special", "sp.html"]
    ];
    for(var i = 0 ; i < menu.length; i++){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.innerText = menu[i][0];
        a.href = menu[i][1];
        a.target = "_self";
        li.appendChild(a);
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
    myHeader.innerHTML = '<span style="font-size: min(16vw, 64px); ">第23回 五峯祭</span>（サイト下書き）<br />' +
        '<span style="font-size:min(16vw,32px);"> 2020.09.12-13(Sat-Sun)</span >"';
    document.body.prepend(myHeader);

    var myFooter = document.createElement("footer");
    myFooter.innerHTML = '(C) <a href="https://jsh.kgef.ac.jp/">Kokusai Gakuin Junior & Senior High School</a> 2020';
    document.body.appendChild(myFooter);
}
