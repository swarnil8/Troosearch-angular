//initial variables
$ = jQuery.noConflict();
savingsArray = [];
coupArray = [];
bestCouponFound = 0;
flagCoupon = [];
var arrayMsg = [];
var arrayBest = [];
var couponAt = 1349;

// //newcode
// var rerun=0;



// function couponCheck(){
//   var curURL = window.location.href;

//   if(curURL.split('foodpanda.in/review-order').length>1){

//     if(getCookie("counter")=="")
//     {
//       console.log(getCookie("counter"));
//       setCookie("counter",0,1);
//       console.log(getCookie("counter"));
//     }
//     if(getCookie("flag")=="")
//     {
//   //console.log(getCookie("i"));
//   setCookie("flag",0,1);
//   //console.log(getCookie("i"));
// }
//    //check if its the checkout page
//    var coupStatus = getCookie("coupInProgress");
//    if(coupStatus == "" ){
//     setCookie("coupInProgress", 0, 1);
//   }
//   else if(coupStatus == -1)
//   {

//     setCookie("coupInProgress", 1, 1);
//       //window.location.reload();

//     }
//     else if(coupStatus == 1){
//       addToDOM();

//       checkSavings();
//     }
//     if(parseInt(getCookie('removedFirst')) == 1){
//       getCoupons();
//     }
//       //place the apply coupon image
//       var imgURL = returnResource("apply-coupon.png");

//       if($('.voucher-input-container').length>0){
//         $('.voucher-input-container').after("<a id='couponClick' href='javascript:void();'><img style='margin-top:15px;margin-left:20px;' src='" + imgURL + "'></a>");
//         addToDOM();
//         var button = document.getElementById("couponClick");
//         button.addEventListener("click", function(){
//           setCookie("removedFirst", 1, 1);
//           getCoupons();
//         }, false);
//       }
//       else {
//         setTimeout(function(){couponCheck();},1000);
//       }
//     }
//     else {
//       setTimeout(function(){couponCheck();},1000);
//     }
// } //couponCheck Ends
// couponCheck();

// function getCoupons(){
//   if($('#shop_order_cart_type_voucher_clear_button.hidden').length > 0){
//     setCookie("coupInProgress", 1, 1);
//     setCookie("doneTill", 0, 1);
//     setCookie("perSaving", 0, 1);
//     setCookie("removedFirst", 1, 1);
//     document.getElementById("shop_order_cart_type_voucher_clear_button").click();
//   }
//   setCookie("removedFirst", 0, 1);
//   bestCouponFound = 0;
//   //set all cookies
//   setCookie("coupInProgress", 1, 1);
//   setCookie("doneTill", 0, 1);
//   setCookie("perSaving", 0, 1);

//   //show buyhatke modal
//   $('.hatke-discount-cover:eq(0)').css("display", "block");

//   //startProcess
//   var jsonArr = [{'pos': 15}];
//   jsonArr = JSON.stringify(jsonArr);
//   sendMessage(1, jsonArr, 7, startCouponProcess, []);

// } //getCoupons Ends

// function couponInitiate(coupons){
//   //coupons
//   // mytext = "PANDA30~20RFDN0LK~30RFDV0OQ~HATKE20~";
//   var mytext = "HATKE20~"+coupons;
//   setCookie("coupList", mytext, 1);
//   couponsLength = mytext.split("~").length - 1; //coupon count
//   $('.hdc-c-line:eq(0)').text("We are automatically trying " + couponsLength + " coupon codes for you !");
//   applyCoupons(mytext);
// } //couponInitiate Ends

// function applyCoupons(coupons){
//   if(coupons == ""){
//     coupons = getCookie("coupList");
//   }
//   coupons = coupons.split("~");
//   // new code
//   var counter= parseInt(getCookie("counter"));

//   counter=counter+1;
//   console.log(counter);

//   setCookie("counter", counter ,1);

