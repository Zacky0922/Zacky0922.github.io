export class zDate {
    now = new Date();
    target;
    constructor(date = null) {
        if (date == null) {
            this.target = new Date();
        } else {
            this.target = date;
        }
    }

    static duration(to, from = new Date()) {

        //toに時分秒があるかないかで、やや処理が変わる

        let d = new Array();
        d["msec"] = to.getTime() - from.getTime();   //msec
        d["sec"] = d["msec"] / 1000; //sec
        d["min"] = d["sec"] / 60;   //min
        d["hour"] = d["min"] / 60;   //hour
        d["day"] = d["hour"] / 24;   //day
        d["week"] = d["day"] / 7;    //week
        d["year"] = d["month"] = 0;    //年・月：未対応

        // 小数点以下切り捨て
        for (let i in d) {
            d[i] = Math.floor(d[i]);
        }

        //返り値はすべて「from～to」：msec >= 1000 or 負値の可能性有
        return d;
    }

    static countdownDays(to,from = new Date(),days = 1) {
        
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
export function zSetUndispDate() {
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
