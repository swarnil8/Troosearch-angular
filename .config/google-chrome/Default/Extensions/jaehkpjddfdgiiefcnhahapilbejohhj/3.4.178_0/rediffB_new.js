var alertPosition = 1037;
function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('commerce.rediff.com/commerce').length>1){
    var jsonArr = [{'processDONE': "rediffbooks"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

reportPurchase();

function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);

  var a = $('body').text();
  if(a.split("ISBN:").length>1){
    isbn = parseInt($('body').text().split("ISBN:")[1].trim());
    //console.log(isbn);
  }
  else {
    isbn = false;
    //console.log("ISBN not found");
  }

  if(isbn){
    var jsonArr = [{'prod': isbn, 'url': url, 'webID': webID, 'isBook': 1 }];
  }
  else if(prod != ""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];

  }
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 11, doNothing, []);
  
}

sendTrack();

// if($('.proddetailinforight').length > 0){
// //Where the graph will be placed
pidFlipkart = getPID();
//   //console.log("PID: "+pidFlipkart);
//   prod = getProd();
  var selector = [];
  selector.push({selector: '#home_page', attr: 'none', pos: 'after'});
  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
//   var passBack1 = [{title: prod, siteName: 'rediffbooks', price: getPrice()}];
//   passBack1 = JSON.stringify(passBack1);
//   prepareGraph(pidFlipkart, passBack1);
// }
// var selector2 = [];
// selector2.push({selector: '.btn-holder', attr: 'none', pos: 'before'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);


var url = "http://compare.buyhatke.com/products/";
var title = getProd();
origProd = title;
title = title.split(" ");
title = title.join("-");
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
var title2 = title;
var urlToFollow = url + title2;
var price = getPrice();

var imgURL = returnResource("rediffbooks.png");


var final2send = urlToFollow.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;

var a = $('body').text();
if(a.split("ISBN:").length>1){
  isbn = parseInt($('body').text().split("ISBN:")[1].trim());
    //console.log(isbn);
  }
  else {
    isbn = false;
    //console.log("ISBN not found");
  }
  if(isbn){
    if(urlToFollow.split("/products/").length > 1){
      urlToFollow = urlToFollow.split("/products/").join("/books/");
    }
    urlToFollow = urlToFollow + "-hatke" + isbn;
  }
  // $('.btn-holder').find('a:first').after('<a target= "blank_" title="Compare via Compare Hatke" href="' + urlToFollow + '"><img src=' + imgURL + ' title="Compare via Compare Hatke" style="margin-left: 2px; margin-top: 2px;"></a>');

  if(isbn){
    msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
  }

  sendSearchMessage(msgToSend, urlToFollow);

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
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '43px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);
  showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}


