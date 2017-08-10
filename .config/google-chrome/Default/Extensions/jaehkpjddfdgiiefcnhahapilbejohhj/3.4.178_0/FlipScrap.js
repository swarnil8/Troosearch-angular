// hello
var arrayToSendAPI = [];
var till = 0;
var tillDone = 0;
var ssid = "iuft75d68040gsgk";
var sqid = "qxy2b4yja8gsscck";

function getPos(){
  return 2;
}

function sendPairs(){
  arrayToSend = [];
  dropToSend = [];


  if($('*[class^="_2kSfQ4"]').length > 0){
    var slider = $('*[class^="_2kSfQ4"]');
    var sliderLength = slider.length;
    var link;
    var price = 0;
    var prod = "";
    var image = "";
    var oos = 100;
    var PID;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      image = "";
      oos = 100;
      prod = "";
      link = "";
      PID = "";
      if($('*[class^="_2kSfQ4"]')[i].querySelectorAll("a").length > 0){
        link = $('*[class^="_2kSfQ4"]')[i].querySelectorAll("a")[0].getAttribute("href");
        prod = $('*[class^="_2kSfQ4"]')[i].querySelectorAll("a")[0].getAttribute("title");
        if(link.split("/p/").length < 2){
          link = "";
        }

        if(link != ""){
          PID = returnPID(link);
        }
        else{
          PID = "";
        }
      }
      if(PID != ""){
        //price
        if($('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="_1vC4OE"]').length > 0){
          price = $('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="_1vC4OE"]')[0].innerText.trim();
          price = price.split(",").join("").trim();
          price = filter_price(price);

        }
        //image
        if($('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="_1Nyyb"]').length > 0 && $('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="_1Nyyb"]')[0].getAttribute("src")){
          image = $('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="_1Nyyb"]')[0].getAttribute("src").trim();
        }
        if(isValidISBN(PID.toString()) && prod.trim() != ""){
          prod = prod + " " + PID;
        }

        //oos
        if($('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="_1GJ2ZM"]').length > 0){
          oos1 = $('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="_1GJ2ZM"]')[0].innerText;
          if(oos1.toUpperCase().split("OUT OF STOCK").length > 1){
            oos = 1;
          }
          else if(oos1.toUpperCase().split("CURRENTLY UNAVAILA").length > 1){
            oos = 2;
          }
          else{
            oos = 0;
          }
        }
        else if($('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="rIHMVr"]').length > 0){
          oos1 = $('*[class^="_2kSfQ4"]')[i].querySelectorAll('*[class^="rIHMVr"]')[0].innerText;
          if(oos1.toUpperCase().split("COMING SOON").length > 1){
            oos = 1;
          }
          else{
            oos = 0;
          }
        }
        else{
          oos = 0;
        }

        if(PID != "" && price != "" && price != 0){
          arrayToSend.push([PID, price, prod, image, oos]);
          dropToSend.push(PID);
        }

    } // for ends

  }
}


if($('*[class^="_1UoZ"]').length > 0){
  var slider = $('*[class^="_1UoZ"]');
  var sliderLength = slider.length;
  var link;
  var price = 0;
  var prod = "";
  var image = "";
  var oos = 100;
  var PID;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    image = "";
    oos = 100;
    prod = "";
    link = "";
    PID = "";
    if($('*[class^="_1UoZ"]').length > 0){
      link = $('*[class^="_1UoZ"]')[i].getAttribute("href");
      if(link.split("/p/").length < 2){
        link = "";
      }

      if(link != ""){
        PID = returnPID(link);
      }
      else{
        PID = "";
      }
    }
    if(PID != ""){
        //price
        if($('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_1vC4OE"]').length > 0){
          price = $('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_1vC4OE"]')[0].innerText.trim();
          price = price.split(",").join("").trim();
          price = filter_price(price);

        }
        if($('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_3wU53"]').length > 0){
          prod = $('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_3wU53"]')[0].innerText.trim();
        }

        //image
        if($('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_1Nyyb"]').length > 0 && $('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_1Nyyb"]')[0].getAttribute("src")){
          image = $('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_1Nyyb"]')[0].getAttribute("src").trim();
        }
        if(isValidISBN(PID.toString()) && prod.trim() != ""){
          prod = prod + " " + PID;
        }

        //oos
        if($('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_1GJ2ZM"]').length > 0){
          oos1 = $('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="_1GJ2ZM"]')[0].innerText;
          if(oos1.toUpperCase().split("OUT OF STOCK").length > 1){
            oos = 1;
          }
          else if(oos1.toUpperCase().split("CURRENTLY UNAVAILA").length > 1){
            oos = 2;
          }
          else{
            oos = 0;
          }
        }
        else if($('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="rIHMVr"]').length > 0){
          oos1 = $('*[class^="_1UoZ"]')[i].querySelectorAll('*[class^="rIHMVr"]')[0].innerText;
          if(oos1.toUpperCase().split("COMING SOON").length > 1){
            oos = 1;
          }
          else{
            oos = 0;
          }
        }
        else{
          oos = 0;
        }

        if(PID != "" && price != "" && price != 0){
          arrayToSend.push([PID, price, prod, image, oos]);
          dropToSend.push(PID);
        }

    } // for ends

  }
}


if($('.zZCdz4').length > 0){
  var slider = $('.zZCdz4');
  var sliderLength = slider.length;
  var link;
  var price = 0;
  var prod = "";
  var image = "";
  var oos = 100;
  var PID;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    image = "";
    oos = 100;
    prod = "";
    link = "";
    PID = "";
    if($('.zZCdz4:eq('+ i +') a').length > 0){
      link = $('.zZCdz4:eq('+ i +') a:eq(0)').attr('href');
      if(link.split("/p/").length < 2){
        link = "";
      }

      if(link != ""){
        PID = returnPID(link);
      }
      else{
        PID = "";
      }
    }
    if(PID != ""){
        //price
        if($('.zZCdz4:eq('+ i +')').find('._2EOB0J').length > 0 && $('.zZCdz4:eq('+ i +')').find('._2EOB0J ._3RTCM2').length > 0){
          price = $('.zZCdz4:eq('+ i +')').find('._2EOB0J ._3RTCM2:eq(0)').text().trim();
          price = price.split(",").join("").trim();
          price = filter_price(price);

        }
        else if($('.zZCdz4:eq('+ i +')').find('._1vC4OE').length > 0){
          price = $('.zZCdz4:eq('+ i +')').find('._1vC4OE:eq(0)').text().trim();
          price = price.split(",").join("").trim();
          price = filter_price(price);

        }
        //image
        // console.log("image1: "+$('._3liAhj:eq('+ i +')').html());
        if($('.zZCdz4:eq('+ i +')').find('img').attr("src")){
          image = $('.zZCdz4:eq('+ i +')').find('img:eq(0)').attr("src");
        }
        else if($('.zZCdz4:eq('+ i +')').find('img').attr("data-src")){
          image = $('.zZCdz4:eq('+ i +')').find('img:eq(0)').attr("data-src");
        }
        else{
          image = "";
        }
        if(image.split("data:image").length > 1){
          image = "";
        }
        // prod
        if($('.zZCdz4:eq('+ i +')').find('._1Jd8bY').length > 0){
          prod = $('.zZCdz4:eq('+ i +')').find('._1Jd8bY:eq(0)').text();

        }
        else if($('.zZCdz4:eq('+ i +')').find('._1ib7_Y').length > 0){
          prod = $('.zZCdz4:eq('+ i +')').find('._1ib7_Y a:eq(0)').attr("title");

        }
        else if($('.zZCdz4:eq('+ i +')').find('.OiPjke').length > 0){
          prod = $('.zZCdz4:eq('+ i +')').find('.OiPjke').text().trim();

        }

        //oos
        if($('.zZCdz4:eq('+ i +')').find('._1GJ2ZM').length > 0){
          oos1 = $('.zZCdz4:eq('+ i +')').find('._1GJ2ZM:eq(0)').text();
          if(oos1.toUpperCase().split("OUT OF STOCK").length > 1){
            oos = 1;
          }
          else if(oos1.toUpperCase().split("CURRENTLY UNAVAILA").length > 1){
            oos = 1;
          }
          else{
            oos = 0;
          }
        }
        else if($('.zZCdz4:eq('+ i +')').find('.rIHMVr').length > 0){
          oos1 = $('.zZCdz4:eq('+ i +')').find('.rIHMVr:eq(0)').text();
          if(oos1.toUpperCase().split("COMING SOON").length > 1){
            oos = 1;
          }
          else{
            oos = 0;
          }
        }
        else{
          oos = 0;
        }
        if(isValidISBN(PID.toString()) && prod.trim() != ""){
          prod = prod + " " + PID;
        }
        if(PID != "" && price != "" && price != 0){
          arrayToSend.push([PID, price, prod, image, oos]);
          dropToSend.push(PID);
        }

    } // for ends

  }
}