//   var counter2 = parseInt(getCookie("counter"));
//   console.log(counter2);
//   var lencoupon=coupons.length-2;
//   console.log(lencoupon);
//   if(counter2==lencoupon)
//   {
//     console.log("bhuwan");
//     setCookie("flag",1,1);
//   }

//   //new code
//   start = parseInt(getCookie("doneTill"));
//   if(start == ""){
//     start = 0;
//   }
//   for(i=start;i<coupons.length-1;i++)
//   {
//     //newcode
//     if(i==0)
//     {
//       setCookie("flag",0,1);
//       setCookie("counter",0,1);
//     }
//     coupon = coupons[i];
//     if(coupon != "" && coupon != " "){
//       coupArray[i] = coupon;
//       temp(coupon, i, coupons.length-1);
//     }
//   }
//   endProcess(coupons.length-1);
// } //applyCoupons Ends

// function temp(coupon, i, lenArray){
//   if(lenArray == 100){
//     $('.hdc-loading').html('Automatically applying the best coupon now !');
//     $('.hdc-lb-progress').text("100% Complete");
//     $('.hdc-lb-fg').css("width", "100%");
//     arrayBest.push([coupon, couponAt]);
//     arrayBest = JSON.stringify(arrayBest);
//     var jsonArr = [{'best_cpn': arrayBest}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 13, doNothing, []);
//     preProcessor(i, coupon);
//   }
//   else if(i == parseInt(getCookie("doneTill")) || bestCouponFound == 1){
//     //console.log("bhuwan");
//     $('.hdc-loading').html('Trying code <span class="hdc-load-curr hdc-bold">' + (i+1) + '</span> of <span class="hdc-load-tot hdc-bold">' + lenArray + '</span>');
//     var perDone = i/lenArray;
//     perDone = perDone*100;
//     perDone = parseInt(perDone);
//     $('.hdc-lb-progress').text(perDone + "% Complete");
//     $('.hdc-lb-fg').css("width", perDone + "%");
//     preProcessor(i, coupon);
//   }
//   else{
//     setTimeout(function(){temp(coupon, i, lenArray);},1000);
//   }
// } // temp Ends

// function preProcessor(i, coupon){
//   // alert(coupon + " Applied!");
//   $("#shop_order_cart_type_vouchers").val(coupon);
//   document.getElementById("shop_order_cart_type_voucher_button").click();

// } //preProcessor Ends

// function checkSavings(){
//   $('.hatke-discount-cover:eq(0)').css("display", "block");
//   coupons = getCookie("coupList");
//   index_till = parseInt(getCookie("doneTill"));
//   cpn = coupons.split("~");
//   cpn_msg = "";
//   if($('.voucher-error').length > 0){
//     cpn_msg = $('.voucher-error').text().trim();
//   }
//   else if($('.alert__inner').length > 0){
//     cpn_msg = $('.alert__inner').text().trim();
//   }
//   setCookie("cpn_msg" + parseInt(getCookie("doneTill")), cpn_msg, 1);

//   if($('.voucher .price-wrapper').length > 0){
//     savings = $(".voucher .price-wrapper:eq(0)").text().trim().split("Rs.")[1].trim();
//     savings = savings.split(",").join("").trim();
//     savings = parseFloat(savings);
//     if(savings > parseFloat(getCookie("perSaving"))){
//       setCookie("perSaving", savings, 1);
//     }
//     // alert("savings1: "+savings);
//     // alert("doneTill1: "+getCookie("doneTill"));
//     setCookie("savingsBlue" + parseInt(getCookie('doneTill')), parseFloat(savings), 1);
//     setCookie("doneTill", parseInt(getCookie("doneTill")) + 1 , 1);
//     var currentSavAmt = parseFloat($('.hdc-sav-amt').text().trim());
//     finalSavAmt = parseFloat(getCookie("perSaving"));
//     $({c: currentSavAmt}).animate({c: finalSavAmt}, {
//       step: function(now) {
//         $('.hdc-sav-amt').text(Math.round(now))
//       },
//       duration: 1000,
//       easing: "linear"
//     });
//     //newcode
//     if(bestCouponFound == 0||rerun==1){
//       document.getElementById("shop_order_cart_type_voucher_clear_button").click();
//       applyCoupons(coupons);
//     }
//   }
//   else{
//     savings = 0;
//     // alert("savings3: "+savings);
//     // alert("doneTill3: "+getCookie("doneTill"));
//     setCookie("savingsBlue"  + parseInt(getCookie('doneTill')), parseFloat(savings), 1);
//     setCookie("doneTill", parseInt(getCookie("doneTill")) + 1 , 1);
//     applyCoupons(coupons);
//   }
// }   //checkSavings Ends

