//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;
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
function getProd(){
  var prod = "";
  prod = $("#product_new_page h1:eq(0)").text().trim();
  if($('#product_new_page').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";

  image = $("#product_new_page img:eq(0)").attr("src");
  
  return image;
}

function getPrice(){
  price = "";
  
  if((price == "" || price == 0 || isNaN(price) ) && $('#prod_price_stock_1').length > 0 && $('#prod_price_stock_1 h9').length > 0)
  {
    price = $('#prod_price_stock_1 h9').text().trim();
    price = filter_price(price);
  }
  if((price == "" || price == 0 || isNaN(price) ) &&  $('#product_new_page .appr_price').length > 0)
  {
    price = $('#product_new_page .appr_price').text().trim();
    price = filter_price(price);
  }
  return price;
}

function getAvailability(){
  var avail = 1;
  if($('.sold_out').length > 0){
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
  if(pid.split("/products/").length > 1){
    pid = pid.split("/products/")[1];
    if(pid.split("/").length > 1){
      pid = pid.split("/");
      pid = pid[0];
    }
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
  if(pid.split("/products/").length > 1){
    pid = pid.split("/products/")[1];
  }
  if(pid.split("/").length > 1){
    pid = pid.split("/");
    pid = pid[0];
  }
  if(link.split('grabmore.in').length < 2){
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
  var len_bread = $('#sub_title_new').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('#sub_title_new').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;


}

function getModel(){
  var model = "";
  if($(".product_description .specification_leftcontent").length > 0){
    var tab_len = $(".product_description .specification_leftcontent").length;
    for(var i=0;i<tab_len;i++){
      if($(".product_description .specification_leftcontent:eq("+i+")").text().trim().toUpperCase() == "MODEL"){
        model = $(".product_description .specification_rightcontent:eq("+(i)+")").text().trim();
      }
    }
  }
  return model;
}

function getColor(){
  var color = "";
  if($(".product_description .specification_leftcontent").length > 0){
    var tab_len = $(".product_description .specification_leftcontent").length;
    for(var i=0;i<tab_len;i++){
      if($(".product_description .specification_leftcontent:eq("+i+")").text().trim().toUpperCase() == "COLOR"){
        color = $(".product_description .specification_rightcontent:eq("+(i)+")").text().trim();
      }
    }
  }
  return color;
}

function getIntStorage(){
  var intMem = "";
  if($(".product_description .specification_leftcontent").length > 0){
    var tab_len = $(".product_description .specification_leftcontent").length;
    for(var i=0;i<tab_len;i++){
      if($(".product_description .specification_leftcontent:eq("+i+")").text().trim().toUpperCase() == "MEMORY"){
        intMem = $(".product_description .specification_rightcontent:eq("+(i)+")").text().trim();
        if(intMem.toUpperCase().split("INTER").length > 1){
          intMem = intMem.toUpperCase().split("INTER");
          intMem = intMem[0].trim();

          if(intMem.length > 7){
            if(intMem.toUpperCase().split("RAM").length > 1 || intMem.toUpperCase().split("ROM").length > 1){
              intMem = "";
            }
            else{
              if(intMem.toUpperCase().split("GB").length > 1){
                intMem = intMem.toUpperCase().split("GB");
                intMem = intMem[0].trim() + "GB";
              }
              else if(intMem.toUpperCase().split("MB").length > 1){
                intMem = intMem.toUpperCase().split("MB");
                intMem = intMem[0].trim() + "MB";
              }
            }
          }
        }
        else{
          intMem = "";
        }
      }
    }
  }
  return intMem;
}

function sendMobile(){
  var breadCrumb = getBreadCrumb();
  // console.log("getBreadCrumb: " + breadCrumb);
  if(breadCrumb && breadCrumb.split("*~").length > 1 && breadCrumb.split("*~")[2].trim().toUpperCase() == "MOBILES" && getProd() != ""){
    var PID = getPID();
    var pos = 411;
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
 $ = jQuery.noConflict();
 couponToSend = [];
 var cur_link = window.location.href;

 if(cur_link.split("online-shopping-coupon-codes").length > 1){

   if($('#coupon_content_banner a').length > 0){
     var slider = $('#coupon_content_banner a');
     var sliderLength = slider.length;
     var couponUrl = "";
     var couponCode = "";
     var couponText = "";
     var couponDesc = "";
     var couponExp = 0;
     var couponAt = 411;

     for(i=0;i<sliderLength;i++){
       couponUrl = cur_link;
       couponCode = "";
       couponText = "";
       couponDesc = "";

       if($('#coupon_content_banner a:eq('+ i +')').parent().parent().html().split("coupon_code_bg1").length > 1){
         couponCode = $('#coupon_content_banner a:eq('+ i +')').parent().parent().html().split("coupon_code_bg1")[1];
         couponCode = couponCode.split("<")[0];
         couponCode = couponCode.split(">");
         couponCode = couponCode[couponCode.length -1].trim();
         if(couponCode != couponCode.toUpperCase()){
          couponCode = "";
        }
      }

      if($('#coupon_content_banner a:eq('+ i +')').length > 0){
        couponUrl = $('#coupon_content_banner a:eq('+ i +')').attr("href").trim();
      }

      if(couponCode != ""){
        couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);
      }

    }     

  }

}

if($("#animated_div3").length > 0){
 couponUrl = "http://www.grabmore.in/";
 couponCode = "";
 couponText = "";
 couponDesc = "";
 couponAt = 411;

 couponCode = $("#animated_div3 span:eq(0)").text().trim();
 if(couponCode != couponCode.toUpperCase()){
  couponCode = "";
}
if(couponCode != ""){
  couponToSend.push([encodeURIComponent(couponCode), encodeURIComponent(couponText), couponExp, encodeURIComponent(couponUrl), encodeURIComponent(couponDesc), couponAt, encodeURIComponent(cur_link)]);

}
}
couponToSend = JSON.stringify(couponToSend);
var jsonArr = [{'couponsExt': couponToSend}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(1, jsonArr, 15, doNothing, []);  
}

sendCoupon();
