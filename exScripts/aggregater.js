// Module Aggregater

// ex
import 'https://code.jquery.com/jquery-3.3.1.min.js'; //これでデータはとれるが…
import { getGicon } from "./ex/MaterialIcons/googleicon.js";    // func

// tools
import { zDate } from "./tool/date.js";    // class
import { zList, burgerMenu } from "./tool/list.js";    // class,class

// tools
import { zDebug } from "./tool/debug/debug.js";    // let


zDebug.addLog("Module Aggregater loaded!");

export { getGicon, zDate, zList, burgerMenu, zDebug };
