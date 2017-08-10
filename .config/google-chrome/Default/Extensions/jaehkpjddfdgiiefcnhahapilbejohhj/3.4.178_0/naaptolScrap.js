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

  if($('.grid_Square').length > 0){
    var slider = $('.grid_Square');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var PID1;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      PID1 = "";
      if($('.grid_Square:eq('+ i +') .item_title a').length > 0){
        link = $('.grid_Square:eq('+ i +') .item_title a:eq(0)').attr("href");
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
          if(PID.split(".htm").length > 1){
            PID = PID.split(".htm");
            PID = PID[0];
          }
          if(PID.split("/p/").length > 1){
            PID = PID.split("/p/");
            PID = PID[1];
          }
          else{
            PID = "";
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
        if($('.grid_Square:eq('+ i +')').find('.offer-price').length > 0){

          price = $('.grid_Square:eq('+ i +')').find('.offer-price').text();

        }
        else{
          price = "";
        }
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
          price =price[1];
        }
        if(price.split("INR").length > 1){
          price = price.split("INR");
          price =price[1];
        }
        price = price.split(",").join("").trim();


      }
      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price]);
      }

    } // for ends1

  }

  if($('.item').length > 0){
    var slider = $('.item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var PID1;
    var prod = "";
    var image = "";
    var oos = 100;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      PID1 = "";
      prod = "";
      image = "";
      oos = 100;
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
          if(PID.split(".htm").length > 1){
            PID = PID.split(".htm");
            PID = PID[0];
          }
          if(PID.split("/p/").length > 1){
            PID = PID.split("/p/");
            PID = PID[1];
          }
          else{
            PID = "";
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
        if($('.item:eq('+ i +')').find('.title').length > 0 && $('.item:eq('+ i +')').find('.title a').length > 0 && $('.item:eq('+ i +')').find('.title a').attr("title")){
          prod = $('.item:eq('+ i +')').find('.title a').attr("title");
        }

        if($('.item:eq('+ i +')').find('.title').length > 0 && $('.item:eq('+ i +')').find('.item_image img').length > 0 && $('.item:eq('+ i +')').find('.item_image img').attr("data-original")){
          image = $('.item:eq('+ i +')').find('.item_image img').attr("data-original");
        }
        
        if($('.item:eq('+ i +')').find('.offer-price').length > 0){

          price = $('.item:eq('+ i +')').find('.offer-price').text();

        }
        else{
          price = "";
        }
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
          price =price[1];
        }
        if(price.split("INR").length > 1){
          price = price.split("INR");
          price =price[1];
        }
        price = price.split(",").join("").trim();


      }
      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends1

  }


  if($('.sameItem ul').length > 0){
    var slider = $('.sameItem ul');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var PID1;

    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      PID1 = "";
      if($('.sameItem ul:eq('+ i +') a').length > 0){
        link = $('.sameItem ul:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split(".htm").length > 1){
            PID = PID.split(".htm");
            PID = PID[0];
          }
          if(PID.split("/p/").length > 1){
            PID = PID.split("/p/");
            PID = PID[1];
          }
          else{
            PID = "";
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
        if($('.sameItem ul:eq('+ i +')').find('.offer-price').length > 0){

          price = $('.sameItem ul:eq('+ i +')').find('.offer-price').text();

        }
        else{
          price = "";
        }
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
          price =price[1];
        }
        if(price.split("INR").length > 1){
          price = price.split("INR");
          price =price[1];
        }
        price = price.split(",").join("").trim();


      }
      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price]);
      }

    } // for ends1

  }

  if($('#recently_viewed li').length > 0){
    var slider = $('#recently_viewed li');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;
    var PID1;
    var prod = "";
    var image = "";
    var oos = 100;
    for(i=0;i<sliderLength;i++){
      price = "";
      PID = "";
      PID1 = "";
      prod = "";
      image = "";
      oos = 100;
      if($('#recently_viewed li:eq('+ i +') a').length > 0){
        link = $('#recently_viewed li:eq('+ i +') a:eq(0)').attr("href");
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
          if(PID.split(".htm").length > 1){
            PID = PID.split(".htm");
            PID = PID[0];
          }
          if(PID.split("/p/").length > 1){
            PID = PID.split("/p/");
            PID = PID[1];
          }
          else{
            PID = "";
          }
        }
        else{
          PID = "";
        }
      }

      if(PID != ""){
        if($('#recently_viewed li:eq('+ i +')').find('.title').length > 0 && $('#recently_viewed li:eq('+ i +')').find('.title a').length > 0 && $('#recently_viewed li:eq('+ i +')').find('.title a').attr("title")){
          prod = $('#recently_viewed li:eq('+ i +')').find('.title a').attr("title");
        }

        if($('#recently_viewed li:eq('+ i +')').find('.title').length > 0 && $('#recently_viewed li:eq('+ i +')').find('.item_image img').length > 0 && $('#recently_viewed li:eq('+ i +')').find('.item_image img').attr("data-original")){
          image = $('#recently_viewed li:eq('+ i +')').find('.item_image img').attr("data-original");
        }
        if($('#recently_viewed li:eq('+ i +')').find('.offer-price').length > 0){

          price = $('#recently_viewed li:eq('+ i +')').find('.offer-price').text();

        }
        else{
          price = "";
        }
        if(price.split("Rs.").length > 1){
          price = price.split("Rs.");
          price =price[1];
        }
        if(price.split("INR").length > 1){
          price = price.split("INR");
          price =price[1];
        }
        price = price.split(",").join("").trim();


      }
      else{
        price = "";
      }

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([PID, price, prod, image, oos]);
      }

    } // for ends1

  }
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsNaap': arrayToSend}];
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
  var PID = "";
  var current_status = 0;

  if($('#square_Details h1').length > 1){
    prod = $('#square_Details h1:eq(1)').text().trim();
  }
  else if($('#square_Details h1').length > 0){
    prod = $('#square_Details h1:eq(0)').text().trim();
  }


  if($('#square_Details').find('.price .offer-price').length > 0){

    myPrice = $('#square_Details').find('.price .offer-price').text();

  }
  


  else{
    myPrice = "";
  }
  if(myPrice.split("Rs.").length > 1){
    myPrice = myPrice.split("Rs.");
    myPrice =myPrice[1];
  }
  if(myPrice.split("INR").length > 1){
    myPrice = myPrice.split("INR");
    myPrice =myPrice[1];
  }
  if(myPrice.split("+").length > 1){
    myPrice = myPrice.split("+");
    myPrice =myPrice[0];
  }
  myPrice = myPrice.split(",").join("").trim();

  if($('.product_Info').find('.main_image').length > 0){

    image = $('.product_Info').find('.main_image img').attr('src');

  }
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
    if(PID.split(".htm").length > 1){
      PID = PID.split(".htm");
      PID = PID[0];
    }
    if(PID.split("/p/").length > 1){
      PID = PID.split("/p/");
      PID = PID[1];
    }
    else if(PID.split("-pi-").length>1){
      PID = PID.split("-pi-")[1];
      PID = PID.split("-pp")[0];
    }
    else{
      PID = "";
    }
  }
  else{
    PID = "";
  }


  if($('.pro_BuyAction').length > 0){
    if($('.pro_BuyAction').text().toUpperCase().split("REQUEST QUOTE").length > 1){
      current_status = 2;
    }
  }

  cur_url = window.location.href;
  curData.push([prod, image, myPrice, cur_url, current_status, PID]);
  curData = JSON.stringify(curData);
  var jsonArr = [{'curDataNaap': curData}];
  jsonArr = JSON.stringify(jsonArr);
  if($('.product_Info').length>0){
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
  if($('#square_Details h1').length > 1){
    prod = $('#square_Details h1:eq(1)').text().trim();
  }
  else if($('#square_Details h1').length > 0){
    prod = $('#square_Details h1:eq(0)').text().trim();
  }
  if($('.product_Info').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";

  if($('.product_Info').find('.main_image').length > 0){

    image = $('.product_Info').find('.main_image img').attr('src');

  }
  
  return image;
}

function getPrice(){
  price = "";
  
  if($('#square_Details').find('.price .offer-price').length > 0){

    myPrice = $('#square_Details').find('.price .offer-price').text();

  }
  else{
    myPrice = "";
  }
  if(myPrice.split("Rs.").length > 1){
    myPrice = myPrice.split("Rs.");
    myPrice =myPrice[1];
  }
  if(myPrice.split("INR").length > 1){
    myPrice = myPrice.split("INR");
    myPrice =myPrice[1];
  }
  if(myPrice.split("+").length > 1){
    myPrice = myPrice.split("+");
    myPrice =myPrice[0];
  }
  price = myPrice;
  price = filter_price(price);
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.pro_BuyAction').length > 0){
    if($('.pro_BuyAction').text().toUpperCase().split("REQUEST QUOTE").length > 1){
      avail = -1;
    }
  }
  
  return avail;

}
function getPID(){

  var link = window.location.href;
  //console.log("link: "+link);
  var pid = link;

  if(pid.split("?").length > 1){
    pid = pid.split("?");
    pid = pid[0];
  }
  if(pid.split("#").length > 1){
    pid = pid.split("#");
    pid = pid[0];
  }
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm");
    pid = pid[0];
  }
  if(pid.split("/p/").length > 1){
    pid = pid.split("/p/");
    pid = pid[1];
  }
  else if(pid.split("-pi-").length>1){
    pid = pid.split("-pi-")[1];
    pid = pid.split("-pp")[0];
  }

  return pid;



}