if($('._2kSfQ4').length > 0){
  var slider = $('._2kSfQ4');
  var sliderLength = slider.length;
  var link;
  var price = 0;
  var prod = "";
  var image = "";
  var oos = 100;
  var PID;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    image = "";
    oos = 100;
    prod = "";
    link = "";
    PID = "";
    if($('._2kSfQ4:eq('+ i +') a').length > 0){
      link = $('._2kSfQ4:eq('+ i +') a:eq(0)').attr('href');
      if(link.split("/p/").length < 2){
        link = "";
      }

      if(link != ""){
        PID = returnPID(link);
      }
      else{
        PID = "";
      }
    }
    if(PID != ""){
        //price
        if($('._2kSfQ4:eq('+ i +')').find('._2EOB0J').length > 0 && $('._2kSfQ4:eq('+ i +')').find('._2EOB0J ._3RTCM2').length > 0){
          price = $('._2kSfQ4:eq('+ i +')').find('._2EOB0J ._3RTCM2:eq(0)').text().trim();
          price = price.split(",").join("").trim();
          price = filter_price(price);

        }
        else if($('._2kSfQ4:eq('+ i +')').find('._1vC4OE').length > 0){
          price = $('._2kSfQ4:eq('+ i +')').find('._1vC4OE:eq(0)').text().trim();
          price = price.split(",").join("").trim();
          price = filter_price(price);

        }
        //image
        // console.log("image1: "+$('._3liAhj:eq('+ i +')').html());
        if($('._2kSfQ4:eq('+ i +')').find('img').attr("src")){
          image = $('._2kSfQ4:eq('+ i +')').find('img:eq(0)').attr("src");
        }
        else if($('._2kSfQ4:eq('+ i +')').find('img').attr("data-src")){
          image = $('._2kSfQ4:eq('+ i +')').find('img:eq(0)').attr("data-src");
        }
        else{
          image = "";
        }
        if(image.split("data:image").length > 1){
          image = "";
        }
        // prod
        if($('._2kSfQ4:eq('+ i +')').find('._1Jd8bY').length > 0){
          prod = $('._2kSfQ4:eq('+ i +')').find('._1Jd8bY:eq(0)').text();

        }
        else if($('._2kSfQ4:eq('+ i +')').find('._1ib7_Y').length > 0){
          prod = $('._2kSfQ4:eq('+ i +')').find('._1ib7_Y a:eq(0)').attr("title");

        }

        //oos
        if($('._2kSfQ4:eq('+ i +')').find('._1GJ2ZM').length > 0){
          oos1 = $('._2kSfQ4:eq('+ i +')').find('._1GJ2ZM:eq(0)').text();
          if(oos1.toUpperCase().split("OUT OF STOCK").length > 1){
            oos = 1;
          }
          else if(oos1.toUpperCase().split("CURRENTLY UNAVAILA").length > 1){
            oos = 1;
          }
          else{
            oos = 0;
          }
        }
        else if($('._2kSfQ4:eq('+ i +')').find('.rIHMVr').length > 0){
          oos1 = $('._2kSfQ4:eq('+ i +')').find('.rIHMVr:eq(0)').text();
          if(oos1.toUpperCase().split("COMING SOON").length > 1){
            oos = 1;
          }
          else{
            oos = 0;
          }
        }
        else{
          oos = 0;
        }
        if(isValidISBN(PID.toString()) && prod.trim() != ""){
          prod = prod + " " + PID;
        }
        if(PID != "" && price != "" && price != 0){
          arrayToSend.push([PID, price, prod, image, oos]);
          dropToSend.push(PID);
        }

    } // for ends

  }
}

