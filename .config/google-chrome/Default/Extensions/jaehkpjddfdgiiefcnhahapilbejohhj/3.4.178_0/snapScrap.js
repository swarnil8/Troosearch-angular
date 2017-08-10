function brandPull(){
  var brandSelector = document.querySelectorAll('[itemprop=brand]');
  if(brandSelector.length > 0){
    var brand = "";
    var brandText = document.querySelector('[itemprop=brand]').textContent.trim();
    brandSpl = brandText.split("Brand:");
    if(brandSpl.length > 1){
     brand = brandSpl[1].trim();
   }
   else {
     brandSpl = brandText.split(":");
     if(brandSpl.length > 1){
       brand = brandSpl[1].trim();
     }
   }
 }
 else {
  var brand = "";
}


var breadcrumb = getBreadCrumb();
var category = breadcrumb;
category = category.split("*~");
if(category.length > 1){
  category = category[category.length-2];
  category = category.trim();
}
else {
  category = "";
}

if(category.trim()!=""){
  var commonWords = findCommonWord(category, getProd(1), "");
}
else{
  var commonWords = "";
}
if(commonWords.trim()!="" || brand.trim()!=""){
  commonWordsToPass =  commonWords.trim();
  commonWordsToPass = commonWordsToPass.split("**~").join(" ");
  commonWordsToPass = commonWordsToPass.trim();
  var jsonArr = [{'brand': brand.trim(), 'cat':commonWordsToPass.trim()}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 36, doNothing, []);
}
}

brandPull();

$( "style:contains('#hk-killerDIV')" ).remove();


