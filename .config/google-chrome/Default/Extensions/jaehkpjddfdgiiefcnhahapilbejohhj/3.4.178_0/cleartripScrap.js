var arrayMsg = [];
var deleteAC = 0;
function sendCoupon(){
  $ = jQuery.noConflict();
  couponToSend = [];
  var cur_link = window.location.href;
  var couponUrl = "";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  var couponAt = 1289;
  couponUrl = "www.cleartrip.com/";
  couponCode = "";
  couponText = "";
  couponDesc = "";

  if(cur_link.split("/offers").length > 1){
    couponUrl = cur_link;
    couponCode = "";
    couponText = "";
    couponDesc = "";
    if($("#block-system-main table:eq(0) tr:eq(0) .rtecenter:eq(1)").text().toUpperCase().split("CODE").length > 1){

      couponCode = $("#block-system-main table:eq(0) tr:eq(1) .rtecenter:eq(1)").text().trim();
      if(couponCode.toUpperCase() != couponCode){
        couponCode = "";
      }
      couponText = $("#page-title").text().trim();

      if($("#block-system-main .simplebullet").length > 0){
        couponDesc = $("#block-system-main .simplebullet:eq(0)").text().trim();
      }
      else{
        couponDesc = $("#block-system-main ul:eq(0) li").text().trim();
      }
      if(couponDesc.split(couponCode).length < 2){
        couponDesc = "";
      }
      if(couponText.split("\n").length > 1){
        couponText = couponText.split("\n").join(" ").trim();
      }
      if(couponDesc.split("\n").length > 1){
        couponDesc = couponDesc.split("\n").join(" ").trim();
      }
      if($("#block-system-main table:eq(0) tr:eq(0) .rtecenter:eq(2)").text().toUpperCase().split("VALID TILL").length > 1){
        couponExp = $("#block-system-main table:eq(0) tr:eq(1) .rtecenter:eq(2)").text().trim();
        if(couponExp != "" && couponExp != undefined && couponExp.split(" ").length > 2){
          couponExp1 = couponExp.split(" ");
          couponExp1 = couponExp1[0].trim();
          couponExp2 = couponExp.split(" ");
          couponExp2 = couponExp2[1].trim();
          couponExp3 = couponExp.split(" ");
          couponExp3 = couponExp3[2].trim();
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
          else if(couponExp2.toUpperCase().split("OPT").length > 1){
            couponExp2 = "10"; 
          }
          else if(couponExp2.toUpperCase().split("NOV").length > 1){
            couponExp2 = "11"; 
          }
          else if(couponExp2.toUpperCase().split("DEC").length > 1){
            couponExp2 = "12"; 
          }
          couponExp = couponExp3+"-"+couponExp2+"-"+couponExp1+" 23:59:59";
        }
        else{
          couponExp = 0;
        }
      }
      if($(".views-label-field-expiration-date").length > 0){
        var exp_status = $(".views-label-field-expiration-date").text().trim();
        if(exp_status.toUpperCase().split("EXPIRED SINCE").length > 1){
          var expired = 1;
        }
        else if(exp_status.toUpperCase().split("EXPIRES IN").length > 1){
          var expired = 0;
        }
      }
      else{
        var expired = 0;
      }
      if(couponCode != ""){
        couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link), expired]);
      }
    }
    else if($("#block-system-main").length > 0){

      slider = $("#block-system-main ul");
      sliderLength = slider.length;

      for(i=0;i<sliderLength;i++){
        couponUrl = cur_link;
        couponCode = "";
        couponText = "";
        couponDesc = "";
        couponExp = 0;
        cp = "";
        couponDesc = $("#block-system-main ul:eq("+i+")").text().trim();
        couponText = $("#page-title").text().trim();

        if(couponDesc.split("coupon code ").length > 1){
          cp = couponDesc.split("coupon code ");
          cp = cp[1];
          if(cp.split(" ").length > 1){
            cp = cp.split(" ");
            cp = cp[0].trim();
          }
          else if(cp.split(",").length > 1){
            cp = cp.split(",");
            cp = cp[0].trim();
          }
          else if(cp.split(".").length > 1){
            cp = cp.split(".");
            cp = cp[0].trim();
          }
          if(cp == cp.toUpperCase()){
            couponCode = cp;
          }
          else{
            couponCode = "";
          }
        }
        if(couponText.split("\n").length > 1){
          couponText = couponText.split("\n").join(" ").trim();
        }
        if(couponDesc.split("\n").length > 1){
          couponDesc = couponDesc.split("\n").join(" ").trim();
        }

        if($(".views-label-field-expiration-date").length > 0){
          var exp_status = $(".views-label-field-expiration-date").text().trim();
          if(exp_status.toUpperCase().split("EXPIRED SINCE").length > 1){
            var expired = 1;
          }
          else if(exp_status.toUpperCase().split("EXPIRES IN").length > 1){
            var expired = 0;
          }
        }
        else{
          var expired = 0;
        }

        if(couponCode != ""){
          couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link), expired]);
        }
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
var cur_url = window.location.href;
if(cur_url.split(".cleartrip.com/").length > 1 && cur_url.split("/itinerary/").length > 1){
  var checkPick = "#ValidCoupon";
  var selector = "#coupon";
  var attr = "";
  var webID = 1289;
  var homeLink = "https://www.cleartrip.com/";
  pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

  var selectorACIcon = "#couponCodeBlock";
  var position = "after";
  var parent = "none";
  var method = "POST";
  var itcode = window.location.href;
  itcode = itcode.split("/itinerary/");
  itcode = itcode[itcode.length-1];
  itcode = itcode.split("/");
  itcode = itcode[0].trim();
  var categ = window.location.href;
  categ = categ.split("/itinerary/");
  categ = categ[0];
  categ = categ.split(".com/");
  categ = categ[1].trim(); 
  var api = "https://www.cleartrip.com/"+categ+"/itinerary/"+itcode+"/apply-coupon";
  var postFields = {"coupon": "**", "isCheckSavings": true};
  var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
  details = JSON.stringify(details);
  arrayMsg = [];
  displayACIcon(selectorACIcon, parent, position, 13, details);
} 

