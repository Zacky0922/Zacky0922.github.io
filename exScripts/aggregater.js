// Module Aggregater

/*  MathJaxは公式でES module対応中？
    現状は、通常の読込が必要。
    aggregaterより先に以下を記述
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>

    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML", //old
    "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",                        //new

*/

// ex
//import 'https://code.jquery.com/jquery-3.3.1.min.js';
import "./ex/jQuery/jquery-3.5.1.min.js";
import "./ex/jQuery/jquery-ui.min.js";
export { zTab } from "./ex/jQuery/jquery_Zacky.js";
export { getGicon } from "./ex/MaterialIcons/googleicon.js";    // func


// tools
export { zCalendar } from "./tool/listData/calendar.js";   // class
export { zCSV,zCSVs } from "./tool/listData/csv.js";   // class
export { zDate } from "./tool/date.js";    // class
export { zList, burgerMenu } from "./tool/list.js";    // class,class
//MathJaxがES module対応するまで、マクロはimport扱いしない（通常のロードをさせる）
//import { zMathJax } from "./tool/math/MathJaxMacro.js";
export { zMath } from "./tool/math/zMath.js";

// これは最後に読み込む
import { zDebug } from "./tool/debug/debug.js";    // let
export { zDebug };
zDebug.addLog("Module Aggregater loaded!");