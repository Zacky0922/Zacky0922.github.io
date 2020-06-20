loadJScounter_loaded++;

/* 現状未使用・・・本来ならidを設定せず、クラスを一括取得でやりたいが…？ */

function chartjs_init() {
    var myChart = document.getElementsByClassName("chartjs");
    for (var i = 0; i < myChart.length; i++){
        var myScript = myChart[i].innerHTML;
        myChart[i].innerHTML = "";


    }
}