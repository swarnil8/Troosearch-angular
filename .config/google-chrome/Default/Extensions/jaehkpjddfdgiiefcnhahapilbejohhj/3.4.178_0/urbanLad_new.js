var alertPosition = 1827;
var current_url = getPID();
function checkURL(){
  var url = getPID();
  console.log(url + " " + current_url);
  if(current_url != url){
    console.log("Successful");
    initiateNewUI();
    url = getPID();
    current_url = url;
  }
}
window.setInterval(function(){ checkURL(); }, 800);

pidFlipkart = getPID();
prod = getProd();
var selector = [];
if($('#product-show').length > 0 || $('#mproduct-show').length > 0){
  selector.push({selector: '#product-show .productdetails:eq(0)', attr: 'none', pos: 'after'});
  selector.push({selector: '#mproduct-show .productdetails:eq(0)', attr: 'none', pos: 'after'});
  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
}
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
var url = "http://compare.buyhatke.com/products/" + title;
var final2send = url.split("products/");
msgToSend = final2send[1] + "~*~*" + price;
msgToSend = msgToSend + "moreData=";
sendSearchMessage(msgToSend, url);

function filterResults(data, url){
  if(data && data != null && data.trim() != "" && data != "null"){
    var results = JSON.parse(data);
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
    posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '65px', postVal: '0px'});
    posSpecs.push({selector: '#header_inner', attr: 'none', cssAttr: 'display', preVal: 'none', postVal: 'block'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}

