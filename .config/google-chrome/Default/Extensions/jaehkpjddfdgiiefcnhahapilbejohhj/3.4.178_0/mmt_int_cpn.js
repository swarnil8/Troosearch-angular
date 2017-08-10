// savingsArray = [];
// coupArray = [];
// bestCouponFound = 0;
// flagCoupon = [];

// function getXMLHTTPRequest() {

//   req = new XMLHttpRequest();
//   return req;

// }

// for(var i=0;i < 200; i++){
//   flagCoupon[i] = 2;
// }

// function changeFlag(i, coupon){
//   flagCoupon[i] = 1;
//   setTimeout(function(){postProcessor(coupon, i);},3000);
// }

// function changeFlag2(i, coupon){
//   flagCoupon[i] = 0;
// }

// function removeCompletely(){
// }

// function postProcessor(coupon, i){
//   if($('#discountDisplay').css("display")!="none"){
//     var msg = $('#discountDisplay').text();
//     if(msg.split("-").length>1){
//       savings = msg.split("-");
//       if(savings.length>1){
//         savings = savings[1];
//         savings = savings.trim();
//         savings = savings.split(",").join("");
//         savings = parseFloat(savings);
//       }
//       else {
//         savings = 0;
//       }
//     }
//     else {
//       savings = 0;
//     }
//   }
//   else {
//     savings = 0;
//   }
//   savings = parseFloat(savings);

//   if(savings!=0&&bestCouponFound==0){
//     document.getElementById('deal_code_apply_btn').click();
//   }

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

//     //console.log("Savings for " + coupon + " is " + savings);
//     savingsArray[i] = savings;

//     setTimeout(function(){changeFlag2(i, coupon);},1000);
//   }

//   function preProcessor(i, coupon){
//     if(stopCoupon == 1){
//       $('#deal_code').val(coupon);
//       document.getElementById('deal_code_apply_btn').click();
//   //console.log("Coupon Code applied " + coupon);
//   setTimeout(function(){changeFlag(i, coupon);},1000);
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
//   //setTimeout(function(){preProcessor(i, coupon, initialamount);},7000*i);
//   //setTimeout(function(){couponApplied(initialamount);},7000*(i) + 3500); 
// }

// function endProcess(i){
//   //console.log("called with " + i);
//   if(flagCoupon[i]==0){
// //console.log("Process terminated");
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
//   var jsonArr = [{'savings': max}];
//   jsonArr = JSON.stringify(jsonArr);
//   sendMessage(0, jsonArr, 0, doNothing, []);
// } 
// else {
//   $('.hatke-discount-cover').css("display", "none");
//   $('.hatke-discount-cover:eq(2)').css("display", "block");
// }
// //console.log(savingsArray);
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

// function couponInitiate(coupon){
//  mytext = coupon;
//  couponsLength = mytext.split("~").length - 1;
//     ////console.log("coupon len"+couponsLength);
//     $('.hdc-c-line:eq(0)').text("We are automatically trying " + couponsLength + " coupon codes for you !");
//     applyCoupons(mytext);
//   }

//   function getCoupons(){
//     for(var i=0;i < 200; i++){
//       flagCoupon[i] = 2;
//     }
//     bestCouponFound = 0;
//     var mytext="";
//     $('.hatke-discount-cover:eq(0)').css("display", "block");
//     if($('#deal_code_remove_btn').length>0){
//       document.getElementById('deal_code_remove_btn').click();
//     }

//     var jsonArr = [{'pos': 11}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 7, startCouponProcess, []);


//   }
// /*
//   var httpq4 = new getXMLHTTPRequest();
//   var ext_id, ext_auth;
//   chrome.runtime.sendMessage({ext_id: "value"}, function(response) {
//     ext_id = response.farewell.split("~")[0];
//     ext_auth = response.farewell.split("~")[1];
//     var myurl = "http://compare.buyhatke.com/extension/getCoupons.php";
// var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&pos=11";
// httpq4.open("POST", myurl, true);
// httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// httpq4.onreadystatechange = function(){
// if (httpq4.readyState == 4) {
// if(httpq4.status == 200) {
// var mytext = httpq4.responseText;
// //console.log("Coupons " + mytext);
// couponsLength = mytext.split("~").length - 1;
// $('.hdc-c-line:eq(0)').text("We are automatically trying " + couponsLength + " coupon codes for you !");
// applyCoupons(mytext);
// }
// }
// };
// httpq4.send(parameters);
// });
// }*/

