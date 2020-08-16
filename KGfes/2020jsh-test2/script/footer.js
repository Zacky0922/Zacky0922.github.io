


function setFooter() {
    let ft = document.createElement("section");
    ft.id = "footer";
    ft.setAttribute("style", "grid-area:footer");
    ft.innerHTML = "(C) <a href='https://jsh.kgef.ac.jp/' target='_blank'>Kokusai Gakuin Junior & Senior High School</a> 2020";
    document.getElementById("gridWrapper").appendChild(ft);
}


window.addEventListener('load', (event) => {
    setFooter();
});