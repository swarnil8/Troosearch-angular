
function sendCoupon(){
  couponToSend = [];
  var cur_link = window.location.href;
  var couponUrl = "";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  var couponAt = 1288;
  couponUrl = "http://www.makemytrip.com/";
  couponCode = "";
  couponText = "";
  couponDesc = "";
  last_bread = 0;

  if(cur_link.split("/coupons").length > 1){

    slider = $("#block-mmt_commons-coupons_listing .section_box");
    sliderLength = slider.length;

    for(i=0;i<sliderLength;i++){
      couponUrl = "http://www.makemytrip.com/";
      couponCode = "";
      couponText = "";
      couponDesc = "";
      couponExp = 0;

      if( $("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .deal_code_left .din-ab").length > 0){
        couponCode = $("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .deal_code_left:eq(0) .din-ab:eq(0)").text().trim();
      }
      else{
        couponCode = "";
      }

      if(couponCode.toUpperCase() == "NO DEAL CODE REQUIRED"){
        couponCode = "NO CODE REQUIRED";
      }

      if( $("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .deal_code_left .valid_date").length > 0){
        couponExp = $("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .deal_code_left:eq(0) .valid_date:eq(0)").text().trim();

        if(couponExp.toUpperCase().split("TILL").length > 1){
          couponExp = couponExp.toUpperCase().split("TILL");
          couponExp = couponExp[1].trim();
        }

        if(couponExp.split("-").length > 1){
          couponExp1 = couponExp.split("-");
          couponExp1 = couponExp1[2].trim();
          couponExp1 = "20"+couponExp1;

          couponExp3 = couponExp.split("-");
          couponExp3 = couponExp3[0].trim();

          couponExp2 = couponExp.split("-");
          couponExp2 = couponExp2[1].trim();

          if(couponExp2.toUpperCase().split("JAN").length > 1){
            couponExp2 = "01";
          }
          else if(couponExp2.toUpperCase().split("FEB").length > 1){
            couponExp2 = "02";
          }
          else if(couponExp2.toUpperCase().split("MAR").length > 1){
            couponExp2 = "03";
          }
          else if(couponExp2.toUpperCase().split("APR").length > 1){
            couponExp2 = "04";
          }
          else if(couponExp2.toUpperCase().split("MAY").length > 1){
            couponExp2 = "05";
          }
          else if(couponExp2.toUpperCase().split("JUN").length > 1){
            couponExp2 = "06";
          }
          else if(couponExp2.toUpperCase().split("JUL").length > 1){
            couponExp2 = "07";
          }
          else if(couponExp2.toUpperCase().split("AUG").length > 1){
            couponExp2 = "08";
          }
          else if(couponExp2.toUpperCase().split("SEP").length > 1){
            couponExp2 = "09";
          }
          else if(couponExp2.toUpperCase().split("OCT").length > 1){
            couponExp2 = "10";
          }
          else if(couponExp2.toUpperCase().split("NOV").length > 1){
            couponExp2 = "11";
          }
          else if(couponExp2.toUpperCase().split("DEC").length > 1){
            couponExp2 = "12";
          }

          couponExp = couponExp1+"-"+couponExp2+"-"+couponExp3+ " 23:59:59";
        }
        else{
          couponExp = 0;
        }
      }

      if($("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right .din-regular a").length > 0){
        couponUrl = $("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right:eq(0) .din-regular a:eq(0)").attr('href').trim();
        if(couponUrl.split("javascript:void(0)").length > 1){
          couponUrl = "http://www.makemytrip.com/";
          if($("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right .modal-header").length > 0){
            couponDesc = $("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right:eq(0) .modal-header:eq(0)").text().trim();
          }
          if($("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right .modal-body p").length > 0){
            couponDesc = couponDesc + " " +$("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right:eq(0) .modal-body:eq(0) p:eq(0)").text().trim();
          }
          
        }

      }

      if($("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right .din-ab h4").length > 0){
        couponText = $("#block-mmt_commons-coupons_listing .section_box:eq("+i+") .discount_right:eq(0) .din-ab:eq(0) h4:eq(0)").text().trim();
      }

      if(couponCode != ""){
        couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), encodeURIComponent(couponExp), encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
      }
    }
  }
  else  if(cur_link.split("/promotion/includes/").length > 1){

    slider = $(".content table tbody tr");
    sliderLength = slider.length;

    for(i=0;i<sliderLength;i++){
      couponUrl = "http://www.makemytrip.com/";
      couponCode = "";
      couponText = "";
      couponDesc = "";
      couponExp = 0;

      if( $(".content table tbody tr:eq("+i+") td").length > 0){
        couponCode = $(".content table tbody tr:eq("+i+") td strong:eq(0)").text().trim();

        if(couponCode != couponCode.toUpperCase()){
          couponCode = "";
        }
      }
      else{
        couponCode = "";
      }

      if(couponCode.toUpperCase() == "NO DEAL CODE REQUIRED"){
        couponCode = "NO CODE REQUIRED";
      }

      if( $(".content table tbody tr:eq("+i+") .deal_code_left .valid_date").length > 0){
        couponExp = $(".content table tbody tr:eq("+i+") .deal_code_left:eq(0) .valid_date:eq(0)").text().trim();

        if(couponExp.toUpperCase().split("TILL").length > 1){
          couponExp = couponExp.toUpperCase().split("TILL");
          couponExp = couponExp[1].trim();
        }

        if(couponExp.split("-").length > 1){
          couponExp1 = couponExp.split("-");
          couponExp1 = couponExp1[2].trim();
          couponExp1 = "20"+couponExp1;

          couponExp3 = couponExp.split("-");
          couponExp3 = couponExp3[0].trim();

          couponExp2 = couponExp.split("-");
          couponExp2 = couponExp2[1].trim();

          if(couponExp2.toUpperCase().split("JAN").length > 1){
            couponExp2 = "01";
          }
          else if(couponExp2.toUpperCase().split("FEB").length > 1){
            couponExp2 = "02";
          }
          else if(couponExp2.toUpperCase().split("MAR").length > 1){
            couponExp2 = "03";
          }
          else if(couponExp2.toUpperCase().split("APR").length > 1){
            couponExp2 = "04";
          }
          else if(couponExp2.toUpperCase().split("MAY").length > 1){
            couponExp2 = "05";
          }
          else if(couponExp2.toUpperCase().split("JUN").length > 1){
            couponExp2 = "06";
          }
          else if(couponExp2.toUpperCase().split("JUL").length > 1){
            couponExp2 = "07";
          }
          else if(couponExp2.toUpperCase().split("AUG").length > 1){
            couponExp2 = "08";
          }
          else if(couponExp2.toUpperCase().split("SEP").length > 1){
            couponExp2 = "09";
          }
          else if(couponExp2.toUpperCase().split("OCT").length > 1){
            couponExp2 = "10";
          }
          else if(couponExp2.toUpperCase().split("NOV").length > 1){
            couponExp2 = "11";
          }
          else if(couponExp2.toUpperCase().split("DEC").length > 1){
            couponExp2 = "12";
          }

          couponExp = couponExp1+"-"+couponExp2+"-"+couponExp3+ " 23:59:59";
        }
        else{
          couponExp = 0;
        }
      }

      if($(".content table tbody tr:eq("+i+") .discount_right .din-regular a").length > 0){
        couponUrl = $(".content table tbody tr:eq("+i+") .discount_right:eq(0) .din-regular a:eq(0)").attr('href').trim();
        if(couponUrl.split("javascript:void(0)").length > 1){
          couponUrl = "http://www.makemytrip.com/";
          if($(".content table tbody tr:eq("+i+") .discount_right .modal-header").length > 0){
            couponDesc = $(".content table tbody tr:eq("+i+") .discount_right:eq(0) .modal-header:eq(0)").text().trim();
          }
          if($(".content table tbody tr:eq("+i+") .discount_right .modal-body p").length > 0){
            couponDesc = couponDesc + " " +$(".content table tbody tr:eq("+i+") .discount_right:eq(0) .modal-body:eq(0) p:eq(0)").text().trim();
          }
          
        }

      }

      if($(".content table tbody tr:eq("+i+") .discount_right .din-ab h4").length > 0){
        couponText = $(".content table tbody tr:eq("+i+") .discount_right:eq(0) .din-ab:eq(0) h4:eq(0)").text().trim();
      }

      if(couponCode != ""){
        couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), encodeURIComponent(couponExp), encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
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
sendCoupon()

$('body').append("<div id='ourSearchKey' style='display:none;'></div>")
var scr = document.createElement("script");
scr.type="text/javascript";
var a = "document.getElementById('ourSearchKey').innerHTML= JSON.stringify(window.reviewDetails)";
scr.innerHTML = a;
document.body.appendChild(scr);
var ourSearchKey = "";

function createData(){
  if($(".review_grandtotal .review_red").length > 0){
    var windowElementHK = document.getElementById("ourSearchKey").innerHTML;
    windowElementHK = JSON.parse(windowElementHK);
    var noOfAdults = windowElementHK.searchRequest.noOfAdlts;
    var noOfChildren = windowElementHK.searchRequest.noOfChd;
    var noOfInfants = windowElementHK.searchRequest.noOfInfnt;
    var deptDate = windowElementHK.searchRequest.deptDate;
    var airlineCodes1 = windowElementHK.le;
    var airlineCodes = "";
    for(var l=0;l<airlineCodes1.length;l++){
      airlineCodes += airlineCodes1[l].cc+";";
    }
    var bookingAmount = $(".review_grandtotal .review_red").text().trim();
    bookingAmount = filter_price(bookingAmount);
    var fromCity = windowElementHK.searchRequest.fromCity;
    var toCity = windowElementHK.searchRequest.toCity;
    var tripType = windowElementHK.searchRequest.tripType;
    var searchKey = windowElementHK.searchKey;
    var departureEndDate = windowElementHK.searchRequest.returnDate;
    var preTaxAmount = $(".review_detls_strp strong:eq(0)").text().trim();
    preTaxAmount = filter_price(preTaxAmount);
    preTaxAmount = parseInt(bookingAmount) - parseInt(preTaxAmount);
    return noOfAdults+"~*~"+noOfChildren+"~*~"+noOfInfants+"~*~"+deptDate+"~*~"+airlineCodes+"~*~"+bookingAmount+"~*~"+fromCity+"~*~"+toCity+"~*~"+tripType+"~*~"+searchKey+"~*~"+departureEndDate+"~*~"+preTaxAmount;
  }
  else{
    setTimeout(createData, 1000);
  }
}

var cur_url = window.location.href;
if(cur_url.split("/makemytrip/review/").length > 1){
  createData();
  var selectorACIcon = ".discount_promo_info";
  var position = "after";
  var parent = "none";
  var method = "POST";
  var api = "https://flights.makemytrip.com/makemytrip/domFlightCoupon";
  var postFields = {};
  var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, "site": 11}];
  details = JSON.stringify(details);
  arrayMsg = [];
  displayACIcon(selectorACIcon, parent, position, 11, details);
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
    if(resp.result != "FAILED"){
      if(resp.couponAmount){
        csaving = resp.couponAmount;
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
    if(resp.errorMsg && resp.errorMsg.msg){
      cpnMsg = resp.errorMsg.msg.trim();
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
var deleteAC = 0;

function applyBestCoupon(){
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){

    if($(".cpn_offer").length > 0 && $(".cpn_offer .close_cpnoffer").length > 0){
      $(".close_cpnoffer").click();
    }

    if($(".coupon_scope").length > 0 && $(".coupon_scope .input-md").length > 0 && $(".coupon_scope .btn").length > 0){
      var s = document.createElement('script');
      s.src = chrome.extension.getURL('checkAngular.js');
      var idSelector = document.createElement("div");
      idSelector.id = "idSelectorHK";
      idSelector.innerText= ".coupon_scope .form-control:eq(1)";

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


function getAppliedCpn(){
  var cur_url = window.location.href;
  if(cur_url.split("flights.makemytrip.com/makemytrip/review").length > 1){
    if($(".discount_promo_info .ecopon_success.ng-hide").length == 0 && $(".discount_promo_info .ecopon_success").length > 0){
      var checkPick = ".discount_promo_info .ecopon_success";
      var selector = ".discount_promo_info .ecopon_success input:eq(0)";
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
