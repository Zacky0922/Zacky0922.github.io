loadJScounter_loaded++;


function getSpec() {

    var tx = "Time\n　" + (new Date()).toString() + "\n";

    tx += "User Agent：\n　";

    /*  User Agent */
    var ua = window.navigator.userAgent;
    tx += ua + "\n";
    
    /*  OS判定 */
    ua = ua.toLowerCase();
    var osList = [
        ["windows", "Windows"],
        ["android", "Android"],
        ["iphone", "iPhone/iOS"],
        ["ipad", "iPad/iOS"],
        ["ios", "iOS"],
        ["mac", "Mac"],
        ["linux", "Linux"]
    ];
    tx += "OS：\n　";
    for (var i = 0; i < osList.length;i++){
        if (ua.indexOf(osList[i][0]) > -1) {
            tx += osList[i][1] + "\n";
            break;
        } else if (i - 1 == osList.length) {
            tx += "other\n";
        }
    }

    /*  ブラウザ判定 */
    var brList = [
        ["firefox", "Firefox"],
        ["chrome", "Chrome"],
        ["safari", "safari"],
        ["OPR", "Opera"],
        ["edge", "Edge"],
        ["ie","Internet Explorer"]
    ];
    tx += "Browser：\n　";
    for (var i = 0; i < brList.length; i++) {
        if (ua.indexOf(brList[i][0]) > -1) {
            tx += brList[i][1] + "\n";
            break;
        } else if (i - 1 == brList.length) {
            tx += "other\n";
        }
    }

    /*  エンジン */
    var egList = [
        ["webkit", "Webkit"],
        ["trident", "Trident"],
        ["gecko","Gecko"]
    ];
    tx += "Rendering Engine：\n　";
    for (var i = 0; i < egList.length; i++) {
        if (ua.indexOf(egList[i][0]) > -1) {
            tx += egList[i][1] + "\n";
            break;
        } else if (i - 1 == egList.length) {
            tx += "other\n";
        }
    }
    
    /*  画面サイズ関係
    https://web-designer.cman.jp/javascript_ref/window/size/
    */
    tx += "Device Screen XY：\n　" +
        window.parent.screen.width + " x " +
        window.parent.screen.height + "\n";
    tx += "Displayable Area XY：\n　" +
        window.innerWidth + " x " +
        window.innerHeight + "\n";

    return tx;
}