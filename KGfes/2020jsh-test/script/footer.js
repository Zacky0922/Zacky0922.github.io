


function setFooter() {
    let ft = document.createElement("section");
    ft.id = "footer";
    ft.setAttribute("style", "grid-area:footer");
    ft.innerHTML = "<div id='ft_gototop'><a href='#'>▲GoToTop</a></div>" +
        "<div id='ft_banners'>" +
        // クラス動画コンテスト
        "<a href='" + zParam.get("root")+"classmovie.html' target='_self'>" +
        "<img src='" + zParam.get("root") + "pict/ft/classmovie.png" + "'>" +
        "</a>" +
        // ARコンテンツバナー
        "<a href='" + zParam.get("root") + "gallery.html#ar_gallery' target='_self'>" +
        "<img src='" + zParam.get("root") + "pict/ft/ar_banner.png" + "'>" +
        "</a>" +
        //"ARコンテンツ<br/>（準備中）"+
        // 0912個別相談
        "<a href='https://jsh.kgef.ac.jp/news/14865/' target='_blank'>" +
        "<img src='" + zParam.get("root") + "pict/ft/0912soudan.png" + "'>" +
        "</a>" +
        "</div>" +
        // caption
        "<div id='ft_kg'>" +
        "第23回 五峯祭 (2020.09.12 Sat.)<br/>" +
        "<a href='https://jsh.kgef.ac.jp/' target='_blank'>Kokusai Gakuin Junior & Senior High School</a>" +
        "</div>";
    document.body.appendChild(ft);

    // 先頭に戻る際の
    var gototop = $('#ft_gototop');
    gototop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
}


window.addEventListener('load', (event) => {
    setFooter();
});