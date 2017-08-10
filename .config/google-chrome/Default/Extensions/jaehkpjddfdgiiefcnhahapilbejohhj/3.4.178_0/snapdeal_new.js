var alertPosition = 3;
if(getCookie('snapC')=="" || getCookie('snapC')== undefined){
  setCookie("snapC", 1, 1);
}
var jsonArr = [{'visitedEcomm': 129}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(0, jsonArr, 0, doNothing, []); 
function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('snapdeal.com/checkout').length>1 || curURL.split('snapdeal.com/quickBuy').length>1){
    var jsonArr = [{'processDONE': "SnapDeal"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

reportPurchase();
sendEcomm();
if(getCookie("hideDeal") == undefined || getCookie("hideDeal") == ""){
  setCookie("hideDeal", 0, 1);
}
if(($('.pdpPage').length>0) || ($('.product-detail').length>0) || ($('[itemtype="http://schema.org/Product"]').length > 0) && getCookie("hideDeal") != 1){
  // plotHotDeals();
}
$(".hideOne").click(function(){
  setCookie("hideDeal", 1, 1);
  $(".hk-dpop").remove();

});

$(".hideFifteen").click(function(){
  setCookie("hideDeal", 1, 1000);
  $(".hk-dpop").remove();
  
});

$('.hk-dpop').click(function(){
  var dealArr = [];
  var pos = 129;
  var PID = getPID();
  if(PID != ""){
    dealArr.push([PID, pos]);
    dealArr = JSON.stringify(dealArr);
    var jsonArr = [{'dealData': dealArr}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 18, hotDeals, []);
  }
});

function hotDeals(resp){
  resp = JSON.parse(resp);
  if(resp[0] != "Hottest Deals"){
    var deal_text = "Checkout our Hand-picked deals in " + resp[0] + " category!";
  }
  else{
    var deal_text = "Checkout our Hand-picked Hottest Deals!";
  }
  console.log("deal_text: "+deal_text);
  $(".hk-dpop-details--text").text(deal_text);
  $(".hk-dpop-wrap").attr("href", resp[1]);

}

$('.hk-dpop--close').click(function(){
  if($(this).parent().hasClass("hk-dpop--open")){
    $(this).parent().addClass('bounceOutRight')
    setTimeout(function(){
      $('.hk-dpop').removeClass('bounceOutRight')
      $('.hk-dpop').removeClass('hk-dpop--open')
    },1000)
  }
})
$('.hk-dpop-toggle').click(function(){
  if(!$(this).parent().hasClass("hk-dpop--open")){
    $(this).parent().addClass('hk-dpop--open')
    $(this).parent().addClass('bounceInRight')
    setTimeout(function(){
      $('.hk-dpop').removeClass('bounceInRight')
    },1000)
  }
  else{
    $(this).parent().addClass('bounceOutRight')
    setTimeout(function(){
      $('.hk-dpop').removeClass('bounceOutRight')
      $('.hk-dpop').removeClass('hk-dpop--open')
    },1000)
  }
})
setInterval(function(){
  // console.log("Entered interval");
  if(!$('.hk-dpop').hasClass("hk-dpop--open"))
  {
    $('.hk-dpop').addClass('bounce');
    setTimeout(function(){
      $('.hk-dpop').removeClass('bounce')
    },1000)
  }

},12000)



function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0, 'price': getPrice() }];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 11, doNothing, []);
  }
}

sendTrack();

function dontShow(){
  // console.log("Here I come");
  setCookie("snapC", 0, 1);
  $('.hk-ebay-cb-box').html("");
  $('.hk-ebay-cb-box').css("height", "0px");
  $('.hk-ebay-cb-box').css("display", "none");
  $('.pdp-e-i-alloffers').css("margin-top", "0px");
  return false;
}

function addCode(){
  var canShow = 0;
  if( ($('.pdpPage').length>0) || ($('.product-detail').length>0) ){
    if($('.offerDesc').length> 0){
     if($('.offerDesc').text().split("FreeCharge").length > 1){
      canShow = 1;
    }
    else {
      canShow = 0;
    }
  }
}
if(canShow==0){
  console.log("Can't show FREECHARGE");
}
else {
  console.log("Can show FREECHARGE");
}

if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Mobiles & Tablets" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Computers & Peripherals" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Appliances" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Cameras & Accessories" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(1)').text().trim() == "Televisions"){
 canShow = 1;
}

