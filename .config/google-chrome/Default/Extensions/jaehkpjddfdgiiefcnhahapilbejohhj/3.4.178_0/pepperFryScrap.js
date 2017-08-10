var arrayMsg = [];

function getCategory(){
  var categories = getBreadCrumb();
  var index = 1;
  var category = "";
  if(categories != "" && categories != undefined){
    categories = categories.split("*~");
    category = categories[index];
  }
  return category;
}

function sendPairs(){
  arrayToSend = [];

  if($('#clipProductList .grid-view').length > 0){
    var slider = $('#clipProductList .grid-view');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('#clipProductList .grid-view:eq('+ i +') a').length > 0){
        link = $('#clipProductList .grid-view:eq('+ i +') a:eq(0)').attr("href");
        if(link != ""){
          PID = link;
          if(PID.split("?").length > 1){
            PID = PID.split("?");
            PID = PID[0];
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }

        }
        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }

      if(PID != ""){

        if($('#clipProductList .grid-view:eq('+ i +') .bes-sold-out-title').length > 0 && $('#clipProductList .grid-view:eq('+ i +') .bes-sold-out-title').text().toUpperCase().split("SOLD OUT").length > 1){
          oos = 1;
        }
        if($('#clipProductList .grid-view:eq('+ i +') .card-body-title').length > 0){
          prod = $('#clipProductList .grid-view:eq('+ i +') .card-body-title:eq(0)').text().trim();
        }
        if($('#clipProductList .grid-view:eq('+ i +') .card-header-img img').attr('data-src')){
          image = $('#clipProductList .grid-view:eq('+ i +') .card-header-img:eq(0) img:eq(0)').attr('data-src').trim();
        }
        else if($('#clipProductList .grid-view:eq('+ i +') .card-header-img img').attr('src')){
          image = $('#clipProductList .grid-view:eq('+ i +') .card-header-img:eq(0) img:eq(0)').attr('src').trim();
        }

        if(image.split("grey.gif").length > 1){
          image = "";
        }

        if($('#clipProductList .grid-view:eq('+ i +') .card-body-price.txt-red').length > 0){
          price = $('#clipProductList .grid-view:eq('+ i +') .card-body-price.txt-red').text().trim();
          price = filter_price(price);
        }
        else{
          price = "";
        }


    } //PID ends

    else{
      price = "";
    }

    if(PID != "" && price != ""){
      arrayToSend.push([PID, price, prod, image, oos]);
    }

    } // for ends1

  }

  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsPepp': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}


function sendCurrent(){
  curData = [];
  var prod = getProd();
  var image = getImage();
  var myPrice = getPrice();
  var cur_url = "";
  var current_status = 0;
  var PID = getPID();
  var link = window.location.href;

  if(getAvailability() == 0){
    current_status = 1;
  }
  else if(getAvailability() == -1){
    current_status = 2;
  }
  else if(getAvailability() == 1){
    current_status = 0;
  }
  cur_url = window.location.href;
  var breadcrumbF = getBreadCrumb();
  curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumbF]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataPepp': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('#vip_wrapper').length > 0 || $(".vip-product-content").length > 0){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;

function getProd(){
  var prod = "";
  if($('[itemprop="name"]').length > 0){
    prod = $('[itemprop="name"]').text().trim();
  }
  else if($('.vip_heading_1').length > 0){
    prod = $('.vip_heading_1').text().trim();
  }
  else if($('.vip-product-title').length > 0){
    prod = $('.vip-product-title:eq(0)').text().trim();
  }

  if($('#vip_wrapper').length > 0 || $(".vip-product-content").length > 0){
    return prod;
  }
  else {
    return "";
  }
  // //console.log("prod: "+prod);
}

function getImage(){
  var image = "";

  if($('meta[property="og:image"]').length > 0){
    image = $('meta[property="og:image"]').attr('content').trim();

  }

  return image;
}