if($('._3liAhj').length > 0){
  var slider = $('._3liAhj');
  var sliderLength = slider.length;
  var link;
  var price = 0;
  var prod = "";
  var image = "";
  var oos = 100;
  var PID;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    image = "";
    oos = 100;
    prod = "";
    link = "";
    PID = "";
    if($('._3liAhj:eq('+ i +')').length > 0 && $('._3liAhj:eq('+ i +') a').length > 0){
      link = $('._3liAhj:eq('+ i +') a:eq(0)').attr('href');
      if(link.split("/p/").length < 2){
        link = "";
      }

      if(link != ""){
        PID = returnPID(link);
      }
      else{
        PID = "";
      }
    }
    if(PID != ""){
        //price
        if($('._3liAhj:eq('+ i +')').find('._1vC4OE').length > 0){
          price = $('._3liAhj:eq('+ i +')').find('._1vC4OE:eq(0)').text().trim();
          price = price.split(",").join("").trim();
          price = filter_price(price);

        }

        //image
        // console.log("image2: "+$('._3liAhj:eq('+ i +')').html());
        if($('._3liAhj:eq('+ i +')').find('img').attr("src")){
          image = $('._3liAhj:eq('+ i +')').find('img:eq(0)').attr("src");
        }
        else if($('._3liAhj:eq('+ i +')').find('img').attr("data-src")){
          image = $('._3liAhj:eq('+ i +')').find('img:eq(0)').attr("data-src");
        }
        else{
          image = "";
        }
        if(image.split("data:image").length > 1){
          image = "";
        }
        // prod
        if($('._3liAhj:eq('+ i +')').find('._2cLu-l').length > 0){
          prod = $('._3liAhj:eq('+ i +')').find('._2cLu-l:eq(0)').attr("title");

        }
        //oos
        if($('._3liAhj:eq('+ i +')').find('._1GJ2ZM').length > 0){
          oos1 = $('._3liAhj:eq('+ i +')').find('._1GJ2ZM:eq(0)').text();
          if(oos1.toUpperCase().split("OUT OF STOCK").length > 1){
            oos = 1;
          }
          else if(oos1.toUpperCase().split("CURRENTLY UNAVAIL").length > 1){
            oos = 1;
          }
          else{
            oos = 0
          }
        }
        else{
          oos = 0;
        }
        if(isValidISBN(PID.toString()) && prod.trim() != ""){
          prod = prod + " " + PID;
        }
        if(PID != "" && price != "" && price != 0){
          arrayToSend.push([PID, price, prod, image, oos]);
          dropToSend.push(PID);
        }

    } // for ends

  }
}
var slider = $('.product-unit');
var sliderLength = slider.length;
var link;
var price;
var prod = "";
var image = "";
var oos = 100;
for(i=0;i<sliderLength;i++){
  price = "";
  PID = "";
  prod = "";
  image = "";
  oos = 100;
  var link = $('.product-unit:eq(' + i + ')').find('a:eq(0)').attr("href");
  if(link != undefined){
    if(link.split("flipkart.com").length < 2){
      link = "flipkart.com" + link;
    }
    if(link != undefined){
      PID = returnPID(link);
      if($('.product-unit:eq(' + i + ')').find('.pu-title a').length > 0){
        prod = $('.product-unit:eq(' + i + ')').find('.pu-title a:eq(0)').attr("title").trim();
      }
      if($('.product-unit:eq(' + i + ')').find('.pu-image img').length > 0){
        image = $('.product-unit:eq(' + i + ')').find('.pu-image img:eq(0)').attr("src").trim();
      }
      if(image.split("data:image").length > 1){
        image = "";
      }
      if($('.product-unit:eq(' + i + ')').find('.pu-status.oos').length > 0){
        oos = 1;
      }
      else{
        oos = 0;
      }

      if($('.product-unit:eq(' + i + ')').find('.more-listing-options .fk-bold').length > 0){
        price = $('.product-unit:eq(' + i + ')').find('.more-listing-options .fk-bold:eq(0)').text().trim();
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.")[1];
        }
        if(price.split("Rs").length > 1){
          price = price.split("Rs")[1];
        }
        price = price.split(",").join("").trim();
      }
      else if($('.product-unit:eq(' + i + ')').find('.pu-final').length > 0){
       price = $('.product-unit:eq(' + i + ')').find('.pu-final').text().split(",").join("").trim();
       if(price.split("Rs.").length > 1){
        price = price.split("Rs.")[1];
      }
      else if(price.split("Rs").length > 1){
        price = price.split("Rs")[1];
      }
    }
    else{
      price = "";
    }

    price = parseFloat(price);
    if(isNaN(price)){
      price = 0;
    }
    PID = PID.trim();
    if(isValidISBN(PID.toString()) && prod.trim() != ""){
      prod = prod + " " + PID;
    }
    arrayToSend.push([PID, price, prod, image, oos]);
    dropToSend.push(PID);
  }
}
}
var slider = $('.fk-large-item-carousel');
var sliderLength = slider.length;
var link;
var price;
var prod = "";
var image = "";
var oos = 100;
for(i=0;i<sliderLength;i++){
  price = "";
  PID = "";
  prod = "";
  image = "";
  oos = 100;
  var link = $('.fk-large-item-carousel:eq(' + i + ')').find('a:eq(0)').attr("href");
  if(link.split("flipkart.com").length < 2){
    link = "flipkart.com" + link;
  }
  if(link != undefined){
    PID = returnPID(link);
    if($('.fk-large-item-carousel:eq(' + i + ')').find('.fk-product-title').length > 0){
      var prod = $('.fk-large-item-carousel:eq(' + i + ')').find('.fk-product-title').text().trim();
    }
    if($('.fk-large-item-carousel:eq(' + i + ')').find('.pp-img-box img').length > 0){
      var image = $('.fk-large-item-carousel:eq(' + i + ')').find('.pp-img-box img:eq(0)').attr('src').split(",").join("");
    }
    if(image.split("data:image").length > 1){
      image = "";
    }
    var price = $('.fk-large-item-carousel:eq(' + i + ')').find('.final-price').text().split(",").join("");
    price = filter_price(price);
    if(isNaN(price)){
      price = "";
    }
    PID = PID.trim();
    if(isValidISBN(PID.toString()) && prod.trim() != ""){
      prod = prod + " " + PID;
    }
    arrayToSend.push([PID, price, prod, image, oos]);
    dropToSend.push(PID);
  }
}
if($('.DOTDHpWidget').length > 0) {
  var slider = $('.DOTDHpWidget li');
  var sliderLength = $('.DOTDHpWidget li').length;
  var link;
  var price;
  var PID;
  for(i=0;i<sliderLength;i++){
    if($('.DOTDHpWidget li:eq('+ i +')').find('a').length > 0){
     link = $('.DOTDHpWidget li:eq('+ i +')').find('a').attr('href');
     if(link.split("flipkart.com").length < 2){
      link = "flipkart.com" + link;
    }
    PID = returnPID(link);
  }
  else{
    link = "";
    PID = "";
  }
  if(PID != ""){
    if(PID != PID.toUpperCase()){
      PID = "";
    }
  }
  if(PID != ""){
    if($('.DOTDHpWidget li:eq('+ i +')').find('.newPrice').length > 0){
     price = $('.DOTDHpWidget li:eq('+ i +')').find('.newPrice').text();
     if(price.split("Rs.").length > 1){
      price = price.split("Rs.")[1];
    }
    if(price.split("Rs").length > 1){
      price = price.split("Rs")[1];
    }
    price = price.split(",").join("");
  }
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}
if($('.mprod-similar-prod-table').length > 0){
  var slider = $('.mprod-similar-prod-table a');
  var sliderLength = $('.mprod-similar-prod-table a').length;
  var PID;
  var link;
  var price;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    link = $('.mprod-similar-prod-table a:eq('+ i +')').attr('href');
    if(link != ""){
      if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }
    if(PID != ""){
      if(PID != PID.toUpperCase()){
        PID = "";
      }
    }
    if(PID != ""){
      if($('.mprod-similar-prod-table').find('.sim-price-td:eq('+ i +')').length > 0){
       price = $('.mprod-similar-prod-table').find('.sim-price-td:eq('+ i +')').text();
       if(price.split("Rs.").length > 1){
        price = price.split("Rs.")[1];
      }
      if(price.split("Rs").length > 1){
        price = price.split("Rs")[1];
      }
      if(price.split("/-").length > 1){
        price = price.split("/-")[0];
      }
      price = price.split(",").join("").trim();
    }
    else{
     price = "";
   }
 }
 if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}
if($('.productModule').length > 0){
  var slider = $('.productModule');
  var sliderLength = $('.productModule').length;
  var PID;
  var link;
  var price;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('.productModule:eq('+ i +')').find('a').length > 0){
     link = $('.productModule:eq('+ i +')').find('a:eq(0)').attr('href');
     if(link != ""){
      if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }
  }
  else{
   link = "";
   PID = "";
 }
 if(PID != ""){
  if(PID != PID.toUpperCase()){
    PID = "";
  }
}
if(PID != ""){
  if($('.productModule:eq('+ i +')').find('.beforeDiscount').length > 0){
    if($('.productModule:eq('+ i +')').find('.price:eq(1)').length > 0){
     price = $('.productModule:eq('+ i +')').find('.price:eq(1)').text();
     if(price.split("Rs.").length > 1){
      price = price.split("Rs.");
      price = price[1];
    }
    if(price.split("Rs").length > 1){
      price = price.split("Rs")[1];
    }
  }
}
else if($('.productModule:eq('+ i +')').find('.price').length > 0){
 price = $('.productModule:eq('+ i +')').find('.price:eq(0)').text();
 if(price.split("Rs.").length > 1){
  price = price.split("Rs.");
  price = price[1];
}
}
price = price.split(",").join("").trim();
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}

if($('.dotdProductModuleNew').length > 0){
  var slider = $('.dotdProductModuleNew');
  var sliderLength = $('.dotdProductModuleNew').length;
  var PID;
  var link;
  var price;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('.dotdProductModuleNew:eq('+ i +') a').length > 0){
     link = $('.dotdProductModuleNew:eq('+ i +') a:eq(0)').attr('href');
     if(link != ""){
      if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }
    else{
     link = "";
     PID = "";
   }
 }
 if(PID != ""){
  if(PID != PID.toUpperCase()){
    PID = "";
  }
}
if(PID != ""){
  if($('.dotdProductModuleNew:eq('+ i +')').find('.old').length > 0){
    if($('.dotdProductModuleNew:eq('+ i +')').find('.price').length > 0){
     price = $('.dotdProductModuleNew:eq('+ i +')').find('.price:eq(1)').text();
     if(price.split("Rs.").length > 1){
      price = price.split("Rs.");
      price = price[1];
    }
    if(price.split("Rs").length > 1){
      price = price.split("Rs")[1];
    }
  }
}
else if($('.dotdProductModuleNew:eq('+ i +')').find('.price').length > 0){
 price = $('.dotdProductModuleNew:eq('+ i +')').find('.price:eq(0)').text();
 if(price.split("Rs.").length > 1){
  price = price.split("Rs.");
  price = price[1];
}
}
price = price.split(",").join("").trim();
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}

if($('.singleProductModule').length > 0){
  var slider = $('.singleProductModule');
  var sliderLength = $('.singleProductModule').length;
  var PID;
  var link;
  var price;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('.singleProductModule:eq('+ i +')').find('.priceInfo').length > 0){
     link = $('.singleProductModule:eq('+ i +')').find('.priceInfo a:eq(2)').attr('href');
     if(link != ""){
      if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }
  }
  else{
   link = "";
   PID = "";
 }
 if(PID != ""){
  if(PID != PID.toUpperCase()){
    PID = "";
  }
}
if(PID != ""){
  if($('.singleProductModule:eq('+ i +')').find('.beforeDiscount').length > 0){
    if($('.singleProductModule:eq('+ i +')').find('.price').length > 0){
     price = $('.singleProductModule:eq('+ i +')').find('.price').text();
     if(price.split("Rs.").length > 1){
      price = price.split("Rs.");
      price = price[1];
    }
    if(price.split("Rs").length > 1){
      price = price.split("Rs")[1];
    }
  }
}
else if($('.singleProductModule:eq('+ i +')').find('.price').length > 0){
 price = $('.singleProductModule:eq('+ i +')').find('.price').text();
 if(price.split("Rs.").length > 1){
  price = price.split("Rs.");
  price = price[1];
}
}
price = price.split(",").join("").trim();
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}

if($('.list-unit').length > 0){
  var slider = $('.list-unit');
  var sliderLength = slider.length;
  var PID;
  var link;
  var price;

  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('.list-unit:eq('+ i +') a').length > 0){
      link = $(',:eq('+ i +') a').attr('href');
      if(link != ""){
        if(link.split("flipkart.com").length < 2){
          link = "flipkart.com" + link;
        }
        PID = returnPID(link);
      }

      else{
       link = "";
       PID = "";
     }
     if(PID != ""){
      if(PID != PID.toUpperCase()){
        PID = "";
      }

    }
    if(PID != ""){
      if($('.list-unit:eq(' + i + ')').find('.more-listing-options .fk-bold').length > 0){
        price = $('.list-unit:eq(' + i + ')').find('.more-listing-options .fk-bold:eq(0)').text().trim();
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.")[1];
        }
        if(price.split("Rs").length > 1){
          price = price.split("Rs")[1];
        }
        price = price.split(",").join("").trim();
      }
      else if($('.list-unit:eq('+ i +')').find('.pu-final').length > 0){
       price = $('.list-unit:eq('+ i +')').find('.pu-final').text();
       if(price.split("Rs.").length > 1){
        price = price.split("Rs.");
        price = price[1];
      }
      if(price.split("Rs").length > 1){
        price = price.split("Rs")[1];
      }
    }
    price = price.split(",").join("").trim();
  }
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}

if($('.brand-products-section li').length > 0){
  var slider = $('.brand-products-section li');
  var sliderLength = slider.length;
  var PID;
  var link;
  var price;

  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('.brand-products-section li:eq('+ i +')').find('a').length > 0){
     link = $('.brand-products-section li:eq('+ i +')').find('a').attr('href');
     if(link != ""){
       if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }

    else{
     link = "";
     PID = "";
   }
   if(PID != ""){
    if(PID != PID.toUpperCase()){
      PID = "";
    }

  }
  if(PID != ""){
    if($('.brand-products-section li:eq('+ i +') a').length > 0){
      price = $('.brand-products-section li:eq('+ i +') a').text();
      if(price.split("Rs").length > 1){
        price = price.split("Rs")[1];
      }
      if(price.split("Rs.").length > 1){
        price = price.split("Rs.");
        price = price[1];
        price = price.split(",").join("").trim();
      }
      if(price.split("Price:").length > 1){
       price = price.split("Price:");
       price = price[1];
       price = price.split(",").join("").trim();
     }
   }
 }
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}

if($('.combo-unit').length > 0){
  var slider = $('.combo-unit');
  var sliderLength = slider.length;
  var PID;
  var link;
  var price;

  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('.combo-unit a').length > 0){
     link = $('.combo-unit:eq('+ i +') a:eq(0)').attr('href');
     if(link != ""){
      if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }

    else{
     link = "";
     PID = "";
   }
   if(PID != ""){
    if(PID != PID.toUpperCase()){
      PID = "";
    }

  }
  if(PID != ""){
    if($('.combo-unit:eq('+ i +')').find('label').length > 0){
      price = $('.combo-unit:eq('+ i +')').find('label span:eq(1)').text();
      if(price.split("Rs.").length > 1){
        price = price.split("Rs.");
        price = price[1];
      }
      if(price.split("Rs").length > 1){
        price = price.split("Rs")[1];
      }
    }
    price = price.split(",").join("").trim();
  }
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}

if($('#accessory-carousel').length > 0){
  var slider = $('#accessory-carousel li');
  var sliderLength = slider.length;
  var PID;
  var link;
  var price;

  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    if($('#accessory-carousel li:eq('+ i +')').length > 0){
     link = $('#accessory-carousel li:eq('+ i +')').find('a').attr('href');
     if(link != ""){
       if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }

    else{
     link = "";
     PID = "";
   }
   if(PID != ""){
    if(PID != PID.toUpperCase()){
      PID = "";
    }

  }
  if(PID != ""){
    if($('#accessory-carousel li:eq('+ i +')').find('.history_our_price').length > 0){
      price = $('#accessory-carousel li:eq('+ i +')').find('.history_our_price').text();
      if(price.split("Rs.").length > 1){
        price = price.split("Rs.");
        price = price[1];
      }
      if(price.split("Rs").length > 1){
        price = price.split("Rs")[1];
      }
    }
    else if($('#accessory-carousel li:eq('+ i +')').find('.history_list_price').length > 0){
      price = $('#accessory-carousel li:eq('+ i +')').find('.history_list_price').text();
      if(price.split("Rs.").length > 1){
        price = price.split("Rs.");
        price = price[1];
      }
      if(price.split("Rs").length > 1){
        price = price.split("Rs")[1];
      }
    }
    price = price.split(",").join("").trim();
  }
}

else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
  arrayToSend.push([PID, price]);
  dropToSend.push(PID);
}
}
}

