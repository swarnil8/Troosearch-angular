function sendCoupon(){
 $ = jQuery.noConflict();
 couponToSend = [];
 var cur_link = window.location.href;
 var couponUrl = "";
 var couponCode = "";
 var couponText = "";
 var couponDesc = "";
 var couponExp = 0;
 var couponAt = 1294;
 var slider = "";
 var sliderLength = 0;

 if(cur_link.split("/offers/").length > 1){

   if($('.container-fluid table:eq(0) tr').length > 0){
     slider = $('.container-fluid table:eq(0) tr');
     sliderLength = slider.length;
     couponUrl = "";
     couponCode = "";
     couponText = "";
     couponDesc = "";
     couponExp = 0;
     couponAt = 1294;

     for(i=1;i<sliderLength;i++){
       couponUrl = cur_link;
       couponCode = "";
       couponText = "";
       couponDesc = "";

       if($('.container-fluid table:eq(0) tr:eq('+ i +')').find("td").length > 0){
        couponCode = $('.container-fluid table:eq(0) tr:eq('+ i +')').find("td:eq(2)").text().trim();
        if(couponCode != couponCode.toUpperCase()){
          couponCode = "";
        }
        if(!couponCode.match(/^(?![0-9]*$)[a-zA-Z0-9]+$/)){
          couponCode = "";
        }


      }

      if($('.container-fluid table:eq(0) tr:eq('+ i +')').find("td").length > 0){
        couponText = $('.container-fluid table:eq(0) tr:eq('+ i +')').find("td:eq(0)").text().trim();
        if(couponText.toUpperCase() == "CODE"){
          couponCode = "";
        }
        couponText = couponText+" "+$('.container-fluid table:eq(0) tr:eq('+ i +')').find("td:eq(1)").text().trim();
      }
      if(couponText.split("\n").length > 1){
        couponText = couponText.split("\n").join(" ").trim();
      }
      if(couponDesc.split("\n").length > 1){
        couponDesc = couponDesc.split("\n").join(" ").trim();
      }
      if($("#expiry-div").length > 0 && $("#expiry-div").text().toUpperCase().trim().split("OFFER HAS EXPIRED").length > 1){
        couponCode = "";
      }
      if(couponCode != "" && !isNaN(couponCode) == false){
        checkUpdated = 2;
        couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)], checkUpdated);
      }

    }     

  }



//   if($('.bot_bor table:eq(0) tr').length > 0){
//     slider = $('.bot_bor table:eq(0) tr');
//     sliderLength = slider.length;
//     couponUrl = "";
//     couponCode = "";
//     couponText = "";
//     couponDesc = "";
//     couponExp = 0;
//     couponAt = 1294;

//     for(i=1;i<sliderLength;i++){
//      couponUrl = cur_link;
//      couponCode = "";
//      couponText = "";
//      couponDesc = "";

//      if($('.bot_bor table:eq(0) tr:eq('+ i +')').find("td").length > 0){
//       couponCode = $('.bot_bor table:eq(0) tr:eq('+ i +')').find("td:eq(2)").text().trim();
//       if(couponCode != couponCode.toUpperCase()){
//         couponCode = "";
//       }
//     }

//     if($('.bot_bor table:eq(0) tr:eq('+ i +')').find("td").length > 0){
//       couponText = $('.bot_bor table:eq(0) tr:eq('+ i +')').find("td:eq(0)").text().trim();

//       if(couponText.toUpperCase() == "CODE"){
//         couponCode = "";
//       }
//       couponText = couponText+" "+$('.bot_bor table:eq(0) tr:eq('+ i +')').find("td:eq(1)").text().trim();


//     }
//     if(couponText.split("\n").length > 1){
//       couponText = couponText.split("\n").join(" ").trim();
//     }
//     if(couponDesc.split("\n").length > 1){
//       couponDesc = couponDesc.split("\n").join(" ").trim();
//     }
//     if(couponCode != "" && !isNaN(couponCode) == false){
//       couponToSend.push([(couponCode), (couponText), couponExp, (couponUrl), (couponDesc), couponAt, (cur_link)]);
//     }

//   }     

// }