function returnPID(link){

  var pid = link;
  
  if(pid.split("?").length > 1){
    pid = pid.split("?");
    pid = pid[0];
  }
  if(pid.split("#").length > 1){
    pid = pid.split("#");
    pid = pid[0];
  }
  if(pid.split(".htm").length > 1){
    pid = pid.split(".htm");
    pid = pid[0];
  }
  if(pid.split("/p/").length > 1){
    pid = pid.split("/p/");
    pid = pid[1];
  }
  else if(pid.split("-pi-").length>1){
    pid = pid.split("-pi-")[1];
    pid = pid.split("-pp")[0];
  }
  if(link.split('naaptol.com').length < 2){
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
  var len_bread = $('#breadCrumb').find('[itemprop="title"]').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('#breadCrumb').find('[itemprop="title"]:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}


function getModel(){
  var model = "";
  if($("#featureLayout li").length > 0){
    var tab_len = $("#featureLayout li").length;
    for(var i=0;i<tab_len;i++){
      if($("#featureLayout li:eq("+i+")").text().trim().toUpperCase() == "MODEL"){
        model = $("#featureLayout li:eq("+(i+1)+")").text().trim();
      }
    }
  }
  return model;
}

function getColor(){
  var color = "";
  
  return color;
}

function getIntStorage(){
  var intMem = "";
  if($("#featureLayout li").length > 0){
    var tab_len = $("#featureLayout li").length;
    for(var i=0;i<tab_len;i++){
      if($("#featureLayout li:eq("+i+")").text().trim().toUpperCase() == "INTERNAL MEMORY"){
        intMem = $("#featureLayout li:eq("+(i+1)+")").text().trim();
      }
    }
  }
  return intMem;
}

function sendMobile(){
  var breadCrumb = getBreadCrumb();
  // console.log("getBreadCrumb: " + breadCrumb);
  if(breadCrumb.split("*~").length > 1 && (breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILE HANDSETS" || breadCrumb.split("*~")[3].trim().toUpperCase() == "MOBILE HANDSETS") && getProd() != ""){
    var PID = getPID();
    var pos = 441;
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
