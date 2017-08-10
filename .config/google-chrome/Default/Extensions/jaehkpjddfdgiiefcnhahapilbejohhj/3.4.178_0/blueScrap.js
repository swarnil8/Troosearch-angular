//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;
var arrayMsg = [];

function getCategory(){
  var category = "";
  return category;
}

function getBreadCrumb(){
  var bread = "";
  return bread;
}

function getProd(){
  var prod = "";
  if($('#details-top  h1').length > 0){
    prod = $('#details-top  h1:eq(0)').text().trim();
  }
  if($('#designContent').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";

  if($('#wrap_outer img').length > 0){
    image = $('#wrap_outer img:eq(0)').attr('src').trim();
  }

  return image;
}

function getPrice(){
  price = "";
  if($('#discountedPriceSpan').length > 0){
    price = $('#discountedPriceSpan').text().trim();
  }
  else if($('#details-top .our_price_display').length > 0){
    price = $('#details-top .our_price_display').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('#add_to_cart').css('display') == 'none'){
    avail = 0;
  }
  else if($('#add_to_cart').length == 0){
    avail = 0;
  }
  return avail;
}
function getPID(){

  var link = window.location.href;
  var pid = link;

  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];

  }
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];

  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];

  }
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm")[0];

  }
  if(pid.split("~").length > 1){
    pid = pid.split("~")[1];

  }
  return pid;



}

function returnPID(link){

  var pid = link;

  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];

  }
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];

  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];

  }
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm")[0];

  }
  if(pid.split("~").length > 1){
    pid = pid.split("~")[1];

  }
  if(link.split('bluestone.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }

  return pid;



}


// function getBreadCrumb(){
//   var breadcrumb = "";
//   var bread_final = "";
//   var len_bread = $('.header-links').find('a').length;

//   for(i=0;i<len_bread;i++){
//     breadcrumb = $('.header-links').find('a:eq('+ i +')').text().trim();
//     bread_final += breadcrumb + "*~";
//   }

//   return bread_final;


// }




// /////////////// WISH TO WATCH LIST STARTS ///////////////

var cur_url = window.location.href;
if(cur_url.split("/wishlist").length > 1 && (cur_url.split("bluestone.com").length > 1)){
  if($('.wish-list-view').length>0){
    importWishGlobal('.wish-list-view', 'before', blueWishList);
  }
}

function blueWishList(){
  wishListBlue = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 426;
  var brand = "";

  if($('.wish-list-view .product-grid:eq(0) .pgi').length > 0) {
    var slider = $('.wish-list-view .product-grid:eq(0) .pgi');
    var sliderLength = $('.wish-list-view .product-grid:eq(0) .pgi').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').attr('data-url')){
        link = $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').attr('data-url');
        url = link;
        if(link.split("bluestone.com").length < 2){
          link = "http://www.bluestone.com"+link;
          url = link;
        }
        PID = returnPID(link);
      }
      else{
        link = "";
        PID = "";
      }
      price = 0;

      if($('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.title').length > 0){
        prod = $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.title:eq(0)').text().trim();
        if(prod.split("...").length > 1){
          prod = prod.split("...");
          prod = prod[0].trim();
        }
        prod = prod.split("&nbsp;");
        prod = prod.join(" ");
        prod = prod.trim();
      }
      if($('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.pr-i').length > 0 && $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.pr-i').attr("data-original")){
        image = $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.pr-i:eq(0)').attr('data-original').trim();
      }
      else if($('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.p-image img').length > 0 && $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.p-image img:eq(0)').attr('data-hu')){
        image = $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.p-image img:eq(0)').attr('data-hu').trim();
      }
      else if($('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.p-image img').length > 0 && $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.p-image img:eq(0)').attr('src')){
        image = $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.p-image img:eq(0)').attr('src').trim();
      }
      if($('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.price').length > 0 && $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.price .new-price').length > 0){
        price = $('.wish-list-view .product-grid:eq(0) .pgi:eq('+ i +')').find('.price:eq(0) .new-price:eq(0)').text().trim();
        price = filter_price(price);
      }

      if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
        wishListBlue.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
      }
    }

    wishJson = JSON.stringify(wishListBlue);
    var jsonArr = [{'wishList': wishJson}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 17, alertWLResp, []);
  }

}
function alertWLResp(data){
  alert(data);
}

