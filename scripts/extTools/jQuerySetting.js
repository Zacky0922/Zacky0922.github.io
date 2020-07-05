loadJScounter_loaded++;



//スムーズスクロール部分の記述
function setAhrefSmoothLink(){
    // #で始まるアンカーをクリックした場合に処理
    //$('a[href^="#"]').click(function () {
    $("a[href^='#']").click(function () {
        // スクロールの速度
        let speed = 400; // ミリ秒
        // アンカーの値取得
        let href = $(this).attr("href");
        // 移動先を取得
        let target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を調整：上部メニュー等の位置余白調整可
        let position = target.offset().top - 20;
        // スムーススクロール
        $('body,html').animate({ scrollTop: position }, speed, 'swing');

        return false;
    });
}
