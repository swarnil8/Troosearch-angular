var arrayMsg = [];
function getCategory(){
  var category = "";
  return category;
}

function computeCategory(prod, breadcrumb){
  var bread = getBreadCrumb();
  bread = bread.split("*~");
  var flagFound = {};
  if(bread.length > 4){
    var bread1 = bread[bread.length-3];
    var bread2 = bread[bread.length-4];
    bread1 = bread1.split(" ");
    for(var br=0; br<bread1.length; br++){
     flagFound[bread1[br].toUpperCase()] = 0;
   }
   bread2 = bread2.split(" ");
   for(var br=0; br<bread2.length; br++){
     if(flagFound[bread2[br].toUpperCase()]==0){
       flagFound[bread2[br].toUpperCase()] = 1;
     }
   }
   var catNow = "";
   for(var br=0; br<bread1.length; br++){
     if(flagFound[bread1[br].toUpperCase()] == 1){
      catNow += bread1[br] + " ";
    }
  }
  if(catNow.trim() !=""){
   return getProperCat(catNow.trim());
 }
}
}

function computeBrand(prod){
  var bread = getBreadCrumb(1);
  bread = bread.split("*~");
  var flagFound = {};
  if(bread.length > 4){
    var bread1 = bread[bread.length-3];
    var bread2 = bread[bread.length-4];
    bread1 = bread1.split(" ");
    for(var br=0; br<bread1.length; br++){
     flagFound[bread1[br].toUpperCase()] = 0;
   }
   bread2 = bread2.split(" ");
   for(var br=0; br<bread2.length; br++){
     if(flagFound[bread2[br].toUpperCase()]==0){
       flagFound[bread2[br].toUpperCase()] = 1;
     }
   }
   var brandNow = "";
   for(var br=0; br<bread1.length; br++){
     if(flagFound[bread1[br].toUpperCase()] == 0){
      brandNow += bread1[br] + " ";
    }
  }
  if(brandNow.trim() !=""){
   return brandNow.trim();
 }
}
return "";
}

