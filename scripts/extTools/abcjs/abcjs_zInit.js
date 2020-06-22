loadJScounter_loaded++;


function absjs_init() {
    var myScore = document.getElementsByClassName("score");
    ABCJS.midi.soundfontUrl = getParam["lv"] + "scripts/extTools/abcjs/";
    for (var i = 0; i < myScore.length; i++) {
        var myScript = myScore[i].innerHTML;
        myScore[i].innerHTML = "";

        var myScr = document.createElement("div");
        myScr.id = "score_" + i;
        myScore[i].appendChild(myScr);
        ABCJS.renderAbc("score_" + i, myScript);

        //midi関連処理
        if (myScore[i].classList.contains("abcPlay")) {
            var myMid = document.createElement("div");
            myMid.id = "midi_" + i;
            myScore[i].appendChild(myMid);
            ABCJS.renderMidi("midi_" + i, myScript, {}, { generateInline: true }, {});
        }
    }
}