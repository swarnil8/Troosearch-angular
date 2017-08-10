$ = jQuery.noConflict();
function getCategory(){
  var category = "";
  return category;
}
function sendPairs(){
  arrayToSend = [];
  
  if($('.item').length > 0){
    var slider = $('.item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var prod = "";
    var image = "";
    var oos = 100;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 100;
      if($('.item:eq('+ i +') .product_img').length > 0){
        link = $('.item:eq('+ i +') .product_img:eq(0)').attr('href');
      }
      else if($('.item:eq('+ i +') a').length > 0){
        link = $('.item:eq('+ i +') a:eq(0)').attr('href');
      }
      if(link.split("javascript:void(0);").length > 1){
        link = "";
      }
      if(link != ""){
        if(link.split("clovia.com").length < 2){
          link = "http://www.clovia.com"+link;
        }
        PID = returnPID(link);
      }
      else{
        PID = "";
      }
      if(PID != ""){
        if($('.item:eq('+ i +')').find('.primaryImage').length > 0){
          image = $('.item:eq('+ i +')').find('.primaryImage:eq(0)').attr("src");
          if(image.split('http').length < 2){
            image = 'http:'+image;
          }
        }
        if(image == ""){
          if($('.item:eq('+ i +')').find('.product-image img').length > 0){
            image = $('.item:eq('+ i +')').find('.product-image:eq(0) img:eq(0)').attr("src");
            if(image.split('http').length < 2){
              image = 'http:'+image;
            }
          }
        }
        if($('.item:eq('+ i +')').find('.product_img img').length > 0){
          prod = $('.item:eq('+ i +')').find('.product_img:eq(0) img:eq(0)').attr("alt").trim();
        }
        if(prod == ""){
          if($('.item:eq('+ i +')').find('.description').length > 0){
            prod = $('.item:eq('+ i +')').find('.description:eq(0) a:eq(0)').text().trim();
          }
        }
        if($('.item:eq('+ i +')').find('.finalPrice').length > 0){
          price = $('.item:eq('+ i +')').find('.finalPrice:eq(0)').text();
          price = filter_price(price);
        }
        else if($('.item:eq('+ i +')').find('.price').length > 0){
          price = $('.item:eq('+ i +')').find('.price:eq(0)').text();
          price = filter_price(price);
        }
      }
      if(PID != "" && price != "" && !isNaN(price)  && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }
  arrayToSend = JSON.stringify(arrayToSend);
  var jsonArr = [{'pairsClovia': arrayToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
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
  var jsonArr = [{'curDataClovia': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.productFilter').length > 0 && $('.sizesAvailble').length > 0){
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
  if($('.product-title').length > 0){
    prod = $('.product-title:eq(0)').text().trim();
    prod = prod.split("   ").join("").trim();
  }
  if($('.productFilter').length > 0 && $('.sizesAvailble').length > 0){
    return prod;
  }
  else{
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.gall-item').length > 0){
    image = $('.gall-item:eq(0)').attr('href');
    if(image.split('http').length < 2){
      image = 'http:'+image;
    }
  }
  return image;
}

function getPrice(){
  price = "";
  if($('.product-price .price-sales').length > 0)
  {
    price = $('.product-price:eq(0) .price-sales:eq(0)').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($("#id_out_of_stock").css("display") == "block"){
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
  if(pid.split("/product/").length > 1){
    pid = pid.split("/product/")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else{
    pid = 0;
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
  if(pid.split("/product/").length > 1){
    pid = pid.split("/product/")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else{
    pid = 0;
  }

  if(link.split('clovia.com').length < 2){
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
  if($('.breadcrumb').length > 0){
    var len_bread = $('.breadcrumb').find('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('.breadcrumb').find('a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }
  }
  return bread_final;
}
