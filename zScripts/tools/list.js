
class zList{
    ul = document.createElement("ul");

    constructor() {

    }
    // リスト基本設定
    setID(id) {
        this.ul.id = id;
    }
    setClass(cl) {
        this.ul.classList.add(cl);
    }
    // 内容追加（liの中身テキストのみ定義）
    add(tx) {
        let li = document.createElement("li");
        li.appendChild(
            document.createTextNode(tx)
        );
        this.ul.appendChild(li);
    }
    //内容追加（li丸ごと定義）
    addLi(li) {
        this.ul.appendChild(li);
    }
    // リスト取得
    get() {
        return this.ul;
    }
}

class zLinkList extends zList {

    constructor() {
        super();    //子クラスでは最初にやっとく必要がある（らしい）
    }
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
            //テキストではなく、HTML要素として追加したいかも？
        }
        super.addLi(li);
    }

    //指定クラスをもつ要素を見出しとして一括登録
    getClassList(cl) {
        let clList = document.getElementsByClassName(cl);
        for (let i = 0; i < clList.length; i++) {
            if (clList[i].id == "") {
                clList[i].id = clList[i].innerText + "_id";
            }
            this.addLink(clList[i].innerText,"#"+clList[i].id);
        }
    }
}






