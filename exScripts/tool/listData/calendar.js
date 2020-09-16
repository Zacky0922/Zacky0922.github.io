// 非export変数
// 本日
let today = new Date();
// 予定登録
// 複数のカレンダーを同一ページに表示する可能性を考えて次の連想配列を適用
// array[this.id][i] = [y/0,m,d/0,week,date,html,divCl,tdCl]
// y=0 毎年繰り返し　d=0 第n週○曜日指定
let schedule = new Array();
let setRegularSchedule = new Array();   // 毎年イベント登録済みフラグ

class zCalendar {
    constructor(id) {
        this.id = id;
        this.wrap = document.getElementById(id);

        // table初期化
        this.tbody = document.createElement("tbody");   // captionイベントハンドラ用に早めに生成
        // table生成・代入
        this.tbl = document.createElement("table");
        this.tbl.classList.add("zCalendar");    // table設定関連（calendar.css）
        this.wrap.appendChild(this.tbl);
        // caption生成
        this.setCaption(today.getFullYear(), today.getMonth() + 1);
        // thead生成
        this.setThead();
        // tbody生成（空箱）
        this.tbl.appendChild(this.tbody);
    }


    // 祝祭日設定
    setHolidays(csv, y = this.y) {
        // 重複セット防止
        if (this.setHolidayYear.includes(y)) {
            return;
        } else {
            this.setHolidayYear.push(y);
        }
        return;

        // 祝祭日セット
        for (let i = 1; i < csv.length; i++) {
            // 施行前なら登録しない
            if (csv[i][5] != 0 && csv[i][5] > y) {
                continue;
            }
            // 施行終了なら登録しない
            if (csv[i][6] != 0 && csv[i][6] < y) {
                continue;
            }

            if (csv[i][1] != 0) {
                // 固定祝祭日
                this.addSchedule(y, csv[i][0], csv[i][1], csv[i][4], null, "holiday");
            } else {
                // 移動祝祭日
                let d = new Date(y, csv[i][0] - 1, 1);    // 該当月1日取得
                d = 1 - d.getDay() + 1 * csv[i][3] + 7 * csv[i][2];
                // 第0or1 日曜日    -d.getDay()
                this.addSchedule(y, csv[i][0], d, csv[i][4], null, "holiday");
            }
        }
        // 自動計算　参考　https://enterprisezine.jp/iti/detail/865
        // 春分の日
        this.addSchedule(y, 3,
            Math.floor(20.8431 + 0.242194 * (y - 1980)) - Math.floor((y - 1980) / 4),
            "春分の日", null, "holiday");
        // 秋分の日
        this.addSchedule(y, 9,
            Math.floor(23.2488 + 0.242194 * (y - 1980)) - Math.floor((y - 1980) / 4),
            "秋分の日", null, "holiday");

        // 振替休日（1973施行）（未実装）
        for (let i = 0; i < this.schedule.length; i++) {
            if (this.schedule[i][0] != y) {
                continue;
            }
            let d = new Date(this.schedule[i][0], this.schedule[i][1], this.schedule[i][2]);
            if (d.getDay() == 0) {

            }
        }
        // 国民の休日（オセロ休日＝1988施行）（未実装）
    }

    // 予定追加
    addSchedule(y, m, d, html, divCl = null, tdCl = null) {
        this.schedule[this.schedule.length] = [y, m, d, html, divCl, tdCl];
    }


