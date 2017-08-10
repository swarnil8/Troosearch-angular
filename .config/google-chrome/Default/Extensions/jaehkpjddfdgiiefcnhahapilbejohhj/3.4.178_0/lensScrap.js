var arrayMsg = [];
function getCategory(){
  var category = "";
  return category;
}
$ = jQuery.noConflict();
function sendPairs(){
  arrayToSend = [];

  if($('.prdct-list li').length > 0){
    var slider = $('.prdct-list li');
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
      if($('.prdct-list li:eq('+ i +') a').length > 0){
        link = $('.prdct-list li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){

        if($('.prdct-list li:eq('+ i +')').find('.prdct-img').length > 0 && $('.prdct-list li:eq('+ i +')').find('.prdct-img img').length > 0 && $('.prdct-list li:eq('+ i +')').find('.prdct-img img').attr("alt")){
          prod = $('.prdct-list li:eq('+ i +')').find('.prdct-img img').attr('alt');
        }

        if($('.prdct-list li:eq('+ i +')').find('.prdct-img').length > 0 && $('.prdct-list li:eq('+ i +')').find('.prdct-img img').length > 0 && $('.prdct-list li:eq('+ i +')').find('.prdct-img img').attr("img-data-src")){
          image = $('.prdct-list li:eq('+ i +')').find('.prdct-img img').attr('img-data-src');
        }
        else if($('.prdct-list li:eq('+ i +')').find('.prdct-img').length > 0 && $('.prdct-list li:eq('+ i +')').find('.prdct-img img').length > 0 && $('.prdct-list li:eq('+ i +')').find('.prdct-img img').attr("src")){
          image = $('.prdct-list li:eq('+ i +')').find('.prdct-img img').attr('src');
        }

        if($('.prdct-list li:eq('+ i +')').find('[itemprop="price"]').length > 0){
          price = $('.prdct-list li:eq('+ i +')').find('[itemprop="price"]').attr('content');
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else if($('.prdct-list li:eq('+ i +')').find('.prcdt-price').length > 0){
          price = $('.prdct-list li:eq('+ i +')').find('.prcdt-price').text();
          if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          price = filter_price(price);

        }
        else if($('.prdct-list li:eq('+ i +')').find('.prem-price').length > 0){
          price = $('.prdct-list li:eq('+ i +')').find('.prem-price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    }

  }


  if($('.saleproducts li').length > 0){
    var slider = $('.saleproducts li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.saleproducts li:eq('+ i +') a').length > 0){
        link = $('.saleproducts li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){

        if($('.saleproducts li:eq('+ i +')').find('[itemprop="price"]').length > 0){
          price = $('.saleproducts li:eq('+ i +')').find('[itemprop="price"]').attr('content');
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else if($('.saleproducts li:eq('+ i +')').find('.prem-price').length > 0){
          price = $('.saleproducts li:eq('+ i +')').find('.prem-price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price]);
      }

    }

  }

  if($('#bs .span3').length > 0){
    var slider = $('#bs .span3');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#bs .span3:eq('+ i +') a').length > 0){
        link = $('#bs .span3:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){

        if($('#bs .span3:eq('+ i +')').find('.hm_tm_price').length > 0){
          price = $('#bs .span3:eq('+ i +')').find('.hm_tm_price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price]);
      }

    }

  }

  if($('#vsims .span4').length > 0){
    var slider = $('#vsims .span4');
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
      if($('#vsims .span4:eq('+ i +') a').length > 0){
        link = $('#vsims .span4:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){
        if($('#vsims .span4:eq('+ i +')').find('.hm_tm_title').length > 0){
          prod = $('#vsims .span4:eq('+ i +')').find('.hm_tm_title:eq(0)').text().trim();
        }
        if($('#vsims .span4:eq('+ i +')').find('.tm_img_par img').length > 0){
          image = $('#vsims .span4:eq('+ i +')').find('.tm_img_par img:eq(0)').attr("src").trim();
        }
        if($('#vsims .span4:eq('+ i +')').find('.hm_tm_price').length > 0){
          price = $('#vsims .span4:eq('+ i +')').find('.hm_tm_price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    }

  }

  if($('#psims .span4').length > 0){
    var slider = $('#psims .span4');
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
      if($('#psims .span4:eq('+ i +') a').length > 0){
        link = $('#psims .span4:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){
        if($('#psims .span4:eq('+ i +')').find('.hm_tm_title').length > 0){
          prod = $('#psims .span4:eq('+ i +')').find('.hm_tm_title:eq(0)').text().trim();
        }
        if($('#psims .span4:eq('+ i +')').find('.tm_img_par img').length > 0){
          image = $('#psims .span4:eq('+ i +')').find('.tm_img_par img:eq(0)').attr("src").trim();
        }
        if($('#psims .span4:eq('+ i +')').find('.hm_tm_price').length > 0){
          price = $('#psims .span4:eq('+ i +')').find('.hm_tm_price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    }

  }

  if($('#ic_desk_recommendations_table a').length > 0){
    var slider = $('#ic_desk_recommendations_table a');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#ic_desk_recommendations_table a:eq('+ i +')').length > 0){
        link = $('#ic_desk_recommendations_table a:eq('+ i +')').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){

        if($('#ic_desk_recommendations_table a:eq('+ i +')').parent().find('#ic_lk_price').length > 0){
          price = $('#ic_desk_recommendations_table a:eq('+ i +')').parent().find('#ic_lk_price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price]);
      }

    }

  }


  if($('.prod_parent').length > 0){
    var slider = $('.prod_parent');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('.prod_parent:eq('+ i +') a').length > 0){
        link = $('.prod_parent:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){

        if($('.prod_parent:eq('+ i +')').find('.item_price').length > 0){
          price = $('.prod_parent:eq('+ i +')').find('.item_price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price]);
      }

    }

  }


  if($('#na .span3').length > 0){
    var slider = $('#na .span3');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      if($('#na .span3:eq('+ i +') a').length > 0){
        link = $('#na .span3:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){

        if($('#na .span3:eq('+ i +')').find('.hm_tm_price').length > 0){
          price = $('#na .span3:eq('+ i +')').find('.hm_tm_price').text().trim();
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price]);
      }

    }

  }

  if($('.product-list li').length > 0){
    var slider = $('.product-list li');
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
      if($('.product-list li:eq('+ i +') a').length > 0){
        link = $('.product-list li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split("&").length > 1){
            PID = PID.split("&");
            PID = PID[0];
          }
          if(PID.split(".com/").length > 1){
            PID = PID.split(".com/");
            PID = PID[1];
          }
        }

        else{
          PID = "";
        }
      }
      else{
        PID = "";
      }
      if(PID != ""){
        if($('.product-list li:eq('+ i +')').find('.lazy:eq(0)').length > 0){
          prod = $('.product-list li:eq('+ i +')').find('.lazy:eq(0)').attr("alt").trim();
        }
        if($('.product-list li:eq('+ i +')').find('.lazy').attr("short-sec").length > 0){
          image = $('.product-list li:eq('+ i +')').find('.lazy:eq(0)').attr("short-sec").trim();
        }
        if(image == ""){
          if($('.product-list li:eq('+ i +')').find('.lazy').attr("src").length > 0){
            image = $('.product-list li:eq('+ i +')').find('.lazy:eq(0)').attr("src").trim();
          }
        }
        if($('.product-list li:eq('+ i +')').find('.price-view').length > 0){
          if($('.product-list li:eq('+ i +')').find('.price-view:eq(1)').length > 0){
            price = $('.product-list li:eq('+ i +')').find('.price-view:eq(1)').text().trim();
          }
          else{
            price = $('.product-list li:eq('+ i +')').find('.price-view:eq(0)').text().trim();

          }
          if(price.split("Rs.").length > 1){
            price = price.split("Rs.");
            price =price[1];
          }
          else if(price.split("nbsp;").length > 1){
            price = price.split("nbsp;");
            price =price[1];
          }
          else if(price.split("Rs").length > 1){
            price = price.split("Rs");
            price =price[1];
          }

          price = price.split(",").join("").trim();

        }
        else{
          price = "";
        }


      }

      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    }

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsLens': arrayToSend}];
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
  var link = window.location.href;
  var PID = "";

  if($('.title .htag').length > 0){
    prod1 = $('.title .htag').text().trim();
    if($('.title p').length > 0){
      prod2 = $('.title p').text().trim();
    }
    prod = prod1+" "+prod2;

  }
  else if($('.title h1').length > 0){
    prod = $('.title h1').text().trim();

  }

  if(($('.product-options').length > 0) && ($('.product-options').text().split("out of stock").length > 1)){
    current_status = 1;
  }
  else if($('.purchase-type').length < 1){
    current_status = 1;
  }
  else
  {
    current_status = 0;
  }

  myPrice = $('meta[itemprop="price"]').attr('content').split(",").join("").trim();

  image = $('img[itemprop="image"]').attr('src');
  PID = link;
  if(PID.split("?").length > 1){
    PID = PID.split("?");
    PID = PID[0];
  }
  if(PID.split("#").length > 1){
    PID = PID.split("#");
    PID = PID[0];
  }
  if(PID.split("&").length > 1){
    PID = PID.split("&");
    PID = PID[0];
  }
  if(PID.split(".com/").length > 1){
    PID = PID.split(".com/");
    PID = PID[1];
  }


  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataLens': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.product-essential').length>0){
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
  var brand = "";
  if($(".title h1 .htag").length > 0){
    brand = $(".title h1 .htag:eq(0)").text().trim();
  }
  prod = $('.title [itemprop="name"]:eq(0)').text().trim();
  if(prod.split(brand).length > 1){
    prod = prod;
  }
  else{
    prod = brand + " " + prod;
  }
  if(prod.split("\n").length > 1){
    prod = prod.split("\n").join("").trim();
  }
  if(prod.split("    ").length > 1){
    prod = prod.split("    ").join("").trim();
  }

  if($('.product-essential').length>0){
    return prod;
  }
  else {
    return "";
  }

}

function getImage(){
  var image = "";

  image = $('img[itemprop="image"]').attr('src');

  return image;
}

function getPrice(){
  price = "";
  if($('meta[itemprop="price"]').length > 0){
    price = $('meta[itemprop="price"]').attr('content').split(",").join("").trim();
  }

  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if(($('.product-options').length > 0) && ($('.product-options').text().split("out of stock").length > 1)){
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
  if(pid.split(".com/").length > 1){
    pid = pid.split(".com/")[1];
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
  if(pid.split(".com/").length > 1){
    pid = pid.split(".com/")[1];
  }
  if(link.split('lenskart.com').length < 2){
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
function putACIconLens(){
  var cur_url = window.location.href;
  if(cur_url.split("lenskart.com/checkout/").length > 1){
    if($("#giftvoucher_input").length > 0 && $("#couponClick").length == 0){
      var selectorACIcon = "#giftvoucher_input";
      var position = "after";
      var parent = "none";
      var method = "POST";
      var api = "https://www.lenskart.com/giftvoucher/checkout/addgift/code/**";
      var postFields = {};
      var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
      details = JSON.stringify(details);
      arrayMsg = [];
      displayACIcon(selectorACIcon, parent, position, 20, details);
      keepCheckingACIcon(selectorACIcon, parent, position, 20, details);
    }
    else{
      setTimeout(putACIconLens, 1000);
    }
  }
}

putACIconLens();

savings = [];
bestSaving = 0;
bestCoupon = "";

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
  if(resp != "" && code != "" && typeof(resp) != "object"){
    resp = JSON.parse(resp);
    if(resp.success){
      var success_msg = resp.success;
      if(success_msg.split(' of amount "').length > 1){
        csaving = success_msg.split(' of amount "');
        csaving = csaving[1];
        csaving = csaving.split('"');
        csaving = csaving[0];
        csaving = filter_price(csaving);
        if(isNaN(csaving)){
          csaving = 0
        }
        else if(csaving > bestSaving){
          bestSaving = csaving;
          bestCoupon = code;
        }
        if(csaving > 0){
          cpnMsg = resp.success;
          arrayMsg.push([code, encodeURIComponent(cpnMsg), 57]);
        }
      }
    }
    else if(resp.error){
      cpnMsg = resp.error;
      arrayMsg.push([code, encodeURIComponent(cpnMsg), 57]);
    }
  }
  else if(typeof(resp) == "object"){
    csaving = 0;
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashing;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  removeCurrentCpnLens(code);
  displayEachCpnSaving(code, csaving, ecashing);
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
}

function removeCurrentCpnLens(code){
  $.post("https://www.lenskart.com/giftvoucher/checkout/remove/code/"+code, {})
  .success(function(data){
  })
  .fail(function(data){
  });
}

var deleteAC = 0;
var clickedRemove = 0;
function applyBestCoupon(){
  // console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
    if($(".giftvoucher-discount-code").length > 0 && $(".giftvoucher-discount-code button").length > 0){
      document.getElementsByClassName("giftvoucher-discount-code")[0].getElementsByTagName("button")[0].click();
    }

    if($(".giftvoucher-discount-code").length == 0 && $("#giftvoucher_input").length > 0 && $("#giftvoucher_input").css("display") != "none"){
      document.getElementById("giftvoucher_input").click();
    }

    if($(".giftvoucher-discount-code").length == 0 && $("#giftvoucher_code").length > 0 && $("#giftvoucher_code").css("display") != "none" && $("#giftvoucher_add").length > 0){
      $("#giftvoucher_code").val(bestCoupon.trim());
      document.getElementById("giftvoucher_add").click();
      displayFinalSavings();
    }
    else{
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


