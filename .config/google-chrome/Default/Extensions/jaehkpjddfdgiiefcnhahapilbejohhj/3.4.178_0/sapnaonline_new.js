var alertPosition = 451;

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('ajio.com/cart').length>1){
    var jsonArr = [{'processDONE': "Ajio"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

reportPurchase();

pidFlipkart = getPID();
var selector = [];
selector.push({selector: '#product-main-primary', attr: 'none', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);

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
var url = "https://compare.buyhatke.com/products/";
if(title.split(" ").length >= 5){
  title = title.split(" ");
  title = title[0]+" "+title[1]+" "+title[2]+" "+title[3]+" "+title[4];
}
var urlToFollow = url + title;
urlToFollow = urlToFollow.split(" ").join("-");
urlToFollow = urlToFollow.split("(");
urlToFollow = urlToFollow[0];
urlToFollow = urlToFollow.split("'s");
urlToFollow = urlToFollow.join("");
msgToSend = "";
var final2send = urlToFollow.split("products/");
msgToSend = final2send[1] + "~*~*" + myPrice;
var str2Send = "";
msgToSend = msgToSend + "moreData=" + str2Send;
var pid = getPID();
var isbn_found = pid.split("-");
isbn_found = isbn_found[isbn_found.length-1].trim();
if(isbn_found[0]+isbn_found[1]+isbn_found[2] == "978" && isbn_found.length == 13){
  isbn = isbn_found;
}
else{
  isbn = false;
}
if(isbn){
  if(urlToFollow.split("/products/").length > 1){
    urlToFollow = urlToFollow.split("/products/").join("/books/");
  }
  urlToFollow = urlToFollow + "-hatke" + isbn;
  msgToSend = msgToSend + "isbn=" + isbn;
}

sendSearchMessage(msgToSend, urlToFollow);

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
    posSpecs.push({selector: '#layout-header-area', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}

