alert("loaded - MathJaxMacro.js");

//	===	MathJax マクロ設定 ===
MathJax.Hub.Config({
    extensions: [	//拡張機能			個別読込($$～$$内記述)		説明		
        //	'AMScd.js'		//	\(\require{AMScd}\)  		//可換図式	
    ],
    tex2jax: {
        inlineMath: [['$', '$'], ["\\(", "\\)"]],
        displayMath: [['$$', '$$'], ["\\[", "\\]"]]
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