//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;

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

function getProd(){
  var prod = "";
  if($('[itemprop="name"]').length > 0){
    prod = $('[itemprop="name"]:eq(0)').text().trim();
  }
  else{
    prod = $("h1:eq(0)").text().trim();
  }
  if($('meta[itemprop="productID"]').length>0){
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
  if($('#product-price .price').length > 0){
    price = $('#product-price .price').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.price-alert').text().toLowerCase().split("notify me when available").length > 1){
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
  if(pid.split("-p").length > 1){
    pid = pid.split("-p")[1];
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
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];

  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];

  }
  if(pid.split("-p").length > 1){
    pid = pid.split("-p")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];

    }
  }
  if(link.split('smartprix.com').length < 2){
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
  var len_bread = $('#breadcrumbs').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('#breadcrumbs').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}
