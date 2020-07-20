class zDate {
    #now = new Date();
    #target;
    constructor(y = null, m = null, d = null) {
        if (y == null) {
            target = new Date();
        } else {
            target = new Date(y, m - 1, d)
        }
    }

    static duration(to, from = new Date()) {
        
        //toに時分秒があるかないかで、やや処理が変わる

        let d = new Array();
        d[7] = to.getTime() - from.getTime();   //msec
        d[6] = d[7] / 1000; //sec
        d[5] = d[6] / 60;   //min
        d[4] = d[5] / 60;   //h
        d[3] = d[4] / 24;   //day
        d[2] = d[3] / 7;    //week
        d[0] = d[1] = 0;    //年・月：未対応

        //返り値はすべて「from～to」：msec >= 1000 or 負値の可能性有
        return d;
    }

    //8桁の年月日文字列をDateオブジェクトに変換する
    static tx2date(str) {
        return new Date(
            str.slice(0, 0 + 4),
            Number(str.slice(4, 4 + 2)) - 1,
            str.slice(6, 6 + 2)
        );
    }


    //クラスに指定された年月日を取得する（クラスに zDate_20200101 等を指定：prefixは指定可）
    static getEleDate(ele, prefix = "zDate_") {
        for (let i = 0; i < ele.classList.length; i++) {
            if (ele.classList[i].indexOf(prefix) > -1) {
                return this.tx2date(ele.classList[i].replace(prefix, ""));
            }
        }
        return null;
    }

}



// 実用関数

//表示期間チェック
function zSetUndispDate() {
    let ele = document.getElementsByClassName("zDate");
    //各要素チェック
    for (let i = 0; i < ele.length; i++) {
        let flag = true;
        //要素のクラス一覧チェック
        for (let j = 0; j < ele[i].classList.length; j++) {
            if (ele[i].classList[j].indexOf("zDateUndispTo_") > -1) {
                if (zGetEleDate(ele[i], "zDateUndispTo_").getTime() > zNow.getTime()) {
                    ele[i].classList.add("zUndisp");
                    flag = false;
                }
            }
            if (ele[i].classList[j].indexOf("zDateUndispFrom_") > -1) {
                if (zGetEleDate(ele[i], "zDateUndispFrom_").getTime() < zNow.getTime()) {
                    ele[i].classList.add("zUndisp");
                    flag = false;
                }
            }
        }
        if (flag) {
            ele[i].classList.remove("zUndisp");
        }
    }
}
