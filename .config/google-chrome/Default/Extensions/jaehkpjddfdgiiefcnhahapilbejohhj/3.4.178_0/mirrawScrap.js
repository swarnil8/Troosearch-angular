//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;

function getCategory(){
  var category = "";
  return category;
}

function getProd(){
  var prod = "";
  prod = $("h1").text().trim();
  if($('[itemtype="http://schema.org/Product"]').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('[itemprop="image"]').length > 0){
    image = $('[itemprop="image"]:eq(0)').attr('content');
    if(image.split("http").length < 2){
      image = "http:" + image;
    }
  }
  else if($('meta[property="og:image"]').length > 0){
    image = $('meta[property="og:image"]').attr('content').trim();
  }
  else if($('.product_image_pane img').length > 0)
  {
    image = $('.product_image_pane img:eq(0)').attr('src').trim();
    if(image.split("http").length < 2){
      image = "http:" + image;
    }
  }
  
  return image;
}

function getPrice(){
  price = "";
  if($('.discount_old_price .floatl').length > 0)
  {
    pr_len = $('.discount_old_price .floatl').length-1;
    price = $('.discount_old_price .floatl:eq('+pr_len+')').text().trim();
  }
  else if($('[itemprop="price"]').length > 0){
    price = $('[itemprop="price"]:eq(0)').attr('content');
  }
  else if($('.product_spec_pane .price_label').length > 0)
  {
    price = $('.product_spec_pane .price_label').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.out_of_stock').length > 0){
    avail = 0;
  }
  
  return avail;

}
function getBreadCrumb(){
  return "";
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
  if(link.split('mirraw.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  return pid;
}
