var alertPosition = 1850;

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

pidFlipkart = getPID();
//console.log("getpid is "+pidFlipkart);
prod = getProd();
if($("#containerBHMain").length == 0){
  var selector = [];
  selector.push({selector: '.pdp-more__info:eq(0)', attr: 'none', pos: 'before'});
//selector.push({selector: '.pj2_tabs_bg', attr: 'none', pos: 'before'});
selector = JSON.stringify(selector);
var passBack = [{selectors: selector}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
}
// var passBack1 = [{title: prod, siteName: 'Abof', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// //console.log(passBack1);
// prepareGraph(pidFlipkart, passBack1);

// var imgLogo = returnResource("logo.png");
// var selector2 = [];
// selector2.push({selector: '#addToBag', attr: 'none', pos: 'after'});
// selector2.push({selector: '.style-tip-container:eq(0)', attr: 'none', pos: 'before'});
// //selector2.push({selector: '#buyNow', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var myPrice=getPrice();
var price = myPrice;
// var imgURL3 = returnResource("watch-price1.png");
var title=getProd();
var name=title;
name = name.split("(")[0];
origProd = name;
var nameS = name.split(" ");
if(nameS.length<5){
  name = nameS.join("-");
}
else {
  name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;
// var imgURL = returnResource("hs18.png");
// var imgURL2 = returnResource("watch-price1.png");
// $('#addToBag').after('<div id="btnBuyNowC2"><a target="_blank" href="' + url + '" id="btnBuyNow2" class="btn " style="background-color: transparent;"><img src="' + imgURL + '"></a></div>');
var final2send = url.split("products/");
msgToSend = final2send[1] + "~*~*" + price;
//console.log("msg to send"+msgToSend);
//console.log(name);
sendSearchMessage(msgToSend, url);

function filterResults(data, url){
  if(data && data != null && data.trim() != "" && data != "null"){
    var results2 = JSON.parse(data);
    var message = results2;
    var results =message;
    results.sort(compare);
    var origPrice = price;
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
posSpecs.push({selector: 'html', attr: 'none', cssAttr: 'margin-top', preVal: '40px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);
showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}