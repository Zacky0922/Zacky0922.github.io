
class burgerMenu {
    /*
    #wrap       parent              // 引数でobj引渡し
    #divWrap        div#zBurgerWrap
    #iconWrap           label
    setIcon                 *
    #input              input[checkbox]#zBurgerChkbx
    #ulWrap             div#zBurgerMenuWrap
    setUl                   ul.zBurgerMenu
    */
    #wrap;
    #divWrap = document.createElement("div");
    #iconWrap = document.createElement("label");
    #input = document.createElement("input");
    #ulWrap = document.createElement("div");

    constructor(wrap) {
        this.#wrap = wrap;
        this.#divWrap.id = "zBurgerWrap";
        this.#divWrap.appendChild(this.#iconWrap);
        this.#iconWrap.setAttribute("for", "zBurgerChkbx")
        this.#divWrap.appendChild(this.#input);
        this.#input.type = "checkbox";
        this.#input.id = "zBurgerChkbx";
        this.#input.checked = false;
        this.#divWrap.appendChild(this.#ulWrap);
        this.#ulWrap.id = "zBurgerMenuWrap";
    };
    setWrapId(id) {
        this.#divWrap.id = id;
    };
    setWrapClass(cl) {
        this.#divWrap.classList.add(cl);
    };
    setIcon(icon) {
        //オブジェクトを代入
        this.#iconWrap.appendChild(icon);
    };
    set(id, ul) {
        this.#ulWrap.appendChild(ul);
        this.#wrap = document.getElementById(id);
        this.#wrap.appendChild(this.#divWrap);
    };
};
