$ = jQuery.noConflict();
//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;
function getCategory(){
  var category = "";
  return category;
}
function getProd(){
  var prod = "";
  if($('[itemprop="name"]').length > 0){
    prod = $('[itemprop="name"]:eq(0)').attr('content').trim();
  }
  else{
    prod = $("h1:eq(0)").text().trim();
  }
  if($('.prodDetails').length>0){
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
  if($('.prodDetails .new-price').length > 0){
    price = $('.prodDetails .new-price').text().trim();
    price = filter_price(price);
  }
  else if($('.prodDetails .amount').length > 0){
    price = $('.prodDetails .amount').text().trim();
    price = filter_price(price);
  }
  if((price == "" || isNaN(price) || price == 0) && $('.totalCost').length > 0 && $('.totalCost .product-discount').length > 0){
    price = $('.totalCost:eq(0) .product-discount:eq(0)').text().trim();
    price = filter_price(price);
  }
  if((price == "" || isNaN(price) || price == 0) && $('.totalCost').length > 0 && $('.totalCost .product-cost').length > 0){
    price = $('.totalCost:eq(0) .product-cost:eq(0)').text().trim();
    price = filter_price(price);
  }
  return price;
}

function getAvailability(){
  var avail = 1;
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
  if(pid.split("-p-").length > 1){
    pid = pid.split("-p-")[1];

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
  if(pid.split("-p-").length > 1){
    pid = pid.split("-p-")[1];

  }
  if(link.split('.cbazaar.').length < 2){
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
  var len_bread = $('.breadCrum ul').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.breadCrum ul:eq(0)').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}