if(canShow==1){
 var cur_price = getPrice();
 var mod_price = 0;
 var couponFound = 0;
 var couponCode = "";
 var rechargeAmount = 0;
 var mod_price = 0;
     // if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Mobiles & Tablets" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Computers & Peripherals" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Appliances" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Cameras & Accessories" || $('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(1)').text().trim() == "Televisions"){

      if(cur_price >= 5000 && cur_price < 15000){
        mod_price = cur_price - 500;
        couponFound = 1;
        couponCode = "BG500";
        rechargeAmount = 50;
      }
      else if(cur_price >= 15000){
        mod_price = cur_price - 1500;
        couponFound = 1;
        couponCode = "BG1500";
        rechargeAmount = 100;
      }
      canShow = 1;
     // }
       // else if(cur_price >= 10000 && cur_price < 20000){
       //    mod_price = cur_price - 500;
       //    couponFound = 1;
       //    couponCode = "SD500";
       //    rechargeAmount = 100;
       // }
       // else if(cur_price >= 20000){
       //    mod_price = cur_price - 1000;
       //    couponFound = 1;
       //    couponCode = "SD1K";
       //    rechargeAmount = 100;
       // }

       // if($('#breadCrumbWrapper2').find('.containerBreadcrumb').text().trim().toUpperCase().split("SAMSUNG").length > 1){
       //     if(cur_price >= 15000){
       //        var mod_price2 = cur_price - 1000;
       //        couponFound = 1;
       //        couponCode2 = "SAMSUNG";
       //        rechargeAmount2 = 100;
       //        if(mod_price2 < mod_price){
       //          mod_price = mod_price2;
       //          couponCode = couponCode2;
       //          rechargeAmount = rechargeAmount2;
       //        }
       //     }
       // }

       console.log("Case of Mobiles and Tablets");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Computers & Peripherals"){
    //   if(cur_price >= 1000 && cur_price < 3500){
    //       mod_price = cur_price - 100;
    //       couponFound = 1;
    //       couponCode = "PCFC1";
    //       rechargeAmount = 50;
    //    }
    //    else if(cur_price >= 3500 && cur_price < 20000){
    //       mod_price = cur_price - 300;
    //       couponFound = 1;
    //       couponCode = "PCFC2";
    //       rechargeAmount = 50;
    //    }
    //    else if(cur_price >= 20000){
    //       mod_price = cur_price - 1500;
    //       couponFound = 1;
    //       couponCode = "PCFC3";
    //       rechargeAmount = 100;
    //    }
    //   console.log("Case of Computers and Peripherals");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Footwear"){
    //   if(cur_price >= 2000){
    //       mod_price = cur_price - 200;
    //       couponFound = 1;
    //       couponCode = "SHOESFC";
    //       rechargeAmount = 50;
    //    }
    //   console.log("Case of Footwear");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Men's Clothing"){
    //   if(cur_price >= 2000 && cur_price < 5000){
    //       mod_price = cur_price - 100;
    //       couponFound = 1;
    //       couponCode = "MFC1";
    //       rechargeAmount = 50;
    //    }
    //    else if(cur_price >= 5000){
    //       mod_price = cur_price - 500;
    //       couponFound = 1;
    //       couponCode = "MFC2";
    //       rechargeAmount = 50;
    //    }
    //   console.log("Case of Men's Clothing");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Women's Ethnic Wear"){
    //   if(cur_price >= 1500){
    //       mod_price = cur_price - 100;
    //       couponFound = 1;
    //       couponCode = "WEFC";
    //       rechargeAmount = 50;
    //    }
    //   console.log("Case of Women Ethnic Wear");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "TVs, Audio & Video"){
    //   if(cur_price >= 1000 && cur_price < 3500){
    //       mod_price = cur_price - 100;
    //       couponFound = 1;
    //       couponCode = "TVFC1";
    //       rechargeAmount = 50;
    //    }
    //    else if(cur_price >= 3500 && cur_price < 20000){
    //       mod_price = cur_price - 300;
    //       couponFound = 1;
    //       couponCode = "TVFC2";
    //       rechargeAmount = 50;
    //    }
    //    else if(cur_price >= 20000){
    //       mod_price = cur_price - 1500;
    //       couponFound = 1;
    //       couponCode = "TVFC3";
    //       rechargeAmount = 100;
    //    }
    //   console.log("Case of TV");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim()  == "Appliances"){
    //   if(cur_price >= 1500 && cur_price < 10000){
    //       mod_price = cur_price - 150;
    //       couponFound = 1;
    //       couponCode = "APFC1";
    //       rechargeAmount = 50;
    //    }
    //    else if(cur_price >= 10000 && cur_price < 15000){
    //       mod_price = cur_price - 1000;
    //       couponFound = 1;
    //       couponCode = "APFC2";
    //       rechargeAmount = 100;
    //    }
    //    else if(cur_price >= 15000){
    //       mod_price = cur_price - 1500;
    //       couponFound = 1;
    //       couponCode = "APFC3";
    //       rechargeAmount = 100;
    //    }
    //   console.log("Case of Appliances");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Cameras & Accessories"){
    //   if(cur_price >= 5000 && cur_price < 10000){
    //       mod_price = cur_price - 500;
    //       couponFound = 1;
    //       couponCode = "CAMFC1";
    //    }
    //    else if(cur_price >= 10000 && cur_price < 20000){
    //       mod_price = cur_price - 1000;
    //       couponFound = 1;
    //       couponCode = "CAMFC2";
    //    }
    //   console.log("Case of Cameras");
    // }
    // else if($('#breadCrumbWrapper2').find('.containerBreadcrumb:eq(0)').text().trim() == "Automobiles"){
    //   if(cur_price >= 1000 && cur_price < 10000){
    //       mod_price = cur_price - 100;
    //       couponFound = 1;
    //       couponCode = "AUTOFC1";
    //       rechargeAmount = 50;
    //    }
    //    else if(cur_price >= 10000){
    //       mod_price = cur_price - 1000;
    //       couponFound = 1;
    //       couponCode = "AUTOFC2";
    //       rechargeAmount = 100;
    //    }
    //   console.log("Case of Automobiles");
    // }
  }
  if($('#buyPriceBox').length > 0 && couponCode!="" && canShow==1){
    $('#buyPriceBox').after('<div class="hk-ebay-cb-box" style="position:absolute;display:block;"><a id="removeCash" href="#" style="float:right;" onclick="dontShow();return false;">x</a><a target="_blank" href="http://www.snapdeal.com/offers/fc-electronic-week?utm_source=aff_prog&utm_campaign=afts&offer_id=17&aff_id=3686&aff_sub=extension&aff_sub2=freecharge_offer" class="hk-ebay-cb-link"><div class="hk-cb-b-wrap"><div class="hk-b-content"><div class="hk-b-top-txt-wrap">Recharge for Rs.' + rechargeAmount + ' using code <b>' + couponCode + '</b> at Freecharge and get this product for</div><div class="hk-b-price-wrap">&#8377;<span class="hk-b-price">' + mod_price + '</span> only</div><div class="hk-b-bottom-txt-wrap"><em>Valid till <strong>October 18th, 2015</strong></em></div></div><div class="hk-b-button">Know More</div><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png" class="hk-bh-logo" alt="Buyhatke Logo"></div></a></div>');
    $('.pdp-e-i-alloffers').css("margin-top", "140px");
    var button = document.getElementById("removeCash");
    button.addEventListener("click", function(){
      dontShow();
    }, false);
    console.log("Rech Amount " + rechargeAmount + " couponCode " + couponCode + " mod Price " + mod_price + " Length " + $('#pdp-buynow-rp').length);
  }
}

