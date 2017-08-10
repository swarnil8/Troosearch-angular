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
        if(link == undefined || link.split("javascript:void(0);").length > 1 || link == "") {
          link = $('.item:eq('+ i +') a:eq(1)').attr("href");
        }
        if(link == undefined || link == "" || link.split("javascript:void(0);").length > 1 || link.split("function ").length > 1){
          link = "";
        }
        if(link != ""){
         if(link.split(".purplle.com").length < 2){
          link = "https://www.purplle.com"+link;
        }
        PID = returnPID(link);
      }
      else{
        PID = "";
      }
    }

    if(PID != "" && PID != 0){

      if($('.item:eq('+ i +')').find('.tx-b.h34').length > 0){
        prod = $('.item:eq('+ i +')').find('.tx-b.h34:eq(0)').text().trim();
      }
      else if($('.item:eq('+ i +')').attr("item_name")){
        prod = $('.item:eq('+ i +')').attr("item_name").trim();
      }
      else if($('.item:eq('+ i +')').find('a:eq(1)').attr("item_name")){
        prod = $('.item:eq('+ i +')').find('a:eq(1)').attr("item_name").trim();
      }
      if($('.item:eq('+ i +')').find('.db.h175 img').length > 0){
        image = $('.item:eq('+ i +')').find('.db.h175 img:eq(0)').attr("src").trim();
        if(image.split("http").length < 2){
          image = "https:" + image;
        }
      }
      else if($('.item:eq('+ i +')').find('img').length > 0 && $('.item:eq('+ i +')').find('img:eq(0)').attr("src")){
        image = $('.item:eq('+ i +')').find('img:eq(0)').attr("src").trim();
        if(image.split("http").length < 2){
          image = "https:" + image;
        }
      }
      else if($('.item:eq('+ i +')').find('.img-fix-thumb').length > 0 && $('.item:eq('+ i +')').find('.img-fix-thumb:eq(0)').attr("src")){
        image = $('.item:eq('+ i +')').find('.img-fix-thumb:eq(0)').attr("src").trim();
        if(image.split("http").length < 2){
          image = "https:" + image;
        }
      }
      if($('.item:eq('+ i +')').find('.pr.l30per').length > 0){
        oos1 = $('.item:eq('+ i +')').find('.pr.l30per:eq(0)').text().trim();
        if(oos1.toUpperCase().split("OUT OF STOCK").length > 1){
          oos = 1;
        }
        else{
          oos = 0;
        }
      }

      if($('.item:eq('+ i +')').css("opacity") == "0.3"){
        oos = 1;
      }
      else if($('.item:eq('+ i +')').find(".oos").length > 0){
        oos = 1;
      }

      if($('.item:eq('+ i +')').find('.p-inr.pr').length > 0){
        price_len = $('.item:eq('+ i +')').find('.p-inr.pr').length - 1;
        price = $('.item:eq('+ i +')').find('.p-inr.pr').eq(price_len).parent().text().trim();
        price = filter_price(price);
      }
      else if($('.item:eq('+ i +')').attr("offer_price")){
        price = $('.item:eq('+ i +')').attr("offer_price").trim();
        price = filter_price(price);
      }
      else if($('.item:eq('+ i +')').attr("our_price")){
        price = $('.item:eq('+ i +')').attr("our_price").trim();
        price = filter_price(price);
      }
      else if($('.item:eq('+ i +')').attr("price")){
        price = $('.item:eq('+ i +')').attr("price").trim();
        price = filter_price(price);
      }
    }
    else{
      price = "";
    }
    if(PID != "" && PID != 0 && price != ""){
      arrayToSend.push([PID, price, prod, image, oos]);
    }

    } // for ends1

  }


  if($('.tab-pane .product-item').length > 0){
    var slider = $('.tab-pane .product-item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.tab-pane .product-item:eq('+ i +') a').length > 0){
        link = $('.tab-pane .product-item:eq('+ i +') a:eq(0)').attr("href");
        if(link == undefined || link == ""){
          link = $('.tab-pane .product-item:eq('+ i +') a:eq(1)').attr("href");
        }

        if(link != ""){
          if(link.split(".purplle.com").length < 2){
            link = "https://www.purplle.com"+link;
          }
          PID = returnPID(link);


        }
        else{
          PID = "";
        }
      }

      if(PID != "" && PID != 0){
        if($('.tab-pane .product-item:eq('+ i +')').find('.price-div').length > 0){

          if($('.tab-pane .product-item:eq('+ i +')').find('.price-div s').length > 0){
            price = $('.tab-pane .product-item:eq('+ i +')').find('.price-div .price').html();
            price = price.split("<s>")[0];


            if(price.split("</i>").length > 1){
              price = price.split("</i>");
              price = price[1];
              if(price.split("Rs.").length > 1){
                price = price.split("Rs.");
                price =price[1];

              }


              price = price.split(",").join("").trim();

            }
          }
          else{
            price = $('.tab-pane .product-item:eq('+ i +')').find('.price-div .price').text();


            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price =price[1];

            }
            price = price.split(",").join("").trim();


          }
        }
      }
      else{
        price = "";
      }

      if(PID != "" && PID != 0 && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends1

  }
  if($('.products-grid li').length > 0){
    var slider = $('.products-grid li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.products-grid li:eq('+ i +') a').length > 0){
        link = $('.products-grid li:eq('+ i +') a:eq(0)').attr("href");
        if(link == undefined || link == ""){
          link = $('.products-grid li:eq('+ i +') a:eq(1)').attr("href");
        }
        if(link != ""){
         if(link.split(".purplle.com").length < 2){
          link = "https://www.purplle.com"+link;
        }
        PID = returnPID(link);

      }
      else{
        PID = "";
      }
    }

    if(PID != "" && PID != 0){
      if($('.products-grid li:eq('+ i +')').find('.price-div').length > 0){

        if($('.products-grid li:eq('+ i +')').find('.price-div s').length > 0){
          price = $('.products-grid li:eq('+ i +')').find('.price-div .price').html();
          price = price.split("<s>")[0];


          if(price.split("</i>").length > 1){
            price = price.split("</i>");
            price = price[1];
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price =price[1];

            }


            price = price.split(",").join("").trim();

          }
        }
        else{
          price = $('.products-grid li:eq('+ i +')').find('.price-div .price').text();


          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];

          }
          price = price.split(",").join("").trim();


        }
      }
    }
    else{
      price = "";
    }

    if(PID != "" && PID != 0 && price != ""){
      arrayToSend.push([PID, price]);
    }

    } // for ends1

  }
  if($('.panel-body .row').length > 0){
    var slider = $('.panel-body .row');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.panel-body .row:eq('+ i +') a').length > 0){
        link = $('.panel-body .row:eq('+ i +') a:eq(0)').attr("href");
        if(link == undefined || link == ""){
          link = $('.item:eq('+ i +') a:eq(1)').attr("href");
        }
        if(link != ""){
         if(link.split(".purplle.com").length < 2){
          link = "https://www.purplle.com"+link;
        }
        PID = returnPID(link);

      }
      else{
        PID = "";
      }
    }

    if(PID != "" && PID != 0){
      if($('.panel-body .row:eq('+ i +')').find('.normal-price').length > 0){
        price = $('.panel-body .row:eq('+ i +')').find('.normal-price').text();
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
          price =price[1];
        }
        price = price.split(",").join("").trim();

      }
    }
    else{
      price = "";
    }

    if(PID != "" && PID != 0 && price != ""){
      arrayToSend.push([PID, price]);
    }

    } // for ends1

  }

  if($('#rec_rhf .row').length > 0){
    var slider = $('#rec_rhf .row');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#rec_rhf .row:eq('+ i +') a').length > 0){
        link = $('#rec_rhf .row:eq('+ i +') a:eq(0)').attr("href");
        if(link == undefined || link == ""){
          link = $('.item:eq('+ i +') a:eq(1)').attr("href");
        }
        if(link != ""){
         if(link.split(".purplle.com").length < 2){
          link = "https://www.purplle.com"+link;
        }
        PID = returnPID(link);

      }
      else{
        PID = "";
      }
    }

    if(PID != "" && PID != 0){
      if($('#rec_rhf .row:eq('+ i +')').find('.price-details').length > 0){
        if($('#rec_rhf .row:eq('+ i +')').find('.price-details s').length > 0){
          price = $('#rec_rhf .row:eq('+ i +')').find('.price-details .price').html();
          price = price.split("<s>")[0];
          if(price.split("</i>").length > 1){
            price = price.split("</i>");
            price = price[1];
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price =price[1];
            }
          }
        }
        else{
          price = $('#rec_rhf .row:eq('+ i +')').find('.price-details .price').text();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }

        }
      }

      else{
        price = "";
      }

      price = price.split(",").join("").trim();


    }
    else{
      price = "";
    }

    if(PID != "" && PID != 0 && price != ""){
      arrayToSend.push([PID, price]);
    }

    } // for ends1

  }

  if($('.offer-detail').length > 0){
    var slider = $('.offer-detail');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.offer-detail:eq('+ i +') a').length > 0){
        link = $('.offer-detail:eq('+ i +') a:eq(0)').attr("href");
        if(link == undefined || link == ""){
          link = $('.offer-detail:eq('+ i +') a:eq(1)').attr("href");
        }
        if(link == undefined || link == ""){
          link = $('.offer-detail:eq('+ i +') a:eq(2)').attr("href");
        }
        if(link != ""){
         if(link.split(".purplle.com").length < 2){
          link = "https://www.purplle.com"+link;
        }
        PID = returnPID(link);
      }
      else{
        PID = "";
      }
    }

    if(PID != "" && PID != 0){
      if($('.offer-detail:eq('+ i +')').find('.normal-price').length > 0){
        price = $('.offer-detail:eq('+ i +')').find('.normal-price').text();
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
          price =price[1];
        }

      }
      else{
        price = "";
      }

      price = price.split(",").join("").trim();


    }
    else{
      price = "";
    }

    if(PID != "" && PID != 0 && price != ""){
      arrayToSend.push([PID, price]);
    }

    } // for ends1

  }

  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsPur': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