function sendPairs(){
  arrayToSend = [];
  dropToSend = [];

  if($('.similar-widget-wrapper .col-xs-7').length > 0){
    var slider = $('.similar-widget-wrapper .col-xs-7');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('a').length > 0){
        link = $('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link.split("/product/").length < 2){
          link = "";
          if($('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }
        ////console.log(link);
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){
          // if($('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('.product-price').length > 0){

            if($('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('.product-title').length > 0){
              prod = $('.similar-widget-wrapper .col-xs-7:eq('+  i +')').find('.product-title:eq(0)').text().trim();
              if(prod.split("...").length > 1){
                prod = "";
              }
            }
            if($('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('.tileImg').length > 0){
              image = $('.similar-widget-wrapper .col-xs-7:eq('+  i +')').find('.tileImg:eq(0)').attr("src").trim();
              if(image.split("http").length < 2){
                image = "http:"+image;
              }
            }
            if(image.split("default-img").length > 1){
              image = "";
            }
            if(image == "" && $('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('.tileImg').attr("data-src")){
              image = $('.similar-widget-wrapper .col-xs-7:eq('+  i +')').find('.tileImg:eq(0)').attr("data-src").trim();
              if(image.split("http").length < 2){
                image = "http:"+image;
              }
            }
            if(image.split("default-img").length > 1){
              image = "";
            }
            if($('.similar-widget-wrapper .col-xs-7:eq('+ i +')').find('.product-offer-price').length > 0){
              price = $('.similar-widget-wrapper .col-xs-7:eq('+  i +')').find('.product-offer-price:eq(0)').text();
              price = filter_price(price);
            }
            else{
              price = "";
            }

          // }
        }
        else{
          price = "";
        }
      }
      PID = PID.trim();
      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }


    } //for loop ends

  } //1st if ends

  if($('#freq .product_grid_cont').length > 0){
    var slider = $('#freq .product_grid_cont');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('#freq .product_grid_cont:eq('+ i +')').find('a').length > 0){
        link = $('#freq .product_grid_cont:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link.split("/product/").length < 2){
          link = "";
          if($('#freq .product_grid_cont:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('#freq .product_grid_cont:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }
        ////console.log(link);
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){
         if($('#freq .product_grid_cont:eq('+ i +')').find('.product-title').length > 0){
          prod = $('#freq .product_grid_cont:eq('+  i +')').find('.product-title:eq(0)').text().trim();
          if(prod.split("...").length > 1){
            prod = "";
          }
        }
        if($('#freq .product_grid_cont:eq('+ i +')').find('.product-image').length > 0){
          image = $('#freq .product_grid_cont:eq('+  i +')').find('.product-image:eq(0) img:eq(0)').attr("src");
          if(image.split("http").length < 2){
            image = "http:"+image;
          }
        }
        if(image.split("default-img").length > 1){
          image = "";
        }
        if($('#freq .product_grid_cont:eq('+ i +')').find('.product-image').attr("data-src")){
          image = $('#freq .product_grid_cont:eq('+  i +')').find('.product-image:eq(0) img:eq(0)').attr("data-src");
          if(image.split("http").length < 2){
            image = "http:"+image;
          }
        }
        if(image.split("default-img").length > 1){
          image = "";
        }
        if($('#freq .product_grid_cont:eq('+ i +')').find('.product-price.displayPrice').length > 0){
          price = $('#freq .product_grid_cont:eq('+  i +')').find('.product-price.displayPrice:eq(0)').text();
          price = filter_price(price);
        }
        else{
          price = 0;
        }
      }
      else{
        price = "";
      }
    }
    PID = PID.trim();

    if(PID != "" && price != ""){
      arrayToSend.push([PID, price, prod, image, oos]);
      dropToSend.push(PID);
    }


    } //for loop ends

  } //1st if ends

  if($('.recent-viewed-widget-wrapper .recent-viewed-product').length > 0){
    var slider = $('.recent-viewed-widget-wrapper .recent-viewed-product');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('a').length > 0){
        link = $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link.split("void(0)").length > 1){
          link = $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('a:eq(1)').attr('href');

        }

        if(link.split("/product/").length < 2){
          link = "";
          if($('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }

        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){

          if($('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('.bx-caption').length > 0){
            prod = $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+  i +')').find('.bx-caption:eq(0)').text().trim();
            if(prod.split("...").length > 1){
              prod = "";
            }
          }
          if($('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('.recentimg').length > 0){
            image = $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+  i +')').find('.recentimg:eq(0)').attr("src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if(image == "" && $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('.recentimg').attr("data-src")){
            image = $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+  i +')').find('.recentimg:eq(0)').attr("data-src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }

          if($('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+ i +')').find('.recentPrice').length > 0){
            price = $('.recent-viewed-widget-wrapper .recent-viewed-product:eq('+  i +')').find('.recentPrice:eq(0)').text();

            price = filter_price(price);
          }
          else{
            price = "";
          }
        }
        else{
          price = "";
        }
      }
      PID = PID.trim();

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }


    } //for loop ends

  } //1st if ends


  if($('.csf-trending-widget .col-xs-6').length > 0){
    var slider = $('.csf-trending-widget .col-xs-6');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.csf-trending-widget .col-xs-6:eq('+ i +')').find('a').length > 0){
        link = $('.csf-trending-widget .col-xs-6:eq('+ i +')').find('a:eq(0)').attr('href');

        if(link.split("/product/").length < 2){
          link = "";
          if($('.csf-trending-widget .col-xs-6:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('.csf-trending-widget .col-xs-6:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }
        ////console.log(link);
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){
          if($('.csf-trending-widget .col-xs-6:eq('+ i +')').find('.product-title').length > 0){
            prod = $('.csf-trending-widget .col-xs-6:eq('+  i +')').find('.product-title:eq(0)').text().trim();
            if(prod.split("...").length > 1){
              prod = "";
            }
          }
          if($('.csf-trending-widget .col-xs-6:eq('+ i +')').find('.tileImages').length > 0){
            image = $('.csf-trending-widget .col-xs-6:eq('+  i +')').find('.tileImages:eq(0) img:eq(0)').attr("src").trim();
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if(image == "" && $('.csf-trending-widget .col-xs-6:eq('+ i +')').find('.tileImages').attr("data-src")){
            image = $('.csf-trending-widget .col-xs-6:eq('+  i +')').find('.tileImages:eq(0) img:eq(0)').attr("data-src").trim();
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if($('.csf-trending-widget .col-xs-6:eq('+ i +')').find('.product-offer-price').length > 0){
            price = $('.csf-trending-widget .col-xs-6:eq('+  i +')').find('.product-offer-price:eq(0)').text();
            price = filter_price(price);

          }
          else{
            price = "";
          }

        }
        else{
          price = "";
        }
      }
      PID = PID.trim();

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }


    } //for loop ends

  } //1st if ends


  if($('.product_grid_cont').length > 0){
    var slider = $('.product_grid_cont');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";


    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.product_grid_cont:eq('+ i +')').find('a').length > 0){
        link = $('.product_grid_cont:eq('+ i +')').find('a:eq(0)').attr('href');

        if(link.split("/product/").length < 2){
          link = "";
          if($('.product_grid_cont:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('.product_grid_cont:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }
        ////console.log(link);
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){
          if($('.product_grid_cont:eq('+ i +')').find('.product-title').length > 0){
            prod = $('.product_grid_cont:eq('+  i +')').find('.product-title:eq(0)').text().trim();
            if(prod.split("...").length > 1){
              prod = "";
            }
          }
          if($('.product_grid_cont:eq('+ i +')').find('.product-image').length > 0){
            image = $('.product_grid_cont:eq('+  i +')').find('.product-image:eq(0) img:eq(0)').attr("src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if(image == "" && $('.product_grid_cont:eq('+ i +')').find('.product-image').attr("data-src")){
            image = $('.product_grid_cont:eq('+  i +')').find('.product-image:eq(0) img:eq(0)').attr("data-src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if($('.product_grid_cont:eq('+ i +')').find('.product-image.prodSoldout').length > 0){
            oos = 1;
          }
          else{
            oos = 0;
          }

          if($('.product_grid_cont:eq('+ i +')').find('.product-price #price').length > 0){
            price = $('.product_grid_cont:eq('+  i +')').find('.product-price #price').text();
            price = filter_price(price);

          }
          else if($('.product_grid_cont:eq('+ i +')').find('.product-price p').length > 0){
            price = $('.product_grid_cont:eq('+  i +')').find('.product-price p:eq(0)').text();
            if(price.split("Rs").length > 1){
              price = price.split("Rs");
              price = price[1];
            }
          }
          else{
            price = "";
          }

        }
        else{
          price = "";
        }
      }
      PID = PID.trim();

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }


    } //for loop ends

  } //1st if ends

  if($('.product-tuple-listing').length > 0){
    var slider = $('.product-tuple-listing');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";


    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.product-tuple-listing:eq('+ i +')').find('a').length > 0){
        link = $('.product-tuple-listing:eq('+ i +')').find('a:eq(0)').attr('href');

        if(link.split("/product/").length < 2){
          link = "";
          if($('.product-tuple-listing:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('.product-tuple-listing:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }
        ////console.log(link);
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){
          if($('.product-tuple-listing:eq('+ i +')').find('.product-title').length > 0){
            prod = $('.product-tuple-listing:eq('+  i +')').find('.product-title:eq(0)').text().trim();
            if(prod.split("...").length > 1){
              prod = "";
            }
          }

          if($('.product-tuple-listing:eq('+ i +')').find('.product-image').attr("data-src")){
            image = $('.product-tuple-listing:eq('+  i +')').find('.product-image:eq(0)').attr("data-src");
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if(image == "" && $('.product-tuple-listing:eq('+ i +')').find('.product-image').attr("src")){
            image = $('.product-tuple-listing:eq('+  i +')').find('.product-image:eq(0)').attr("src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if(image == "" && $('.product-tuple-listing:eq('+ i +')').find('.compareImg').attr("value")){
            image = $('.product-tuple-listing:eq('+  i +')').find('.compareImg:eq(0)').attr("value");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          // if($('.product-tuple-listing:eq('+ i +')').find('.product-image.prodSoldout').length > 0){
          //   oos = 1;
          // }
          // else{
          //   oos = 0;
          // }

          if($('.product-tuple-listing:eq('+ i +')').find('.product-price').length > 0){
            price = $('.product-tuple-listing:eq('+  i +')').find('.product-price').text();
            price = filter_price(price);

          }
          else{
            price = "";
          }

        }
        else{
          price = "";
        }
      }
      PID = PID.trim();


      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }


    } //for loop ends

  } //1st if ends


  if($('.hp-product-carousel-wrapper li').length > 0){
    var slider = $('.hp-product-carousel-wrapper li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";


    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.hp-product-carousel-wrapper li:eq('+ i +')').find('a').length > 0){
        link = $(',:eq('+ i +')').find('a:eq(0)').attr('href');

        if(link.split("/product/").length < 2){
          link = "";
          if($('.hp-product-carousel-wrapper li:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('.hp-product-carousel-wrapper li:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }
        ////console.log(link);
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){
          if($('.hp-product-carousel-wrapper li:eq('+ i +')').find('.bx-caption-title').length > 0){
            prod = $('.hp-product-carousel-wrapper li:eq('+  i +')').find('.bx-caption-title:eq(0)').text().trim();
            if(prod.split("...").length > 1){
              prod = "";
            }
          }
          if($('.hp-product-carousel-wrapper li:eq('+ i +')').find('.bx-img').length > 0){
            image = $('.hp-product-carousel-wrapper li:eq('+  i +')').find('.bx-img:eq(0) img:eq(0)').attr("data-src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if(image == "" && $('.hp-product-carousel-wrapper li:eq('+ i +')').find('.bx-img').attr("src")){
            image = $('.hp-product-carousel-wrapper li:eq('+  i +')').find('.bx-img:eq(0) img:eq(0)').attr("src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if($('.hp-product-carousel-wrapper li:eq('+ i +')').find('.recentPrice').length > 0){
            price = $('.hp-product-carousel-wrapper li:eq('+  i +')').find('.recentPrice').text();
            price = filter_price(price);
          }
        }
        else{
          price = "";
        }
      }
      PID = PID.trim();

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }


    } //for loop ends

  } //1st if ends

  if($('.product-relative').length > 0){
    var slider = $('.product-relative');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var oos = 0; // no info abt oos
    var image = "";
    var prod = "";


    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      prod = "";
      image = "";
      oos = 0;
      if($('.product-relative:eq('+ i +')').find('a').length > 0){
        link = $('.product-relative:eq('+ i +')').find('a:eq(0)').attr('href');

        if(link.split("/product/").length < 2){
          link = "";
          if($('.product-relative:eq('+ i +')').find('a:eq(0)').attr("pog")){
            PID = $('.product-relative:eq('+ i +')').find('a:eq(0)').attr("pog").trim();
          }
        }
        ////console.log(link);
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if(PID != parseInt(PID)){
            PID = "";
          }
        }


        if(PID != ""){
          if($('.product-relative:eq('+ i +')').find('.product_name').length > 0){
            prod = $('.product-relative:eq('+  i +')').find('.product_name:eq(0)').text().trim();
            if(prod.split("...").length > 1){
              prod = "";
            }
          }
          if($('.product-relative:eq('+ i +')').find('.product-img img').attr("data-src")){
            image = $('.product-relative:eq('+  i +')').find('.product-img:eq(0) img:eq(0)').attr("data-src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if(image == "" && $('.product-relative:eq('+ i +')').find('.product-img img').attr("src")){
            image = $('.product-relative:eq('+  i +')').find('.product-img:eq(0) img:eq(0)').attr("src");
            if(image.split("http").length < 2){
              image = "http:"+image;
            }
          }
          if(image.split("default-img").length > 1){
            image = "";
          }
          if($('.product-relative:eq('+ i +')').find('.product_price .mrp').length > 0){
            price = $('.product-relative:eq('+  i +')').find('.product_price .mrp:eq(0)').text();
            price = filter_price(price);
          }
        }
        else{
          price = "";
        }
      }
      PID = PID.trim();

      if(PID != "" && price != ""){
        arrayToSend.push([PID, price, prod, image, oos]);
        dropToSend.push(PID);
      }


    } //for loop ends

  } //1st if ends
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsSnap': arrayToSend}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
  if(dropToSend.length > 0){
    dropToSend = JSON.stringify(dropToSend);
    var jsonArr = [{'pids': dropToSend, 'pos': 129}];
    jsonArr = JSON.stringify(jsonArr);
    var passBack = ['.similar-widget-wrapper .col-xs-7', '#freq .product_grid_cont', '.recent-viewed-widget-wrapper .recent-viewed-product', '.csf-trending-widget .col-xs-6', '.product_grid_cont', '.product-tuple-listing', '.hp-product-carousel-wrapper li', '.product-relative'];
    sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);
  }
 // //console.log(arrayToSend);
}


function getDetails(url){
  finalJSON = {};
      // var specialPat = /[^a-z0-9]+$/gi;
      var prodName = getProd();
      if(prodName ==""){
       setTimeout(getDetails, 100);
       return;
     }
     else {


       var filters = getSpecs();
         // console.log(filters);

         var prodName = getProd();
         lastProd = prodName;
         var myPrice = getPrice();

         finalJSON["category"] = 0;
         finalJSON["filters"] = filters;
         finalJSON["filteredName"]  = prodName;
         finalJSON["prodName"] = prodName;
         finalJSON["price"] = myPrice;
         finalJSON["image"] = getImageJson();


         var finalJSONTemp = JSON.stringify(finalJSON);
         msgToSend = finalJSONTemp;
         sendSearchMessageNew(msgToSend, 1, url);

       }
     }
     function getSpecs()
     {

       var ourAtts = [];
       ourAtts["model number"] = "model";
      // ourAtts["part number"] = "serialno";
      ourAtts["processor name"] = "processor";
      ourAtts["ram"] = "ram";
      ourAtts["operating system"] = "os";
      ourAtts["hard disk capacity"] = "hdd";
      ourAtts["series"] = "lapseries";
      ourAtts["generation"] = "generation";
      // ourAtts["model name"] = "modelname";

      ourAtts["brand"] = "brand";
      ourAtts["ssd capacity"] = "ssd";
      ourAtts["emmc capacity"] = "emmc";
      ourAtts["dedicated graphics memory capacity"] = "gCard";
      ourAtts["dedicated graphics capacity"] = "gCard";
      ourAtts["weight"] = "weight";
      ourAtts["storage type"] = "hdt";
      ourAtts["screen size"] = "inch";

      ourAtts["type"] = "type";
      ourAtts["touch screen"] = "touchscreen";

      var attributeVal ={};
      var attributes = [];
      var attrVal = "";
      var prodName = getProd();
      for(var attribute in ourAtts)
      {
        if(!attributeVal[attribute])
        {
          // console.log("attribute = "+attribute);
          attrVal = pickValue(attribute);
          // console.log("VALUE = "+attrVal);
          if(attribute=="model number"){
           if(attrVal.split("(").length > 1){
             var partNum = attrVal.split("(");
             attrVal = partNum[0];
             partNum = partNum[1];
             partNum = partNum.split(")");
             partNum = partNum[0];
             partNum = partNum.trim();
             attributeVal['serialno'] = partNum;
           }
           if(attrVal.split("[").length > 1){
             var partNum = attrVal.split("[");
             attrVal = partNum[0];
             partNum = partNum[1];
             partNum = partNum.split("]");
             partNum = partNum[0];
             partNum = partNum.trim();
             attributeVal['serialno'] = partNum;
           }
         }
         if(attrVal!="")
         {

          var key  = ourAtts[attribute];
          attributeVal[key] = attrVal;

        }
      }
      // else
      // {
      //     console.log("already visited value = "+attributeVal[attribute]);
      // }

    }

    for(var k in ourAtts){
          var key  = ourAtts[k];
          if(!attributeVal[key])
          {
            if(key == "touchscreen")
            {
                if(prodName.toLowerCase().split("touchscreen").length > 1 || prodName.toLowerCase().split("touch screen").length > 1)
                {
                    attributeVal[key] = "yes";
                }
                else
                {
                   attributeVal[key] = "";
                }
            }
            else
            {
              attributeVal[key] = "";

            }
          }
      }


    attributeVal["pid"] = getPID();
    attributeVal["updated"] = "1";
    // attributeVal = JSON.stringify(attributeVal);



    // return attributeVal;

      // console.log("attributeVal");
      // av = JSON.stringify(attributeVal);
      // console.log(av);
    
      var newAttributes = findMemory(prodName);
      // console.log("newAttributes ");
      // console.log(newAttributes);
      var finalAttr = findFinalAttr(attributeVal,newAttributes,prodName);

     finalAttr = JSON.stringify(finalAttr);
     
     console.log("finalAttr");
     console.log(finalAttr);

     return finalAttr;
  }


 function findFinalAttr(attributes,newAttributes,prodName)
   {
     // console.log("am here in findFinalAttr fun");
     newAttributes = JSON.parse(newAttributes);
      for(var arow in attributes)
      {
  
         // aValue = "";
         // if(attributes[arow])
         // {
              aValue = attributes[arow];
         // }
         
         if(arow=="generation" && aValue=="")
         {
            if(attributes["processor"]!="")
            {
                 var temp = attributes["processor"];
                 var regex = /[^0-9A-Z]+([0-9]+[^0-9A-Z]*(th|nd|rd|st)[^0-9A-Z]*(generation|gen))[^0-9A-Z]+/ig;
                 var matches = regex.exec(temp);
                 if(matches)
                  {
                    gen = matches[1];
                    attributes["generation"]= gen;
                  }
                  else
                  {
                      var regex = /[^0-9A-Z]+([0-9]+[^0-9A-Z]*(th|nd|rd|st)[^0-9A-Z]*(generation|gen))[^0-9A-Z]+/ig;
                      var matches = regex.exec(prodName);
                      if(matches)
                      {
                        gen = matches[1];
                        attributes["generation"]= gen;
                      }
                  }
            }
            else  //getitfrom name
            {
                     var regex = /[^0-9A-Z]+([0-9]+[^0-9A-Z]*(th|nd|rd|st)[^0-9A-Z]*(generation|gen))[^0-9A-Z]+/ig;
                      var matches = regex.exec(prodName);
                      if(matches)
                      {
                        gen = matches[1];
                        attributes["generation"]= gen;
                      }
            }

         }

         if(aValue.trim()=="")
         {
              if(newAttributes[arow])
              {
                  var defaultVal  = newAttributes["defaultVal"];
                  if(defaultVal==1 && attributes["ssd"]!="" && arow=="hdd")
                  {

                  }
                  else
                  {
                    aValue = newAttributes[arow];
                    attributes[arow] = aValue;

                  }

                  
              }
              continue;
         }
         else if(arow=="hdd" || arow == "emmc")
         {
              avalueTemp = aValue.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*GB[^0-9A-Z]*/gi,' $1gb ');
              avalueTemp = avalueTemp.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*TB[^0-9A-Z]*/gi,' $1tb ');
              avalueTemp = avalueTemp.trim();
              if(newAttributes[arow])
              {
                  anValue = newAttributes[arow];
                 
                  if(anValue.trim()==avalueTemp)
                  {
                      continue;
                  }
                  else
                  {
                      var hddValue = newAttributes["hdd"];
                      var ssdValue = newAttributes["ssd"];
                      var emmcValue = newAttributes["emmc"];
                      // var defaultVal = newAttributes["defaultVal"];
                      if(avalueTemp==hddValue.trim())
                      {

                         attributes[arow] = "";
                          attributes["hdd"] = avalueTemp;
                      }
                      else if(avalueTemp==ssdValue.trim())
                      {
                          attributes[arow] = "";
                          attributes["ssd"] = avalueTemp;
                      }
                      else if(avalueTemp==emmcValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["emmc"] = avalueTemp;
                      }

                  }
                  
              }
              else
                  {
                      hddValue = newAttributes["hdd"];
                      ssdValue = newAttributes["ssd"];
                      emmcValue = newAttributes["emmc"];
                      if(avalueTemp==hddValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["hdd"] = avalueTemp;
                      }
                      else if(avalueTemp==ssdValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["ssd"] = avalueTemp;
                      }
                      else if(avalueTemp==emmcValue.trim())
                      {
                         attributes[arow] = "";
                          attributes["emmc"] = avalueTemp;
                      }
                  }
         }
         if(arow=="hdd" || arow == "emmc" || arow=="gCard" || arow == "ssd" || arow=="ram")
         {
            if(aValue.toLowerCase().split("tb").length > 1 || aValue.toLowerCase().split("gb").length > 1 || aValue.toLowerCase().split("mb").length > 1)
            {

            }
            else if(aValue.toLowerCase().split("integrat").length > 1)
            {

            }
            else if(newAttributes[arow].trim()!="")
            {
              anValue = newAttributes[arow];
              attributes[arow] = anValue;
            }
            else
            {   ///keep units
                if(arow == "ram")
                {
                    var ramValue = parseFloat(aValue.trim());
                    if(ramValue <= 64)
                    {
                        ramValue=ramValue+"gb";
                    }
                    else
                    {
                        ramValue=ramValue+"mb";
                    }
                    attributes[arow] = ramValue;
                }
                else if(arow == "gCard")
                {
                    var gcardValue = parseFloat(aValue.trim());
                    if(gcardValue <= 64)
                    {
                        gcardValue=gcardValue+"gb";
                    }
                    else
                    {
                        gcardValue=gcardValue+"mb";
                    }
                    attributes["gCard"] = gcardValue;
                }

            }

         }
          
      }
      // console.log(attributes);
      // console.log("-------------------");
      return attributes;
   }
   function findMemory(prodName)
   {
      prodName = prodName.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*GB[^0-9A-Z]*/gi,' $1gb ');
      prodName = prodName.replace(/[^0-9A-Z]*([0-9]+)[^0-9A-Za-z]*TB[^0-9A-Z]*/gi,' $1tb ');
      prodName = prodName.toLowerCase();
      var ramMem = "";var hddMem = "";var grapMem = "";var emmcMem = "";var ssdMem="";var ntrgrap="";var ntrhdd="";var ntrssd="";var ntremmc="";
      var memory = [];var ram = 0; var hdd = 0; var emmc = 0;var graphics = 0; var ssd = 0;var defaultVal = 0;
      var allMemories = {};
      // if(count(explode('ram',strtolower($searchRes))) > 1)
      if(prodName.split("ram").length > 1)
      {
          var regex  = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(ram)/gi;
          matches = regex.exec(prodName);
          if(matches)
          {
             ramMem = matches[1];
             ram = 1;
          }
          
      }

      if(prodName.split("hdd").length > 1)
      {
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(hdd)/i',$searchRes, $matches);
          var regex  = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(hdd)/gi;
          matches = regex.exec(prodName);
          if(matches)
          {

                  ntrhdd = matches[0];
                  hddMem = matches[1];
                  if(ntrhdd!="")
                  {
                    prodName = prodName.split(ntrhdd).join(" ");

                  }
                  // $searchResTemp = explode($ntrhdd,$searchRes);
                  // $searchRes = implode('  ',$searchResTemp);
                  hdd = 1;
          }
       

      }

      if(prodName.split("ssd").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(ssd)/ig;
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(ssd)/i',$searchRes, $matches);

          matches = regex.exec(prodName);
          if(matches)
          {
              ntrssd = matches[0];
              ssdMem = matches[1];

              // console.log("prodName in ssd = "+prodName);
              if(ntrssd!="")
              {
                 prodName = prodName.split(ntrssd).join(" ");
              }
             
              ssd = 1;
          }
         
      }
 
      if(prodName.split("emmc").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(emmc)/ig;
          matches = regex.exec(prodName);
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(emmc)/i',$searchRes, $matches);
          if(matches)
          {
                ntremmc = matches[0];
                emmcMem = matches[1];
                if(ntremmc.trim()!="")
                {
                    prodName = prodName.split(ntremmc).join(" ");
                }
              
                emmc = 1;

          }
         
      }

      if(prodName.split("amd graphics").length > 1 || prodName.split("graphics").length > 1 || prodName.split("grap").length > 1 || prodName.split("graphic").length > 1 || prodName.split("gfx").length > 1 || prodName.split("grafix").length > 1)
  
      {
      if(prodName.split("amd graphics").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(amd graphics)/ig;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1; 
          }
          // else if(count(explode('integrated',strtolower($searchRes)))>1)
          else if(prodName.split("integrated").length > 1)
          {
                ntrgrap = "integrated graphics";
                grapMem = "integrated graphics";
                graphics = 1;
          }
        
      }
      else if(prodName.split("graphics").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(graphics)/ig;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1; 
          }
          // else if(count(explode('integrated',strtolower($searchRes)))>1)
          else if(prodName.split("integrated").length > 1)
          {
                ntrgrap = "integrated graphics";
                grapMem = "integrated graphics";
                graphics = 1;
          }
        
      }
      else if(prodName.split("graphic").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(graphic)/i;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1; 
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated graphic";
                graphics = 1;
          }
        
      }
      else  if(prodName.split("grap").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(grap)/i;
          matches = regex.exec(prodName);
          if(matches)
          {
                ntrgrap = matches[0];
                grapMem = matches[1];
                graphics = 1; 
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated grap";
                graphics = 1;
          }
        
      }
      else if(prodName.split("gfx").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(gfx)/ig;
          matches = regex.exec(prodName);
          if(matches)
          {
          // preg_match('/[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(gfx)/i',$searchRes, $matches);
          ntrgrap = matches[0];
          grapMem = matches[1];
          graphics = 1;
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated gfx";
                graphics = 1;
          }
      }
      else if(prodName.split("grafix").length > 1)
      {
          var regex = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*(grafix)/i;
          matches = regex.exec(prodName);
          if(matches)
          {
            ntrgrap = matches[0];
            grapMem = matches[1];
            graphics = 1;
          }
          else if(prodName.split("integrated").length > 1)
          {
                grapMem = "integrated graphics";
                ntrgrap = "integrated grafix";
                graphics = 1;
          }
          
      }

      if(ntrgrap.trim()!="" && prodName.split(ntrgrap.toLowerCase()).length > 1)
      {
         // console.log("prodNAme in split = "+prodName);
         //  console.log("ntrgrap = "+ntrgrap);
          var regEx = new RegExp(ntrgrap, "ig");
          // console.log("regEx"+regEx);
          prodName = prodName.replace(regEx, ' ');
          // console.log("prodName in split ="+prodName);
      }
     

      }


      if(hdd == 0 || ssd == 0 || emmc == 0 || ram == 0)
      {
      // console.log(prodName);
      var reqEx = /[^A-Z0-9]*([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]*/ig;
      matches = prodName.match(reqEx);
      // matches = reqEx.exec(prodName);
      if(matches)
      {
         var allMem = matches;

          // $allMem = $matches[1];
          // console.log(allMem);
          for(var i=0;i< allMem.length;i++)
          {
              if(allMem[i].split("tb").length > 1)
              {
                  var temp = allMem[i].trim();
                  temp = parseFloat(temp);
                  var st = temp*1024;
              }
              else
              {
                  temp = allMem[i].trim();
                  var st = parseFloat(temp);
             
              }
              memory[allMem[i].trim()] = st;

          }
      }
      // preg_match_all('/[^A-Z0-9]+?([0-9.]+[^0-9A-Z]*(gb|tb))[^A-Z0-9]+?/i',$searchRes, $matches);
      
      }

 

        //sort it by value

        memory.reverse();
        min = 10000;max = -1;minMem = "";maxMem = "";min2 = 10000;minMem2 = "";
        for(key in memory) 
        { 
            value = memory[key];
            if(hddMem=="")
            {
              if(value >= 32)
              {
                    hddMem = key;
                    hdd = 1;
                    defaultVal = 1;
                    continue; 
              }
             
            }
            if(ramMem == "")
            {
                if(value >= 1 && value < 32)
                {
                    ramMem = key;
                    ram = 1;
                    continue;
                }
                
            }

        }

         // return ramMem+"~*~"+hddMem+"~*~"+prodName+"~*~"+grapMem+"~*~"+emmcMem+"~*~"+ssdMem+"~*~"+defaultVal;
         allMemories["ram"] = ramMem;
         allMemories["hdd"] = hddMem;
         allMemories["gCard"] = grapMem;
         allMemories['emmc'] = emmcMem;
         allMemories['ssd'] = ssdMem;
         allMemories['defaultVal'] = defaultVal;
         allMemories = JSON.stringify(allMemories);
         return allMemories;
   }

  function pickValue(attrName)
  {

    var myVar = $(".detailssubbox").html();
    var len = $(myVar).find(".product-spec").length;

    for(i=0;i<len;i++){

      tab = $(myVar).find('.product-spec').eq(i);

      len1 = $(tab).find('tr').length;

      for(j=1;j<len1;j++)
      {
        key = $(tab).find('tr').eq(j).find('td').eq(0).text();
       
        if(key.toLowerCase().indexOf(attrName) >= 0)
        {
          // console.log("key = "+key);
          value = $(tab).find('tr').eq(j).find('td').eq(1).text();
          // console.log("value = "+value);
          if(attrName == "touch screen")
          {
              return value;
          }
          if(value.toLowerCase().trim() == "no" || value.toLowerCase().trim()=="na" || value.toLowerCase().trim()=="not applicable")
          {
            return "";
          }
          value = " "+value+" ";
          // console.log("attrname " + attrName);
          if(attrName.trim()=="model number"){
            return value.trim();
          }
          if(attrName=="type")
          {
              if(value.toLowerCase().split("2 in 1").length > 1)
              {
                  value = "2 in 1 Laptop";
              }
          }
          value = value.replace(/wi-fi/ig," ");
          value = value.replace(/wifi/ig," ");
          value = value.replace(/ wi fi /ig," ");
                   // value = value.replace(/[^0-9A-Z]3g[^0-9A-Z]/ig," ");
                   value = value.replace(/([^0-9A-Z])3g([^0-9A-Z])/ig,"$1 $2");
                   // value = value.replace(/ 4g /ig," ");
                   value = value.replace(/([^0-9A-Z])4g([^0-9A-Z])/ig,"$1 $2");
                   // value = value.replace(spclSymbols," ");
                   value = value.replace(/\s\s+/g,' ');
                   value = value.replace(/[^0-9.A-Z\-\/\s]/gi,' ');
                   value = value.trim();
                   return value;
                 }

               }
             }

             return "";

           }


           function sendCurrent(){

            curData = [];
            var prod = "";
            var image = "";
            var myPrice = "";
            var cur_url = "";
            var link = "";
            var current_status = 0;
            var PID = "";

            var breadcrumb_str = getBreadCrumb();
            prod = getProd();

            if(getAvailability() == 1){
              current_status = 0;
            }
            else if(getAvailability() == 0){
              current_status = 1;
            }
            else if(getAvailability() == -1){
              current_status = 2;
            }

            myPrice = getPrice();
            image = getImage();


            link = window.location.href;
            PID = returnPID(link);
            cur_url = window.location.href;

            if(PID!= "" && PID!=parseFloat(PID)){
              PID = "";
            }
            cur_url = window.location.href;
            if(PID!=""){
              var a = $('body').text();
              if(a.split("ISBN-13:").length>1){
                isbn = parseInt(a.split("ISBN-13:")[1].trim());
                console.log("isbn: "+isbn);
              }
              else if(a.split("ISBN13:").length>1){
                isbn = parseInt(a.split("ISBN13:")[1].trim());
              }
              else {
                isbn = false;
              }

              if(isbn && isValidISBN(isbn.toString()) && prod.trim() != ""){
                prod = prod + " " + isbn.toString();
              }
              curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
              curData = JSON.stringify(curData);
              var jsonArr = [{'curDataSnap': curData}];
              jsonArr = JSON.stringify(jsonArr);
              if( ($('.pdpPage').length>0) || ($('.product-detail').length>0) || ($('[itemtype="http://schema.org/Product"]').length > 0) && ($("#categoryTopSection").length == 0) || (cur_url.split("/product/").length > 1)){
                sendMessage(0, jsonArr, 0, doNothing, []);
              }
            }
          }

          var pollInterval = 1000 * 15;
          window.setTimeout(sendCurrent, 5000);
          window.setTimeout(sendPairs, 5000);
          window.setTimeout(sendPairs, pollInterval);


