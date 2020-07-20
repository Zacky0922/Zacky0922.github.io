
class zList{
    #ul = document.createElement("ul");

    constructor() {

    }
    // リスト基本設定
    setID(id) {
        this.#ul.id = id;
    }
    setClass(cl) {
        this.#ul.classList.add(cl);
    }
    // 内容追加
    add(tx) {
        let li = document.createElement("li");
        li.appendChild(
            document.createTextNode(tx)
        );
        this.#ul.appendChild(li);
    }
    addLi(li) {
        this.#ul.appendChild(li);
    }
    // リスト取得
    get() {
        return this.#ul;
    }
}

class zLinkList extends zList {

    addLink(tx, href =null, target = "_self", description = null) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerHTML = tx;
        if (href != null) {
            a.href = href;
            a.target = target;
        }
        li.appendChild(a);
        if (description != null) {
            li.appendChild(document.createElement(br));
            li.appendChild(document.createTextNode(description));
        }
        super.addLi(li);
    }
}






