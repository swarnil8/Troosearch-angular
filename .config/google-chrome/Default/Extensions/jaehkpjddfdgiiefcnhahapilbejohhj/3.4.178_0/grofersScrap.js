var arrayMsg = [];
function getPos(){
  return 2057;
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

function createData(){
  var cart = JSON.parse(localStorage.cart);
  var cart_id = cart.id;
  var mappingdata = cart.items;
  var m = 0;
  var mapping = [];
  for(mapId in mappingdata){
    var item = mappingdata[mapId];
    mapping[m] = item.products;
    m++;
  }

  var items = [];
  m2 = 0;
  for(var m1=0;m1<mapping.length;m1++){
    var products = mapping[m1];
    for(prod in products){
      price_cart = products[prod].details.newPrice;
      quantity = products[prod].count;
      items[m2] = {"mapping_id" : prod, "price" : price_cart, "quantity" : quantity};
      m2++;
    }
  }

  var postFields = {
    "id": cart_id,
    "items": items,
    "promo_code": "**"
  };
  postFields = JSON.stringify(postFields);
  localStorage.grofersPostFields = postFields;
}

var cur_url = window.location.href;
if(cur_url.split("grofers.com/checkout").length > 1){
  if($(".checkout-promo").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = ".checkout-promo:eq(0)";
    var position = "after";
    var parent = "none";
    var method = "PUT";
    var cart = JSON.parse(localStorage.cart);
    var cart_id = cart.id;

    var api = "https://grofers.com/v3/cart/".cart_id;
    var postFields = localStorage.grofersPostFields;
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, "site": 2057}];
    details = JSON.stringify(details);
    arrayMsg = [];
    if(!localStorage.grofersPostFields || localStorage.grofersPostFields == ""){
      createData();
    }
    if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
      displayFinalSavings();
      $(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
      $(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
      if($("#order-coupon").length > 0 && $(".apply-coupon").length > 0 && $(".final-total:eq(0) .coupon-code").length == 0){
        $("#order-coupon").val(localStorage.bestCoupon.trim());
      }
    }
    displayACIcon(selectorACIcon, parent, position, 2057, details);
    if($("#couponClick").length > 0){
      $("#couponClick").css("float", "right");
      $("#couponClick").css("margin-top", "-45px");
    }
  }
}

savings = [];
bestSaving = 0;
bestCoupon = "";
localStorage.grofersPostFields = "";

savings = [];
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
  if(resp != "" && code != ""){
    if(resp.promo_info && resp.promo_info.length > 0 && resp.promo_info[0].promo_code.toUpperCase().trim() == code.toUpperCase().trim() && resp.promo_info[0].applied){
      if(resp.promo_info[0].type == "cashback"){
        ecashsaving = resp.promo_info[0].amount;
        ecashsaving = filter_price(ecashsaving);
        csaving = 0;
      }
      else{
        csaving = resp.promo_info[0].amount;
        csaving = filter_price(csaving);
        ecashsaving = 0;
      }
      if(isNaN(ecashsaving)){
        ecashsaving = 0
      }
      if(isNaN(csaving)){
        csaving = 0
      }
      else if(csaving > bestSaving){
        bestSaving = csaving;
        bestCoupon = code;
        localStorage.bestSaving = bestSaving;
        localStorage.bestCoupon = code;
      }
      if(isNaN(ecashsaving)){
        ecashsaving = 0
      }
      else if(ecashsaving > bestEcash){
        bestEcash = ecashsaving;
        bestECoupon = code;
        localStorage.bestEcash = bestEcash;
        localStorage.bestECoupon = code;
      }

    }
    if(resp.promo_info && resp.promo_info[0].promo_code.toUpperCase().trim() == code.toUpperCase().trim()){
      cpnMsg = resp.promo_info[0].message;
      cpnMsg = cpnMsg.replace(/(<([^>]+)>)/ig,"");
      arrayMsg.push([code, encodeURIComponent(cpnMsg), 2057 ]);
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

function applyBestCoupon(){
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "")){

   if($(".final-total").length > 0 && $(".final-total:eq(0) .coupon-code").length > 0 && $(".final-total:eq(0) .coupon-code:eq(0)").find(".icon-swgy-cross").length > 0 && clickedRemove == 0){
    clickedRemove = 1;
    document.getElementsByClassName("final-total")[0].getElementsByClassName("coupon-code")[0].getElementsByClassName("icon-swgy-cross")[0].click();
    applyBestCoupon();
  }
  else{
    var finalPostFieldSpcl = localStorage.swiggyPostFields;
    finalPostFieldSpcl = JSON.parse(finalPostFieldSpcl);
    finalPostFieldSpcl.cart.couponCode = bestCoupon;
    finalPostFieldSpcl = JSON.stringify(finalPostFieldSpcl);
    $.ajax({
      type: "POST",
      url: api,
      dataType: "json",
      data: finalPostFieldSpcl,
      contentType: "application/json"
    }).success(function(dataa){
     localStorage.showFinalSavings = 1;
     window.location.reload();
   });
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
