//改善の余地大あり

class zPR {

    wrapId;
    wrap;
    area;
    defaultSource = [
        ['<!-- ここの内容をHTMLにコピペしましょう -->',
            '<html>',
            '<head>',
            '<title>タイトル</title>',
            '</head>',
            '<body>'],
        ['</body>',
            '</html>']
    ];

    constructor(id, tx = "") {
        this.wrapId = id;
        this.wrap = document.getElementById(id);
        this.wrap.classList.add("prettyprintQuickEditor");

        // 入力エリア生成
        this.area = new Array(3);
        this.area[0] = document.createElement("textarea");
        this.area[0].value = tx;
        this.area[0].onkeydown = function (e) {
            //タブキー以外は無視
            if (e.keyCode != 9) {
                return;
            }

            //タブキーの標準挙動（次へ移動）をキャンセル
            e.preventDefault();

            // 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
            let cursorPosition = this.area[0].selectionStart;
            let cursorLeft = this.area[0].value.substr(0, cursorPosition);
            let cursorRight = this.area[0].value.substr(cursorPosition, this.area[0].value.length);

            // テキストエリアの中身を、
            // 「取得しておいたカーソルの左側」+「タブ」+「取得しておいたカーソルの右側」
            // という状態にする。
            this.area[0].value = cursorLeft + "\t" + cursorRight;

            // カーソルの位置を入力したタブの後ろにする
            this.area[0].selectionEnd = cursorPosition + 1;
        }
        this.area[0].setAttribute("onkeyup",
            "this.parentElement.children[1].innerText='" +
            this.defaultSource[0].join("\\n") +
            "\\n'+this.value+'\\n" +
            this.defaultSource[1].join("\\n") + "';" +
            "zPR.rePrettyprint('" + this.wrapId + "');" +
            "this.parentElement.children[2].innerHTML=this.value");

        // コードハイライト部生成
        this.area[1] = document.createElement("pre");
        this.area[1].id = "prettyprintQuickPreviewer_" + Math.floor(Math.random() * 1024);
        this.area[1].classList.add("prettyprint", "linenums");
        this.area[1].innerText = this.defaultSource[0].join("\n") +
            "\n" +
            this.area[0].value + "\n" +
            this.defaultSource[1].join("\n");

        // プレビュワー生成
        this.area[2] = document.createElement("div");
        this.area[2].classList.add("prettyprintQuickPreviewer");
        this.area[2].innerHTML = this.area[1].innerText;

        // 要素追加
        this.wrap.appendChild(this.area[0]);
        this.wrap.appendChild(this.area[1]);
        this.wrap.appendChild(this.area[2]);

        // 描画
        PR.prettyPrint();
    }


    static rePrettyprint(id = null) {
        if (id == null) {
            this.wrap.children[1].classList.remove("prettyprinted");
        } else {
            document.getElementById(id).children[1].classList.remove("prettyprinted");
        }
        //pre再整形
        PR.prettyPrint();

        //再設定
        //MathJax
        //abcjs
        //A-Frame
    }


    //タブ入力を有効にする（タブでの移動をキャンセルする）
    //http://www.webclap-dandy.com/?category=Programing&id=5
    enableTab(e, obj) {
        //タブキー以外は無視
        if (e.keyCode != 9) {
            return;
        }

        //タブキーの標準挙動（次へ移動）をキャンセル
        e.preventDefault();

        // 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
        let cursorPosition = obj.selectionStart;
        let cursorLeft = obj.value.substr(0, cursorPosition);
        let cursorRight = obj.value.substr(cursorPosition, obj.value.length);

        // テキストエリアの中身を、
        // 「取得しておいたカーソルの左側」+「タブ」+「取得しておいたカーソルの右側」
        // という状態にする。
        obj.value = cursorLeft + "\t" + cursorRight;

        // カーソルの位置を入力したタブの後ろにする
        obj.selectionEnd = cursorPosition + 1;
    }


}

