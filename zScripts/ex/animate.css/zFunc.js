
/*  myObjをクリックしたとき
    targetObjのアニメーションを切替　anime0/anime1
    anime1が未指定の場合、「anime0/アニメ無し」を切替
*/
class animateCSS {

    constructor(myObj, targetObj = myObj_, anime0, anime1 = null) {
        
        targetObj.classList.add("animate__animated");
        targetObj.classList.add(anime0);

        myObj.addEventListener("click", function () {
            targetObj.classList.toggle(anime0);
            if (anime1 != null) {
                targetObj.classList.toggle(anime1);
            }
        });
    }
}