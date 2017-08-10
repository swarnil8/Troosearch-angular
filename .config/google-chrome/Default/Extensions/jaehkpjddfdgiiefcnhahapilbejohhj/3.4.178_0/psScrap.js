$ = jQuery.noConflict();
current_pid = "";
current_url = "";
function checkURL(){
  var url = window.location.href;
  var now_pid = getPID();
  if(current_url != url){
    var url = window.location.href;
    current_url = url;
    $(".hk-yellow-bar-main-div").css("display", "none");
    $(".hk-main-graph").css("display", "none");
    $(".hk-main-watch").css("display", "none");
    $(".hk-main-watch").removeClass("hk-sTab__pw--on");
    initiateNewUI();
  }
  if(current_pid != now_pid){
    current_pid = now_pid;
  }
  return;
}

window.setInterval(function(){ checkURL(); }, 800);

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
  if($('.product-container').length > 0){
    var slider = $('.product-container');
    var sliderLength = slider.length;
    var link;
    var price;
    var prod = "";
    var image = "";
    var oos = 100;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 100;
      if($('.product-container:eq('+ i +') a').length > 0){
        link = $('.product-container:eq('+ i +') a:eq(0)').attr('href');
        if(link.split("http").length < 2){
          link = "https://prettysecrets.com"+link;
        }
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){

        if($('.product-container:eq('+ i +')').find('.ps-plp-name').length > 0){
          prod = $('.product-container:eq('+ i +')').find('.ps-plp-name:eq(0)').text().trim();
        }
        if($('.product-container:eq('+ i +')').find('.img-responsive').length > 0){
          image = $('.product-container:eq('+ i +')').find('.img-responsive:eq(0)').attr("src").trim();
        }
        if($('.product-container:eq('+ i +')').find('.special-price .price').length > 0){
          price = $('.product-container:eq('+ i +')').find('.special-price .price:eq(0)').text();
          price = filter_price(price);
        }
        if($('.product-container:eq('+ i +')').find('.price b').length > 0){
          price = $('.product-container:eq('+ i +')').find('.price:eq(0) b:eq(0)').text().trim();
          price = filter_price(price);
        }
        else  if($('.product-container:eq('+ i +')').find('.price').length > 0){
          price = $('.product-container:eq('+ i +')').find('.price:eq(0)').text().trim();
          price = filter_price(price);
        }
      }

      else{
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    }
  }
  if($('.upCrossSellProduct').length > 0){
    var slider = $('.upCrossSellProduct');
    var sliderLength = slider.length;
    var link;
    var price;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.upCrossSellProduct:eq('+ i +')').parent().parent().attr("href")){
        link = $('.upCrossSellProduct:eq('+ i +')').parent().parent().attr("href");
        if(link.split("http").length < 2){
          link = "https://prettysecrets.com"+link;
        }
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){

        if($('.upCrossSellProduct:eq('+ i +')').find('.up-cross-sell-title').length > 0){
          prod = $('.upCrossSellProduct:eq('+ i +')').find('.up-cross-sell-title:eq(0)').text().trim();
        }
        if($('.upCrossSellProduct:eq('+ i +')').parent().find('.img-responsive').length > 0){
          image = $('.upCrossSellProduct:eq('+ i +')').parent().find('.img-responsive:eq(0)').attr("src").trim();
        }
        if($('.upCrossSellProduct:eq('+ i +')').find('.upCrossSellPrice').length > 0){
          price = $('.upCrossSellProduct:eq('+ i +')').find('.upCrossSellPrice:eq(0)').text();
          price = $('.upCrossSellProduct:eq('+ i +')').find('.upCrossSellPrice:eq(0)').text();
          price = filter_price(price);
        }
      }

      else{
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    }
  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsPrettySecrets': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

