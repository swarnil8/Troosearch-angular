
var alertPosition = 51;


function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  var a = $('body').text();
  if(a.split("ISBN:").length>1){
    isbn = parseInt(a.split("ISBN:")[1].trim());
  }
  else {
    isbn = false;
  }
  if(isbn){
    var jsonArr = [{'prod': isbn, 'url': url, 'webID': webID, 'isBook': 1 }];
  }
  else if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
  }
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 11, doNothing, []);
}

sendTrack();
//Where the graph will be placed
pidFlipkart = getPID();
// prod = getProd();
var selector = [];
selector.push({selector: '#product-details', attr: 'none', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// // $('#container').css("z-index", -1);
// var passBack1 = [{title: prod, siteName: 'Landmark', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);

// var selector2 = [];
// selector2.push({selector: '.pricebox:eq(0)', attr: 'none', pos: 'before'});
// selector2.push({selector: '.price-box:eq(0)', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();
var url = "http://compare.buyhatke.com/products/";
origProd = title;
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
price = getPrice();
var urlToFollow = url + title;
  // var imgURL2 = returnResource("watch-price1.png");
  // var imgURL = returnResource("landmark.png");


  var final2send = urlToFollow.split("products/");
  var msgToSend = final2send[1] + "~*~*" + price;

  var a = $('body').text();
  if(a.split("ISBN:").length>1){
    isbn = parseInt(a.split("ISBN:")[1].trim());
  }
  else {
    isbn = false;
  }
  if(isbn){
    urlToFollow = "http://compare.buyhatke.com/books/books-price-comparison";
    urlToFollow = urlToFollow.trim() +  "-hatke" + isbn;
  }
  // $('.buy').after('<a title="Compare via Compare Hatke" target="_blank" href=' + urlToFollow + '><img src=' + imgURL + ' title="Compare via Compare Hatke"></a>');
  if(isbn){
    msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
  }
//console.log("msgToSend: "+msgToSend);
sendSearchMessage(msgToSend, urlToFollow);

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
  indexSelected = 0;
  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  var posSpecs = [];
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);
  showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}
