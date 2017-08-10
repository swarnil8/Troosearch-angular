var arrayMsg = [];
function getCategory(){
  var category = "";
  return category;
}
$ = jQuery.noConflict();
function sendPairs(){
  arrayToSend = [];

  if($('.product-carousel-card').length > 0){
    var slider = $('.product-carousel-card');
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
      if($('.product-carousel-card:eq('+ i +') a').length > 0){
        link = $('.product-carousel-card:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("zivame.com").length < 2){
            link = "https://www.zivame.com"+link;
          }

          PID = returnPID(link);
        }
        else{
          PID = "";
        }


      }
      if(PID != ""){

        if($('.product-carousel-card:eq('+ i +')').attr('data-prod-name')){
          prod = $('.product-carousel-card:eq('+ i +')').attr('data-prod-name').trim();
        }
        if($('.product-carousel-card:eq('+ i +')').find('img').length > 0 && $('.product-carousel-card:eq('+ i +')').find('img:eq(0)').attr("data-original")){
          image = $('.product-carousel-card:eq('+ i +')').find('img:eq(0)').attr("data-original");
          // console.log("entered");
          if(image.split("http").length < 2 && image.split("zivame.com").length > 1){
            image = "https:"+image;
          }
        }
        else if($('.product-carousel-card:eq('+ i +')').find('img').length > 0){
          image = $('.product-carousel-card:eq('+ i +')').find('img:eq(0)').attr("src");
          if(image.split("http").length < 2 && image.split("zivame.com").length > 1){
            image = "https:"+image;
          }
        }
        if(image.split("placeholder-").length > 1){
          image = "";
        }
        if(image.split("loader-").length > 1){
          image = "";
        }
        // console.log("image: "+image);
        if($('.product-carousel-card:eq('+ i +')').find('.product-special-price').length > 0){
          price = $('.product-carousel-card:eq('+ i +')').find('.product-special-price').text();
          price = filter_price(price);

        }
      }

      else{
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } 
  }

  if($('.category-product').length > 0){
    var slider = $('.category-product');
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
      if($('.category-product:eq('+ i +') a').length > 0){
        link = $('.category-product:eq('+ i +') a:eq(0)').attr('href');
        if(link != ""){
          if(link.split("zivame.com").length < 2){
            link = "https://www.zivame.com"+link;
          }

          PID = returnPID(link);
        }
        else{
          PID = "";
        }


      }
      if(PID != ""){

        if($('.category-product:eq('+ i +')').attr('data-name')){
          prod = $('.category-product:eq('+ i +')').attr('data-name').trim();
        }
        if($('.category-product:eq('+ i +')').find('.act-place').length > 0  && $('.category-product:eq('+ i +')').find('.act-place:eq(0)').attr("data-original")){
          image = $('.category-product:eq('+ i +')').find('.act-place:eq(0)').attr("data-original");
          // console.log("entered");
          if(image.split("http").length < 2 && image.split("zivame.com").length > 1){
            image = "https:"+image;
          }
        }
        else if($('.category-product:eq('+ i +')').find('.act-place').length > 0  && $('.category-product:eq('+ i +')').find('.act-place:eq(0)').attr("src")){
          image = $('.category-product:eq('+ i +')').find('.act-place:eq(0)').attr("src");
          // console.log("entered");
          if(image.split("http").length < 2 && image.split("zivame.com").length > 1){
            image = "https:"+image;
          }
        }
        if(image.split("placeholder-").length > 1){
          image = "";
        }
        if(image.split("loader-").length > 1){
          image = "";
        }
        // console.log("image: "+image);
        if($('.category-product:eq('+ i +')').find('.product-details').length > 0 && $('.category-product:eq('+ i +')').find('.product-details:eq(0) .new-price').length > 0){
          price = $('.category-product:eq('+ i +')').find('.product-details:eq(0) .new-price:eq(0)').text();
          price = filter_price(price);

        }
      }

      else{
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } 
  }

  if($('.e_matrix_item').length > 0){
    var slider = $('.e_matrix_item');
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
      if($('.e_matrix_item:eq('+ i +') a').length > 0){
        link = $('.e_matrix_item:eq('+ i +') a:eq(0)').attr('href');
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

        if($('.e_matrix_item:eq('+ i +')').find('.prd_name_a').length > 0){
          prod = $('.e_matrix_item:eq('+ i +')').find('.prd_name_a').text().trim();
        }
        if($('.e_matrix_item:eq('+ i +')').find('.brand_img').length > 0){
          image = $('.e_matrix_item:eq('+ i +')').find('.brand_img:eq(0)').attr("src");
        }
        if($('.e_matrix_item:eq('+ i +')').find('.offer_price').length > 0){
          price = $('.e_matrix_item:eq('+ i +')').find('.offer_price').text();


          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
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

    } 
  }


  if($('.cbar_widget_item').length > 0){
    var slider = $('.cbar_widget_item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.cbar_widget_item:eq('+ i +') a').length > 0){
        link = $('.cbar_widget_item:eq('+ i +') a:eq(0)').attr('href');
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
        if($('.cbar_widget_item:eq('+ i +')').find('.relatedprice').length > 0){
          price = $('.cbar_widget_item:eq('+ i +')').find('.relatedprice').text();


          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price = price[1];
          }

          price = price.split(",").join("").trim();

        }
      }

      else{
        price = "";
      }
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } 
  }



  if($('#recently_view li').length > 0){
    var slider = $('#recently_view li');
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
      if($('#recently_view li:eq('+ i +') a').length > 0){
        link = $('#recently_view li:eq('+ i +') a:eq(0)').attr('href');
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
       if($('#recently_view li:eq('+ i +')').find('.details .recntTitle').length > 0){
        prod = $('#recently_view li:eq('+ i +')').find('.details .recntTitle:eq(0)').text().trim();
      }
      if($('#recently_view li:eq('+ i +')').find('.imgBox img').length > 0){
        image = $('#recently_view li:eq('+ i +')').find('.imgBox img').attr("src");
      }
      if($('#recently_view li:eq('+ i +')').find('.offer_price').length > 0){
        price = $('#recently_view li:eq('+ i +')').find('.offer_price').text();
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
          price = price[1];
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

  } 
}

if($('.bxslider li').length > 0){
  var slider = $('.bxslider li');
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
    if($('.bxslider li:eq('+ i +') a').length > 0){
      link = $('.bxslider li:eq('+ i +') a:eq(0)').attr('href');
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
    if(PID.split("javascript:void").length > 1){
      PID = "";
    }
    if(PID == ""){
     for(var k=0;k<$('.bxslider li:eq('+ i +') input').length;k++){
      if($('.bxslider li:eq('+ i +') input:eq('+k+')').attr("id") && $('.bxslider li:eq('+ i +') input:eq('+k+')').attr("id").split("gtm_produrl_").length > 1 && $('.bxslider li:eq('+ i +') input:eq('+k+')').attr("value") && $('.bxslider li:eq('+ i +') input:eq('+k+')').attr("value").trim() != ""){
        PID = "http://www.zivame.com/"+$('.bxslider li:eq('+ i +') input:eq('+k+')').attr("value").trim();
        break;
      }
    }
  }
  if(PID != ""){
   if($('.bxslider li:eq('+ i +')').find('a').attr("title")){
    prod = $('.bxslider li:eq('+ i +')').find('a:eq(0)').attr("title").trim();
  }
  if($('.bxslider li:eq('+ i +')').find('img').length > 0){
    image = $('.bxslider li:eq('+ i +')').find('img').attr("src");
    if(image.split("zivame.com").length < 2){
      image = "http://www.zivame.com/"+image;
    }
  }
  if($('.bxslider li:eq('+ i +')').find('.relatedprice').length > 0){
    price = $('.bxslider li:eq('+ i +')').find('.relatedprice').text();
    price = filter_price(price);

  }
}
else{
  price = "";
}
if(PID != "" && price != ""){
  arrayToSend.push([PID, price, prod, image, oos]);
}

} 
}

if(arrayToSend.length > 0){
  arrayToSend = JSON.stringify(arrayToSend);
  var jsonArr = [{'pairsZivame': arrayToSend}];
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
  if(getAvailability() == 0){
    current_status = 1;
  }
  cur_url = window.location.href;
  var breadcrumbF = getBreadCrumb();
  curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumbF]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataZivame': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.catalog-product-view').length>0 || $("#product-meta-data").length > 0 ){
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
  if($('.proTitle').length > 0){
    prod = $('.proTitle:eq(0)').text().trim();
  }
  else if($('.pr_name').length > 0){
    prod = $('.pr_name:eq(0)').text().trim();
  }

  else if($("#product-meta-data").length > 0 && $("#product-meta-data").attr("data-productname")){
    prod = $("#product-meta-data").attr("data-productname");
  }
  if($('.catalog-product-view').length>0 || $("#product-meta-data").length > 0 ){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  var image1 = "";
  if($('.proImg img').length > 0){
   image = $('.proImg img').attr("src");
 }
 else if($('.prfl_img').length > 0){
   image = $('.prfl_img').find('img').attr('src');
 }
 if(image == ""){
  if($('.thumbnail_img').length > 0){
    image = $('.thumbnail_img:eq(0)').attr('src');
  }
}
if(image == "" && $("#product-meta-data").length > 0 && $("#product-meta-data").attr("data-productimg")){
  image = $("#product-meta-data").attr("data-productimg");
  if(image.split("zivame.com").length < 2){
    image = "https://cdn.zivame.com"+image;
  }
}

return image;
}

function getPrice(){
  price = "";
  if($('.proPrice').length > 0){

    price = $('.proPrice').text().trim();
  }
  else if($('[itemprop="price"]').length > 0)
  {

    price = $('[itemprop="price"]').text().trim();
  }
  else if($('.pr_price').length > 0){

    price = $('.pr_price').text().trim();
  }
  else if($("#product-meta-data").length > 0 && $("#product-meta-data").attr("data-newprice")){
    price = $("#product-meta-data").attr("data-newprice");
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.txt_404').length > 0){
    avail = 0;
  }

  else if(($(".outOfStack").length > 0) && ($(".outOfStack").css("display") != "none")){
    avail = 0;
  }
  else if($("#product-meta-data").length > 0 && $("#product-meta-data").attr("data-instock") && $("#product-meta-data").attr("data-instock") == "Yes"){
    avail = 1;
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
  if(link.split('zivame.com').length < 2){
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

function autoCouponsZiv(){
  console.log("entered autoCouponsZiv");
  if($(".js-coupon-apply").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = ".js-coupon-apply:eq(0)";
    var position = "after";
    var parent = "none";
    var method = "POST";
    var api = "https://www.zivame.com/cart/coupon";
    var postFields = {"couponCode": "**"};
    var clickRemoveButton = ".js-coupon-applied .icon-cross-circle";
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1, "clickRemoveButton": clickRemoveButton, "site": 26}];
    details = JSON.stringify(details);
    initializeLocaStorage();
    displayACIcon(selectorACIcon, parent, position, 26, details);
  } 
  else{
    setTimeout(autoCouponsZiv, 1000);
  }
}
var cur_url = window.location.href;
if(cur_url.split(".zivame.com/checkout").length > 1){
  autoCouponsZiv();
}
savings = [];
bestSaving = 0;
bestCoupon = "";

function startSaving(data){
  data = JSON.parse(data);
  var nowCode = "";
  var nowSaving = "";
  var csaving = 0;
  var resp = data[0].data;
  var code = data[0].code.trim();
  var savingsObject = {};
  var ecashsaving = 0;
  nowCode = code;
  respYatra = resp;
  if(resp != "" && code != ""){
    if(resp.savingsTotal && resp.savingsTotal){
      csaving = resp.savingsTotal;
      csaving = filter_price(csaving);
      if(isNaN(csaving)){
        csaving = 0
      }
      else if(csaving > bestSaving){
        bestSaving = csaving;
        bestCoupon = code;
      }
    }
    if(resp.message){
      cpnMsg = resp.message.trim();
      cpnMsg = cpnMsg.replace(/(<([^>]+)>)/ig,"");
      arrayMsg.push([code, encodeURIComponent(cpnMsg), 429 ]);
    }
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashsaving;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  displayEachCpnSaving(code, csaving, ecashsaving);
  doneSavingCheck++;
  if(doneSavingCheckFn() == 1){
    applyBestCoupon();
    if(localStorage.anaSent!=1 && parseInt(bestSaving) != 0 && bestSaving!="" && !isNaN(parseInt(bestSaving))){
    localStorage.anaSent = 1;
    var host=window.location.host;
    var jsonArr = [{'type': 'finish1','website':host}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr,22,doNothing, []);
    tracer(1,4);
    setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);
  }
  }
  else{
    displayAutoSaving(bestSaving);
  }
}


var mainClick = 0;
var deleteAC = 0;
function applyBestCoupon(){
  console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
    if(document.getElementsByClassName("js-coupon-applied").length > 0 && document.getElementsByClassName("js-coupon-applied")[0].getElementsByClassName("icon-cross-circle").length > 0){
      document.getElementsByClassName("js-coupon-applied")[0].getElementsByClassName("icon-cross-circle")[0].click();
    }
    if(mainClick == 0){
      document.getElementsByClassName("js-use-coupon")[0].click();
      mainClick = 1;
    }
    if($(".js-coupon-apply").length > 0 && $(".js-coupon-apply:eq(0) input").length > 0 && $(".apply-coupon:eq(0)").length > 0){
      $(".js-coupon-apply:eq(0) input:eq(0)").val(bestCoupon.trim());
      displayFinalSavings();
      document.getElementsByClassName("apply-coupon")[0].click();
    }
    else{
      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    displayNoSavings();
    console.log("Show no savings popup");
  }
  if(deleteAC == 0){
    if(arrayMsg.length > 0 && arrayMsg.length != ""){
      arrayMsg = JSON.stringify(arrayMsg);
      var jsonArr = [{'cpn_msg': arrayMsg}];
      jsonArr = JSON.stringify(jsonArr);
      console.log("cpn_msg JSON: "+jsonArr);
      deleteAC = 1;
      sendMessage(1, jsonArr, 12, doNothing, []);
      arrayMsg = [];
    }
  }
}

// var cur_url = window.location.href;
// if(cur_url.split("zivame.com/bookmark").length > 1){
//   var importImg = returnResource("import_img.png");
//   if($('#view_products_ordered').length>0){
//     $('#view_products_ordered').before('<div id="importHatke"> <img src="'+importImg+'" alt="Click to import wishlist" height="50px" width="auto"/> </div>');
//   }
// }

// $("#importHatke").click(function(){
//   zivWishList();
// });

// function zivWishList(){
//   wishListZiv = [];
//   var link = "";
//   var url = "";
//   var prod = "";
//   var image = "";
//   var price = "";
//   var PID = "";
//   var pos = 429;
//   var brand = "";

//   if($('#view_products_ordered .myaccount_form').length > 0) {
//     var slider = $('#view_products_ordered .myaccount_form');
//     var sliderLength = $('#view_products_ordered .myaccount_form').length;

//     for(i=0;i<sliderLength;i++){
//       link = "";
//       url = "";
//       prod = "";
//       image = "";
//       price = "";
//       PID = "";
//       if($('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_inner a').length > 0){
//         link = $('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_inner:eq(0) a:eq(0)').attr('href');
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
//       }
//       else{
//         link = "";
//         PID = "";
//       }

//       if(PID != ""){
//         if($('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_col_title .price_outer').length > 0){
//           price = $('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_col_title:eq(0) .price_outer:eq(0)').text().trim();
//           price = price.split("\n").join(" ");
//           price = price.split("\t").join(" ");
//           if(price.split("Rs.").length > 1){
//             price = price.split("Rs.");
//             price = price[1].trim();
//           }
//           if(price.split("M.R.P").length > 1){
//             price = price.split("M.R.P");
//             price = price[0].trim();
//           }
//           price = filter_price(price);
//         }
//       }
//       else{
//         price = "";
//       }
//       if(isNaN(price)){
//         price = "";
//       }

//       if($('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_col_title h3').length > 0){
//         prod = $('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_col_title:eq(0) h3:eq(0)').text().trim();
//       }

//       if($('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_inner img').length > 0){
//         image = $('#view_products_ordered .myaccount_form:eq('+ i +')').find('.reco_item_inner img:eq(0)').attr('src').trim();
//       }

//       if(PID != "" && price != ""){
//         wishListZiv.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
//       }
//     }

//     // console.log("Wishlist: " + wishListZiv);
//     wishJson = JSON.stringify(wishListZiv);
//     var jsonArr = [{'wishList': wishJson}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 17, doNothing, []);  
//     console.log("WishlistJSON: " + wishJson);
//   }

// }



// function zivWishList(){
//   wishListZiv = [];
//   var link = "";
//   var url = "";
//   var prod = "";
//   var image = "";
//   var price = "";
//   var PID = "";
//   var pos = 429;
//   var brand = "";
//   var pag = $("#toolmsg").text().trim();
//   pag = parseInt(pag);
//   if(pag == "" || pag == undefined || pag == 0){
//     pag = 1;
//   }
//   console.log("pag: "+pag);

//   var offset = pag/10;
//   var diff = offset%10;
//   console.log("diff: "+diff);
//   if(diff > 0){
//     offset = parseInt(offset) + 1;
//   }
//   else{
//     offset = parseInt(offset);
//   }
//   console.log("offset: "+offset);

//   for(var i=1;i<=offset;i++){
//     $.post("https://www.zivame.com/bookmark/index/loadMoreProducts" , { limit: pag, offset: i}).success(function(data){
//       wrapperZiv = document.createElement('div');
//       wrapperZiv.innerHTML= data;
//       // console.log("data: "+ $(wrapperZiv).html());

//       var link = "";
//       var url = "";
//       var prod = "";
//       var image = "";
//       var price = "";
//       var PID = "";
//       var pos = 429;
//       var brand = "";

//       if($(wrapperZiv).find('.myaccount_form').length > 0) {
//         var slider = $(wrapperZiv).find('.myaccount_form');
//         var sliderLength = $(wrapperZiv).find('.myaccount_form').length;
//         console.log("sliderLength: "+sliderLength);

//         for(i=0;i<sliderLength;i++){
//           link = "";
//           url = "";
//           prod = "";
//           image = "";
//           price = "";
//           PID = "";
//           if($(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_inner a').length > 0){
//             link = $(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_inner:eq(0) a:eq(0)').attr('href');
//             url = link;
//             PID = link;
//             if(PID.split("?").length > 1){
//               PID = PID.split("?");
//               PID = PID[0];
//             }
//             if(PID.split("#").length > 1){
//               PID = PID.split("#");
//               PID = PID[0];
//             }
//           }
//           else{
//             link = "";
//             PID = "";
//           }

//           if(PID != ""){
//             if($(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_col_title .price_outer').length > 0){
//               price = $(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_col_title:eq(0) .price_outer:eq(0)').text().trim();
//               price = price.split("\n").join(" ");
//               price = price.split("\t").join(" ");
//               if(price.split("Rs.").length > 1){
//                 price = price.split("Rs.");
//                 price = price[1].trim();
//               }
//               if(price.split("M.R.P").length > 1){
//                 price = price.split("M.R.P");
//                 price = price[0].trim();
//               }
//               price = filter_price(price);
//             }
//           }
//           else{
//             price = "";
//           }
//           if(isNaN(price)){
//             price = "";
//           }

//           if($(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_col_title h3').length > 0){
//             prod = $(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_col_title:eq(0) h3:eq(0)').text().trim();
//           }

//           if($(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_inner img').length > 0){
//             image = $(wrapperZiv).find('.myaccount_form:eq('+ i +')').find('.reco_item_inner img:eq(0)').attr('src').trim();
//           }
//           prod = prod.split("'").join("").trim();
//           prod = prod.split('"').join('').trim();

//           if(PID != "" && price != ""){
//             wishListZiv.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
//           }
//           // console.log("PID: "+PID);
//           // console.log("prod: "+prod);
//           // console.log("price: "+price);
//           // console.log("image: "+image);
//           // console.log("url: "+url);
//         }

//     // console.log("Wishlist: " + wishListZiv);
//     wishJson = JSON.stringify(wishListZiv);
//     var jsonArr = [{'wishList': wishJson}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 17, alertWLResp, []);  
//     // console.log("WishlistJSON: " + wishJson);
//   }


// }); 
// }
// }

// function alertWLResp(data){
//   alert(data);
// }