function sendCurrent(){
  curData = [];
  var prod = getProd();
  var image = "";
  var myPrice = "";
  var PID = "";
  var cur_url = "";
  var current_status = 0;

  if(getAvailability() == 1){
    current_status = 0;
  }
  else if(getAvailability() == -1){
    current_status = 2;
  }
  else{
    current_status = 1;
  }
  myPrice = getPrice();
  image = getImage();
  var link = window.location.href;
  if(link != ""){
    PID = link;
    PID = getPID();
  }
  else{
    PID = "";
  }
  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataPrettySecrets': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('#product-header').length>0 || $("#detailed-product").length > 0){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

var check_prod_pg = 1;

function getProd(){
  var prod = "";
  if($('#product-header h1').length > 0){
    prod = $('#product-header h1:eq(0)').text().trim();
  }
  else if($('#detailed-product h1').length > 0){
    prod = $('#detailed-product h1:eq(0)').text().trim();
  }
  if($('#product-header').length>0 || $("#detailed-product").length > 0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('#product-media #wrap').length > 0){
    image = $('#product-media #wrap img').attr('src').trim();
  }
  else if($('#desktop-img-1').length > 0){
    image = $('#desktop-img-1 img').attr('src').trim();
  }
  else if($('#detailed-img').length > 0){
    image = $('#detailed-img img:eq(0)').attr('src').trim();
  }
  return image;
}

function getPrice(){
  price = "";
  if($("#product-info .price-box .special_price").length > 0)
  {
    price = $('#product-info .price-box .special_price').find('.price:eq(0)').text().trim();
    price = filter_price(price);
  }
  if((price == "" || isNaN(price) || price == 0) && $("#detailed-product .price-box .special-price").length > 0)
  {
    price = $('#detailed-product .price-box .special-price').text().trim();
    price = filter_price(price);
  }
  if((price == "" || isNaN(price) || price == 0) && $("#product-info .price-box .special-price").length > 0)
  {
    price = $('#product-info .price-box .special-price').find('.price:eq(0)').text().trim();
    price = filter_price(price);
  }
  if((price == "" || isNaN(price) || price == 0) && $('#product-info .price-box .regular-price').length > 0)
  {
    price = $('#product-info .price-box .regular-price').find('.price:eq(0)').text().trim();
    price = filter_price(price);
  }
  if((price == "" || isNaN(price) || price == 0) && $('#product-info .price-box').length > 0)
  {
    price = $('#product-info .price-box').find('.price:eq(0)').text().trim();
    price = filter_price(price);
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.out-of-stock').length > 0){
    avail = 0;
  }
  return avail;
}
function getPID(){
  var link = window.location.href;
  var pid = link;
  var pidNum = 0;

  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];
  }
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];
  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];
  }
  if(pid.split("/").length > 1){
    pidNum = pid.split("/");
    pidNum = pidNum[pidNum.length-1];
    pidNum = parseInt(pidNum);
    if(pidNum == 0 || isNaN(pidNum)){
      pid = "";
    }
  }
  return pid;
}

function returnPID(link){

  var pid = link;
  var pidNum = 0;
  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];
  }
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];
  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];
  }
  if(pid.split("/").length > 1){
    pidNum = pid.split("/");
    pidNum = pidNum[pidNum.length-1];
    pidNum = parseInt(pidNum);
    if(pidNum == 0 || isNaN(pidNum)){
      pid = "";
    }
  }
  if(link.split('prettysecrets.com').length < 2){
    pid = "";
  }
  if(link == ""){
    pid = "";
  }
  return pid;
}