function finalData(){
   // console.log("Reached Called here");
   flagMyn = 0;
   var prod = getProd(1);
   prod = removePrepositions(prod);
   if(prod == ""){
    setTimeout(finalData, 500);
    return;
  }

  var breadcrumb = getBreadCrumb();
  var isBook = 0, jsonObj = {}, finalObj = [];
  var category = "";
  var isMob = 0;
  var isLaptop = 0;
  var isDesktop = 0;

  category = computeCategory(prod, breadcrumb).trim();
  category = category.replace("&", "and");

  if($('.pdp-product-description-content').length > 0){
    var featuresText = $('.pdp-product-description-content').text();
  }
  else {
    var featuresText = "";
  }
   // console.log("Reached here 4 " + (features));
   // return;
   var brand = "";
   brand = computeBrand(prod);
   brand = brand.toLocaleLowerCase();
   // console.log("Brand " + brand);
   // return;
   var features = {};
   if(brand && brand!=""){
    features.brand_name = brand;
  }
  prod = prod.replace(brand, '');
  var units_matched = {};

  // getMetricsFromProdName(undefined, units_matched);
  getMetricsFromMainFeatures([featuresText], units_matched);
  prod = removeBrackets(prod);
  prod = normalizeProd(prod, category, [featuresText], brand, units_matched);

  var client_interest = {};

  var commonWords = findCommonWord(category, getProd(1), prod);
  if(commonWords.trim()!="" || brand.trim()!=""){
    commonWordsToPass =  commonWords.trim();
    commonWordsToPass = commonWordsToPass.split("**~").join(" ");
    commonWordsToPass = commonWordsToPass.trim();
    var jsonArr = [{'brand': brand.trim(), 'cat':commonWordsToPass.trim()}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 36, doNothing, []);
  }
  // console.log("First " + commonWords);
  if(commonWords.trim()!=""){
    prod += "**~ " +commonWords;
  }

  // var commonWords = findCommonWord(featuresText, getProd(1), prod);
  // console.log("Second " + commonWords);
  // if(commonWords.trim()!=""){
  //   prod += "**~ " +commonWords;
  // }

  client_interest.interest = {};

  client_interest.interest.brand = brand;
  client_interest.interest.price = getPrice();
  client_interest.interest.category = category;
  client_interest.interest.centres = prod;
  client_interest.interest.prodName = getProd();


  if(prod.trim()==""){
    prodSome = removeBrackets(getProd());
    prod = filterInt(prodSome);
    if(prod.trim()==""){
      logNotDone(getBreadCrumb());
      return;
    }
    else {
      client_interest.interest.centres = prod;
    }
  }


   //client_interest.interest.prod = getProd().replace(/\(.+\)/,"").trim();  //to be discussed


   client_interest.features = features.metric_features;
   jsonObj.client_id = getCookie('bhInfV_cl_id');
   jsonObj.interests = client_interest.interest;
   jsonObj.variants = client_interest.features;
   finalObj.push(jsonObj);

   // console.log("At the end " + JSON.stringify(finalObj));
   // return;

   sendMessage(1, JSON.stringify(finalObj), 28, doNothing, []);
   var pollInterval = 1000 * 15;
   window.setTimeout(sendCurrent, 5000);
   window.setTimeout(sendPairs, 5000);
   window.setTimeout(sendPairs, pollInterval);
   sendCoupon();

 }

 function sendPairs(){
  var arrayToSend = [];
  var dropToSend = [];
  var price = "";
  var PID = "";
  var prod = "";
  var image = "";
  var oos = 0;
  var link= "";
  var brand = "";

  if(document.getElementsByClassName('product-list-list').length > 0){
    var sideLen = document.getElementsByClassName('product-list-list')[0].getElementsByTagName('li').length;
    for(i=0;i<sideLen;i++){
      price = "";
      PID = "";
      prod = "";
      image = "";
      oos = 0;
      link = document.getElementsByClassName('product-list-list')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].getAttribute("href");
      PID = returnPID(link);
      price_div = $('.product-list-list li:eq('+i+')').find('.product-item-selling-price:eq(0)').clone();
      $(price_div).find(".strike").remove();
      $(price_div).find(".discount").remove();
      price = $(price_div).text();
      price = filter_price(price);

      brand = document.getElementsByClassName('product-list-list')[0].getElementsByTagName('li')[i].getElementsByClassName('product-item-brand')[0].innerText;
      prod = document.getElementsByClassName('product-list-list')[0].getElementsByTagName('li')[i].getElementsByClassName('product-item-title')[0].innerText;
      prod = prod.trim();
      if(" "+prod.toUpperCase().split(" "+brand.toUpperCase()+" ").length < 2){
        prod = brand.trim() + " " + document.getElementsByClassName('product-list-list')[0].getElementsByTagName('li')[i].getElementsByClassName('product-item-title')[0].innerText;
      }
      image = document.getElementsByClassName('product-list-list')[0].getElementsByTagName('li')[i].getElementsByClassName('product-item-image')[0].getElementsByTagName('img')[0].getAttribute("src");
      image = image.trim();

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }
    }
  }


  if(document.getElementsByClassName('results').length > 0){

   var sideLen = document.getElementsByClassName('results')[0].getElementsByTagName('li').length;
   for(i=0;i<sideLen;i++){
    price = "";
    PID = "";
    prod = "";
    image = "";
    oos = 0;
    link = document.getElementsByClassName('results')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].getAttribute("href");
    PID = returnPID(link);
    price_div = $('.results:eq(0) li:eq('+i+')').find('a:eq(0)').find('.price:eq(0)').clone();
    $(price_div).find(".strike").remove();
    $(price_div).find(".discount").remove();
    price = $(price_div).text();
    price = filter_price(price);


    brand = document.getElementsByClassName('results')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].getElementsByClassName('brand')[0].innerText;
    prod = brand.trim() + " " + document.getElementsByClassName('results')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].getElementsByClassName('product')[0].innerText;
    prod = prod.trim();
    image = document.getElementsByClassName('results')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0].getAttribute("_src");
    image = image.trim();

    if(PID != "" && price != ""){
      arrayToSend.push([PID, price, prod, image, oos]);
      dropToSend.push(PID);
    }
  }
}