if(getCookie('snapC')==1){
  // addCode();
}

pidFlipkart = getPID();
// if( ($('.pdpPage').length>0) || ($('.product-detail').length>0) ){

//   pidFlipkart = getPID();
//   prod = getProd();
  var selector = [];
  selector.push({selector: '#buyMultiVendorBoxCont', attr: 'none', pos: 'after'});
  selector.push({selector: '#productSpecs', attr: 'none', pos: 'before'});
  selector.push({selector: '.pdp-section:eq(0)', attr: 'none', pos: 'after'});
  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
  settingsSelectors.push('.hk-main-graph');
//   var passBack1 = [{title: prod, siteName: 'Snapdeal', price: getPrice()}];
//   passBack1 = JSON.stringify(passBack1);
//   prepareGraph(pidFlipkart, passBack1);
//   if($('#chart-logo').length > 0){
//     $('#chart-logo').css("bottom", "-25px");
//   }
// }

var affRules = []; // Deals
affRules.push({prePart: '', postPart: 'utm_source=aff_prog&utm_campaign=afts&offer_id=17&aff_id=3686&source=search&aff_sub=extension&aff_sub2=ext_deals'});
affRules = JSON.stringify(affRules);
command = 4;
var passBack2 = [{catName: 'this category', affRules: affRules, command: command}];
passBack2 = JSON.stringify(passBack2);
prepareDeals(pidFlipkart, passBack2, command);

