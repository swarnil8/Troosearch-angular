function getCategory(){
  var category = "";
  return category;
}

function getBreadCrumb(){
  return "";
}
var check_prod_pg = 1;

function getProd(){
  var prod = "";
  prod = $('.product-info .title label:eq(0)').text().trim();
  if($('.product-detail').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  image = $('.summary .cover-img img').attr('src');
  return image;
}

function getPrice(){
  var price = "";
  var myPrice = "";
  if($('.product-info .price .sale').length > 0)
  {
    myPrice = $('.product-info .price .sale').text();
  }
  price = myPrice;
  price = filter_price(price);
  if(isNaN(price)){
    price = "";
  }
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
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];

  }
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm")[0];

  }
  if(pid.split("/").length > 1){
    pid1 = pid.split("/");
    pid1 = pid1[pid1.length - 1];
    if(pid1 == ""){
      pid = pid.split("/");
      pid = pid[pid.length - 2];
    }
    else{
      pid = pid1;
    }

  }
  if(isNaN(pid)){
    pid = 0;
  }
  if(pid.length != 13){
    pid = "";
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

  }
  if(pid.split("/").length > 1){
    pid1 = pid.split("/");
    pid1 = pid1[pid1.length - 1];
    if(pid1 == ""){
      pid = pid.split("/");
      pid = pid[pid.length - 2];
    }
    else{
      pid = pid1;
    }

  }
  if(isNaN(pid)){
    pid = 0;
  }
  if(pid.length != 13){
    pid = "";
  }
  if(link.split('uread.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  return pid;
}
