//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;

function getCategory(){
  var category = "";
  return category;
}

function sendPairs(){
  var arrayToSend = [];
  var dropToSend = [];

  if($('.product-grid-item').length > 0){
    var slider = $('.product-grid-item');
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
      if($('.product-grid-item:eq('+ i +') .has-second-image').length > 0){
        link = $('.product-grid-item:eq('+ i +') .has-second-image:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.product-grid-item:eq('+ i +')').find('.product-details .name').length > 0){
          prod = $('.product-grid-item:eq('+ i +')').find('.product-details:eq(0) .name:eq(0)').text().trim();
        }
        if($('.product-grid-item:eq('+ i +') .has-second-image').length > 0 && $('.product-grid-item:eq('+ i +') .has-second-image').attr("style") && $('.product-grid-item:eq('+ i +') .has-second-image').attr("style").split("background: ").length > 1){
          image = $('.product-grid-item:eq('+ i +') .has-second-image').attr("style").split("background: url('");
          image = image[1];
          image = image.split("'");
          image = image[0].trim();
        }
        if($('.product-grid-item:eq('+ i +')').find('.price-new').length > 0){
          price_len = $('.product-grid-item:eq('+ i +')').find('.price-new').length-1;
          price = $('.product-grid-item:eq('+ i +')').find('.price-new:eq('+price_len+')').text();
          price = filter_price(price);
        }
      }
      else{
        price = "";
      }
      console.log("PID "+PID);
      console.log("price "+price);
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }

    } // for ends

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsNGal': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
  if(dropToSend.length > 0){
    dropToSend = JSON.stringify(dropToSend);
    var jsonArr = [{'pids': dropToSend, 'pos': 430}];
    jsonArr = JSON.stringify(jsonArr);
    var passBack = ['.product-grid-item'];
    sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);
  }
}