if(document.getElementsByClassName('results-base').length > 0){

 var sideLen = document.getElementsByClassName('results-base')[0].getElementsByTagName('li').length;
 for(i=0;i<sideLen;i++){
  price = "";
  PID = "";
  prod = "";
  image = "";
  oos = 0;
  link = document.getElementsByClassName('results-base')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].getAttribute("href");
  PID = returnPID(link);
  price_div = $('.results-base:eq(0) li:eq('+i+')').find('.product-discountedPrice:eq(0)').text().trim();
  price = filter_price(price_div);


  brand = document.getElementsByClassName('results-base')[0].getElementsByTagName('li')[i].getElementsByClassName('product-brand')[0].innerText;
  prod = brand.trim() + " " + document.getElementsByClassName('results-base')[0].getElementsByTagName('li')[i].getElementsByClassName('product-product')[0].innerText;
  prod = prod.trim();
  if(document.getElementsByClassName('results-base')[0].getElementsByTagName('li')[i].getElementsByClassName('product-thumb').length > 0){
    image = document.getElementsByClassName('results-base')[0].getElementsByTagName('li')[i].getElementsByClassName('product-thumb')[0].getAttribute("src");
    image = image.trim();
  }
  else{
    image = "";
  }
  if(PID != "" && price != ""){
    arrayToSend.push([PID, price, prod, image, oos]);
    dropToSend.push(PID);
  }
}
}

  // if($('.results li').length > 0){
  //   var slider = $('.results li');
  //   var sliderLength = slider.length;
  //   var link;
  //   var price;
  //   var PID;
  //   var flag;
  //   for(i=0;i<sliderLength;i++){
  //     price = "";
  //     PID = "";
  //     flag = 0;
  //     if($('.results li:eq('+ i +') a').length > 0){
  //       link = $('.results li:eq('+ i +') a:eq(0)').attr('href');
  //       if(link != ""){
  //         if(link.split("/buy").length > 1){
  //           link = link.split("/buy")[0];
  //           if(link.split("/").length > 1){
  //             link = link.split("/");
  //             PID = link[link.length - 1];
  //           }
  //         }
  //         else{
  //           PID = "";
  //         }
  //       }
  //       else{
  //         PID = "";
  //       }
  //     }
  //     if(PID != ""){
  //       if($('.results li:eq('+ i +')').find('.price').length > 0){
  //         price = $('.results li:eq('+ i +')').find('.price').html();
  //         if($('.results li:eq('+ i +')').find('.price .strike').length > 0){
  //           price = price.split("</span>");
  //           price = price[1];
  //           flag = 1;
  //         }
  //         if($('.results li:eq('+ i +')').find('.price .discount').length > 0){
  //           price = price.split("<span");
  //           price = price[0];
  //           flag = 1;
  //         }
  //         if(flag == 0){
  //           price = $('.results li:eq('+ i +')').find('.price').text();
  //         }
  //         if(price.split("Rs.").length > 1){
  //           price = price.split("Rs.");
  //           price = price[1];
  //         }
  //         price = price.split(",").join("").trim();
  //       }
  //     }
  //     else{
  //       price = "";
  //     }
  //     if(PID != "" && price != ""){
  //       arrayToSend.push([PID, price]);
  //     }

  //   } // for ends

  // }

  // if($('.productsCont li').length > 0){
  //   var slider = $('.productsCont li');
  //   var sliderLength = slider.length;
  //   var link;
  //   var price;
  //   var PID;
  //   var flag;
  //   for(i=0;i<sliderLength;i++){
  //     price = "";
  //     PID = "";
  //     flag = 0;
  //     if($('.productsCont li:eq('+ i +') a').length > 0){
  //       link = $('.productsCont li:eq('+ i +') a:eq(0)').attr('href');
  //       if(link != ""){
  //         if(link.split("/buy").length > 1){
  //           link = link.split("/buy")[0];
  //           if(link.split("/").length > 1){
  //             link = link.split("/");
  //             PID = link[link.length -1];
  //           }
  //         }
  //         else{
  //           PID = "";
  //         }
  //       }
  //       else{
  //         PID = "";
  //       }
  //     }
  //     if(PID != ""){
  //       if($('.productsCont li:eq('+ i +')').find('.price').length > 0){
  //         price = $('.productsCont li:eq('+ i +')').find('.price').html();
  //         if($('.productsCont li:eq('+ i +')').find('.price .strike').length > 0){
  //           price = price.split("</span>")[1];
  //           flag = 1;
  //         }
  //         if($('.productsCont li:eq('+ i +')').find('.price .discount').length > 0){
  //           price = price.split("<span")[0];
  //           flag = 1;
  //         }
  //         if(flag == 0){
  //           price = $('.productsCont li:eq('+ i +')').find('.price').text();
  //         }
  //         if(price.split("Rs.").length > 1){
  //           price = price.split("Rs.");
  //           price = price[1];
  //         }
  //         price = price.split(",").join("").trim();
  //       }
  //     }
  //     else{
  //       price = "";
  //     }
  //     if(PID != "" && price != ""){
  //       arrayToSend.push([PID, price]);
  //     }

  //   } // for ends

  // }

  // if($('.alsopopular li').length > 0){
  //   var slider = $('.alsopopular li');
  //   var sliderLength = slider.length;
  //   var link;
  //   var price;
  //   var PID;
  //   var flag;
  //   for(i=0;i<sliderLength;i++){
  //     price = "";
  //     PID = "";
  //     flag = 0;
  //     if($('.alsopopular li:eq('+ i +') a').length > 0){
  //       link = $('.alsopopular li:eq('+ i +') a:eq(0)').attr('href');
  //       if(link != ""){
  //         if(link.split("/buy").length > 1){
  //           link = link.split("/buy")[0];
  //           if(link.split("/").length > 1){
  //             link = link.split("/");
  //             PID = link[link.length -1];
  //           }
  //         }
  //         else{
  //           PID = "";
  //         }
  //       }
  //       else{
  //         PID = "";
  //       }
  //     }
  //     if(PID != ""){
  //       if($('.alsopopular li:eq('+ i +')').find('.price').length > 0){
  //         price = $('.alsopopular li:eq('+ i +')').find('.price').html();
  //         if($('.alsopopular li:eq('+ i +')').find('.price .strike').length > 0){
  //           price = price.split("</span>")[1];
  //           flag = 1;
  //         }
  //         if($('.alsopopular li:eq('+ i +')').find('.price .discount').length > 0){
  //           price = price.split("<span")[0];
  //           flag = 1;
  //         }
  //         if(flag == 0){
  //           price = $('.alsopopular li:eq('+ i +')').find('.price').text();
  //         }
  //         if(price.split("Rs.").length > 1){
  //           price = price.split("Rs.");
  //           price = price[1];
  //         }
  //         price = price.split(",").join("").trim();
  //       }
  //     }
  //     else{
  //       price = "";
  //     }
  //     if(PID != "" && price != ""){
  //       arrayToSend.push([PID, price]);
  //     }

  //   } // for ends

  // }
  // if($('.recentlyviewed li').length > 0){
  //   var slider = $('.recentlyviewed li');
  //   var sliderLength = slider.length;
  //   var link;
  //   var price;
  //   var PID;
  //   var flag;
  //   for(i=0;i<sliderLength;i++){
  //     price = "";
  //     PID = "";
  //     flag = 0;
  //     if($('.recentlyviewed li:eq('+ i +') a').length > 0){
  //       link = $('.recentlyviewed li:eq('+ i +') a:eq(0)').attr('href');
  //       if(link != ""){
  //         if(link.split("/buy").length > 1){
  //           link = link.split("/buy")[0];
  //           if(link.split("/").length > 1){
  //             link = link.split("/");
  //             PID = link[link.length -1];
  //           }
  //         }
  //         else{
  //           PID = "";
  //         }
  //       }
  //       else{
  //         PID = "";
  //       }
  //     }
  //     if(PID != ""){
  //       if($('.recentlyviewed li:eq('+ i +')').find('.price').length > 0){
  //         price = $('.recentlyviewed li:eq('+ i +')').find('.price').html();
  //         if($('.recentlyviewed li:eq('+ i +')').find('.price .strike').length > 0){
  //           price = price.split("</span>")[1];
  //           flag = 1;
  //         }
  //         if($('.recentlyviewed li:eq('+ i +')').find('.price .discount').length > 0){
  //           price = price.split("<span")[0];
  //           flag = 1;
  //         }
  //         if(flag == 0){
  //           price = $('.recentlyviewed li:eq('+ i +')').find('.price').text();
  //         }
  //         if(price.split("Rs.").length > 1){
  //           price = price.split("Rs.");
  //           price = price[1];
  //         }
  //         price = price.split(",").join("").trim();
  //       }
  //     }
  //     else{
  //       price = "";
  //     }
  //     if(PID != "" && price != ""){
  //       arrayToSend.push([PID, price]);
  //     }

  //   } // for ends

  // }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsMyn': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
  if(dropToSend.length > 0){
    dropToSend = JSON.stringify(dropToSend);
    var jsonArr = [{'pids': dropToSend, 'pos': 111}];
    jsonArr = JSON.stringify(jsonArr);
    var passBack = ['.product-list-list li', '.results li'];
    sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);
  }
}

