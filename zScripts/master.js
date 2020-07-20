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
        //受取変数の個別処理
        if (this.#param["lv"] == undefined) {
            this.#param["lv"] = "https://zacky0922.github.io/";
            this.#param["root"] = "https://zacky0922.github.io/";
        } else {
            this.#param["root"] = "https://zacky0922.github.io/";
            this.init_lv();
        }
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
        this.add("eventListener:loaded - " + (((new Date()).getTime() - this.#loadTime.getTime()) / 1000) + "sec");
    }

})();



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    システムパッケージ
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

class zSystem {

    //  オンライン状況取得
    //  online  = true　／　offline = false
    static getOnline() {
        return (location.href.indexOf("http") > -1);
    }

    // icon取得
    static getGicon(icon,obj=false) {
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
    被読込ファイル冒頭に、必ず以下を記載
    loadJScounter_loaded++;     //JSのみ
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
//旧バージョンデバッグ
let loadJScounter_loaded = 0;

let zPreload = new (class zPreloader {
    #dir;
    #css = [

    ];
    #js = [
        //jQuery
        "https://code.jquery.com/jquery-3.4.1.min.js",

        // MathJax
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
        //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new
        "ex/math/MathJaxMacro.js",
        "ex/math/math.js",
    
        //tools
        "tools/button/button.js",
        "tools/date.js",
        "tools/menu/list.js",
        "tools/menu/burger.js",     // list.js依存
        "tools/audio/audio.js"

        /*

        */
    ];


    constructor(root,mode = null) {
        //  初期フォルダ設定
        this.#dir = root;
        //モード処理

        //  読込：クラス定義時に読込まで行う
        this.cssLoad();
        this.jsload();
    }


    //読込メソッド
    cssLoad() {
        this.cssLoad_(this.#dir + "zScripts/master.css");
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
        for (let i = 0; i < this.#js.length; i++) {
            if (this.#js[i].indexOf("http") > -1) {
                //外部js
                this.jsLoad_(this.#js[i]);
            } else {
                //手持ちjs
                this.jsLoad_(this.#dir + "zScripts/" + this.#js[i]);  //相対指定
            }
        }
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
})("../",zParam.get("mode"));


window.addEventListener('load', (event) => {

    //読込確認
    zLog.getLoadingTime();
    zLog.add("Loading Log on master.js", 1);

    // location
    zLog.add("location : " + location.href);
    
    // 引渡し変数確認
    zLog.add("URL query 変数一覧", 1);
    for (i in zParam.getAll()) {
        zLog.add(i +" - " + zParam.get(i));
    }
    zLog.add("", -1);

    zLog.add("", -1);   //Loading Logここまで


});


// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