function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  var len_bread = $('.breadcrumbs').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.breadcrumbs').find('a:eq('+ i +')').text().trim();
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
  var couponAt = 433;
  couponUrl = "http://prettysecrets.com/";
  couponCode = "";
  couponText = "";
  couponDesc = "";


  if($(".success-msg li").length > 0){
   couponUrl = "http://prettysecrets.com/";
   couponCode = "";
   couponCode1 = "";
   couponText = "";
   couponDesc = "";
   slider = "";
   sliderLength = 0;

   slider = $(".success-msg li");
   sliderLength = slider.length;

   for(i=0;i<sliderLength;i++){
    couponUrl = "http://prettysecrets.com/";
    couponCode = "";
    couponCode1 = "";
    couponText = "";
    couponDesc = "";

    couponCode1 = $(".success-msg li:eq("+i+")").text().trim();

    if(couponCode1.split("code ").length > 1){
      couponCode = couponCode1.split("code ");
      couponCode = couponCode[1].trim();

      if(couponCode.split(" ").length > 1){
        couponCode = couponCode.split(" ");
        couponCode = couponCode[0].trim();
      }

      if(couponCode.split(".").length > 1){
        couponCode = couponCode.split(".");
        couponCode = couponCode[0].trim();
      }

      if(couponCode.split("'").length > 1){
        couponCode = couponCode.split("'");
        couponCode = couponCode[1].trim();
      }
      if(couponCode.split('"').length > 1){
        couponCode = couponCode.split('"');
        couponCode = couponCode[1].trim();
      }
    }

    if(couponCode != couponCode.toUpperCase() && couponCode.length > 3){
      couponCode = "";
    }

    if(couponCode != ""){
      couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
    }
  }

}

if($(".ui-dialog-content").length > 0){
 couponUrl = "http://prettysecrets.com/";
 couponCode = "";
 couponText = "";
 couponDesc = "";
 couponText = $(".ui-dialog-content span:eq(0)").text().trim();
 couponDesc = $(".ui-dialog-content li:eq(0)").text().trim();
 couponDesc = couponDesc + " " + $(".ui-dialog-content li:eq(1)").text().trim();
 couponDesc = couponDesc + " " + $(".ui-dialog-content li:eq(2)").text().trim();

 if(couponDesc.split("code ").length > 1){
  couponCode = couponDesc.split("code ");
  couponCode = couponCode[1].trim();

  if(couponCode.split(" ").length > 1){
    couponCode = couponCode.split(" ");
    couponCode = couponCode[0].trim();
  }

  if(couponCode.split(".").length > 1){
    couponCode = couponCode.split(".");
    couponCode = couponCode[0].trim();
  }

  if(couponCode.split("'").length > 1){
    couponCode = couponCode.split("'");
    couponCode = couponCode[1].trim();
  }
}

if(couponCode != couponCode.toUpperCase() && couponCode.length > 3){
  couponCode = "";
}

if(couponCode != ""){
  couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
}

}

couponToSend = JSON.stringify(couponToSend);
var jsonArr = [{'couponsExt': couponToSend}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr, 15, doNothing, []);
}
sendCoupon()


// /////////////// WISH TO WATCH LIST STARTS ///////////////

