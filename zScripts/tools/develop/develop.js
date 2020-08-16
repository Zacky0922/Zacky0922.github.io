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
        if (location.href.indexOf("debug") > -1) {
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