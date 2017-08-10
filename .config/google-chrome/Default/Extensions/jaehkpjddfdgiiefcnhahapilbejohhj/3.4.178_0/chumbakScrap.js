$ = jQuery.noConflict();

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
      if($('.item:eq('+ i +')').length > 0){
        link = $('.item:eq('+ i +')').parent().attr("href");
        if(link == undefined || link == ""){
          link = $('.item:eq('+ i +') a:eq(0)').attr("href");
        }
        if(link != "" && link != undefined){
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
        if($('.item:eq('+ i +')').find('.img-div').length > 0){
          prod = $('.item:eq('+ i +')').find('.img-div').attr("title").trim();
        }
        if($('.item:eq('+ i +')').find('.img-div').attr("afkl-lazy-image")){
          image = $('.item:eq('+ i +')').find('.img-div').attr("afkl-lazy-image").trim();
        }
        else if($('.item:eq('+ i +')').find('.img-div img').length > 0){
          image = $('.item:eq('+ i +')').find('.img-div img:eq(0)').attr("src").trim();
        }
        
        price = $('.item:eq('+ i +') .product-price:eq(0) .font-wt-reg:eq(0)').text().trim();
        price = filter_price(price);
      }
      else{
        price = "";
      }
      if(isNaN(price)){
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends1

  }

  if($('.product-grid li').length > 0){
    var slider = $('.product-grid li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.product-grid li:eq('+ i +') a').length > 0){
        link = $('.product-grid li:eq('+ i +') a:eq(0)').attr("href");
        if(link != "" && link != undefined){
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
        if($('.product-grid li:eq('+ i +')').find('.special-price').length > 0){

          price = $('.product-grid li:eq('+ i +')').find('.special-price').text();

        }
        else if($('.product-grid li:eq('+ i +')').find('.regular-price').length > 0){
          price = $('.product-grid li:eq('+ i +')').find('.regular-price').text();

        }
        else if($('.product-grid li:eq('+ i +')').find('.price-box').length > 0){
          price = $('.product-grid li:eq('+ i +')').find('.price-box').text();

        }
        else{
          price = "";
        }
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
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
  else if($('.product-grid a').length > 0){
    var slider = $('.product-grid a');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.product-grid a:eq('+ i +')').length > 0){
        link = $('.product-grid a:eq('+ i +')').attr("href");
        if(link != "" && link != undefined){
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
        if($('.product-grid a:eq('+ i +')').find('.product-price').length > 0){
          price = $('.product-grid a:eq('+ i +')').find('.product-price').text();

        }
        else{
          price = "";
        }
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
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
  if($('#slideInner .unbxd-width-100:eq(2) .unbxd-width-x').length > 0){
    var slider = $('#slideInner .unbxd-width-100:eq(2) .unbxd-width-x');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#slideInner .unbxd-width-100:eq(2) .unbxd-width-x:eq('+ i +') a').length > 0){
        link = $('#slideInner .unbxd-width-100:eq(2) .unbxd-width-x:eq('+ i +') a:eq(0)').attr("href");
        if(link != "" && link != undefined){
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
        price = $('#slideInner .unbxd-width-100:eq(2) .unbxd-width-x:eq('+ i +') a:eq(0)').text().trim();
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
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

  if($('.banner_products_packery a').length > 0){
    var slider = $('.banner_products_packery a');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.banner_products_packery a:eq('+ i +')').length > 0){
        link = $('.banner_products_packery a:eq('+ i +')').attr("href");
        if(link != "" && link != undefined){
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
        price = $('.banner_products_packery a:eq('+ i +') .product-price:eq(0)').text().trim();
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
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

  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsChumbak': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}


function sendCurrent(){
  curData = [];   
  var prod = "";
  var image = "";
  var myPrice = "";
  var PID = "";
  var cur_url = "";
  var current_status = 0;

  if($('.product-title-text').length > 0){
    prod = $('.product-title-text:eq(0)').text().trim();
  }
  else if($('.product-detail-sidebar .discription h2').length > 0){
    prod = $('.product-detail-sidebar .discription h2:eq(0)').text().trim();
  } 
  if($("#errror404").length > 0){
    current_status = 1;
  }
  else if($('#add-to-cart-btn').length == 0){
    current_status = 1;
  }
  if(getAvailability() == 0){
    current_status = 1;
  }
  if(current_status == 0){
    myPrice = getPrice();
  }
  else{
    myPrice = "0";
  }
  image = getImage();
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


  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataChumbak': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.details-panel').length > 0){
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
  if($('.product-title-text').length > 0){
    prod = $('.product-title-text:eq(0)').text().trim();
  }
  else if($('.product-detail-sidebar .discription h1').length > 0){
    prod = $('.product-detail-sidebar .discription h1:eq(0)').text().trim();
  }
  else if($('.product-detail-sidebar .discription h2').length > 0){
    prod = $('.product-detail-sidebar .discription h2:eq(0)').text().trim();
  }
  // //console.log("prod: "+prod);
  if($('.details-panel').length > 0){
    return prod;
  }
  else{
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.prod_img img').length > 0){
    image = $('.prod_img img').attr('src');
  }
  else if($("#owl-demo .owl-item img").length > 0){
    image = $("#owl-demo .owl-item img").attr('src');
  }
  if(image == ""){
    image = $('meta[name="twitter:image"]').attr('content').trim();
  }
  return image;
}

function getPrice(){
  price = "";
  if($('.product-price-text').length > 1)
  {
    price = $('.product-price-text').text().trim();
  }
  else if($('.product-detail-sidebar .discription h3 .strike').length > 0){
    price = $('.product-detail-sidebar .discription h3 span:eq(1)').text().trim();
  }
  else if($('.product-detail-sidebar .discription h3').length > 0){
    price = $('.product-detail-sidebar .discription h3:eq(0)').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($("#errror404").length > 0){
    avail = 0;
  }
  else if($('#add-to-cart-btn').length == 0){
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

  if(pid.split("/").length > 1){
    pid1 = pid.split("/");
    pid1 = pid1[pid1.length-1];
    if(pid1.trim() == ""){
      pid1 = pid.split("/");
      pid1 = pid1[pid1.length-2];
    }
    pid = pid1;
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
  if(pid.split("/").length > 1){
    pid1 = pid.split("/");
    pid1 = pid1[pid1.length-1];
    if(pid1.trim() == ""){
      pid1 = pid.split("/");
      pid1 = pid1[pid1.length-2];
    }
    pid = pid1;
  }
  if(link.split('chumbak.com').length < 2){
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
  if($('.bread-crumb .ng-scope').length > 0){
    var len_bread = $('.bread-crumb .ng-scope').find('a:eq(0)').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('.bread-crumb .ng-scope:eq('+ i +')').find('a:eq(0)').text().trim();
      if(breadcrumb != ""){
        bread_final += breadcrumb + "*~";
      }
    }
  }
  else  if($('.product-breadcrumb').length > 0){
    var len_bread = $('.product-breadcrumb').find('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('.product-breadcrumb').find('a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }
  }
  return bread_final;
}


// /////////////// WISH TO WATCH LIST STARTS ///////////////

var wish_call = "";
function importWishChum(){
  if($('.wishlist-modal').length>0 && $('.wishlist-modal .modal-title').length>0 && $("#importHatke").length == 0){
    importWishGlobal('.wishlist-modal .modal-title:eq(0)', 'before', chumWishList);
  }
  else{
    wish_call = setInterval(function(){
      importWishChum();
    }, 2500)
  }
}

importWishChum();

function chumWishList(){
  wishListChum = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 902;
  var brand = "";
  if($('.wishlist-modal .item-wrap-modal .product-item').length > 0) {
    var slider = $('.wishlist-modal .item-wrap-modal .product-item');
    var sliderLength = $('.wishlist-modal .item-wrap-modal .product-item').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').parent().attr('ng-href')){
        link = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').parent().attr('ng-href');
        url = link;
        if(link.split("chumbak.com").length < 2){
          link = "https://www.chumbak.com"+link;
          url = link;
        }
        PID = returnPID(link);
      }
      else{
        link = "";
        PID = "";
      }
      price = 0;

      if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-name').length > 0){
        prod = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-name:eq(0)').text().trim();
        if(prod.split("...").length > 1){
          prod = prod.split("...");
          prod = prod[0].trim();
        }
        prod = prod.split("&nbsp;");
        prod = prod.join(" ");
        prod = prod.trim();
      }

      if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('img').length > 0){
        image = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('img:eq(0)').attr('src').trim();
      }
      if($('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-price').length > 0 && $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-price .font-wt-reg').length > 0){
        price = $('.wishlist-modal .item-wrap-modal .product-item:eq('+ i +')').find('.product-price:eq(0) .font-wt-reg:eq(0)').text().trim();
        price = filter_price(price);
      }
      if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
        wishListChum.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
      }
    }

    wishJson = JSON.stringify(wishListChum);
    var jsonArr = [{'wishList': wishJson}];
    jsonArr = JSON.stringify(jsonArr);
    clearInterval(wish_call);
    sendMessage(1, jsonArr, 17, alertWLResp, []);  
  }

}
function alertWLResp(data){
  alert(data);
}
// /////////////// WISH TO WATCH LIST ENDS ///////////////