savings = [];
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;

function startSaving(data){
  data = JSON.parse(data);
  var couponAt = 1289;
  var nowCode = "";
  var nowSaving = "";
  var resp = data[0].data;
  var code = data[0].code.trim();
  nowCode = code;
  var ecashsaving = 0;
  var csaving = 0;
  var savingsObject = {};

  resp = resp.responseText;
  resp = JSON.parse(resp);
  if(resp != "" && code != ""){
    if(resp.details && resp.details[0].coupon_type != "error"){
      respYatra = resp;
      if(resp.amount){
        ecashsaving = resp.amount;
        ecashsaving = filter_price(ecashsaving);
      }
      csaving = 0
      if(isNaN(ecashsaving)){
        ecashsaving = 0
      }
      else if(ecashsaving > bestEcash){
        bestEcash = ecashsaving;
        bestECoupon = code;
        console.log("bestECoupon: "+bestECoupon+" bestEcash: "+bestEcash);
      }
      console.log("code: "+nowCode+" nowSaving "+nowSaving);
    }

    if(resp.details && resp.details[0].message){
      cpnMsg = resp.details[0].message.trim();
      cpnMsg = cpnMsg.replace(/(<([^>]+)>)/ig,"");
      arrayMsg.push([code, encodeURIComponent(cpnMsg), couponAt ]);
    }
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashsaving;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  displayEachCpnSaving(code, csaving. ecashsaving);
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

function applyBestCoupon(){
  console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  console.log("applyBest was called with code : "+bestECoupon+ " savings : "+bestEcash);
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "") || (parseInt(bestEcash) != 0 && bestECoupon.trim() != "")){

    if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
      var applyBestCode = bestCoupon;
    }
    else{
      var applyBestCode = bestECoupon.trim();
      bestCoupon = bestECoupon;
      bestSaving = bestEcash;
    }
    // if(document.getElementById("coupon") && document.getElementById("coupon")[0].getElementById("check_saving")){
    //   document.getElementById("coupon")[0].getElementById("check_saving").click();
    // }
    var selec = [];
    selec[0] = "#coupon";
    selectorExists(selec, 1).then(function(data){
      if($("#check_saving").length > 0){
        $("#coupon").val(applyBestCode.trim());
        document.getElementById("check_saving").click();
        displayFinalSavings();
      }
      else{
        setTimeout(applyBestCoupon, 1000);
      }
    });

  }
  else{
    displayNoSavings();
    console.log("Show no savings popup");
  }

  if(deleteAC == 0){
    if(arrayMsg.length > 0 && arrayMsg.length != ""){
      arrayMsg = JSON.stringify(arrayMsg);
      var jsonArr = [{'cpn_msg': arrayMsg}];
      jsonArr = JSON.stringify(jsonArr);
      console.log("cpn_msg JSON: "+jsonArr);
      deleteAC = 1;
      sendMessage(1, jsonArr, 12, doNothing, []);
      arrayMsg = [];
    }
  }
}
