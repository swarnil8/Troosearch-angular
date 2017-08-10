$ = jQuery.noConflict();
function getCategory(){
  var category = "";
  return category;
}
var check_prod_pg = 1;

function getProd(){
  var prod = "";
  if($('.pro_detail h1').length > 0){
    prod = $('.pro_detail h1:eq(0)').text().trim();
  }
  else if($('h1').length > 0){
    prod = $('h1:eq(0)').text().trim();
  }
  if($('.pro_detail').length>0 || $("[itemtype='http://schema.org/Product']").length > 0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.pro_detail .pro_detail_image img').length > 0){
    image = $('.pro_detail .pro_detail_image img:eq(0)').attr('src').trim();
  }
  else if($("#detailImage1").length > 0){
    image = $("#detailImage1").attr("src");
  }
  return image;
}

function getPrice(){
  price = "";
  if($('#prdMrpINR').length > 0){
    price = $('#prdMrpINR').text().trim();
  }
  else if($('[itemprop="price"]').length > 0)
  {
    price = $('[itemprop="price"]:eq(0)').text().trim();
  }
  if((price == "" || price == 0 ) && $('[itemprop="price"]:eq(0)').length > 0 && $('[itemprop="price"]:eq(0)').attr('content')){
    price = $('[itemprop="price"]:eq(0)').attr('content').trim();
  }
  price = filter_price(price);
  if(isNaN(price)){
    price = "";
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('#ATCaddToCart').length == 0){
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
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];
  }
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm")[0];
    if(pid.split("-").length > 1){
      pid = pid.split('-');
      pid = pid[pid.length - 2];
    }
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  return pid;
}

function returnPID(link){

  var pid = link;
  
  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];

  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];

  }
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm")[0];
    if(pid.split("-").length > 1){
      pid = pid.split('-');
      pid = pid[pid.length - 2];
    }
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];

    }
  }
  if(link.split('fnp.com').length < 2){
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
  var len_bread = $('.bcrum').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.bcrum').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}
