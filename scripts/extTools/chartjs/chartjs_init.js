loadJScounter_loaded++;

/* 現状未使用・・・本来ならidを設定せず、クラスを一括取得でやりたいが…？ */

function chartjs_init() {
    let myChart = document.getElementsByClassName("chartjs");
    for (let i = 0; i < myChart.length; i++){
        let myScript = myChart[i].innerHTML;
        myChart[i].innerHTML = "";


    }
}