// function removeTheCover(){
//   if($('.hatke-discount-cover').length>0){
//     $('.hatke-discount-cover').css("display", "none"); 
//   }
// }

// function couponCheck(){
//   var curURL = window.location.href;
// //console.log("CP Check was called");
// if(curURL.split('cheapfaresindia.makemytrip.com').length>1){
//   var imgURL = returnResource("apply-coupon.png");
//   //console.log("TEst passed");
//   if($('.discount_section').length>0){
//     $('.discount_section').after("<a id='couponClick' href='javascript:void();'><img style='margin-left:150px;' src='" + imgURL + "'></a>");
//     addToDOM();
//     var button = document.getElementById("couponClick");
//     button.addEventListener("click", function(){
//       stopCoupon = 1;
//       getCoupons();
//     }, false);
//   }
//   else {
//     setTimeout(function(){couponCheck();},1000);
//   }
// }

// }

// couponCheck();

function getAppliedCpn(){
  var cur_url = window.location.href;
  if(cur_url.split("cheapfaresindia.makemytrip.com/international/raw/index.html").length > 1){
    if($(".discount_promo_info .input-group.ng-hide").length > 0){
      var checkPick = ".discount_promo_info .input-md";
      var selector = ".discount_promo_info .input-md:eq(0)";
      var attr = "";
      var webID = 1288;
      var homeLink = "https://www.makemytrip.com/";
      pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
    }
    else{
      setTimeout(getAppliedCpn, 1000);
    }
  } 
}
getAppliedCpn();


$('body').append("<div id='ourSearchKey1' style='display:none;'></div>")
var scr = document.createElement("script");
scr.type="text/javascript";
var a = "document.getElementById('ourSearchKey1').innerHTML= JSON.stringify(window.sessionStorage)";
scr.innerHTML = a;
document.body.appendChild(scr);
var ourSearchKey1 = "";
var SessionKey = "";
var cur_url = window.location.href;

function setSessionMMT(resp, passBack){
  SessionKey = resp;
  console.log("resp: "+resp);
  autoCouponInititate();
}
if(cur_url.split("/international/raw/index.html").length > 1){
  var jsonArr = [{'getSessionKeyMMTInt': 'haiKya'}];
  jsonArr = JSON.stringify(jsonArr);
  var passBack = [];
  passBack = JSON.stringify(passBack);
  sendMessage(0, jsonArr, 0, setSessionMMT, passBack);
}

function autoCouponInititate(){
  if(SessionKey != ""){
    var selectorACIcon = ".discount_promo_info";
    var position = "after";
    var parent = "none";
    var method = "GET";
    var api = "https://cheapfaresindia.makemytrip.com/international/handleInstantCashBack?&ajaxSource=true&deal_code=**&SessionKey="+SessionKey+"&EmailId=&isBestCoupon=undefined";
    var postFields = {};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
    details = JSON.stringify(details);
    arrayMsg = [];
    displayACIcon(selectorACIcon, parent, position, 11, details);
  }
  else{
    setTimeout(autoCouponInititate, 1000);
  }
}

savings = [];
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;
var deleteAC = 0;