// function sendProdCpn(){
//   var couponCode = "";
//   var couponText = "";
//   var couponExp = 0;
//   var couponDesc = "";
//   var found = 0;
//   var couponAt = 111;
//   var couponUrl = "http://www.myntra.com/";
//   var couponToSend = [];
//   var cur_link = window.location.href;
//   if($(".allOptions").length > 0 && $(".allOptions ul").length > 0){
//     var tot_filters = $(".allOptions ul").length;
//     for(var t=0;t<tot_filters;t++){
//       if($(".allOptions ul:eq("+t+")").attr("data-filter") == "tag_coupon"){
//         for(var i=0;i<$(".allOptions ul:eq("+t+") li").length;i++){
//           found = 1;
//           couponCode = $(".allOptions ul:eq("+t+") li:eq("+i+")").attr("data-option").trim().toUpperCase();
//           couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
//         }
//       }
//     }
//   }
//   if($(".coupon-wrapper").length > 0 && $(".coupon").length > 0){
//     found = 1;
//     couponCode = $(".coupon-wrapper .coupon:eq(0) td:eq(1)").text().trim();
//     couponText = $(".coupon-wrapper .coupon:eq(0) tr:eq(1)").text().trim();
//     console.log("couponCode: "+couponCode);
//     if(couponCode.toUpperCase() == couponCode && couponCode != ""){
//       couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
//     }
//   }
//   if(couponToSend.length > 0 && found == 1){
//     couponToSend = JSON.stringify(couponToSend);
//     var jsonArr = [{'couponsExt': couponToSend}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 15, doNothing, []);
//   }
//   else {
//     setTimeout(sendProdCpn, 2000);
//   }
// }

