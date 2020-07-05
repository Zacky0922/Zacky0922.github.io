loadJScounter_loaded++;


function getGicon(icon) {
    let ele = document.createElement("span");
    ele.classList.add("material-icons");
    ele.innerText = icon;
    return ele;
}