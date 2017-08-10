$ = jQuery.noConflict();
// if(getCookie("showPopAlert") == undefined || getCookie("showPopAlert") == ""){
//   setCookie("showPopAlert", 1, 10);
// }

// // var imgLogo = chrome.extension.getURL("logo.png");
// if(getCookie("showPopAlert") == 1){
//   $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:80px!important;"><div id="close-pop-alert">x</div><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p><a style="text-decoration:none;color:white" href="http://compare.buyhatke.com/promotions/american-swan/?gclid=extension" target="_blank">Buyhatke Maha Giveaway - Over 1,00,000 Products available for FREE. Click me to check it out</a></p></div></div></div>');
// }

// $("#close-pop-alert").click(function(){
//   setCookie("showPopAlert", 0, 10);
//   $(this).parent().css("display","none");
// });
function sendPairs(){
  arrayToSend = [];
  
  if($('#productListing .product').length > 0){
    var slider = $('#productListing .product');
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
      if($('#productListing .product:eq('+ i +')').length > 0){
        PID = $('#productListing .product:eq('+ i +'):eq(0)').attr('id');
        if(isNaN(PID)){
          PID = "";
        }
      }
      if(PID != ""){
       
        if($('#productListing .product:eq('+ i +')').find('.ev-prod-name').length > 0){
          prod = $('#productListing .product:eq('+ i +')').find('.ev-prod-name:eq(0)').attr('title').trim();
        }
        if($('#productListing .product:eq('+ i +')').find('.prod-img img').length > 0){
          image = $('#productListing .product:eq('+ i +')').find('.prod-img img:eq(0)').attr('data-original').trim();
        }
        if($('#productListing .product:eq('+ i +')').find('.soldout').length > 0){
          oos = 1;
        }
        if($('#productListing .product:eq('+ i +')').attr('data-price').length > 0){
          price = $('#productListing .product:eq('+ i +')').attr('data-price').trim();
        }
        price = filter_price(price);
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsFNY': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}


function sendCurrent(){
  curData = [];   
  var prod = getProd();
  var image = getImage();
  var myPrice = getPrice();
  var PID = getPID();
  var cur_url = "";
  var current_status = 0;
  var avail = getAvailability();
  if(avail == 1){
    current_status = 0;
  }
  else if(avail == 0){
    current_status = 1;
  }
  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataFNY': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('#product-area').length > 0){
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
  if($('.product-detail-info .product-name').length > 0){
    prod = $('.product-detail-info:eq(0) .product-name:eq(0)').text().trim();
  }
  if($('#product-area').length > 0){
    return prod;
  }
  else{
    return "";
  }
}

function getImage(){
  var image = "";
  var image1 = "";
  if($('#product-gallery-detail').length > 0 && $('#product-gallery-detail').attr('src').length > 0){
    image = $('#product-gallery-detail').attr('src');
  }
  return image;
}

function getPrice(){
  price = "";
  if($('#product-area .pricing-area .new-pricing').length > 0)
  {
    price = $('#product-area .pricing-area .new-pricing:eq(0)').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($("#soldOutLabel").length > 0){
    avail = 0;
  }
  return avail;

}
function getPID(){

  var link = window.location.href;
  //console.log("link: "+link);
  var pid = link;

  if(pid.split("#").length > 1){
    pid = pid.split("#");
    pid = pid[0];

  }
  if(pid.split("&").length > 1){
    pid = pid.split("&");
    pid = pid[0];

  }
  if(pid.split("?").length > 1){
    pid = pid.split("?");
    pid = pid[0];

  }
  if(pid.split("/product/").length > 1){
    pid = pid.split("/product/")[1];

    if(pid.split("/").length > 1){
      pid = pid.split("/");
      pid = pid[pid.length - 1];
    }

    if(isNaN(pid)){
      pid = 0;
    }

  }
  else if(pid.split("/products/").length > 1){
    pid = pid.split("/products/")[1];

    if(pid.split("/").length > 1){
      pid = pid.split("/");
      pid = pid[pid.length - 1];
    }

    if(isNaN(pid)){
      pid = 0;
    }

  }
  else if(pid.split("_").length > 1){
    pid = pid.split("_");
    pid = pid[pid.length - 1];
    if(isNaN(pid)){
      pid = 0;
    }
  }
  return pid;
}

function returnPID(link){

  var pid = link;
  if(link == ""){
    pid = 0;
  }
  
  if(pid.split("#").length > 1){
    pid = pid.split("#");
    pid = pid[0];

  }
  if(pid.split("&").length > 1){
    pid = pid.split("&");
    pid = pid[0];

  }
  if(pid.split("?").length > 1){
    pid = pid.split("?");
    pid = pid[0];

  }
  if(pid.split("/product/").length > 1){
    pid = pid.split("/product/")[1];

    if(pid.split("/").length > 1){
      pid = pid.split("/");
      pid = pid[pid.length - 1];
    }

    if(isNaN(pid)){
      pid = 0;
    }

  }
  else if(pid.split("/products/").length > 1){
    pid = pid.split("/products/")[1];

    if(pid.split("/").length > 1){
      pid = pid.split("/");
      pid = pid[pid.length - 1];
    }

    if(isNaN(pid)){
      pid = 0;
    }

  }
  else if(pid.split("_").length > 1){
    pid = pid.split("_");
    pid = pid[pid.length - 1];
    if(isNaN(pid)){
      pid = 0;
    }
  }
  if(link.split('fashionandyou.com').length < 2){
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
  if($('.breadcrumb').length > 0){
    var len_bread = $('.breadcrumb').find('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('.breadcrumb').find('a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }
  }
  return bread_final;
}