//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = "";

if($('#pdp').length > 0){
  check_prod_pg = 1; //product page
}
else{
  check_prod_pg = 0;
}


function getProd(){
  var prod = "";

  if($('.pdpName').length > 0){
    if($('.pdpName').find('h1').length > 0){
      prod = $('.pdpName').find('h1').text().trim();
    }
    else if($('.pdpName').find('p').length > 0){
      prod = $('.pdpName').find('p').text().trim();
    }

  }
  if(prod == "") {
    if($('.comp-product-description').find('h1').length > 0){
      prod = $('.comp-product-description').find('h1:eq(0)').text().trim();
    }
    else{
      prod = $('h1:eq(0)').text().trim();
    }
  }

  // //console.log("prod: "+prod);
  if( ($('.pdpPage').length>0) || ($('.product-detail').length>0) || ($('[itemtype="http://schema.org/Product"]').length > 0) && ($("#categoryTopSection").length == 0)){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.image_gallery li').length > 0){
    image = $('.image_gallery li').eq(1).find('img').attr('src');
  }
  else if($('img[itemprop="image"]').length > 0)
  {
    image = $('img[itemprop="image"]').attr('src');
  }
  else if($(".zoomPad").length >0 )
  {
    image = $(".zoomPad").attr("src");
  }
  else if($("#panel_img_1").length > 0)
  {
    image = $("#panel_img_1").attr("src");
  }

  // //console.log("image: "+image);
  return image;
}

