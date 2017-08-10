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
  if($('.product-list-widget li').length > 0){
    var slider = $('.product-list-widget li');
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
      if($('.product-list-widget li:eq('+ i +') a').length > 0){
        link = $('.product-list-widget li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p-").length > 1){
            PID = PID.split("/p-");
            PID = PID[1];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
       if($('.product-list-widget li:eq('+ i +')').find('.out_of_stock').length > 0 && $('#search-result-items li:eq('+ i +')').find('.out_of_stock').text().toUpperCase().split("SOLD OUT").length > 1){
        oos = 1;
      }
      if($('.product-list-widget li:eq('+ i +')').find('.variant-title a').length > 0){
        prod = $('.product-list-widget li:eq('+ i +')').find('.variant-title a:eq(0)').attr("title").trim();
      }
      if($('.product-list-widget li:eq('+ i +')').find('.variant-image img').parent().attr("data-src").length > 0){
        image = $('.product-list-widget li:eq('+ i +')').find('.variant-image img:eq(0)').parent().attr("data-src");
      }
      if(image == ""){
        if($('.product-list-widget li:eq('+ i +')').find('.variant-image img').attr("src").length > 0){
          image = $('.product-list-widget li:eq('+ i +')').find('.variant-image img:eq(0)').attr("src");
        }
      }
      if($('.product-list-widget li:eq('+ i +')').find('.special-price').length > 0){

        price = $('.product-list-widget li:eq('+ i +')').find('.special-price').text();

      }
      else if($('.product-list-widget li:eq('+ i +')').find('.regular-price').length > 0){
        price = $('.product-list-widget li:eq('+ i +')').find('.regular-price').text();

      }
      else if($('.product-list-widget li:eq('+ i +')').find('.variant-final-price').length > 0){
        price = $('.product-list-widget li:eq('+ i +')').find('.variant-final-price').text();

      }
      else{
        price = "";
      }
      price = filter_price(price);


    }
    else{
      price = "";
    }

    if(PID.split("books-").length>1){
      PID = PID.split("books-")[1];
      PID = PID.split(".html")[0];
    }

    if(PID != "" && price != ""){
      arrayToSend.push([PID, price, prod, image, oos]);
    }

    } // for ends1

  }

  if($('#xsell li').length > 0){
    var slider = $('#xsell li');
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

      if($('#xsell li:eq('+ i +') a').length > 0){
        link = $('#xsell li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p-").length > 1){
            PID = PID.split("/p-");
            PID = PID[1];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
        if($('#xsell li:eq('+ i +')').find('.out_of_stock').length > 0 && $('#search-result-items li:eq('+ i +')').find('.out_of_stock').text().toUpperCase().split("SOLD OUT").length > 1){
          oos = 1;
        }
        if($('#xsell li:eq('+ i +')').find('.variant-title a').length > 0){
          prod = $('#xsell li:eq('+ i +')').find('.variant-title a:eq(0)').attr("title").trim();
        }
        if($('#xsell li:eq('+ i +')').find('.variant-image img').parent().attr("data-src").length > 0){
          image = $('#xsell li:eq('+ i +')').find('.variant-image img:eq(0)').parent().attr("data-src");
        }
        if(image == ""){
          if($('#xsell li:eq('+ i +')').find('.variant-image img').attr("src").length > 0){
            image = $('#xsell li:eq('+ i +')').find('.variant-image img:eq(0)').attr("src");
          }
        }
        if($('#xsell li:eq('+ i +')').find('.special-price').length > 0){

          price = $('#xsell li:eq('+ i +')').find('.special-price').text();

        }
        else if($('#xsell li:eq('+ i +')').find('.regular-price').length > 0){
          price = $('#xsell li:eq('+ i +')').find('.regular-price').text();

        }
        else if($('#xsell li:eq('+ i +')').find('.variant-final-price').length > 0){
          price = $('#xsell li:eq('+ i +')').find('.variant-final-price').text();

        }
        else{
          price = "";
        }
        price = filter_price(price);
      }
      else{
        price = "";
      }

      if(PID.split("books-").length>1){
        PID = PID.split("books-")[1];
        PID = PID.split(".html")[0];
      }

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends1

  }

  if($('.deal-of-the-day-widget li').length > 0){
    var slider = $('.deal-of-the-day-widget li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.deal-of-the-day-widget li:eq('+ i +') a').length > 0){
        link = $('.deal-of-the-day-widget li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p-").length > 1){
            PID = PID.split("/p-");
            PID = PID[1];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
        if($('.deal-of-the-day-widget li:eq('+ i +')').find('.special-price').length > 0){

          price = $('.deal-of-the-day-widget li:eq('+ i +')').find('.special-price').text();

        }
        else if($('.deal-of-the-day-widget li:eq('+ i +')').find('.regular-price').length > 0){
          price = $('.deal-of-the-day-widget li:eq('+ i +')').find('.regular-price').text();

        }
        else if($('.deal-of-the-day-widget li:eq('+ i +')').find('.variant-final-price').length > 0){
          price = $('.deal-of-the-day-widget li:eq('+ i +')').find('.variant-final-price').text();

        }
        else{
          price = "";
        }
        price = filter_price(price);
      }
      else{
        price = "";
      }

      if(PID.split("books-").length>1){
        PID = PID.split("books-")[1];
        PID = PID.split(".html")[0];
      }

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends1

  }

  if($('#search-result-items li').length > 0){
    var slider = $('#search-result-items li');
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
      if($('#search-result-items li:eq('+ i +') a').length > 0){
        link = $('#search-result-items li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p-").length > 1){
            PID = PID.split("/p-");
            PID = PID[1];
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){

        if($('#search-result-items li:eq('+ i +')').find('.out_of_stock').length > 0 && $('#search-result-items li:eq('+ i +')').find('.out_of_stock').text().toUpperCase().split("SOLD OUT").length > 1){
          oos = 1;
        }
        if($('#search-result-items li:eq('+ i +')').find('.variant-title a').length > 0){
          prod = $('#search-result-items li:eq('+ i +')').find('.variant-title a:eq(0)').attr("title").trim();
        }
        if($('#search-result-items li:eq('+ i +')').find('.variant-image img').parent().attr("data-src").length > 0){
          image = $('#search-result-items li:eq('+ i +')').find('.variant-image img:eq(0)').parent().attr("data-src");
        }
        if(image == ""){
          if($('#search-result-items li:eq('+ i +')').find('.variant-image img').attr("src").length > 0){
            image = $('#search-result-items li:eq('+ i +')').find('.variant-image img:eq(0)').attr("src");
          }
        }
        if($('#search-result-items li:eq('+ i +')').find('.special-price').length > 0){

          price = $('#search-result-items li:eq('+ i +')').find('.special-price').text();

        }
        else if($('#search-result-items li:eq('+ i +')').find('.regular-price').length > 0){
          price = $('#search-result-items li:eq('+ i +')').find('.regular-price').text();

        }
        else if($('#search-result-items li:eq('+ i +')').find('.variant-final-price').length > 0){
          price = $('#search-result-items li:eq('+ i +')').find('.variant-final-price').text();

        }
        else{
          price = "";
        }
        price = filter_price(price);

      }
      else{
        price = "";
      }

      if(PID.split("books-").length>1){
        PID = PID.split("books-")[1];
        PID = PID.split(".html")[0];
      }

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends1

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsCross': arrayToSend}];
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
  prod = $('#title h1').text().trim();   
  if($(".out-of-stock").length > 0){
    current_status = 1;
  }
  else{
    current_status = 0;
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
    if(PID.split("/p-").length > 1){
      PID = PID.split("/p-");
      PID = PID[1];
    }
    if(PID.split("books-").length>1){
      PID = PID.split("books-")[1];
      PID = PID.split(".html")[0];
    }
  }
  else{
    PID = "";
  }

  var a = $('body').text();
  if(a.split("EAN").length>1){
    isbn = parseInt(a.split("EAN")[1].trim().split(":")[1].trim());
  }
  else {
    isbn = false;
  }

  if(isbn && isValidISBN(isbn.toString()) && prod.trim() != ""){
    prod = prod + " " + isbn;
  }
  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataCross': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('#product-detail-page').length>0){
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
  prod = $('#title h1').text().trim();   
  if($('#product-detail-page').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  image = $('#images a').attr('data-medium-url');
  return image;
}

function getPrice(){
  price = "";
  if($('.our_price').length >0){
    price = $('.our_price').find("span").text().trim();
  }
  else if($('.list_price').length >0){
    price = $('.list_price').find("span").text().trim();
  }
  else if($('.final-price').length > 0){
    price = $('.final-price').text().trim();
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($(".out-of-stock").length > 0){
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
  if(pid.split("/p-").length > 1){
    pid = pid.split("/p-")[1];
  }
  if(pid.split("books-").length > 1){
    pid = pid.split("books-")[1].trim();
    if(pid.split(".htm").length > 1){
      pid = pid.split(".htm")[0].trim();
    }
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
  if(pid.split("/p-").length > 1){
    pid = pid.split("/p-")[1];
  }
  if(pid.split("books-").length > 1){
    pid = pid.split("books-")[1].trim();
    if(pid.split(".htm").length > 1){
      pid = pid.split(".htm")[0].trim();
    }
  }
  if(link.split('crossword.in').length < 2){
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
  if($("#browse_nodes_bc li").length > 0){
    var len_bread = $('#browse_nodes_bc li:eq(0)').find('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('#browse_nodes_bc li:eq(0)').find('a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }
  }
  else  if($(".bread-crumbs").length > 0){
    var len_bread = $('.bread-crumbs').find('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = $('.bread-crumbs').find('a:eq('+ i +')').text().trim();
      bread_final += breadcrumb + "*~";
    }
  }
  
  return bread_final;
}
////////////////////////// WISH TO WATCH LIST STARTS /////////////////////////
var cur_url = window.location.href;
if(cur_url.split("crossword.in/wish-list").length > 1){
  if($('.list-items-wrapper').length > 0){
    importWishGlobal('.list-items-wrapper', 'before', crossWishList);
  }
}

function crossWishList(){
  wishListCross = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 471;
  var brand = "";

  if($('.list-items-wrapper tbody:eq(0) tr').length > 0) {
    var slider = $('.list-items-wrapper tbody:eq(0) tr');
    var sliderLength = $('.list-items-wrapper tbody:eq(0) tr').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.ci-info a').length > 0){
        link = $('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.ci-info:eq(0) a:eq(0)').attr('href');
        if(link.split("www.crossword.in").length < 2){
          link = "http://www.crossword.in" + link;
        }
        url = link;
        PID = link;
        if(PID.split("?").length > 1){
          PID = PID.split("?");
          PID = PID[0];
        }
        if(PID.split("#").length > 1){
          PID = PID.split("#");
          PID = PID[0];
        }
        if(PID.split("/p-").length > 1){
          PID = PID.split("/p-");
          PID = PID[1];
        }
      }
      else{
        link = "";
        PID = "";
      }
      if($('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.c-inr').length > 0){
        price = $('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.c-inr:eq(0)').parent().text().trim();
        price = filter_price(price);
      }
      if(isNaN(price)){
        price = "";
      }

      if($('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.ci-title ._title').length > 0){
        prod = $('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.ci-title:eq(0) ._title:eq(0)').text().trim();
      }

      if($('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.ci-info img').length > 0){
        image = $('.list-items-wrapper tbody:eq(0) tr:eq('+ i +')').find('.ci-info img:eq(0)').attr('src').trim();
      }

      prod = prod.split("'").join("").trim();
      prod = prod.split('"').join('').trim();
      
      if(PID != "" && price != ""){
        wishListCross.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
      }
    }

    // console.log("Wishlist: " + wishListCross);
    wishJson = JSON.stringify(wishListCross);
    var jsonArr = [{'wishList': wishJson}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 17, displayImportWLResp, []);  
    // console.log("WishlistJSON: " + wishJson);
  }

}

function displayImportWLResp(data){
  alert(data);
}

////////////////////////// WISH TO WATCH LIST ENDS /////////////////////////