if($('#compatible-acc-container .carousel-item').length > 0) {
  var slider = $('#compatible-acc-container .carousel-item');
  var sliderLength = $('#compatible-acc-container .carousel-item').length;
  var link = "";
  var price = "";
  var PID = "";
  var image = "";
  var oos = 100;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    prod = "";
    image = "";
    oos = 100;
    if($('#compatible-acc-container .carousel-item:eq('+ i +')').find('a').length > 0){
     link = $('#compatible-acc-container .carousel-item:eq('+ i +')').find('a').attr('href');
     if(link.split("flipkart.com").length < 2){
      link = "flipkart.com" + link;
    }
    PID = returnPID(link);
  }
  else{
    link = "";
    PID = "";
  }
  if(PID != ""){
    if(PID != PID.toUpperCase()){
      PID = "";
    }
  }
  if(PID != ""){
    if($('#compatible-acc-container .carousel-item:eq('+ i +')').find('img').length > 0){
     image = $('#compatible-acc-container .carousel-item:eq('+ i +')').find('img').attr("src");
   }
   if(image.split("data:image").length > 1){
    image = "";
  }

  if($('#compatible-acc-container .carousel-item:eq('+ i +')').find('.fk-recom-item-details').length > 0){

    if($('#compatible-acc-container .carousel-item:eq('+ i +')').find('.fk-recom-item-details .final-price').length > 0){
     price = $('#compatible-acc-container .carousel-item:eq('+ i +')').find('.fk-recom-item-details:eq(0) .final-price').text();
     price = filter_price(price);
   }

   if($('#compatible-acc-container .carousel-item:eq('+ i +')').find('.fk-recom-item-details .fk-product-title').length > 0){
     prod = $('#compatible-acc-container .carousel-item:eq('+ i +')').find('.fk-recom-item-details:eq(0) .fk-product-title').attr("title").trim();
   }
 }
}
else{
 price = "";
}
if(isNaN(price)){
  price = "";
}
PID = PID.trim();
if(PID != "" && price != ""){
 if(isValidISBN(PID.toString()) && prod.trim() != ""){
  prod = prod + " " + PID;
}
arrayToSend.push([PID, price, prod, image, oos]);
dropToSend.push(PID);
}
}
}
if($('.ccarousel-item .carousel-item').length > 0) {
  var slider = $('.ccarousel-item .carousel-item');
  var sliderLength = $('.ccarousel-item .carousel-item').length;
  var link = "";
  var price = "";
  var PID = "";
  var image = "";
  var oos = 100;
  for(i=0;i<sliderLength;i++){
    price = "";
    PID = "";
    prod = "";
    image = "";
    oos = 100;
    if($('.ccarousel-item .carousel-item:eq('+ i +')').find('a').length > 0){
      link = $('.ccarousel-item .carousel-item:eq('+ i +')').find('a').attr('href');
      if(link.split("flipkart.com").length < 2){
        link = "flipkart.com" + link;
      }
      PID = returnPID(link);
    }
    else{
      link = "";
      PID = "";
    }
    if(PID != ""){
      if(PID != PID.toUpperCase()){
        PID = "";
      }
    }
    if(PID != ""){
      if($('.ccarousel-item .carousel-item:eq('+ i +') a:eq(0)').find('img').length > 0){
        image = $('.ccarousel-item .carousel-item:eq('+ i +') a:eq(0)').find('img').attr("src");
      }
      if(image.split("data:image").length > 1){
        image = "";
      }
      if($('.ccarousel-item .carousel-item:eq('+ i +')').find('.fk-price .final-price').length > 0){
        price = $('.ccarousel-item .carousel-item:eq('+ i +')').find('.fk-price:eq(0) .final-price').text();
        price = filter_price(price);
      }
      prod = $('.ccarousel-item .carousel-item:eq('+ i +')').find('a:eq(0)').attr("title").trim();
    }
    else{
     price = "";
   }
   if(isNaN(price)){
    price = "";
  }
  PID = PID.trim();
  if(PID != "" && price != ""){
    arrayToSend.push([PID, price, prod, image, oos]);
    dropToSend.push(PID);
  }
}
}
arrayToSend = JSON.stringify(arrayToSend);
var jsonArr = [{'pairsFlip': arrayToSend}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(0, jsonArr, 0, doNothing, []);

if(dropToSend.length > 0){
  dropToSend = JSON.stringify(dropToSend);
  var jsonArr = [{'pids': dropToSend, 'pos': 2}];
  jsonArr = JSON.stringify(jsonArr);
  // var passBack = ['.ccarousel-item .carousel-item', '#compatible-acc-container .carousel-item', '#accessory-carousel li', '.combo-unit', '.brand-products-section li', '.list-unit', '.singleProductModule', '.dotdProductModuleNew', '.productModule', '.mprod-similar-prod-table a', '.DOTDHpWidget li', '.fk-large-item-carousel', '.product-unit', '.zZCdz4', '._3liAhj', '._2kSfQ4'];
  var passBack = ['.zZCdz4', '._3liAhj', '._2kSfQ4'];
  sendMessage(1, jsonArr, 30, displayRecentDrops, passBack);

}

}


function sendCurrent(){
  curData = [];
  var prod = getProd();
  var image = getImage();
  var myPrice = getPrice();
  var cur_url = "";
  var avail = getAvailability();
  if(avail == 0){
    var current_status = 1;
  }
  else if(avail == 1){
    current_status = 0;
  }
  else if(avail == -1){
    current_status = 2;
  }
  var pidFlipkart = getPID();
  if(isValidISBN(pidFlipkart.toString()) && prod.trim() != ""){
    prod = prod + " " + pidFlipkart;
  }
  var pr = "";
  var breadcrumb_str = getBreadCrumb();
  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, pidFlipkart, breadcrumb_str]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataFlip': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if(cur_url.split("/p/").length > 1){
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);
// window.setTimeout(initProcessFlip, 5000);
// window.setTimeout(initProcessFlip, pollInterval);


function getProd(flag){
  var prod = "";

  if($('.top-section').length > 0){
    if($('.top-section').find('[itemprop="name"]').length > 0){
      prod = $('.top-section').find('[itemprop="name"]').text().trim();
    }
    else if($('.top-section').find('h1').length > 0){
      prod = $('.top-section').find('h1:eq(0)').text().trim();
    }
  }
  else if($('._3eAQiD').length > 0){
    prod = $('._3eAQiD').text().trim();
  }
  else if($('._3eAQiDZVhw_jnZcZCyr4gi').length > 0){
    prod = $('._3eAQiDZVhw_jnZcZCyr4gi').text().trim();
  }
  else if($('h1').length > 0){
    prod = $('h1:eq(0)').text().trim();
  }
  if(prod == ""){
    if($('*[class^="_3eAQiD"]')){
      prod = $('*[class^="_3eAQiD"]').innerText;
      prod = prod.trim();
    }
  }
  var cur_url = window.location.href;

  if(cur_url.split("/p/").length < 2){
    prod = "";
  }
  if(flag)
    return prod.toLocaleLowerCase();
  return prod;
}

function getImage(){
  var image = "";
  if($('.top-section').length > 0){
    if($('.top-section').find('.mainImage img').length > 0){
      image = $('.top-section').find('.mainImage img:eq(0)').attr('src').trim();
    }
  }
  else if($('.sfescn').length > 0){
    image = $('.sfescn').attr('src').trim();
  }
  else if($('.sfescnxBUTgA-fkyvj_xF').length > 0){
    image = $('.sfescnxBUTgA-fkyvj_xF').attr('src').trim();
  }
  if(image == "" && getProd() != ""){
    if($('img[class*="sfescn"]')){
      image = $('img[class*="sfescn"]').getAttribute("src");
      image = image.trim();
    }
  }
  if(image.split("data:image").length > 1 || image.split(".svg").length > 1){
    image  = "";
  }

  return image;
}

