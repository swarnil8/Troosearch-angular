
var check_prod_pg = 1;
function getCategory(){
  var category = "";
  return category;
}
function getProd(){
  var prod = "";
  var brand = "";
  if($('.brand-logo img').length > 0){
    brand = $('.brand-logo img').attr('title').trim();
  }
  if($('.product_title').length > 0){
    prod = $('.product_title').text().trim();
  }

  if(brand != ""){
    prod = brand + " " + prod;
  }
  if($('.product_info_div').length>0){
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
  if($('.zoom_outer_div img').length > 0){
    image = $('.zoom_outer_div img:eq(0)').attr('src').trim();
    if(image.split("strapsandstrings.com").length < 2){
      image = "http://www.strapsandstrings.com/" + image;
    }
  }
  return image;
}

function getPrice(){
  price = "";
  price = "";
  if($("#product_price .special_price").length > 0)
  {
    price = $('#product_price .special_price').text().trim();
  }
  else if($('#product_price .base_price').length > 0)
  {
    price = $('#product_price .base_price').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.addButton').css('display') == 'none'){
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
  if(link.split('strapsandstrings.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  return pid;
}