function getImageJson()
{
    var images = [];k=0;
    var allImages = document.getElementById('bx-slider-left-image-panel');
    var lis = allImages.getElementsByTagName("li");
    for(var i =0;i<lis.length;i++)
    {
         images[k++] = lis[i].getElementsByTagName("img")[0].getAttribute("src");
    }
    images = JSON.stringify(images);
    return images;
}
function getPrice(){
  price = "0";
  if($("#selling-price-id").length > 0){
    price = $("#selling-price-id").text().trim();
  }
  else if($(".selling-price").length > 0)
  {
    price = $(".selling-price .pdp_newprice").text().trim();

  }
  else if($("#mrp").length > 0)
  {
    price = $("#mrp").text().trim();

  }
  else if ($("#mvfrstVisible").length > 0) {
    price = $("#mvfrstVisible .redText:eq(0)").text().trim();
  }
  else if ($('[itemprop="price"]').length > 0) {
    price = $('[itemprop="price"]:eq(0)').text().trim();
  }
  price = filter_price(price);
  if(isNaN(price) == true){
    price = "0";
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.soldDiscontAlert').length > 0){
    avail = -1;
  }
  else if($('.noLongerProduct').length > 0){
    avail = 0;
  }
  else if($('.notifyMe-soldout').length > 0){
    avail = 0;
  }
  if($('.product-detail .discontImage').length > 0){
    avail = -1; //discontinued
  }
  if($('#internal-content').length > 0 && $('#internal-content').text().toUpperCase().split("LOST YOUR WAY").length > 1){
    avail = -1; //discontinued
  }

  return avail;

}
function getPID(){

  var link = window.location.href;
  var pid = link;

  if(pid.split("/product/").length > 1){
    pid = pid.split("/product/");
    pid = pid[1];

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
      pid = pid.split("/");
      pid = pid[pid.length - 1];
    }
    pid = pid.trim();
  }
  else{
    pid = "";
  }


  return pid;
}