function sendCurrent(){
  curData = [];
  var prod = getProd();
  var image = getImage();
  var myPrice = getPrice();
  var cur_url = "";
  var PID = getPID();
  var current_status = 0;
  if(getAvailability() == 0){
    current_status = 1;
  }

  var link = window.location.href;
  PID = returnPID(link);
  if(link.split("/product/").length < 2){
    PID = "";
    myPrice = "";
    prod = "";
    image = "";
    current_status = "";
  }

  cur_url = window.location.href;
  var breadcrumbF = getBreadCrumb();
  curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumbF, 1]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataPur': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if(cur_url.split("/product/").length > 1 && PID != "" && PID != 0){
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
  var cur_link = window.location.href;
  prod = $("h1:eq(0)").text().trim();
  if(prod=="" && $('meta[property="og:title"]').length > 0 && $('meta[property="og:title"]').attr('content').length > 0){
    prod = $('meta[property="og:title"]').attr('content').trim();
  }
  if(cur_link.split("/product/").length > 1 && cur_link.split("/reviews").length < 2){
    return prod;
  }
  else{
    return "";
  }
}

function getImage(){
  var image = "";
  image = $('meta[property="og:image"]').attr('content').trim();
  if(image.split("http").length < 2){
    image = "https:" + image;
  }
  return image;
}

