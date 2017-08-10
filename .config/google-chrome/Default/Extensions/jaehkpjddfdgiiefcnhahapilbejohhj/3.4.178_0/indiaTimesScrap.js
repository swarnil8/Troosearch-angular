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
someFlag = 0;
function sendProdCpn(){
  if(someFlag == 0 && $('.productcontainer').length > 0){
    cpnProd = [];
    var couponText = "";
    var couponCode = "";
    var couponURL = "";
    var couponExp = "0000-00-00 00:00:00";
    var couponDesc = "";
    var couponAt = 401;
    if($('.productcontainer').length > 0){
      couponCode1 = "";
      couponCode = "";
      if($('.productcontainer .offerlist').length > 0){
        cpn = $('.productcontainer .offerlist li').length;
        for(i=0;i<cpn;i++){
      // console.log("ima");
      couponDesc = $('.productcontainer .offerlist li:eq('+ i +')').text().trim();
      couponCode1 = $('.productcontainer .offerlist li:eq('+ i +')').text().trim();
      if(couponCode1.split("Use Coupon Code:").length > 1){
        couponCode1 = couponCode1.split("Use Coupon Code:")[1].trim();
        if(couponCode1.split("&").length > 1){
          couponCode1 = couponCode1.split("&")[0].trim();
        }
        couponCode = couponCode1;
      }
      cpnProd.push([couponCode, couponText, couponExp, couponDesc, couponAt]);
    }
  }


}
cpnProd = JSON.stringify(cpnProd);
console.log("cpnData: "+cpnProd);
var jsonArr = [{'cpnData': cpnProd}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr, 10, doNothing, []);
someFlag = 1;
}
else{
  setTimeout(function(){ sendProdCpn(); }, 1000);
}
}

sendProdCpn();

