loadJScounter_loaded++;

//丸め誤差fix
function fixRoundingError(val) {
    var precision = 5; //小数点以下の有効桁数（ここで微調整して、認識制度を良い感じにする）
    return Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision);
}

//素数列（解析範囲2～max）
function getPrime(max = 1023) {
    if (max >= 100000) {
        if (!window.confirm("大きな値は、処理に時間がかかります。\n" +
            "フリーズするかも知れません。\n" +
            "本当に実行しますか？\n\n" +
            "OK = そのままの値で実行する\n" +
            "キャンセル = 素数判定を2～100000のみで行なう（値が不正確／バグる場合があります）")) {
            max = 100000;
        }
    }
    var p = [2, 3, 5];
    for (var a = 7; a <= max; a++){
        var flag = true;
        for (var i = 0; i < p.length; i++){
            if (a % p[i] == 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            p.push(a);
        }
    }
    return p;
}


//素因数分解（出力モード：数式表示true／指数列false）
function primeFactorization(val, mode = true) {
    if ((!Number.isInteger(val)) || (val <= 0)||(val==1)) {
        return null;
    }
    var p_ = getPrime(val); //素因数分解の分析対象素数の配列
    var p = new Array();
    var exp = new Array();
    for (var i = 0; i < p_.length; i++){
        p[i] = p_[i];
        exp[i] = 0;
        while (true) {
            //debugMsg(val + "%" + p[i] + "=" + val % p[i]);
            if (val % p[i] == 0) {
                val = Math.round(val / p[i]);
                exp[i]++;
            } else {
                break;
            }
        }
    }
    if (mode) {
        var formula = "";
        var flag = false;
        for (var i = 0; i < p.length; i++) {
            if (exp[i] != 0) {
                formula = formula + (flag ? "\\times" : "") + "{" + p[i] + "}^{" + exp[i] + "}";
                flag = true;
            }
        }
        return formula;
    } else {
        return [p, exp];
    }
}

//共通因数取得
function getCommonFactor(a, b) {
    if (
        (!Number.isInteger(a)) || (!Number.isInteger(b)) ||
        (a * b == 0) || ((a - 1) * (b - 1) == 0)
    ) {
        return 1;
    } else if (a == b) {
        return a;
    }

    a = Math.abs(a);
    b = Math.abs(b);
    var a_ = primeFactorization(a, false);
    var b_ = primeFactorization(b, false);
    var cf = 1;
    for (var i = 0; i < Math.min(a_[0].length, b_[0].length); i++){
        if (a_[1][i] > 0 && b_[1][i] > 0) {
            cf *= Math.pow(a_[0][i], Math.min(a_[1][i], b_[1][i]));
        }
    }
    return cf;
}

//互いに素、既約分数チェック・・・共通因数の機能でいけるのでは…
function isPrime(a, b) {
    if (getCommonFactor(a, b) == 1) {
        return true;
    } else {
        return false;
    }
    if (
        (!Number.isInteger(a)) ||
        (!Number.isInteger(b)) ||
        (a * b == 0) || ((a - 1)*(b - 1) == 0) ||
        (a == b)
    ) {
        debugMsg("整数でない or 0・1を含む or 同じ値");
        return false;
    }
    var a_ = primeFactorization(a,false);
    var b_ = primeFactorization(b,false);
    if (a_ == null || b_ == null) {
        return false;
    }
    var min = Math.min(a, b);
    debugMsg("互いに素判定："+a + "と" + b,1);
    for (var i = 0; i < a_[0].length; i++){
        debugMsg(a_[0][i] + "^" + a_[1][i] + " と " + b_[0][i] + "^"+b_[1][i]);
        if (a_[1][i] > 0 && b_[1][i] > 0) {
            debugMsg("false", -1);
            return false;
        } else if (a_[0][i] >= min) {
            debugMsg("true", -1);
            return true;
        }
    }
    debugMsg("true", -1);
    return true;
}

//係数処理
//値、符号処理（＋表示：有true／無false）
function keisu(val, sign = true) {
    return (val >= 0 ? (sign ? "+" : "") : "-")
        + (val == 1 || val == -1 ? "" : Math.abs(val));
}

// 小数値の規約分数化（誤差含む可能性あり…）
// 分数化できなければ、そのまま返す。
function estimateFrac(val) {
    if (Number.isInteger(val)) {
        return val;
    }
    var sign = "";
    if (val < 0) {
        sign = "-";
        val = -val;
    }
    // 1桁／1桁 のみ判定
    for (var bunbo = 2; bunbo < 10; bunbo++){
        for (var bunsi = 1; bunsi < 10; bunsi++){
            if (fixRoundingError(val) ==  fixRoundingError(bunsi / bunbo) ) {
                if (bunsi == 1) {
                    return sign + "\\dfrac{" + bunsi + "}{" + bunbo + "}";
                }else if (isPrime(bunsi, bunbo)) {
                    return sign + "\\dfrac{" + bunsi + "}{" + bunbo + "}";
                } 
            }
        }
    }
    return Number(sign + val);
}

