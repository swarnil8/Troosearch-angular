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
  arrayToSend = [];
  
  if($('.slides .main-sl').length > 0){
    var slider = $('.slides .main-sl');
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
      if($('.slides .main-sl:eq('+ i +') .left-img-second a').length > 0){
        link = $('.slides .main-sl:eq('+ i +') .left-img-second:eq(0) a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("nykaa.com").length < 2){
            link = "http://www.nykaa.com/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.slides .main-sl:eq('+ i +')').find('.left-img-second img').length > 0){
          image = $('.slides .main-sl:eq('+ i +')').find('.left-img-second:eq(0) img:eq(0)').attr("src");
          
        }
        if($('.slides .main-sl:eq('+ i +')').find('.right-div-second h3').length > 0){
          prod = $('.slides .main-sl:eq('+ i +')').find('.right-div-second h3:eq(0)').text().trim();
          prod = prod.split("   ").join("").trim();
        }

        if($('.slides .main-sl:eq('+ i +')').find('.right-div-second .rs').length > 0){
          price = $('.slides .main-sl:eq('+ i +')').find('.right-div-second .rs').html();
          price = price.split(">");
          price = price[price.length - 1];
        }
        price = filter_price(price);
      }
      if(PID != "" && price != "" && !isNaN(price)  && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }


  if($('.product-box').length > 0){
    var slider = $('.product-box');
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
      if($('.product-box:eq('+ i +') .product-image a').length > 0){
        link = $('.product-box:eq('+ i +') .product-image:eq(0) a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("nykaa.com").length < 2){
            link = "http://www.nykaa.com/"+link;
          }
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.product-box:eq('+ i +')').find('.product-image img').length > 0){
          image = $('.product-box:eq('+ i +')').find('.product-image:eq(0) img:eq(0)').attr("src");
          
        }
        if($('.product-box:eq('+ i +')').find('.product-image a').attr("title")){
          prod = $('.product-box:eq('+ i +')').find('.product-image:eq(0) a').attr("title").trim();
          prod = prod.split("   ").join("").trim();
        }
        if($('.product-box:eq('+ i +')').find('.price-box .special-price').length > 0){
          price = $('.product-box:eq('+ i +')').find('.price-box .special-price').text().trim();
        }
        else  if($('.product-box:eq('+ i +')').find('.price-box .regular-price').length > 0){
          price = $('.product-box:eq('+ i +')').find('.price-box .regular-price').text().trim();
        }
        price = filter_price(price);
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  arrayToSend = JSON.stringify(arrayToSend);
  var jsonArr = [{'pairsNykaa': arrayToSend}];
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
  var jsonArr = [{'curDataNykaa': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.product-view').length > 0){
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
  if($('.product-view .product-name').length > 0){
    prod = $('.product-view:eq(0) .product-name:eq(0)').text().trim();
    prod = prod.split("   ").join("").trim();
  }
  if($('.product-view').length > 0){
    return prod;
  }
  else{
    return "";
  }
}

function getImage(){
  var image = "";
  var image1 = "";
  if($('.zoomWindowContainer .zoomWindow').length > 0){
    image1 = $('.zoomWindowContainer:eq(0) .zoomWindow:eq(0)').attr('style');
    if(image1.split('url("').length > 1){
      image1 = image1.split('url("');
      //  
      image1 = image1[1];
      image1 = image1.split('"');
      image = image1[0].trim();

    }
  }
  return image;
}

function getPrice(){
  price = "";
  if($('.price-box .special-price .price').length > 0)
  {
    price = $('.price-box .special-price:eq(0) .price:eq(0)').text().trim();
  }
  else if($('.price-box .regular-price .price').length > 0)
  {
    price = $('.price-box .regular-price:eq(0) .price:eq(0)').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($(".product-shop .out-of-stock").css("display") == "block"){
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
  if(link.split('nykaa.com').length < 2){
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
  if($('.breadcrumb-cat').length > 0){
    var len_bread = $('.breadcrumb-cat').find('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('.breadcrumb-cat').find('a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }
  }
  return bread_final;
}


// /////////////// WISH TO WATCH LIST STARTS ///////////////

var cur_url = window.location.href;
if(cur_url.split("/wishlist").length > 1 && (cur_url.split("nykaa.com").length > 1)){
  if($('#my-wishlist').length>0){
    importWishGlobal('#my-wishlist', 'before', nykWishList);
  }
}

function nykWishList(){
  wishListNyk = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 1830;
  var brand = "";

  if($('#my-wishlist .product-box').length > 0) {
    var slider = $('#my-wishlist .product-box');
    var sliderLength = $('#my-wishlist .product-box').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('#my-wishlist .product-box:eq('+ i +')').find('.product-name a').length > 0){
        link = $('#my-wishlist .product-box:eq('+ i +')').find('.product-name a').attr('href');
        url = link;
        if(link.split("www.nykaa.com").length < 2){
         link = "https://www.nykaa.com"+link;
         url = link;
       }
       PID = returnPID(link);

     }
     else{
      link = "";
      PID = "";
    }
    price = 0;

    if($('#my-wishlist .product-box:eq('+ i +')').find('.product-name a').length > 0){
      prod = $('#my-wishlist .product-box:eq('+ i +')').find('.product-name a:eq(0)').text().trim();
      if(prod.split("...").length > 1){
        prod = prod.split("...");
        prod = prod[0].trim();
      }
    }

    if($('#my-wishlist .product-box:eq('+ i +')').find('.product-image img').length > 0){
      image = $('#my-wishlist .product-box:eq('+ i +')').find('.product-image img:eq(0)').attr('src').trim();
      if(image.split("http").length < 2){
        image = "http:"+image;
      }
    }
    if($('#my-wishlist .product-box:eq('+ i +')').find('.price-box').length > 0){
      price = $('#my-wishlist .product-box:eq('+ i +')').find('.price-box:eq(0) h3:eq(0)').text().trim();
      price = filter_price(price);
    }

    if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
      wishListNyk.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
    }
  }

  wishJson = JSON.stringify(wishListNyk);
  var jsonArr = [{'wishList': wishJson}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 17, alertWLResp, []);  
}

}
function alertWLResp(data){
  alert(data);
}
// /////////////// WISH TO WATCH LIST ENDS ///////////////

