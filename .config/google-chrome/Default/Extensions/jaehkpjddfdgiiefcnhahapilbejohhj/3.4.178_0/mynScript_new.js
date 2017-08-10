current_pid = getPID();
var msgToSend = "";
function checkURL(){
  var url = window.location.href;
  var now_pid = getPID();
  if(current_pid != now_pid){
    current_pid = now_pid;
    // console.log("current_pid: "+current_pid);
    // console.log("now_pid: "+now_pid);
    // $("#containerBHMain").remove();
    // $("#bhWidget").remove();
    // $("#detailOutWrap").remove();
    // $("#hatke-comp-btn").remove();
    $(".hk-yellow-bar-main-div").css("display", "none");
    $(".hk-main-graph").css("display", "none");
    $(".hk-main-watch").css("display", "none");
    mynCall();
    finalData();
    initiateNewUI();
  }
}

finalData();
window.setInterval(function(){ checkURL(); }, 800);
var imgLogo = chrome.extension.getURL("logo.png");
var dateData = "today";


var csURL = returnResource("cs-buyh.png");
var alertPosition = 7;
function mynCall(){
  var jsonArr = [{'visitedEcomm': 111}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []); 
  // console.log("mynCall was called");
  if($('.coupon-offer-text').length > 0){
    $('.coupon-offer-text').click();
  }
  reportPurchase();

  if(document.getElementsByClassName('summary').length>0 || document.getElementsByClassName('pdp-details').length>0){
    sendTrack();

    pidFlipkart = getPID();
    // prod = getProd();
    var selector = [];
    selector.push({selector: '.more-info', attr: 'none', pos: 'before'});
    selector.push({selector: '.pdpv1-look-cont', attr: 'none', pos: 'after'});
    selector.push({selector: '#mk-matchmaker', attr: 'none', pos: 'after'});
    selector.push({selector: '.pdp-description-container:eq(0)', attr: 'none', pos: 'after'});
    selector.push({selector: '.similar-container:eq(0)', attr: 'none', pos: 'before'});
    selector = JSON.stringify(selector);
    height = "1050px";
    var passBack = [{selectors: selector, height: height}];
    passBack = JSON.stringify(passBack);
    addGraphBase(passBack);
    // var passBack1 = [{title: prod, siteName: 'Myntra'}];
    // passBack1 = JSON.stringify(passBack1);
    // prepareGraph(pidFlipkart, passBack1);

    var affRules = []; 
    affRules.push({prePart: 'http://track.in.omgpm.com/?AID=368059&PID=9640&CID=3658388&MID=349836&r=', postPart: ''});
    affRules = JSON.stringify(affRules);
    command = 5;
    var passBack2 = [{catName: 'this category', affRules: affRules, command: command}];
    passBack2 = JSON.stringify(passBack2);
    prepareDeals(pidFlipkart, passBack2, command);

    // var selector2 = [];
    // selector2.push({selector: '.info .pdp-buy-now-btn', attr: 'parent', pos: 'after'});
    // selector2.push({selector: '.pdp-price-info:eq(0)', attr: 'none', pos: 'after'});
    // selector2.push({selector: '.pdp-selling-price:eq(0)', attr: 'none', pos: 'after'});
    // selector2 = JSON.stringify(selector2);
    // setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
    var title = getProd();
    var url = "http://compare.buyhatke.com/products/";
    origProd = title;
    title = title.split("(")[0];
    var titleS = title.split(" ");
    if(titleS.length<15){
      title = titleS.join("-");
    }
    else {
      title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
    }
    var urlToFollow = url + title;
    // var imgURL2 = returnResource("watch-price1.png");
    // $("#hatke-comp-btn").remove();
    // if($('.buy').length>0 && document.getElementsByClassName('summary').length>0){
    //   $('.buy:eq(0)').after('<a target="_blank" id="hatke-comp-btn" title="Compare via Compare Hatke" href="' + urlToFollow + '" ><div class="buy"><button class="button big fill"><span class="pdp-sprite icon-plus"></span>Compare Prices</button></div></a>');
    // }
    // else if($('#add-button-group') && document.getElementsByClassName('summary').length>0){
    //   $('#add-button-group').find('button:first').after('<a target="_blank" id="hatke-comp-btn" title="Compare via Compare Hatke" href="' + urlToFollow + '" ><button class="mk-add-to-cart2 btn primary-btn">Compare <span class="proceed-icon"></span></button></a>');
    // }
    // else if(document.getElementsByClassName('summary').length>0){
    //   $('.mk-zoom-hide').find('a:first').after('<a target="blank_" href="' + urlToFollow + '" id="hatke-comp-btn" title="Compare via Compare Hatke" class="combo-overlay-btn btn normal-btn" style="height:25px" data-styleid="74093">COMPARE NOW!</a>');
    // }
    // else if(document.getElementsByClassName('pdp-price-info').length>0){
    //   $('.pdp-price-info:eq(0)').after('<a target="blank_" href="' + urlToFollow + '" id="hatke-comp-btn" title="Compare via Compare Hatke" class="combo-overlay-btn btn normal-btn" style="height:25px;background: #20bd99;font-size: 12px;color: #fff;padding: 11px 28px;border-radius: 2px;font-weight: 500;" data-styleid="74093">COMPARE NOW</a>');
    // }
    // else if(document.getElementsByClassName('pdp-selling-price').length>0){
    //   $('.pdp-selling-price:eq(0)').after('<a target="blank_" href="' + urlToFollow + '" id="hatke-comp-btn" title="Compare via Compare Hatke" class="combo-overlay-btn btn normal-btn" style="height:25px;background: #20bd99;font-size: 12px;color: #fff;padding: 11px 28px;border-radius: 2px;font-weight: 500;" data-styleid="74093">COMPARE NOW</a>');
    // }
    myPrice = getPrice();
    price = getPrice();
    origPrice = price;
    var final2send = urlToFollow.split("products/");
    msgToSend = final2send[1] + "~*~*" + price;
    msgToSend = msgToSend + "moreData=";
    sendSearchMessage(msgToSend, urlToFollow);
  }
}



function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('checkout').length>1){
    var jsonArr = [{'processDONE': "Myntra"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }

}


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
    if(posResults.trim() != ""){
      posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
      posSpecs.push({selector: '.desktop-container:eq(0)', attr: 'none', cssAttr: 'top', preVal: '45px', postVal: '0px'});
      posSpecs = JSON.stringify(posSpecs);
      showResultsNew(results, indexSelected, posSpecs, posResults, url);
    }
  }
}

setTimeout(function(){
  mynCall();
}, 500);