function returnPID(link){

  var pid = link;
  if(pid.split("/product/").length > 1){
    pid = pid.split("/product/");
    pid = pid[1];
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
      pid = pid.split("/");
      pid = pid[pid.length - 1];
    }
    pid = pid.trim();
    if(link.split('snapdeal.com').length < 2){
      pid = "";
    }
  }
  else{
    pid = "";
  }
  if(link == ""){
    pid = "";
  }
  return pid;
}

function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  var len_bread = $('#breadCrumbWrapper').find('[itemprop="title"]').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('#breadCrumbWrapper').find('[itemprop="title"]:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }
  if(bread_final.split("Search:").length > 1){
    bread_final = "";
  }
  return bread_final;


}



function getModel(){
  var model = "";
  if($(".product-spec").length > 0){
    var spec_len = $(".product-spec").length;
    for(var i=0;i<spec_len;i++){
      if($(".product-spec:eq("+i+") tr:eq(0)").text().trim().toUpperCase() == "GENERAL"){
        var key_len = $(".product-spec:eq("+i+") tr").length;

        for(var j=1;j<key_len;j++){
          if($(".product-spec:eq("+i+") tr:eq("+j+") td:eq(0)").text().trim().toUpperCase() == "MODEL"){
            var model = $(".product-spec:eq("+i+") tr:eq("+j+") td:eq(1)").text().trim();
          }
        }
        break;
      }
    }
  }
  return model;
}