// function endProcess(i){

//   if(parseInt(getCookie('doneTill')) == i){
//       // alert("entered endProcess");
//       max = -111111;
//       index_req = 1000;
//       savingsBlue = getCookie("savingsBlue");

//       for(i=0;i<parseInt(getCookie('doneTill'));i++){
//         varName = "savingsBlue" + i;
//         curSaving = getCookie(varName);
//         curSaving = parseFloat(curSaving);
//         //calculate max saving
//         if(max < curSaving){
//           max = curSaving;
//           index_req = i;
//         }
//         // setCookie(varName , 0, -1);
//       }

//       if(max > 0){


//         bestCouponFound = 1;
//         rerun=1;//newcode
//         coupArray = getCookie("coupList").split("~");
//         coupon_req = coupArray[index_req];

//       temp(coupon_req, index_req, 100); // Finally Applying the best Coupon

//       setCookie("coupInProgress", 0, 1);
//       setCookie("doneTill", 0, 1);
//       $('.hatke-discount-cover').css("display", "none");

//       savings = $('.hdc-sav-amt:eq(1)').text().trim();
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
//     else{
//      setCookie("doneTill", 0, 1);
//      setCookie("coupInProgress", 0, 1);
//      $('.hatke-discount-cover').css("display", "none");
//      $('.hatke-discount-cover:eq(2)').css("display", "block");
//    }
//    coupList = getCookie("coupList");
//    couponAt = 1349;
//    coup = coupList.split("~");
//    for(i=0;i<coup.length-1;i++){
//     if(getCookie("cpn_msg"+ i) != undefined || getCookie("cpn_msg" + i) != 'undefined'){
//       arrayMsg.push([coup[i], encodeURIComponent(getCookie('cpn_msg'+i)), couponAt ]);
//     }
//     setCookie("cpn_msg"+i, "", -1);
//   }
//   arrayMsg = JSON.stringify(arrayMsg);
//   var jsonArr = [{'cpn_msg': arrayMsg}];
//   jsonArr = JSON.stringify(jsonArr);
//   sendMessage(1, jsonArr, 12, doNothing, []);
//   setTimeout(function(){}, 5000);
// }
// else{
//   setTimeout(function(){endProcess(i);},1000);
// }
// } //endProcess Ends

// function removeTheCover(){
//   if($('.hatke-discount-cover').length>0){
//    $('.hatke-discount-cover').css("display", "none");
//  }
// } //removeTheCover Ends



