//	====================================
//	===	MathJax マクロ設定 by Zacky	====
//	====================================

MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [['$', '$'], ["\\(", "\\)"]],
        displayMath: [['$$', '$$'], ["\\[", "\\]"]]
    },
    TeX: {
        Macros: {
            C: '{\\mathbb C}',
            R: '{\\mathbb R}',
            Q: '{\\mathbb Q}',
            Z: '{\\mathbb Z}',
            diag: '\\mathop{\\mathrm{diag}}\\nolimits',
            np: ['{#1}#2{#1}', 2]
        }
    }
});