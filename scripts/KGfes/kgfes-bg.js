loadJScounter_loaded++;

function kgfesBG() {
    return;
    var css = "";
    var c_ = [
        "255,63,63", "63,255,63", "63,63,255",
        "255,191,191", "191,255,191", "191,191,255",
        "255,255,191", "255,191,255", "191,255,255"
    ];

    var i_max = Math.max(window.innerWidth, window.innerHeight);
    for (var i = Math.floor(Math.min(i_max, 400) / 5); i >= 0; i--) {
        // %
        //var start = Math.ceil(Math.random() * 100)+1;
        //var d = Math.ceil(Math.random() * 1) + 1;
        // px
        var start = Math.ceil(Math.random() * i_max) + 1;
        var d = Math.ceil(Math.random() * 20) + 1;
        var c = "rgba(" +
            /*
            (Math.ceil(Math.random() * 64) + 191) + "," +
            (Math.ceil(Math.random() * 64) + 191) + "," +
            (Math.ceil(Math.random() * 64) + 191) + "," +
            
            (Math.random() > 0.7 ? "255": "191") + "," +
            (Math.random() > 0.7 ? "255": "191") + "," +
            (Math.random() > 0.7 ? "255": "191") + "," +
            */
            c_[i % c_.length] + "," +
            "0.7)";
        if (true) {
            css += "linear-gradient(" +
                Math.ceil(Math.random() * 89) + "deg," +
                // %
                //"transparent 0% " + start + "%," +
                //c + " " + start + "% " + (start + d) + "%," +
                //"transparent " + (start + d) + "% 100%)";
                // px
                "transparent 0px " + start + "px," +
                c + " " + start + "px " + (start + d) + "px," +
                "transparent " + (start + d) + "px 20000px)" +
                (i != 0 ? ",\n" : "");
        } else {
            i--;
        }
    }
    //document.getElementById("kgfes-bg").setAttribute("style","background:"+ css);
    document.body.setAttribute("style", "background:" + css);
}
