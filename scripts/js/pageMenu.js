loadJScounter_loaded++;

function getHeadClass(cl) {
    var heads = document.getElementsByClassName(cl);

    if (heads.length == 0) {
        return null;
    }

    var ul = document.createElement("ul");
    debugMsg("set IDs", 1);
    for (var i = 0; i < heads.length; i++) {
        if (heads[i].id == "") {
            heads[i].id = "zID_" + zReplaceStrict(heads[i].innerText);
        }
        debugMsg(heads[i].id);
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + heads[i].id;
        a.innerText = heads[i].innerText;
        li.appendChild(a);
        ul.appendChild(li);
    }
    debugMsg("", -1);
    return ul;
}

function getPageMenu(id) {
    var ul = getHeadClass("zHeadList");
    if (ul != null) {
        document.getElementById(id).appendChild(ul);
    }
}