function getPrice(){
  if($("._2oKbBr").length==0){
    price = "";
    price_sel = "";

    if($('.top-section').length > 0){
      if($('.top-section').find('.shop-section-wrap').length > 0){
        price = $('.top-section').find('.shop-section-wrap .selling-price:eq(0)').text().trim();
      }
    }
    price = filter_price(price);

    if($('.seller-table .t-row').find('.price-wrap .selling-price').length > 0){
      sel_len = $('.seller-table .t-row').length;
      for(i=1;i<sel_len;i++){
        if($('.seller-table .t-row:eq('+ i +')').find('.price-wrap .selling-price').length > 0){
          price_sel = $('.seller-table .t-row:eq('+ i +')').find('.price-wrap .selling-price').text().trim();
          price_sel = filter_price(price_sel);
          if( (price_sel != 0 && price_sel < price) || (price_sel != "" && price_sel < price) ){
            price = price_sel;
          }
        }
      }
    }
    if(isNaN(price)){
      price = 0;
    }
    if(price == "" || price == 0){
      if($('._18Zlgn').length > 0){
        price = $('._18Zlgn').text().trim();
        price = filter_price(price);
      }
      else if($('._1vC4OE._37U4_g').length > 0){
        price = $('._1vC4OE._37U4_g').text().trim();
        price = filter_price(price);
      }
      else if($('._1vC4OEv3kku6jwcqIfStG4._37U4_gnOsEFLxCAC4Sn1rO').length > 0){
        price = $('._1vC4OEv3kku6jwcqIfStG4._37U4_gnOsEFLxCAC4Sn1rO').text().trim();
        price = filter_price(price);
      }
      if(price == "" || price == 0 || isNaN(price)){
        price = $('h1').parent().parent().next().next().find("div").eq(1).find("div").eq(0).text();
        price = filter_price(price);
      }
    }
    return price;
  }
  else {
    return 0;
  }
}

function getAvailability(){
  var avail = 1;
  if($('.top-section').length > 0 && $('.top-section').find('.out-of-stock').length > 0){
    avail = 0;
  }
  else if($('.top-section').find('.listing-obsolete-status').text().toUpperCase().split("PERMANENTLY DISCONTINUED").length > 1){
    avail = -1;
  }
  else if($('.row._3FV-Hc').text().toUpperCase().split("SOLD OUT").length > 1){
    avail = 0;
  }
  else if($('.row._3FV-Hc').text().toUpperCase().split("PERMANENTLY DISCONTINUED").length > 1){
    avail = -1;
  }
  else if($('.row._3FV-Hc').text().toUpperCase().split("TEMPORARILY DISCONTINUED").length > 1){
    avail = -1;
  }
  else if($('.row._3FV-Hc').text().toUpperCase().split("CURRENTLY UNAVAILABLE").length > 1){
    avail = -1;
  }
  else if($('._3xgqrA-m1EBBbNkZPYdNfi').text().toUpperCase().split("CURRENTLY UNAVAILABLE").length > 1){
    avail = -1;
  }
  else if($('._3xgqrA-m1EBBbNkZPYdNfi').text().toUpperCase().split("SOLD OUT").length > 1){
    avail = 0;
  }
  else if($('._3xgqrA-m1EBBbNkZPYdNfi').text().toUpperCase().split("PERMANENTLY DISCONTINUED").length > 1){
    avail = -1;
  }
  else if($('._3xgqrA-m1EBBbNkZPYdNfi').text().toUpperCase().split("DISCONTINUED").length > 1){
    avail = -1;
  }
  return avail;
}

function isMobile(breadcrumb){
 if(getBreadCrumb().split("*~Mobiles*~").length > 1){
   return 1;
 }
 else {
  return 0;
}
}

function isProductLaptop(breadcrumb){
 if(getBreadCrumb().split("*~Laptops*~").length > 1){
   return 1;
 }
 else {
  return 0;
}
}

function isProductDesktop(breadcrumb){
 if(getBreadCrumb().split("*~Desktops*~").length > 1){
   return 1;
 }
 else {
  return 0;
}
}

function matchKeyWords(item, prod){
  prod = prod.split(" ");
  var num = 0;
  prod.forEach(function(bc){
   if(item.indexOf(bc) != -1)
    num++;
})
  return num;
}

function checkMetricValue(key,value){
  var flag = 1;
  if(key == "months" || key == "month" || key == "weeks" || key == "week" || key == "tb")
    if(value.length > 2)
      flag = 0;
    else
      if(key == "litres" || key == "ltrs" || key == "ltr" || key == "grams" || key == "gram" || key == "watts" || key == "watt" || key == "ghz" || key == "inch" || key == "inches")
        if(value.length > 5)
          flag = 0;
        else
          if(key == "pixels" || key == "pixel" || key == "megapixels" || key == "mp")
            if(value.length > 12)
              flag = 0;
            else
              if(key == "days" || key == "days" || key == "mbps" || key == "mb/s")
                if(value.length > 3)
                  flag = 0;
                else
                  if(key == "years" || key == "year")
                    if(value.length > 4)
                      flag = 0;
                    else
                      if(key == "gb" || key == "mb" || key == "bit"){
                       value = Number(value);
                       if(value && ((value & (value - 1)) == 0))
                        return true;
                      else
                        return false;
                    }
                    if(flag == 1)
                      return true;
                    else
                      return false;
                  }

                  function computeFeatures(prod){
                    var main_feature_tokens = $('*[class^="_1tMfkh"]');
                    var main_features = [];
                    var metric_features = {};
                    var model_name = "";
                    var brand_name = "";
                    [].forEach.call(main_feature_tokens, function(item){
                      main_features.push(item.innerHTML.toLocaleLowerCase());
                    });
  //console.log(main_features);
  var features_key = $('*[class^="vmXPri"]');
  var features_value = $('*[class^="_3dG3ix"]');
  var prod_desc = {};
  [].forEach.call(features_key, function(item, index){
    var value = features_value[index].innerText.toLocaleLowerCase().trim();
    var key = item.innerText.toLocaleLowerCase().trim();
    if(wholeUnitMatch(key, "brand")){
     brand_name = value;
     brand_name = brand_name.trim();
     return;
   }
   if((wholeUnitMatch(key, "model") || wholeUnitMatch(key, "Model")) && value.length <= 20){
     model_name = value;
     model_name = model_name.trim();
     return;
   }

   if(value.length > 25)
     return;
   units_for_product_matching.every(function(item1){
    if(wholeUnitMatch(value, item1) || wholeUnitMatch(key, item1)){
      var re = new RegExp(item1, 'g');
      value = value.replace(re, '');
      value = value.trim();
      var isMetricValid = checkMetricValue(item1, value);
      if(isMetricValid)
       metric_features[item1] = value;
     return false;
   }
   return true;
 });

 });
  var final_obj = {};
  final_obj.main_features = main_features;
  final_obj.metric_features = metric_features;
  final_obj.model_name = model_name;
  final_obj.brand_name = brand_name;
  return final_obj;
  //console.log(prod_desc);
}


function traverseProdForMetric(prod, index){
  var quant = "";
  while(prod[index] == " ")
   index--;
 while(!isNaN(prod[index]) && index >= 0){
   quant = prod[index] + quant;
   index--;
 }
 if(quant.length)
   return quant;
 else
   return undefined;
}




