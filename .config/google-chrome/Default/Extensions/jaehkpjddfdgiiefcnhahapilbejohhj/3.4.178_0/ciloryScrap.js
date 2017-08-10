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
  var arrayToSend = [];

  if($('.slides li').length > 0){
    var slider = $('.slides li');
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
      if($('.slides li:eq('+ i +') a').length > 0){
        link = $('.slides li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          PID = link;
          if(PID.split("?").length > 1){
            PID = PID.split("?");
            PID = PID[0];
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0];
          }
          if(PID.split(".htm").length > 1){
            PID = PID.split(".htm");
            PID = PID[0];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          if(PID.split("-").length > 1){
            PID = PID.split("-");
            PID = PID[0];
          }
          
          
          
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
       if($('.slides li:eq('+ i +')').find('a').length > 0){
        prod = $('.slides li:eq('+ i +')').find('a:eq(0)').attr("title");
      }
      if($('.slides li:eq('+ i +')').find('.product_image img').length > 0){
        image = $('.slides li:eq('+ i +')').find('.product_image img:eq(0)').attr("src");
      }
      if($('.slides li:eq('+ i +')').find('.price').length > 0){
        price = $('.slides li:eq('+ i +')').find('.price').html();
        if(price.split("</strike>").length > 1){
          price = price.split("</strike>");
          price = price[1];
          if(price.split("</strong>").length > 1){
            price = price.split("</strong>");
            price = price[0];
          }
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }
        }
        else{
          price = $('.slides li:eq('+ i +')').find('.price').text();

          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }
        }
        price = price.split(",").join("").trim();
      }
    }
    else{
      price = "";
    }
    if(PID != "" && price != ""){
      arrayToSend.push([PID, price, prod, image, oos]);
    }

    } // for ends

  }

  if($('.ajax_block_product').length > 0){
    var slider = $('.ajax_block_product');
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
      if($('.ajax_block_product:eq('+ i +') a').length > 0){
        link = $('.ajax_block_product:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          PID = link;
          if(PID.split("?").length > 1){
            PID = PID.split("?");
            PID = PID[0];
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0];
          }
          if(PID.split(".htm").length > 1){
            PID = PID.split(".htm");
            PID = PID[0];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          if(PID.split("-").length > 1){
            PID = PID.split("-");
            PID = PID[0];
          }
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.ajax_block_product:eq('+ i +')').find('h3 a').length > 0){
          prod = $('.ajax_block_product:eq('+ i +')').find('h3:eq(0) a:eq(0)').text().trim();
        }
        if($('.ajax_block_product:eq('+ i +')').find('.product_img_link img').length > 0){
          image = $('.ajax_block_product:eq('+ i +')').find('.product_img_link img:eq(0)').attr("src");
        }
        if(image == ""){
          if($('.ajax_block_product:eq('+ i +')').find('.product_img_link img').length > 0){
            image = $('.ajax_block_product:eq('+ i +')').find('.product_img_link img:eq(1)').attr("data-src");
          }
        }
        
        if($('.ajax_block_product:eq('+ i +')').find('.price').length > 0){
          price = $('.ajax_block_product:eq('+ i +')').find('.price').html();
          if(price.split("</strike>").length > 1){
            price = price.split("</strike>");
            price = price[1];
            if(price.split("</strong>").length > 1){
              price = price.split("</strong>");
              price = price[0];
            }
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
          }
          else{
            price = $('.ajax_block_product:eq('+ i +')').find('.price').text();

            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
          }
          price = price.split(",").join("").trim();
        }
      }
      else{
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }

  if($('.block_content li').length > 0){
    var slider = $('.block_content li');
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
      if($('.block_content li:eq('+ i +') a').length > 0){
        link = $('.block_content li:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          PID = link;
          if(PID.split("?").length > 1){
            PID = PID.split("?");
            PID = PID[0];
          }
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split("#").length > 1){
            PID = PID.split("#");
            PID = PID[0];
          }
          if(PID.split(".htm").length > 1){
            PID = PID.split(".htm");
            PID = PID[0];
          }
          if(PID.split("/").length > 1){
            PID = PID.split("/");
            PID = PID[PID.length - 1];
          }
          if(PID.split("-").length > 1){
            PID = PID.split("-");
            PID = PID[0];
          }
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        if($('.block_content li:eq('+ i +')').find('img').attr("data-src")){
          image = $('.block_content li:eq('+ i +')').find('img:eq(0)').attr("data-src");
        }
        else if($('.block_content li:eq('+ i +')').find('img').attr("src")){
          image = $('.block_content li:eq('+ i +')').find('img:eq(0)').attr("src");
        }

        if($('.block_content li:eq('+ i +')').find('p').length > 0){
          prod = $('.block_content li:eq('+ i +')').find('p:eq(0)').html();
          if(prod.split("<br>").length > 1){
            prod = prod.split("<br>");
            prod = prod[0].trim();
            prod = prod.split(">");
            prod = prod[prod.length-1];
            prod = prod.trim();
          }
          else{
            prod = "";
          }
        }


        if($('.block_content li:eq('+ i +')').find('.price').length > 0){
          price = $('.block_content li:eq('+ i +')').find('.price').html();
          if(price.split("</strike>").length > 1){
            price = price.split("</strike>");
            price = price[1];
            if(price.split("</strong>").length > 1){
              price = price.split("</strong>");
              price = price[0];
            }
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
          }
          else{
            price = $('.block_content li:eq('+ i +')').find('.price').text();

            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
          }
          price = price.split(",").join("").trim();
        }
      }
      else{
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsCilory': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);  
  }
}

function sendCurrent(){
  curData = [];   
  var prod = getProd();
  var image = "";
  var myPrice = "";
  var cur_url = "";
  var PID = "";
  var current_status = 0;

  if(getAvailability() == 0){
    current_status = 1;
  }

  myPrice = getPrice();
  image = getImage();

  PID = getPID();
  cur_url = window.location.href;
  var breadcrumbF = getBreadCrumb();
  curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumbF]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataCilory': curData}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);



//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;



function getProd(){
  var prod = "";
  if($('#ajax_product_name').length > 0){
    prod = $('#ajax_product_name').text().trim();
  }
  else{
    prod = $('[itemprop="name"]').text().trim();
  }
  if($('[itemtype="http://schema.org/Product"]').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  image = $('[itemprop="image"]').attr("src");
  return image;
}

function getPrice(){
  price = "";
  if($('[itemprop="price"]').length > 0){
    price = $('[itemprop="price"]').text().trim();
  }
  if(price.split("(").length > 1){
    price = price.split("(")[0];
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if(($('.add_cart_pp').length > 0) && ($('.add_cart_pp').text().split("Not Available").length > 1)){
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

  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm");
    pid = pid[0];
  }
  if(pid.split("/").length > 1){
    pid = pid.split("/");
    pid = pid[pid.length - 1];
  }
  if(pid.split("-").length > 1){
    pid = pid.split("-");
    pid = pid[0];
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
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm");
    pid = pid[0];
  }
  if(pid.split("/").length > 1){
    pid = pid.split("/");
    pid = pid[pid.length - 1];
  }
  if(pid.split("-").length > 1){
    pid = pid.split("-");
    pid = pid[0];
  }
  

  return pid;



}


function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  var len_bread = $('.breadcrumb').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.breadcrumb').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}



// /////////////// WISH TO WATCH LIST STARTS ///////////////

var cur_url = window.location.href;
if(cur_url.split("blockwishlist_mod/mywishlist").length > 1 && (cur_url.split("cilory.com").length > 1)){
  if($('#mywishlist').length>0){
    importWishGlobal('#mywishlist', 'before', ciloryWishList);
  }
}

function ciloryWishList(){
  wishListCilory = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 469;
  var brand = "";

  if($('#mywishlist .blockwisthlist-products li').length > 0) {
    var slider = $('#mywishlist .blockwisthlist-products li');
    var sliderLength = $('#mywishlist .blockwisthlist-products li').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.prodlink').length > 0){
        link = $('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.prodlink:eq(0)').attr('href');
        url = link;
        if(link.split("www.cilory.com").length < 2){
         link = "https://www.cilory.com"+link;
         url = link;
       }
       PID = returnPID(link);

     }
     else{
      link = "";
      PID = "";
    }
    price = 0;

    if($('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.prodlink').attr("title")){
      prod = $('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.prodlink:eq(0)').attr("title").trim();
      if(prod.split("...").length > 1){
        prod = prod.split("...");
        prod = prod[0].trim();
      }
    }

    if($('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.product_img_link img').length > 0){
      image = $('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.product_img_link img:eq(0)').attr('src').trim();
      if(image.split("http").length < 2){
        image = "http:"+image;
      }
    }
    if($('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.content_price .price').length > 0){
      price = $('#mywishlist .blockwisthlist-products li:eq('+ i +')').find('.content_price .price:eq(0)').text().trim();
      price = filter_price(price);
    }

    if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
      wishListCilory.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
    }
  }

  wishJson = JSON.stringify(wishListCilory);
  var jsonArr = [{'wishList': wishJson}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 17, alertWLResp, []);  
}

}
function alertWLResp(data){
  alert(data);
}
// /////////////// WISH TO WATCH LIST ENDS ///////////////




