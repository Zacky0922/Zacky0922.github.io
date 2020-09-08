class zCSV {
    constructor(src) {
        // データ格納変数
        this.data = new Array();

        // CSV取得用HTTPリクエスト
        let xhr = new XMLHttpRequest();
        xhr.open("GET", src, false);    // 第3引数false＝同期処理（読込完了までwait）
        xhr.send(null);

        // ロード完了で配列化処理
        let tmp = xhr.responseText.split("\n");
        for (let i = 0; i < tmp.length; i++) {
            this.data[i] = tmp[i].split(",");
        }

        // 本当は非同期で読込んでいる間に他のjsが実行したいが、
        // 読込より早くget()メソッドが実行されると困る（データがない）
        /*
        xhr.onload = function () {
            let tmp = xhr.responseText.split("\n");
            alert(tmp);
            for (let i = 0; i < tmp.length; ++i) {
                this.data[i] =tmp[i].split(",");
            }
        }
        */
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
        for (let i = 0; i < this.data.length; i++){
            let tr = document.createElement("tr");
            for (let j = 0; j < this.data[i].length; j++){
                let td = (i == 0 || (th_flag && j == 0 ) ?
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

export { zCSV };