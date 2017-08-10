var alertPosition = 1000;

function reportPurchase(){
	var curURL = window.location.href;
	if(curURL.split('fabfurnish.com/cart').length>1){
		var jsonArr = [{'processDONE': "Fabfurnish"}];
		jsonArr = JSON.stringify(jsonArr);
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

reportPurchase();
sendEcomm();
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
// prod = getProd();
var selector = [];
selector.push({selector: '#footerNewDesign2', attr: 'none', pos: 'before'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'Fabfurnish', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);


// flagCoupon = [];
// for(var i=0;i < 200; i++){
//   flagCoupon[i] = 2;
// }

// function checkSavings(){
// //  document.getElementsByClassName('hatke-discount-cover')[0].style.display="block";
// //alert("check");
// $('.hatke-discount-cover:eq(0)').css("display", "block");
// totLen = $(".cart-total-row-border.clearfix:eq(0)").find(".cart-total-row").length;
// //console.log("checkSavings totlen "+ totLen );
// if(totLen==2){
//   savings = 0;
// }
// else
// {

//   if($(".cart-total-row-border.clearfix:eq(0)").find(".cart-total-row:eq(1)").text().split("Rs.")[1].trim().split(",").length>1)
//   {
//    savings= $(".cart-total-row-border.clearfix:eq(0)").find(".cart-total-row:eq(1)").text().split("Rs.")[1].trim().split(",")[0]+$(".cart-total-row-border.clearfix:eq(0)").find(".cart-total-row:eq(1)").text().split("Rs.")[1].trim().split(",")[1];


//  }
//  else
//  {
//    savings=$(".cart-total-row-border.clearfix:eq(0)").find(".cart-total-row:eq(1)").text().split("Rs.")[1].trim();
//  }

//  //console.log("checkSavings savings "+ savings );
// }
// savings=parseFloat(savings);
//   //alert(savings);
//   if(savings>getCookie("perSaving")){
//     setCookie("perSaving", savings, 1);
//   }
//   //console.log("Savings is " + savings);

//   var currentSavAmt = parseFloat($('.hdc-sav-amt').text()),
//   finalSavAmt = getCookie("perSaving");
//   $({c: currentSavAmt}).animate({c: finalSavAmt}, {
//     step: function(now) {
//       $('.hdc-sav-amt').text(Math.round(now))
//     },
//     duration: 1000,
//     easing: "linear"
//   });

// //varName = "savingsFab" + getCookie("doneTill");
//   //  setCookie(varName, savings, 1);
//     //setCookie("removeMode", 0, 1);
//     //setCookie("doneTill", parseFloat(getCookie("doneTill")) + 1 , 1);
//     //applyCoupons(getCookie("coupList"));
//     ////console.log("savings is " + savings);

//     removeMode = getCookie("removeMode");
//     if(savings==0&&removeMode==0){
//       varName = "savingsFab" + getCookie("doneTill");
//       setCookie(varName, savings, 1);
//       setCookie("removeMode", 0, 1);
//       setCookie("doneTill", parseFloat(getCookie("doneTill")) + 1 , 1);
//       applyCoupons(getCookie("coupList"));
//       //console.log("savings is " + savings);
//     }
//     else if(bestCouponFound==0&&removeMode==0){
//       varName = "savingsFab" + getCookie("doneTill");
//       setCookie(varName, savings, 1);
//       setCookie("removeMode", 1, 1);

//       $(".ui-link.icon.i-remove").get(0).click();
//       //console.log("savings is " + savings);
//       applyCoupons(getCookie("coupList"));
//     }
//     else {
//       setCookie("removeMode", 0, 1);
//       setCookie("doneTill", parseFloat(getCookie("doneTill")) + 1 , 1);
//       applyCoupons(getCookie("coupList"));
//     }
//   }



//   function changeFlag(i, coupon){
//     flagCoupon[i] = 1;
//     //setTimeout(function(){postProcessor(coupon, i);},1000);
//   }
//   /*if(document.getElementById('dialogProcessing').style.display=="none"){
//   var status = "none";
//   }
//  else {
//   var status = "comeAgain";
// }
//   if(status=="none"){
//     flagCoupon[i] = 1;
//     setTimeout(function(){postProcessor(coupon, i);},1000);
//   }
//   else {
//     setTimeout(function(){changeFlag(i, coupon);},1000);
//   }*/


//   function changeFlag2(i, coupon){
//     if(bestCouponFound==0){
//       if($('.delete-coupon').length>0){
//         $('.delete-coupon').click();
//       }
//     }
//     flagCoupon[i] = 0;
//   }

//   function removeCompletely(){
//    // $('#removeMask').find('a:eq(1)').click();
//  }

//  function postProcessor(coupon, i){
//   savingsText = $('.orderReviewtotalprice').text().trim().split("Coupon");
//   if(savingsText.length>1){
//     savings = savingsText[0].trim().split("Rs.");
//     savings = savings[savings.length-1].trim();
//     savings = savings.split(",").join("");
//     savings = parseFloat(savings);
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
//   setTimeout(function(){changeFlag2(i, coupon);},1000);
// }

// function preProcessor(i, coupon){
//   //debugger
//   if($(".ui-link.icon.i-remove").length==0){
//     $("#couponCode").val(coupon);
//   ////console.log($(".clearfix.mts.couponFormEl").find("input:eq(1)").attr("value"));
//   //alert($(".clearfix.mts.couponFormEl").find("input:eq(1)").attr("value"));
//   $(".clearfix.mts.couponFormEl").find("input:eq(1)").click();
//   //console.log("Coupon Code applied " + coupon);
//  // alert(coupon);
//  setTimeout(function(){changeFlag(i, coupon);},1000);
// }
// else
// {
//   setTimeout(function(){preProcessor(i, coupon);},1000);
// }
//   /*if(document.getElementById('dialogPchecksrocessing').style.display=="none"){
//   var length = $('#tabs-3').find('a').length;
//   var isClicked = "False";
//   for(k=0;k<length;k++){
//     if($('#tabs-3').find('a:eq(' + k + ')').text().trim() == "Remove Coupon"){
//       document.getElementById('tabs-3').getElementsByTagName('a')[k].click();
//       isClicked = "True";
//     }
//   }
//   if(isClicked=="False"){
//   $('#coupon_code').val(coupon)
//   $('.coup_apply').click();
//   ////console.log("Coupon Code applied " + coupon);
//   setTimeout(function(){changeFlag(i, coupon);},1000);
//    }
//    else {
//     setTimeout(function(){preProcessor(i, coupon);},1000);
//    }
//    }
//    else {
//     setTimeout(function(){preProcessor(i, coupon);},1000);
//   }*/
// }

// function temp(coupon, i, lenArray){
//   if(lenArray==100){
//     $('.hdc-loading').html('Automatically applying the best coupon now !');
//     $('.hdc-lb-progress').text("100% Complete");
//     $('.hdc-lb-fg').css("width", "100%");
//     preProcessor(i, coupon);
//   }
//   else if(i==parseFloat(getCookie("doneTill"))||bestCouponFound==1){
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

//   //console.log("called with " + i);
//   //console.log("Current val is " + getCookie("doneTill"));
//   if(parseFloat(getCookie("doneTill")) == i){
//     //console.log("Process terminated");
//     max = -111111;
//     ind_req = 1000;
//     for(i=0;i<getCookie("doneTill");i++){
//       varName = "savingsFab" + i;
//       curSaving = getCookie(varName);
//       curSaving = parseFloat(curSaving);
//       //console.log("Savings is " + curSaving);
//       if(max < curSaving){
//         max = curSaving;
//         ind_req = i;
//       }
//       setCookie(varName ,0,-1);
//     }

//     if(max>0){
//       bestCouponFound = 1;

//       coupArray = getCookie("coupList").split("~");
//       coup_req = coupArray[ind_req];
//       //console.log("coup final :"+coup_req);
//       temp(coup_req, 0, 100);
//       setCookie("doneTill", 0, 1);
//       setCookie("coupInProgress", 0, 1);
//       setCookie("coupList", "", 1);
//       $('.hatke-discount-cover').css("display", "none");
//       savings = $('.hdc-sav-amt:eq(0)').text();
//       $('.hatke-discount-cover:eq(1)').css("display", "block");
//       var currentSavAmt = 0,
//       finalSavAmt = max;
//       $({c: currentSavAmt}).animate({c: finalSavAmt}, {
//         step: function(now) {
//           $('.hdc-sav-amt').text(Math.round(now))
//         },
//         duration: 1000,
//         easing: "linear"
//       });
//       var jsonArr = [{'savings': max}];
//       jsonArr = JSON.stringify(jsonArr);
//       sendMessage(0, jsonArr, 0, doNothing, []);
//     }
//     else {
//       setCookie("doneTill", 0, 1);
//       setCookie("coupInProgress", 0, 1);
//       setCookie("coupList", "", 1);
//       $('.hatke-discount-cover').css("display", "none");
//       $('.hatke-discount-cover:eq(2)').css("display", "block");
//     } 
//   }
//   else {
//     setTimeout(function(){endProcess(i);},1000);
//   }
// }

// function applyCoupons(coupons){
//   if(coupons==""){
//     coupons = getCookie("coupList");
//   }
//   couponsArray = coupons.split("~");
//   var savings = [];
//   var start = parseFloat(getCookie("doneTill"));
//   if(start==""){
//     start = 0;
//   }
//   //console.log(couponsArray);
//   //console.log("Number of coupons available here are " + couponsArray.length);
//   for(var i=start;i<couponsArray.length;i++){
//     if(couponsArray[i]!=""&&couponsArray[i]!=" "){

//       var cur = couponsArray[i];
//       coupArray[i] = cur;
//       temp(cur, i, couponsArray.length-1);
//       //console.log("called with " + cur + " " + i);
//     }
//   }
//   endProcess(couponsArray.length-1);
// }

// function getCoupons(){
//   for(var i=0;i < 200; i++){
//     flagCoupon[i] = 2;
//   }
//   bestCouponFound = 0;
//   setCookie("coupInProgress", 1, 1);
//   setCookie("doneTill", 0, 1);
//   setCookie("perSaving", 0, 1);
//   $('.hatke-discount-cover:eq(0)').css("display", "block");
//   var httpq4 = new getXMLHTTPRequest();
//   var ext_id, ext_auth;
//   var jsonArr = [{'getCoupons': 19}];
//   jsonArr = JSON.stringify(jsonArr);
//   sendMessage(0, jsonArr, 1000, startCouponProcess, []);
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
//   if(curURL.split('fabfurnish.com/cart').length>1){


//     var coupStatus = getCookie("coupInProgress");
//     if(coupStatus==""){
//       setCookie("coupInProgress", 0, 1);

//     }
//     else if(coupStatus==1){
//       addToDOM();
//       checkSavings();
//     }
//     //console.log("CoupInProgress " + getCookie("coupInProgress"));
//     var imgURL = returnResource("apply-coupon.png");
//     //console.log("TEst passed");
//     if($(".clearfix.s-hidden.mts.couponFormEl").length!=0){
//       document.getElementById("addCoupon").click();
//     }
//     if($('.clearfix.mts.couponFormEl').length>0){
//      $('.clearfix.mts.couponFormEl').after("<a id='couponClick' href='javascript:void();'><img style='margin-top:15px;margin-left:20px;' src='" + imgURL + "'></a>");
//      addToDOM();
//      var button = document.getElementById("couponClick");
//      button.addEventListener("click", function(){
//       getCoupons();
//     }, false);
//    }
//    else {
//     setTimeout(function(){couponCheck();},1000);
//   }
// }
// else{
//  setTimeout(function(){couponCheck();},1000); 
// }
// }

// couponCheck();
var price = getPrice();
var name = getProd();
var title = getProd();
var prod = name;
var myPrice = price;
var image2 = getImage();
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
// var imgURL2 = returnResource("watch-price1.png");


// if($('#AddToCart').length>0){
// 	$('#AddToCart').after('<a target="_blank" title="Compare via Compare Hatke" style="text-decoration:none" href="' + urlToFollow + '" ><div class="buy"><span class="ui-button-wdth ui-button ui-buttonCart" style="font-size: 1.7 rem; padding-top: 5px;"><span class="pdp-sprite icon-plus"></span>Compare Prices</span></div></a>');
// }

// var selector2 = [];
// selector2.push({selector: '.product-options-new', attr: 'none', pos: 'before'});
// selector2.push({selector: '.more-less', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();

var final2send = urlToFollow.split("products/");
msgToSend = final2send[1] + "~*~*" + price + "&moreData=null";
sendSearchMessage(msgToSend, urlToFollow);

//console.log(msgToSend);

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
posSpecs = JSON.stringify(posSpecs);
showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}

