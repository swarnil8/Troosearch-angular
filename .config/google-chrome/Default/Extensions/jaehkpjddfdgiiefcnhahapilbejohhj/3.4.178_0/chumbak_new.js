$ = jQuery.noConflict();
var alertPosition = 902;
current_pid = "";
current_url = "";
function checkURL(){
	var url = window.location.href;
	var now_pid = getPID();
	if(current_url != url){
		var url = window.location.href;
		current_url = url;
		// console.log("called initiateNewUI");
		$(".hk-yellow-bar-main-div").css("display", "none");
		$(".hk-main-graph").css("display", "none");
		$(".hk-main-watch").css("display", "none");
		$(".hk-main-watch").removeClass("hk-sTab__pw--on");
		initiateNewUI();
	}
	if(current_pid != now_pid){
		current_pid = now_pid;
	}
	return;
}
window.setInterval(function(){ checkURL(); }, 800);
function reportPurchase(){
	var curURL = window.location.href;
	if(curURL.split('checkoutsummary').length>1){
		var jsonArr = [{'processDONE': "Chumbak"}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

reportPurchase();

function sendTrack(){
	var prod = getProd();
	var webID = getCurrentPosition(window.location.href);
	var url = window.location.href;
	url = encodeURIComponent(url);
	prod = encodeURIComponent(prod);
	if(prod!=""){
		var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(1, jsonArr, 11, doNothing, []);
	}
}

sendTrack();

//Where the graph will be placed

pidFlipkart = getPID();
prod = getProd();
// var selector = [];
// selector.push({selector: '.product-page-container:eq(0)', attr: 'none', pos: 'after'});

function checkGraph(){
	if($('.tab-content .details-panel').length > 0){
		var selector = [];
		selector.push({selector: '.product-page-container:eq(0)', attr: 'none', pos: 'after'});
		selector = JSON.stringify(selector);
		height = "auto";
		var passBack = [{selectors: selector, height: height}];
		passBack = JSON.stringify(passBack);
		addGraphBase(passBack);
		// var passBack1 = [{title: prod, siteName: 'Chumbak', price: getPrice()}];
		// passBack1 = JSON.stringify(passBack1);
		// prepareGraph(pidFlipkart, passBack1);
	}
	else {
		setTimeout(function(){checkGraph();}, 1000);
	}
}

checkGraph();

// var selector2 = [];
// selector2.push({selector: '#add-to-cart-btn', attr: 'none', pos: 'after'});
// selector2.push({selector: '.product-view .code-product', attr: 'none', pos: 'after'});
// selector2.push({selector: '.product-view .product-price-text', attr: 'none', pos: 'after'});
// selector2.push({selector: '.below-add-cart-wrap:eq(0)', attr: 'none', pos: 'after'});

// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var name = getProd();
var price = getPrice();
var image_url = getImage();


origProd = name;
name = name.split("(")[0];
var nameS = name.split(" ");//
if(nameS.length<5){
	name = nameS.join("-");
}
else {
	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;
var final2send = url.split("products/");
msgToSend = final2send[1] + "~*~*" + price;
msgToSend = msgToSend + "moreData=";
sendSearchMessage(msgToSend, url);

function filterResults(data, url){
	if(data && data != null && data.trim() != "" && data != "null"){
		var results2 = JSON.parse(data);
		var message = results2;
		var results = message;
		results.sort(compare);
		var origPrice = getPrice();
		origProd = getProd();
		var countArray = Array();
		for (var i = 0; i <= results.length - 1; i++) {
			var current = results[i].prod;
			countArray[i] = 0;
			currentArray = origProd.split(" ");
			var totalLen = currentArray.length;
			for(var k=0; k< currentArray.length; k++){
				if(current.toUpperCase().indexOf(currentArray[k].toUpperCase())!=-1){
					countArray[i] = countArray[i] + 1;
				}
			}
			results[i].score = countArray[i];
		}
		indexSelected = 0; notFound = 0;
		for(k=0; k< results.length; k++){
			if(results[k].score/totalLen > .5){
				indexSelected = k;
				notFound = 0;
				break;
			}
		}
		var posResults = [];
		posResults.push({selector: 'body', attr: 'none', pos: 'before'});
		posResults = JSON.stringify(posResults);
		var posSpecs = [];
		posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
		posSpecs = JSON.stringify(posSpecs);
		showResultsNew(results, indexSelected, posSpecs, posResults, url);
	}
}
