alertPosition = 99;
function addTag(url){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = url;
  httpq4.open("GET", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
      }
    }
  };
  httpq4.send();
}

function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);

  var a = $('body').text();
  if(a.split("EAN:").length>1){
    isbn = parseInt(a.split("EAN:")[1].trim());
    //console.log(isbn);
  }
  else {
    isbn = false;
    //console.log("ISBN not found");
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

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('infibeam.com/ShowCart.action').length>1){
    var jsonArr = [{'processDONE': "Infibeam"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
    addTag("http://www.infibeam.com/?trackId=buyh");
  }
}

reportPurchase();
// //Where the graph will be placed

// pidFlipkart = getPID();
// //console.log("PID: "+pidFlipkart);
// prod = getProd();
var selector = [];
selector.push({selector: '#product-overview', attr: 'parent', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'Infibeam', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);


// var selector2 = [];
// selector2.push({selector: '#pricing_summary', attr: 'none', pos: 'after'});
// selector2.push({selector: '#priceDiv', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// sel_infi = selector2;
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var imgURL2 = returnResource("watch-price1.png");
var title = getProd();
title = title.split("(");
title = title[0];
title = title.split("/");
title = title.join("");
title = title.split("'s");
title = title.join("");
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
  // var urlToFollow = url + title;
  origProd = title;
  var url = "http://compare.buyhatke.com/products/";
  title = title.split(" ");
  title = title.join("-");
  var title2 = title;
  var urlToFollow = (title2);
  urlToFollow = url + urlToFollow;
  
  myPrice = getPrice();

  var final2send = urlToFollow.split("products/");
  var msgToSend = final2send[1] + "~*~*" + myPrice;

  if($('.breadcrumb').text().split('Fashion').length >= 2){
    isApparel = false;
    msgToSend = msgToSend + "&moreData=null";
  }
  else {
    isApparel = false;
  }


  var a = $('body').text();
  if(a.split("EAN:").length>1){
    isbn = parseInt(a.split("EAN:")[1].trim());
    //console.log(isbn);
  }
  else {
    isbn = false;
    //console.log("ISBN not found");
  }

  if(isbn){
    if(urlToFollow.split("/products/").length > 1){
      urlToFollow = urlToFollow.split("/products/").join("/books/");
    }
    urlToFollow = urlToFollow + "-hatke" + isbn;
  }
  var myInp = document.createElement('img');
  var myParent = document.createElement('a');
  myParent.setAttribute('href', urlToFollow);
  myParent.setAttribute('target', '_blank');
  var imgURL = returnResource("comp_infi.png");
  // myParent.innerHTML = "<img src='" + imgURL + "' alt='Compare via Compare Hatke' title='Compare via Compare Hatke'>";
  if($('#ib_actions').length > 0){
    document.getElementById("ib_actions").parentNode.appendChild(myParent);
  }
  else if($('#price_table').length > 0){
    document.getElementById("price_table").parentNode.appendChild(myParent);
  }

  if(isbn){
    msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
  }


  if(getBreadCrumb().split("*~Mobiles*~").length > 1){
    sendSearchMessageNew(getProd(), 0, urlToFollow);
  }
  else if(getBreadCrumb().split("*~Laptops*~").length > 1){
    getDetails(urlToFollow);
  }
  else {
    sendSearchMessage(msgToSend, urlToFollow);
  }
  

  function filterResults(data, url){
    if(data && data != null && data.trim() != "" && data != "null"){
      var results2 = JSON.parse(data);
      var message = results2;
      var results = message;
      results.sort(compare);
      var origPrice = getPrice();
      var origProd = getProd();
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
      posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '38px', postVal: '0px'});
      posSpecs = JSON.stringify(posSpecs);
      showResultsNew(results, indexSelected, posSpecs, posResults, url);
    }
  }
  pid_current = "";

  function getCurrentPID(){
    setTimeout(function(){ getCurrentPID(); }, 5000);

    if(pid_current == 'undefined' || pid_current == ""){
      pid_current = getPID();
    }
    else{
      var pid_save = getPID();
      if(pid_save != pid_current){
        pid_current = pid_save;
      // watchPriceSpcl(pid_save);
      flagToDisp = 0;
      initiateNewUI();
    }
  }
}
getCurrentPID();

function prepareGraphInfi(){
  if($("#containerBHMain").length > 0){
    $("#containerBHMain").remove();
  }
  pidFlipkart = getPID();
  prod = getProd();
  var selector = [];
  selector.push({selector: '#product-overview', attr: 'parent', pos: 'after'});
  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
  var passBack1 = [{title: prod, siteName: 'Infibeam', price: getPrice()}];
  passBack1 = JSON.stringify(passBack1);
  prepareGraph(pidFlipkart, passBack1);
  return;
}
function watchPriceSpcl(pid_save){
  var watchedFlag = 0;
  // console.log("watchListArray: "+JSON.stringify(watchListArray));
  for(l=0;l<watchListArray.length;l++){
    if(watchListArray[l].position == 99){
      check_watched = returnPID(watchListArray[l].link);
      // console.log("pid_save: "+pid_save);
      // console.log("check_watched: "+check_watched);
      if(pid_save == check_watched){
        watchedFlag = 1;
        myPrice = getPrice();
        // console.log("myPrice: "+myPrice);
        if(myPrice!=0){
          watchListArray[l].cur_price = myPrice;
        }
        if(watchListArray[l].price_added >= watchListArray[l].cur_price){
         clsToUse = "dec-hatke";
         diff = watchListArray[l].price_added - watchListArray[l].cur_price;
       }
       else {
         clsToUse = "inc-hatke";
         diff = watchListArray[l].cur_price - watchListArray[l].price_added;
       }
       $('#bhWidget').html('<div class="pricealert_hatke"><div class="price_hatke-wrap"><div class="price_hatke-initiated"><span class="price_hatke-type">Set Price:</span><span class="price_hatke-price"><img src="http://compare.buyhatke.com/images/rupeeK.png">' + watchListArray[l].price_added + '</span></div><div class="price_hatke-difference"><span class="price_hatke-type">Price Change:</span><span class="price_hatke-price ' + clsToUse + '"><img class="dec_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeG.png"><img class="inc_rupee-hatke" src="http://compare.buyhatke.com/images/rupeeR.png">' + diff + '<div class="inc_dec-hatke-wrap"><img class="inc_dec-hatke" src="http://compare.buyhatke.com/images/price_change1.png"></div></span></div><a href="javascript:void();" id="removeMe2">Remove</a></div></div><div id="addWatchList"></div>');

       var button = document.getElementById("removeMe2");
       button.addEventListener("click", function(){
        removeAlert();
        document.getElementById('bhWidget').innerHTML = '<div class="line fk-font-12" style="margin-bottom: 4px;">Thank You ! We appreciate your motive to save energy :)</div>';
      }, false);

     }
     else if(watchedFlag == 0){
      // console.log("I am here");
      var imgURL2 = returnResource("watch-price1.png");
      $('#bhWidget').html('<a id="addWatchList" style="margin-top: 4px;" alt="Add to Watch List" title="Add to BuyHatke Watch List and get notifications on price drop" href="javascript:void();" class="fk-inline-block buy-btn fksk-buy-btn"><img style="margin-left:-12px;" src=' + imgURL2 +'></a>');
      var button = document.getElementById("addWatchList");
      if(button!=null){
        button.addEventListener("click", function(){
          addToWatchList();
        }, false);
      }
    }

  }
}
}





