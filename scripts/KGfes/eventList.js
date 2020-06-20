loadJScounter_loaded++;

function eventList_init(id) {
    
    var events = document.getElementById(id).children;
    
    //初期整形
    for (var i = 0; i < events.length; i++){
        //初期化（一度、中身を空に）
        var ele = new Array();
        ele["イベント名"] = events[i].children[0].innerHTML;
        ele["団体名"] = events[i].children[1].innerHTML;
        ele["画像"] = events[i].children[2].src;
        ele["紹介文"] = events[i].children[3].innerHTML;
        events[i].innerHTML = "";

        //時間／WEBギャラリー判定・要素追加
        var time = document.createElement("div");
        time.setAttribute("style","grid-area:event-time");
        for (var c = 0; c < events[i].classList.length; c++){
            if (events[i].classList[c].indexOf("bc_") > -1) {
                time.innerText = events[i].classList[c].replace("bc_", "");
                events[i].appendChild(time);
                break;
            } else if (events[i].classList[c].indexOf("webGallery") > -1) {
                time.innerText = "WEBギャラリー";
                events[i].appendChild(time);
                break;
            }
        }

        var title = document.createElement("div");
        title.setAttribute("style", "grid-area:event-title");
        title.appendChild(
            document.createTextNode(ele["イベント名"])
        );
        title.appendChild(
            document.createElement("br")
        );
        title.appendChild(
            document.createTextNode(ele["団体名"])
        );
        events[i].appendChild(title);

        var img = document.createElement("img");
        img.setAttribute("style", "grid-area:event-img");
        img.src = ele["画像"];
        events[i].appendChild(img);

        var text = document.createElement("div");
        text.setAttribute("style", "grid-area:event-text");
        text.innerHTML = ele["紹介文"];
        events[i].appendChild(text);
    }


    //日付順並べ替え
    sort_flag = false;
    while (sort_flag) {
        
    }
}