// sendProdCpn();

function sendCurrent(){
  if(document.getElementsByClassName('summary').length>0 || document.getElementsByClassName('pdp-details').length>0){
    curData = [];
    var prod = getProd();
    var image = getImage();
    var myPrice = getPrice();
    var cur_url = "";
    var current_status = 0;
    var breadcrumb_str = getBreadCrumb();
    if(getAvailability() == 0){
      current_status = 1;
    }
    var link = "";
    image = getImage();
    link = window.location.href;
    var PID = returnPID(link);
    cur_url = window.location.href;
    curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str, 1]);
    curData = JSON.stringify(curData);
    var jsonArr = [{'curDataMyn': curData}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}




//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;


function getProd(){
  var prod = "";
  if(document.getElementsByClassName("pdp-title").length > 0){
    prod = document.getElementsByClassName("pdp-title")[0].innerText.trim();
  }
  else if(document.getElementsByTagName("h1").length > 0){
    prod = document.getElementsByTagName("h1")[0].innerText.trim();
  }
  // //console.log("prod: "+prod);
  if(document.getElementsByClassName('summary').length>0 || document.getElementsByClassName('pdp-details').length>0 ){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if(document.getElementsByClassName("blowup").length > 0){
    image = document.getElementsByClassName("blowup")[0].getElementsByTagName("img")[0].getAttribute("src");
  }
  else  if(document.getElementsByClassName("pdp-image-container").length > 0){
    image = document.getElementsByClassName("pdp-image-container")[0].getElementsByClassName("thumbnails-selected-image")[0].getAttribute("src");
  }
  return image;
}

function getPrice(){
  price = "";
  if(document.getElementsByClassName("price").length > 0 && document.getElementsByClassName("price")[0].getElementsByClassName("final").length > 0)
  {
    price = document.getElementsByClassName("price")[0].getElementsByClassName("final")[0].innerText;
  }
  else if(document.getElementsByClassName("pdp-selling-price").length > 0 && document.getElementsByClassName("pdp-selling-price")[0].getElementsByClassName("pdp-price").length > 0)
  {
    price = document.getElementsByClassName("pdp-selling-price")[0].getElementsByClassName("pdp-price")[0].innerText.trim();
  }

  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if(document.getElementsByClassName('oos')[0]){
    avail = 0;
  }
  else if(document.getElementsByClassName('size-buttons-out-of-stock')[0]){
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
  if(pid.split("/buyhatke/buyhatke").length > 1){
    pid = pid.split("/buyhatke/buyhatke")[1];
  }
  if(pid.split("/buyhatke").length > 1){
    pid = pid.split("/buyhatke")[1];
  }

  if(pid.split("/buy").length > 1){
    pid = pid.split("/buy")[0];
  }

  if(pid.split("/").length > 1){
    pid = pid.split("/");
    pid = pid[pid.length - 1];
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
  if(pid.split("/buyhatke/buyhatke").length > 1){
    pid = pid.split("/buyhatke/buyhatke")[1];
  }
  if(pid.split("/buyhatke").length > 1){
    pid = pid.split("/buyhatke")[1];
  }

  if(pid.split("/buy").length > 1){
    pid = pid.split("/buy")[0];
  }

  if(pid.split("/").length > 1){
    pid = pid.split("/");
    pid = pid[pid.length - 1];
  }
  // if(link.split('myntra.com').length < 2){
  //   pid = 0;
  // }
  if(link == ""){
    pid = 0;
  }

  return pid;



}


function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  if(document.getElementsByClassName('breadcrumb').length > 0){
    var len_bread = document.getElementsByClassName('breadcrumb')[0].getElementsByTagName('a').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = document.getElementsByClassName('breadcrumb')[0].getElementsByTagName('a')[i].innerText.trim();
      bread_final += breadcrumb + "*~";
    }
  }
  else if(document.getElementsByClassName('breadcrumbs-link').length > 0){
    var len_bread = document.getElementsByClassName('breadcrumbs-link').length;

    for(i=0;i<len_bread;i++){
      breadcrumb = document.getElementsByClassName('breadcrumbs-link')[i].innerText.trim();
      bread_final += breadcrumb + "*~";
    }
  }
  return bread_final;
}



// /////////////// WISH TO WATCH LIST STARTS ///////////////

var cur_url = window.location.href;
if(cur_url.split("/wishlist").length > 1 && (cur_url.split("myntra.com").length > 1)){
  if($('.wishlist-section').length>0){
    importWishGlobal('.wishlist-section:eq(0)', 'before', mynWishList);
  }
}

function mynWishList(){
  wishListMyn = [];
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 111;
  var brand = "";

  if($('.wishlist-section .wl-item').length > 0) {
    var slider = $('.wishlist-section .wl-item');
    var sliderLength = $('.wishlist-section .wl-item').length;

    for(i=0;i<sliderLength;i++){
      link = "";
      url = "";
      prod = "";
      image = "";
      price = "";
      PID = "";
      if($('.wishlist-section .wl-item:eq('+ i +')').find('a').length > 0){
        link = $('.wishlist-section .wl-item:eq('+ i +')').find('a:eq(0)').attr('href');
        url = link;
        if(link.split("myntra.com").length < 2){
          link = "https://www.myntra.com"+link;
          url = link;
        }
        PID = returnPID(link);
      }
      else{
        link = "";
        PID = "";
      }
      price = 0;

      if($('.wishlist-section .wl-item:eq('+ i +')').find('.prod-details .name').length > 0){
        prod = $('.wishlist-section .wl-item:eq('+ i +')').find('.prod-details .name').text().trim();
        if(prod.split("...").length > 1){
          prod = prod.split("...");
          prod = prod[0].trim();
        }
        prod = prod.split("&nbsp;");
        prod = prod.join(" ");
        prod = prod.trim();
      }

      if($('.wishlist-section .wl-item:eq('+ i +')').find('.image img').length > 0){
        image = $('.wishlist-section .wl-item:eq('+ i +')').find('.image img:eq(0)').attr('src').trim();
      }
      if($('.wishlist-section .wl-item:eq('+ i +')').find('.prod-specifics .price').length > 0){
        price = $('.wishlist-section .wl-item:eq('+ i +')').find('.prod-specifics .price:eq(0)').text().trim();
        price = filter_price(price);
      }

      if(PID != "" && PID != 0 && price != "" && !isNaN(price)){
        wishListMyn.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
      }
    }

    wishJson = JSON.stringify(wishListMyn);
    var jsonArr = [{'wishList': wishJson}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 17, alertWLResp, []);
  }

}
function alertWLResp(data){
  alert(data);
}

flagMyn = 0;

function sendCoupon(){
  cpnData = [];
  var couponText = "";
  var couponCode = "";
  var couponURL = window.location.href;
  var couponExp = "0000-00-00 00:00:00";
  var couponDesc = "";
  var couponAt = 111;
  var cur_link = window.location.href;
  if(flagMyn == 0 && getProd() != ""){
   if($('.coupon-list').length > 0){
     var cpn = $('.coupon-list .coupon-data');
     for(i=1;i<cpn.length;i++){

      couponCode = $('.coupon-list .coupon-data:eq('+ i +') .coupon-code:eq(0)').text().trim();
      couponDesc = $('.coupon-list .coupon-data:eq('+ i +') .coupon-desc:eq(0) .text:eq(0)').text().trim();
      couponText = couponDesc;
      couponExp = $('.coupon-list .coupon-data:eq('+ i +') .coupon-valid:eq(0)').text().trim();
      if(couponExp.toUpperCase().split("VALID TILL").length > 1){
        couponExp = couponExp.toUpperCase().split("VALID TILL")[1].trim();
      }

      cpnData.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponURL), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
    }

    if(cpnData.length > 0){
      cpnData = JSON.stringify(cpnData);
      var jsonArr = [{'couponsExt': cpnData}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr, 15, doNothing, []);
      flagMyn = 1;
    }
  }

  if(getPID() != "undefined" && getPID() != ""){
    couponText = "";
    couponCode = "";
    couponExp = "0000-00-00 00:00:00";
    couponDesc = "";
    couponAt = 111;
    cpnData = [];
    $.get("http://www.myntra.com/web/myntapi/coupons/pdp/"+getPID(), {}).success(function(resp){
      if(resp.data){
        responseText = (resp.data)[0];
        if(responseText){
          couponCode = responseText.coupon;
          if(couponCode && couponCode.trim() != "" && couponCode.trim() == couponCode.toUpperCase().trim()){

          }
          else{
            couponCode = "";
          }
          couponText = responseText.applicableCondition + " on " + responseText.applicableOn;
          couponDesc = couponText;
          couponExp = timeConverter(responseText.endTime);
          cpnData.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponURL), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
          if(cpnData.length > 0){
            cpnData = JSON.stringify(cpnData);
            var jsonArr = [{'couponsExt': cpnData}];
            jsonArr = JSON.stringify(jsonArr);
            sendMessage(1, jsonArr, 15, doNothing, []);
            flagMyn = 1;
          }
        }
      }
    });
  }
}
else if(getProd() != ""){
  setTimeout(function(){ sendCoupon(); }, 1000);
}
else if(flagMyn == 0){
  if(cur_url.split(".myntra.com/checkout/cart").length > 1){
    couponURL = "http://www.myntra.com/";
    couponAt = 111;
    cur_link = window.location.href;
    if($(".coupon-list").length > 0 && $(".coupon-list .coupon-data").length > 0){
      var couponLen = $(".coupon-list .coupon-data").length;
      for(var c=0;c<couponLen;c++){
        couponCode = "";
        couponText = "";
        couponDesc = "";
        if($(".coupon-list .coupon-data:eq("+c+") .coupon-code").length > 0){
         couponCode = $(".coupon-list .coupon-data:eq("+c+") .coupon-code:eq(0)").text().trim();
       }
       if($(".coupon-list .coupon-data:eq("+c+") .coupon-info").length > 0){
         couponText = $(".coupon-list .coupon-data:eq("+c+") .coupon-info:eq(0)").text().trim();
         couponText = couponText.split("*").join(" ").trim();
         couponDesc = couponText;
       }
       if(couponCode != undefined && couponCode != "" && couponCode == couponCode.toUpperCase()){
        cpnData.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponURL), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
      }
    }
    if(cpnData.length > 0){
      cpnData = JSON.stringify(cpnData);
      var jsonArr = [{'couponsExt': cpnData}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr, 15, doNothing, []);
      flagMyn = 1;
    }
  }
  else{
    setTimeout(function(){ sendCoupon(); }, 1000);
  }
}
}
}

