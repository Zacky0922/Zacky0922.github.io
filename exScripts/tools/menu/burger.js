import * as zList from "../list.js";

export class burgerMenu extends zList.zList{

    /*
    バーガーコンテンツ
    wrap        div#zBurgerWrap
    label          label
                        引数icon
    input          input[checkbox]#zBurgerChkbx
    ulWrap         div#zBurgerUlWrap
    super.get()         ul
    */
    wrap = document.createElement("div");
    label = document.createElement("label");
    input = document.createElement("input");
    ulWrap = document.createElement("div");

    constructor(icon) {
        super();    //子クラスでは最初にやっとく必要がある（らしい）
        this.wrap.id = "zBurgerWrap";
        this.label.setAttribute("for", "zBurgerChkbx");
        this.label.appendChild(icon);
        this.input.type = "checkbox";
        this.input.id = "zBurgerChkbx";
        this.input.checked = false;
        this.ulWrap.id = "zBurgerUlWrap";
        this.wrap.appendChild(this.label);
        this.wrap.appendChild(this.input);
        this.wrap.appendChild(this.ulWrap);
    };
    setWrapId(id) {
        this.wrap.id = id;
    };
    setWrapClass(cl) {
        this.wrap.classList.add(cl);
    };
    // ULのみ取得
    get() {
        return super.get();
    }
    // wrapを取得
    setBurger() {
        //最新のulを親クラスから取得
        while (this.ulWrap.children.length > 0) {
            this.ulWrap.children[0].remove();
        }
        this.ulWrap.appendChild(super.get());
        document.body.appendChild(this.wrap);

    }
};
