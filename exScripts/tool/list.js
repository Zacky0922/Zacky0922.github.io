class zList {

    constructor() {
        this.ul = document.createElement("ul");
    }

    // UL基本設定
    setID(id) {
        this.ul.id = id;
    }
    setClass(cl) {
        this.ul.classList.add(cl);
    }

    // 内容追加：liの中身テキストのみ定義
    add(tx) {
        let li = document.createElement("li");
        li.appendChild(
            document.createTextNode(tx)
        );
        this.ul.appendChild(li);
    }

    // 内容追加：li要素自体を代入
    addLi(li, cl) {
        if (cl != undefined) {
            li.classList.add(cl);
            alert(cl);
        }
        this.ul.appendChild(li);
    }

    // 内容追加：リンク付加（リンク以下に説明文を付加も可能）
    addLink(tx, href , target, description, cl) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerHTML = tx;
        if (href != undefined) {
            a.href = href;
            if (target != undefined) {
                a.target = target;
            }
        }
        li.appendChild(a);
        if (description != undefined) {
            li.appendChild(document.createElement("br"));
            li.appendChild(document.createTextNode(description));
            //テキストではなく、HTML要素として追加したいかも？
        }
        if (cl != undefined) {
            li.classList.add(cl);
        }
        this.addLi(li);
    }

    // 内容追加：指定クラスをもつ要素を見出しとして一括登録
    getClassList(cl) {
        let clList = document.getElementsByClassName(cl);
        for (let i = 0; i < clList.length; i++) {
            if (clList[i].id == "") {
                clList[i].id = clList[i].innerText + "_id";
            }
            this.addLink(clList[i].innerText, "#" + clList[i].id);
        }
    }

    // リスト取得
    get() {
        return this.ul.cloneNode(true);
    }
}


class burgerMenu extends zList {

    /*
    バーガーコンテンツ
    wrap        div#zBurgerWrap
    label          label
                        引数icon
    input          input[checkbox]#zBurgerChkbx
    ulWrap         div#zBurgerUlWrap
    super.get()         ul
    */

    constructor(icon) {
        super();    //子クラスでは最初にやっとく必要がある（らしい）
        this.wrap = document.createElement("div");
        this.wrap.id = "zBurgerWrap";
        this.label = document.createElement("label");
        this.label.setAttribute("for", "zBurgerChkbx");
        this.label.appendChild(icon);
        this.input = document.createElement("input");
        this.input.type = "checkbox";
        this.input.id = "zBurgerChkbx";
        this.input.checked = false;
        this.ulWrap = document.createElement("div");
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

export { zList ,burgerMenu};
