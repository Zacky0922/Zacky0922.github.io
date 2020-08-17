class burgerMenu extends zLinkList{
    /*
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
        this.ulWrap.appendChild(super.get());
        this.wrap.appendChild(this.ulWrap);
    };
    setWrapId(id) {
        this.wrap.id = id;
    };
    setWrapClass(cl) {
        this.wrap.classList.add(cl);
    };
    get() {
        return this.wrap;
    }
};
