loadJScounter_loaded++;

function nowTime() {
    var now = new Date();
    
}

//引数：年月日、行事の実施日数
function countDays(y, m, d, Dspan = 1) {
    var today = new Date();
    var targetday = new Date(y, m - 1, d);
    var days = Math.ceil(
        (targetday.getTime() - today.getTime()) / (24*60*60*1000)
    );
    if (days > 1) {
        document.write("まで、あと" + days + "日です。");
    } else if (days == 1) {
        document.write("は明日！");
    } else if (days == 0) {
        //Dspan関連未調整

        document.write("は今日！");


        
    } else {
        document.write("は終了しました。");
    }
    
}