if($('#main-above-content .offers_info').length > 0){
  couponUrl = cur_link;
  couponCode = "";
  couponText = " ";
  couponDesc = "";

  if($('#main-above-content .offers_info').find(".promocode").length > 0){
    couponCode = $('#main-above-content .offers_info').find(".promocode:eq(0)").text().trim();

    if(couponCode.toUpperCase() == "NOT REQUIRED"){
      couponCode = "NO CODE REQUIRED";
    }
    else if(couponCode == couponCode.toUpperCase() || $($('#main-above-content .offers_info').find(".promocode:eq(0)").css("text-transform") == "uppercase")){
    }
    else{
      couponCode = "";
    }
    if(couponCode.toUpperCase() == "SEE BELOW"){
      couponCode = "";
    }
    if(!couponCode.match(/^(?![0-9]*$)[a-zA-Z0-9]+$/) && couponCode != "NO CODE REQUIRED"){
      couponCode = "";
    }
  }

  if($(".offer_sub_detail").length > 0){
    for(i=0;i<$(".offer_sub_detail").length;i++){
      couponText = couponText + " " + $(".offer_sub_detail:eq("+ i +")").parent().text().trim();
    }
  }
  if(couponText.split("\n").length > 1){
    couponText = couponText.split("\n").join(" ").trim();
  }
  if(couponDesc.split("\n").length > 1){
    couponDesc = couponDesc.split("\n").join(" ").trim();
  }
  if($("#expiry-div").length > 0 && $("#expiry-div").text().toUpperCase().trim().split("OFFER HAS EXPIRED").length > 1){
    couponCode = "";
  }
  if(couponCode != "" && !isNaN(couponCode) == false){
    checkUpdated = 2;
    couponToSend.push([ encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link), checkUpdated]);
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

function createData(){
  if($("#bookingdata").length > 0 && $("#bookingdata").val() != "" && $("#faredict").length > 0 && $("#faredict").val() != "" && $("#querydata").length > 0 && $("#querydata").val() != ""){
    var bookingData = $("#bookingdata").val();
    var faredict = $("#faredict").val();
    var mealcodes = $("#mealCodes").val();
    var querydata = $("#querydata").val();
    localStorage.goibiboPostFields = bookingData+"~*~"+faredict+"~*~"+mealcodes+"~*~"+querydata;
    return(bookingData+"~*~"+faredict+"~*~"+mealcodes+"~*~"+querydata);
  }
  else{
    setTimeout(createData, 500);
  }
}

createData();


var cur_url = window.location.href;
if(cur_url.split(".goibibo.com/flight-booking/").length > 1){
  if($("#promo_box").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = "#promo_box";
    var position = "after";
    var parent = "none";
    var method = "POST";
    var api = "https://www.goibibo.com/gocashoffer/";
    var postFields = {};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, "site": 12}];
    details = JSON.stringify(details);
    arrayMsg = [];
    displayACIcon(selectorACIcon, parent, position, 12, details);
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
  var couponAt = 1294;
  var savingsObject = {};
  nowCode = code;
  respYatra = resp;
  if(resp != "" && code != ""){
    if(resp.promodiscount){
      csaving = resp.promodiscount;
      if(csaving < 0){
        csaving = csaving*(-1);
      }
      csaving = filter_price(csaving);
    }
    if(resp.gocash){
      ecashsaving = resp.gocash;
      if(ecashsaving < 0){
        ecashsaving = ecashsaving*(-1);
      }
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
    if(resp.promomessage){
      cpnMsg = resp.promomessage.trim();
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
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "") || (parseInt(bestEcash) != 0 && bestECoupon.trim() != "")){

    if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
      var applyBestCode = bestCoupon;
    }
    else{
      var applyBestCode = bestECoupon.trim();
      bestCoupon = bestECoupon;
      bestSaving = bestEcash;
    }
    if($("#promo_check_box").length > 0 && $("#gi_promocode").length > 0){
      document.getElementById("promo_check_box").click();
      $("#gi_promocode").val(applyBestCode);
      document.getElementById("gi_search_promo").click();
      displayFinalSavings();
    }
    else{
      setTimeout(applyBestCode, 1000);
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




//couponToSend

// https://www.goibibo.com/#flight-searchresult/#air-DEL-BOM-20161123-20161127-1-0-0-E

// https://www.goibibo.com/#flight-searchresult/#air-DEL-BOM-20161123--1-0-0-E

// https://www.goibibo.com/flights/#flight-searchresult/?from=international-flights#air-DEL-JNB-20161127-20161130-1-0-0-E

// https://www.goibibo.com/#flight-searchresult/?from=international-flights#air-DEL-JNB-20161127--1-0-0-E

// function scrapFlightData(){
//   var from = "";
//   var to = "";
//   var startDate = "";
//   var isReturn = "";
//   var adults = 1;
//   var infants = 0;
//   var children = 0;
//   var cabinClass = "";
//   var returnDate = "";
//   var flightData = [];

//   var cur_url = window.location.href;
//   var link = window.location.href;
//   if(cur_url.split("goibibo.com").length > 1 && cur_url.split("#flight-searchresult").length > 1){
//     cur_url = cur_url.split("#flight-searchresult");
//     cur_url = cur_url[1];

//     if(cur_url.split("#air-").length > 1){
//       cur_url = cur_url.split("#air-");
//       cur_url = cur_url[1];
//     }
//     from = cur_url.split("-");
//     from = from[0];

//     to = cur_url.split("-");
//     to = to[1];

//     startDate = cur_url.split("-");
//     startDate = startDate[2];

//     date1 = startDate.substring(0,4);
//     date2 = startDate.substring(4,6);
//     date3 = startDate.substring(6,startDate.length);
//     startDate = date1+"-"+date2+"-"+date3;


//     returnDate = cur_url.split("-");
//     returnDate = returnDate[3];
//     if(returnDate != ""){
//       isReturn = 1;
//       date1 = returnDate.substring(0,4);
//       date2 = returnDate.substring(4,6);
//       date3 = returnDate.substring(6,returnDate.length);
//       returnDate = date1+"-"+date2+"-"+date3;
//     }
//     else{
//       isReturn = 0;
//     }


//     adults = cur_url.split("-");
//     adults = adults[4];


//     children = cur_url.split("-");
//     children = children[5];

//     infants = cur_url.split("-");
//     infants = infants[6];

//     cabinClass = cur_url.split("-");
//     cabinClass = cabinClass[7];

//     if(cabinClass != ""){
//       if(cabinClass.split("&").length > 1){
//         cabinClass = cabinClass.split("&");
//         cabinClass = cabinClass[0];
//       }
//       if(cabinClass.split("#").length > 1){
//         cabinClass = cabinClass.split("#");
//         cabinClass = cabinClass[0];
//       }
//       if(cabinClass.split("/").length > 1){
//         cabinClass = cabinClass.split("/");
//         cabinClass = cabinClass[0];
//       }
//       cabinClass = cabinClass.split("+").join("").trim();
//     }

//     if(cabinClass == "E"){
//       cabinClass = "Economy";
//     }
//     else if(cabinClass == "F"){
//       cabinClass = "First";
//     }
//     else if(cabinClass == "W"){
//       cabinClass = "PremiumEconomy";
//     }
//     else if(cabinClass == "B"){
//       cabinClass = "Business";
//     }
//     // console.log("from : "+from);
//     // console.log("to : "+to);
//     // console.log("startDate : "+startDate);
//     // console.log("returnDate : "+returnDate);
//     // console.log("cabinClass : "+cabinClass);
//     // console.log("adults : "+adults);
//     // console.log("children : "+children);
//     // console.log("infants : "+infants);
//     // console.log("isReturn : "+isReturn);

//     flightData.push(from,to,startDate,returnDate,cabinClass,adults,children,infants,isReturn);
//   }

//   var posResults = [];
//   posResults.push({selector: 'body', attr: 'none', pos: 'before'});
//   posResults.push({selector: '.mobMoreMenu', attr: 'none', pos: 'before'});
//   posResults = JSON.stringify(posResults);
//   var posSpecs = [];
//   posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '53px', postVal: '0px'});
//   posSpecs = JSON.stringify(posSpecs);

//   if(flightData.length > 0){
//   // console.log("Flight-data: "+flightData);
//   flightData = JSON.stringify(flightData);
//   flightBanner(flightData, posResults, posSpecs);
// }
// return;
// }

// var cur_url1 = window.location.href;
// if(cur_url1.split("goibibo.com").length > 1 && cur_url1.split("#flight-searchresult").length > 1){
//   scrapFlightData();
// }

// function checkURL(){
//   var url = window.location.href;
//   if(cur_url1 != url){
//     if(url.split("goibibo.com").length > 1 && url.split("#flight-searchresult").length > 1){
//       $(".hk-compBar").remove();
//       $('body').css("margin-top", "0px")
//       scrapFlightData();
//     }
//     cur_url1 = url;
//     // console.log("Successful");
//   }
// }

// setInterval(function(){
//   checkURL();
// }, 500);