function getColor(){
  var color = "";
  if($(".product-spec").length > 0){
    var spec_len = $(".product-spec").length;
    for(var i=0;i<spec_len;i++){
      if($(".product-spec:eq("+i+") tr:eq(0)").text().trim().toUpperCase() == "GENERAL"){
        var key_len = $(".product-spec:eq("+i+") tr").length;

        for(var j=1;j<key_len;j++){
          if($(".product-spec:eq("+i+") tr:eq("+j+") td:eq(0)").text().trim().toUpperCase() == "COLOUR"){
            var color = $(".product-spec:eq("+i+") tr:eq("+j+") td:eq(1)").text().trim();
          }
        }
        break;
      }
    }
  }
  if(color == ""){
    if($(".colorMenu li").length > 0){
      var col_len = $(".colorMenu li").length;
      for(var c=0;c<col_len;c++){
        if($(".colorMenu li:eq("+c+")").attr("attrid").length > 0){
          color += $(".colorMenu li:eq("+c+")").attr("attrid") + "/";
        }
        else if($(".colorMenu li:eq("+c+")").attr("data-val").length > 0){
          color += $(".colorMenu li:eq("+c+")").attr("data-val") + "/";
        }
      }
    }
  }
  return color;
}

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

function getIntStorage(){
  var intMem = "";
  if($(".product-spec").length > 0){
    var spec_len = $(".product-spec").length;
    for(var i=0;i<spec_len;i++){
      if($(".product-spec:eq("+i+") tr:eq(0)").text().trim().toUpperCase() == "MEMORY & STORAGE"){
        var key_len = $(".product-spec:eq("+i+") tr").length;

        for(var j=1;j<key_len;j++){
          if($(".product-spec:eq("+i+") tr:eq("+j+") td:eq(0)").text().trim().toUpperCase() == "INTERNAL MEMORY"){
            var intMem = $(".product-spec:eq("+i+") tr:eq("+j+") td:eq(1)").text().trim();
          }
        }
        break;
      }
    }
  }
  return intMem;
}

