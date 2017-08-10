var alertPosition = 22;
// if(getCookie("showPopAlert") == undefined || getCookie("showPopAlert") == ""){
//   setCookie("showPopAlert", 1, 10);
// }

// var imgLogo = chrome.extension.getURL("logo.png");
// if(getCookie("showPopAlert") == 1){
//   // $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:80px!important;"><div id="close-pop-alert">x</div><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p><a style="text-decoration:none;color:white" href="http://compare.buyhatke.com/promotions/american-swan/?gclid=extension" target="_blank">Buyhatke Maha Giveaway - Over 1,00,000 Products available for FREE. Click me to check it out</a></p></div></div></div>');
// }

// $("#close-pop-alert").click(function(){
//   setCookie("showPopAlert", 0, 10);
//   $(this).parent().css("display","none");
// });
function reportPurchase(){
	var curURL = window.location.href;
	if(curURL.split('koovs.com/checkout/address').length>1){
		var jsonArr = [{'processDONE': "Koovs"}];
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

pidFlipkart = getPID();
//console.log("getpid is "+pidFlipkart);
prod = getProd();
var selector = [];
if($('#detail_product').length>0){
  selector.push({selector: '#weRecommendBlock', attr: 'none', pos: 'before'});
  selector.push({selector: '#detail_product', attr: 'none', pos: 'after'});
  selector = JSON.stringify(selector);
  var passBack = [{selectors: selector}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
//   var passBack1 = [{title: prod, siteName: 'Koovs', price: getPrice()}];
//   passBack1 = JSON.stringify(passBack1);
// //console.log(passBack1);
// prepareGraph(pidFlipkart, passBack1);
}
// var imgLogo = returnResource("logo.png");
// var selector2 = [];
// selector2.push({selector: '#bhWidget', attr: 'none', pos: 'after'});
// selector2.push({selector: '.colorAndSize', attr: 'none', pos: 'before'});
// selector2.push({selector: '.more-less', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var myPrice=getPrice();
var price = myPrice;
// var imgURL3 = returnResource("watch-price1.png");
// msgToSend = "Hello, response from Koovs.com";
var title=getProd();
var name=title;
// name = name.split("KOOVS").join("");
// origProd = name;
// var nameS = name.split(" ");
// newName = "";
// for(i=1;i<nameS.length;i++){
//   newName = newName + nameS[i];
//   if(i!=nameS.length-1){
//     newName = newName + " ";
//   }
// }
origProd = name;
nameS = origProd.split(" ");
if(nameS.length<5){
	name = nameS.join("-");
}
else {
	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;

// $('.buyBlock').after('<a target="_blank" href=' + url + ' class="button orange-btn addToCart">Compare Now</a>');

price = getPrice();

msgToSend = name + "~*~*" + price + "&moreData=null";
sendSearchMessage(msgToSend, url);

function filterResults(data, url){
	if(data && data != null && data.trim() != "" && data != "null"){
		var results2 = JSON.parse(data);
		var message = results2;
		var results = message;
		results.sort(compare);
		var origPrice = getPrice();
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
    //console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
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
posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '40px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);
showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}
