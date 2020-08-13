function absjs_init(soundFontDir) {
    let myScore = document.getElementsByClassName("score");
    ABCJS.midi.soundfontUrl = soundFontDir;
    for (let i = 0; i < myScore.length; i++) {
        let myScript = myScore[i].innerHTML;
        myScore[i].innerHTML = "";

        let myScr = document.createElement("div");
        myScr.id = "abcScoreWrap_" + i;
        myScr.classList.add("abcScoreWrap");
        myScore[i].appendChild(myScr);
        ABCJS.renderAbc("abcScoreWrap_" + i, myScript);

        //midi関連処理
        if (myScore[i].classList.contains("abcMidi")) {
            let myMid = document.createElement("div");
            myMid.id = "midi_" + i;
            myScore[i].appendChild(myMid);
            ABCJS.renderMidi("midi_" + i, myScript, {}, { generateInline: true }, {});
        }
    }
}