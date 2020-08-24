// タブ生成
class zTab {
    id;
    parent;
    prefix;
    menu;
    constructor(id, prefix = null) {
        this.id = id;
        this.parent = document.getElementById(this.id);
        this.parent.classList.add("zTabWrap");
        this.prefix = prefix;

        //メニュー生成
        this.menu = new zList();
        this.menu.setClass("zTabMenu");
        for (let i = 0; i < this.parent.children.length; i++) {
            //メニュー項目生成
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.innerText = (this.prefix == null ?
                this.parent.children[i].id :
                this.parent.children[i].id.replace(this.prefix, ""));
            // jQuery2バイト文字のリンクはダメっぽいので適当に置換
            this.parent.children[i].id = this.id + "_" + i;
            a.href = "#" + this.parent.children[i].id;
            li.appendChild(a);
            this.menu.addLi(li);
        }
        this.parent.prepend(this.menu.get());

        //タブ化（jQuery UI）
        $("#" + this.id).tabs();
    }

}

// ツールチップ：error unworking
window.addEventListener('load', (event) => {
    $(function () {
        $(".jQueryUItooltip").tooltip({
            track: true
        });
    });
})