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
function sendPairs(){
  arrayToSend = [];

  if($('.chart-listitem').length > 0){
    var slider = $('.chart-listitem');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.chart-listitem:eq('+ i +') .info').find('h1 a').length > 0){
        link = $('.chart-listitem:eq('+ i +') .info').find('h1 a:eq(0)').attr("href");
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

          if(PID.split("-").length > 1){
            PID = PID.split("-");
            PID = PID[PID.length - 1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[0];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){

        if($('.chart-listitem:eq('+ i +')').find('.price-current').length > 0){
          price = $('.chart-listitem:eq('+ i +')').find('.price-current').text();

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
        arrayToSend.push([PID, price]);
      }

    } // for ends1

  }

  if($('.product').length > 0){
    var slider = $('.product');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.product:eq('+ i +') .info').find('h1 a').length > 0){
        link = $('.product:eq('+ i +') .info').find('h1 a:eq(0)').attr("href");
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
          
          if(PID.split("-").length > 1){
            PID = PID.split("-");
            PID = PID[PID.length - 1];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[0];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){

        if($('.product:eq('+ i +')').find('.pricelabel').length > 0){
          price = $('.product:eq('+ i +')').find('.pricelabel').text();

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
        arrayToSend.push([PID, price]);
      }

    } // for ends1

  }
  arrayToSend = JSON.stringify(arrayToSend);
  var jsonArr = [{'pairsLandmark': arrayToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);  
}


function sendCurrent(){
  curData = [];   
  var prod = "";
  var image = "";
  var myPrice = "";
  var cur_url = "";
  var PID = "";
  var current_status = 0;
  
  prod = getProd();

  var avail = getAvailability();
  if(avail == 1){
    current_status = 0;
  }
  else if(avail == -1){
    current_status = 2;
  }
  else{
    current_status = 1;
  }
  myPrice = getPrice();
  image = getImage();
  var link = window.location.href;

  if(link != ""){
    PID = returnPID(link);
  }
  else{
    PID = "";
  }


  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataLandmark': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('#product-details').length>0){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);



//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;


function getProd(){
  var prod = "";
  if($("#product-details-name").length > 0){
    prod = $("#product-details-name").text().trim();
  }
  else if($("h1").length > 0){
    prod = $('h1').text().trim(); 
  }
  // //console.log("prod: "+prod);
  if($('#product-details').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($("").length > 0){
    image = $('.imagemain').attr('href');
    if(image.split("http:").length==1){
      image = "http:" + image;
    }
  }
  else if($('meta[name="twitter:image:src"]')){
    image = $('meta[name="twitter:image:src"]').attr('content').trim();
  }
  return image;
}

function getPrice(){
  price = "";
  if($('.price-current').length > 0){
    price = $('.price-current').text().trim();
  }
  else if($("#products-details-price-current-01").length > 0){
    price = $("#products-details-price-current-01").text().trim();
  }
  else
  {
    price = "0";
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if(($('#main-content').length > 0) && ($('#main-content').text().toUpperCase().split('CURRENTLY UNAVAILABLE').length > 1)){
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
  if(pid.split("/p/").length > 1){
    pid = pid.split("/p/");
    pid = pid[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else{
    pid = "";
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
  if(pid.split("/p/").length > 1){
    pid = pid.split("/p/");
    pid = pid[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/")[0];
    }
  }
  else{
    pid = 0;
  }
  if(link.split('landmarkshops.in').length < 2){
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
  var len_bread = $('#product-breadcrumbs').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('#product-breadcrumbs').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}

function sendCoupon(){
  couponToSend = [];
  var cur_link = window.location.href;
  var couponUrl = "";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  var couponAt = 7;
  couponUrl = "http://www.landmarkonthenet.com/";
  couponCode = "";
  couponText = "";
  couponDesc = "";
  last_bread = 0;
  slider = $('#main-column .static-content li');
  sliderLength = slider.length;

  for(i=0;i<sliderLength;i++){
    couponUrl = "http://www.landmarkonthenet.com/";
    couponCode = "";
    couponText = "";
    couponDesc = "";
    couponExp = 0;

    couponCode = "NO CODE REQUIRED";
    couponUrl = $('#main-column .static-content li:eq('+i+') a:eq(0)').attr("href");
    couponText = $('#main-column .static-content li:eq('+i+') a:eq(0)').text().trim();
    if(couponText == undefined || couponText == "undefined"){
      couponCode = "";
    }

    if(couponUrl.split("landmarkonthenet.com").length < 2){
      couponUrl = "http://www.landmarkonthenet.com"+couponUrl;
    }
    if(couponCode != ""){
      couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
    }
  }
  couponToSend = JSON.stringify(couponToSend);
  var jsonArr = [{'couponsExt': couponToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 15, doNothing, []);  
}
sendCoupon()