sendCoupon();

var cur_url = window.location.href;
if(cur_url.split(".myntra.com/checkout/cart").length > 1){
  var checkPick = ".coupon-section .actions .delete-coupon";
  var selector = ".coupon-section .actions .delete-coupon:eq(0)";
  var attr = "data-coupon";
  var webID = 111;
  var homeLink = "http://www.myntra.com/";
  pickAppliedCpn(checkPick, selector, attr, webID, homeLink);

  if($(".coupon-section").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = ".coupon-section:eq(0)";
    var position = "after";
    var parent = "none";
    var method = "POST";
    var api = "https://secure.myntra.com/checkout/cart";
    var tokencode=$( "input[name='_token']" )[0].value;
    var postFields = {token:tokencode , coupon:"**", operation: "APPLY_COUPON"};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
    details = JSON.stringify(details);
    arrayMsg = [];
    displayACIcon(selectorACIcon, parent, position, 2, details);
    keepCheckingACIcon(selectorACIcon, parent, position, 2, details);
  }
}

savings = [];
bestSaving = 0;
bestCoupon = "";




// console.log(document.cookie);
// if(chrome.extension.getURL('auto_myntra.js')){
  // var s3 = document.createElement('script');
  // s3.src = chrome.extension.getURL('auto_myntra.js');
  // (document.head || document.documentElement).appendChild(s3);
