var alertPosition = 9;
if(getCookie("showPopAlert") == undefined || getCookie("showPopAlert") == ""){
  setCookie("showPopAlert", 1, 10);
}

sendEcomm();

var jsonArr = [{'visitedEcomm': 50}];
jsonArr = JSON.stringify(jsonArr);
sendMessage(0, jsonArr, 0, doNothing, []); 

var imgLogo = chrome.extension.getURL("logo.png");
if(getCookie("showPopAlert") == 1){
  // $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:80px!important;"><div id="close-pop-alert">x</div><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p><a style="text-decoration:none;color:white" href="http://compare.buyhatke.com/promotions/american-swan/?gclid=extension" target="_blank">Buyhatke Maha Giveaway - Over 1,00,000 Products available for FREE. Click me to check it out</a></p></div></div></div>');
}

$("#close-pop-alert").click(function(){
  setCookie("showPopAlert", 0, 10);
  $(this).parent().css("display","none");
});

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('jabong.com/cart').length>1){
    var jsonArr = [{'processDONE': "Jabong"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

reportPurchase();

if(getCookie("hideDeal") == undefined || getCookie("hideDeal") == ""){
  setCookie("hideDeal", 0, 1);
}
if($('[itemtype="http://schema.org/Product"]').length > 0 && getCookie("hideDeal") != 1){
  plotHotDeals();
  $(".hk-dpop a").css("text-transform", "none");
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
  var pos = 50;
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
  var prToSend = getPrice();
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0, 'price': prToSend }];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 11, doNothing, []);
  }
}

sendTrack();

pidFlipkart = getPID();
// prod = getProd();
var selector = [];
selector.push({selector: '.product-detail-sec', attr: 'parent', pos: 'after'});
selector.push({selector: '#product-details-wrapper', attr: 'none', pos: 'after'});
selector.push({selector: '.product-info-care:eq(0)', attr: 'none', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// // $('.product-detail-sec').css("z-index", 1001);
// // $('.product-detail-sec').css("z-index", 1001);
// var passBack1 = [{title: prod, siteName: 'Jabong', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);

var affRules = []; // Deals
affRules.push({prePart: 'http://track.in.omgpm.com/?AID=368059&PID=9170&CID=3658404&MID=304697&r=', postPart: ''});
affRules = JSON.stringify(affRules);
command = 6;
var passBack2 = [{catName: 'this category', affRules: affRules, command: command}];
passBack2 = JSON.stringify(passBack2);
prepareDeals(pidFlipkart, passBack2, command);


var csURL = returnResource("cs-buyh.png");


// var selector2 = [];
// // selector2.push({selector: '#bhWidget', attr: 'none', pos: 'after'});
// selector2.push({selector: '#AddToCart', attr: 'none', pos: 'before'});
// selector2.push({selector: '#add-to-cart', attr: 'none', pos: 'before'});
// selector2.push({selector: '.product-details .product-info:eq(0)', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();
var prod = title;
var price = getPrice();
var myPrice = price;
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<15){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
var url = "http://compare.buyhatke.com/products/" + title;
  // var imgURL = returnResource("jabong.png");
  // var imgURL2 = returnResource("watch-price1.png");
  // if($('#AddToCart').length > 0){
  //   $('#AddToCart').after('<a title="Compare price via Compare Hatke" target="_blank" href=' + url + '><img src="' + imgURL + '"></a>');
  // }
  // else if($('#add-to-cart').length > 0){
  //   $('#add-to-cart').before('<a title="Compare price via Compare Hatke" target="_blank" href=' + url + '><img style="height: 35px !important;" src="' + imgURL + '"></a>');
  // }
  // else if($('.product-details .product-info').length > 0){
  //   $('.product-details .product-info:eq(0)').after('<a title="Compare price via Compare Hatke" target="_blank" href=' + url + '><img style="height: 35px !important;" src="' + imgURL + '"></a>');
  // }

  var final2send = url.split("products/");
  var msgToSend = final2send[1] + "~*~*" + price;
////console.log(msgToSend);
msgToSend = msgToSend + "moreData=";
sendSearchMessage(msgToSend, url);

function filterResults(data, url){
  if(data && data != null && data.trim() != "" && data != "null"){
    var results2 = JSON.parse(data);
    var message = results2;
    var results = message;
    results.sort(compare);
    var origPrice = getPrice();
    origProd = getProd();
  //console.log(origProd);
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
    //console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
  }
  indexSelected = 0; notFound = 1;
  for(k=0; k< results.length; k++){
    if(results[k].score/totalLen > .5){
      indexSelected = k;
      notFound = 0;
      break;
    }
  }

  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  var posSpecs = [];
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  posSpecs.push({selector: '.faded-bg:eq(0)', attr: 'none', cssAttr: 'top', preVal: '145px', postVal: 'initial'});
  posSpecs = JSON.stringify(posSpecs);
  showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}

