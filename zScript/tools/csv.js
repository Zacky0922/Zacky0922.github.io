// 古いのからコピペしただけ、未調整

class zCSV {
    constructor(src, callbackFunc) {
        // データ格納変数
        this.data = new Array();
        let csv = this.data;
        // CSV取得用HTTPリクエスト
        let xhr = new XMLHttpRequest();
        //xhr.withCredentials = true;     // CORS対応
        xhr.open("GET", src, true);    // 第3引数false＝同期処理（読込完了までwait）
        xhr.send(null);
        xhr.onload = function () {
            // ロード完了で配列化処理
            let tmp = xhr.responseText.split("\n");
            for (let i = 0; i < tmp.length; i++) {
                csv[i] = tmp[i].split(",");
            }
            // コンソールに配列を出力
            console.groupCollapsed("CSV data gotten by zCSV\nfrom " + src);
            console.table(csv);
            console.groupEnd();
            // 配列を含むコールバック関数
            callbackFunc(csv);
        }
    }

    get() {
        return this.data;
    }
    getTable(th_flag = true) {
        let tbl = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        tbl.appendChild(thead);
        tbl.appendChild(tbody);
        for (let i = 0; i < this.data.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < this.data[i].length; j++) {
                let td = (i == 0 || (th_flag && j == 0) ?
                    document.createElement("th") :
                    document.createElement("td")
                );
                td.innerText = this.data[i][j].trim();  // trim＝文字列前後の空白除去（data本体は変更されない）
                tr.appendChild(td);
            }
            if (i == 0) {
                thead.appendChild(tr);
            } else {
                tbody.appendChild(tr);
            }
        }
        return tbl;
    }
}

class zCSVs {
    constructor(csvs, callbackFunc) {
        //  連想配列形式でCSV名称：URLを指定
        //  csvs = {name: csv_url, name1: csv_url1}

        let loaded = 0;
        let csv = new Array();
        for (let name in csvs) {
            // 連想配列定義
            csv[name] = new Array();
            // CSV取得用HTTPリクエスト
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;     // CORS対応
            xhr.open("GET", csvs[name], true);    // 第3引数false＝同期処理（読込完了までwait）
            xhr.send(null);
            xhr.onload = function () {
                // ロード完了で配列化処理
                let tmp = xhr.responseText.split("\n");
                for (let i = 0; i < tmp.length; i++) {
                    csv[name][i] = tmp[i].split(",");
                }
                // コンソールに配列を出力
                console.groupCollapsed("CSV data gotten by zCSVs\nfrom " + csvs[name]);
                console.table(csv[name]);
                console.groupEnd();
                // 配列を含むコールバック関数
                if (Object.keys(csvs).length == ++loaded) {
                    callbackFunc(csv);
                }
            }
        }

    }
}

export { zCSV, zCSVs };