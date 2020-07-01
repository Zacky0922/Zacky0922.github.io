loadJScounter_loaded++;

function rePrettyprint(id) {
    document.getElementById(id).classList.remove("prettyprinted");
    //pre再整形
    PR.prettyPrint();

    //再設定
    //MathJax
    //abcjs
    //A-Frame
}

function setQuickEditor(id,tx = "") {
    var ele = document.getElementById(id);
    ele.classList.add("prettyprintQuickEditor");

    var defaultSource = [
        ['<!-- ここの内容をHTMLにコピペしましょう -->',
            '<html>',
            '<head>',
            '<title>タイトル</title>',
            '</head>',
            '<body>'],
        ['</body>',
            '</html>']
    ];


    var txarea = document.createElement("textarea");
    txarea.value = tx;
    txarea.onkeydown = function (e) { zEnableTab(e, this); }

    txarea.setAttribute("onkeyup",
        "this.parentElement.children[1].innerText='" +
        defaultSource[0].join("\\n") + "\\n'+this.value+'\\n" + defaultSource[1].join("\\n") + "';" +
        "rePrettyprint(this.parentElement.children[1].id);" +
        "this.parentElement.children[2].innerHTML=this.value");
    
    var pre = document.createElement("pre");
    pre.id = "prettyprintQuickPreviewer_" + Math.floor(Math.random() * 1024);
    pre.classList.add("prettyprint","linenums");
    pre.innerText = defaultSource[0].join("\n") + "\n" +
        txarea.value + "\n" +
        defaultSource[1].join("\n");

    var preview = document.createElement("div");
    preview.classList.add("prettyprintQuickPreviewer");
    preview.innerHTML = pre.innerText;

    ele.appendChild(txarea);
    ele.appendChild(pre);
    ele.appendChild(preview);

    rePrettyprint(id);
}

//タブ入力を有効にする（タブでの移動をキャンセルする）
//http://www.webclap-dandy.com/?category=Programing&id=5
function zEnableTab(e, obj) {
    //タブキー以外は無視
    if (e.keyCode != 9) {
        return;
    }

    //タブキーの標準挙動（次へ移動）をキャンセル
    e.preventDefault();

    // 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
    var cursorPosition = obj.selectionStart;
    var cursorLeft = obj.value.substr(0, cursorPosition);
    var cursorRight = obj.value.substr(cursorPosition, obj.value.length);

    // テキストエリアの中身を、
    // 「取得しておいたカーソルの左側」+「タブ」+「取得しておいたカーソルの右側」
    // という状態にする。
    obj.value = cursorLeft + "\t" + cursorRight;

    // カーソルの位置を入力したタブの後ろにする
    obj.selectionEnd = cursorPosition + 1;
}