function startSaving(data){
  data = JSON.parse(data);
  var nowCode = "";
  var nowSaving = "";
  var csaving = 0;
  var ecashsaving = 0;
  var resp = data[0].data;
  var code = data[0].code.trim();
  var cpnMsg = "";
  var couponAt = 1288;
  var savingsObject = {};
  nowCode = code;
  respYatra = resp;
  if(resp != "" && code != ""){
    if(resp.isValid != "false" && resp.cashBackCode && resp.cashBackCode.trim().toUpperCase() == code.toUpperCase()){
      if(resp.discountAmount){
        csaving = resp.discountAmount;
        csaving = filter_price(csaving);
      }
      if(isNaN(csaving)){
        csaving = 0
      }
      else if(csaving > bestSaving){
        bestSaving = csaving;
        bestCoupon = code;
      }
    }
    if(resp.message && resp.message){
      cpnMsg = resp.message.trim();
      arrayMsg.push([code, encodeURIComponent(cpnMsg), couponAt]);
    }
    else if(resp.msg){
      cpnMsg = resp.msg.trim();
      arrayMsg.push([code, encodeURIComponent(cpnMsg), couponAt]);
    }
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashsaving;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  displayEachCpnSaving(code, csaving, ecashsaving);
  doneSavingCheck++;
  removeIfApplidMMT(csaving, code).then(function(argss){
    if(doneSavingCheckFn() == 1){
      applyBestCoupon();
      if(localStorage.anaSent!=1 && parseInt(bestSaving) != 0 && bestSaving!="" && !isNaN(parseInt(bestSaving))){
      localStorage.anaSent = 1;
      var host=window.location.host;
      var jsonArr = [{'type': 'finish1','website':host}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr,22,doNothing, []);
      tracer(1,4);
      setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);
    }
    }
    else{
      displayAutoSaving(bestSaving);
    }
  });
}

function removeIfApplidMMT(csaving, code){
  return new Promise(function(resolve, reject){

    if(csaving == 0 || code.trim() == ""){
      resolve("done");
    }
    else if(code.trim() != ""){
      $.get("https://cheapfaresindia.makemytrip.com/international/handleRemoveInstantCashBack?&ajaxSource=true&deal_code="+code.trim()+"&SessionKey="+SessionKey+"&oldSessionKey=null&cdfFlag=false").success(function(data){
        resolve("done");
      })
      .fail(function(data){
        resolve("done");
      });

    }
  });
}

var mainClick = 0;
var clcikedRemove = 0;
var deleteAC = 0;

function applyBestCoupon(){
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){

    if($(".cpn_offer").length > 0 && $(".cpn_offer .close_cpnoffer").length > 0){
      document.getElementsByClassName("cpn_offer")[0].getElementsByClassName("close_cpnoffer")[0].click();
    }
    else if($(".ecopon_success").length > 0 && $(".ecopon_success .btn").length > 0){
      document.getElementsByClassName("ecopon_success")[0].getElementsByClassName("btn")[0].click();
    }
    if($(".ecopon_success").length == 0 && $(".ecopon_success .btn").length == 0  && $(".discount_promo_info").length > 0 && $(".discount_promo_info .input-md").length > 0 && $(".discount_promo_info .btn").length > 0){
      // $(".discount_promo_info .form-control:eq(0)").val(bestCoupon.trim());
      var s = document.createElement('script');
      s.src = chrome.extension.getURL('checkAngular.js');
      var idSelector = document.createElement("div");
      idSelector.id = "idSelectorHK";
      idSelector.innerText= ".discount_promo_info .form-control:eq(0)";

      var idCode =document.createElement("div");
      idCode.id = "idCodeHK";
      idCode.innerText= bestCoupon.trim();

      var idClick =document.createElement("div");
      idClick.id = "idClickHK";
      idClick.innerText= ".input-group-addon:visible";

      s.onload = function(pincode) {
      };
      (document.head || document.documentElement).appendChild(s);
      (document.head || document.documentElement).appendChild(idSelector);
      (document.head || document.documentElement).appendChild(idCode);
      (document.head || document.documentElement).appendChild(idClick);
      // document.getElementsByClassName("discount_promo_info")[0].getElementsByClassName("btn")[0].click()
      displayFinalSavings();
    }
    else {

      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    displayNoSavings();
  }
  if(deleteAC == 0){
    if(arrayMsg.length > 0 && arrayMsg.length != ""){
      arrayMsg = JSON.stringify(arrayMsg);
      var jsonArr = [{'cpn_msg': arrayMsg}];
      jsonArr = JSON.stringify(jsonArr);
      deleteAC = 1;
      sendMessage(1, jsonArr, 12, doNothing, []);
      arrayMsg = [];
    }
  }
}
