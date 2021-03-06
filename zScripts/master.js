/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    グローバル利用変数
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

//HTML階層指定：読込時のscriptタグを急いで取得
let zParam = new (class urlQuery {
    param = new Array();
    src;
    constructor(scripts) {
        if (typeof manualQuery === "undefined") {
            this.src = scripts[scripts.length - 1].src;
            let query = this.src.substring(this.src.indexOf('?') + 1);
            let parameters = query.split('&');
            // URLクエリを分解して取得する
            for (let i = 0; i < parameters.length; i++) {
                let element = parameters[i].split('=');
                let paramName = decodeURIComponent(element[0]);
                let paramValue = decodeURIComponent(element[1]);
                this.param[paramName] = paramValue;
            }

            // 受取変数の個別処理
            // root         サイトを構成するroot dirを指定
            // zScriptsDir  zScriptライブラリフォルダを指定
            // https://zacky0922.github.io/
            // https://fes.kgef.ac.jp/2020jsh-test2/
            // http://192.168.1.171/test/
            // 本当はこれで分岐したい…　this.param["mode"]
            let basicUrl;
            if (location.href.indexOf("fes.kgef.ac.jp/2020jsh/") > -1) {
                basicUrl = "https://fes.kgef.ac.jp/2020jsh/";
                this.param["root"] = basicUrl + "";
                this.param["zScriptsDir"] = basicUrl + "zScripts/";
            } else if (location.href.indexOf("fes.kgef.ac.jp/2020jsh-test/") > -1) {
                basicUrl = "https://fes.kgef.ac.jp/2020jsh-test/";
                this.param["root"] = basicUrl + "";
                this.param["zScriptsDir"] = basicUrl + "zScripts/";
            } else if (location.href.indexOf("192.168.1.171") > -1) {
                basicUrl = "http://192.168.1.171/test/";
                this.param["root"] = basicUrl + "KGfes/2020jsh-test/";
                this.param["zScriptsDir"] = basicUrl + "zScripts/";
            } else {
                // localのとき
                switch (this.param["mode"]) {
                    case "KG":
                        basicUrl = "../";
                        this.param["root"] = basicUrl + "KG/";
                        this.param["zScriptsDir"] = basicUrl + "zScripts/";
                        break;
                    case "lab":
                        basicUrl = "../";
                        this.param["root"] = basicUrl + "lab/";
                        this.param["zScriptsDir"] = basicUrl + "zScripts/";
                        break;
                    case "kgfes":
                    case "kgfes-debug":
                        basicUrl = "../../";
                        this.param["root"] = basicUrl + "KGfes/2020jsh-test/";
                        this.param["zScriptsDir"] = basicUrl + "zScripts/";
                        break;
                }
            }

        } else {
            this.param = manualQuery;
        }

    }

    getAll() {
        return this.param;
    }
    get(paramName) {
        return this.param[paramName];
    }
    set(paramName, param) {

    }

    //受取変数の個別処理
    init_lv() {
        alert("使用しない！");
        let myLv = "";
        if (this.param["lv"] > 0) {
            for (let i = 0; i < this.param["lv"]; i++) {
                myLv = myLv + "../";
            }
        } else {
            myLv = "./";
        }
        this.param["lv"] = myLv;
    }
})(document.getElementsByTagName('script'));



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    デバッグメッセージ処理
    第二引数：階層設定（最後は必ず閉じること）
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
let zLog = new (class debugMsg {
    loadTime;
    lv = 0;
    msg = "◆debugMsg";
    constructor() {
        this.loadTime = new Date();
    }

    add(tx, group = 0) {
        if (tx != "") {
            //インデント付与
            //tx = (this.lv == 0 ? "" : " > ") + tx;
        }

        switch (group) {
            case 1:
                //グループ見出し
                console.groupCollapsed(tx);
                this.msg += "\n" + tx;
                this.lv++;
                break;
            case 0:
                //通常ログ
                console.log(tx);
                this.msg += "\n" + tx;
                break;
            case -1:
                //グループ最終要素
                if (tx != "") {
                    console.log(tx);
                    this.msg += "\n" + tx;
                }
                console.groupEnd();
                this.lv--;
                break;
        }
    }

    getMsg() {
        return this.msg;
    }

    //ファイルのロードから本メソッド呼出までの時間を取得
    getLoadingTime() {
        return (new Date()).getTime() - this.loadTime.getTime();
    }

})();


/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    システムパッケージ
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

class zSystem {

    // icon取得
    static getGicon(icon, obj = false) {
        let ele = document.createElement("span");
        ele.classList.add("material-icons");
        ele.innerText = icon;
        if (obj) {
            return ele;
        } else {
            return ele.outerHTML;
        }
    }
};

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    CSS/JS loader
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//旧バージョンデバッグ
let loadJScounter_loaded = 0;

