function getBMSAutoCoupons(){
  var cur_url = window.location.href;
  if(cur_url.split("in.bookmyshow.com/payment").length > 1){
   if($("#offTabBody_disc-codes").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = "#offTabBody_disc-codes";
    var position = "after";
    var parent = "none";
    var method = "POST";
    var wedID = 1829;
    var api = "https://in.bookmyshow.com/serv/doSecureTrans.bms";
    var postFields = {};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, "site": 1829}];
    details = JSON.stringify(details);
    var emailBMS = $("#spnFilledEmail").text().trim();
    var mobBMS = $("#spnFilledMobile").text().trim();
    if(emailBMS != "" && mobBMS != ""){
      displayACIcon(selectorACIcon, parent, position, wedID, details);
    }
    else{
      setTimeout(getBMSAutoCoupons, 1000);
    }
  }
}
}
getBMSAutoCoupons();
savings = [];
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;
var deleteAC = 0;

function startSaving(data){
  var respYatra = data;
  var nowCode = "";
  var nowSaving = "";
  var csaving = 0;
  var ecashsaving = 0;
  var resp = respYatra[0].data;
  var code = respYatra[0].code.trim();
  var cpnMsg = "";
  var couponAt = 1293;
  var savingsObject = {};
  nowCode = code;
	if($(resp).find("blnSuccess").text().trim() == "true" && code != ""){
			if($(resp).find("strData")){
				csaving = $(resp).find("strData").text().trim();
				if(csaving.split("DISCOUNTAMT=").length > 1){
					csaving = csaving.split("DISCOUNTAMT=");
					csaving = csaving[1].trim();
					csaving = csaving.split("|");
					csaving = csaving[0].trim();
					csaving = filter_price(csaving);
				}
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
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){

  	if(document.getElementById('offCode_disc-codes')){
      document.getElementById('offCode_disc-codes').value = bestCoupon;
      document.getElementById('offApplyBtn_disc-codes').click();
      displayFinalSavings();
    }
  }
  else{
  	displayNoSavings();
  }
}