function computeCategory(prod, breadcrumb){
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

var category = "";
var breadcrumb_tokens  = [];
breadcrumb_tokens = breadcrumb.split("*~");
var i = 0;
var temp_bread_tokens = [];
breadcrumb_tokens.forEach(function(item){
  if(item !== "")
    temp_bread_tokens.push(item);
  i++;
});
breadcrumb_tokens = temp_bread_tokens;
if(!category){
 var pos = 0, max_key_words = 0;
 breadcrumb_tokens.forEach(function(item, index){
  var match = matchKeyWords(item, prod);
  if(match > max_key_words){
   max_key_words = match;
   pos = index;
 }
});
 category = breadcrumb_tokens[pos];
}

if(!category || category == "Home" || category == "home")
 category = breadcrumb_tokens[breadcrumb_tokens.length - 2];
if(category == "Home" || category == "home" || category.indexOf("Search") != -1)
 category = breadcrumb_tokens[breadcrumb_tokens.length - 1];
return category;
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



function getSomeKeywords(prod){

 var currentProd = getProd();
 currentProd = currentProd.toLocaleLowerCase();
 if(currentProd.split("split ac").length > 1){
   var toReturn = "**~ split **~ ac";
 }
 else if(currentProd.split("window ac").length > 1){
   var toReturn = "**~ window **~ ac";
 }
 else if(currentProd.split("ac").length > 1){
   var toReturn = "**~ ac";
 }
 else {
   var toReturn = "";
 }
 return toReturn;

}



function finalData(){
   // console.log("Reached Called here");

   var prod = getProd(1);
   prod = removePrepositions(prod);
   if(prod == ""){
    setTimeout(finalData, 500);
    return;
  }

   // if(product_already_browsed("flipkart", getPID())){
      // console.log("browsed");
      // return;
   // }

   var breadcrumb = getBreadCrumb(1);
   var isBook = 0, jsonObj = {}, finalObj = [];
   var category = "";
   var isMob = isMobile(breadcrumb);
   var isLaptop = 0;
   var isDesktop = 0;
   if(isMob == 0){
    isLaptop = isProductLaptop(breadcrumb);
  }
  if(isMob==0 && isLaptop==0){
    isDesktop = isProductDesktop(breadcrumb);
  }
  if(isMob == 1){
   category = "Mobiles";
 }
 else if(isLaptop==1){
   category = "Laptops";
 }
 else if(isDesktop==1){
   category = "Desktops";
 }
 else{
   category = computeCategory(prod, breadcrumb).trim();
   category = category.replace("&", "and");
 }

 if((getBreadCrumb(1).split("*~Books*~").length > 1)){
   isBook = 1;
   jsonObj.client_id = getCookie('bhInfV_cl_id');
   jsonObj.category = category;
   jsonObj.prod = prod;
   jsonObj.price = getPrice();
   jsonObj.isbn = getPID();
   finalObj.push(jsonObj);
     // console.log("Product Desc" + JSON.stringify(finalObj));
     sendMessage(1, JSON.stringify(finalObj), 28, doNothing, []);
     return;
   }

   var features = computeFeatures();
   // console.log("Reached here 4 " + JSON.stringify(features));
   var brand = features.brand_name;
   brand = computeBrand(prod);
   brand = brand.toLocaleLowerCase();
   if(brand && brand!=""){
    features.brand_name = brand;
  }
  prod = prod.replace(brand, '');
  prod = prod.replace(features.model_name, '');
  var units_matched = {};
  getMetricsFromProdName(undefined, units_matched);
  getMetricsFromMainFeatures(features.main_features, units_matched);
  prod = removeBrackets(prod);
  prod = normalizeProd(prod, category, features.main_features, brand, units_matched);
   // console.log("Reached here 5");
   if(features.model_name && isMob==1){
    prod = features.model_name + " " + prod ;
  }
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
  if(commonWords.trim()!=""){
    prod += "**~ " +commonWords;
  }

  client_interest.interest = {};

  client_interest.interest.brand = brand;
  client_interest.interest.price = getPrice();
  client_interest.interest.category = category;
  client_interest.interest.centres = prod;
  client_interest.interest.prodName = getProd();
  if(category == "Air Conditioners"){
   var prodTemp = getSomeKeywords(prod);
   if(prodTemp.trim()!=""){
    var prodTempSpl = prodTemp.split("**~");
    for(var no=0; no<prodTempSpl.length; no++){
      if(prodTempSpl[no].trim()!=""){
       var toCheck = prodTempSpl[no].trim();
       if(prod.toLocaleLowerCase().split(toCheck.toLocaleLowerCase()).length==1){
        prod += "**~ " +  toCheck.toLocaleLowerCase();
      }
    }
  }
}

client_interest.interest.centres = prod;
}
   // prod = "";
   if(isLaptop || isDesktop){
    prod = features.metric_features['series'];
    prod = filterInt(prod);
    client_interest.interest.centres = prod;
  }
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
   if(features.model_name){
     client_interest.interest.model = features.model_name;
   }

   for(var property in units_matched){
    features.metric_features[property] = units_matched[property].trim();
  }
  client_interest.features = features.metric_features;
  jsonObj.client_id = getCookie('bhInfV_cl_id');
  jsonObj.interests = client_interest.interest;
  jsonObj.variants = client_interest.features;
  finalObj.push(jsonObj);

  sendMessage(1, JSON.stringify(finalObj), 28, doNothing, []);


}

function pickValue(attrName)
{
      // console.log("am in pick values fun ");
      var myVar = $('*[class^="_2ixwsm"]')[0].querySelectorAll('*[class^="_2MCvv7"]')[0];
      // var myVar = $("._2ixwsm ._2MCvv7").html();
      // console.log($(myVar));
      var len = $(myVar)[0].querySelectorAll('*[class^="_1KuY3T"]').length;
      var value = "";
      var attrName2 = "";
      if(attrName == "hdd capacity")
      {
        attrName2 = "ssd capacity";
      }
      var i;
      for(i=0;i<len;i++)
      {
        keyValue = $(myVar)[0].querySelectorAll('*[class^="_1KuY3T"]')[i];
        attr = $(keyValue)[0].querySelectorAll('*[class^="vmXPri"]')[0].innerText;
          // console.log("attr is "+attr );
          // if(attr.toLowerCase().trim() == attrName)

          if(attr.toLowerCase().indexOf(attrName) >= 0)
          {

            value =  $(keyValue)[0].querySelectorAll('*[class^="_3dG3ix"]')[0].innerText;

            if(value.toLowerCase().trim() == "no")
            {
              return "";
            }

            if(value.toLowerCase().trim() == "na")
            {
              return "";
            }
            value = " "+value+" ";
            value = value.replace(/wi-fi/ig," ");
            value = value.replace(/wifi/ig," ");
            value = value.replace(/ wi fi /ig," ");
                 // value = value.replace(/[^0-9A-Z]3g[^0-9A-Z]/ig," ");
                 value = value.replace(/([^0-9A-Z])3g([^0-9A-Z])/ig,"$1 $2");
                 // value = value.replace(/ 4g /ig," ");
                 value = value.replace(/([^0-9A-Z])4g([^0-9A-Z])/ig,"$1 $2");
                 // value = value.replace(spclSymbols," ");
                 value = value.replace(/\s\s+/g,' ');
                 value = value.replace(/[^0-9A-Z\-\/\s]/gi,' ');
                 value = value.trim();
                 return value;
               }
               else if(attrName2!="" && attr.toLowerCase().trim()==attrName2)
               {
                value =  $(keyValue)[0].querySelectorAll('*[class^="_3dG3ix"]')[0].innerText;
                if(value.toLowerCase().trim() == "no")
                {
                  return "";
                }
                if(value.toLowerCase().trim() == "na")
                {
                  return "";
                }

                value = "ssd~*~"+value;
                return value;
              }
            }

            return "";

          }

          function getDetails(url)
          {
            finalJSON = {};
            var specialPat = /[^a-z0-9]+$/gi;
            var prodName = getProd();
            if(prodName ==""){
             setTimeout(getDetails, 100);
             return;
           }
           else {


            var alphaNum = /([a-z]+[0-9]+|[0-9]+[a-z]+)(.)*/gi;
            // console.log("am here in getDetails fun");

            var loaded = $('._2ZbXBq');
            if(loaded.length > 1)
            {
          //not loaded properly
          setTimeout(getDetails,100);

        }
        else if(getSpecs()==""){
          setTimeout(getDetails, 100);
        }
        else
        {
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
         finalJSON["image"] = getImage();


         var finalJSONTemp = JSON.stringify(finalJSON);
         msgToSend = finalJSONTemp;
         sendSearchMessageNew(msgToSend, 1, url);
       }
     }
   }


   function getSpecs()
   {

    var loaded = $('*[class^="_2ZbXBq"]');
    // console.log("Length here " + loaded.length);
    if(loaded.length > 0){
     return "";
   }


   var laptopFound = 0;
   var bcs = $('*[class^="_1joEet"]');

   cat =  $('*[class^="_1joEet"]')[0].querySelectorAll('*[class^="_1KHd47"]')[2].innerText;
   bCat  =  $('*[class^="_1joEet"]')[0].querySelectorAll('*[class^="_1KHd47"]')[3].innerText;
   brand = bCat.toLowerCase().trim().split(cat.toLowerCase().trim())[0];


   var ourAtts = [];
   ourAtts["model number"] = "model";
   ourAtts["part number"] = "serialno";
   ourAtts["processor name"] = "processor";
   ourAtts["processor generation"] = "gen";
   ourAtts["ram"] = "ram";
   ourAtts["operating system"] = "os";
   ourAtts["ssd capacity"] = "hdd";
   ourAtts["hdd capacity"] = "hdd";
   ourAtts["series"] = "lapseries";
   ourAtts["model name"] = "modelname";
   ourAtts["emmc storage"] = "hdd";
   ourAtts["dedicated graphic memory capacity"] = "gCard";

   var attributeVal ={};
   var attributes = [];
   var attrVal = "";
   attributes = ['model number','part number','processor name','processor generation','ram','operating system', "ssd capacity", 'hdd capacity','series','model name','emmc storage', "dedicated graphic memory capacity"];
   for(var j=0;j<attributes.length;j++)
   {
    attrVal = pickValue(attributes[j]);
    // console.log("Qn " + attributes[j] + " Ans " + attrVal);
    if(attrVal!="")
    {
      if(attributes[j]=="hdd capacity")
      {
        if(attrVal.split("~*~").length > 1)
        {
          attrVal = attrVal.split("~*~")[1];
          attributeVal["hdd"] = attrVal;
        }
        else
        {
         var key  = ourAtts[attributes[j]];
         attributeVal[key] = attrVal;
       }
     }
     else
     {
      var key  = ourAtts[attributes[j]];
      attributeVal[key] = attrVal;
    }

  }
}
if(brand.trim()!="")
{
  attributeVal["brand"] = brand.trim();
}
attributeVal["pid"] = getPID();
attributeVal = JSON.stringify(attributeVal);
return attributeVal;
}

function getPID(){
  var pid = "";
  var pid1 = "";
  if($('#ourSearchKey_pid').length > 0 && $('#ourSearchKey_pid').text().trim() != ""){
    pid = $('#ourSearchKey_pid').text().trim();
  }
  else{
    var link = window.location.href;
    pid = link;

    if(pid.split("?pid=").length > 1){
      pid = pid.split("?pid=")[1].trim();
    }
    else if($('.write-review').length > 0){
      pid = $('.write-review').attr('href').trim();
    }
    else if($('.add-to-wishlist').length > 0){
      pid = $('.add-to-wishlist').attr('data-product-id').trim();
    }
    if(pid.split("?pid=").length > 1){
      pid = pid.split("?pid=")[1].trim();
    }
    if(pid.split("&pid=").length > 1){
      pid = pid.split("&pid=")[1].trim();
    }
    if(pid.split("#").length > 1){
      pid = pid.split("#")[0].trim();
    }
    if(pid.split("&").length > 1){
      pid = pid.split("&")[0].trim();
    }
  }
  if(pid != pid.toUpperCase()){
    pid = "";
  }
  else{
    pid = pid.trim();
  }
  if(pid == ""){
    if($("#criteo-tags-div").length > 0){
      pid1 = $("#criteo-tags-div").html();
      pid1 = pid1.split('src="');
      pid1 = pid1[1];
      pid1 = pid1.split('"');
      pid1 = pid1[0];

      pid1 = decodeURIComponent(pid1);
      pid1 = pid1.split("&p=");
      pid1 = pid1[1];
      if(pid1 != undefined && pid1.split("&").length > 1){
        pid1 = pid1.split("&")[0].trim();

        if(pid1 == pid1.toUpperCase()){
          pid = pid1;
        }
      }

    }
  }
  if(pid == ""){
    if($(".swINJg._3nrCtb").length == 1 && $(".swINJg._3nrCtb").parent().attr("href")){
      pid1 = $(".swINJg._3nrCtb").parent().attr("href");
      if(pid1.split("flipkart.com").length < 2){
        pid1 = "https://www.flipkart.com"+pid1;
        pid = returnPID(pid1);
      }
    }
  }
  return pid;
}

function returnPID(link){
  var pid = link;

  if(pid.split("#").length > 1){
    pid = pid.split("#")[0];
    pid = pid.trim();

  }

  if(pid.split("?pid=").length > 1){
    pid = pid.split("?pid=")[1];
    pid = pid.trim();

  }
  if(pid.split("&pid=").length > 1){
    pid = pid.split("&pid=")[1];
    pid = pid.trim();

  }
  if(pid.split("&").length > 1){
    pid = pid.split("&")[0];
    pid = pid.trim();

  }
  if(pid.split("ppid=").length > 1){
    pid = pid.split("ppid=")[0];
    pid = pid.trim();

  }
  if(pid.split("/").length > 1){
    pid = pid.split("/")[0];
    pid = pid.trim();

  }
  if(pid != pid.toUpperCase()){
    pid = "";
  }
  if(link == ""){
    pid = "";
  }

  return pid;

}

function getBreadCrumb(flag){
  var breadcrumb = "";
  var bread_final = "";
  if($('.breadcrumb-wrap').length > 0){
    var len_bread = $('.breadcrumb-wrap li').length;
  }
  else if($('._1KHd47').length > 0){
    var len_bread = $('._1KHd47').length;
  }
  else if($('._1KHd4743U42z60ea6jH0US').length > 0){
    var len_bread = $('._1KHd4743U42z60ea6jH0US').length;
  }
  else if($('*[class^="_1KHd47"')){
    var len_bread = $('*[class^="_1KHd47"').length;
  }

  if(flag==1){
    finalLen = len_bread;
  }
  else {
    finalLen = len_bread - 1;
  }

  for(i=0;i<finalLen;i++){

    if($('.breadcrumb-wrap').length > 0){
      breadcrumb = $('.breadcrumb-wrap li:eq('+ i +')').text().trim();
    }
    else if($('._1KHd47').length > 0){
      breadcrumb = $('._1KHd47:eq('+ i +')').text().trim();
    }
    else if($('._1KHd4743U42z60ea6jH0US').length > 0){
      breadcrumb = $('._1KHd4743U42z60ea6jH0US:eq('+ i +')').text().trim();
    }
    else if($('*[class^="_1KHd47"')){
      breadcrumb = $('*[class^="_1KHd47"')[i].innerText.trim();
    }
    bread_final += breadcrumb + "*~";

  }
  return bread_final;
}



// function getDataFlipAPI(){
//   if(typeof(getPID) == "function" && getPID() != ""){
//     var PID = getPID();
//     var settings = {
//       "async": true,
//       "crossDomain": true,
//       "url": "https://www.flipkart.com/api/3/page/dynamic/product",
//       "method": "POST",
//       "headers": {
//         "x-user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 FKUA/website/41/website/Desktop",
//         "origin": "https://www.flipkart.com",
//         "x-devtools-emulate-network-conditions-client-id": "4ca472c3-95a7-4d2f-a436-b6e4e40f43dc",
//         "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
//         "content-type": "application/json",
//         "accept": "*/*",
//         "referer": "https://www.flipkart.com/wings-fire-autobiography-english-1st/p/itmdyu8fezqmmvhe?pid="+PID,
//         "accept-encoding": "gzip, deflate, br",
//         "accept-language": "en-US,en;q=0.8",
//         "cache-control": "no-cache",
//         "postman-token": "4e0882e0-cfea-0bb9-4dc4-68f5ea018dfd"
//       },
//       "data": '{"requestContext":{"productId": "'+PID+'","sessionContext":{"pids":["'+PID+'"]}}}'
//     }
//     $.ajax(settings).done(function (data) {

//       var image = data.RESPONSE.pageContext.imageUrl;
//       image = image.split("@height}");
//       image = "http://img5a.flixcart.com/image"+image[1];
//       image = image.split("?");
//       image = image[0];

//       var prod = data.RESPONSE.pageContext.titles.title;
//       price = data.RESPONSE.pageContext.pricing.minPrice.value;

//       var oos = 0;
//       var oos1 = "";
//       oos1 = data.RESPONSE.data.product_state_default;
//       if(oos1 != "" && oos1 != null){
//         oos1 = data.RESPONSE.data.product_state_default.data[0].value.state;
//         if(oos1 == "OUT_OF_STOCK"){
//           oos = 1;
//         }
//         else  if(oos1 == "NO_AVAILABLE_LISTING"){
//           oos = 1;
//         }
//       }

//       // shippingCost1 = "";
//       // shippingCost1 = 0;
//       // shippingCost1 = data.RESPONSE.data.product_seller_detail_1.data[0].value.deliveryInfo;
//       // if(shippingCost1 != "" && shippingCost1 != undefined && shippingCost1 != null){
//       //   shippingCost = data.RESPONSE.data.product_seller_detail_1.data[0].value.deliveryInfo.primaryOption.charge.value;
//       // }

//     });
// }
// else{
//   setTimeout(getDataFlipAPI, 800);
// }
// }
// setTimeout(getDataFlipAPI, 1000);

function getFlipIDs(){
  return new Promise(function(resolve, reject){

    var db;
    var request = window.indexedDB.open("sw-toolbox-filters1", 1);
    request.onsuccess = function(event) {
      db = request.result;
      var objectStore = db.transaction("store").objectStore("store");

      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if(cursor) {
          url = cursor.value.url;
          if(url.split("ssid=").length > 1){
            ssid = url.split("ssid=");
            ssid = ssid[1];
            ssid = ssid.split("&");
            ssid = ssid[0];
          }

          if(url.split("sqid=").length > 1){
            sqid = url.split("sqid=");
            sqid = sqid[1];
            sqid = sqid.split("&");
            sqid = sqid[0];
          }
          // console.log(ssid+"~~"+sqid);
        }
      }
    };
    resolve(ssid+"~~"+sqid);
  });
}


