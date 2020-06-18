loadJScounter_loaded++;

function kgfesBG(){
    var css = "";
    for (var i = 0; i < Math.max(window.innerWidth, window.innerHeight)/5; i++){
        // %
        //var start = Math.ceil(Math.random() * 100)+1;
        //var d = Math.ceil(Math.random() * 1) + 1;
        // px
        var start = Math.ceil(Math.random() * Math.max(window.innerWidth, window.innerHeight)) + 1;
        var d = Math.ceil(Math.random() * 20) + 1;
        var c_ = [
            "255,63,63","63,255,63", "63,63,255",
            "255,255,191", "255,191,255", "191,255,255",
            "255,191,191", "191,255,191", "191,191,255"
        ];
        var c = "rgba(" +
            /*
            (Math.ceil(Math.random() * 64) + 191) + "," +
            (Math.ceil(Math.random() * 64) + 191) + "," +
            (Math.ceil(Math.random() * 64) + 191) + "," +
            
            (Math.random() > 0.7 ? "255": "191") + "," +
            (Math.random() > 0.7 ? "255": "191") + "," +
            (Math.random() > 0.7 ? "255": "191") + "," +
            */
            c_[Math.floor(Math.random() * c_.length)] + "," +
            "0.6)";
        if ((false)) {
            i--;
        } else {
            css += (i != 0 ? ",\n" : "") +
                "linear-gradient(" +
                Math.ceil(Math.random() * 360) + "deg," +
                // %
                //"transparent 0% " + start + "%," +
                //c + " " + start + "% " + (start + d) + "%," +
                //"transparent " + (start + d) + "% 100%)";
                // px
                "transparent 0px " + start + "px," +
                c + " " + start + "px " + (start + d) + "px,"+
                "transparent "+(start+d)+"px 2000px)";
        }
    }
    //document.getElementById("kgfes-bg").setAttribute("style","background:"+ css);
    document.body.setAttribute("style","background:"+ css);
}
