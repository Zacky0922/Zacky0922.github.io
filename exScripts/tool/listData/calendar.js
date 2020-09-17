// 非export変数
let today = new Date();     // 本日
// 予定登録
// 複数のカレンダーを同一ページに表示する可能性を考えて次の連想配列を適用
// array[this.id][i] = [y/0,m/0,d,week/0,date,html,divCl,tdCl,start Date(),end Date()]
// y,m,w=0 毎年・毎月・毎週 繰り返し
let schedule = new Array();

class zCalendar {
    constructor(id) {
        this.id = id;
        this.wrap = document.getElementById(id);
        // 予定一覧init
        schedule[this.id] = new Array();

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
    setHolidays(csv, y = (new Date()).getFullYear()) {

        // 祝祭日セット
        for (let i = 1; i < csv.length; i++) {

            this.addSchedule(
                0, csv[i][0], csv[i][1],
                csv[i][2], csv[i][3],
                csv[i][4], null, "holiday",
                (csv[i][5] == 0 ? "" : new Date(csv[i][5], 0, 1)),
                (csv[i][6] == 0 ? "" : new Date(csv[i][6], 0, 1))
            );
            continue;

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
        console.table(schedule[this.id]);
        return;



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
    addSchedule(y, m, d, week, date, html, divCl = 0, tdCl = 0, from = 0, to = 0) {
        // array[this.id][i] = [y/0, m/0, d, week/0, date, html, divCl, tdCl]
        schedule[this.id][schedule[this.id].length] = [y, m, d, week, date, html, divCl, tdCl, from, to];
        //console.log(schedule[this.id]);
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
        let now = document.createElement("span");
        now.classList.add("zCal_control");
        now.innerText = "[今月]";
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
        cap.appendChild(now);
        cap.appendChild(ym);
        cap.appendChild(proM);
        cap.appendChild(proY);

        // イベントハンドラ対応
        // 注）イベントハンドラ内のthisはクリック要素を指す
        let f = this.setCalendar;
        let id = this.id;
        let tbody = this.tbody;
        preY.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            ymd[0] = Number(ymd[0]) - 1;
            ym.innerText = ymd[0] + "-" + ymd[1];
            f(ymd[0], ymd[1], tbody, id);
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
            f(ymd[0], ymd[1], tbody, id);
        });
        now.addEventListener("click", function () {
            let ymd = [today.getFullYear(), today.getMonth() + 1];
            ym.innerText = ymd[0] + "-" + ymd[1];
            f(ymd[0], ymd[1], tbody, id);
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
            f(ymd[0], ymd[1], tbody, id);
        });
        proY.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            ymd[0] = Number(ymd[0]) + 1;
            ym.innerText = ymd[0] + "-" + ymd[1];
            f(ymd[0], ymd[1], tbody, id);
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

    // イベントハンドラから呼ばれる可能性があるので「this」禁止（＝対策としてtbodyを引数で利用）
    setCalendar(y = today.getFullYear(), m = today.getMonth() + 1, tbody, id = tbody.parentNode.parentNode.id) {
        // 念のため整形
        y = Number(y);
        m = Number(m);

        // init
        tbody.innerHTML = "";

        // 月の初日の曜日を取得
        let blankCells = (new Date(y, m - 1, 1)).getDay();   // 日＝0,土=6
        // 日付
        let d = 1 - blankCells;
        let endDay = (new Date(y, m, 0)).getDate(); // 月末の日（28～31）

        // 自動計算　参考　https://enterprisezine.jp/iti/detail/865
        let equinox;
        switch (m) {
            case 3:
                // 春分の日
                equinox = Math.floor(20.8431 + 0.242194 * (y - 1980)) - Math.floor((y - 1980) / 4);
                break;
            case 9:
                // 秋分の日
                equinox = Math.floor(23.2488 + 0.242194 * (y - 1980)) - Math.floor((y - 1980) / 4);
                break;
            default:
                equinox = 0;
        }

        while (d <= endDay) {
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

                    // 予定があれば追加
                    // 春分・秋分
                    if ((m == 3 || m == 9) && equinox == d) {
                        let ele = document.createElement("div");
                        ele.innerHTML = (m == 3 ? "春分の日" : "秋分の日");
                        td.classList.add("holiday");
                        td.appendChild(ele);
                    }
                    for (let s = 0; s < schedule[id].length; s++) {
                        // 対象年度判定
                        if (schedule[id][s][8] != 0) {
                            if (y < schedule[id][s][8].getFullYear()) {
                                continue;
                            }
                        }
                        if (schedule[id][s][9] != 0) {
                            if (y > schedule[id][s][9].getFullYear()) {
                                continue;
                            }
                        }
                        // 対称月判定
                        if (schedule[id][s][1] != 0) {
                            if (schedule[id][s][1] != m) {
                                continue;
                            }
                        }
                        // 予定枠作成（条件に合えば要素追加）
                        let flag = false;

                        // 固定日登録（毎年・固定年）
                        if (
                            (schedule[id][s][1] == m) &&
                            (schedule[id][s][2] == d)
                        ) {
                            if (
                                (schedule[id][s][0] == 0) ||
                                (schedule[id][s][0] == y)
                            ) {
                                flag = true;
                            }
                        }
                        // 第n週○曜日登録
                        else if (schedule[id][s][2] == 0) {
                            if (
                                (7 * (schedule[id][s][3] - 1) < d) &&
                                (d <= 7 * schedule[id][s][3]) &&
                                ((new Date(y, m-1, d)).getDay() == schedule[id][s][4])
                            ) {
                                flag = true;
                            }
                        }
                        // 予定代入
                        if (flag) {
                            let ele = document.createElement("div");
                            ele.innerHTML = schedule[id][s][5];
                            if (schedule[id][s][4] != 0) {
                                ele.classList.add(schedule[id][s][6]);
                            }
                            if (schedule[id][s][5] != 0) {
                                td.classList.add(schedule[id][s][7]);
                            }
                            td.appendChild(ele);
                        }
                    }
                }
                tr.appendChild(td);
                if (++d > endDay) {
                    break;  //最終日到達でbreak
                }
            }
        }
    }
    getTbody() {
        return this.tbody;
    }

}

export { zCalendar };