// }

function startSaving(data1){
  data1 = JSON.parse(data1);
  var nowCode = "";
  var nowSaving = "";
  var resp = data1[0].data;
  var code = data1[0].code.trim();
  var csaving = 0;
  var ecashing = 0;
  var savingsObject = {};
  var cpnMsg = "";
  nowCode = code;
  respYatra = resp;
  if(resp != "" && code != ""){
    if(resp.status && resp.status == "error" && resp.message){
      cpnMsg = resp.message;
      arrayMsg.push([code, encodeURIComponent(cpnMsg), 111]);
    }
    else{
      wrapper= document.createElement('div');
      wrapper.innerHTML= resp;
      if($(wrapper).find(".order-summary-span").length > 0 && $(wrapper).find(".order-summary-span .coupon").length > 0){
        var csaving = $(wrapper).find(".order-summary-span .coupon:eq(0) span:eq(0)").text().trim();
        csaving = filter_price(csaving);
        if(isNaN(csaving)){
          csaving = 0
        }
        else if(csaving > bestSaving){
          bestSaving = csaving;
          bestCoupon = code;
        }
        if(csaving > 0){
          cpnMsg = "SUCCESS";
          arrayMsg.push([code, encodeURIComponent(cpnMsg), 111]);
        }
      }
    }
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashing;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  displayEachCpnSaving(code, csaving, ecashing);
  doneSavingCheck++;
  if(doneSavingCheckFn() == 1){
    // console.log("calling applyBestCoupon from here");
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
}

var deleteAC = 0;
function applyBestCoupon(){
  // console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
    if($(".apply").length > 0 && $(".apply").css("display") != "none"){
      document.getElementsByClassName("apply")[0].click();
    }
    else if($(".edit-coupon").length > 0 && $(".edit-coupon").css("display") != "none"){
      document.getElementsByClassName("edit-coupon")[0].click();
    }

    if($(".enter-coupon").length > 0 && $(".enter-coupon").css("display") != "none"){
      $(".enter-coupon").val(bestCoupon.trim());
      document.getElementsByClassName("btn-apply")[0].click();
      displayFinalSavings();
    }
    else{
      // console.log("calling applyBestCoupon from self");
      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    // console.log("Show no savings popup");
    displayNoSavings();
  }
  if(deleteAC == 0){
    if(arrayMsg.length > 0 && arrayMsg.length != ""){
      arrayMsg = JSON.stringify(arrayMsg);
      var jsonArr = [{'cpn_msg': arrayMsg}];
      jsonArr = JSON.stringify(jsonArr);
      // console.log("cpn_msg JSON: "+jsonArr);
      deleteAC = 1;
      sendMessage(1, jsonArr, 12, doNothing, []);
      arrayMsg = [];
    }
  }
}
