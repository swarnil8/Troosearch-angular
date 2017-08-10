var alertPosition = 1830;
// function reportPurchase(){
//   var curURL = window.location.href;
//   if(curURL.split('nykaa.com/cart').length>1){
//     var jsonArr = [{'processDONE': "Jabong"}];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(0, jsonArr, 0, doNothing, []);
//   }
// }

// reportPurchase();

// function sendTrack(){
//   var prod = getProd();
//   var webID = getCurrentPosition(window.location.href);
//   var url = window.location.href;
//   var prToSend = getPrice();
//   url = encodeURIComponent(url);
//   prod = encodeURIComponent(prod);
//   if(prod!=""){
//     var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0, 'price': prToSend }];
//     jsonArr = JSON.stringify(jsonArr);
//     sendMessage(1, jsonArr, 11, doNothing, []);
//   }
// }

// sendTrack();

pidFlipkart = getPID();
prod = getProd();
var selector = [];
selector.push({selector: '.product-essential form:eq(0)', attr: 'none', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// // $('.product-detail-sec').css("z-index", 1001);
// // $('.product-detail-sec').css("z-index", 1001);
// var passBack1 = [{title: prod, siteName: 'Nykaa', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);

// var selector2 = [];
// selector2.push({selector: '.product-essential .add-to-bag:eq(0)', attr: 'none', pos: 'before'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();
var prod = title;
var price = getPrice();
var myPrice = price;
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
var url = "http://compare.buyhatke.com/products/" + title;
// var imgURL = returnResource("jabong.png");
// var imgURL2 = returnResource("watch-price1.png");
// if($('.add_to_bag_button').length > 0){
//   $('.add_to_bag_button:eq(0)').after('<a title="Compare price via Compare Hatke" target="_blank" href="'+url+'" style="color: #fff;font-size: 18px;font-weight: 700;padding: 2px 54px;background: #FC5294;margin-top: 2px;">COMPARE</a>');
// }
// else if($('.product-essential .add-to-bag').length > 0){
//   $('.product-essential .add-to-bag:eq(0)').after('<a title="Compare price via Compare Hatke" target="_blank" href=' + url + '><img src="' + imgURL + '"></a>');
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
    posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '65px', postVal: '0px'});
    posSpecs.push({selector: '#header_inner', attr: 'none', cssAttr: 'display', preVal: 'none', postVal: 'block'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}

