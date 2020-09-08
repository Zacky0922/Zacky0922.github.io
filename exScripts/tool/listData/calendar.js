class zCalendar {
    constructor(id, y, m) {
        this.id = id;   // table要素の親要素id
        this.y = y;
        this.m = m;
        // 予定表初期設定
        let today = new Date();
        this.schedule = new Array();
        this.schedule[0] = [
            [today.getFullYear(),today.getMonth()+1,today.getDate()],
            "<div>Today!</div>"
        ];

        // table初期化
        this.initTbl();
        // 初期表示
        this.setCalendar();
    }

    // 初期化
    initTbl() {
        // table生成・代入
        this.tbl = document.createElement("table");
        document.getElementById(this.id).appendChild(this.tbl);

        // caption生成
        this.cap = document.createElement("caption");
        let ele0 = document.createElement("span");
        ele0.innerText = "[前]";
        let ele1 = document.createElement("span");
        ele1.innerText = "[後]";


        this.cap.appendChild(ele0);
        this.cap.appendChild(
            document.createTextNode(this.y + "-" + this.m)
        );
        this.cap.appendChild(ele1);
        this.tbl.appendChild(this.cap);

        ele0.addEventListener("click", function () {
            if (this.m - 1 == 0) {
                this.changeDate(this.y - 1, 12);
            } else {
                this.changeDate(this.y, this.m - 1);
            }
        });
        ele1.addEventListener("click", function () {
            if (this.m + 1 == 13) {
                this.changeDate(this.y + 1, 1);
            } else {
                this.changeDate(this.y, this.m + 1);
            }
        });

        // thead生成
        let thead = document.createElement("thead");

        // 曜日
        let tr = document.createElement("tr");
        let date = ["日", "月", "火", "水", "木", "金", "土"];
        for (let i = 0; i < 7; i++) {
            let th = document.createElement("th");
            th.appendChild(
                document.createTextNode(date[i])
            );
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        this.tbl.appendChild(thead);

        // tbody生成
        this.tbody = document.createElement("tbody");
        this.tbl.appendChild(this.tbody);
    }

    changeDate(y, m) {
        this.y = y;
        this.m = m;
        this.setCalendar();
    }
    setCalendar() {
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
                }
                tr.appendChild(td);

                // 予定があれば追加 debug中
                for (let s = 0; s < this.schedule.length; s++) {
                    //alert(this.schedule[s]);
                    if (this.schedule[s][0] == [this.y, this.m, d]) {
                        let td0 = document.createElement("td");
                        td0.innerHTML = this.schedule[s][1];
                        tr.appendChild(td0);
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
    addSchedule(y, m, d, html) {
        this.schedule[this.schedule.length] = [[y, m, d],html];
    }

}

export { zCalendar };