    setCaption(y, m) {
        // caption生成
        let cap = document.createElement("caption");
        let preY = document.createElement("span");
        preY.classList.add("zCal_control");
        preY.innerText = "[前年]";
        let preM = document.createElement("span");
        preM.classList.add("zCal_control");
        preM.innerText = "[前月]";
        let ym = document.createElement("span");
        ym.innerText = y + "-" + m;   // 以下のイベント処理に影響するのでtext format確認
        let proM = document.createElement("span");
        proM.classList.add("zCal_control");
        proM.innerText = "[次月]";
        let proY = document.createElement("span");
        proY.classList.add("zCal_control");
        proY.innerText = "[次年]";
        cap.appendChild(preY);
        cap.appendChild(preM);
        cap.appendChild(ym);
        cap.appendChild(proM);
        cap.appendChild(proY);

        // イベントハンドラ対応
        // 注）イベントハンドラ内のthisはクリック要素を指す
        let f = this.setCalendar;
        let tbody = this.tbody;
        preY.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            ymd[0] = Number(ymd[0]) - 1;
            ym.innerText = ymd[0] + "-" + ymd[1];
            f(ymd[0], ymd[1], tbody);
        });
        preM.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            if (ymd[1] == 1) {
                ymd[0] = Number(ymd[0]) - 1;
                ymd[1] = 12;
            } else {
                ymd[1] = Number(ymd[1]) - 1;
            }
            ym.innerText = ymd[0] + "-" + ymd[1];
            f(ymd[0], ymd[1], tbody);
        });
        proM.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            if (ymd[1] == 12) {
                ymd[0] = Number(ymd[0]) + 1;
                ymd[1] = 1;
            } else {
                ymd[1] = Number(ymd[1]) + 1;
            }
            ym.innerText = ymd[0] + "-" + ymd[1];
            f(ymd[0], ymd[1], tbody);
        });
        proY.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            ymd[0] = Number(ymd[0]) + 1;
            ym.innerText = ymd[0] + "-" + ymd[1];
            f(ymd[0], ymd[1], tbody);
        });
        this.tbl.appendChild(cap);
    }
    setThead() {
        // thead生成
        let thead = document.createElement("thead");

        // 曜日
        let tr = document.createElement("tr");
        let date = ["日", "月", "火", "水", "木", "金", "土"];
        //let date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        for (let i = 0; i < 7; i++) {
            let th = document.createElement("th");
            th.appendChild(
                document.createTextNode(date[i])
            );
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        this.tbl.appendChild(thead);
    }

    // イベントハンドラから呼ばれる可能性があるので「this」禁止
    setCalendar(y, m, tbody) {
        tbody.innerHTML = "";
        if (y == undefined) {
            y = today.getFullYear();
        }
        if (m == undefined) {
            m = today.getMonth() + 1;
        }
        // 月の初日の曜日を取得
        let blankCells = (new Date(y, m - 1, 1)).getDay();   // 日＝0,土=6
        // 日付
        let d = 1 - blankCells;
        while (true) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            for (let i = 0; i < 7; i++) {
                let td = document.createElement("td");
                if (d > 0) {
                    let day = document.createElement("div");
                    day.innerText = d;
                    td.appendChild(day);
                    td.classList.add("zCal_day");
                    // 当日処理
                    if (
                        (today.getFullYear() == y) &&
                        (today.getMonth() + 1 == m) &&
                        (today.getDate() == d)
                    ) {
                        td.classList.add("zCal_today");
                    }
                }
                tr.appendChild(td);

                // 予定があれば追加
                /*
                for (let s = 0; s < schedule.length; s++) {
                    if (
                        (schedule[s][0] == y) &&
                        (schedule[s][1] == m) &&
                        (schedule[s][2] == d)
                    ) {
                        let ele = document.createElement("div");
                        ele.innerHTML = schedule[s][3];
                        if (schedule[s][4] != null) {
                            ele.classList.add(schedule[s][4]);
                        }
                        if (schedule[s][5] != null) {
                            td.classList.add(schedule[s][5]);
                        }
                        td.appendChild(ele);
                    }
                }
                */

                d++;
                if (d > (new Date(y, m, 0)).getDate()) {
                    break;  //最終日到達でbreak
                }
            }
            if (d > (new Date(y, m, 0)).getDate()) {
                break;  //最終日到達でbreak
            }
        }
    }
    getTbody() {
        return this.tbody;
    }

}

export { zCalendar };