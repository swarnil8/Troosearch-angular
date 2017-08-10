// savingsArray = [];
// coupArray = [];
// bestCouponFound = 0;
$ = jQuery.noConflict();

// if(getCookie("showPopAlert") == undefined || getCookie("showPopAlert") == ""){
// 	setCookie("showPopAlert", 1, 10);
// }

// var imgLogo = chrome.extension.getURL("logo.png");
// if(getCookie("showPopAlert") == 1){
// 	$('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:80px!important;"><div id="close-pop-alert">x</div><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p><a style="text-decoration:none;color:white" href="http://compare.buyhatke.com/promotions/american-swan/?gclid=extension" target="_blank">Buyhatke Maha Giveaway - Over 1,00,000 Products available for FREE. Click me to check it out</a></p></div></div></div>');
// }

// $("#close-pop-alert").click(function(){
// 	setCookie("showPopAlert", 0, 10);
// 	$(this).parent().css("display","none");
// });
// flagCoupon = [];
// for(var i=0;i < 200; i++){
//   flagCoupon[i] = 2;
// }
var alertPosition = 425;
function reportPurchase(){
	var curURL = window.location.href;
	if(curURL.split('zovi.com/buy').length>1){
		var jsonArr = [{'processDONE': "Zovi"}];
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
// var selector = [];
// selector.push({selector: '#movable-column', attr: 'none', pos: 'before'});
// selector.push({selector: '#details-row2', attr: 'none', pos: 'before'});
// selector.push({selector: '.details:eq(0)', attr: 'none', pos: 'after'});
// //selector.push({selector: '.pj2_tabs_bg', attr: 'none', pos: 'before'});
// selector = JSON.stringify(selector);
// var passBack = [{selectors: selector}];
// passBack = JSON.stringify(passBack);
// addGraphBase(passBack);
// $('#container').css("background", "#FFF");
// var passBack1 = [{title: prod, siteName: 'Zovi', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// //console.log(passBack1);
// prepareGraph(pidFlipkart, passBack1);
// $("#containerBHMain").css("margin-left", "-68px");
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


// function changeFlag(i, coupon){
//   flagCoupon[i] = 1;
//   setTimeout(function(){postProcessor(coupon, i);},1000);
// }

// function changeFlag2(i, coupon){
//   if(bestCouponFound==0){
//     if($('.delete-coupon').length>0){
//       $('.delete-coupon').click();
//     }
//   }
//   flagCoupon[i] = 0;
  /*if($('#couponCode').not(':enabled').length==1){
    var elem = $(document.getElementsByClassName("cart-rem-coupon")[0]).find('a');
    elem.click();
    $('.cart-page-mask:eq(0)').find('a:eq(0)').click();
    $('.cart-rem-coupon:eq(1)').find('a').click();
    ////console.log($('.cart-page-mask:eq(0)').find('a:eq(0)'));
    $('.cart-rem-coupon:eq(1)').find('a:eq(0)').click();
    setTimeout(function(){changeFlag2(i, initialamount, coupon);},1000);
  }
  else {
  var status = $('.pgLoading').attr("style").split("display:")[1].split(";")[0].trim();
  ////console.log("Status found " + status);
  if(status=="none"){
    flagCoupon[i] = 0;
    //$('#removeMask').find('a:eq(1)').click();
  }
  else {
    setTimeout(function(){changeFlag2(i, initialamount, coupon);},1000);
  }
} */
// }

// function removeCompletely(){
//    // $('#removeMask').find('a:eq(1)').click();
//  }

//  function postProcessor(coupon, i){
//   checkPass = 1;
//   var savingsText = $('.applied-coupon').text();
//   if(savingsText!=""){
//     savingsText = savingsText.trim();
//     savings = savingsText.split("Amount:");
//     if(savings.length>1){
//       savings = savings[1].trim();
//       savings = parseFloat(savings);
//     }
//     else {
//       savings = 0;
//     }
//     if(savings==0){
//       checkPass = 0;
//     }
//   }
//   else {
//     savings = 0;
//   }
//   savings = parseFloat(savings);
//   if(savings > $('.hdc-sav-amt').text()){
//     var currentSavAmt = parseFloat($('.hdc-sav-amt').text()),
//     finalSavAmt = savings;
//     $({c: currentSavAmt}).animate({c: finalSavAmt}, {
//       step: function(now) {
//         $('.hdc-sav-amt').text(Math.round(now))
//       },
//       duration: 1000,
//       easing: "linear"
//     });
//   }
//     ////console.log("Savings for " + coupon + " is " + savings);
//     savingsArray[i] = savings;
//     if(bestCouponFound==0){
//      if($('.delete-coupon').length>0){
//       $('.delete-coupon').click();
//     }
//   }
//   if(checkPass==1)
//     setTimeout(function(){changeFlag2(i, coupon);},1000);
//   else
//     setTimeout(function(){postProcessor(coupon, i);},1000);
// }

// function preProcessor(i, coupon){
//   if( $('#popup-container').css("display") == "none"  ){
//     $('.coupon_code').find('input').val(coupon);
//     $('.coupon').find('.submit').find('button').click();
//   ////console.log("Coupon Code applied " + coupon);
//   setTimeout(function(){changeFlag(i, coupon);},3000);
// }
// else {
//   $('#close-popup').click();
//   setTimeout(function(){preProcessor(i, coupon);},1000);
// }
// }

// function temp(coupon, i, lenArray){
//   if(lenArray==100){
//     $('.hdc-loading').html('Automatically applying the best coupon now !');
//     $('.hdc-lb-progress').text("100% Complete");
//     $('.hdc-lb-fg').css("width", "100%");
//     preProcessor(i, coupon);
//   }
//   else if(i==0||flagCoupon[i-1]==0){
//    $('.hdc-loading').html('Trying code <span class="hdc-load-curr hdc-bold">' + (i+1) + '</span> of <span class="hdc-load-tot hdc-bold">' + lenArray + '</span>');
//    var perDone = i/lenArray;
//    perDone = perDone*100;
//    perDone = parseInt(perDone);
//    $('.hdc-lb-progress').text(perDone + "% Complete");
//    $('.hdc-lb-fg').css("width", perDone + "%");
//    preProcessor(i, coupon);
//  }
//  else {
//   setTimeout(function(){temp(coupon, i, lenArray);},1000);
// }
//   //setTimeout(function(){preProcessor(i, coupon, initialamount);},7000*i);
//   //setTimeout(function(){couponApplied(initialamount);},7000*(i) + 3500); 
// }

// function endProcess(i){
//   ////console.log("called with " + i);
//   if(flagCoupon[i]==0){
// ////console.log("Process terminated");
// max = -111111;
// ind_req = 1000;
// for(m=0;m<savingsArray.length;m++){
//  if(max < savingsArray[m]){
//   max = savingsArray[m];
//   ind_req = m;
// }
// }
// if(max>0){
//   bestCouponFound = 1;
//   coup_req = coupArray[ind_req];
//   flagCoupon[0] = 2;
//   temp(coup_req, 0, 100);
//   $('.hatke-discount-cover').css("display", "none");
//   savings = $('.hdc-sav-amt:eq(0)').text();
//   $('.hatke-discount-cover:eq(1)').css("display", "block");
//   var currentSavAmt = 0,
//   finalSavAmt = max;
//   $({c: currentSavAmt}).animate({c: finalSavAmt}, {
//     step: function(now) {
//       $('.hdc-sav-amt').text(Math.round(now))
//     },
//     duration: 1000,
//     easing: "linear"
//   });
//   var jsonArr1 = [{'savings': max}];
//   jsonArr1 = JSON.stringify(jsonArr1);
//   sendMessage(0, jsonArr1, 0, doNothing, []);
// }
// else {
//   $('.hatke-discount-cover').css("display", "none");
//   $('.hatke-discount-cover:eq(2)').css("display", "block");
// } 
// ////console.log(savingsArray);
// }
// else {
//   setTimeout(function(){endProcess(i);},1000);
// }
// }

// function applyCoupons(coupons){
//  couponsArray = coupons.split("~");
//  var savings = [];
//  for(var i=0;i<couponsArray.length;i++){
//   if(couponsArray[i]!=""&&couponsArray[i]!=" "){

//     var cur = couponsArray[i];
//     coupArray[i] = cur;
//     temp(cur, i, couponsArray.length-1);
//   }
// }
// endProcess(couponsArray.length-2);
// }

// function getCoupons(){
//   for(var i=0;i < 200; i++){
//     flagCoupon[i] = 2;
//   }
//   bestCouponFound = 0;
//   $('.hatke-discount-cover:eq(0)').css("display", "block");
//   var jsonArr = [{'getCoupons': 22}];
//   jsonArr = JSON.stringify(jsonArr);
//   sendMessage(0, jsonArr, 425, startCouponProcess, []);;
// }

// function removeTheCover(){
//   if($('.hatke-discount-cover').length>0){
//     $('.hatke-discount-cover').css("display", "none"); 
//   }
// }

// function addToDOM(){
//   $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Finding out the best coupon for you !</h3><div class="hdc-content-main"><div class="hdc-c-line">We are automatically getting coupon codes for you.</div><div class="hdc-loading_bar"><div class="hdc-lb-bg hdc-lb"><span class="hdc-lb-progress">40% Complete</span><div class="hdc-lb hdc-lb-fg" style="width:40%;"></div></div></div><div class="hdc-c-line hdc-center"><div class="bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div><span class="hdc-loading"></span></div><div class="hdc-savings"><div class="hdc-total-savings"><span class="WebRupee">Rs.</span> <span class="hdc-sav-amt">0</span></div> saved till now</div></div></div></div></div></div>');

//   $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Yippie!</h3><div class="hdc-content-main"><div class="hdc-c-line">Congratulations! You have saved a total of <div class="hdc-total-savings"><span class="WebRupee">Rs.</span> <span class="hdc-sav-amt">0</span>!</div></div><div class="hdc-button-wrap"><div href="#" class="hdc-button"><div class="hdc-share"><span class="its-title">Share Your Joy:</span> <div class="is-sp is-fb"><a href="https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=Have%20you%20started%20saving%20via%20Buyhatke%20?&p%5Bsummary%5D=Yippie%20!%20I%20just%20saved%20by%20automatically%20applying%20best%20coupon%20via%20Buyhatke&p%5Burl%5D=http%3A%2F%2Fextension.buyhatke.com&p%5Bimages%5D%5B0%5D=http://compare.buyhatke.com/pricegraph.jpg.pagespeed.ce.DJYFBY26i2.jpg" target="_blank" class="is-logo is-l-fb"></a></div><div class="is-sp is-tw"><a href="http://twitter.com/home?status=Try%20the%20amazing%20CompareHatke%20Chrome%20Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-tw"></a></div><div class="is-sp is-gp"><a href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-gp"></a></div></div></div><a href="#" class="hdc-button">Finish</a></div><footer class="hdc-footer"><div class="hdc-feedback">Give us a <a href="http://buyh.tk/r5" target="_blank">feedback</a></div></footer></div></div></div></div></div>');

//   $('body').append('<div class="hatke-discount-cover" style="display:none;"><div class="hd-cover-bg"></div><div class="hd-cover-main"><a href="#" class="hd-cover-close">x</a><div class="hd-cover-wrap"><header class="hd-cover-head"><a href="http://compare.buyhatke.com/"><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png"></a></header><div class="hd-cover_content"><h3 class="hdc-head">Sorry! No Coupons Found</h3><div class="hdc-content-main"><div class="hdc-c-line">Sorry. We were unable to find any suitable coupons for your product.</div><div class="hdc-c-line"> But still you saved your precious time ! :)</div><div class="hdc-button-wrap"><a href="#" class="hdc-button">Finish</a></div><footer class="hdc-footer"><div class="hdc-feedback">Give us a <a href="http://buyh.tk/r5" target="_blank">feedback</a></div><div class="hdc-share"><span class="its-title">Share:</span><div class="is-sp is-fb"><a href="https://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=Have%20you%20started%20saving%20via%20Buyhatke%20?&p%5Bsummary%5D=Yippie%20!%20I%20just%20saved%20by%20automatically%20applying%20best%20coupon%20via%20Buyhatke&p%5Burl%5D=http%3A%2F%2Fextension.buyhatke.com&p%5Bimages%5D%5B0%5D=http://compare.buyhatke.com/pricegraph.jpg.pagespeed.ce.DJYFBY26i2.jpg" target="_blank" class="is-logo is-l-fb"></a></div><div class="is-sp is-tw"><a href="http://twitter.com/home?status=Try%20the%20amazing%20CompareHatke%20Chrome%20Extension!+http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-tw"></a></div><div class="is-sp is-gp"><a href="https://plus.google.com/share?url=http%3A%2F%2Fextension.buyhatke.com" target="_blank" class="is-logo is-l-gp"></a></div></div></footer></div></div></div></div></div>');

// var buttons = document.getElementsByClassName('hd-cover-close');
// buttons[0].addEventListener("click", function(){
//   removeTheCover();
// }, false);
// buttons[1].addEventListener("click", function(){
//   removeTheCover();
// }, false);
// buttons[2].addEventListener("click", function(){
//   removeTheCover();
// }, false);


// var buttons2 = document.getElementsByClassName('hdc-button');
// buttons2[1].addEventListener("click", function(){
//   removeTheCover();
// }, false);
// buttons2[2].addEventListener("click", function(){
//   removeTheCover();
// }, false);
// }

// function couponCheck(){
//   var curURL = window.location.href;
//   //console.log("CP Check was called");
//   if(curURL.split('zovi.com/buy').length>1){
//     var imgURL = returnResource("apply-coupon.png");
//     //console.log("TEst passed " + $('.coupon').length);
//     if($('.coupon').length>0){
//       var link = document.createElement('a');
//       link.href = "javascript:void()";
//       link.id = "couponClick";

//       var img = document.createElement('img');
//       img.src = imgURL;
//       img.style.marginLeft = "65px";

//       link.appendChild(img);

//       var inb4 = document.getElementsByClassName('coupon')[0];
//       if(document.getElementById('couponClick') == null){
//         inb4.parentNode.insertBefore(link, inb4);
//       }
//       //console.log("Process completed");
//   //$('#bagoffer').before("<a id='couponClick' href='javascript:void();'><img style='margin-left:65px;' src='" + imgURL + "'></a>");
//   addToDOM();
//   var button = document.getElementById("couponClick");
//   button.addEventListener("click", function(){
//     getCoupons();
//     //console.log("called getcoupons");
//   }, false);
//  // setTimeout(function(){couponCheck();},1000);
// }
// else {
//   setTimeout(function(){couponCheck();},1000);
// }
// }
// }

// couponCheck();


// var selector2 = [];
// selector2.push({selector: '#bhWidget', attr: 'none', pos: 'after'});
// selector2.push({selector: '#buy', attr: 'none', pos: 'after'});
// selector2.push({selector: '#thumbs', attr: 'none', pos: 'before'});
// selector2.push({selector: '#size-selection', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var myPrice=getPrice();
var price = myPrice;
var imgURL2 = returnResource("watch-price1.png");

var title=getProd();
var name=title;
prodName=title;
origProd = name;
name = name.split("(")[0];
var nameS = name.split(" ");
if(nameS.length<5){
	name = nameS.join("-");
}
else {
	name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;
// if($('#thumbs').length > 0){
// 	$('#thumbs').before('<div style="clear:both"></div><a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><div class=""><button class="button big fill"><span></span>Compare Prices</button></div></a><div style="clear:both"></div>');
// }
// else if($('#buy').length > 0){

// 	$('#buy').after('<div style="clear:both"></div><a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><button style="background: #E64743;color: #fff;padding: 10px 14px;border-radius: 3px;border: 0;"><span></span>Compare Prices</button></a>');
// }


var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;
msgToSend = msgToSend + "moreData=null";
  //console.log("MESSAGETOSEND: "+msgToSend);
  sendSearchMessage(msgToSend, url);


  function filterResults(data, url){
  	if(data && data != null && data.trim() != "" && data != "null"){
  		var results2 = JSON.parse(data);
  		var message = results2;
  		var results = message;
  		results.sort(compare);
  		origProd = getProd();
  		var origPrice = getPrice();
    //console.log(origPrice);
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
  posSpecs.push({selector: '#nav-header', attr: 'none', cssAttr: 'margin-top', preVal: '40px', postVal: '0px'});
  posSpecs.push({selector: '#main-area', attr: 'none', cssAttr: 'margin-top', preVal: '40px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);
  showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}

setTimeout(function(){
	$(".clearit").css("display","table");
	$(".clearit").css("clear","both");


},4000);