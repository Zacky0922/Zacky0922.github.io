loadJScounter_loaded++;

let zNow = new Date();

//引数：年月日、行事の実施日数
function countDays(y, m, d, Dspan = 1) {
    let today = new Date();
    let targetday = new Date(y, m - 1, d);
    let days = Math.ceil(
        (targetday.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
    );

    //カウントダウン表示
    if (days > 1) {
        switch (days) {
            case 1:
                document.write("は明日！");
                break;
            case 2:
                document.write("は明後日！");
                break;
            case 7:
                document.write("まで、あと1週間！");
                break;
            case 14:
                document.write("まで、あと2週間！");
                break;
            default:
                document.write("まで、あと" + days + "日です。");
        }
    }
    //当日：期間中
    else if (days + (Dspan - 1) >= 0) {
        //Dspan関連要デバッグ（書いただけ、調整してない）
        if (Dspan == 1) {
            document.write("は今日！");
        } else {
            document.write("は開催中です（" + (-days + 1) + "日目）！");
        }
    }
    //終了後
    else {
        document.write("は終了しました。");
    }
}

// 素材関数

//一番便利かも？
function zCountdown(from, to) {
    let diff = to.getTime() - from.getTime();   //msec

    let myReturn = [
        //年・月・週・日
        0,  //年：未対応
        0,  //月：未対応
        Math.floor(diff / (1000 * 60 * 60 * 24 * 7)),   //週
        Math.floor(diff / (1000 * 60 * 60 * 24)),       //日

        //h,min,sec,msec
        Math.floor(diff / (1000 * 60 * 60)),    //h
        Math.floor(diff / (1000 * 60)),         //min
        Math.floor(diff / 1000),                //sec
        diff                                    //msec
    ];

    //返り値はすべて「from～to」：msec >= 1000 の可能性有
    return myReturn;
}


//8桁の年月日をDateオブジェクトに変換する
function zChangeDate(str) {
    return new Date(str.slice(0, 0 + 4), Number(str.slice(4, 4 + 2)) - 1, str.slice(6, 6 + 2));
}

//クラスに指定された年月日を取得する（クラスに zDate_20200101 等を指定：prefixは指定可）
function zGetEleDate(ele, prefix = "zDate_") {
    for (let i = 0; i < ele.classList.length; i++) {
        if (ele.classList[i].indexOf(prefix) > -1) {
            return zChangeDate(ele.classList[i].replace(prefix, ""));
        }
    }
    return zNow;
}


// 実用関数

//表示期間チェック
function zSetUndispDate() {
    let ele = document.getElementsByClassName("zDate");
    //各要素チェック
    for (let i = 0; i < ele.length; i++) {
        let flag = true;
        //要素のクラス一覧チェック
        for (let j = 0; j < ele[i].classList.length; j++){
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
