var arrayMsg = [];
function sendCoupon(){
  $ = jQuery.noConflict();
  couponToSend = [];
  var cur_link = window.location.href;
  var couponAt = 1293;
  var couponUrl = "";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  if(cur_link.split("/offer/").length > 1){

    if($('.offer_DealsContainer li').length > 0){
      var slider = $('.offer_DealsContainer li');
      var sliderLength = slider.length;
      couponUrl = "";
      couponCode = "";
      couponText = "";
      couponDesc = "";
      couponExp = 0;

      for(i=0;i<sliderLength;i++){
       couponUrl = cur_link;
       couponCode = "";
       couponText = "";
       couponDesc = "";

       if($('.offer_DealsContainer li:eq('+ i +')').find(".minHTitle").length > 0){
        couponText = $('.offer_DealsContainer li:eq('+ i +')').find(".minHTitle:eq(0)").text().trim();
        if(couponText.split("Use code:").length > 1){
          couponCode = couponText.split("Use code:")[1].trim();
          couponCode = couponCode.split(" ")[0].trim();
        }
        else if(couponText.split("Use code").length > 1){
          couponCode = couponText.split("Use code")[1].trim();
          couponCode = couponCode.split(" ")[0].trim();
        }
        else if(couponText.split("Coupon Code : ").length > 1){
          couponCode = couponText.split("Coupon Code : ")[1].trim();
          couponCode = couponCode.split(" ")[0].trim();
        }
        else{
          couponCode = "NO CODE REQUIRED";
        }

        if($('.offer_DealsContainer li:eq('+ i +')').find(".minHTitle:eq(0)").parent().find(".date").length > 0){
          couponExp = $('.offer_DealsContainer li:eq('+ i +')').find(".minHTitle:eq(0)").parent().find(".date").text().trim();

          if(couponExp.split(",").length > 1){
            couponExp1 = couponExp.split(",")[1].trim();
            couponExp4 = couponExp.split(",")[0].trim();
            couponExp2 = couponExp4.split(" ")[1].trim();
            couponExp3 = couponExp4.split(" ")[0].trim();

            if(couponExp3.toUpperCase().split("JAN").length > 1){
              couponExp3 = "01";
            }
            else if(couponExp3.toUpperCase().split("FEB").length > 1){
              couponExp3 = "02";
            }
            else if(couponExp3.toUpperCase().split("MAR").length > 1){
              couponExp3 = "03";
            }
            else if(couponExp3.toUpperCase().split("APR").length > 1){
              couponExp3 = "04";
            }
            else if(couponExp3.toUpperCase().split("MAY").length > 1){
              couponExp3 = "05";
            }
            else if(couponExp3.toUpperCase().split("JUN").length > 1){
              couponExp3 = "06";
            }
            else if(couponExp3.toUpperCase().split("JUL").length > 1){
              couponExp3 = "07";
            }
            else if(couponExp3.toUpperCase().split("AUG").length > 1){
              couponExp3 = "08";
            }
            else if(couponExp3.toUpperCase().split("SEP").length > 1){
              couponExp3 = "09";
            }
            else if(couponExp3.toUpperCase().split("OCT").length > 1){
              couponExp3 = "10";
            }
            else if(couponExp3.toUpperCase().split("NOV").length > 1){
              couponExp3 = "11";
            }
            else if(couponExp3.toUpperCase().split("DEC").length > 1){
              couponExp3 = "12";
            }

            couponExp = couponExp1+"-"+couponExp3+"-"+couponExp2+" 23:59:59";

          }
        }

      }

      if($('.offer_DealsContainer li:eq('+ i +')').attr("data-url").length > 0){
        couponUrl = $('.offer_DealsContainer li:eq('+ i +')').attr("data-url").trim();
      }
      else{
        couponUrl = cur_link;
      }
      if(couponUrl.split("http").length < 2){
        couponUrl = "https:"+couponUrl;
      }
      if(couponCode != couponCode.toUpperCase()){
        couponCode = "";
      }
      if(couponCode.split(",").length > 1){
        couponCode = couponCode.split(",");
        couponCode = couponCode[0].trim();
      }
      if(couponText.split("Coupon Code").length > 1 && couponCode == "NO CODE REQUIRED"){
        couponCode = "";
      }
      if(couponCode != ""){
        couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
      }

    }     

  }

  if($('.offer-details').length > 0){
   couponUrl = "http://www.yatra.com/";
   couponCode = "";
   couponText = "";
   couponDesc = "";
   couponCode = $('.offer-details .bxs:eq(1) p:eq(1)').text().trim();
   couponUrl = cur_link;

   if($('.offers-wrapper').length > 0){
    couponText = $('.offers-wrapper .details-box:eq(0) .heading:eq(0)').text().trim();
    couponDesc = $('.offers-wrapper .details-box:eq(0) .content:eq(0)').text().trim();
  }

  if($('.offer-details .valid-till').length > 0){
    couponExp = $('.offer-details .valid-till:eq(0) strong:eq(0)').text().trim();
    if(couponExp.split(",").length > 1){
      couponExp1 = couponExp.split(",")[1].trim();
      couponExp4 = couponExp.split(",")[0].trim();
      couponExp2 = couponExp4.split(" ")[1].trim();
      couponExp3 = couponExp4.split(" ")[0].trim();

      if(couponExp3.toUpperCase().split("JAN").length > 1){
        couponExp3 = "01";
      }
      else if(couponExp3.toUpperCase().split("FEB").length > 1){
        couponExp3 = "02";
      }
      else if(couponExp3.toUpperCase().split("MAR").length > 1){
        couponExp3 = "03";
      }
      else if(couponExp3.toUpperCase().split("APR").length > 1){
        couponExp3 = "04";
      }
      else if(couponExp3.toUpperCase().split("MAY").length > 1){
        couponExp3 = "05";
      }
      else if(couponExp3.toUpperCase().split("JUN").length > 1){
        couponExp3 = "06";
      }
      else if(couponExp3.toUpperCase().split("JUL").length > 1){
        couponExp3 = "07";
      }
      else if(couponExp3.toUpperCase().split("AUG").length > 1){
        couponExp3 = "08";
      }
      else if(couponExp3.toUpperCase().split("SEP").length > 1){
        couponExp3 = "09";
      }
      else if(couponExp3.toUpperCase().split("OCT").length > 1){
        couponExp3 = "10";
      }
      else if(couponExp3.toUpperCase().split("NOV").length > 1){
        couponExp3 = "11";
      }
      else if(couponExp3.toUpperCase().split("DEC").length > 1){
        couponExp3 = "12";
      }

      couponExp = couponExp1+"-"+couponExp3+"-"+couponExp2+" 23:59:59";

    }
  }
  if(couponCode != couponCode.toUpperCase()){
    couponCode = "";
  }
  if(couponCode.split(",").length > 1){
    couponCode = couponCode.split(",");
    couponCode = couponCode[0].trim();
  }
  if(couponCode != ""){
    couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
  }

}

}
if(couponToSend.length > 0){
  couponToSend = JSON.stringify(couponToSend);
  var jsonArr = [{'couponsExt': couponToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 15, doNothing, []);  
}
}
sendCoupon();

// function getAppliedCoupon(){
//   $ = jQuery.noConflict();
//   console.log("getAppliedCoupon was called ");
//   if($("#promoListInput.promo-selected").length > 0){
//     var coupon = $("#promoListInput.promo-selected").val().trim();
//     var someDate = new Date();
//     var numberOfDaysToAdd = 5;
//     someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
//     var dd = someDate.getDate();
//     var mm = someDate.getMonth() + 1;
//     var y = someDate.getFullYear();
//     if(mm < 10){
//       mm = "0"+mm;
//     }
//     if(dd < 10){
//       dd = "0"+dd;
//     }
//     var expTime = y + '-'+ mm + '-'+ dd + " 23:59:59";
//     if(coupon != "" && coupon == coupon.toUpperCase()){
//       var jsonArr = [{'coupon': encodeURIComponent(coupon.trim()), 'url':"https://www.yatra.com/", 'expTime': expTime, 'webID': 1293}];
//       jsonArr = JSON.stringify(jsonArr);
//       // console.log("coupon Found: "+coupon)
//       sendMessage(1, jsonArr, 38, doNothing, []);
//     }
//   } 
//   else{
//     setTimeout(getAppliedCoupon, 500);
//   }
// }
var cur_url = window.location.href;
if(cur_url.split("secure.yatra.com/checkout-ui").length > 1){
  var checkPick = "#promoListInput.promo-selected";
  var selector = "#promoListInput.promo-selected";
  var attr = "";
  var webID = 1293;
  var homeLink = "https://www.yatra.com/";
  pickAppliedCpn(checkPick, selector, attr, webID, homeLink);


  $('body').append("<div id='ourSearchKey_superPnr' style='display:none;'></div>")
  var scr = document.createElement("script");
  scr.type="text/javascript";
  var check_json = "document.getElementById('ourSearchKey_superPnr').innerHTML= checkoutOptions.jsonData.superPnr ";
  scr.innerHTML = check_json;
  document.body.appendChild(scr);

  $('body').append("<div id='ourSearchKey_ftype' style='display:none;'></div>")
  var scr1 = document.createElement("script");
  scr1.type="text/javascript";
  var check_json1 = "document.getElementById('ourSearchKey_ftype').innerHTML= checkoutOptions.jsonData.data.ftype ";
  scr1.innerHTML = check_json1;
  document.body.appendChild(scr1);

  $('body').append("<div id='ourSearchKey_pricingId' style='display:none;'></div>")
  var scr3 = document.createElement("script");
  scr3.type="text/javascript";
  var check_json3 = "document.getElementById('ourSearchKey_pricingId').innerHTML= checkoutOptions.jsonData.pricingId ";
  scr3.innerHTML = check_json3;
  document.body.appendChild(scr3);

  $('body').append("<div id='ourSearchKey_totalAmount' style='display:none;'></div>")
  var scr4 = document.createElement("script");
  scr4.type="text/javascript";
  var check_json4 = "document.getElementById('ourSearchKey_totalAmount').innerHTML= checkoutOptions.jsonData.oldPrice ";
  scr4.innerHTML = check_json4;
  document.body.appendChild(scr4);



  if($("#promoListInput").length > 0 && $("#couponClick").length == 0){

   if($('#ourSearchKey_superPnr').length > 0 && $('#ourSearchKey_superPnr').text().trim() != ""){
     var superPnr = $('#ourSearchKey_superPnr').text().trim();
   }
   if($('#ourSearchKey_ftype').length > 0 && $('#ourSearchKey_ftype').text().trim() != ""){
     var ftype = $('#ourSearchKey_ftype').text().trim();
   }
   if($('#ourSearchKey_pricingId').length > 0 && $('#ourSearchKey_pricingId').text().trim() != ""){
     var pricingId = $('#ourSearchKey_pricingId').text().trim();
   }
   if($('#ourSearchKey_totalAmount').length > 0 && $('#ourSearchKey_totalAmount').text().trim() != ""){
     var totalAmount = $('#ourSearchKey_totalAmount').text().trim();
   }

   var selectorACIcon = "#promoListInput";
   var position = "after";
   var parent = "none";
   var method = "POST";
   var wedID = 17;
   var api = "https://secure.yatra.com/air-pay-book-service/dom2/promocode/validateNew";
   var postFields = {"superPnr": superPnr, "flightType": ftype, "pricingId": pricingId, "totalAmount": totalAmount, "promoContext": "REVIEW", "promoCode": "**"};
   var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
   details = JSON.stringify(details);
   arrayMsg = [];
   displayACIcon(selectorACIcon, parent, position, wedID, details);
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
  var couponAt = 1293;
  var savingsObject = {};
  nowCode = code;
  // respYatra = resp;
  resp = JSON.parse(resp);
  if(resp != "" && code != ""){
    if(resp.success == "true"){
      if(resp.cash && resp.cash.discountAmount){
        csaving = resp.cash.discountAmount;
        csaving = filter_price(csaving);
      }
      if(resp.eCash && resp.eCash.discountAmount){
        ecashsaving = resp.eCash.discountAmount;
        ecashsaving = filter_price(ecashsaving);
      }

      if(isNaN(csaving)){
        csaving = 0
      }
      else if(csaving > bestSaving){
        bestSaving = csaving;
        bestCoupon = code;
      }
      if(isNaN(ecashsaving)){
        ecashsaving = 0
      }
      else if(ecashsaving > bestEcash){
        bestEcash = ecashsaving;
        bestECoupon = code;
      }
      if(resp.success){
        cpnMsg = "";
        arrayMsg.push([code, cpnMsg, couponAt]);
      }
    }
    else{
      if(resp.success == "false" && resp.failureMessage){
        cpnMsg = resp.failureMessage.trim();
        arrayMsg.push([code, encodeURIComponent(cpnMsg), couponAt]);
      }
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
}

var mainClick = 0;
var clcikedRemove = 0;
function applyBestCoupon(){
  // console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  // console.log("applyBest was called with ecode : "+bestECoupon+ " savings : "+bestEcash);
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "") || (parseInt(bestEcash) != 0 && bestECoupon.trim() != "")){

    if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
      var applyBestCode = bestCoupon;
    }
    else{
      var applyBestCode = bestECoupon.trim();
      bestCoupon = bestECoupon;
      bestSaving = bestEcash;
    }
    console.log("bestSaving "+bestSaving);
    console.log("bestCoupon "+bestCoupon);

    if(document.getElementsByClassName("promo-select-ui").length > 0 && document.getElementsByClassName("promo-select-ui")[0].getElementsByClassName("fa-times-circle").length > 0 && clcikedRemove == 0){
      document.getElementsByClassName("promo-select-ui")[0].getElementsByClassName("fa-times-circle")[0].click();
      clcikedRemove = 1;
    }
    
    if($(".promo-txt").length > 0){
      document.getElementsByClassName("promo-txt")[0].click();
      var s = document.createElement('script');
      s.src = chrome.extension.getURL('checkAngular.js');
      var idSelector = document.createElement("div");
      idSelector.id = "idSelectorHK";
      idSelector.innerText= "#promoListInput";

      var idCode =document.createElement("div");
      idCode.id = "idCodeHK";
      idCode.innerText= applyBestCode;

      var idClick =document.createElement("div");
      idClick.id = "idClickHK";
      idClick.innerText= ".promo-btn:visible";

      s.onload = function(pincode) {
      };
      (document.head || document.documentElement).appendChild(s);
      (document.head || document.documentElement).appendChild(idSelector);
      (document.head || document.documentElement).appendChild(idCode);
      (document.head || document.documentElement).appendChild(idClick);
      displayFinalSavings();
    }
    else{
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
    // console.log("cpn_msg JSON: "+jsonArr);
    deleteAC = 1;
    sendMessage(1, jsonArr, 12, doNothing, []);
    arrayMsg = [];
  }
}
}
