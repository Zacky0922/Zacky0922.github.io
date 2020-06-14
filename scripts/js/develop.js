loadJScounter_loaded++;


function getSpec() {

    var tx = "User Agent：\n　";

    /*  User Agent */
    var ua = window.navigator.userAgent;
    tx += ua + "\n";
    
    /*  OS判定 */
    ua = ua.toLowerCase();
    var osList = [
        ["windows", "Windows"],
        ["mac", "Mac"],
        ["linux", "Linux"],
        ["android", "Android"],
        ["iphone", "iOS"],
        ["ipad", "iOS"],
        ["ios","iOS"]
    ];
    tx += "OS\n　";
    for (var i = 0; i < osList.length;i++){
        if(ua.indexOf(osList[i][0] > -1)){
            tx += osList[i][1] + "\n";
            break;
        }
        tx += "other\n";
    }

    /*  ブラウザ判定 */
    var brList = [
        ["chrome", "Chrome"],
        ["safari", "safari"],
        ["firefox", "Firefox"],
        ["OPR", "Opera"],
        ["edge", "Edge"],
        ["ie","Internet Explorer"]
    ];
    tx += "Browser\n　";
    for (var i = 0; i < brList.length; i++) {
        if (ua.indexOf(brList[i][0] > -1)) {
            tx += brList[i][1] + "\n";
            break;
        }
        tx += "other\n";
    }

    /*  エンジン */
    var egList = [
        ["webkit", "Webkit"],
        ["trident", "Trident"],
        ["gecko","gecko"]
    ];
    tx += "Engine\n　";
    for (var i = 0; i < egList.length; i++) {
        if (ua.indexOf(egList[i][0] > -1)) {
            tx += egList[i][1] + "\n";
            break;
        }
        tx += "other\n";
    }
    /*  画面サイズ関係
    https://web-designer.cman.jp/javascript_ref/window/size/
    */
    tx += "Device Screen XY：\n　" +
        window.parent.screen.width + " x " +
        window.parent.screen.height + "\n";
    tx += "Browser XY：\n　" +
        window.innerWidth + " x " +
        window.innerHeight + "\n";

    return tx;
}