function getPrice(){
  price = "";
  if($('#price-val').length > 0){
    price = $('#price-val').text().split(",").join("");
  }
  if(price=="" || price == undefined || price == "undefined"){
    if($('[itemprop="price"]').length > 0){
      price = $('[itemprop="price"]:eq(0)').text().trim();
    }
  }

  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($(".oos_notify_box").length > 0){
    avail = 0;
  }
  else if($(".out_of_stock_box").length > 0){
    avail = 0;
  }
  else if($(".out-of-stock-box").length > 0){
    avail = 0;
  }
  else if($("#container-img #container-heading img").eq(0).attr("src") == "/img/shucks_img.jpg"){
    avail = -1;
  }
  else if($(".vip-outOf-stock").length > 0){
    avail = -1;
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
  if(pid.split(".com/").length > 1){
    pid = pid.split(".com/")[1];

  }
  return pid;



}

function returnPID(link){

  var pid = link;
  if(link == ""){
    pid = 0;
  }
  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];
  }
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];
  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];
  }
  if(pid.split(".com/").length > 1){
    pid = pid.split(".com/")[1];

  }
  if(link.split('pepperfry.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  return pid;



}


function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  var len_bread = $('.breadcrumb').find('a').length;

  for(i=0;i<len_bread-1;i++){
    breadcrumb = $('.breadcrumb').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}

function sendCoupon(){
  $ = jQuery.noConflict();
  couponToSend = [];
  var cur_link = window.location.href;
  var couponUrl = "";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  var couponAt = 333;

  couponUrl = "http://www.pepperfry.com/";
  couponCode = "";
  couponText = "";
  couponDesc = "";


  if($('.vip_price .text_2').length > 0){
    couponCode = $('.vip_price .text_2:eq(0)').text().trim();
    if(couponCode.split('"').length > 1){
      couponCode = couponCode.split('"');
      couponCode = couponCode[1].trim();
      if(couponCode != couponCode.toUpperCase()){
        couponCode = "";
      }
    }
    if($(".vip_offer_group span").length > 0){
      couponText = $(".vip_offer_group:eq(0) span").text().trim();
    }
  }

  if(couponCode != ""){

    couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
  }

  if($('.coupon-block').length > 0){
   couponUrl = "https://www.pepperfry.com/";
   couponCode = "";
   couponText = "";
   couponDesc = "";
   couponExp = 0;
   couponAt = 333;

   if($('.coupon-block b').length > 0){
     couponCode = $('.coupon-block:eq(0) b:eq(0)').text().trim();
     couponDesc = $('.coupon-block:eq(0)').text().trim();
     if(couponCode != couponCode.toUpperCase()){
      couponCode = "";
    }
    couponText = couponDesc;
  }
  if(couponCode != ""){
    couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
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



// /////////////// WISH TO WATCH LIST STARTS ///////////////

var cur_url = window.location.href;
if(cur_url.split("/wishlist").length > 1 && (cur_url.split("pepperfry.com").length > 1)){
  if($('#myAccoutVieworder').length>0 && $('#myAccoutVieworder .page-title').length>0){
    importWishGlobal('#myAccoutVieworder .page-title:eq(0)', 'before', pepperWishList);
  }
}

function pepperWishList(){
  wishListPepper = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 333;
  var brand = "";
  var till_wl = 0;
  if($('#wishlistTab .order-table-wrapper').length > 0) {
    var slider = $('#wishlistTab .order-table-wrapper');
    var sliderLength = $('#wishlistTab .order-table-wrapper').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('#wishlistTab .order-table-wrapper:eq('+ i +') .order-product').length > 0){
        link = $('#wishlistTab .order-table-wrapper:eq('+ i +') .order-product:eq(0)').attr('href');
        url = link;
        if(link.split("pepperfry.com").length < 2){
          link = "https://www.pepperfry.com"+link;
          url = link;
        }
        PID = returnPID(link);
      }
      else{
        link = "";
        PID = "";
      }
      price = 0;

      if($('#wishlistTab .order-table-wrapper:eq('+ i +')').find('.order-product').length > 0){
        prod = $('#wishlistTab .order-table-wrapper:eq('+ i +')').find('.order-product:eq(0)').text().trim();
        if(prod.split("...").length > 1){
          prod = prod.split("...");
          prod = prod[0].trim();
        }
        prod = prod.split("&nbsp;");
        prod = prod.join(" ");
        prod = prod.trim();
      }

      if($('#wishlistTab .order-table-wrapper:eq('+ i +')').find('.order-product img').length > 0){
        image = $('#wishlistTab .order-table-wrapper:eq('+ i +')').find('.order-product img:eq(0)').attr('src').trim();
      }
      if($('#wishlistTab .order-table-wrapper:eq('+ i +')').find('.order-add-to-cart').length > 0 && $('#wishlistTab .order-table-wrapper:eq('+ i +')').find('.order-add-to-cart').parent().find('.order-txt').length > 0){
        price = $('#wishlistTab .order-table-wrapper:eq('+ i +')').find('.order-add-to-cart').parent().find('.order-txt').text().trim();
        if(price.toUpperCase().split("TOTAL:").length > 1){
          price = price.toUpperCase().split("TOTAL:");
          price = price[1];
          price = filter_price(price);
        }
        else{
          price = "";
        }
      }

      if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
        wishListPepper.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
      }
    }
    wishJson = JSON.stringify(wishListPepper);
    var jsonArr = [{'wishList': wishJson}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 17, alertWLResp, []);
  }

}
function alertWLResp(data){
  alert(data);
}

function getAppliedCpn(){
  var cur_url = window.location.href;
  if(cur_url.split("pepperfry.com/checkout/cart").length > 1){
    if($("#apply_coupon").length > 0 && $("#apply_coupon").css("display") == "none"){
      var checkPick = "#coupon_code";
      var selector = "#coupon_code";
      var attr = "";
      var webID = 333;
      var homeLink = "https://www.pepperfry.com/";
      pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
    }
    else{
      setTimeout(getAppliedCpn, 1000);
    }
  }
}
getAppliedCpn();

var cur_url = window.location.href;
if(cur_url.split("pepperfry.com/checkout/cart").length > 1){
  var selectorACIcon = ".cart-coupon-blc";
  var position = "after";
  var parent = "none";
  var method = "POST";
  var api = "https://www.pepperfry.com/checkout/validate_coupon/0/**/1";
  var postFields = {"coupon_code": "**", "apply": "apply"};
  var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
  details = JSON.stringify(details);
  displayACIcon(selectorACIcon, parent, position, 24, details);
}

savings = [];
bestSaving = 0;
bestCoupon = "";

function startSaving(data1){
  data1 = JSON.parse(data1);
  var nowCode = "";
  var nowSaving = "";
  var resp = data1[0].data;
  var code = data1[0].code.trim();
  var csaving = 0;
  var ecashing = 0;
  var savingsObject = {};
  nowCode = code;
  respYatra = resp;
  resp = JSON.parse(resp);
  if(resp != "" && code != ""){
    if(resp.data.success){
      respYatra = resp;
      if(resp.data && resp.data.discount_amount){
        csaving = resp.data.discount_amount;
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
    else{
    }
    if(resp.data && resp.data.message){
      cpnMsg = resp.data.message.trim();
      cpnMsg = cpnMsg.replace(/(<([^>]+)>)/ig,"");
      arrayMsg.push([code, encodeURIComponent(cpnMsg), 333 ]);
    }
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashing;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  displayEachCpnSaving(code, csaving, ecashing);
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
function applyBestCoupon(){
  // console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
    if(document.getElementById("coupon_code") && document.getElementById("cancel_coupon") && $("#cancel_coupon").css("display") != "none"){
      document.getElementById("cancel_coupon").click();
    }
    if($("#apply_coupon").length > 0 && $("#apply_coupon").css("display") != "none"){
      $("#coupon_code").val(bestCoupon.trim());
      document.getElementById("apply_coupon").click();
      displayFinalSavings();
    }
    else if($("#apply_coupon").length > 0){
      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    displayNoSavings();
    // console.log("Show no savings popup");
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

// /////////////// WISH TO WATCH LIST ENDS ///////////////
