class zCalendar {
    constructor(id, ymd = new Date()) {
        // 第2引数＝初期表示年月
        this.id = id;   // table要素の親要素id
        this.y = ymd.getFullYear();
        this.m = ymd.getMonth()+1;  //Math.ceil(Math.random() * 12);
        this.setHolidayYear = new Array();
        // 予定表初期設定
        this.schedule = new Array();
        this.today = new Date();
        //this.schedule[0] = [this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate(), "Today!"];

        // table初期化
        this.initTbl();
        // table設定関連（calendar.css）
        this.tbl.classList.add("zCalendar");

        // 日付変更監視　thisの処理が難しい・・・debug
        /*
        let date = this.cap.children[1];
        let cap_old = date.innerText;
        let setCal = this.setCalendar;
        setInterval(function () {
            if (cap_old != date.innerText) {
                let ymd = date.innerText.split("-");
                setCal(Number(ymd[0]), Number(ymd[1]));
            }
        }, 100);
        */
    }
    // 祝祭日設定
    setHolidays(csv, y = this.y) {
        // 重複セット防止
        if (this.setHolidayYear.includes(y)) {
            return;
        } else {
            this.setHolidayYear.push(y);
        }

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
    // 初期化
    initTbl() {
        // table生成・代入
        this.tbl = document.createElement("table");
        document.getElementById(this.id).appendChild(this.tbl);

        // caption生成
        this.tbl.appendChild(this.setCaption());
        // thead生成
        this.tbl.appendChild(this.setThead());

        // tbody生成（空箱）
        this.tbody = document.createElement("tbody");
        this.tbl.appendChild(this.tbody);
    }
    setCaption() {
        // caption生成
        this.cap = document.createElement("caption");
        let pre = document.createElement("span");
        pre.innerText = "[前]";
        let ym = document.createElement("span");
        ym.innerText = this.y + "-" + this.m;   // 以下のイベント処理に影響するのでtext format確認
        let pro = document.createElement("span");
        pro.innerText = "[後]";
        this.cap.appendChild(pre);
        this.cap.appendChild(ym);
        this.cap.appendChild(pro);

        // 注）以下、イベントハンドラ内のthisはクリック要素を指す
        pre.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            if (ymd[1] == 1) {
                ymd[0] = Number(ymd[0]) - 1;
                ymd[1] = 12;
            } else {
                ymd[1] = Number(ymd[1]) - 1;
            }
            ym.innerText = ymd[0] + "-" + ymd[1];
            //zCalendar.changeDate(this.y, this.m);
        });
        pro.addEventListener("click", function () {
            let ymd = ym.innerText.split("-");
            if (ymd[1] == 12) {
                ymd[0] = Number(ymd[0]) + 1;
                ymd[1] = 1;
            } else {
                ymd[1] = Number(ymd[1]) + 1;
            }
            ym.innerText = ymd[0] + "-" + ymd[1];
        });

        return this.cap;
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
        return thead;
    }

    changeDate(y, m) {
        this.y = y;
        this.m = m;
        this.setCalendar();
    }
    setCalendar(y = this.y, m = this.m) {
        this.y = y;
        this.m = m;

        // 月の初日の曜日を取得
        let blankCells = (new Date(this.y, this.m - 1, 1)).getDay();   // 日＝0,土=6
        // 日付
        let d = 1 - blankCells;
        while (true) {
            let tr = document.createElement("tr");
            this.tbody.appendChild(tr);
            for (let i = 0; i < 7; i++) {
                let td = document.createElement("td");
                if (d > 0) {
                    let day = document.createElement("div");
                    day.innerText = d;
                    td.appendChild(day);
                    td.classList.add("zCal_day");
                    // 当日処理
                    if (
                        (this.today.getFullYear() == this.y) &&
                        (this.today.getMonth() + 1 == this.m) &&
                        (this.today.getDate() == d)
                    ) {
                        td.classList.add("zCal_today");
                    }
                }
                tr.appendChild(td);

                // 予定があれば追加
                for (let s = 0; s < this.schedule.length; s++) {
                    if (
                        (this.schedule[s][0] == this.y) &&
                        (this.schedule[s][1] == this.m) &&
                        (this.schedule[s][2] == d)
                    ) {
                        let ele = document.createElement("div");
                        ele.innerHTML = this.schedule[s][3];
                        if (this.schedule[s][4] != null) {
                            ele.classList.add(this.schedule[s][4]);
                        }
                        if (this.schedule[s][5] != null) {
                            td.classList.add(this.schedule[s][5]);
                        }
                        td.appendChild(ele);
                    }
                }

                d++;
                if (d > (new Date(this.y, this.m, 0)).getDate()) {
                    break;  //最終日到達でbreak
                }
            }
            if (d > (new Date(this.y, this.m, 0)).getDate()) {
                break;  //最終日到達でbreak
            }
        }
    }

}

export { zCalendar };