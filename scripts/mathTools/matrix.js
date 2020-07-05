loadJScounter_loaded++;


//行列の積（行列数free）
function productMatrix(A, B) {
    // 積が定義できない行列
    if (A[0].length != B.length) {
        return null;
    }
    let P = new Array(A.length);
    for (let i = 0; i < P.length; i++){
        P[i] = new Array(B[0].length);
        for (let j = 0; j < P[0].length; j++){
            P[i][j] = 0;
            for (let k = 0; k < A[0].length; k++){
                P[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return P;
}

// 行列式（2x2）
function determinant2x2(A) {
    return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

// 逆行列（2x2）
function inverseMatrix2x2(A) {
    let d = determinant2x2(A)
    return [
        [A[1][1] / d, -A[0][1] / d],
        [-A[1][0] / d, A[0][0] / d]
    ];
}

//連立2元1次方程式
function simultaneousEQsolver(a, b, c, d, p, q, id) {
    let A = [[a, b], [c, d]];
    let B = [[p], [q]];

    // 係数表示の調整
    a = (a == 1 ? "" : a);
    c = (c == 1 ? "" : c);

    let eq = "\\begin{cases}" +
        keisu(a,false) + "x &" + keisu(b,true) + "y &=" + p + "\\\\" +
        keisu(c,false) + "x &" + keisu(d,true) + "y &=" + q +
        "\\end{cases}";


    if (determinant2x2(A) == 0) {
        return [eq, [null, null]];
    } else {
        let ans = productMatrix(inverseMatrix2x2(A), B);
        return [eq,
            [ans[0][0], ans[1][0]]
        ];
    }
}
