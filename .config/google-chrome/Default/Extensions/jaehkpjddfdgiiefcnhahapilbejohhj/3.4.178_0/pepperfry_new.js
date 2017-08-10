var alertPosition = 333;

function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 11, doNothing, []);
  }
}

sendTrack();

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('pepperfry.com/checkout').length>1){
    var jsonArr = [{'processDONE': "Pepperfry"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

reportPurchase();



//Where the graph will be placed

pidFlipkart = getPID();
//console.log("PID: "+pidFlipkart);
prod = getProd();
var selector = [];
selector.push({selector: '.vip_share_metabox', attr: 'none', pos: 'before'});
selector.push({selector: '.fur_expert_comment_wrap', attr: 'none', pos: 'before'});
selector.push({selector: '.vip-middle-section:eq(0)', attr: 'none', pos: 'before'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'Pepperfry', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);



// var selector2 = [];
// selector2.push({selector: '.pdpbuynottab', attr: 'none', pos: 'before'});
// selector2.push({selector: '.vip_price_block_2', attr: 'none', pos: 'after'});
// selector2.push({selector: '.vip_buynow_wrap:eq(0)', attr: 'none', pos: 'before'});
// selector2.push({selector: '.vip-buy-now:eq(0)', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();

var url = "http://compare.buyhatke.com/products/";
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
var urlToFollow = url + title;
  // var imgURL2 = returnResource("watch-price1.png");
  // if($('.vip_button_block_2 input:eq(0)').length > 0){
  //   $('.vip_button_block_2 input:eq(0)').after('<a target="_blank" href="' + urlToFollow + '"><input type="button" class="vip_buynow_wrap" style="padding: 10px; color: #fff; font-size: 20px;" value="Compare Now"></a>');
  // }
  // else if($('.vip_buynow_wrap').length > 0){
  //   $('.vip_buynow_wrap:eq(0)').after('<a target="_blank" href="' + urlToFollow + '"><input type="button" class="vip_buynow_wrap" style="padding: 10px; color: #fff; font-size: 20px;" value="Compare Now"></a>');
  // }
  // else if($('.vip-buy-now').length > 0){
  //   $('.vip-buy-now:eq(0)').after('<a target="_blank" href="' + urlToFollow + '"><input type="button" style="padding: 10px 16px;  font-size: 14px;background-color: #58A809;color: #fff;border: none;text-transform: uppercase;" value="Compare Now"></a>');
  // }
  var price = getPrice();
  var final2send = urlToFollow.split("products/");
  var msgToSend = final2send[1] + "~*~*" + price;
  sendSearchMessage(msgToSend, urlToFollow); // commenting out bcoz of CSS issues 


  function filterResults(data, url){
    if(data && data != null && data.trim() != "" && data != "null"){
      var results2 = JSON.parse(data);
      var message = results2;
      var results = message;
      results.sort(compare);
      origProd = getProd();
      var origPrice = price;
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
  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  var posSpecs = [];
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);
  showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}