if(cur_url.split(".bluestone.com/order").length > 1){
  var checkPick = "#display_cart_vouchers .voucher_name";
  var selector = "#display_cart_vouchers .voucher_name:eq(0)";
  var attr = "";
  var webID = 426;
  var homeLink = "https://www.bluestone.com/";
  pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

  if($("#has-voucher").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = "#has-voucher";
    var position = "after";
    var parent = "none";
    var selectorInput = "#discountCode";
    var inputAttr = "val";
    var clickApplySelector = "#voucher-wrapper .btn-light-blue";
    var clickRemoveSelector = ".delete-discount a";
    var details = [{'selectorInput': selectorInput, "clickApplySelector": clickApplySelector, "clickRemoveSelector": clickRemoveSelector, "inputAttr" : inputAttr, "api_case": 0}];
    details = JSON.stringify(details);
    localStorage.acDetails = details;
    displayACIcon(selectorACIcon, parent, position, 28, details);
    if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
      displayFinalSavings();
      $(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
      $(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
    }
  }
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
  return new Promise(function(resolve, reject){
    var code = localStorage.lastCoupon;
    var csaving = 0;
    var bestSaving = localStorage.bestSaving;
    var bestCoupon = localStorage.bestCoupon;
    var savings = localStorage.savings;
    var savingsObject = {};
    var ecashing = 0;
    var doneSavingCheck = localStorage.doneSavingCheck;
    var couponsTotal = localStorage.getCoupons;
    couponsTotal = couponsTotal.split("~").length - 1;

    if($("#display_cart_vouchers").length > 0 && $("#display_cart_vouchers .discounted-amount").length > 0 && $("#display_cart_vouchers .discounted-amount:eq(0) .price-width").length > 0){

      csaving = $("#display_cart_vouchers .discounted-amount:eq(0) .price-width:eq(0)").text().trim();
      csaving = filter_price(csaving);
      code = $("#display_cart_vouchers .voucher_name:eq(0)").text().trim();
      if(code.split("(").length > 1){
        code = code.split("(")[1];
        code = code.split(")")[0].trim();
      }
      if(code != code.toUpperCase() || code == ""){
        code = localStorage.lastCoupon;
      }
      if(isNaN(csaving)){
        csaving = 0;
      }
      else if(csaving > bestSaving && code != ""){
        bestSaving = csaving;
        localStorage.bestSaving = bestSaving;
        localStorage.bestCoupon = code;
      }
    }
    if($(".success-container-inner").length > 0){
      var cpnMsg = $(".success-container-inner").text().trim();
      setCookie("HKCode~"+localStorage.lastCoupon, cpnMsg, 1);
    }
    if(localStorage.savings.trim() != ""){
      var savings = JSON.parse(localStorage.savings);
    }
    else{
      var savings = [];
    }
    var dontSave = 0;
    if(localStorage.savings.trim() != ""){
      var checkContains = JSON.parse(localStorage.savings);
      for(var cc=0;cc<checkContains.length;cc++){
        if(checkContains[cc].code == code || code.trim() == ""){
          dontSave = 1;
        }
      }
    }
    if(dontSave == 0){
      var savingsLen = savings.length;
      savingsObject["code"] = code;
      savingsObject["saving"] = csaving;
      savingsObject["ecash"] = ecashing;
      savings[savingsLen] = savingsObject;
      localStorage.savings = JSON.stringify(savings);

    }
    displayEachCpnSaving(code, csaving, ecashing);

    if($(".delete-discount").length > 0 && $(".delete-discount a").length > 0){
      document.getElementsByClassName("delete-discount")[0].getElementsByTagName("a")[0].click();
    }
    if(localStorage.doneACTill >= couponsTotal){
      resolve("done");
    }
    else{
      if($(".error-container-inner").length > 0){
        var cpnMsg = $(".error-container-inner").text().trim();
        setCookie("HKCode~"+localStorage.lastCoupon, cpnMsg, 1);
      }
      resolve("notdone");
    }
  });
}
var deleteAC = 0;
if(!localStorage.clickedRemove){
  localStorage.clickedRemove = 0;
}
function applyBestCoupon(){
  bestSaving = localStorage.bestSaving;
  bestCoupon = localStorage.bestCoupon;

  var allCoupons = localStorage.getCoupons;
  allCoupons = allCoupons.split("~");
  for(var all=0;all<allCoupons.length-1;all++){
    var cookieCpn = "HKCode~"+allCoupons[all].trim();
    if(getCookie(cookieCpn)){
      arrayMsg.push([allCoupons[all], encodeURIComponent(getCookie(cookieCpn)), 426]);
      setCookie(cookieCpn, 0, -1);
    }
  }
  if(deleteAC == 0){
    arrayMsg = JSON.stringify(arrayMsg);
    var jsonArr = [{'cpn_msg': arrayMsg}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 12, doNothing, []);
    deleteAC = 1;
    arrayMsg = [];
  }

  if(localStorage.bestSaving != 0 && localStorage.bestCoupon.trim() != ""){
    if($(".delete-discount").length > 0 && $(".delete-discount a").length > 0 && localStorage.clickedRemove == 0){
      document.getElementsByClassName("delete-discount")[0].getElementsByTagName("a")[0].click();
      localStorage.clickedRemove = 1;
    }
    if($("#discountCode").length > 0 && $("#voucher-wrapper .btn-light-blue").length > 0){
      localStorage.showFinalSavings = 1;
      localStorage.acStarted = 0;
      $("#discountCode").val(localStorage.bestCoupon.trim());
      document.getElementById("voucher-wrapper").getElementsByClassName("btn-light-blue")[0].click();
    }
    else{
      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    displayNoSavings();
  }
}
// /////////////// WISH TO WATCH LIST ENDS ///////////////
