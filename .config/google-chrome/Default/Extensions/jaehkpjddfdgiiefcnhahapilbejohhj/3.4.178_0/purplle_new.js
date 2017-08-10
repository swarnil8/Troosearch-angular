var alertPosition = 900;

if($('#image_modal').length>0){
  $('#image_modal').next('.clearfix').after("<div id='mySeparator'></div>");
}

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('checkoutsummary').length>1){
    var jsonArr = [{'processDONE': "Purplle"}];
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
  if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 11, doNothing, []);
  }
}

sendTrack();

//Where the graph will be placed
var curr_link = window.location.href;
if(curr_link.split("/product/").length > 1){
//   pidFlipkart = getPID();
//   //console.log("PID: "+pidFlipkart);
//   prod = getProd();
  var selector = [];
  selector.push({selector: '#pc-div', attr: 'none', pos: 'before'});
  selector.push({selector: '#view-sim-div', attr: 'none', pos: 'before'});
  selector.push({selector: '#mySeparator', attr: 'none', pos: 'after'});
  selector.push({selector: '#footer-div', attr: 'none', pos: 'before'});

  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
//   var passBack1 = [{title: prod, siteName: 'Purplle', price: getPrice()}];
//   passBack1 = JSON.stringify(passBack1);
//   prepareGraph(pidFlipkart, passBack1);

//   var selector2 = [];
//   selector2.push({selector: '#btn-add-cart', attr: 'none', pos: 'before'});
//   selector2.push({selector: '#addtowishlist', attr: 'none', pos: 'before'});
//   selector2.push({selector: '.rate-share:eq(0)', attr: 'none', pos: 'before'});
//   selector2.push({selector: '.price-box', attr: 'none', pos: 'after'});
//   selector2 = JSON.stringify(selector2);
//   setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
}
var price = getPrice();
var name = getProd();
origProd = name;
name = name.split("(")[0];
var nameS = name.split(" ");
if(nameS.length<4){
  name = nameS.join("-");
}
else {
  name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3];
}
var url = "http://compare.buyhatke.com/products/" + name;
// var imgURL2 = returnResource("watch-price1.png");
// if(curr_link.split("/product/").length > 1){

//   if($('.product-detail-page').length > 0){
//     if($('.btn-cart').length>0){
//       $('.btn-cart').after('<a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><div class="buy"><button class="btn btn-cart btn-sm" style="font-size:14px; margin-top:2px;"><span class="pdp-sprite icon-plus"></span>Compare Prices</button></div></a>');
//     }
//   }
//   else if($('#btn-add-cart').length>0){
//     $('#btn-add-cart').before('<a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><div class="buy"><button class="btn btn-cart btn-sm" style="font-size:15px;background: #EEDDE7; color:#A378A5;border-radius: 5px;margin-top:2px;"><span class="pdp-sprite icon-plus"></span>Compare Prices</button></div></a>');
//   }
//   else if($('#addtowishlist').length>0){
//     $('#addtowishlist').before('<a target="_blank" title="Compare via Compare Hatke" href="' + url + '" ><div class="buy"><button class="btn btn-cart btn-sm" style="font-size:15px;background: #EEDDE7; color:#A378A5;border-radius: 5px;margin-top:2px;"><span class="pdp-sprite icon-plus"></span>Compare Prices</button></div></a>');
//   }
// }
var final2send = url.split("products/");
var msgToSend = final2send[1] + "~*~*" + price;
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
  if(curr_link.split("/product/").length > 1){
    var posResults = [];
    posResults.push({selector: 'body', attr: 'none', pos: 'before'});
    posResults = JSON.stringify(posResults);
    var posSpecs = [];
    posSpecs.push({selector: '#navbartop', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    posSpecs.push({selector: '#headertop', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}
}