var cur_url = window.location.href;
if(cur_url.split("/wishlist").length > 1 && (cur_url.split("prettysecrets.com").length > 1)){
  if($('#wishlist-view-form').length>0){
    importWishGlobal('#wishlist-view-form', 'before', pepperWishList);
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
  var pos = 433;
  var brand = "";
  var till_wl = 0;
  if($('#wishlist-view-form .wishlistItem').length > 0) {
    var slider = $('#wishlist-view-form .wishlistItem');
    var sliderLength = $('#wishlist-view-form .wishlistItem').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('#wishlist-view-form .wishlistItem:eq('+ i +') a').length > 0){
        link = $('#wishlist-view-form .wishlistItem:eq('+ i +') a:eq(0)').attr('href');
        url = link;
        if(link.split("prettysecrets.com").length < 2){
          link = "https://prettysecrets.com"+link;
          url = link;
        }
        PID = returnPID(link);
      }
      else{
        link = "";
        PID = "";
      }
      price = 0;

      if($('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.product-image').length > 0 && $('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.product-image').attr("title")){
        prod =$('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.product-image').attr("title").trim();
        if(prod.split("...").length > 1){
          prod = prod.split("...");
          prod = prod[0].trim();
        }
        prod = prod.split("&nbsp;");
        prod = prod.join(" ");
        prod = prod.trim();
      }

      if($('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.product-image img').length > 0){
        image = $('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.product-image img:eq(0)').attr('src').trim();
      }
      if($('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.hover-content').length > 0 && $('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.hover-content').parent().find('.new_price').length > 0){
        price = $('#wishlist-view-form .wishlistItem:eq('+ i +')').find('.hover-content').parent().find('.new_price').text().trim();
        price = filter_price(price);
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
  if($("#cart-coupon").length > 0 && ($(".app-children .error-message").length == 0 || $(".error-message").length > 0 && $(".error-message").text().trim() == "") && $("#cart-coupon").val().trim() != ""){
    var coupon = $("#cart-coupon").val().trim();

    var someDate = new Date();
    var numberOfDaysToAdd = 5;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    if(mm < 10){
      mm = "0"+mm;
    }
    if(dd < 10){
      dd = "0"+dd;
    }
    var expTime = y + '-'+ mm + '-'+ dd + " 23:59:59";
    if(coupon != "" && coupon == coupon.toUpperCase()){
      var jsonArr = [{'coupon': encodeURIComponent(coupon.trim()), 'url': "https://prettysecrets.com/", 'expTime': expTime, 'webID': 433}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr, 38, doNothing, []);
    }
  }
  else{
    setTimeout(function(){
      getAppliedCpn();
    }, 3000);
  }
}

function createData(){
  $.get("https://prettysecrets.com/api/v1/Y2FydC8=").success(function(data){
    localStorage.getPostFieldsPS = JSON.stringify(data);
    return;
  });
}

function displayACIconatPS(){
  var cur_url = window.location.href;
  if(cur_url.split("prettysecrets.com/checkout/cart").length > 1 && $("#cart-checkout").length > 0 && $("#couponClick").length == 0){
    getAppliedCpn();
    createData();

    var selectorACIcon = "#cart-checkout";
    var position = "after";
    var parent = "none";
    var method = "POST";
    var api = "https://prettysecrets.com/api/v1/Y2FydC91cGRhdGUvP2NvdXBvbl9jb2RlPUIyRzFCUkFT";
    var postFields = {};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, "site": 40}];
    details = JSON.stringify(details);
    arrayMsg = [];
    displayACIcon(selectorACIcon, parent, position, 40, details);
    keepCheckingACIcon(selectorACIcon, parent, position, 40, details);

    if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
      displayFinalSavings();
      $(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
      $(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
    }

  // if($("#couponClick").length > 0){
  //   $("#couponClick").css("float", "right");
  // }
}
else{
  setTimeout(displayACIconatPS, 1000);
}
}
displayACIconatPS();

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
    if(resp.discount_applied != "false"){
      if(resp.total_discount){
        csaving = resp.total_discount;
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
    localStorage.showFinalSavings = 1;
    var finalPostFieldSpcl = {};
    var finalPostField = {};
    if(localStorage.getPostFieldsPS && localStorage.getPostFieldsPS != ""){
      finalPostFieldSpcl = JSON.parse(localStorage.getPostFieldsPS);
      finalPostFieldSpcl["coupon_code"] = bestCoupon.trim();
    }
    else{
      finalPostFieldSpcl = createData();
      finalPostFieldSpcl["coupon_code"] = bestCoupon.trim();
    }
    finalPostField["cart"] = finalPostFieldSpcl;
    finalPostField["applyCoupon"] = true;
    finalPostField = JSON.stringify(finalPostField);
    $.ajax({
      url: "https://prettysecrets.com/api/v1/Y2FydC91cGRhdGUvP2NvdXBvbl9jb2RlPUIyRzFCUkFT",
      type: "POST",
      dataType: "json",
      data: finalPostField,
      contentType: "application/json"
    })
    .success(function(data){
      localStorage.showFinalSavings = 1;
      localStorage.bestSaving = data.total_discount;
      localStorage.bestCoupon = data.coupon_code;
      localStorage.acStarted = 0;
      displayFinalSavings();
      window.location.reload();
    });
  }
  else{
    displayNoSavings();
  }
}

