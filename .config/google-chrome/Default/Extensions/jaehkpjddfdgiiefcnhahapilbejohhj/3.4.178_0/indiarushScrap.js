$ = jQuery.noConflict();

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
  $ = jQuery.noConflict();
  arrayToSend = [];
  if($('.item').length > 0){
    var slider = $('.item');
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
      if($('.item:eq('+ i +') a').length > 0){
        link = $('.item:eq('+ i +') a:eq(0)').attr("href");
        if(link != ""){
          PID = link;
          if(PID.split("?").length > 1){
            PID = PID.split("?");
            PID = PID[0];
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){

        if($('.item:eq('+ i +')').find('.product-name').length > 0){
          prod = $('.item:eq('+ i +')').find('.product-name:eq(0) a:eq(0)').attr("title").trim();
          // if(prod.split(" - ").length > 1){
          //   prod = prod.split(" - ");
          //   prod = prod[0].trim();
          // }
        }
        if($('.item:eq('+ i +')').find('.product-image').length > 0){
          image = $('.item:eq('+ i +')').find('.product-image:eq(0) img:eq(0)').attr("src");
        }
        if($('.item:eq('+ i +')').find('.special-price').length > 0){

          price = $('.item:eq('+ i +')').find('.special-price').text();
          price = filter_price(price);

        }
        else if($('.item:eq('+ i +')').find('.product-price-discount').length > 0){

          price = $('.item:eq('+ i +')').find('.product-price-discount').html();
          if(price.split("</strike>").length > 1){
            price = price.split("</strike>");
            price = price[1];
            price = price.split("<span");
            price = price[0].trim();
            price = filter_price(price);
          }

        }
        else if($('.item:eq('+ i +')').find('.regular-price').length > 0){
          price = $('.item:eq('+ i +')').find('.regular-price').text();
          price = filter_price(price);

        }

        else if($('.item:eq('+ i +')').find('.price-box').length > 0){
          price = $('.item:eq('+ i +')').find('.price-box').text();

          price = filter_price(price);
        }
        else if($('.item:eq('+ i +')').find('.similar-product-img-price').next().length > 0){
          price = $('.item:eq('+ i +')').find('.similar-product-img-price').next().text();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[price.length - 1];
          }
          price = filter_price(price);
        }
        else{
          price = "";
        }

      }
      else{
        price = "";
      }

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends1

  }

  if($('.products-grid td').length > 0){
    var slider = $('.products-grid td');
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
      if($('.products-grid td:eq('+ i +') a').length > 0){
        link = $('.products-grid td:eq('+ i +') a:eq(0)').attr("href");
        if(link != ""){
          PID = link;
          if(PID.split("?").length > 1){
            PID = PID.split("?");
            PID = PID[0];
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){

        if($('.products-grid td:eq('+ i +')').find('.product-name').length > 0){
          prod = $('.products-grid td:eq('+ i +')').find('.product-name:eq(0) a:eq(0)').attr("title").trim();
          // if(prod.split(" - ").length > 1){
          //   prod = prod.split(" - ");
          //   prod = prod[0].trim();
          // }
        }
        if($('.products-grid td:eq('+ i +')').find('.product-image').length > 0){
          image = $('.products-grid td:eq('+ i +')').find('.product-image:eq(0) img:eq(0)').attr("src");
        }
        if($('.products-grid td:eq('+ i +')').find('.special-price').length > 0){

          price = $('.products-grid td:eq('+ i +')').find('.special-price').text();

        }
        else if($('.products-grid td:eq('+ i +')').find('.regular-price').length > 0){
          price = $('.products-grid td:eq('+ i +')').find('.regular-price').text();

        }
        else if($('.products-grid td:eq('+ i +')').find('.price-box').length > 0){
          price = $('.products-grid td:eq('+ i +')').find('.price-box').text();

        }
        else if($('.products-grid td:eq('+ i +')').find('.similar-product-img-price').next().length > 0){
          price = $('.products-grid td:eq('+ i +')').find('.similar-product-img-price').next().text();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[price.length - 1];
          }

        }
        else{
          price = "";
        }
        if(price.split("Rs").length > 1){
          price = price.split("Rs");
          price =price[1];
        }
        price = price.split(",").join("").trim();


      }
      else{
        price = "";
      }

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends1

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsIndia': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);  
  }
}

function sendCurrent(){
  $ = jQuery.noConflict();
  curData = [];   
  var prod = "";
  var image = "";
  var myPrice = "";
  var cur_url = "";
  var PID = "";
  var current_status = 0;
  

  if($('.product-name').length){
    prod = $('.product-name:eq(0)').text().trim();
  }
  else if($('[itemprop="name"]').length > 0){
    prod = $('[itemprop="name"]').text().trim();  
  }

  if(($(".product-options-bottom").length > 0) && ($(".product-options-bottom").text().toUpperCase().split("OUT OF STOCK").length > 1)){
    current_status = 1;
  }
  else if($('body').text().toUpperCase().split('GOT WRONG SOMEWHERE').length > 1){
    current_status = 1;
  }
  else if(($('.page-title').length > 0) && ($('.page-title').text().split('404').length > 1)){
    current_status = 1;
  }
  else{
    current_status = 0;
  }

  if(getAvailability() == 0){
    current_status = 1;
  }
  else if(getAvailability() == 1){
    current_status = 0;
  }
  if(current_status == 0){ 
    myPrice = getPrice();
  }
  else{
    myPrice = "0";
  }
  image = $('#wrap img[itemprop="image"]').attr('src');
  if(image=="" || image == "null" || image == null){
    image = $('.more-views li').eq(0).find('a').attr("href");
  }

  var link = window.location.href;
  

  if(link != ""){
    PID = link;
    if(PID.split("?").length > 1){
      PID = PID.split("?");
      PID = PID[0];
    }
    if(PID.split("#").length > 1){
      PID = PID.split("#");
      PID = PID[0];
    }
  }
  else{
    PID = "";
  }

  var linkCheck = PID;
  linkCheck = linkCheck.split("/");
  liC = linkCheck[linkCheck.length-1];
  if(liC==""){
    liC = linkCheck[linkCheck.length-2];
  }
  // if(liC!=""){
    liC = liC.split("-");
    liC = liC[liC.length-1];
    cur_url = window.location.href;
    // if(!isNaN(liC)){

      cur_url = window.location.href;
      curData.push([prod, image, myPrice, cur_url, current_status, PID]);
      curData = JSON.stringify(curData);
      var jsonArr = [{'curDataIndia': curData}];
      jsonArr = JSON.stringify(jsonArr);
      if($('.product-view').length > 0){
        sendMessage(0, jsonArr, 0, doNothing, []);
      }


    // }
  // }
}



var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);


