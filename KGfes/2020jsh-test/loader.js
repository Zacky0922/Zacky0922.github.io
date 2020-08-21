(function () {

	let script = document.createElement("script");
	script.type = "text/javascript";
	let basicUrl;

	if (location.href.indexOf("fes.kgef.ac.jp/2020jsh-test/") > -1) {
		basicUrl = "https://fes.kgef.ac.jp/2020jsh-test/";
	} else if (location.href.indexOf("192.168.1.171") > -1) {
		basicUrl = "http://192.168.1.171/test/";
	} else if (location.href.indexOf("192.168.1.171") > -1) {
		basicUrl = "http://192.168.1.171/test/";
	} else {
		basicUrl = "../../";
	}
	script.src = basicUrl + "zScripts/master.js?mode=kgfes";
	document.write(script.outerHTML);
	

	var manualQuery = new Array();
	manualQuery["mode"] = "kgfes_debug";
	manualQuery["root"] = basicUrl;
	manualQuery["zScriptsDir"] = basicUrl + "zScripts/";
})();