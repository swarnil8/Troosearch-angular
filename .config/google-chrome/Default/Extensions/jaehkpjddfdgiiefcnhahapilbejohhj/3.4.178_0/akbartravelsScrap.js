var arrayMsg = [];
function getPos(){
  return 2241;
}
var cur_url = window.location.href;
if(cur_url.split(".akbartravels.com/Flight/Itinerary/").length > 1){

  if($(".coupon-field").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = ".coupon-field:eq(0)";
    var position = "after";
    var parent = "parent";
    var method = "GET";
    var guid = $("#guid").val();
    var service = $("#service ").val().trim();
    var PayType = $("#hdnPayType ").val().trim();
    var bank = $("#HdnBank ").val().trim();
    var Providers = $("#Providers ").val().trim();
    var NetFare = $("#NetFare ").val().trim();
    var paxCount = $("#paxCount ").val().trim();
    var journeyType = $("#journeyType ").val().trim();
    var OnwardNetFare = $("#OnwardNetFare ").val().trim();
    var ReturnNetFare = $("#ReturnNetFare ").val().trim();
    var CardMode = $("#Payment_CardMode ").val().trim();
    var cardNo = $("#Payment_Card_CardNo").val().trim();
    var sectortype = $("#hdnSectorType ").val().trim();
    var PaymentFrom = $("#PaymentFrom ").val().trim();
    var now = new Date();
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    var timeStamp = now_utc;
    var owcabin = $("#OnwardCabinClass ").val().trim()
    var trip = $("#hdntrip ").val().trim()
    var grossfare = $("#GrossFare ").val().trim()
    var basefare = $("#BaseFare ").val().trim()
    var onwarno = encodeURIComponent($("#OnwardServNo ").val().trim());
    var IsMulticity = $("#IsMulticity ").val().trim()
    var Key = $("#Key ").val().trim()
    var api = "https://www.akbartravels.com/Flight/VerifyPromoCode?promocode=**&service="+service+"&PayType="+PayType+"&bank="+bank+"&Providers="+Providers+"&NetFare="+NetFare+"&paxCount="+paxCount+"&journeyType="+journeyType+"&cardNo="+cardNo+"&OnwardNetFare="+OnwardNetFare+"&ReturnNetFare="+ReturnNetFare+"&CardMode="+CardMode+"&sectortype="+sectortype+"&PaymentFrom="+PaymentFrom+"&timeStamp="+timeStamp+"&owcabin="+owcabin+"&trip="+trip+"&grossfare="+grossfare+"&basefare="+basefare+"&onwarno="+onwarno+"&IsMulticity="+IsMulticity+"&Key="+Key+"&IsFromCorpPromo=no&EmployeeID=&objPromoParams.WalletType=";
    var postFields = {};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, site: 2241}];
    details = JSON.stringify(details);
    arrayMsg = [];
    displayACIcon(selectorACIcon, parent, position, 2241, details);
  }
}

if(!localStorage.savings || localStorage.savings == ""){
  savings = [];
}
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;




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
  if(resp.length > 0 && code != ""){
    if(resp){
      csaving = resp[0];
      csaving = filter_price(csaving);
      if(isNaN(csaving)){
        csaving = 0
      }
      else if(csaving == 0 && resp[1].trim().toLowerCase().split("congrats").length > 1){
        csaving = 1;
      }
      if(csaving > bestSaving){
        bestSaving = csaving;
        bestCoupon = code;
      }

    }
    if(resp[1] && resp[1].trim() != ""){
      cpnMsg = resp[1].trim();
      arrayMsg.push([code, encodeURIComponent(cpnMsg), 2241 ]);
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
var deleteAC = 0;
var clickedRemove = 0;
if(!localStorage.showFinalSavings){
  localStorage.showFinalSavings = 0;
}
function applyBestCoupon(){
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){
    var applyBestCode = bestCoupon;
    if($("#PromoTextCal").length > 0 && $(".redeem-bt").length > 0){
      $("#PromoTextCal").val(applyBestCode.trim());
      document.getElementsByClassName("redeem-bt")[0].click();
      displayFinalSavings();
      localStorage.showFinalSavings = 1;
      if(parseInt(bestSaving) == 1){
        changeTxt();
      }
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

function changeTxt() {
  if(localStorage.showFinalSavings == 1 && $(".hk-u-fSize--big").length > 0 && $("#DivPromoMessage").length > 0 && $("#DivPromoMessage").text().trim() != "" && ($("#DivPromoMessage").text().trim().toLowerCase().split("congrat").length > 1 || $("#DivPromoMessage").text().trim().toLowerCase().split("success").length > 1)){
    var succ_msg = $("#DivPromoMessage").text().trim();
    $(".hk-u-fSize--big").text(succ_msg);
    localStorage.showFinalSavings = 0;
  }
  else{
    setTimeout(function(){ changeTxt(); }, 1000);
  }
}
