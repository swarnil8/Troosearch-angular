       
//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;
function getCategory(){
  var category = "";
  return category;
}

function getProd(){
  var prod = "";
  prod = $(".descarea h2:eq(0)").text().trim();
  if($('.detailimg').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";

  image = $(".detailimg a:eq(0)").attr("href");
  if(image.split("floralis.in").length < 2){
    image = "http://www.floralis.in/" + image;
  }
  
  return image;
}

function getPrice(){
  price = "";
  if($('.pricerate .productSpecialPrice').length > 0)
  {
    price = $('.pricerate .productSpecialPrice').text().trim();
  }
  else if($('.pricerate').length > 0)
  {
    price = $('.pricerate').text().trim();
  }
  
  price = filter_price(price);
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
    pid = pid.split("-p-");
    pid = pid[1];
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
    pid = pid.split("-p-");
    pid = pid[1];
  }
  if(link.split('floralis.in').length < 2){
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

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.breadcrumb').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}
