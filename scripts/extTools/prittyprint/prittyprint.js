loadJScounter_loaded++;

function rePrettyprint(id) {
    document.getElementById(id).classList.remove("prettyprinted");
    PR.prettyPrint();
}

function setQuickEditor(id,tx = "") {
    var ele = document.getElementById(id);
    ele.classList.add("prettyprintQuickEditor");

    var defaultSource = [
        '<!-- ここの内容をHTMLにコピペしましょう -->\n' +
        '<html>\n<head>\n' +
        '\t<title>タイトル</title>' +
        '\n</html>\n<body>\n',
        '</body>\n</html>'
    ];

    var txarea = document.createElement("textarea");
    txarea.setAttribute("onclick",
        "this.parentElement.children[1].innerText='" +
        defaultSource[0] + txarea.value + defaultSource[1] + "';" +
        "rePrettyprint(this.parentNode.children[1].id);");


    var pre = document.createElement("pre");
    pre.id = "prettyprint_" + Math.floor(Math.random() * 10);
    pre.classList.add("prettyprint");
    pre.classList.add("linenums");
    pre.innerText = defaultSource[0] + txarea.value + defaultSource[1];

    var preview = document.createElement("div");
    preview.innerHTML = pre.innerText;

    ele.appendChild(txarea);
    ele.appendChild(pre);
    ele.appendChild(preview);

    rePrettyprint(id);
}