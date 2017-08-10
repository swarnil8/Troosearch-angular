var arrayMsg = [];
function getPos(){
  return 2260;
}
var cur_url = window.location.href;
if(cur_url.split(".zoomcar.com/bangalore/bookings/checkout").length > 1){

  if($(".promo-div").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = ".promo-div:eq(0)";
    var position = "after";
    var parent = "none";
    var method = "POST";
    var api = "https://www.zoomcar.com/bookings/promo";
    var postFields = {"couponcode": "**", "clear": 0};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, site: 2260}];
    details = JSON.stringify(details);
    arrayMsg = [];
    displayACIcon(selectorACIcon, parent, position, 2260, details);
    if($("#couponClick").length > 0 && $("#couponClick").find(".hk-c-toolTips__container--left").length > 0){
      $("#couponClick").find(".hk-c-toolTips__container--left").addClass("hk-c-toolTips__container--right");
      $("#couponClick").find(".hk-c-toolTips__container--right").removeClass("hk-c-toolTips__container--left");
    }
    if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
      displayFinalSavings();
      $(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
      $(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
    }
  }
}


savings = [];
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;


if(!localStorage.savings){
  localStorage.savings = "";
}
if(!localStorage.bestSaving){
  localStorage.bestSaving = 0;
}
if(!localStorage.bestCoupon){
  localStorage.bestCoupon = "";
}

function startSaving(data){

  data = JSON.parse(data);
  var nowCode = "";
  var nowSaving = "";
  var resp = data[0].data;
  var code = data[0].code.trim();
  var csaving = 0;
  var ecashsaving = 0;
  nowCode = code;
  respYatra = resp;
  var savingsObject = {};
  // console.log("resp: ",respYatra);
  if(resp.promo && code != ""){
    if(resp.promo.discount && resp.promo.name.toUpperCase().trim() == code.toUpperCase().trim()){
      csaving = resp.promo.discount;
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
  if(resp.promo.message){
    cpnMsg = resp.promo.message;
    arrayMsg.push([code, encodeURIComponent(cpnMsg), 2260 ]);
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
var deleteAC = 0;
var clickedRemove = 0;

function applyBestCoupon(){
  // alert("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){
    var applyBestCode = bestCoupon;
    var zoomid = document.getElementsByTagName('script');
    var zoomid_final = "XAADVFZbGwAAUVhQBwYC";
    for(var z=0;z<zoomid.length;z++){
      if(document.getElementsByTagName('script')[z].innerText.split('xpid:').length > 1){
        zoomid_final = document.getElementsByTagName('script')[z].innerText.split('xpid:');
        zoomid_final = zoomid_final[1];
        zoomid_final = zoomid_final.split("}");
        zoomid_final = zoomid_final[0];
        zoomid_final = zoomid_final.split('"').join("").trim();
        // console.log("zoomid_final in loop  "+ zoomid_final);
        break;
      }
    }
    // console.log("zoomid_final here "+ zoomid_final);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.zoomcar.com/bookings/promo",
      "method": "POST",
      "headers": {
        "x-newrelic-id": zoomid_final,
        "content-type": "application/x-www-form-urlencoded",
        "accept-language": "en-US,en;q=0.8",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "x-devtools-emulate-network-conditions-client-id": "224fe3c4-bb12-47f4-a9a8-545208cfc236",
        "x-requested-with": "XMLHttpRequest",
        "x-devtools-request-id": "12084.6675",
        "cache-control": "no-cache",
        "postman-token": "579c1c53-60c6-b979-80a6-d6224ce1d3e7"
      },
      "data": {
        promo: bestCoupon,
        clear: 0
      }
    }
    $.ajax(settings).done(function (response) {
    }).then(function(){
      localStorage.showFinalSavings = 1;
      window.location.reload();
    });
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