let zPreload = new (class zPreloader {
    css = [
        zParam.get("zScriptsDir") + "common.css"
    ];
    js = [
        // jQuery + UI
        "https://code.jquery.com/jquery-3.4.1.min.js",
        "https://code.jquery.com/ui/1.9.2/jquery-ui.js",
        // jQuery Plugin：tablesoter + 漢字対応
        "https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.1/js/jquery.tablesorter.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.1/js/extras/jquery.metadata.min.js",
        "ex/jQueryUI/jQueryUI.js",          // list.js,jQueryUI依存
        
        // MathJax
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
        //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new
        "ex/math/MathJaxMacro.js",
        "ex/math/zMath.js",

        // abc.js
        "ex/abcjs/abcjs_basic_5.9.1-min.js",
        "ex/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
        "ex/abcjs/abcjs_zInit.js",
        
        // animate.css
        "ex/animate.css/zFunc.js",

        // google icon
        "ex/MaterialIcons/googleicon.js",

        // prittyprint
        "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js",
        "ex/prittyprint/prittyprint.js",

        //Chart.js
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js",
        //"extTools/chartjs/chartjs_init.js",


        //tools
        "tools/list.js",

        "tools/audio/audio.js",
        "tools/button/button.js",
        "tools/menu/burger.js",     // list.js依存
       
        "tools/date.js",

        /*

        */
    ];

    constructor() {

        //モード処理
        switch (zParam.get("mode")) {

            case "lab":
            case "KG":
                this.css.push(zParam.get("zScriptsDir") + "master.css");
                break;
            case "kgfes":
            case "kgfes_debug":
                this.js.push(zParam.get("root") + "script/kgfes.js",
                    zParam.get("root") + "script/header.js",
                    zParam.get("root") + "script/footer.js",
                    zParam.get("root") + "script/menu.js"  //必ず最後に！
                );
                this.css.push(zParam.get("root") + "script/kgfes.css");
                break;
        }

        // デバッグ処理は必ず最後に追加
        this.js.push("tools/develop/develop.js");
        
        //  読込：クラス定義時に読込まで行う
        this.jsload();
        this.cssLoad();
    }

    //読込メソッド
    jsload() {
        zLog.add("JS loading：", 1);
        zLog.add("> 指定URL ／ 読込URL（httpが無い場合、自動でroot dirを付加する）");
        for (let i = 0; i < this.js.length; i++) {
            let url = (
                (this.js[i].indexOf("http") > -1) || (this.js[i].indexOf("../") > -1) ?
                this.js[i] :
                zParam.get("zScriptsDir") + this.js[i]
            );
            this.jsLoad_(url);
            zLog.add(this.js[i] + "\n(" + url + ")");
        }
        zLog.add("", -1);
    }

    jsLoad_(src) {
        document.write('<script type="text/javascript" src="' + src + '"></script>');
        return;

        // memo：DOMよりdocument.writeの方が圧倒的に早い
        let myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = src;
        document.head.appendChild(myScript);
    }
    cssLoad() {
        zLog.add("CSS loading：", 1);
        for (let i = 0; i < this.css.length; i++) {
            let url = (this.css[i].indexOf("http") > -1 ?
                this.css[i] :
                zParam.get("zScriptsDir") + this.css[i]
            );
            this.cssLoad_(this.css[i]);
            zLog.add(this.css[i] );
        }
        zLog.add("", -1);
    }
    cssLoad_(src) {
        document.write('<link rel="stylesheet" type="text/css" href="' + src + '" />');
        return;

        let myCSS = document.createElement("link");
        myCSS.rel = "stylesheet";
        myCSS.type = "text/css";
        myCSS.href = src;
        document.head.appendChild(myCSS);
    }

})();


window.addEventListener('load', (event) => {

    //読込確認
    zLog.add("Loading Log on master.js", 1);

    zLog.add("Loading Time = " + (zLog.getLoadingTime() / 1000) + "sec [load - onload event]");
    // location
    zLog.add("location = " + location.href);

    // 引渡し変数確認
    zLog.add("URL query 変数一覧", 1);
    for (i in zParam.getAll()) {
        zLog.add(i + " - " + zParam.get(i));
    }
    zLog.add("", -1);

    zLog.add("Browsing Device Spec：", 1);
    zLog.add(zDebug.getSpec());
    zLog.add("", -1);

    zLog.add("", -1);   //Loading Logここまで

    // 各種init処理
    // abcjs：soundFontDirを指定（ファイルではなくフォルダ）
    absjs_init(zParam.get("zScriptsDir") + "ex/abcjs/");

    // モード別処理
    switch (zParam.get("mode")) {

    }

});

// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■

