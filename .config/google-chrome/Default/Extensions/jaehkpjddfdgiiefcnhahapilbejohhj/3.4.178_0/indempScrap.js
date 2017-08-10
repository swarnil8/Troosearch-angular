$ = jQuery.noConflict();
//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;
  
function getCategory(){
  var category = "";
  return category;
}

function getProd(){
  var prod = "";
  if($('.product-view .product-name').length > 0){
    prod = $('.product-view .product-name:eq(0)').text().trim();
  }
  else{
    prod = $("h1:eq(0)").text().trim();
  }
  if($('.product-view').length > 0){
    return prod;
  }
  else {
    return "";
  }
}

function getBreadCrumb(){
  return "";
}
function getImage(){
  var image = "";

  if($('.product-view .product-img-box').length > 0){
    image = $('.product-view .product-img-box img').attr('src').trim();
  }
  
  return image;
}

function getPrice(){
  price = "";
  if($('.product-view .price-box .special-price .price').length > 0){
    price = $('.product-view .price-box .special-price .price').text().trim();
  }
  else if($('.product-view .price-box .regular-price .price').length > 0){
    price = $('.product-view .price-box .regular-price .price').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.product-view .out-of-stock').length > 0){
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
  if(link.split('indiaemporium.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  
  return pid;



}
