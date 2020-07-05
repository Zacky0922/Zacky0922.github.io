loadJScounter_loaded++;

function getHeadClass(cl) {
    let heads = document.getElementsByClassName(cl);

    if (heads.length == 0) {
        return null;
    }

    let ul = document.createElement("ul");
    debugMsg("set IDs", 1);
    for (let i = 0; i < heads.length; i++) {
        if (heads[i].id == "") {
            heads[i].id = "zID_" + zReplaceStrict(heads[i].innerText);
        }
        debugMsg(heads[i].id);
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#" + heads[i].id;
        a.innerText = heads[i].innerText;
        li.appendChild(a);
        ul.appendChild(li);
    }
    debugMsg("", -1);
    return ul;
}

function getPageMenu(id) {
    let ul = getHeadClass("zHeadList");
    if (ul != null) {
        document.getElementById(id).appendChild(ul);
    }
}