//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;

function getProd(){
  var prod = "";
  if($('.product-title-text').length > 0){
    prod = $('.product-title-text:eq(0)').text().trim();
  }
  else if($('[itemprop="name"]').length > 0){
    prod = $('[itemprop="name"]:eq(0)').text().trim();
  }
  // //console.log("prod: "+prod);

  if($('.product-view').length > 0){
    return prod;
  }
  else {
    return "";
  }

}

function getImage(){
  var image = "";

  image = $('#wrap img[itemprop="image"]').attr('src');
  
  return image;
}

function getPrice(){
  price = "";
  if($('[itemprop="price"]').length > 0){
    price = $('[itemprop="price"]').text().trim();
  }
  price = filter_price(price);
  if(isNaN(price) || price == "" || price == 0 || price == undefined){
    price = $("#regular_price_id").text().trim();
    price = filter_price(price);
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  if(($(".product-options-bottom").length > 0) && ($(".product-options-bottom").text().toUpperCase().split("OUT OF STOCK").length > 1)){
    avail = 0;
  }
  else if($('body').text().toUpperCase().split('GOT WRONG SOMEWHERE').length > 1){
    avail = 0;
  }
  else if(($('.page-title').length > 0) && ($('.page-title').text().split('404').length > 1)){
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
  if(link.split('indiarush.com').length < 2){
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
  var len_bread = $('.breadcrumbs').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.breadcrumbs').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}


