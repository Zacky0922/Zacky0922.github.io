
//	===	MathJax マクロ設定 ===
//window.MathJax = {
MathJax.Hub.Config({
    extensions: [	//拡張機能			個別読込($$～$$内記述)		説明		
        //	'AMScd.js'		//	\(\require{AMScd}\)  		//可換図式	
    ],
    tex2jax: {
        inlineMath: [
            ['$', '$'],
            ["\\(", "\\)"],
            ["`", "`"]      //draw.ioプレビュー用
        ],
        displayMath: [
            ['$$', '$$'],
            ["\\[", "\\]"]
        ],
        processEscapes: true    //欄外で$を使用可にする
    },
    TeX: {
        Macros: {
            //\displaystyle簡略表記
            d: '\\displaystyle ',

            //定義⇔{def}
            def: '{\\overset{def}{\\iff}}',

            //\color簡略表記
            black: ['\\color{black}{ #1 }', 1],
            red: ['\\color{red}{ #1 }', 1],
            blue: ['\\color{blue}{ #1 }', 1],
            green: ['\\color{green}{ #1 }', 1],

            //such that記号
            st: '{\\quad\\text{s.t.}\\quad}',

            //増分記号
            diff: '{\\mathit{\\Delta}}',
            //微分記号
            dydx: '{\\dfrac{dy}{dx}}',
            ddx: '{\\dfrac{d}{dx}}',
            ddt: '{\\dfrac{d}{dt}}',
            dd: ['{\\dfrac{d}{d #1}}', 1],
            //増減凹凸表の矢印

            //ベクトル記号
            vec: ['{\\overrightarrow{ \\mathstrut \\it{#1} } }', 1],
            //大文字立体ベクトル記号
            Vec: ['{\\overrightarrow{ \\mathstrut \\rm{#1}}}', 1],

            //行列
            tr: '{ \\rm tr }',

            //BlackBoardBold
            bbb: ['{ {\\mathbb \\it #1 } }', 1],

            //列ベクトル成分表記
            cvec: ['{ \\left\( \\mathstrut \\begin\{array\} \{c\} {#1} \\\\ {#2} \\\\ \\end\{array\} \\right\) }', 2],
            ccvec: ['{ \\left\( \\mathstrut \\begin\{array\} \{c\} {#1} \\\\ {#2} \\\\ {#3} \\\\ \\end\{array\} \\right\) }', 3],
            //ccvec：cubic col vector

            //ノルム・絶対値
            norm: ['{\\left| \\mathstrut #1 \\right|}', 1],

            //区切り縦棒(群数列など)：section barの略語のつもり
            secBar: '{\\ \\LARGE{|} \\ }',

            //平行記号
            parallel: '\\verb+\/+\\verb+\/+',	//∥∦

            //かっこ
            bracket: ['\\left\( \\mathstrut #1 \\right\)', 1],
            Bracket: ['\\left\\{ \\mathstrut #1 \\right\\}', 1],
            BRACKET: ['\\left\[ \\mathstrut #1 \\right\]', 1],
            abs: ['\\left\| \\mathstrut #1 \\right\|', 1],
            //場合の数
            permutation: ['_{#1} {\\rm P}_{#2}', 2],
            combination: ['_{#1} {\\rm C}_{#2}', 2],

            /* trial macro */

        }
    }
});
//};

//読込完了をここで宣言するのが約束らしい
//MathJax.Ajax.loadComplete("https://zacky0922.github.io/scripts/extTools/MathJaxMacro.js");




class zMathJax{
    


    static reMathJax(id = null) {
        if (id == null) {
            //全体を再描画
            
        } else {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
            // MathJax.Hub.Queue(['Typeset', MathJax.Hub, id], [func]);
            // func＝終了後に実行したいメソッド名
        }
    }

    // MathJaxテンプレート集
    static templete(keyword) {
        switch (keyword) {
            case "オイラーの公式":
                return "e^{i\\theta}=\\cos\\theta+i\\sin\\theta";
            case "三平方の定理":
            case "ピタゴラス定理":
                return "a^2+b^2=c^2";
            default:
                return "Error - No Keyword.";
        }
    }
}

