loadJScounter_loaded++;

//引数：メニューul＝DOM
function setBurgerMenu(ul) {
    ul.classList.add("zBurger","noScrollbar");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "zBurgerMenuCheckbox";
    //checkbox.style.display = "none";
    var label = document.createElement("label");
    label.innerHTML = "<img src='"+getParam["lv"]+"KGfes/pict/logo.png' width='40px' height='40px'>";
    label.setAttribute("for", "zBurgerMenuCheckbox");

    //ラッパー
    var wrap = document.createElement("div");
    wrap.id = "zBurgerMenuWrap";
    var lblWrap = document.createElement("div");
    lblWrap.appendChild(label);
    wrap.appendChild(lblWrap);
    wrap.appendChild(checkbox);
    wrap.appendChild(ul);

    return wrap;
}

/*  引数：[見出し,url]の配列 */
function createMenuUl(menu) {
    var ul = document.createElement("ul");
    for (var i = 0; i < menu.length; i++){
        var li = document.createElement("li");
        li.innerHTML = menu[i][0];
        li.setAttribute("onclick", "location.href='"+menu[i][1]+"'");
        ul.appendChild(li);
    }
    return ul;
}

