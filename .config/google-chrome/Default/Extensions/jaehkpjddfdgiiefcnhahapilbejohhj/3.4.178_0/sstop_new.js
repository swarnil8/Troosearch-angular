  alertPosition = 45;

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
//Where the graph will be placed
pidFlipkart = getPID();
//console.log("PID: "+pidFlipkart);
prod = getProd();
var selector = [];
if(prod != "" && prod != undefined){
  selector.push({selector: '.product_details_main:eq(0)', attr: 'none', pos: 'after'});
  selector.push({selector: '.mnProductBox', attr: 'none', pos: 'after'});
  selector = JSON.stringify(selector);
  var passBack = [{selectors: selector}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
}
// var passBack1 = [{title: prod, siteName: 'ShoppersStop', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);
// }


// var selector2 = [];
// selector2.push({selector: '.product_details_main .addtocart-component:eq(0)', attr: 'none', pos: 'after'});
// selector2.push({selector: '.mnProductBox .priceCombo:eq(0)', attr: 'none', pos: 'before'});
// selector2.push({selector: '.mnProductBox .price-box:eq(0)', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// $('img').css("width","auto");
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);

var title = getProd();
var url = "http://compare.buyhatke.com/products/";
price = getPrice();
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
  // var imgURL = returnResource("sstop.png");
  // if($('.mnProductBox .add-to-cart').length > 0){
  //   $('.mnProductBox .add-to-cart:eq(0)').after('<a target="_blank" href=' + urlToFollow + '><img src='+ imgURL +' alt="Compare via Compare Hatke"></a>');
  // }
  // else if($('.product_details_main .addtocart-component').length > 0){
  //   $('.product_details_main .addtocart-component:eq(0)').after('<a target="_blank" href=' + urlToFollow + '><img src='+ imgURL +' alt="Compare via Compare Hatke"></a>');
  // }

  var final2send = urlToFollow.split("products/");
  var msgToSend = final2send[1] + "~*~*" + price + "&moreData=";
  sendSearchMessage(msgToSend, urlToFollow);
  $('img').css("width","auto");

  function filterResults(data, url){
    if(data && data != null && data.trim() != "" && data != "null"){
      var results2 = JSON.parse(data);
      var message = results2;
      var results = message;
      results.sort(compare);
      origProd = getProd();
      var origPrice = getPrice();
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
