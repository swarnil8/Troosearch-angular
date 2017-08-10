$ = jQuery.noConflict();
var alertPosition = 429;
//console.log("Alert: "+alertPosition);
function reportPurchase(){
	var curURL = window.location.href;
	if(curURL.split('zivame.com/checkout/cart/').length>1){
		var jsonArr = [{'processDONE': "Zivame"}];
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
//console.log("PID: "+pidFlipkart);
prod = getProd();
var selector = [];
selector.push({selector: '#product-details-section', attr: 'none', pos: 'before'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'Zivame', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);

flagCoupon = [];
for(var i=0;i < 200; i++){
	flagCoupon[i] = 2;
}


function removeCompletely(){
   // $('#removeMask').find('a:eq(1)').click();
}

function removeTheCover(){
	if($('.hatke-discount-cover').length>0){
		$('.hatke-discount-cover').css("display", "none"); 
	}
}



var prod = name;
var image2 = getImage();
var url = window.location.href;
var price = getPrice();
var imgURL2 = returnResource("watch-price1.png");
// var selector2 = [];
// selector2.push({selector: '.product-options-bottom', attr: 'none', pos: 'before'});
// selector2.push({selector: '#size-selection', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();

var url = "http://compare.buyhatke.com/products/";
origProd = title;
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
	title = titleS.join("-");
}
else {
	title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
var urlToFollow = url + title;
// if($('#addtocartbtn').length>0){
//   $('#addtocartbtn').after('<a target="_blank" href="' + urlToFollow + '"><input type="button" id="addtocartbtn" class="cartBtnGreen" title="Compare via Buyhatke"  value="Compare Now"></a>');
// }
origPrice = price;
var final2send = urlToFollow.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;
msgToSend = msgToSend + "&moreData=";
sendSearchMessage(msgToSend, urlToFollow);

function filterResults(data, url){
	if(data && data != null && data.trim() != "" && data != "null"){
		var results2 = JSON.parse(data);
		var message = results2;
		var results = message;
		results.sort(compare);
		var origPrice = price;
		origProd = getProd();
  //console.log(origProd);
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
    ////console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
}
indexSelected = 0; notFound = 1;
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
posSpecs.push({selector: '.header-container:eq(0)', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
posSpecs.push({selector: '#product-page', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
posSpecs.push({selector: '#product-meta-data', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);
showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}