function sendCoupon(){
  couponToSend = [];
  var cur_link = window.location.href;
  var couponUrl = "";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  var couponAt = 1349;
  couponUrl = "http://www.foodpanda.in/";
  couponCode = "";
  couponText = "";
  couponDesc = "";
  if($(".vendor-discount").length > 0){
    if($(".vendor-discount__content__title").length > 0){
      couponText = $(".vendor-discount__content__title").text().trim();
    }
    if($(".vendor-discount__content__description").length > 0){
      couponDesc = $(".vendor-discount__content__description").text().trim();

      if(couponText.toUpperCase().split("CODE").length > 1){
        couponCode = couponText.toUpperCase().split("CODE");
        couponCode = couponCode[1].trim();
        if(couponCode.toUpperCase().split("(").length > 1){
          couponCode = couponCode.toUpperCase().split("(");
          couponCode = couponCode[0].trim();
        }
        if(couponCode.toUpperCase().split(".").length > 1){
          couponCode = couponCode.toUpperCase().split(".");
          couponCode = couponCode[0].trim();
        }
        if(couponCode.toUpperCase().split(":").length > 1){
          couponCode = couponCode.toUpperCase().split(":");
          couponCode = couponCode[1].trim();
        }
        if(couponCode.toUpperCase().split(" ").length > 1){
          couponCode = couponCode.toUpperCase().split(" ");
          couponCode = couponCode[0].trim();
        }
      }
      else if(couponDesc.toUpperCase().split("CODE").length > 1){
        couponCode = couponDesc.toUpperCase().split("CODE");
        couponCode = couponCode[1].trim();
        if(couponCode.toUpperCase().split("(").length > 1){
          couponCode = couponCode.toUpperCase().split("(");
          couponCode = couponCode[0].trim();
        }
        if(couponCode.toUpperCase().split(".").length > 1){
          couponCode = couponCode.toUpperCase().split(".");
          couponCode = couponCode[0].trim();
        }
        if(couponCode.toUpperCase().split(":").length > 1){
          couponCode = couponCode.toUpperCase().split(":");
          couponCode = couponCode[1].trim();
        }
        if(couponCode.toUpperCase().split(" ").length > 1){
          couponCode = couponCode.toUpperCase().split(" ");
          couponCode = couponCode[0].trim();
        }
      }
      else if(couponText.trim() != "" && couponDesc.trim() != ""){
        couponCode = "NO CODE REQUIRED";
      }
    }
  }
  couponCode = couponCode.split(",").join("").trim();
  if(couponCode.trim() == "-"){
    couponCode = "";
  }
  if(couponCode != ""){
    couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
  }

  if(couponToSend.length > 0){
    couponToSend = JSON.stringify(couponToSend);
    var jsonArr = [{'couponsExt': couponToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 15, doNothing, []);
  }
}
sendCoupon();
var cur_url = window.location.href;
if(cur_url.split(".foodpanda.in/review-order").length > 1){
  if($(".voucher").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = ".voucher";
    var position = "after";
    var parent = "none";
    var selectorInput = "#shop_order_cart_type_vouchers";
    var inputAttr = "val";
    var clickApplySelector = "#shop_order_cart_type_voucher_button";
    var clickRemoveSelector = "#shop_order_cart_type_voucher_clear_button";
    var details = [{'selectorInput': selectorInput, "clickApplySelector": clickApplySelector, "clickRemoveSelector": clickRemoveSelector, "inputAttr" : inputAttr, "api_case": 0}];
    details = JSON.stringify(details);
    localStorage.acDetails = details;
    displayACIcon(selectorACIcon, parent, position, 15, details);
    if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
      displayFinalSavings();
      $(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
      $(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
    }
  }

  var checkPick = ".voucher-applied";
  var selector = "#shop_order_cart_type_vouchers:eq(0)";
  var attr = "";
  var webID = 1349;
  var homeLink = "https://www.foodpanda.in/";
  pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

}

if(!localStorage.savings){
  localStorage.savings = "";
}
if(!localStorage.bestSaving){
  localStorage.bestSaving = 0;
}
if(!localStorage.bestCoupon){
  localStorage.bestCoupon = "";
}
function startSaving(){
  // console.log("Entered startSaving");
  return new Promise(function(resolve, reject){

    var code = localStorage.lastCoupon;
    var csaving = 0;
    var ecashing = 0;
    var savingsObject = {};
    var bestSaving = localStorage.bestSaving;
    var bestCoupon = localStorage.bestCoupon;
    var savings = localStorage.savings;
    var doneSavingCheck = localStorage.doneSavingCheck;
    var couponsTotal = localStorage.getCoupons;
    var couponAt = 1349;
    couponsTotal = couponsTotal.split("~").length - 1;

    if($(".voucher").length > 0 && $(".voucher .price-wrapper").length > 0 && $(".voucher .price-wrapper").length > 0){

      csaving = $(".voucher .price-wrapper:eq(0)").text().trim();
      csaving = filter_price(csaving);
      code = $("#shop_order_cart_type_vouchers").val().trim();
      if(isNaN(csaving)){
        csaving = 0;
      }
      else if(csaving > bestSaving && code != ""){
        bestSaving = csaving;
        localStorage.bestSaving = bestSaving;
        if(code.trim() != ""){
          localStorage.bestCoupon = code;
        }
        else{
          localStorage.bestCoupon = lastCoupon;
        }
        // console.log("bestSaving: "+bestSaving+" code: "+bestCoupon);
      }
    }
    if($(".voucher-error").length > 0){
      var cpnMsg = $(".voucher-error").text().trim();
      setCookie("HKCode~"+localStorage.lastCoupon, cpnMsg, 1);
    }

    if($("#shop_order_cart_type_voucher_clear_button").length > 0){
      document.getElementById("shop_order_cart_type_voucher_clear_button").click();
    }
    // console.log("calling from startSaving code "+code);
    // console.log("calling from startSaving saving "+csaving);
    // console.log("calling from startSaving couponsTotal "+couponsTotal);
    // console.log("calling from startSaving localStorage.doneACTill "+localStorage.doneACTill);
    if(localStorage.savings.trim() != ""){
      var savings = JSON.parse(localStorage.savings);
    }
    else{
      var savings = [];
    }
    var savingsLen = savings.length;
    savingsObject["code"] = code;
    savingsObject["saving"] = csaving;
    savingsObject["ecash"] = ecashing;
    savings[savingsLen] = savingsObject;
    localStorage.savings = JSON.stringify(savings);
    displayEachCpnSaving(code, csaving, ecashing);
    if(localStorage.doneACTill >= couponsTotal){
      // applyBestCoupon();
      resolve("done");
    }
    else{
      // console.log("calling from startSaving startACProcess");
      resolve("notdone");
      // startACProcess(localStorage.getCoupons, localStorage.acDetails);
    }
  });
}

function applyBestCoupon(){
  bestSaving = localStorage.bestSaving;
  bestCoupon = localStorage.bestCoupon;
  // console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if(bestSaving != 0 && bestCoupon.trim() != "" && $("#shop_order_cart_type_vouchers").length > 0 && $("#shop_order_cart_type_voucher_button").length > 0){
    $("#shop_order_cart_type_vouchers").val(bestCoupon.trim());
    localStorage.showFinalSavings = 1;
    localStorage.acStarted = 0;
    displayFinalSavings();
    document.getElementById("shop_order_cart_type_voucher_button").click();
  }
  else{
    displayNoSavings();
  }
  var allCoupons = localStorage.getCoupons;
  allCoupons = allCoupons.split("~");
  for(var all=0;all<allCoupons.length-1;all++){
    var cookieCpn = "HKCode~"+allCoupons[all].trim();
    if(getCookie(cookieCpn)){
      arrayMsg.push([allCoupons[all], encodeURIComponent(getCookie(cookieCpn)), 1349]);
      setCookie(cookieCpn, 0, -1);
    }
  }
  localStorage.getCoupons = "";

  arrayMsg = JSON.stringify(arrayMsg);
  var jsonArr = [{'cpn_msg': arrayMsg}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 12, doNothing, []);
}

// if(localStorage.showPostLoad==1){
//   alert("here i am");
//   intervalArrSomeNew = setInterval(function(){
//     if($('#hk-autoCoupon.hk-c-modals--open').length > 0){
//       clearInterval(intervalArrSomeNew);
//       alert("here i am again");
//       $(".hk-aCoup__netSavings").text(parseInt(localStorage.showSavingsPostLoad));
//       localStorage.showPostLoad = 0;
//       displayFinalSavings();
//       arrayMsg = [];
//     }
//   },1000);
// }
// /////////////// WISH TO WATCH LIST ENDS ///////////////


