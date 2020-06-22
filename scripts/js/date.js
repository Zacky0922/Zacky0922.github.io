loadJScounter_loaded++;

//現在の年月日時分秒を取得
function nowTime() {
    var now = new Date();
}

//引数：年月日、行事の実施日数
function countDays(y, m, d, Dspan = 1) {
    var today = new Date();
    var targetday = new Date(y, m - 1, d);
    var days = Math.ceil(
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
    else if (days+(Dspan-1) >=0) {
        //Dspan関連要デバッグ（書いただけ、調整してない）
		if(Dspan==1){
			document.write("は今日！");
		}else{
			document.write("は開催中です（" + (-days+1)+ "日目）！");
		}
    }
    //終了後
    else {
		document.write("は終了しました。");
	}
}


//要調整
function countdownTimer(ele, y, m, d, hr, min) {

    var targetday = new Date(y, m - 1, d, hr, min);

    var _countdownTimer = setInterval(function () {
        var today = new Date();
        var diff = Math.ceil(
            (targetday.getTime() - today.getTime()) / 1000
        );    //sec
        var sec = diff % 60;
        min = (diff -= sec) % (60 * 60);
        min /= 60;
        hr = (diff -= min * 60) % (24 * 60 * 60);
        hr /= 60 * 60;
        d = (diff -= hr * 60 * 60) / (24 * 60 * 60);
        ele.innerHTML = d + "日" + hr + "時間" + min + "分" + sec + "秒";
    }, 166);

    //var days = Math.ceil(diff / (24*60*60));
    //var sec = (diff - days*24*60);

}

function zCountdown(from, to) {
    var diff = to.getTime() - from.getTime();   //msec

    var myReturn = [
        //年・月・週・日
        0,  //年：未対応
        0,  //月：未対応
        Math.floor(diff / (1000 * 60 * 60 * 24 * 7)),
        Math.floor(diff / (1000 * 60 * 60 * 24)),

        //h,min,sec,msec
        Math.floor(diff / (1000 * 60 * 60)),
        Math.floor(diff / (1000 * 60)),
        Math.floor(diff / 1000),
        diff
    ];

    //返り値はすべて「from～to」：msec >= 1000 の可能性有
    return myReturn;
}