function sendMobile(){
  var breadCrumb = getBreadCrumb();
  // console.log("getBreadCrumb: " + breadCrumb);
  if(breadCrumb.split("*~").length > 1 && breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILE PHONES" && getProd() != ""){
    var PID = getPID();
    var pos = 129;
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

function sendCoupon(){
  couponToSend = [];
  var cur_link = window.location.href;
  var couponUrl = "";
  var couponCode = "";
  var couponText = "";
  var couponDesc = "";
  var couponExp = 0;
  var couponAt = 129;
  couponUrl = "http://www.snapdeal.com/";
  couponCode = "";
  couponText = "";
  couponDesc = "";
  last_bread = 0;
  slider = $("#offersWrap").find(".offer-data");
  sliderLength = slider.length;

  for(i=0;i<sliderLength;i++){
    couponUrl = "http://www.snapdeal.com/";
    couponCode = "";
    couponText = "";
    couponDesc = "";
    couponExp = 0;
    bread_link = "";

    couponText1 = $("#offersWrap .offer-data:eq("+i+")").find(".inner-box:eq(0)").text().trim();
    couponText = couponText1+" - "+$("#offersWrap .offer-data:eq("+i+")").find(".offer-title:eq(0)").text().trim();
    // couponText = couponText.split("<");
    // couponText = couponText[0].trim();

    couponCode = "NO CODE REQUIRED";
    cp = "";
    // console.log("couponText: "+couponText);

    if(couponText.toUpperCase().split("USING ").length > 1 && (couponText.toUpperCase().split("BANK").length < 2 || couponText.toUpperCase().split("CARD").length < 2) ){
      cp = couponText.toUpperCase().split("USING ");
      cp = cp[1];
      // console.log("cp: "+cp);
      if(cp.split(" ").length > 1){
        cp = cp.split(" ");
        cp = cp[0].trim();
      }
      else if(cp.split(",").length > 1){
        cp = cp.split(",");
        cp = cp[0].trim();
      }
      else if(cp.split(".").length > 1){
        cp = cp.split(".");
        cp = cp[0].trim();
      }
      couponCode = cp;

      if($("#breadCrumbWrapper .bCrumbOmniTrack").length > 0){
        last_bread = $("#breadCrumbWrapper .bCrumbOmniTrack").length - 1;
        bread_link = $("#breadCrumbWrapper").find(".bCrumbOmniTrack:eq("+last_bread+")").attr("href")+"?sort=bstslr";
        couponUrl = bread_link;

        if(couponUrl.split(".com").length < 2){
          couponUrl = "http://www.snapdeal.com"+couponUrl;
        }
      }

    }

    // else if(couponText.toUpperCase().split("COUPON").length > 1){
    //   cp = couponText.toUpperCase().split("COUPON")[1];
    //   if(cp.split(" ").length > 1){
    //     cp = cp.split(" ")[0].trim();
    //   }
    //   else if(cp.split(",").length > 1){
    //     cp = cp.split(",")[0].trim();
    //   }
    //   else if(cp.split(".").length > 1){
    //     cp = cp.split(".")[0].trim();
    //   }
    // }
    // else if(couponText.toUpperCase().split("CART").length > 1){
    //   cp = couponText.toUpperCase().split("CART")[1];
    //   if(cp.split(" ").length > 1){
    //     cp = cp.split(" ")[0].trim();
    //   }
    //   else if(cp.split(",").length > 1){
    //     cp = cp.split(",")[0].trim();
    //   }
    //   else if(cp.split(".").length > 1){
    //     cp = cp.split(".")[0].trim();
    //   }
    //   couponCode = cp;

    // }

    // else if(couponText.toUpperCase().split("EXTRA").length > 1){
    //   cp = couponText.toUpperCase().split("EXTRA")[1];
    //   if(cp.split(" ").length > 1){
    //     cp = cp.split(" ")[0].trim();
    //   }
    //   else if(cp.split(",").length > 1){
    //     cp = cp.split(",")[0].trim();
    //   }
    //   else if(cp.split(".").length > 1){
    //     cp = cp.split(".")[0].trim();
    //   }
    //   couponCode = cp;

    // }

    else if( couponText.toUpperCase().split("PRICE IN CART").length > 1 || couponText.toUpperCase().split("PRICE ON CART").length > 1 || couponText.toUpperCase().split("PRICES IN CART").length > 1 || couponText.toUpperCase().split("PRICES ON CART").length > 1 || couponText.toUpperCase().split("EXTRA").length > 1){

      couponCode = couponText1;
      if($("#breadCrumbWrapper .bCrumbOmniTrack").length > 0){
        last_bread = $("#breadCrumbWrapper .bCrumbOmniTrack").length - 1;
        bread_link = $("#breadCrumbWrapper").find(".bCrumbOmniTrack:eq("+last_bread+")").attr("href")+"?sort=bstslr";
        couponUrl = bread_link;

        if(couponUrl.split(".com").length < 2){
          couponUrl = "http://www.snapdeal.com"+couponUrl;
        }
      }
    }
    else{
      couponCode = "NO CODE REQUIRED";
    }
    if(couponText.toUpperCase().split("(NO").length > 1){
      couponText = couponText.toUpperCase().split("(NO");
      couponText = couponText[0].trim();
    }
    if(couponText.toUpperCase().split("CLICK").length > 1){
      couponText = couponText.toUpperCase().split("CLICK");
      couponText = couponText[0].trim();
    }
    if(couponText.toUpperCase().split("VIEW ").length > 1){
      couponText = couponText.toUpperCase().split("VIEW ");
      couponText = couponText[0].trim();
    }
    if(couponText.toUpperCase().split("T&C").length > 1){
      couponText = couponText.toUpperCase().split("T&C");
      couponText = couponText[0].trim();
    }
    couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
  }
  couponToSend = JSON.stringify(couponToSend);
  var jsonArr = [{'couponsExt': couponToSend}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 15, doNothing, []);
}
sendCoupon()

/////////////////// WISH TO WATCH LIST STARTS /////////////////

var cur_url = window.location.href;
if(cur_url.split("snapdeal.com/mywishlist").length > 1){
  if($('#internal-content').length>0){
    importWishGlobal('#internal-content', 'before', snapWishList);
  }
}
function snapWishList(){
  wishListSnap = [];
  var slider = $('.product_list_view_cont');
  var sliderLength = slider.length;
  var link = "";
  var url = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 129;
  if($("#numWishlistItems").length > 0){
    var pages = $("#numWishlistItems").text().trim();
    if(pages.split("(").length > 1){
      pages = pages.split("(");
      if(pages[1].toUpperCase().split("ITEM").length > 1){
        pages = pages[1].toUpperCase().split("ITEM");
        pages = pages[0].trim();
      }
      if(pages.split(")").length > 1){
        pages = pages.split(")");
        pages = pages[0].trim();
      }
      pages = parseInt(pages);
    }
  }
  else{
    var pages = 0;
  }
  var snapapi = "https://www.snapdeal.com/wishlistNew/getProducts/0/"+pages+"?sort=dhtl&lang=en";
  $.get(snapapi, {}).success(function(data){
    data = JSON.parse(data);
    for(var d=0;d<data.wishlistProductDisplayDTOs.length;d++){
      image = "";
      price = "";
      prod = "";
      link = "";
      url = "";
      PID = "";

      image = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.image;
      image = "https://n2.sdlcdn.com/" + image;
      price = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.displayPrice;
          // price = filter_price(price);
          prod = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.name;
          link = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.pageUrl;
          if(link.split("snapdeal.com/").length < 2){
            link = "https://www.snapdeal.com/" + link;
          }
          url = link;

          if(link.split("#").length > 1)  {
            link = link.split("#")[0];
          }
          if(link.split("?").length > 1)  {
            link = link.split("?")[0];
          }
          if(link.split("/").length > 1)  {
            link = link.split("/");
            PID = link[link.length -1];
          }

          prod = prod.split("'").join("").trim();
          prod = prod.split('"').join('').trim();


          if(PID != "" && price != ""){
            wishListSnap.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
          }
        }
        wishJson = JSON.stringify(wishListSnap);
        var jsonArr = [{'wishList': wishJson}];
        jsonArr = JSON.stringify(jsonArr);
        sendMessage(1, jsonArr, 17, alertWLResp, []);
        // console.log("WishlistJSON: " + wishJson);

      })
  .fail(function(data){
    // console.log("Something went wrong!");
  });
}
function alertWLResp(data){
  alert(data);
}
/////////////////// WISH TO WATCH LIST ENDS /////////////////

