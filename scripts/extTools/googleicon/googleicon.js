loadJScounter_loaded++;


function getGicon(icon) {
    var ele = document.createElement("span");
    ele.classList.add("material-icons");
    ele.innerText = icon;
    return ele;
}