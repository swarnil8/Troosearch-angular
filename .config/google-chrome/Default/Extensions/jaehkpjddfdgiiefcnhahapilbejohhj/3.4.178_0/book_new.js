var alertPosition = 31;
sendEcomm();
// var selector2 = [];
// selector2.push({selector: '.common_box .addwhslst', attr: 'none', pos: 'before'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);

function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);

  var a = $('body').text();
  if(a.split("ISBN-13:").length>1){
    isbn = parseInt($('body').text().split("ISBN-13:")[1].trim());
    ////console.log(isbn);
  }
  else {
    isbn = false;
    ////console.log("ISBN not found");
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



var url = "http://compare.buyhatke.com/products/";
var title = getProd();
var price = getPrice();
origProd = title;
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
var urlToFollow = url + title;
var imgURL = returnResource("bookadda.png");
var final2send = urlToFollow.split("products/");
msgToSend = final2send[1] + "~*~*" + price;


var a = $('body').text();
if(a.split("ISBN-13:").length>1){
  isbn = parseInt($('body').text().split("ISBN-13:")[1].trim());
    ////console.log(isbn);
  }
  else {
    isbn = false;
    ////console.log("ISBN not found");
  }

  if(isbn){
    if(urlToFollow.split("/products/").length > 1){
      urlToFollow = urlToFollow.split("/products/").join("/books/");
    }
    urlToFollow = urlToFollow + "-hatke" + isbn;
  }

  // $('.bxinnr').find('a:first').after('<a target= "blank_" title="Compare via Compare Hatke" href="' + urlToFollow + '"><img src=' + imgURL + ' title="Compare via Compare Hatke" style="margin-left: 28px;"></a>');

  if(isbn){
    msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
  }

  ////console.log("msgToSend: "+msgToSend);
  sendSearchMessage(msgToSend, urlToFollow);

  function filterResults(data, url){
    if(data && data != null && data.trim() != "" && data != "null"){
      var message = JSON.parse(data);
      var results = message;
      results.sort(compare);
      var origPrice = getPrice();
      origProd = getProd();
    ////console.log(origProd);
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
    indexSelected = 0; notFound = 0;
    for(k=0; k< results.length; k++){
      if(results[k].score/totalLen > .6){
        indexSelected = k;
        notFound = 0;
        break;
      }
    }

    if(isbn){
      indexSelected = 0;
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
