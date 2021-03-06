let zDebug = new (class zDebug {
    ua;

    constructor() {
        this.ua = window.navigator.userAgent.toLowerCase();
    }

    getOS() {
        let osList = [
            ["windows", "Windows"],
            ["android", "Android"],
            ["iphone", "iPhone/iOS"],
            ["ipad", "iPad/iOS"],
            ["ios", "iOS"],
            ["mac", "Mac"],
            ["linux", "Linux"]
        ];
        for (let i = 0; i < osList.length; i++) {
            if (this.ua.indexOf(osList[i][0]) > -1) {
                return osList[i][1];
            }
        }
        return "other";
    }

    getBrowser() {
        let brList = [
            ["firefox", "Firefox"],
            ["chrome", "Chrome"],
            ["OPR", "Opera"],
            ["edge", "Edge"],
            ["ie", "Internet Explorer"],
            ["safari", "safari"]
        ];
        for (let i = 0; i < brList.length; i++) {
            if (this.ua.indexOf(brList[i][0]) > -1) {
                return brList[i][1];
            }
        }
        return "other";
    }

    getEngine() {
        let egList = [
            ["webkit", "Webkit"],
            ["trident", "Trident"],
            ["gecko", "Gecko"]
        ];
        for (let i = 0; i < egList.length; i++) {
            if (this.ua.indexOf(egList[i][0]) > -1) {
                return egList[i][1];
            }
        }
        return "other";
    }

    getSpec() {
        let tx = "Time：\n　" + (new Date()).toString() + "\n";

        /*  User Agent */
        tx += "User Agent：\n　" + window.navigator.userAgent + "\n";
        /*  OS判定 */
        tx += "OS：\n　" + this.getOS() + "\n";
        /*  ブラウザ判定 */
        tx += "Browser：\n　" + this.getBrowser() + "\n";
        /*  エンジン */
        tx += "Rendering Engine：\n　" + this.getEngine() + "\n";

        /*  画面サイズ関係
        https://web-designer.cman.jp/javascript_ref/window/size/
        */

        tx += "Device Screen XY：\n　" +
            window.parent.screen.width + " x " +
            window.parent.screen.height + "\n";
        tx += "Displayable Area XY：\n　" +
            window.innerWidth + " x " +
            window.innerHeight + "\n";
        tx += "Divice Pixel Raito：\n　" +
            window.devicePixelRatio + "\n";

        return tx;
    }

    //  オンライン状況取得
    //  online  = true　／　offline = false
    /*  原則「http」があればオンライン
        例外）URLクエリに適当に「?debug」とかつければ、常にオフラインモード
        例外）ローカルサーバー（192.168. or raspberrypi）はオフラインモード
    */
    getOnline() {

        //  return true;    //疑似オンライン
        //  return false;   //疑似オフライン（デバッグモード）
        if (location.href.indexOf("nondebug") > -1) {
            return true;
        } else if (location.href.indexOf("debug") > -1) {
            return false;
        } else if (location.href.indexOf("http://192.168.") > -1) {
            return false;
        } else if (location.href.indexOf("http://raspberrypi/") > -1) {
            return false;
        } else if (location.href.indexOf("http") > -1) {
            return true;
        }
        return false;
    }

})();

// デバッグモードからの遷移は、再度デバッグモードへ自動遷移
if (document.referrer.indexOf("?debug") > -1) {
    if (location.href.indexOf("?debug") == -1) {
        location.href = location.href + "?debug";
    }
}

window.addEventListener('load', (event) => {

    if (zDebug.getOnline()) {
        // オンライン時

    } else {
        // オフライン時

        // デバッグ要素表示
        let obj = document.getElementsByClassName("debug");
        while (true) {
            if (obj.length == 0) {
                break;
            }
            obj[0].classList.add("debug_");
            obj[0].classList.remove("debug");
        }

        // デバッグモード起動
        let debugArea = document.createElement("div");
        debugArea.id = "debugArea";
        let info = document.createElement("div");
        info.id = "debugAreaInfo";
        debugArea.appendChild(info);
        debugArea.innerHTML += "<div id='debugAreaMsg'>" +
            "<textarea id='debugLog'></textarea>" +
            "<br/>" +
            "<input type='button' value='get log' onclick='document.getElementById(" + '"debugLog"' + ").value=zLog.getMsg()'>" +
            "<br/>" +
            "<input type='button' value='nondebug mode' onclick='location.href+=" + '"?nondebug"' + "'>" +
            "<br/>" +
            "<input type='button' value='Super Reload?' onclick='window.location.reload(true);'>" +
            "</div>";
        document.body.appendChild(debugArea);

        let debugMode = setInterval(function () {
            document.getElementById("debugAreaInfo").innerText = "◆ Debug Mode ◆\n" +
                "Device Screen XY：\n　" +
                window.parent.screen.width + " x " +
                window.parent.screen.height + "\n" +
                "Displayable Area XY：\n　" +
                window.innerWidth + " x " +
                window.innerHeight + "\n" +
                "Divice Pixel Raito：\n　" +
                window.devicePixelRatio + "\n" +
                "page[XY]Offset：\n　" +
                "x = " + window.pageXOffset + ", y = " + window.pageYOffset +
                "";
        }, 66);
    }
});