function sendPairs(){
  arrayToSend = [];
  if($('.product-wrap').length > 0){
    var slider = $('.product-wrap');
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
      if($('.product-wrap:eq('+ i +') a').length > 0){
        link = $('.product-wrap:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p_").length > 1){
            PID = PID.split("/p_");
            PID = PID[1];
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
        if($('.product-wrap:eq('+ i +')').find('.product-anchor').length > 0){
          prod = $('.product-wrap:eq('+ i +')').find('.product-anchor:eq(0)').attr("title").trim();
        }
        else if($('.product-wrap:eq('+ i +')').find('.itemname').length > 0){
          prod = $('.product-wrap:eq('+ i +')').find('.itemname:eq(0)').attr("title").trim();
        }
        if($('.product-wrap:eq('+ i +')').find('.product-img-align img').attr("data-original").length > 0){
          image = $('.product-wrap:eq('+ i +')').find('.product-img-align img:eq(0)').attr("data-original");
        }
        if(image == ""){
         if($('.product-wrap:eq('+ i +')').find('.product-img-align img').attr("src").length > 0){
          image = $('.product-wrap:eq('+ i +')').find('.product-img-align img:eq(0)').attr("src");
        }
      }
      if($('.product-wrap:eq('+ i +')').find('.sold-out').length > 0 && $('.product-wrap:eq('+ i +')').find('.sold-out').css("display") == "block"){
        oos = 1;
      }

      if($('.product-wrap:eq('+ i +')').find('.offerprice').length > 0){

        price = $('.product-wrap:eq('+ i +')').find('.offerprice').text();

      }

      else{
        price = "";
      }
      if(price.split("Rs").length > 1){
        price = price.split("Rs");
        price =price[1];
      }
      if(price.split("`").length > 1){
        price = price.split("`");
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
  if($('.productlist li').length > 0){
    var slider = $('.productlist li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.productlist li:eq('+ i +') a').length > 0){
        link = $('.productlist li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p_").length > 1){
            PID = PID.split("/p_");
            PID = PID[1];
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
        if($('.productlist li:eq('+ i +')').find('.spprice').length > 0){

          price = $('.productlist li:eq('+ i +')').find('.spprice').text();

        }

        else{
          price = "";
        }
        if(price.split("Rs").length > 1){
          price = price.split("Rs");
          price =price[1];
        }
        if(price.split("`").length > 1){
          price = price.split("`");
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
  if($('.otherdealtab .dealbox').length > 0){
    var slider = $('.otherdealtab .dealbox');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.otherdealtab .dealbox:eq('+ i +') a').length > 0){
        link = $('.otherdealtab .dealbox:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p_").length > 1){
            PID = PID.split("/p_");
            PID = PID[1];
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
        if($('.otherdealtab .dealbox:eq('+ i +')').find('.spprice').length > 0){

          price = $('.otherdealtab .dealbox:eq('+ i +')').find('.spprice').text();

        }
        
        else{
          price = "";
        }
        if(price.split("Rs").length > 1){
          price = price.split("Rs");
          price =price[1];
        }
        if(price.split("`").length > 1){
          price = price.split("`");
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
  if($('.youmaylike li').length > 0){
    var slider = $('.youmaylike li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.youmaylike li:eq('+ i +') a').length > 0){
        link = $('.youmaylike li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("/p_").length > 1){
            PID = PID.split("/p_");
            PID = PID[1];
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
        if($('.youmaylike li:eq('+ i +')').find('.offerprice').length > 0){

          price = $('.youmaylike li:eq('+ i +')').find('.offerprice').text();

        }
        
        else{
          price = "";
        }
        if(price.split("Rs").length > 1){
          price = price.split("Rs");
          price =price[1];
        }
        if(price.split("`").length > 1){
          price = price.split("`");
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
  var jsonArr = [{'pairsIndiatimes': arrayToSend}];
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
  prod = $("h1").text().trim();
  if($('.outofstock').length > 0){
    current_status = 1;
  }
  else{
    current_status = 0;
  }
  if($('[itemprop="price"]').length > 0){
    if($('[itemprop="price"]').text().split("`").length > 1)
    {
      myPrice = $('[itemprop="price"]').text().split("`")[1].split(',').join("").trim();
    }
    else
    {
      myPrice = $('[itemprop="price"]').text().split(',').join("").trim();
    }
  }
  else if($(".offerprice").length > 0)
  {
    if($('[itemprop="price"]').text().split("`").length > 1)
    {
      myPrice = $(".offerprice").text().split("`")[1].split(',').join("").trim();
    }
    else
    {
      myPrice = $(".offerprice").text().split("`")[1].split(',').join("").trim();
    }
  }
  else
  {
    myPrice ="";
  }
  
  image = $("#zoom1").attr("href");
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
    if(PID.split("/p_").length > 1){
      PID = PID.split("/p_");
      PID = PID[1];
    }
    if(PID.split("/").length > 1){
      PID = PID.split("/");
      PID = PID[0];
    }
  }
  else{
    PID = "";
  }

  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataIndiatimes': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.productdetailwrapper').length>0){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);




function getModel(){
  var model = "";
  if($(".productdetailsleft .productdetails dt").length > 0){
    var tab_len = $(".productdetailsleft .productdetails:eq(0) dt").length;
    for(var i=0;i<tab_len;i++){
      if($(".productdetailsleft .productdetails:eq(0) dt:eq("+i+")").text().trim().toUpperCase() == "MODEL NAME"){
        model = $(".productdetailsleft .productdetails:eq(0) dd:eq("+i+")").text().trim();
      }
    }
  }
  return model;
}

function getColor(){
  var color = "";
  if($(".productdetailsleft .productdetails dt").length > 0){
    var tab_len = $(".productdetailsleft .productdetails:eq(0) dt").length;
    for(var i=0;i<tab_len;i++){
      if($(".productdetailsleft .productdetails:eq(0) dt:eq("+i+")").text().trim().toUpperCase() == "HANDSET COLOUR"){
        color = $(".productdetailsleft .productdetails:eq(0) dd:eq("+i+")").text().trim();
      }
    }
  }
  return color;
}

function getIntStorage(){
  var intMem = "";
  if($(".productdetailsleft .productdetails dt").length > 0){
    var tab_len = $(".productdetailsleft .productdetails:eq(0) dt").length;
    for(var i=0;i<tab_len;i++){
      if($(".productdetailsleft .productdetails:eq(0) dt:eq("+i+")").text().trim().toUpperCase() == "INTERNAL MEMORY"){
        intMem = $(".productdetailsleft .productdetails:eq(0) dd:eq("+i+")").text().trim();
        if(intMem.toUpperCase().split("YES,").length > 1){
          intMem = intMem.toUpperCase().split("YES,");
          intMem = intMem[1].trim();
        }
        else if(intMem.toUpperCase().split("YES").length > 1){
          intMem = intMem.toUpperCase().split("YES");
          intMem = intMem[1].trim();
        }
      }
    }
  }
  return intMem;
}

function sendMobile(){
  var breadCrumb = getBreadCrumb();
  // console.log("getBreadCrumb: " + breadCrumb);
  if(breadCrumb.split("*~").length > 1 && breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILE HANDSETS" && getProd() != ""){
    var PID = getPID();
    var pos = 401;
    var price = getPrice();
    var image = getImage();
    var avail = getAvailability();
    var mainTitle = getProd();
    var modelName = getModel();
    var color = getColor();
    var intStorage = getIntStorage();
    var link = window.location.href;

    var jsonArr = [{'PID': encodeURIComponent(PID), 'pos': pos, 'price': price, 'image': image, 'avail': avail, 'mainTitle': encodeURIComponent(mainTitle), 'modelName': encodeURIComponent(modelName), 'color': encodeURIComponent(color), 'intStorage': encodeURIComponent(intStorage), 'link': encodeURIComponent(link) }];
    jsonArr = JSON.stringify(jsonArr);
    // console.log("jsonArr: "+jsonArr);
    sendMessage(1, jsonArr, 19, doNothing, []);

  }
}
sendMobile();


//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = "";

function getProd(){
  var prod = "";

  if($('.section-container-ui h1').length > 0){
    prod = $('.section-container-ui h1').text().trim();
  }
  else{
    prod = $("h1").text().trim();
  }
  if($('.productdetailwrapper').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.product-preview-img img').length > 0){
    image = $('.product-preview-img img').attr('data-image');
  }
  else {
    image = $("#zoom1 img").attr("src");
  }
  if(image.split("http").length < 2 && image != ""){
    image = "http://shopping.indiatimes.com" + image;
  }
  // //console.log("image: "+image);
  return image;
}

function getPrice(){
  price = "";
  if($('.pdp-price .offer-price-ui').length > 0){
    price = $('.product-container-bottom .pdp-price .offer-price-ui').text().trim();
    price = price.split(",").join("").trim();
  }
  else if($('[itemprop="price"]').length > 0){
    if($('[itemprop="price"]').text().split("`").length > 1)
    {
      price = $('[itemprop="price"]').text().split("`")[1].split(',').join("").trim();
    }
    else
    {
      price = $('[itemprop="price"]').text().split(',').join("").trim();
    }
  }
  else if($(".offerprice").length > 0)
  {
    if($('[itemprop="price"]').text().split("`").length > 1)
    {
      price = $(".offerprice").text().split("`")[1].split(',').join("").trim();
    }

    else
    {
      price = $(".offerprice").text().split("`")[1].split(',').join("").trim();
    }
  }
  else
  {
    price ="0";
  }
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.outofstock').length > 0){
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
  
  if(pid.split("p_").length > 1){
    pid = pid.split("p_")[1];
  }
  if(pid.split("/").length > 1){
    pid = pid.split("/");
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
  
  if(pid.split("p_").length > 1){
    pid = pid.split("p_")[1];
  }
  if(pid.split("/").length > 1){
    pid = pid.split("/");
    pid = pid[0];
  }
  if(link.split('shopping.indiatimes.com').length < 2){
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
  var len_bread = $('#pagenav').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('#pagenav').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;

}

var cur_url = window.location.href;
if(cur_url.split("shopping.indiatimes.com/control/showcart").length > 1 && cur_url.split("openTab=wishListPanel").length > 1){
  var importImg = returnResource("import_img.png");
  if($('.myWishList').length>0){
    $('.myWishList:eq(0)').before('<div id="importHatke"> <img src="'+importImg+'" alt="Click to import wishlist" height="50px" width="auto"/> </div>');
  }
}

// $("#importHatke").click(function(){
//   indShopWishList();
// });

// function indShopWishList(){
//   wishListIndShop = [];
//   var link = "";
//   var url = "";
//   var prod = "";
//   var image = "";
//   var price = "";
//   var PID = "";
//   var pos = 401;
//   var brand = "";

//   if($('.wishlistForm tbody:eq(0) tr').length > 0) {
//     var slider = $('.wishlistForm tbody:eq(0) tr');
//     var sliderLength = $('.wishlistForm tbody:eq(0) tr').length;

//     for(i=0;i<sliderLength;i++){
//       link = "";
//       url = "";
//       prod = "";
//       image = "";
//       price = "";
//       PID = "";
//       if($('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.prdtitle a').length > 0){
//         link = $('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.prdtitle:eq(0) a:eq(0)').attr('href');
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
//         if(PID.split("/p_").length > 1){
//           PID = PID.split("/p_");
//           PID = PID[1];
//         }
//         if(PID.split("/").length > 1){
//           PID = PID.split("/");
//           PID = PID[0];
//         }
//       }
//       else{
//         link = "";
//         PID = "";
//       }
//       if($('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.pricefont.netp').length > 0){
//         price = $('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.pricefont.netp:eq(0)').text().trim();
//         if(price.split("`").length > 1){
//           price = price.split("`");
//           price = price[1].trim();
//         }
//         price = filter_price(price);
//       }
//       if(isNaN(price)){
//         price = "";
//       }

//       if($('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.prdtitle a').length > 0){
//         prod = $('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.prdtitle:eq(0) a:eq(0)').text().trim();
//       }

//       if($('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.mycartthumb img').length > 0){
//         image = $('.wishlistForm tbody:eq(0) tr:eq('+ i +')').find('.mycartthumb img:eq(0)').attr('src').trim();
//         if(image.split("shopping.indiatimes.com").length < 2){
//           image = "https://shopping.indiatimes.com" + image; 
//         }
//       }

//       if(PID != "" && price != ""){
//         wishListIndShop.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
//       }
//     }

//     console.log("Wishlist: " + wishListIndShop);
//     wishJson = JSON.stringify(wishListIndShop);
//     var jsonArr = [{'wishList': wishJson}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 17, doNothing, []);  
//     console.log("WishlistJSON: " + wishJson);
//   }

// }
