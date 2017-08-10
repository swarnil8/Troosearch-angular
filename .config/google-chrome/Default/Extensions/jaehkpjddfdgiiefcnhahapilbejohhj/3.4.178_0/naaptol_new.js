var alertPosition = 441;

function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  var url = window.location.href;
  if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 11, doNothing, []);
  }
}

sendTrack();

//Where the graph will be placed

var cur_l = window.location.href;
if(cur_l.split("#").length > 1){
  cur_l = cur_l.split("#");
  cur_l = cur_l[0];
}
if(cur_l.split("?").length > 1){
  cur_l = cur_l.split("?");
  cur_l = cur_l[0];
}
if(cur_l.split("&").length > 1){
  cur_l = cur_l.split("&");
  cur_l = cur_l[0];
}
pidFlipkart = cur_l;
//console.log("PID: "+pidFlipkart);
// prod = getProd();
var selector = [];
selector.push({selector: '#container .product_Info', attr: 'none', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'Naaptol'}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);



// var selector2 = [];
// selector2.push({selector: '.pro_BuyAction', attr: 'none', pos: 'before'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);

var name = getProd();
name = name.split("(")[0];
origProd = name;
var nameS = name.split(" ");
if(nameS.length<4){
  name = nameS.join("-");
}
else {
  name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3];
}
var url = "http://compare.buyhatke.com/products/" + name;
var imgURL = returnResource("naaptol.png");

price = getPrice();
var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;

if($('.bradCrumbDiv').text().split('Footwear,Travel & Bags').length >=2 || $('.bradCrumbDiv').text().split('Clothing & Opticals').length >= 2 || $('.bradCrumbDiv').text().split('Jewellery & Watches').length >=2 ){
  isApparels = true;
  msgToSend = msgToSend + "&moreData=null";
}
else {
  isApparels = false;
}

var a = $('body').text();
if(a.split("ISBN-13").length>1){
  isbn = parseInt(a.split("ISBN-13")[1].trim());
  //console.log(isbn);
}
else {
  isbn = false;
  //console.log("ISBN not found");
}
if(isbn){
  if(url.split("/products/").length > 1){
    url = url.split("/products/").join("/books/");
  }
  url = url + "-hatke" + isbn;
}
// $('.pro_BuyAction').after('<a target="_blank" href=' + url + '><img style="margin-left:-3px;" src=' + imgURL +' title="Compare via Compare Hatke"></a>');

if(isbn){
  msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
}
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