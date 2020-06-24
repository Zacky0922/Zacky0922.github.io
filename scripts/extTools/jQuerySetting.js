loadJScounter_loaded++;



//スムーズスクロール部分の記述
function setAhrefSmoothLink(){
    // #で始まるアンカーをクリックした場合に処理
    //$('a[href^="#"]').click(function () {
    $("a[href^='#']").click(function () {
        // スクロールの速度
        var speed = 400; // ミリ秒
        // アンカーの値取得
        var href = $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を調整：上部メニュー等の位置余白調整可
        var position = target.offset().top + 0;
        // スムーススクロール
        $('body,html').animate({ scrollTop: position }, speed, 'swing');

        return false;
    });
}
