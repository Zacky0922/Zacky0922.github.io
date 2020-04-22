debugMsg("loaded - MathJaxMacro2.js");

window.MathJax = {
    tex2jax: {
        inlineMath: [['$', '$'], ["\\(", "\\)"]],
        displayMath: [['$$', '$$'], ["\\[", "\\]"]]
    },
    TeX: {
        Macros: {
            x: "{\\times}",
            bm: ["{\\boldsymbol{#1}}", 1],
            dd: ["{\\frac{\\partial #1}{\\partial #2}}", 2]
        }
    }
};