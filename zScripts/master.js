/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    グローバル利用変数
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */




//HTML階層指定：読込時のscriptタグを急いで取得
let zParam = new (class urlQuery {
    param;
    constructor(scripts) {
        //let scripts = document.getElementsByTagName('script');
        let src = scripts[scripts.length - 1].src;
        let query = src.substring(src.indexOf('?') + 1);
        let parameters = query.split('&');
        let param = new Object();
        // URLクエリを分解して取得する
        for (let i = 0; i < parameters.length; i++) {
            let element = parameters[i].split('=');
            let paramName = decodeURIComponent(element[0]);
            let paramValue = decodeURIComponent(element[1]);
            param[paramName] = paramValue;
        }
        this.param = param;
        //受取変数の個別処理
        if (this.param["lv" == undefined]) {
            this.param["lv"] = "https://zacky0922.github.io/";
            this.param["root"] = "https://zacky0922.github.io/";
        } else {
            this.init_lv();
        }
    }


    get(paramName) {
        return this.param[paramName];
    }

    //受取変数の個別処理
    init_lv() {
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
let zLog = class debugMsg {
    constructor() {
        loadTime = new Date();
        lv = 0;
        msg = "◆debugMsg";
    }



    add(tx, group = 0) {
        if (tx != "") {
            //インデント付与
            tx = (lv == 0 ? "" : " > ") + tx;
        }

        switch (group) {
            case 1:
                //グループ見出し
                console.groupCollapsed(tx);
                this.msg += "\n" + tx;
                lv++;
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
                lv--;
                break;
        }
    }

    get getMsg() {
        return this.msg;
    }


    initCheck() {
        // 引渡し変数確認
        debugMsg("master.js? 引渡し変数一覧", 1);
        for (i in getParam) {
            debugMsg('getParam["' + i + '"] = ' + getParam[i]);
        }
        debugMsg("", -1);
    }

}



/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    システムパッケージクラス
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */

let zSys = class zSystem{



    /*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
        オンライン状況取得
        online  = true
        offline = false
        ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
    getOnline() {
        return (location.href.indexOf("http") > -1);
    }
}

/*  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □
    CSS/JS loader
    被読込ファイル冒頭に、必ず以下を記載
    loadJScounter_loaded++;     //JSのみ
    ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ */
class zPreloader {
    dir;
    css = [];
    js = [
        //jQuery
        "https://code.jquery.com/jquery-3.4.1.min.js",
        "extTools/jQuerySetting.js",

        // jQuery Plugins

        //MathJax
        "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
        //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new
        "extTools/MathJaxMacro.js",

        //A-Frame
        "https://aframe.io/releases/1.0.4/aframe.min.js",
        "extTools/A-Frame/develop.js",

        //Chart.js
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js",
        //"extTools/chartjs/chartjs_init.js",

        //prettify
        "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js",
        "extTools/prittyprint/prittyprint.js",
        //"extTools/ExCodePrettify/jquery.ex-code-prettify.js",   //Prettify,jQuery利用

        //extTools
        "extTools/abcjs/abcjs_basic_5.9.1-min.js",
        "extTools/abcjs/abcjs_basic_midi-min.js",     //v3.2.1
        "extTools/abcjs/abcjs_zInit.js",

        "extTools/googleicon/googleicon.js",

        //自作js
        "js/txReplace.js",
        "js/customRandom.js",
        "js/date.js",
        "js/setTab.js",
        "js/pageMenu.js",   //txReplace利用

        //数学用mathTools
        "mathTools/algebra.js",
        "mathTools/matrix.js",  //with algebra

        //zTools
        "zTools/develop.js",
        "zTools/burger/burger.js"
    ];

    constructor(root) {
        this.dir = root;
    }

    //個別読込メソッド
    cssLoad() {

    }
    jsLoad() {
        if (true) {
            document.write('<script type="text/javascript" src="' + root + '"></script>');
        } else {
            let myScript = document.createElement("script");
            myScript.type = "text/javascript";
            myScript.src = mySrc;
            document.head.appendChild(myScript);
        }
        // memo：DOMよりdocument.writeの方が圧倒的に早い
    }

    //読込完了チェック
    checkLoaded() {

    }
}



window.addEventListener('load', (event) => {



});


// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
// □■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■
