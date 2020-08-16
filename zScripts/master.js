/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    グローバル利用変数
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

//HTML階層指定：読込時のscriptタグを急いで取得
let zParam = new (class urlQuery {
    #param = new Array();
    #src;
    constructor(scripts) {
        //let scripts = document.getElementsByTagName('script');
        this.#src = scripts[scripts.length - 1].src;
        let query = this.#src.substring(this.#src.indexOf('?') + 1);
        let parameters = query.split('&');
        // URLクエリを分解して取得する
        for (let i = 0; i < parameters.length; i++) {
            let element = parameters[i].split('=');
            let paramName = decodeURIComponent(element[0]);
            let paramValue = decodeURIComponent(element[1]);
            this.#param[paramName] = paramValue;
        }

        //受取変数の個別処理　－　Debugはここでルート指定
        if (this.#param["lv"] == undefined) {
            this.#param["lv"] = this.#param["root"] = "https://zacky0922.github.io/";
            //"https://zacky0922.github.io/";
        } else {
            this.#param["root"] = "https://zacky0922.github.io/";
            this.init_lv();
        }

        /*
        if (typeof manualQuery !== undefined) {
            for (let i in manualQuery) {
                this.#param[i] = manualQuery[i];
            }
        }
        */
    }

    getAll() {
        return this.#param;
    }
    get(paramName) {
        return this.#param[paramName];
    }
    set(paramName, param) {

    }

    //受取変数の個別処理
    init_lv() {
        let myLv = "";
        if (this.#param["lv"] > 0) {
            for (let i = 0; i < this.#param["lv"]; i++) {
                myLv = myLv + "../";
            }
        } else {
            myLv = "./";
        }
        this.#param["lv"] = myLv;
    }
})(document.getElementsByTagName('script'));



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    デバッグメッセージ処理
    第二引数：階層設定（最後は必ず閉じること）
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
let zLog = new (class debugMsg {
    #loadTime;
    #lv = 0;
    #msg = "◆debugMsg";
    constructor() {
        this.#loadTime = new Date();
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
                this.#msg += "\n" + tx;
                this.#lv++;
                break;
            case 0:
                //通常ログ
                console.log(tx);
                this.#msg += "\n" + tx;
                break;
            case -1:
                //グループ最終要素
                if (tx != "") {
                    console.log(tx);
                    this.#msg += "\n" + tx;
                }
                console.groupEnd();
                this.#lv--;
                break;
        }
    }

    get getMsg() {
        return this.#msg;
    }

    //ファイルのロードから本メソッド呼出までの時間を取得
    getLoadingTime() {
        return (new Date()).getTime() - this.#loadTime.getTime();
    }

})();

/*  for debug
<div>
<textarea id="debugMsgTxarea" style="width:100%;height:15em;color:#000;"></textarea>
<input type="button" onclick="document.getElementById('debugMsgTxarea').value = zDebug.getSpec()"
value="get debug data" \>
</div>
*/

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
    #dir;
    #css = [
        zParam.get("root") + "zScripts/master.css"
    ];
    #js = [
        // jQuery + UI
        "https://code.jquery.com/jquery-3.4.1.min.js",
        "https://code.jquery.com/ui/1.9.2/jquery-ui.js",

        // MathJax
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
        //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new
        "ex/math/MathJaxMacro.js",
        "ex/math/zMath.js",

        // abc.js
        "ex/abcjs/abcjs_basic_5.9.1-min.js",
        "ex/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
        "ex/abcjs/abcjs_zInit.js",

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
        "tools/tab/tab.js",          // list.js,jQueryUI依存
        "tools/date.js",
        "tools/develop/develop.js",

        /*

        */
    ];

    constructor(root, mode = null) {
        //  初期フォルダ設定
        this.#dir = root;

        //モード処理
        switch (zParam.get("mode")) {
            case "kgfes":
                let kg = "https://zacky0922.github.io/KGfes/2020jsh-test2/"
                this.#js.push(kg + "script/kgfes.js",
                    kg + "script/header.js",
                    kg + "script/footer.js"
                );
                this.#css = [kg + "script/kgfes.css"];
                break;
        }

        //  読込：クラス定義時に読込まで行う
        this.cssLoad();
        this.jsload();
    }


    //読込メソッド
    cssLoad() {
        this.cssLoad_(this.#css);

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
    jsload() {
        zLog.add("JS loading：", 1);
        zLog.add("> 指定URL\n> 読込URL（httpが無い場合、自動でroot dirを付加する）");
        for (let i = 0; i < this.#js.length; i++) {
            let url = (this.#js[i].indexOf("http") > -1 ?
                this.#js[i] :
                this.#dir + "zScripts/" + this.#js[i]
            );
            this.jsLoad_(url);
            zLog.add(this.#js[i] + "\n" + url);
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

    //読込完了チェック
    checkLoaded() {

    }
})(zParam.get("root"), zParam.get("mode"));


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

    zLog.add("Browsing Machine Spec：", 1);
    zLog.add(zDebug.getSpec());
    zLog.add("", -1);

    zLog.add("", -1);   //Loading Logここまで




    // 各種init処理
    // abcjs：soundFontDirを指定（ファイルではなくフォルダ）
    absjs_init(zParam.get("lv") + "zScripts/ex/abcjs/");




    // モード別処理
    switch (zParam.get("mode")) {
        case "kgfes":
            document.title += " ☆五峯祭2020☆"
            break;
    }

    // オフライン時、デバッグモード起動
    if (!zDebug.getOnline()) {
        let debugArea = document.createElement("div");
        debugArea.id = "debugArea";
        document.body.appendChild(debugArea);
        let debugMode = setInterval(function () {
            debugArea.innerText = "◆ Debug Mode ◆\n" +
                "Device Screen XY：\n　" +
                window.parent.screen.width + " x " +
                window.parent.screen.height + "\n" +
                "Displayable Area XY：\n　" +
                window.innerWidth + " x " +
                window.innerHeight + "\n" +
                "Divice Pixel Raito：\n　" +
                window.devicePixelRatio + "\n";
        },66);
    }
});


// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■