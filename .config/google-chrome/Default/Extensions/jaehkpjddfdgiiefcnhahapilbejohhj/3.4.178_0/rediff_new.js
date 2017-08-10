var alertPosition = 291;

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('commerce.rediff.com/recommendation').length>1){
    var jsonArr = [{'processDONE': "RediffShopping"}];
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

pidFlipkart = getPID();
//console.log("PID: "+pidFlipkart);
// prod = getProd();
var selector = [];
// selector.push({selector: '.div_bot_hm_categoryname', attr: 'none', pos: 'before'});
selector.push({selector: '#productform', attr: 'none', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'RediffShopping', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);

// var selector2 = [];
// selector2.push({selector: '.product_detail_top .mrp_buynow_container:eq(0)', attr: 'none', pos: 'after'});
// selector2.push({selector: '#div_buynow_btn', attr: 'none', pos: 'before'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);

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
  // var imgURL = returnResource("indtimes.png");

  // if($(".product_detail_top .mrp_buynow_container").length > 0){
  //   $('.product_detail_top .mrp_buynow_container:eq(0)').after('<a target="_blank" href=' + url + ' class="buymenow" title="Compare via Compare Hatke"><img src='+ imgURL +' alt="Compare Now"></a>');
  // }
  // else{

  //   $('#div_buynow_btn').after('<a target="_blank" href=' + url + ' class="buymenow" title="Compare via Compare Hatke"><img src='+ imgURL +' alt="Compare Now"></a>');
  // }
  var price = getPrice();
  var final2send = url.split("products/");
  var msgToSend = final2send[1] + "~*~*" + price;

  if($('.div_bread').text().split('Apparels, Accessories').length >= 2 || $('.div_bread').text().split('Watches').length >=2 || $('.div_bread').text().split('Jewellery').length >=2){
    isApparels = true;
    msgToSend = msgToSend + "&moreData=null";
  }
  else {
    isApparels = false;
  }
  sendSearchMessage(msgToSend, url);

  function filterResults(data, url){
    if(data && data != null && data.trim() != "" && data != "null"){
      var results2 = JSON.parse(data);
      var message = results2;
      var results = message;
      results.sort(compare);
      origProd = getProd();
      var origPrice = getPrice();
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