function sendCurrent(){
  curData = [];
  var prod = "";
  var image = "";
  var myPrice = "";
  var cur_url = "";
  var current_status = 0;
  var link = "";
  var PID = "";
  var brand = "";
  var name = "";
  var prod1 = "";
  var breadcrumb_str = "";

  breadcrumb_str = getBreadCrumb();
  prod = getProd();
  if($('#button-cart').css('display') == 'none'){
    current_status = 1;
  }
  else if($('#button-cart').length == 0){
    current_status = 1;
  }
  myPrice = getPrice();
  image = getImage();
  link = window.location.href;
  PID = getPID();
  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataNGal': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('[itemtype="http://schema.org/Product"]').length>0 || ($('.product-info').length > 0)){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

function getProd(){
  var prod = "";
  prod = $('h1:eq(0)').text().trim();
  if($('[itemtype="http://schema.org/Product"]').length>0 || ($('.product-info').length > 0)){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('[itemprop="image"]').length > 0){
    image = $('[itemprop="image"]:eq(0)').attr('src').trim();
    image = encodeURI(image);
  }
  else if($('[itemprop="image"]').attr('content').length > 0){
    image = $('[itemprop="image"]:eq(0)').attr('content').trim();
    image = encodeURI(image);
  }

  return image;
}

function getPrice(){
  price = "";
  if($('[itemprop="price"]').length > 0){
    price = $('[itemprop="price"]:eq(0)').text().trim();
  }
  else if($('.price .product-price').length > 0){
    price = $('.price .product-price:eq(0)').text().trim();
  }
  else if($('[itemprop="price"]').attr("content").length > 0){
    price = $('[itemprop="price"]:eq(0)').attr('content').trim();
  }
  if(price == "" || price == 0){
   if($('#product .product-price').length > 0){
    price = $('#product .product-price:eq(0)').text().trim();
  }
}
price = filter_price(price);
return price;
}

function getAvailability(){
  var avail = 1;
  if($('#button-cart').css('display') == 'none'){
    avail = 0;
  }
  else if($('#button-cart').length == 0){
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
  if(link.split('n-gal.com').length < 2){
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

  for(i=0;i<len_bread - 1;i++){
    breadcrumb = $('.breadcrumb').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}


function sendCoupon(){
 $ = jQuery.noConflict();
 couponToSend = [];
 var cur_link = window.location.href;


 if($('.journal2_headline_rotator .quote').length > 0){
   var slider = $('.journal2_headline_rotator .quote');
   var sliderLength = slider.length;
   var couponUrl = "";
   var couponCode = "";
   var couponText = "";
   var couponDesc = "";
   var couponExp = 0;
   var couponAt = 430;

   for(i=0;i<sliderLength;i++){
    couponUrl = "http://www.n-gal.com/";
    couponCode = "";
    couponText = "";
    couponDesc = "";
    couponCode1 = "";
    couponCode2 = "";

    if($('.journal2_headline_rotator .quote:eq('+ i +')').find(".rotator-text").length > 0){
     couponText = $('.journal2_headline_rotator .quote:eq('+ i +')').find(".rotator-text:eq(0)").text().trim();

     if(couponText.split("Available Coupons ").length > 1){

      couponCode1 = couponText.split("Available Coupons ");
      couponCode1 = couponCode1[1];

      if(couponCode1.split(":").length > 1){
        couponCode1 = couponCode1.split(":");

        for(j=1;j<couponCode1.length;j++){
          couponCode2 = couponCode1[j];
          couponCode2 = couponCode2.split("(");
          couponCode2 = couponCode2[1];
          couponCode2 = couponCode2.split(" ");
          couponCode2 = couponCode2[0].trim();

          if(couponCode2 == couponCode2.toUpperCase()){
            couponCode = couponCode2;
            couponText = "";
          }
          else{
            couponCode = "";
          }
          if(couponCode != ""){
           couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
         }
       }

     }
   }
   else{
    couponCode = "NO CODE REQUIRED";
    if(couponCode != ""){
     couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
   }
 }
}

}

}
couponToSend = JSON.stringify(couponToSend);
var jsonArr = [{'couponsExt': couponToSend}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr, 15, doNothing, []);
}
sendCoupon();

// // /////////////// WISH TO WATCH LIST STARTS ///////////////

// var cur_url = window.location.href;
// if(cur_url.split("chumbak.com").length > 1){
//   var importImg = returnResource("import_img.png");
//   if($('.wishlist-modal').length>0 && $('.wishlist-modal .modal-title').length>0){
//     $('.wishlist-modal .modal-title:eq(0)').before('<div id="importHatke"> <img src="'+importImg+'" alt="Click to import wishlist" height="50px" width="auto"/> </div>');
//   }
// }

// $("#importHatke").click(function(){
//   chumWishList();
// });

// function chumWishList(){
//   wishListChum = [];
//   var link = "";
//   var url = "";
//   var prod = "";
//   var image = "";
//   var price = "";
//   var PID = "";
//   var pos = 902;
//   var brand = "";

//   if($('.wishlist-modal .item-wrap-modal .product-item').length > 0) {
//     var slider = $('.wishlist-modal .item-wrap-modal .product-item');
//     var sliderLength = $('.wishlist-modal .item-wrap-modal .product-item').length;

//     for(i=0;i<sliderLength;i++){
//       link = "";
//       url = "";
//       prod = "";
//       image = "";
//       price = "";
//       PID = "";
//       if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').parent().attr('ng-href')){
//         link = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').parent().attr('ng-href');
//         url = link;
//         if(link.split("chumbak.com").length < 2){
//           link = "https://www.chumbak.com"+link;
//           url = link;
//         }
//         PID = returnPID(link);
//       }
//       else{
//         link = "";
//         PID = "";
//       }
//       price = 0;

//       if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-name').length > 0){
//         prod = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-name:eq(0)').text().trim();
//         if(prod.split("...").length > 1){
//           prod = prod.split("...");
//           prod = prod[0].trim();
//         }
//         prod = prod.split("&nbsp;");
//         prod = prod.join(" ");
//         prod = prod.trim();
//       }

//       if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('img').length > 0){
//         image = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('img:eq(0)').attr('src').trim();
//       }
//       if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-price').length > 0 && $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-price .font-wt-reg').length > 0){
//         price = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-price:eq(0) .font-wt-reg:eq(0)').text().trim();
//         price = filter_price(price);
//       }

//       if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
//         wishListChum.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
//       }
//     }

//     wishJson = JSON.stringify(wishListChum);
//     var jsonArr = [{'wishList': wishJson}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 17, alertWLResp, []);
//   }

// }
// function alertWLResp(data){
//   alert(data);
// }
// // /////////////// WISH TO WATCH LIST ENDS ///////////////

