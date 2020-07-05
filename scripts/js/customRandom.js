loadJScounter_loaded++;

// 任意の分布関数で値を返すRandom：未調整

//正規分布
function cRand_Norm(max = 1, min = 0) {
    let r = Math.exp(
        -1*Math.pow(Math.random(), 2)/2
    ) / Math.sqrt(
        2 * Math.PI
    );
    return r * (max - min) + min;
}

