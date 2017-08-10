var arrayMsg = [];
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

  if($('.nbs-flexisel-item').length > 0){
    var slider = $('.nbs-flexisel-item');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      PID1 = "";
      PID2 = "";
      price = "";
      if($('.nbs-flexisel-item:eq('+ i +')').find('a').length > 0){
        link = $('.nbs-flexisel-item:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }
        if(PID != ""){
          if($('.nbs-flexisel-item:eq('+ i +')').find('.final-price').length > 0){
            price = $('.nbs-flexisel-item:eq('+  i +')').find('.final-price').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            price = price.split(",").join("").trim();
            price = parseFloat(price);

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends

      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([getOldPID(link), price, PID]);
      }


    } //for loop ends

  } //1st if ends


  if($('.varnt-cont').length > 0){
    var slider = $('.varnt-cont');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.varnt-cont:eq('+ i +')').find('a').length > 0){
        link = $('.varnt-cont:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if($('.varnt-cont:eq('+ i +')').find('.final-price').length > 0){
            price = $('.varnt-cont:eq('+  i +')').find('.final-price').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            price = price.split(",").join("").trim();
            price = parseFloat(price);

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([getOldPID(link), price, PID]);
      }


    } //for loop ends

  } //1st if ends
  if($('.combo-itm').length > 0){
    var slider = $('.combo-itm');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.combo-itm:eq('+ i +')').find('a').length > 0){
        link = $('.combo-itm:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }

        if(PID != ""){
          if($('.combo-itm:eq('+ i +')').find('.final-price').length > 0){
            price = $('.combo-itm:eq('+  i +')').find('.final-price').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            price = price.split(",").join("").trim();
            price = parseFloat(price);

          }
        }

        else{
          price = "";
        }


        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([getOldPID(link), price, PID]);
      }


    } //for loop ends

  } //1st if ends

  if($('.auto-cmpr-cont .cmr-item-info').length > 0){
    var slider = $('.auto-cmpr-cont .cmr-item-info');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      if($('.auto-cmpr-cont .cmr-item-info:eq('+ i +')').find('a').length > 0){
        link = $('.auto-cmpr-cont .cmr-item-info:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }
        if(PID != ""){
          if($('.auto-cmpr-cont .cmr-item-info:eq('+ i +')').find('.final-price').length > 0){
            price = $('.auto-cmpr-cont .cmr-item-info:eq('+  i +')').find('.final-price').text();
            if(price.split("Rs.").length > 1){
              price = price.split("Rs.");
              price = price[1];
            }
            price = price.split(",").join("").trim();
            price = parseFloat(price);

          }
        }

        else{
          price = "";
        }
        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([getOldPID(link), price, PID]);
      }


    } //for loop ends

  } //1st if ends



  if($('.variant-tile').length > 0){
    var slider = $('.variant-tile');
    var sliderLength = slider.length;
    var link;
    var price;
    var PID;

    for(i=0;i<sliderLength;i++){
      PID = "";
      price = "";
      PID2 = "";
      PID1 = "";
      if($('.variant-tile:eq('+ i +')').find('a').length > 0){
        link = $('.variant-tile:eq('+ i +')').find('a:eq(0)').attr('href');
        if(link != ""){
          PID = returnPID(link);
        }
        if(PID != ""){
         if($('.variant-tile:eq('+ i +')').find('.vrnt-price').length > 0){
          price = $('.variant-tile:eq('+  i +')').find('.vrnt-price').text();
          price = filter_price(price);
        }
        else if($('.variant-tile:eq('+ i +')').find('.vrnt-price-expTag').length > 0){
          price = $('.variant-tile:eq('+  i +')').find('.vrnt-price-expTag').text();
          price = filter_price(price);
        }
      }

      else{
        price = "";
      }
        //prce ends
      } // if 2 ends
      if(PID != "" && price != "" && price != 0){
        arrayToSend.push([getOldPID(link), price, PID]);
      }


    } //for loop ends

  } //1st if ends
  if(arrayToSend.length > 0){
    arrayToSend = JSON.stringify(arrayToSend);
    var jsonArr = [{'pairsHk': arrayToSend}];
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
  var avail = getAvailability();
  var current_status = 0;
  var link = window.location.href;
  var link2 = window.location.href;
  var PID = "";
  if(avail == 1){
    current_status = 0;
  }
  else{
    current_status = 1;
  }
  if($('.variant-name').length > 0){
    prod = $('.variant-name').text().trim();
  }
  else{
    prod = $('h1').text().trim();
  }
  if(current_status == 0){
   myPrice = getPrice();
 }
 else{
  myPrice = "0";
}
myPrice = parseFloat(myPrice);
image = getImage();
PID = returnPID(link);
cur_url = window.location.href;
var breadcrumbF = getBreadCrumb();
curData.push([prod, image, myPrice, cur_url, current_status, getOldPID(link), breadcrumbF, PID]);
curData = JSON.stringify(curData);
var jsonArr = [{'curDataHk': curData}];
jsonArr = JSON.stringify(jsonArr);
if($('.js-product-data').length > 0 || $('#variant-page').length > 0){
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
  var prod1 = "";
  var prod2 = "";
  var prod3 = "";
  var prod4 = "";
  if($('.variant-name').length > 0){
    prod = $('.variant-name').text().trim();
  }
  else{
    prod = $('h1').text().trim();
  }
  if(prod.split("(").length > 1){
    prod1 = prod.split("(")[1].trim();
  }
  if(prod1.split(")").length > 1){
    prod2 = prod1.split(")")[0].trim();
  }
  if(prod.split(prod2).length > 1){
    prod3 = prod.split(prod2).join("");
  }
  if(prod3.split("()").length > 1){
    prod = prod3.split("()").join("").trim();
  }
  if(prod.split("%").length > 1){
    prod = prod.split("%").join("").trim();
  }

  if($('.js-product-data').length>0){
    return prod;
  }
  else if($('#variant-page').length>0){
    return prod;
  }
  else {
    return "";
  }
}

function getImage(){
  var image = "";
  if($('.variant-image').length > 0){
    image = $('.variant-image img').attr("src");
  }
  else if($('#variant-page #img_01').length > 0){
    image = $('#variant-page #img_01').attr("src");
  }
  return image;
}

function getPrice(){
  price = "";

  if($('.variant-price').length > 0){
   price = $('.variant-price').text();
 }
 else if($("#variant-page .embedPadding1 .prc-svning").length > 0){
  price = $("#variant-page .embedPadding1 .prc-svning").text().trim();
}

price = filter_price(price);
return price;
}

function getAvailability(){
  var avail = 1;
  var loc = window.location.href;
  if($('.left-404-msg').length > 0){
    avail = 0;
  }
  else if(($('.text-right').length > 0) && ($('.text-right').text().toUpperCase().split("OUT OF STOCK").length > 1)){
    avail = 0;
  }
  else if(loc.split("/loyalty/").length > 1){
    avail = -1;
  }
  else if($('.js-product-data').find('.btn-red').attr('disabled') == "disabled"){
    avail = 0;
  }
  else if($('.embedPadding1 .text-right').length > 0){
    var text_sold = 0;
    text_sold = $('.embedPadding1 .text-right').text().trim();
    if(text_sold.toUpperCase().split("SOLD OUT").length > 1){
      avail = 0;
    }
  }
  else if($('.product-details .buy-now-container').find('.btn-red:eq(0)').attr('disabled') == "disabled"){
    avail = 0;
  }
  else if(getProd() == "" && (getPrice() == "" || getPrice() == 0) && $(".right-500-msg").length > 0){
    avail = 0;

  }
  else if($('.notifyBtn').length > 0 && $('.notifyBtn').css("display") != "none"){
    avail = 0;
  }
  return avail;

}
function getPID(){
  var link2 = window.location.href;
  var link = window.location.href;
  var link1 = window.location.href;
  var PID2 = "";
  var PID = "";
  var pid = window.location.href;
  var PID1 = "";
  var PID3 = "";

  if(link2 != ""){
    if(link2.split("navKey=").length > 1){
      link2 = link2.split("navKey=");
      PID2 = link2[1].trim();
    }
    if(PID2.split("&").length > 1){
      PID2 = PID2.split("&");
      PID2 = PID2[0].trim();
    }

    if(PID2.split("?").length > 1){
      PID2 = PID2.split("?");
      PID2 = PID2[0].trim();
    }
    if(PID2.split("#").length > 1){
      PID2 = PID2.split("#");
      PID2 = PID2[0].trim();
    }
    if(PID2.split("/").length > 1){
      PID2 = PID2.split("/");
      PID2 = PID2[0].trim();
    }
    if(PID2.split("VRNT").length > 1){
      PID2 = PID2.split("VRNT");
      PID2 = PID2.join("");
      PID2 = PID2.split("-");
      PID2 = PID2.join("");
      if(PID2.trim() != ""){
        PID2 = "VRNT-"+PID2;
      }
    }
    else if(PID2.split("PA").length > 1){
      PID2 = PID2.split("PA");
      PID2 = PID2.join("");
      PID2 = PID2.split("-");
      PID2 = PID2.join("");
      if(PID2.trim() != ""){
        PID2 = "PA-"+PID2;
      }
    }

  }

  if(link != ""){

    if(link.split("SP-").length > 1){
      link = link.split("SP-");
      PID1 = link[1].trim();
    }

    if(PID1.split("%3F").length > 1){
      PID1 = PID1.split("%3F");
      PID1 = PID1[0].trim();
    }

    if(PID1.split("?").length > 1){
      PID1 = PID1.split("?");
      PID1 = PID1[0].trim();
    }

    if(PID1.split("&").length > 1){
      PID1 = PID1.split("&");
      PID1 = PID1[0].trim();
    }


    if(PID1.split("#").length > 1){
      PID1 = PID1.split("#");
      PID1 = PID1[0].trim();
    }

    if(PID1.split("/").length > 1){
      PID1 = PID1.split("/");
      PID1 = PID1[0].trim();
    }

  }
  if(link1.split("healthkart.com/").length > 1){
    PID3 = link1.split("healthkart.com/");

    PID3 = PID3[1];
    if(PID3.split("/").length > 1){
      PID3 = PID3.split("/");
      PID3 = PID3[0].trim();
    }
    else if(PID3.split("?").length > 1){
      PID3 = PID3.split("?");
      PID3 = PID3[0].trim();
    }
    else if(PID3.split("&").length > 1){
      PID3 = PID3.split("&");
      PID3 = PID3[0].trim();
    }
  }

  // console.log("PID1: "+PID1);
  // console.log("PID2: "+PID2);
  if(PID3 == "loyalty" && PID2.split("VRNT-").length > 1){
    PID3 = "sv";
  }
  else if(PID3 == "loyalty" && PID2.split("PA-").length > 1){
    PID3 = "pk";
  }
  PID = PID1 + "~" + PID2 + "~" + PID3;
  pid = PID.trim();
  return pid;

}

function returnPID(link){

 var link2 = link;
 var link1 = link;
 var url = link;
 var PID2 = "";
 var PID = "";
 var pid = window.location.href;
 var PID1 = "";
 var PID3 = "";

 if(link2 != ""){
  if(link2.split("navKey=").length > 1){
    link2 = link2.split("navKey=");
    PID2 = link2[1].trim();
  }
  if(PID2.split("&").length > 1){
    PID2 = PID2.split("&");
    PID2 = PID2[0].trim();
  }

  if(PID2.split("?").length > 1){
    PID2 = PID2.split("?");
    PID2 = PID2[0].trim();
  }
  if(PID2.split("#").length > 1){
    PID2 = PID2.split("#");
    PID2 = PID2[0].trim();
  }
  if(PID2.split("/").length > 1){
    PID2 = PID2.split("/");
    PID2 = PID2[0].trim();
  }
  if(PID2.split("VRNT").length > 1){
    PID2 = PID2.split("VRNT");
    PID2 = PID2.join("");
    PID2 = PID2.split("-");
    PID2 = PID2.join("");
    if(PID2.trim() != ""){
      PID2 = "VRNT-"+PID2;
    }
  }
  else if(PID2.split("PA").length > 1){
    PID2 = PID2.split("PA");
    PID2 = PID2.join("");
    PID2 = PID2.split("-");
    PID2 = PID2.join("");
    if(PID2.trim() != ""){
      PID2 = "PA-"+PID2;
    }
  }
}

if(link != ""){

  if(link.split("SP-").length > 1){
    link = link.split("SP-");
    PID1 = link[1].trim();
  }

  if(PID1.split("%3F").length > 1){
    PID1 = PID1.split("%3F");
    PID1 = PID1[0].trim();
  }

  if(PID1.split("?").length > 1){
    PID1 = PID1.split("?");
    PID1 = PID1[0].trim();
  }

  if(PID1.split("&").length > 1){
    PID1 = PID1.split("&");
    PID1 = PID1[0].trim();
  }


  if(PID1.split("#").length > 1){
    PID1 = PID1.split("#");
    PID1 = PID1[0].trim();
  }

  if(PID1.split("/").length > 1){
    PID1 = PID1.split("/");
    PID1 = PID1[0].trim();
  }

}
if(link1.split("healthkart.com/").length > 1){
  PID3 = link1.split("healthkart.com/");

  PID3 = PID3[1];
  if(PID3.split("/").length > 1){
    PID3 = PID3.split("/");
    PID3 = PID3[0].trim();
  }
  else if(PID3.split("?").length > 1){
    PID3 = PID3.split("?");
    PID3 = PID3[0].trim();
  }
  else if(PID3.split("&").length > 1){
    PID3 = PID3.split("&");
    PID3 = PID3[0].trim();
  }
}

  // console.log("PID1: "+PID1);
  // console.log("PID2: "+PID2);
  if(PID3 == "loyalty" && PID2.split("VRNT-").length > 1){
    PID3 = "sv";
  }
  else if(PID3 == "loyalty" && PID2.split("PA-").length > 1){
    PID3 = "pk";
  }
  PID = PID1 + "~" + PID2 + "~" + PID3;
  pid = PID.trim();

  if(url.split('healthkart.com').length < 2){
    pid = 0;
  }
  if(url == ""){
    pid = 0;
  }
  return pid;

}

function getOldPID(link){
 var link2 = link;
 var PID2 = "";
 var PID = "";
 var pid = window.location.href;
 var PID1 = "";

 if(link2 != ""){
  if(link2.split("navKey=").length > 1){
    PID2 = link2.split("navKey=");
    PID2 = PID2[1].trim();

    if(PID2.split("-").length > 1){
      PID2 = PID2.split("-");
      PID2 = PID2[1].trim();
    }
    if(PID2.split("&").length > 1){
      PID2 = PID2.split("&");
      PID2 = PID2[0].trim();
    }

    if(PID2.split("?").length > 1){
      PID2 = PID2.split("?");
      PID2 = PID2[0].trim();
    }
    if(PID2.split("#").length > 1){
      PID2 = PID2.split("#");
      PID2 = PID2[0].trim();
    }
    if(PID2.split("/").length > 1){
      PID2 = PID2.split("/");
      PID2 = PID2[0].trim();
    }
  }

}

if(link != ""){

  if(link.split("SP-").length > 1){
    PID1 = link.split("SP-");
    PID1 = PID1[1].trim();


    if(PID1.split("?").length > 1){
      PID1 = PID1.split("?");
      PID1 = PID1[0].trim();
    }

    if(PID1.split("&").length > 1){
      PID1 = PID1.split("&");
      PID1 = PID1[0].trim();
    }


    if(PID1.split("#").length > 1){
      PID1 = PID1.split("#");
      PID1 = PID1[0].trim();
    }

    if(PID1.split("/").length > 1){
      PID1 = PID1.split("/");
      PID1 = PID1[0].trim();
    }
  }

}
  // console.log("PID1: "+PID1);
  // console.log("PID2: "+PID2);
  PID = PID1 + "~" + PID2;
  pid = PID.trim();
  return pid;
}

function getBreadCrumb(){
  var breadcrumb = "";
  var bread_final = "";
  var len_bread = $('.hk-breadcrumb-cntnr').find('a').length;

  for(i=0;i<len_bread;i++){
    breadcrumb = $('.hk-breadcrumb-cntnr').find('a:eq('+ i +')').text().trim();
    bread_final += breadcrumb + "*~";
  }

  return bread_final;
}


function getAppliedCpn(){
  var cur_url = window.location.href;
  if(cur_url.split("healthkart.com/cart").length > 1){
    if($(".remove-cpn").length > 0 && $(".remove-cpn").css("display") == "block"){
      var checkPick = ".js-prompt-cntnr .js-cpn-applied";
      var selector = ".js-prompt-cntnr:eq(0) .js-cpn-applied:eq(0)";
      var attr = "";
      var webID = 921;
      var homeLink = "https://www.healthkart.com/";
      pickAppliedCpn(checkPick, selector, attr, webID, homeLink);
    }
    else{
      setTimeout(getAppliedCpn, 1000);
    }
  }
}
getAppliedCpn();

var cur_url = window.location.href;
if(cur_url.split("healthkart.com/cart").length > 1){
  var selectorACIcon = ".add-cpn";
  var position = "after";
  var parent = "none";
  var method = "GET";
  var timeStamp =  Math.floor(Date.now());
  var api = "https://www.healthkart.com/api/cart/applyCoupon/**?_="+timeStamp;
  var postFields = "";
  var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
  details = JSON.stringify(details);
  displayACIcon(selectorACIcon, parent, position, 30, details);
}

savings = [];
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;

function startSaving(data){
  data = JSON.parse(data);
  var nowCode = "";
  var nowSaving = "";
  var resp = data[0].data;
  var code = data[0].code.trim();
  var csaving = 0;
  var ecashsaving = 0;
  nowCode = code;
  respYatra = resp;
  var savingsObject = {};
  if(resp != "" && code != ""){
    if(resp.results.cart && resp.results.cart.cartPricing && resp.results.cart.cartPricing != null && resp.results.cart.cartPricing != ""){
      if(resp.results.cart.cartPricing.promoDisc){
        csaving = resp.results.cart.cartPricing.promoDisc;
        csaving = filter_price(csaving);
      }
      if(resp.results.cart.cartPricing.totLC){
        ecashsaving = resp.results.cart.cartPricing.totLC;
        ecashsaving = filter_price(ecashsaving);
      }

      if(isNaN(csaving)){
        csaving = 0
      }
      else if(csaving > bestSaving){
        bestSaving = csaving;
        bestCoupon = code;
      }
      if(isNaN(ecashsaving)){
        ecashsaving = 0
      }
      else if(ecashsaving > bestEcash){
        bestEcash = ecashsaving;
        bestECoupon = code;
      }
    }
    if(resp.results && resp.results.cart && resp.results.cart.msgs.length > 0){
      cpnMsg = resp.results.cart.msgs[0].trim();
      cpnMsg = cpnMsg.replace(/(<([^>]+)>)/ig,"");
      arrayMsg.push([code, encodeURIComponent(cpnMsg), 921 ]);
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
var deleteAC = 0;

function applyBestCoupon(){
  // console.log("applyBest was called with code : "+bestCoupon+ " savings : "+bestSaving);
  // console.log("applyBest was called with code : "+bestECoupon+ " savings : "+bestEcash);
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "") || (parseInt(bestEcash) != 0 && bestECoupon.trim() != "")){

    if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
      var applyBestCode = bestCoupon;
    }
    else{
      var applyBestCode = bestECoupon.trim();
    }

    if(document.getElementsByClassName("remove-coupon").length > 0 && $(".remove-coupon").css("display") != "none" ){
      document.getElementsByClassName("remove-coupon")[0].click();
    }
    if($(".js-coupon-code").length > 0 && $(".disp-inln.apply-coupon").length > 0){
      $(".js-coupon-code:eq(0)").val(applyBestCode.trim());
      document.getElementsByClassName("apply-coupon")[0].click();
      displayFinalSavings();
    }
    else if($(".js-coupon-code").length > 0){
      setTimeout(applyBestCoupon, 1000);
    }
  }
  else{
    displayNoSavings();
    // console.log("Show no savings popup");
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
