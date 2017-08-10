var check_prod_pg = 1;
alertPosition = -1;
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
  if($('[itemtype="http://schema.org/Product"]').length>0 || $("#prdct_conteiner_main").length > 0){
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
  pr_min = 10000000000;
  if($('#deals .deal-store').length > 0){
    for(i=0;i<$('#deals .deal-store').length;i++){
      if($('#deals .deal-store:eq(' + i + ')').find('.eff-price').length > 0){
        price = $('#deals .deal-store:eq(' + i + ')').find('.eff-price').text().trim();
        price = filter_price(price);
        if(price < pr_min && price != 0){
          pr_min = price;
        }
      }
    }

  }
  if(pr_min != 10000000000 && pr_min != "" && pr_min != 0){
    price = pr_min;
  }
  // price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  p = getPrice();
  if(p == "" || p == 0){
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
  
  if(link.split('buyingiq.com').length < 2){
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
  var len_bread = $('.header-links').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.header-links').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}

