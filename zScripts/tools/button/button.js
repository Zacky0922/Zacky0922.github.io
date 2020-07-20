class zButton {
    #btn;

    fix(cl = "zBtn") {
        this.#btn = document.getElementsByClassName(cl);
        for (let i = 0; i < this.#btn.length; i++) {
            let span = document.createElement("span");
            span.innerHTML = this.#btn[i].innerHTML;
            this.#btn[i].innerHTML = span.outerHTML;
        }
    }

}


window.addEventListener('load', (event) => {
    let zBtn = new zButton();
    zBtn.fix("zBtn"); //flex対応で不要に
});