function getCatPIDs(start, ssid, sqid){
  var curr_win = window.location.href;
  if(curr_win.split("/pr?").length > 1){
    var len = $("._1KHd47").length - 1;
    var prod_cat = curr_win.split("/pr?");
    prod_cat = prod_cat[1];
    var store = prod_cat.split("sid=");
    store = store[1].trim();
    if(store.split("&").length > 1){
      store = store.split("&");
      store = store[0].trim();
    }
    if(store.split("#").length > 1){
      store = store.split("#");
      store = store[0].trim();
    }
    if(store.split("%").length > 1){
      store = decodeURIComponent(store).trim();
    }
    var header = JSON.stringify({"requestContext":{"store": store,"start":start,"disableProductData":false,"count":60,"ssid": ssid,"sqid": sqid}});
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.flipkart.com/api/3/product/browse?http-method=POST&http-body="+header,
      "method": "GET",
      "headers": {
        "accept": "*/*",
        "x-user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 FKUA/website/41/website/Desktop",
        "x-devtools-emulate-network-conditions-client-id": "67af0782-f425-4e4a-a1a9-cc7ffb4f02c0",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
        "content-type": "application/json",
        "referer": "https://www.flipkart.com/mens-footwear/pr?"+prod_cat,
        "accept-encoding": "gzip, deflate, sdch, br",
        "accept-language": "en-US,en;q=0.8",
        "cache-control": "no-cache",
        "postman-token": "754483df-969b-1910-7e9c-6db412978ae4"
      }
    }

    $.ajax(settings).done(function (data) {
      var value1 = "";
      var PID = "";
      var oos = 0;
      var price = "";
      var prod = "";
      var image = "";
      var resp = data.RESPONSE.data.product_listview.data;
      if(resp){
      // console.log("resp: ",resp);

      // $.each(resp, function(index, value1) {
        for(var d=0;d<resp.length;d++){
          value1 = "";
          PID = "";
          oos = "";
          price = "";
          prod = "";
          image = "";
          value1 = resp[d];
          PID = value1.value.id;
          oos = 0;

          if(value1.value.availability && value1.value.availability.message && (value1.value.availability.message.toUpperCase() == "COMING SOON" || value1.value.availability.message.toUpperCase() == "OUT OF STOCK" || value1.value.availability.message.toUpperCase() == "SOLD OUT")){
            oos = 1;
          }
          else if(value1.value.availability && value1.value.availability.message && value1.value.availability.message.toUpperCase() == "DISCONTINUED"){
            oos = 2;
          }
          else if(value1.value.availability && value1.value.availability.showMessage && value1.value.availability.showMessage == true){
            oos = 1;
          }

          if(value1.value.pricing){
            price = value1.value.pricing.finalPrice.value;
          }
          if(value1.value.titles){
            prod = value1.value.titles.title;
          }
          if(value1.value.media.images[0]){
            image = value1.value.media.images[0].url;
            image = image.split("@height}");
            image = "http://img5a.flixcart.com/image"+image[1];
            image = image.split("?");
            image = image[0];
          }
          else{
            image = "";
          }
          // console.log("image: "+image);
          // console.log("prod: "+prod);
          // console.log("price: "+price);
          // console.log("PID: "+PID);
          // console.log("oos: "+oos);
          if(PID != "" && price != "" && price != 0){

            if(isValidISBN(PID.toString()) && prod.trim() != ""){
              prod = prod + " " + PID;
            }
            arrayToSendAPI.push([PID, price, prod, image, oos]);
          }
        }
      }
      tillDone++;
      if(tillDone == till && tillDone != 0){
        arrayToSendAPI = JSON.stringify(arrayToSendAPI);
        var jsonArr = [{'pairsFlip': arrayToSendAPI}];
        jsonArr = JSON.stringify(jsonArr);
        sendMessage(0, jsonArr, 0, doNothing, []);
      }
    // var products = "";
    // for(var p=0;p<PIDs.length;p++){
    //   PID = data.RESPONSE.pageContext.searchMetaData.productContext[p].productId;
    //   // products = {};
    //   if(PID != "" && products != ""){
    //     products += ',{"productId": "'+PID+'"}';
    //   }
    //   else if(PID != ""){
    //     products += '{"productId": "'+PID+'"}';
    //   }
    // }
    // if(products != ""){
    //   getCatFlipAPI(products, prod_cat);
    // }
  });
  }
}

