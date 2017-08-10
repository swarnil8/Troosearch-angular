
var alertPosition = 4;
function reportPurchase(){
	var curURL = window.location.href;
	if(curURL.split('secure.shopclues.com').length>1){
		var jsonArr = [{'processDONE': "ShopClues"}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

reportPurchase();

var jsonArr = [{'visitedEcomm': 421}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(0, jsonArr, 0, doNothing, []); 


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

selector.push({selector: '#bigsalebnr', attr: 'none', pos: 'before'});
selector.push({selector: '.prd_right_info', attr: 'none', pos: 'after'});
selector.push({selector: '.other_slr_blk', attr: 'none', pos: 'before'});
selector.push({selector: '.other_slr_blk', attr: 'none', pos: 'before'});
selector.push({selector: '.pj2_tabs_bg', attr: 'none', pos: 'before'});
selector = JSON.stringify(selector);
var passBack = [{selectors: selector}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'ShopClues', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// // console.log(passBack1);
// prepareGraph(pidFlipkart, passBack1);
/*
var affRules = []; // Deals
affRules.push({prePart: '', postPart: ''});
affRules = JSON.stringify(affRules);
command = 3;
var passBack2 = [{catName: 'this category', affRules: affRules, command: command}];
passBack2 = JSON.stringify(passBack2);
prepareDeals(pidFlipkart, passBack2, command);
*/
var imgLogo = returnResource("logo.png");

// console.log("price is " + getPrice());
if(getCookie('shopC')=="" || getCookie('shopC')== undefined){
	setCookie("shopC", 1, 1);
}

function dontShow(){
  // console.log("Here I come");
  setCookie("shopC", 0, 1);
  $('.hk-ebay-cb-box').html("");
  $('.hk-ebay-cb-box').css("height", "0px");
  $('.hk-ebay-cb-box').css("display", "none");
  $('.pdp-e-i-alloffers').css("margin-top", "0px");
  return false;
}

function addCode(){
	if($('.product-pricing .price').length > 0){
		deal_price = $('.product-pricing .price').text().trim();
		deal_price = filter_price(deal_price);
	}

	if($('[id^="price_update_"]').length > 0){
		sell_price = $('[id^="price_update_"]').text().trim();
		sell_price = filter_price(sell_price);
	}
	else {
		sell_price = deal_price;
	}
	coupon_code = "";

	if($('.box_specialoffer_message_text_coupon').length > 0){
		coupon_code = $('.box_specialoffer_message_text_coupon').text().trim();
	}

	if(coupon_code=="" && $('.products-offers').length > 0){
		coupon_code = $('.products-offers').find('.details').find('strong').find('span').text().trim();
	}

// console.log("Sell price " + sell_price + " Deal price " + deal_price + " Coupon code " + coupon_code);

offerPrice1 = 9999999999;
offerPrice2 = 9999999999;
offerPrice3 = 9999999999;
offerPrice4 = 9999999999;
offerPrice5 = 9999999999;

flagOffer1 = 1;
flagOffer2 = 1;
flagOffer3 = 1;
flagOffer4 = 1;
flagOffer5 = 1;

if($('.breadcrumb-pages').find('li').length > 1){
	if($('.breadcrumb-pages').find('li:eq(1)').text().trim() == "Computers" || $('.breadcrumb-pages').find('li:eq(1)').text().trim() == "Mobiles & Tablets" || $('.breadcrumb-pages').find('li:eq(1)').text().trim() == "Electronics"){
		flagOffer1 = 0;
	}
}

if($('.breadcrumb-pages').find('li').length > 2){
	if($('.breadcrumb-pages').find('li:eq(2)').text().trim() == "Home Appliances"){
		flagOffer1 = 0;
	}
}

if($('.breadcrumb-pages').find('li').length > 3){
	if($('.breadcrumb-pages').find('li:eq(3)').text().trim() == "Data Card" || $('.breadcrumb-pages').find('li:eq(3)').text().trim() == "MicroSD Cards" || $('.breadcrumb-pages').find('li:eq(3)').text().trim() == "Feature Phones"){
		flagOffer2 = 0;
		flagOffer3 = 0;
	}
}

if($('.breadcrumb-pages').find('li').length > 1){
	if($('.breadcrumb-pages').find('li:eq(1)').text().trim() == "Electronics"){
		flagOffer4 = 0;
	}
}



if(sell_price > 499){
	offerPrice1 = sell_price - 150;
}

if(sell_price > 999){
	temp_price = .15 * sell_price;
	if(temp_price > 300){
		offerPrice2 = sell_price - 300;
	}
	else {
		offerPrice2 = sell_price - parseInt(temp_price);
	}
}

if(sell_price > 699){
	offerPrice3 = deal_price - 50;
}

if(sell_price >= 500){
	temp_price = .13 * sell_price;
	if(temp_price > 300){
		offerPrice4 = sell_price - 300;
	}
	else {
		offerPrice4 = sell_price - parseInt(temp_price);
	}
}

if(sell_price >= 300){
	temp_price = .09 * sell_price;
	if(temp_price > 300){
		offerPrice5 = sell_price - 300;
	}
	else {
		offerPrice5 = sell_price - parseInt(temp_price);
	}
}

if(offerPrice1 == 9999999999 || flagOffer1 == 0){
	offerPrice1 = 0;
}

if(offerPrice2 == 9999999999 || flagOffer2 == 0){
	offerPrice2 = 0;
}

if(offerPrice3 == 9999999999 || flagOffer3 == 0){
	offerPrice3 = 0;
}

if(offerPrice4 == 9999999999 || flagOffer4 == 0){
	offerPrice4 = 0;
}

if(offerPrice5 == 9999999999 || flagOffer5 == 0){
	offerPrice5 = 0;
}

  // console.log("Code SCBHK150 Savings " + offerPrice1);
  // console.log("Code SCBHK15 Savings " + offerPrice2);
  // console.log("Code SCBHK50 Savings " + offerPrice3);
  // console.log("Code SCBHK13 Savings " + offerPrice4);
  // console.log("Code SCBHK9 Savings " + offerPrice5);

  minPrice = 9999999999;
  if(offerPrice1!=0){
  	if(minPrice > offerPrice1){
  		minPrice = offerPrice1;
  		minCode = "SCBHK150";
  	}
  }

  if(offerPrice2!=0){
  	if(minPrice > offerPrice2){
  		minPrice = offerPrice2;
  		minCode = "SCBHK15";
  	}
  }

  if(offerPrice3!=0){
  	if(minPrice > offerPrice3){
  		minPrice = offerPrice3;
  		minCode = "SCBHK50";
  	}
  }

  if(offerPrice4!=0){
  	if(minPrice > offerPrice4){
  		minPrice = offerPrice4;
  		minCode = "SCBHK13";
  	}
  }

  if(offerPrice5!=0){
  	if(minPrice > offerPrice5){
  		minPrice = offerPrice5;
  		minCode = "SCBHK9";
  	}
  }

  if(minPrice > deal_price){
  	minPrice = 9999999999;
  }

  // console.log("Mon price is " + minPrice);

  if(minPrice != 9999999999 && getCookie('shopC')==1){
  	if(minCode == "SCBHK50"){
  		textShow = "Apply this code in addition to <b>" + coupon_code + "</b> to get Rs 50 extra OFF on deal price";
  	}
  	else {
  		textShow = "";
  	}


  	textShow += ".Additionally get 100% cashback + 20% Citrus Cashback. Applicable on purchases above Rs 690 (69th Independence Day)";


  	couponCode = minCode;
  	mod_price = minPrice;
  	rechargeAmount = 0;
     // console.log("Length is "  + $('.product-options').length);
     $('.pro_det_add_to_cart_butto').after('<div class="hk-ebay-cb-box" style="display:block;height:160px!important"><a id="removeCash" href="javascript:void();" style="float:right;" onclick="dontShow();return false;">x</a><div class="hk-cb-b-wrap"><div class="hk-b-content"><div class="hk-b-top-txt-wrap">Apply coupon code <b>' + couponCode + '</b> at checkout and get this product for  <div class="hk-b-price-wrap" style="display:inline-block;">&#8377;<span class="hk-b-price">' + mod_price + '</span></div> only. ' + textShow + '</div><div class="hk-b-bottom-txt-wrap"><em>Valid till <strong>August 15th, 2015</strong></em></div></div><a href="http://compare.buyhatke.com/promo_pages/shopclues/?utm_source=shopclues-ext" target="_blank"><div class="hk-b-button">Know More</div></a><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png" class="hk-bh-logo" alt="Buyhatke Logo"></div></div>');
     $('.pdp-e-i-alloffers').css("margin-top", "140px");
     var button = document.getElementById("removeCash");
     button.addEventListener("click", function(){
     	dontShow();
     }, false);

 }
 else if(getCookie('shopC')==1){
     // console.log("Length is "  + $('.product-options').length);
     textShow = "Get 100% cashback + 20% Citrus Cashback on purchasing it till 15th Aug. Applicable on purchases above Rs 690 (69th Independence Day)";
     $('.pro_det_add_to_cart_butto').after('<div class="hk-ebay-cb-box" style="display:block;"><a id="removeCash" href="javascript:void();" style="float:right;" onclick="dontShow();return false;">x</a><div class="hk-cb-b-wrap"><div class="hk-b-content"><div class="hk-b-top-txt-wrap">' + textShow + '</div><div class="hk-b-bottom-txt-wrap"><em>Valid till <strong>August 15th, 2015</strong></em></div></div><a href="http://compare.buyhatke.com/coupons-store/ShopClues-Coupons-ShopClues-Offers?utm_source=shopclues-ext&gclid=ext" target="_blank"><div class="hk-b-button">Know More</div></a><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png" class="hk-bh-logo" alt="Buyhatke Logo"></div></div>');
     $('.pdp-e-i-alloffers').css("margin-top", "140px");
     var button = document.getElementById("removeCash");
     button.addEventListener("click", function(){
     	dontShow();
     }, false);
 }

}


// addCode();


// var selector2 = [];
// selector2.push({selector: '.prd_mid_info .f_price', attr: 'parent', pos: 'after'});
// selector2.push({selector: '#bhWidget', attr: 'none', pos: 'after'});
// selector2.push({selector: '.pro_det_add_to_cart_butto', attr: 'none', pos: 'before'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var myPrice=getPrice();
var price = myPrice;
// var imgURL2 = returnResource("watch-price1.png");

var title=getProd();
var name=title;
prodName=title;
origProd = name;
name = name.split("(")[0];
origProd = name;
var nameS = name.split(" ");
if(nameS.length<5){
	name = nameS.join("-");
}
else {
	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;
// if($(".prd_right_info").length > 0 && $(".prd_right_info .buy_product").length > 0){
//   $('.prd_right_info:eq(0) .buy_product:eq(0)').after('<a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><div class="buy btn orange-white"><span style="font-weight:bold;" class="buy-now button big fill"><span class="pdp-sprite icon-plus"></span>COMPARE PRICES</span></div></a>');
// }


var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;

isApparel = false;

// if($('#bhWidget').length>0){
//   var randNo = Math.floor((Math.random() * 10) + 1);
//   if(randNo%2==0){
//     var csURL = returnResource("lap.png");
//     var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-Laptops";
//   }
//   else {
//     var csURL = returnResource("tv.png");
//     var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-TVs";
//   }


//     //$('#bhWidget').after('<a style="margin-left:10px;" href="' + link_t + '" target="_blank"><img src=' + csURL  + '></a>');
//   }


if(getBreadCrumb().split("*~Mobile Phones*~").length > 1){
	sendSearchMessageNew(final2send[1], 0, url);
}
else if(getBreadCrumb().split("*~Laptops*~").length > 1){
  getDetails(url); 
}
else {
	sendSearchMessage(msgToSend, url);
}

// sendSearchMessage(msgToSend);


function filterResults(data, url, flagSel){
	if(data && data != null && data.trim() != "" && data != "null"){
		var results2 = JSON.parse(data);
		var message = results2;
		var results = message;
		if(results!=null && results.length!=0){
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
if(flagSel==1){
    indexSelected = 0;
}
if(results[0].error !==undefined){
	indexSelected = 0;
}
var posResults = [];
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'},{selector: '.global_container', attr: 'none', cssAttr: 'margin-top', preVal: '26px', postVal: '0px'},{selector: '.site-header', attr: 'none', cssAttr: 'margin-top', preVal: '26px', postVal: '0px'},{selector: '.header-offer', attr: 'none', cssAttr: 'margin-top', preVal: '26px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);
showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}
}