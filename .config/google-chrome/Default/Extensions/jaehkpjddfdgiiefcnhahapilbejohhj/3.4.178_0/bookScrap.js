$ = jQuery.noConflict();
var check_prod_pg = 1;
function getISBN(link){
  var isbn = "";
  if(link){
    if(link.split("#").length > 1){
      link = link.split("#");
      link = link[0];
    }
    if(link.split("?").length > 1){
      link = link.split("?");
      link = link[0];
    }
    if(link.split("&").length > 1){
      link = link.split("&");
      link = link[0];
    }
    if(link.split("-").length > 1){
      link = link.split("-");
      link = link[link.length-1];

      if(link.split("/").length > 1){
        link = link.split("/");
        link = link[0];
      }

      if(isValidISBN(link.toString())){
        isbn = link.trim();
      }
    }
  }

  return isbn;

}
function sendPairs(){
  arrayToSend = [];
  if($('.contentbox_extreme_inner li').length > 0){
    var slider = $('.contentbox_extreme_inner li');
    var sliderLength = slider.length;
    var link = "";
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 100;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 100;
      if($('.contentbox_extreme_inner li:eq('+ i +') a').length > 0){
        link = $('.contentbox_extreme_inner li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.contentbox_extreme_inner li:eq('+ i +')').find('img').length > 0 && $('.contentbox_extreme_inner li:eq('+ i +')').find('img').attr("alt")){
          prod = $('.contentbox_extreme_inner li:eq('+ i +')').find('img:eq(0)').attr('alt').trim(); 
        }

        if($('.contentbox_extreme_inner li:eq('+ i +')').find('img').length > 0 && $('.contentbox_extreme_inner li:eq('+ i +')').find('img').attr("src")){
          image = $('.contentbox_extreme_inner li:eq('+ i +')').find('img').attr("src"); 
        }
        if($('.contentbox_extreme_inner li:eq('+ i +')').find('.price').length > 0 && $('.contentbox_extreme_inner li:eq('+ i +')').find('.price .new_price').length > 0){
          price = $('.contentbox_extreme_inner li:eq('+ i +')').find('.price:eq(0) .new_price:eq(0)').text();
          price = filter_price(price);
        }
        else if($('.contentbox_extreme_inner li:eq('+ i +')').find('.price').length > 0 && $('.contentbox_extreme_inner li:eq('+ i +')').find('.price span').length > 0){
          price = $('.contentbox_extreme_inner li:eq('+ i +')').find('.price:eq(0) span:eq(0)').text();
          price = filter_price(price);
        }
        if($('.contentbox_extreme_inner li:eq('+ i +')').find('.price').length > 0 && $('.contentbox_extreme_inner li:eq('+ i +')').find('.price:eq(0) .notifyme-bttntxt').length > 0){
          oos = 1;
        }
      }

      else{
        price = "";
      }
      var isbn = getISBN(link);
      if(isbn != "" && prod != ""){
        prod = prod + " " + isbn;
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  if($('.results li').length > 0){
    var slider = $('.results li');
    var sliderLength = slider.length;
    var link = "";
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 100;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 100;
      if($('.results li:eq('+ i +') a').length > 0){
        link = $('.results li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.results li:eq('+ i +')').find('img').length > 0 && $('.results li:eq('+ i +')').find('img').attr("alt")){
          prod = $('.results li:eq('+ i +')').find('img:eq(0)').attr('alt').trim(); 
        }

        if($('.results li:eq('+ i +')').find('img').length > 0 && $('.results li:eq('+ i +')').find('img').attr("src")){
          image = $('.results li:eq('+ i +')').find('img').attr("src"); 
        }
        if($('.results li:eq('+ i +')').find('.price').length > 0 && $('.results li:eq('+ i +')').find('.price .new_price').length > 0){
          price = $('.results li:eq('+ i +')').find('.price:eq(0) .new_price:eq(0)').text();
          price = filter_price(price);
        }
        if($('.results li:eq('+ i +')').find('.price').length > 0 && $('.results li:eq('+ i +')').find('.price .notifyme-bttntxt').length > 0){
         oos = 1;
       }
       else{
        oos = 0;
      }

    }
    else{
      price = "";
    }
    var isbn = getISBN(link);
    if(isbn != "" && prod != ""){
      prod = prod + " " + isbn;
    }
    if(PID != "" && price != "" && !isNaN(price)){
      arrayToSend.push([PID, price, prod, image, oos]);
    }

    } // for ends

  }

  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsBook': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);  
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
  var avail = getAvailability();
  if(avail == 0){
    current_status = 1;
  }
  else if(avail == -1){
    current_status = 2;
  }
  else{
    current_status = 0;
  }
  breadcrumb_str = getBreadCrumb();
  prod = getProd();

  myPrice = getPrice();
  image = getImage();
  link = window.location.href;
  PID = returnPID(link);
  cur_url = window.location.href;
  var isbn = getISBN(cur_url);
  if(isbn != "" && prod != ""){
    prod = prod + " " + isbn;
  }
  
  curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataBook': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.product_detail_box').length>0){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

function getCategory(){
  var category = "";
  
  return category;
}
function getBreadCrumb(){

  return "";
}

function getProd(){
  var prod = "";
  if($('#prdctdetl h1').length > 0){
    prod = $('#prdctdetl h1:eq(0)').text().trim();
  }
  if($('.product_detail_box').length>0){
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
  }
  return image;
}

function getPrice(){
  price = "";
  if($('[itemprop="price"]').length > 0)
  {
    price = $('[itemprop="price"]:eq(0)').text().trim();
  }
  price = filter_price(price);
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
  
  if(link.split('bookadda.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  return pid;
}
