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



function countdownTimer(ele,y,m,d,hr,min){

    var targetday = new Date(y, m - 1, d, hr, min);

    var _countdownTimer = setInterval(function () {
        var today = new Date();
        var diff = Math.ceil(
            (targetday.getTime() - today.getTime())/1000
            );    //sec
        var sec = diff % 60;
        min = (diff -= sec)%(60*60);
        min /= 60;
        hr = (diff -= min*60)%(24*60*60);
        hr /= 60*60;
        d = (diff-=hr*60*60) / (24*60*60);
        ele.innerHTML = d + "日"+hr+"時間"+min+"分"+sec+"秒";
    }, 166);
    
    //var days = Math.ceil(diff / (24*60*60));
    //var sec = (diff - days*24*60);

}