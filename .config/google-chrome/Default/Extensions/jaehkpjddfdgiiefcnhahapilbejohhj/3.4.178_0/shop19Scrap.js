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
      if($('.item:eq('+ i +') a').length > 0){
        link = $('.item:eq('+ i +') a:eq(0)').attr("href");
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

        if($('.item:eq('+ i +')').find('.prod_caption').length > 0 && $('.item:eq('+ i +')').find('.prod_caption a').attr("title").length > 0){
          prod = $('.item:eq('+ i +')').find('.prod_caption a:eq(0)').attr("title").trim();

        }
        if($('.item:eq('+ i +')').find('.img-responsive.center-block').length > 0 && $('.item:eq('+ i +')').find('.img-responsive.center-block').attr("src").length > 0){
          image = $('.item:eq('+ i +')').find('.img-responsive.center-block:eq(0)').attr("src").trim();

        }
        if($('.item:eq('+ i +')').find('.soldout').length > 0){
          oos = 1;

        }
        if($('.item:eq('+ i +')').find('.special-price').length > 0){

          price = $('.item:eq('+ i +')').find('.special-price .price').text();
          if(price == ""){
            if($('.item:eq('+ i +')').find('.regular-price').length > 0){
              price = $('.item:eq('+ i +')').find('.regular-price .price').text();

            }
            else{
              price = "";
            }

          }

        }
        else if($('.item:eq('+ i +')').find('.regular-price').length > 0){
          price = $('.item:eq('+ i +')').find('.regular-price .price').text();

        }
        else if($('.item:eq('+ i +')').find('.price-box').length > 0){
          price = $('.item:eq('+ i +')').find('.price-box').text();

        }
        else if($('.item:eq('+ i +')').find('.price_tag').length > 0){
          price = $('.item:eq('+ i +')').find('.price_tag').text();

        }
        // if(price == ""){
        //  if($('.item:eq('+ i +')').find('.regular-price').length > 0){
        //    price = $('.item:eq('+ i +')').find('.regular-price .price').text();

        //  }
        // }
        else{
          price = "";
        }
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


  if($('#ur-look  li').length > 0){
    var slider = $('#ur-look  li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#ur-look  li:eq('+ i +') a').length > 0){
        link = $('#ur-look  li:eq('+ i +') a:eq(0)').attr("href");
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
        if($('#ur-look  li:eq('+ i +')').find('.special-price').length > 0){

          price = $('#ur-look  li:eq('+ i +')').find('.special-price .price').text();
          if(price == ""){
            if($('#ur-look  li:eq('+ i +')').find('.regular-price').length > 0){
              price = $('#ur-look  li:eq('+ i +')').find('.regular-price .price').text();
            }
            else{
              price = "";
            }

          }

        }
        else if($('#ur-look  li:eq('+ i +')').find('.regular-price').length > 0){
          price = $('#ur-look  li:eq('+ i +')').find('.regular-price .price').text();

        }
        else if($('#ur-look  li:eq('+ i +')').find('.price-box').length > 0){
          price = $('#ur-look  li:eq('+ i +')').find('.price-box').text();

        }
        else if($('#ur-look  li:eq('+ i +')').find('.price_tag').length > 0){
          price = $('#ur-look  li:eq('+ i +')').find('.price_tag').text();

        }
        // if(price == ""){
        //  if($('.item:eq('+ i +')').find('.regular-price').length > 0){
        //    price = $('.item:eq('+ i +')').find('.regular-price .price').text();

        //  }
        // }
        else{
          price = "";
        }
        price = filter_price(price);

      }
      else{
        price = "";
      }

      if(isNaN(price)){
        price = "";
      }

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price]);
      }

    } // for ends1

  }

  if($('.ca-item').length > 0){
    var slider = $('.ca-item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.ca-item:eq('+ i +') a').length > 0){
        link = $('.ca-item:eq('+ i +') a:eq(0)').attr("href");
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
        if($('.ca-item:eq('+ i +')').find('.special-price').length > 0){

          price = $('.ca-item:eq('+ i +')').find('.special-price .price').text();
          if(price == ""){
            if($('.ca-item:eq('+ i +')').find('.regular-price').length > 0){
              price = $('.ca-item:eq('+ i +')').find('.regular-price .price').text();

            }
            else{
              price = "";
            }

          }

        }
        else if($('.ca-item:eq('+ i +')').find('.regular-price').length > 0){
          price = $('.ca-item:eq('+ i +')').find('.regular-price .price').text();

        }
        else if($('.ca-item:eq('+ i +')').find('.price-box .special-price-new').length > 0){
          price = $('.ca-item:eq('+ i +')').find('.price-box .special-price-new').text();

        }

        else if($('.ca-item:eq('+ i +')').find('.price-box .mws-regular-price').length > 0){
          price = $('.ca-item:eq('+ i +')').find('.price-box .mws-regular-price').text();

        }
        // if(price == ""){
        //  if($('.item:eq('+ i +')').find('.regular-price').length > 0){
        //    price = $('.item:eq('+ i +')').find('.regular-price .price').text();

        //  }
        // }
        else{
          price = "";
        }
        price = filter_price(price);
        
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
    var jsonArr = [{'pairss19': arrayToSend}];
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

  prod = $(".detail_title:eq(0)").text().trim();

  if(($('.product-main-info').length > 0) && ($('.product-main-info').text().split('Sold Out').length > 1)){
    current_status = 1;
  }
  else if($('.add-to-cart').length < 1){
    current_status = 1;
  }
  else{
    current_status = 0;
  }

  if($('.special_price p').length > 1){
    myPrice = $('.special_price p:eq(1)').text().trim();
  }
  else if($('.special_price .price').length > 0){
    myPrice = $('.special_price .price:eq(0)').text().trim();
  }
  else if($('.special-price .price').length > 0){
    myPrice = $('.special-price .price').text().trim();
  }
  else if($('.price-box .price').length > 0){
    myPrice = $('.price-box .price').text().trim();
  }
  
  myPrice = filter_price(myPrice);
  
  image = $(".gallery-image:eq(0)").attr("src");

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
  if($('.product-view').length>0){
    curData.push([prod, image, myPrice, cur_url, current_status, PID]);
    curData = JSON.stringify(curData);
    var jsonArr = [{'curDatas19': curData}];
    jsonArr = JSON.stringify(jsonArr);
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
  prod = $(".detail_title:eq(0)").text().trim();
  if($('.product-view').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  image = $(".gallery-image:eq(0)").attr("src");
  return image;
}

function getPrice(){
  price = "";
  if($('.special_price p').length > 1){
    price = $('.special_price p:eq(1)').text().trim();
  }
  else if($('.special_price .price').length > 0){
    price = $('.special_price .price:eq(0)').text().trim();
  }
  else if($('.special-price .price').length > 0){
    price = $('.special-price .price').text().trim();
  }
  else if($('.price-box .price').length > 0){
    price = $('.price-box .price').text().trim();
  }
  
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.out-of-stock').length > 0){
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
  if(link.split('shopnineteen.com').length < 2){
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

///////////// WISH TO WATCH LIST STARTS //////////////

// var cur_url = window.location.href;

// if(cur_url.split("shopnineteen.com/wishlist").length > 1){
//   var importImg = returnResource("import_img.png");
//   if($('.my-wishlist').length>0){
//     $('.my-wishlist:eq(0)').before('<div id="importHatke"> <img src="'+importImg+'" alt="Click to import wishlist" height="50px" width="auto"/> </div>');
//   }
// }

// $("#importHatke").click(function(){
//   shop19WishList();
// });

// function shop19WishList(){
//   $ = jQuery.noConflict();
//   wishListShop19 = [];
//   var link = "";
//   var url = "";
//   var prod = "";
//   var image = "";
//   var price = "";
//   var PID = "";
//   var pos = 422;
//   var brand = "";

//   if($('#wishlist-view-form .wishlist-cell0').length > 0) {
//     var slider = $('#wishlist-view-form .wishlist-cell0');
//     var sliderLength = $('#wishlist-view-form .wishlist-cell0').length;

//     for(i=0;i<sliderLength;i++){
//       link = "";
//       url = "";
//       prod = "";
//       image = "";
//       price = "";
//       PID = "";
//       if($('#wishlist-view-form .wishlist-cell0:eq('+ i +')').find('.product-image').length > 0){
//         link = $('#wishlist-view-form .wishlist-cell0:eq('+ i +')').find('.product-image:eq(0)').attr('href');
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
//         if($('#wishlist-view-form .customer-wishlist-item-price:eq('+ i +')').find('.price-box .special-price .price').length > 0){
//           price = $('#wishlist-view-form .customer-wishlist-item-price:eq('+ i +')').find('.price-box:eq(0) .special-price:eq(0) .price:eq(0)').text().trim();
//           price = price.split("₹").join("").trim();
//           price = filter_price(price);
//         }
//         else if($('#wishlist-view-form .customer-wishlist-item-price:eq('+ i +')').find('.price-box .price').length > 0){
//           price = $('#wishlist-view-form .customer-wishlist-item-price:eq('+ i +')').find('.price-box:eq(0) .price:eq(0)').text().trim();
//           price = price.split("₹").join("").trim();
//           price = filter_price(price);
//         }

//       }
//       else{
//         price = "";
//       }
//       if(isNaN(price)){
//         price = "";
//       }

//       if($('#wishlist-view-form .wishlist-cell1:eq('+ i +')').find('.product-name a').length > 0){

//         prod = $('#wishlist-view-form .wishlist-cell1:eq('+ i +')').find('.product-name:eq(0) a:eq(0)').text().trim();
//       }

//       if($('#wishlist-view-form .wishlist-cell0:eq('+ i +')').find('.product-image img').length > 0){
//         image = $('#wishlist-view-form .wishlist-cell0:eq('+ i +')').find('.product-image img:eq(0)').attr('src').trim();
//       }

//       prod = prod.split("'").join("").trim();
//       prod = prod.split('"').join('').trim();
      
//       if(PID != "" && price != ""){
//         wishListShop19.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
//       }
//       // console.log("PID: "+PID);
//       // console.log("prod: "+prod);
//       // console.log("price: "+price);
//       // console.log("image: "+image);
//       // console.log("url: "+url);
//     }

//     // console.log("Wishlist: " + wishListShop19);
//     wishJson = JSON.stringify(wishListShop19);
//     var jsonArr = [{'wishList': wishJson}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 17, alertWLResp, []);  
//     // console.log("WishlistJSON: " + wishJson);
//   }

// }
// function alertWLResp(data){
//   alert(data);
// }

// ///////////// WISH TO WATCH LIST ENDS //////////////  