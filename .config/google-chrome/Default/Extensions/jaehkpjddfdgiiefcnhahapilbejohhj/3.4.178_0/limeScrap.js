function getCategory(){
  var categories = getBreadCrumb();
  var index = 2;
  var category = "";
  if(categories != "" && categories != undefined){
    categories = categories.split("*~");
    category = categories[index];
  }
  return category;
}
function sendPairs(){
  arrayToSend = [];

  if($('.item-small').length > 0){
    var slider = $('.item-small');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.item-small:eq('+ i +') .prd-img-container a').length > 0){
        link = $('.item-small:eq('+ i +') .prd-img-container:eq(0) a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("limeroad.com").length < 2){
            link = "http://www.limeroad.com/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.item-small:eq('+ i +')').find('.small-img-container img').length > 0 && $('.item-small:eq('+ i +')').find('.small-img-container img').attr("data-src")){
          image = $('.item-small:eq('+ i +')').find('.small-img-container:eq(0) img:eq(0)').attr("data-src");
          if(image.split("http").length < 2){
            image = "http:" + image;
          }

        }
        else if($('.item-small:eq('+ i +')').find('.small-img-container img').length > 0 && $('.item-small:eq('+ i +')').find('.small-img-container img').attr("src")){
          image = $('.item-small:eq('+ i +')').find('.small-img-container:eq(0) img:eq(0)').attr("src");
          if(image.split("http").length < 2){
            image = "http:" + image;
          }

        }
        if($('.item-small:eq('+ i +')').find('.prd-name').length > 0){
          prod = $('.item-small:eq('+ i +')').find('.prd-name:eq(0)').text().trim();
        }

        if($('.item-small:eq('+ i +')').find('.final-price .selling_price').length > 0){
          price = $('.item-small:eq('+ i +')').find('.final-price .selling_price:eq(0)').text().trim();
        }
        price = filter_price(price);
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  if($('.carousel-container .feed-prod').length > 0){
    var slider = $('.carousel-container .feed-prod');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 0;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.carousel-container .feed-prod:eq('+ i +')').length > 0){
        link = $('.carousel-container .feed-prod:eq('+ i +')').attr('href');
        if(link != ""){
          if(link.split("limeroad.com").length < 2){
            link = "http://www.limeroad.com/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.carousel-container .feed-prod:eq('+ i +')').find('img').length > 0 && $('.carousel-container .feed-prod:eq('+ i +')').find('img').attr("data-src")){
          image = $('.carousel-container .feed-prod:eq('+ i +')').find('img:eq(0)').attr("data-src");
          if(image.split("http").length < 2){
            image = "http:" + image;
          }

        }
        else if($('.carousel-container .feed-prod:eq('+ i +')').find('img').length > 0 && $('.carousel-container .feed-prod:eq('+ i +')').find('img').attr("src")){
          image = $('.carousel-container .feed-prod:eq('+ i +')').find('img:eq(0)').attr("src");
          if(image.split("http").length < 2){
            image = "http:" + image;
          }

        }
        if($('.carousel-container .feed-prod:eq('+ i +')').find('p').length > 0){
          price = $('.carousel-container .feed-prod:eq('+ i +')').find('p:eq(0)').text().trim();
          price = filter_price(price);
        }
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsLime': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}


function sendCurrent(){
  curData = [];   
  var prod = getProd();
  var image = getImage();
  var myPrice = getPrice();
  var PID = getPID();
  var cur_url = "";
  var current_status = 0;
  var avail = getAvailability();
  if(avail == 1){
    current_status = 0;
  }
  else if(avail == 0){
    current_status = 1;
  }
  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataLime': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if(cur_url.split("-p").length > 1 && $("#product_size_variants").length > 0){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

var check_prod_pg = 1;

function getProd(){
  var prod = "";
  var cur_url = window.location.href;
  if($('.product-overlay-wrapper .p_name').length > 0){
    prod = $('.product-overlay-wrapper:eq(0) .p_name:eq(0)').text().trim();
  }
  if(cur_url.split("-p").length > 1 && $("#product_size_variants").length > 0){
    return prod;
  }
  else{
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.product-overlay-wrapper .rg-image a').length > 0){
    image = $('.product-overlay-wrapper:eq(0) .rg-image a:eq(0)').attr('href');
    if(image.split("http").length < 2){
      image = "http:" + image;
    }
  }
  return image;
}

function getPrice(){
  price = "";
  if($('.product-overlay-wrapper .price.sPr').length > 0)
  {
    price = $('.product-overlay-wrapper .price.sPr:eq(0)').text().trim();
  }
  else if($('.product-overlay-wrapper .price').length > 0)
  {
    price = $('.product-overlay-wrapper .price:eq(0)').text().trim();
  }

  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($("#out_of_stock").css("display") == "block" || $("#out_of_stock").css("display") == "inline-block"){
    avail = 0;
  }
  return avail;

}
function getPID(){

  var link = window.location.href;
  //console.log("link: "+link);
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
  if(link == ""){
    pid = 0;
  }
  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];
  }
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];
  }
  if(pid.split("?").length > 1){
    pid = pid.split("?")[0];
  }
  if(link.split('limeroad.com').length < 2){
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
  if($('.breadcrumb ul').length > 0){
    var len_bread = $('.breadcrumb ul').find('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('.breadcrumb ul').find('a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }
  }
  return bread_final;
}