function getPrice(){
  price = "";
  if($(".f30.vam.frb.mrl5").length > 0 && $(".f30.vam.frb.mrl5").parent().text().toUpperCase().split("OFFER PRICE").length > 1){
    price = $(".f30.vam.frb.mrl5").text().trim();
    if(price.split("₹").length > 1){
      price = price.split("₹");
      price = price[1].trim();
    }
    price = filter_price(price);
  }
  if((price == "" || price == 0 || isNaN(price)) && $('.normal-price').length > 0){
    price = $('.normal-price:eq(0)').text().trim();
    if(price.split("₹").length > 1){
      price = price.split("₹");
      price = price[1].trim();
    }
    price = filter_price(price);

  }
  if((price == "" || price == 0 || isNaN(price)) && $('.price').length > 0){
    price = $('.price:eq(0)').text().trim();
    if(price.toUpperCase().split("PRICE:").length > 1){
      price = price.toUpperCase().split("PRICE:");
      price = price[1].trim();
    }
    if(price.split("₹").length > 1){
      price = price.split("₹");
      price = price[1].trim();
    }
    price = filter_price(price);
  }
  if((price == "" || price == 0 || isNaN(price)) && $('#top_widget_part').length > 0 && $('#top_widget_part .pr').length > 0){
    price = $('#top_widget_part .pr:eq(0)').parent().text().trim();
    if(price.split("₹").length > 1){
      price = price.split("₹");
      price = price[1].trim();
    }
    price = filter_price(price);
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  if(($(".in-stock").length > 0) && ($(".in-stock").text().toUpperCase().split("OUT OF STOCK").length > 1)){
    avail = 0;
  }

  if($(".wis-btn").length > 0 && $(".wis-btn").parent().text().trim().toUpperCase().split("SOLD OUT").length > 1){
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
  if(pid != ""){
    if(pid.split("/reviews").length > 1){
      pid = pid.split("/reviews");
      pid = pid[0]+"/";
    }
  }
  // if(pid.split("/product/").length > 1){
  //   pid = pid.split("/product/");
  //   pid = pid[1];
  // }
  // pid = encodeURIComponent(pid);
  return pid;

}

function returnPID(link){

  var pid = link;
  if(!link || link == ""){
    pid = "";
  }
  else{
    if(pid.split("#").length > 1){
      pid = pid.split("#")[0];
    }
    if(pid.split("&").length > 1){
      pid = pid.split("&")[0];
    }
    if(pid.split("?").length > 1){
      pid = pid.split("?")[0];
    }
    if(link.split('purplle.com').length < 2){
      pid = "";
    }
    if(link == ""){
      pid = "";
    }
    if(pid != ""){
      if(pid.split("/reviews").length > 1){
        pid = pid.split("/reviews");
        pid = pid[0]+"/";
      }
    }
  }
  // if(pid.split("/product/").length > 1){
  //   pid = pid.split("/product/");
  //   pid = pid[1];
  // }
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

function sendCoupon(){
  $ = jQuery.noConflict();
  couponToSend = [];
  var cur_link = window.location.href;
  var couponUrl = "https://www.purplle.com/";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  var couponAt = 900;
  if(cur_link.split("purplle.com/offers").length > 1){

    if($('.offer-block').length > 0){
     var slider = $('.offer-block');
     var sliderLength = slider.length;
     couponUrl = "";
     couponCode = "";
     couponText = "";
     couponDesc = "";
     couponExp = 0;
     couponAt = 900;

     for(i=0;i<sliderLength;i++){
       couponUrl = cur_link;
       couponCode = "";
       couponText = "";
       couponDesc = "";

       if($('.offer-block:eq('+ i +')').find(".offer-detail .offer-title").length > 0){
        couponText = $('.offer-block:eq('+ i +')').find(".offer-detail .offer-title:eq(0)").text().trim();

        if(couponText.split("USE CODE:").length > 1){
          couponCode = couponText.split("USE CODE:")[1].trim();
        }
        else{
          couponCode = "NO CODE REQUIRED";
        }
      }

      if($('.offer-block:eq('+ i +')').find(".offer-detail .o-btn:eq(0)").length > 0){
        couponUrl = $('.offer-block:eq('+ i +')').find(".offer-detail .o-btn:eq(0) a:eq(0)").attr("href").trim();
      }
      else{
        couponUrl = cur_link;
      }

      if(cur_link.split("?").length > 1){
        cur_link = cur_link.split("?");
        cur_link = cur_link[0].trim();
      }

      if(couponCode != ""){
       couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
     }

   }

 }

}
if($(".topoffer").length > 0 && $(".topoffer .pp-main").length > 0){
  couponUrl = "";
  couponCode = "";
  couponText = "";
  couponDesc = "";
  couponExp = 0;
  couponAt = 900;

  if($(".topoffer .pp-main").attr("href")){
    couponUrl = $(".topoffer .pp-main:eq(0)").attr("href");

    couponText = $(".topoffer .pp-main:eq(0)").text().trim();
    couponDesc = couponText;
    if(couponText.split("Use ").length > 1){
      couponCode = couponText.split("Use ");
      couponCode = couponCode[1].trim();
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
      if(couponCode != couponCode.toUpperCase()){
        couponCode = "";
      }
    }
    else{
      couponCode = "";
    }

    if(couponCode != ""){
     couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
   }

 }

}

if($(".price").length > 0 && getProd() != ""){
  couponUrl = "";
  couponCode = "";
  couponText = "";
  couponDesc = "";
  couponExp = 0;
  couponAt = 900;

  if($(".price").parent().find('.f13.tx-77.mrb5').length > 0){
    couponUrl = "https://www.purplle.com/";

    couponText = $(".f13.tx-77.mrb5:eq(0)").text().trim();
    couponDesc = couponText;
    if(couponText.split("Use ").length > 1){
      couponCode = couponText.split("Use ");
      couponCode = couponCode[1].trim();
      couponCode = couponCode.split(" ");
      couponCode = couponCode[0].trim();
      if(couponCode != couponCode.toUpperCase()){
        couponCode = "";
      }
    }
    else{
      couponCode = "";
    }

    if(couponCode != ""){
     couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
   }

 }

}
couponToSend = JSON.stringify(couponToSend);
var jsonArr = [{'couponsExt': couponToSend}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr, 15, doNothing, []);
}
sendCoupon();


// /////////////// WISH TO WATCH LIST STARTS ///////////////

var cur_url = window.location.href;
if(cur_url.split("page=wishlist").length > 1 || (cur_url.split("purplle.com/profile").length > 1)){
  if($('#collection_part .ppl-timeline').length>0){
    importWishGlobal('#collection_part .ppl-timeline', 'before', purpWishList);
  }
}


function purpWishList(){
  console.log("purpWishList was called");
  wishListPurp = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 900;
  var brand = "";

  if($('#collection_part .ppl-timeline li').length > 0) {
    var slider = $('#collection_part .ppl-timeline li');
    var sliderLength = $('#collection_part .ppl-timeline li').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('#collection_part .ppl-timeline li:eq('+ i +')').find('.product a').length > 0){
        link = $('#collection_part .ppl-timeline li:eq('+ i +')').find('.product a').attr('href');
        console.log("Link: "+link);
        url = link;
        if(link.split("www.purplle.com").length < 2){
         link = "https://www.purplle.com"+link;
         url = link;
         PID = link;
       }
       if(PID.split("#").length > 1){
        PID = PID.split("#")[0];

      }
      if(PID.split("&").length > 1){
        PID = PID.split("&")[0];

      }
      if(PID.split("?").length > 1){
        PID = PID.split("?")[0];
      }
      console.log("PID: "+PID);
    }
    else{
      link = "";
      PID = "";
    }
    price = 0;

    if($('#collection_part .ppl-timeline li:eq('+ i +')').find('.lh1-5').length > 0){
      prod = $('#collection_part .ppl-timeline li:eq('+ i +')').find('.lh1-5:eq(0)').text().trim();
    }

    if($('#collection_part .ppl-timeline li:eq('+ i +')').find('.product  img').length > 0){
      image = $('#collection_part .ppl-timeline li:eq('+ i +')').find('.product img:eq(0)').attr('src').trim();
      if(image.split("http").length < 2){
        image = "https:"+image;
      }
    }

    if(PID != "" && PID != 0){
      wishListPurp.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
    }
  }

  // console.log("Wishlist: " + wishListPurp);
  wishJson = JSON.stringify(wishListPurp);
  var jsonArr = [{'wishList': wishJson}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 17, alertWLResp, []);
}

}
function alertWLResp(data){
  alert(data);
}
// /////////////// WISH TO WATCH LIST ENDS ///////////////