// var selector2 = [];
// selector2.push({selector: '.prodbuy-price', attr: 'none', pos: 'after'});
// selector2.push({selector: '#pdp-buynow-rp', attr: 'none', pos: 'before'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);

var imgURL2 = returnResource("watch-price1.png");
var title = getProd();
var myPrice = getPrice();

title = title.split("(");
title = title[0];
var name = title.trim();
origProd = name;
var name2 = name.split("'s");
name = name2.join("");
var nameS = name.split(" ");
if(nameS.length<12){
 name = nameS.join("-");
}
else {
  name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;
var imgURL = returnResource("snapdeal.png");

////console.log("Flag2 " + flagToDisp);
price = getPrice();
var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;


var a = $('body').text();
if(a.split("ISBN-13:").length>1){
  isbn = parseInt(a.split("ISBN-13:")[1].trim());
  ////console.log(isbn);
}
else if(a.split("ISBN13:").length>1){
  isbn = parseInt(a.split("ISBN13:")[1].trim());
  ////console.log(isbn);
}
else {
  isbn = false;
  ////console.log("ISBN not found");
}

if(isbn){
  if(url.split("/products/").length > 1){
    url = url.split("/products/").join("/books/");
  }
  url = url + "-hatke" + isbn;
}

// if($('#pdp-buynow-rp').length > 0){
//   $('#pdp-buynow-rp').before('<a target="_blank" href=' + url + ' style="background:#19BC9C; padding: 7px 40px;color:#FFF;clear: both;display: inline-block;border: 2px solid #1BAD90;" title="Compare via Compare Hatke">COMPARE</a>');
// }
// else{
//   $('.prodbuy-price').after('<a target="_blank" href=' + url + ' ><img style="margin-left: 11px;" src=' + imgURL +' title="Compare via Compare Hatke"></a>');
// }

if(isbn){
  msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
}

if($('.bread-cont:eq(1)').text().trim().split("Ethnic Wear").length==2||$('.bread-cont:eq(1)').text().trim().split("Apparel").length==2||$('.bread-cont:eq(1)').text().trim().split("Fashion Accessories").length==2||$('.bread-cont:eq(1)').text().trim().split("Footwear").length==2||$('.bread-cont:eq(1)').text().trim().split("Watches").length==2||$('.bread-cont:eq(1)').text().trim().split("Bags").length==2||$('.bread-cont:eq(1)').text().trim().split("Luggage").length==2||$('.bread-cont:eq(1)').text().trim().split("Eyewear").length==2||$('.bread-cont:eq(1)').text().trim().split("Jewellery").length==2){
  isapparel = true;
  msgToSend = msgToSend + "moreData=null";
}
else {
  isapparel = false;
}

if(getBreadCrumb().split("*~Mobile Phones*~").length > 1){
  sendSearchMessageNew(final2send[1], 0, url);
}
else if(getBreadCrumb().split("*~Laptops*~").length > 1){
  getDetails(url);
}
else {
  sendSearchMessage(msgToSend, url);
}

// sendSearchMessage(msgToSend, url);


function filterResults(data, url, flagSel){
  if(data && data != null && data.trim() != "" && data != "null"){
    var results2 = JSON.parse(data);
    var message = results2;
    var results = results2;
    results.sort(compare);
    var origPrice = getPrice();
    origProd = getProd();
    var countArray = Array();
    for (var i = 0; i <= results.length - 1; i++) {
      var current = results[i].prod;
      countArray[i] = 0;
      currentArray = origProd.split(" ");
      var totalLen = currentArray.length;
      for(var k=0; k< currentArray.length; k++){
        if(current.toUpperCase().indexOf(currentArray[k].toUpperCase())!=-1){
          countArray[i] = countArray[i] + 1;
        }
      }
      results[i].score = countArray[i];
    ////console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
  }
  indexSelected = 0; notFound = 1;
  for(k=0; k< results.length; k++){
    if(results[k].score/totalLen > .5){
      indexSelected = k;
      notFound = 0;
      break;
    }
  }

  ////console.log(" Final product " + results[indexSelected].prod + " " + results[indexSelected].price);
  if(isbn){
    indexSelected = 0;
  }

  if(results[0].error !==undefined){
    indexSelected = 0;
  }

  if(flagSel==1){
    indexSelected = 0;
  }


  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  var posSpecs = [];
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  posSpecs.push({selector: '.headerBar:eq(0)', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);
  showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}
