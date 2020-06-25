loadJScounter_loaded++;

//連立2元1次方程式
function simultaneousEQsolver(a,b,c,d,p,q,id) {
    var A = [[a, b], [c, d]];
    var B = [p, q];
    var eq = "\\begin{cases}" +
        a + "x &" + (b >= 0 ? "+" : "") + b + "y &=" + p + "\\\\" +
        c + "x &" + (d >= 0 ? "+" : "") + d + "y &=" + q +
        "\\end{cases}";
    var det = a * d - b * c;
    
    if (det == 0) {
        return [eq,[null,null]];
    } else {
        var ans = [
            (d * p + (-b) * q) / det,
            ((-c) * p + a * q) / det
        ];
        return [eq,ans];
    }
}