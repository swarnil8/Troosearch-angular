function getISBN(link){
  var isbn = "";
  if(link){
    if(link.split("#").length > 1){
      link = link.split("#");
      link = link[0];
    }
    if(link.split("?").length > 1){
      link = link.split("?");
      link = link[0];
    }
    if(link.split("&").length > 1){
      link = link.split("&");
      link = link[0];
    }
    if(link.split("-").length > 1){
      link = link.split("-");
      link = link[link.length-1];

      if(link.split("/").length > 1){
        link = link.split("/");
        link = link[0];
      }

      if(isValidISBN(link.toString())){
        isbn = link.trim();
      }
    }
  }

  return isbn;

}

function sendPairs(){
  arrayToSend = [];
  if($('.main-book').length > 0){
    var slider = $('.main-book');
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
      if($('.main-book:eq('+ i +') a').length > 0){
        link = $('.main-book:eq('+ i +') a:eq(0)').attr('href');
        if(link.split("acadzone.com/").length < 2){
          link = "http://www.acadzone.com"+link;
        }
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.main-book:eq('+ i +')').find('.book_title').length > 0){
          prod = $('.main-book:eq('+ i +')').find('.book_title:eq(0)').text().trim(); 
        }

        if($('.main-book:eq('+ i +')').find('img').length > 0 && $('.main-book:eq('+ i +')').find('img').attr("src")){
          image = $('.main-book:eq('+ i +')').find('img').attr("src"); 
        }
        if($('.main-book:eq('+ i +')').find('.book_price').length > 0){
          price = $('.main-book:eq('+ i +')').find('.book_price:eq(0)').html();
          if(price.split(">").length > 1){
            price = price.split(">");
            price = price[price.length - 1];
            price = filter_price(price);
          }
        }
      }

      else{
        price = "";
      }

      var isbn = getISBN(link);
      if(isbn != "" && prod != ""){
        prod = prod + " " + isbn;
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  if($('.prod-outr-three').length > 0){
    var slider = $('.prod-outr-three');
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
      if($('.prod-outr-three:eq('+ i +') a').length > 0){
        link = $('.prod-outr-three:eq('+ i +') a:eq(0)').attr('href');
        if(link.split("acadzone.com/").length < 2){
          link = "http://www.acadzone.com"+link;
        }
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.prod-outr-three:eq('+ i +')').find('img').length > 0 && $('.prod-outr-three:eq('+ i +')').find('img:eq(0)').attr('alt')){
          prod = $('.prod-outr-three:eq('+ i +')').find('img:eq(0)').attr('alt').trim(); 
        }

        if($('.prod-outr-three:eq('+ i +')').find('img').length > 0 && $('.prod-outr-three:eq('+ i +')').find('img').attr("src")){
          image = $('.prod-outr-three:eq('+ i +')').find('img').attr("src"); 
        }
        if($('.prod-outr-three:eq('+ i +')').find('.book_price').length > 0){
          price = $('.prod-outr-three:eq('+ i +')').find('.book_price:eq(0)').html();
          if(price.split(">").length > 1){
            price = price.split(">");
            price = price[price.length - 1];
            price = filter_price(price);
          }
        }
      }
      else{
        price = "";
      }
      var isbn = getISBN(link);
      if(isbn != "" && prod != ""){
        prod = prod + " " + isbn;
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  if($('.prod-outr-two').length > 0){
    var slider = $('.prod-outr-two');
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
      if($('.prod-outr-two:eq('+ i +') a').length > 0){
        link = $('.prod-outr-two:eq('+ i +') a:eq(0)').attr('href');
        if(link.split("acadzone.com/").length < 2){
          link = "http://www.acadzone.com"+link;
        }
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.prod-outr-two:eq('+ i +')').find('img').length > 0 && $('.prod-outr-two:eq('+ i +')').find('img:eq(0)').attr('alt')){
          prod = $('.prod-outr-two:eq('+ i +')').find('img:eq(0)').attr('alt').trim(); 
          if(prod.split("..").length > 1){
            prod = "";
          }
        }
        if(prod == ""){
          if($('.prod-outr-two:eq('+ i +')').find('.book_title').length > 0){
            prod = $('.prod-outr-two:eq('+ i +')').find('.book_title:eq(0)').text().trim(); 
          }
          if(prod.split("..").length > 1){
            prod = "";
          }
        }
        if($('.prod-outr-two:eq('+ i +')').find('img').length > 0 && $('.prod-outr-two:eq('+ i +')').find('img').attr("src")){
          image = $('.prod-outr-two:eq('+ i +')').find('img').attr("src"); 
        }
        if($('.prod-outr-two:eq('+ i +')').find('.book_price').length > 0){
          price = $('.prod-outr-two:eq('+ i +')').find('.book_price:eq(0)').html();
          if(price.split(">").length > 1){
            price = price.split(">");
            price = price[price.length - 1];
            price = filter_price(price);
          }
        }
      }
      else{
        price = "";
      }
      var isbn = getISBN(link);
      if(isbn != "" && prod != ""){
        prod = prod + " " + isbn;
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  if($('.srch-hldr').length > 0){
    var slider = $('.srch-hldr');
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
      if($('.srch-hldr:eq('+ i +') a').length > 0){
        link = $('.srch-hldr:eq('+ i +') a:eq(0)').attr('href');
        if(link.split("acadzone.com/").length < 2){
          link = "http://www.acadzone.com"+link;
        }
        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.srch-hldr:eq('+ i +')').find('img').length > 0 && $('.srch-hldr:eq('+ i +')').find('img:eq(0)').attr('alt')){
          prod = $('.srch-hldr:eq('+ i +')').find('img:eq(0)').attr('alt').trim(); 
        }

        if($('.srch-hldr:eq('+ i +')').find('img').length > 0 && $('.srch-hldr:eq('+ i +')').find('img').attr("src")){
          image = $('.srch-hldr:eq('+ i +')').find('img').attr("src"); 
        }
        if($('.srch-hldr:eq('+ i +')').find('.button_notify').length > 0){
          oos = 1;
        }
        else if($('.srch-hldr:eq('+ i +')').find('.button_addtocart').length > 0){
          oos = 0;
        }
        
        if($('.srch-hldr:eq('+ i +')').find('.bk_price').length > 0){
          price = $('.srch-hldr:eq('+ i +')').find('.bk_price:eq(0)').html();
          if(price.split(">").length > 1){
            price = price.split(">");
            price = price[price.length - 1];
            price = filter_price(price);
          }
        }
      }
      else{
        price = "";
      }
      var isbn = getISBN(link);
      if(isbn != "" && prod != ""){
        prod = prod + " " + isbn;
      }
      if(PID != "" && price != "" && !isNaN(price)){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsAcad': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);  
  }
}

function sendCurrent(){
  curData = [];   
  var prod = "";
  var image = "";
  var myPrice = "";
  var cur_url = "";
  var current_status = 0;
  var link = "";
  var PID = "";
  var brand = "";
  var name = "";
  var prod1 = "";
  var breadcrumb_str = "";
  var avail = getAvailability();
  if(avail == 0){
    current_status = 1;
  }
  else if(avail == -1){
    current_status = 2;
  }
  else{
    current_status = 0;
  }
  breadcrumb_str = getBreadCrumb();
  prod = getProd();
  
  myPrice = getPrice();
  image = getImage();
  link = window.location.href;
  PID = returnPID(link);
  cur_url = window.location.href;
  var isbn = getISBN(cur_url);
  if(isbn != "" && prod != ""){
    prod = prod + " " + isbn;
  }
  curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataAcad': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('[itemtype="http://schema.org/Product"]').length>0){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);


function getBreadCrumb(){
  return "";
}
function getCategory(){
  var category = "";
  return category;
}    
sendEcomm();

//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;


function getProd(){
  var prod = "";
  prod = $('[itemprop="name"]:eq(0)').text().trim();
  if($('[itemtype="http://schema.org/Product"]').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";

  image = $('[itemprop="image"]:eq(0)').attr("src");
  
  return image;
}

function getPrice(){
  price = "";
  if($('[itemprop="price"]').length > 0)
  {
    price = $('[itemprop="price"]:eq(0)').text().trim();
  }
  
  price = filter_price(price);
  if(isNaN(price)){
    price = 0;
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('[itemprop="availability"]').parent().text().toUpperCase().split("OUT OF STOCK").length > 1){
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
  if(pid.split(".com/").length > 1){
    pid = pid.split(".com/")[1];
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
  if(pid.split(".com/").length > 1){
    pid = pid.split(".com/")[1];
  }
  if(link.split('acadzone.com').length < 2){
    pid = 0;
  }
  if(link == ""){
    pid = 0;
  }
  
  return pid;
}

// var cur_url = window.location.href;
// if(cur_url.split("acadzone.com/account/view-wishlist").length > 1 || cur_url.split("bookadda.com/account/view-wishlist").length > 1){
//   var importImg = returnResource("import_img.png");
//   if($('#searchForm').length > 0){
//     $('#searchForm').after('<div id="importHatke"> <img src="'+importImg+'" alt="Click to import wishlist" height="50px" width="auto"/> </div>');
//   }
// }

// $("#importHatke").click(function(){
//   acadWishList();
// });

// function acadWishList(){
//   wishListAcad = [];
//   var link = "";
//   var url = "";
//   var prod = "";
//   var image = "";
//   var price = "";
//   var PID = "";
//   var cur_url = window.location.href;
//   if(cur_url.split("acadzone.com/account/view-wishlist").length > 1 ){
//     var pos = 1585;
//   }
//   else if(cur_url.split("bookadda.com/account/view-wishlist").length > 1){
//     var pos = 31;
//   }

//   var brand = "";

//   if($('.search-result').length > 0) {
//     var slider = $('.search-result');
//     var sliderLength = $('.search-result').length;

//     for(i=0;i<sliderLength;i++){
//       link = "";
//       url = "";
//       prod = "";
//       image = "";
//       price = "";
//       PID = "";
//       price_final = 0;
//       if($('.search-result:eq('+ i +')').find('.ci-info a').length > 0){
//         link = $('.search-result:eq('+ i +')').find('.ci-info:eq(0) a:eq(0)').attr('href');
//         url = link;
//         PID = link;
//         if(PID.split("?").length > 1){
//           PID = PID.split("?");
//           PID = PID[0];
//         }
//         if(PID.split("#").length > 1){
//           PID = PID.split("#");
//           PID = PID[0];
//         }
//         if(PID.split("/p-").length > 1){
//           PID = PID.split("/p-");
//           PID = PID[1];
//         }
//       }
//       else{
//         link = "";
//         PID = "";
//       }
//       if($('.search-result:eq('+ i +')').find('.price span').length > 0){
//         price_final = $('.search-result:eq('+ i +')').find('.price span').length - 1;
//         price = $('.search-result:eq('+ i +')').find('.price span:eq('+price_final+')').text().trim();
//         price = filter_price(price);
//       }
//       if(isNaN(price)){
//         price = "";
//       }

//       if($('.search-result:eq('+ i +')').find('.booktitile a').length > 0){
//         prod = $('.search-result:eq('+ i +')').find('.booktitile:eq(0) a:eq(0)').text().trim();
//       }

//       if($('.search-result:eq('+ i +')').find('.col1 img').length > 0){
//         image = $('.search-result:eq('+ i +')').find('.col1:eq(0) img:eq(0)').attr('src').trim();
//       }

//       if(PID != "" && price != ""){
//         wishListAcad.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
//       }
//     }

//     console.log("Wishlist: " + wishListAcad);
//     wishJson = JSON.stringify(wishListAcad);
//     var jsonArr = [{'wishList': wishJson}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 17, displayImportWL, []);  
//   }

// }

// function displayImportWL(data){
//   alert(data);
// }
