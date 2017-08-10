var alertPosition = 921;
//Where the graph will be placed


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
// // prod = getProd();

var selector = [];
// selector.push({selector: '#variant-page #autoCmpreCont', attr: 'parent', pos: 'before'});
selector.push({selector: '.section.product-sec:eq(0)', attr: 'none', pos: 'after'});
selector.push({selector: '#ProductDetailsBlock', attr: 'none', pos: 'before'});
selector.push({selector: '#variant-page', attr: 'none', pos: 'after'});
selector.push({selector: '.js-product-data', attr: 'parent', pos: 'after'});

selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'Healthkart', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);

// savingsArray = [];
// coupArray = [];
// bestCouponFound = 0;
// flagCoupon = [];
// cpnTxt="show";
// for(var i=0;i < 200; i++){
//   flagCoupon[i] = 2;
// }

// function changeFlag(i, coupon){
//   flagCoupon[i] = 1;
//   setTimeout(function(){postProcessor(coupon, i);},1500);
// }

// function changeFlag2(i, coupon){
//   if($(".icon-close.popup-close.cont-rht").length>0)
//   {
//    $(".icon-close.popup-close.cont-rht").click();
//  }
//  if(bestCouponFound==0){
//    if($("#fancybox-frame").contents().find(".closetip").length>0)
//    {
//     $("#fancybox-frame").contents().find(".closetip").click();
//   }
// }
// flagCoupon[i] = 0;
// }

// function postProcessor(coupon, i){
//   if($(".icon-close.popup-close.cont-rht").length>0)
//   {
//    $(".icon-close.popup-close.cont-rht").click();
//  }
//  if($("body>div:eq(1)").css("display")=="none")
//  {
//    if($(".row.promo-discount").find(".col-xs-4.text-right").text().split("Rs.").length>1)
//    {
//     savings=$(".row.promo-discount").find(".col-xs-4.text-right").text().split("Rs.")[1].trim();
//   }
//   else
//   {
//     savings=$(".row.promo-discount").find(".col-xs-4.text-right").text().trim();
//   }
//   savings=parseFloat(savings);



//   if(savings > $('.hdc-sav-amt').text()){
//     var currentSavAmt = parseFloat($('.hdc-sav-amt').text()),
//     finalSavAmt = savings;
//     $({c: currentSavAmt}).animate({c: finalSavAmt}, {
//       step: function(now) {
//         $('.hdc-sav-amt').text(Math.round(now))
//       },
//       duration: 1500,
//       easing: "linear"
//     });
//   }

//   savingsArray[i] = savings;
//   coupArray[i] = coupon;
//   //console.log("Savings for " + coupon + " is " + savings);
//   if(bestCouponFound==0){
//    if($(".couponStatus.hide:eq(0)").css("display")=="block")
//    {
//      $(".remove-coupon.btn.btn-gray.btn-mini.fnt-caps.disp-inln").get(0).click();
//    }
//  }
//  setTimeout(function(){changeFlag2(i, coupon);},1500);
// }
// else {
//   setTimeout(function(){postProcessor(coupon, i);},1000);

// }
// }

// function preProcessor(i, coupon){

//  if($("body>div:eq(1)").css("display")=="none"){
//   $(".js-coupon-code").val(coupon);
//   document.getElementsByClassName("disp-inln apply-coupon btn btn-gray fnt-caps")[0].click(); 
//   //console.log("Coupon Code applied " + coupon);
//   if($(".icon-close.popup-close.cont-rht").length>0)
//   {
//    $(".icon-close.popup-close.cont-rht").click();
//  }
//  setTimeout(function(){changeFlag(i, coupon);},1000);
// }
// else {
//  setTimeout(function(){preProcessor(i, coupon);},1000); 
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
//     $('.hdc-loading').html('Trying code <span class="hdc-load-curr hdc-bold">' + (i+1) + '</span> of <span class="hdc-load-tot hdc-bold">' + lenArray + '</span>');
//     var perDone = i/lenArray;
//     perDone = perDone*100;
//     perDone = parseInt(perDone);
//     $('.hdc-lb-progress').text(perDone + "% Complete");
//     $('.hdc-lb-fg').css("width", perDone + "%");
//     preProcessor(i, coupon);
//   }
//   else {
//     setTimeout(function(){temp(coupon, i, lenArray);},1000);
//   }
// }