function initProcessFlip(){
  // getFlipIDs();

  getFlipIDs().then(function(args){
    // console.log("args: "+args);
    args = args.split("~~");
    ssid = args[0].trim();
    sqid = args[1].trim();
    var crawlTill = 60;
    if($(".C5rIv_").length > 0){
      crawlTill = $(".C5rIv_:eq(0)").text().trim();
      crawlTill = crawlTill.split("products of");
      crawlTill = crawlTill[1];
      crawlTill = crawlTill.split("product");
      crawlTill = crawlTill[0].trim();
      crawlTill = crawlTill.split(",").join("").trim();
      crawlTill = parseInt(crawlTill);
      if(crawlTill >= 300){
        crawlTill = 300;
      }
      if(crawlTill != 0){
        var start = 0;
        till = crawlTill/60;
        if(till < 1 && till > 0){
          till = 1;
        }
        else{
          till = Math.round(till);
        }

        // console.log("till: "+till);
        for(var t=0;t<till;t++){
          start = t * 60;
          getCatPIDs(start, ssid, sqid);
        }
      }
    }
    else{
      getCatPIDs(0, ssid, sqid);
    }
  });
}


// function getCatFlipAPI(products, prod_cat){
//   console.log("getCatFlipAPI was called with "+products+ " prod_cat: "+prod_cat);
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://www.flipkart.com/api/3/product/summary",
//     "method": "POST",
//     "headers": {
//       "x-user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 FKUA/website/41/website/Desktop",
//       "origin": "https://www.flipkart.com",
//       "x-devtools-emulate-network-conditions-client-id": "0c1c9fa6-a6cc-4e55-9952-035e3c1746ca",
//       "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
//       "content-type": "application/json",
//       "accept": "*/*",
//       "referer": "https://www.flipkart.com/mens-footwear/pr?"+prod_cat,
//       "accept-encoding": "gzip, deflate, br",
//       "accept-language": "en-US,en;q=0.8",
//       "cache-control": "no-cache",
//       "postman-token": "b372443d-da0b-1759-ff3b-f4c12ebd526e"
//     },
//     "data": '{"requestContext":{"products":['+products+']}}'
//   }

//   $.ajax(settings).done(function (data) {
//     var resp = data.RESPONSE;
//     if(resp){
//       $.each(resp, function(index, value1) {
//         var PID = index;
//         var oos = 100;
//         if(value1.value.pricing){
//           var price = value1.value.pricing.finalPrice.value;
//         }
//         if(value1.value.titles){
//           var prod = value1.value.titles.title;
//         }
//         if(value1.value.media.images[0]){
//           image = value1.value.media.images[0].url;
//           image = image.split("@height}");
//           image = "http://img5a.flixcart.com/image"+image[1];
//           image = image.split("?");
//           image = image[0];
//         }
//         else{
//           image = "";
//         }
//         if(PID != "" && price != "" && price != 0){
//           arrayToSendAPI.push([PID, price, prod, image, oos]);
//         }
//       });
//     }
//     tillDone++;
//     if(tillDone == till && tillDone != 0){
//       arrayToSendAPI = JSON.stringify(arrayToSendAPI);
//       console.log("arrayToSendAPI: "+arrayToSendAPI);
//       var jsonArr = [{'pairsFlip': arrayToSendAPI}];
//       jsonArr = JSON.stringify(jsonArr);
//       sendMessage(0, jsonArr, 0, doNothing, []);
//     }

//   });
// }

////////// WISH TO WATCH LIST ENDS ////////////////

var cur_url = window.location.href;
if(cur_url.split("/wishlist").length > 1 && cur_url.split("flipkart.com").length > 1){
  if($('#wishlist').length>0 && $("#importHatke").length == 0){
    importWishGlobal('#wishlist', 'before', flipImportWish);
  }
}


function flipImportWish(){
  var slider = "";
  var sliderLength = 0;
  var link = "";
  var prod = "";
  var image = "";
  var price = "";
  var PID = "";
  var pos = 2;
  wishListFlip = [];
  var wish_url = window.location.href;
  if($('#wishlist .fk-wishl-itm').length > 0) {
    totAlert = 1;
    slider = $('#wishlist .fk-wishl-itm');
    sliderLength = $('#wishlist .fk-wishl-itm').length;

    for(i=0;i<sliderLength;i++){
      link= "";
      url_wish = "";
      price= "";
      image = "";
      PID= "";
      pos = 2;
      if($('#wishlist .fk-wishl-itm:eq('+ i +')').find('a').length > 0){
        link = $('#wishlist .fk-wishl-itm:eq('+ i +')').find('a').attr('href');
        url_wish = link;
        if(url_wish.split("www.flipkart.com").length < 2){
          url_wish = "http://www.flipkart.com"+url_wish;
        }
        if(link.split('?pid=').length > 1){
          link = link.split("?pid=")[1];
          PID = link.split("&")[0];
        }
        else if(link.split('&pid=').length > 1){
          link = link.split("&pid=")[1];
          PID = link.split("&")[0];
        }
        else{
          link = "";
          PID = "";
        }
      }
      else{
        link = "";
        PID = "";
      }
      if(PID != ""){
        if(PID != PID.toUpperCase()){
          PID = "";
        }
      }
      if(PID != ""){
        if($('#wishlist .fk-wishl-itm:eq('+ i +')').find('.pu-final').length > 0){
          price = $('#wishlist .fk-wishl-itm:eq('+ i +')').find('.pu-final:eq(0)').text().trim();
          price = filter_price(price);
        }
      }
      else{
        price = "";
      }
      if(isNaN(price)){
        price = "";
      }

      if($('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-title-wrapper a').length > 0){
        prod = $('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-title-wrapper:eq(0) a:eq(0)').text().trim();
      }

      if($('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link  img').length > 0){
        image = $('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link img:eq(0)').attr('src').trim();
        if(image.split("data:image").length > 1){
          image = $('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link img:eq(0)').attr('data-src').trim();
        }
      }

      if(PID != "" && price != ""){
       wishListFlip.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url_wish)]);
     }

   }

   wishJson = JSON.stringify(wishListFlip);
   var jsonArr = [{'wishList': wishJson}];
   jsonArr = JSON.stringify(jsonArr);
   sendMessage(1, jsonArr, 17, alertImportResp, []);
 }
}
function alertImportResp(data){
  alert(data);
}

// function displayRecentDropsFlip(data, passBack){
//   console.log("drop data: "+data);
//   data = JSON.parse(data);
//   str = "";
//   for(var p=0;p<passBack.length;p++){
//     console.log("passBack: "+passBack[p]);
//     var selector = passBack[p];
//     if($(selector).length > 0){
//       var len = $(selector).length;
//       for(var t=0;t<len;t++){
//         for(var d=0;d<data.length;d++){
//           var pid = data[d]['pid'];
//           var per = data[d]['per'];
//           if($(selector).eq(t).find("a").length > 0 && $(selector).eq(t).find("a:eq(0)").attr("href").split(pid).length > 1){
//             if($(selector).eq(t).find("a:eq(0)").parent().find(".hk-drop-cat-"+pid).length == 0){
//               str = '<div class="bh_parent hk-drop-cat-'+pid+'"><div class="bh_priceDrop"><div class="dropIcon"><img class="icon icons8-Lightning-Bolt" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABVUlEQVQ4T6WUQUrDQBSG/zcquBCsGyVdxROYpSQBdSftgHoCewN7hHoC9QTqDQJGcWcXaXVnPIG6ScCNLQgumjgSjDGaJjPBtxrImy//vPe/R1CIl5ZpxIzd/0qNolXt+u7p73VS4CFsW2cg2s9yhTjXLgedaXelwNddo/EeLTwS0MgAJeqS71Jg2DI7YOxURZ0SMOCWT6A1FXVSYKEZFbX7/mHlkwvNqKidItAegbCYJvdB1MuePpk817JNoRl5jwiMEUdGPSC3+wA2Snx6qLnej9pcktQ2SW7QtrpEdJScBcRD0x0YZQOhCnSIaCeFbGmul6ifGkrAkNviS93HSdMddqvGVQoMub0J4AYC4/m5N33J8Uf/AgbcPCawA0bx3srFrSNbJlKF6eiNNNdLlEqjelK213XMzPplnqu9vlJz62Weqw/kdq8OTGnbLF8NfWnhcgmfXRuFFfP7PfMAAAAASUVORK5CYII=" width="20" height="20" class="dropImg" /></div><div class="dropPerc">'+per+'%</div></div></div>';
//               $(selector).eq(t).find("a:eq(0)").before(str);
//             }
//             // break;
//           }
//         }
//       }
//     }
//   }
// }

////////// WISH TO WATCH LIST ENDS ////////////////
