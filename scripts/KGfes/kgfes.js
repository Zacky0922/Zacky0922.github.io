loadJScounter_loaded++;

function KGfes_init() {
    var ele = document.createElement("div");
    ele.classList.add("z工事中");
    ele.innerHTML = "準備中";
    document.body.prepend(ele);

    var myHeader = document.createElement("header");
    myHeader.innerHTML = '<span style="font-size: min(16vw, 64px); ">第23回 五峯祭</span>（サイト下書き）<br />' +
        '<span style="font-size:min(16vw,32px);"> 2020.09.12-13(Sat-Sun)</span >"';
    document.body.prepend(myHeader);

    var myFooter = document.createElement("footer");
    myFooter.innerHTML = '(C) <a href="https://jsh.kgef.ac.jp/">Kokusai Gakuin Junior & Senior High School</a> 2020';
    document.body.appendChild(myFooter);
}
