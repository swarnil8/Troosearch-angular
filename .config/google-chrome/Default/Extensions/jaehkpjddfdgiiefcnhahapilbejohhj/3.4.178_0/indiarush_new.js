$ = jQuery.noConflict();
var alertPosition = 62;

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
if($("#containerBHMain").length == 0){
  var selector = [];
  selector.push({selector: '.product-essential', attr: 'none', pos: 'after'});
  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
}
// var passBack1 = [{title: prod, siteName: 'IndiaRush', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);


// var selector2 = [];
// selector2.push({selector: '#regular_parent_id', attr: 'none', pos: 'before'});
// selector2.push({selector: '.product-view .price-box', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);


var name = getProd();
origProd = name;
name = name.split("(")[0];
var nameS = name.split(" ");
if(nameS.length<5){
  name = nameS.join("-");
}
else {
  name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;
var myPrice = getPrice();
price = parseFloat(myPrice);
origPrice = price;
var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;
msgToSend = msgToSend + "&moreData=";
sendSearchMessage(msgToSend, url);


  // if($('.product-view .add-to-cart').length>0){
  //   $('.product-view .add-to-cart:eq(0)').after('<a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><div class="buy orange-button btn-cart" style="padding-top: 15px;"><span><span class="pdp-sprite icon-plus"></span>Compare Prices</span></div></a>');
  // }
  // else if($('.product-view .shipping-days').length>0){
  //   $('.product-view .shipping-days:eq(0)').before('<a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><div class="buy orange-button btn-cart" style="padding-bottom: 25px;"><span><span class="pdp-sprite icon-plus"></span>Compare Prices</span></div></a>');
  // }

  
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
  indexSelected = 0; notFound = 0;
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