// function endProcess(i){
//   ////console.log("called with " + i);
//   if(flagCoupon[i]==0){
// ////console.log("Process terminated");
// max = -111111;
// ind_req = 1500;
// //console.log(savingsArray);
// //console.log(coupArray);
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
//     duration: 1500,
//     easing: "linear"
//   });

//   var jsonArr = [{'savings': max}];
//   jsonArr = JSON.stringify(jsonArr);
//   sendMessage(0, jsonArr, 0, doNothing, []);
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
//   var jsonArr = [{'getCoupons': 30}];
//   jsonArr = JSON.stringify(jsonArr);
//   sendMessage(0, jsonArr, 471, startCouponProcess, []);
// }

// function removeTheCover(){
//   if($('.hatke-discount-cover').length>0){
//     $('.hatke-discount-cover').css("display", "none"); 
//     $('#couponClick').css("display", "none"); 
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
//   if(curURL.split('healthkart.com/cart').length>1){
//     var imgURL = returnResource("apply-coupon.png");
//     //console.log("TEst passed");
//     if($(".remove-cpn.show").length>0 && cpnTxt!="hide")
//     { 
//       cpnTxt="hide";
//       $(".remove-coupon.btn.btn-gray.btn-mini.fnt-caps.disp-inln").get(0).click();

//     }
//     if($("body>div:eq(1)").css("display")=="none"){
//       if($(".add-cpn.row.show").length>0 || $(".add-cpn.row.hide").length>0 ){

//         $('.add-cpn.row.'+cpnTxt).after("<a id='couponClick' href='javascript:void();'><img style='margin-top:15px;margin-left:20px;' src='" + imgURL + "'></a>");
//         addToDOM();
//         var button = document.getElementById("couponClick");
//         button.addEventListener("click", function(){
//           getCoupons();
//         }, false);
//       }
//       else {
//         //console.log("here");  
//  // $(".remove-coupon.btn.btn-gray.btn-mini.fnt-caps.disp-inln").get(0).click();
//  setTimeout(function(){couponCheck();},1000);
// }
// }
// else{
//  setTimeout(function(){couponCheck();},1000); 
// }
// }
// }

// couponCheck();
// if($('#variant-page').length > 0){
//   var selector2 = [];
//   // selector2.push({selector: ".addToCart", attr: 'none', pos: 'after'});
//   // selector2.push({selector: ".addToCartButton", attr: 'none', pos: 'after'});

//   selector2.push({selector: ".product-details .variant-price:eq(0)", attr: 'none', pos: 'after'});
//   selector2.push({selector: "[itemprop='offers']", attr: 'parent', pos: 'after'});
//   selector2.push({selector: '.js-packs', attr: 'none', pos: 'after'});
//   selector2 = JSON.stringify(selector2);
//   setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
// }
// $('#bhWidget').css('font-size', '14px');
var title = getProd();
var name = getProd();
name = name.split(" ").join("-").trim();
if(name.split("(").length > 1){
	name = name.split("(")[0].trim();
}
if(name.split(",").length > 1){
	name = name.split(",")[0].trim();
}

//console.log("Name: "+name);
var myPrice = getPrice();
price = myPrice;
price = parseFloat(price);
var url = "http://compare.buyhatke.com/products/" + name;
// var imgURL = returnResource("healthkart.png");

// if($("#variant-page .embedPadding1").length > 0){
//   if($("#variant-page [itemprop='offers']").length > 0){
//     $("#variant-page [itemprop='offers']").parent().after('<a target="_blank" href=' + url + ' ><img src=' + imgURL +' title="Compare via Compare Hatke"></a>');
//   }
// }
// else if($('.product-details .variant-price:eq(0)').length==1){
//   $('.product-details .variant-price:eq(0)').after('<a target="_blank" href=' + url + ' ><img src=' + imgURL +' title="Compare via Compare Hatke"></a>');
// }
// else if($('.addToCart').length==1){
//   $('.addToCart').after('<a style="margin-left: -102%" target="_blank" href=' + url + ' ><img src=' + imgURL +' title="Compare via Compare Hatke" style="margin-left: 162px;"></a>');
// }
// else if($('.addToCartButton').length>1){
//   var imgURL = returnResource("healthkart.png");
//   $('.addToCartButton').after('<a style="margin-left: 0%" target="_blank" href=' + url + ' ><img src=' + imgURL +' title="Compare via Compare Hatke" style="margin-left: 0px;"></a>');
// }

var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;

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
posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);
showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}