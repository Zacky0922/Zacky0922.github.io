// Module Aggregater

// ex
import 'https://code.jquery.com/jquery-3.3.1.min.js'; //これでデータはとれるが…
import { getGicon } from "./ex/MaterialIcons/googleicon.js";    // func

// tools
//ダメ
//import { zDate } from "./tool/date.js";    // class

//ダメ
//import { zList } from "./tool/list.js";    // class

// 処理の都合上、最後がいいかも？
import { zExportTest } from "./tool/test.js";    // let
//zExportTest();
import { zExportTest as zExportTest2 ,a} from "./test.js";    // let
//zExportTest2();
let aa = new a();

//だめ
//import { zDebug } from "./tool/debug/debug.js";    // let


export { getGicon,  zExportTest };

alert("I AM AGGRETAER! - 28");
