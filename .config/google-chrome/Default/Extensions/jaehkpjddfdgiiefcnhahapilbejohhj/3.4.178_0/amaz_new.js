alertPosition = 63;
savingsArray = [];
coupArray = [];
bestCouponFound = 0;
current_pid = "";
current_url = "";


function checkURL(){
  // console.log("checkURL was called");
  var url = window.location.href;
  var now_pid = getPID();
  if(current_url != url){
    var url = window.location.href;
    current_url = url;
    $(".hk-yellow-bar-main-div").css("display", "none");
    $(".hk-main-graph").css("display", "none");
    $(".hk-main-watch").css("display", "none");
    $(".hk-main-watch").removeClass("hk-sTab__pw--on");

    pidFlipkart = getPID();
    var title = getProd();
    var prod = title;
    var price = getPrice();
    var myPrice = price;
    title = title.split("(")[0];
    title = title.split("[")[0];
    var titleS = title.split(" ");
    if(titleS.length<25){
      title = titleS.join("-");
    }
    else {
      title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4] + titleS[5] + "-" + titleS[6];
    }
    var url = "http://compare.buyhatke.com/products/" + title;

    var final2send = url.split("products/");
    msgToSend = final2send[1] + "~*~*" + price;

    if($('#nav-subnav').text().trim().split('Fashion Jewellery').length > 1 || $('#nav-subnav').text().trim().split('Watches').length > 1){
      isApparels = true;
    }
    else {
      isApparels = false;
    }
    isApparels = false;
    var a = $('body').text();
    if(a.split("ISBN-13:").length>1){
      isbn = a.split("ISBN-13:")[1].trim().split(" ")[0].trim().split("-").join("");
    }
    else {
      isbn = false;
    }

    if(isbn){
      msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
    }

    if(isApparels){
      msgToSend = msgToSend + "moreData=null";
      isApparels = false;
    }

    if(getBreadCrumb().split("*~Smartphones & Basic Mobiles*~").length > 1 || getBreadCrumb().split("*~Smartphones*~").length > 1){
      sendSearchMessageNew(msgToSend,0,url);
    }
    else if(getBreadCrumb().split("*~Laptops*~").length > 1){
      getDetails(url);
    }
    else if(getBreadCrumb().split("laptops*~").length > 1){
      getDetails(url);
    }
    else {
      sendSearchMessage(msgToSend, url);
    }

    initiateNewUI();
  }
  if(current_pid != now_pid){
    current_pid = now_pid;
  }
  return;
}

window.setInterval(function(){ checkURL(); }, 5000);


if(localStorage.tagTime == undefined || localStorage.tagTime==""){
  localStorage.tagTime = 0;
}
var url = window.location.href;
if(url.split("?tag=buyhatke-21").length > 1){
  localStorage.tagTime = Math.floor(Date.now() / 1000);
}
else if(url.split("?tag=bhgreatindiansale-21").length > 1){
  localStorage.tagTime = Math.floor(Date.now() / 1000);
}
else if(url.split("&tag=buyhatke-21").length > 1){
  localStorage.tagTime = Math.floor(Date.now() / 1000);
}
else if(url.split("&tag=bhgreatindiansale-21").length > 1){
  localStorage.tagTime = Math.floor(Date.now() / 1000);
}
else if(url.split("&tag=").length > 1 || url.split("?tag=").length > 1 || localStorage.tagTime==0 || (Math.floor(Date.now() / 1000) - localStorage.tagTime > 86000)) {
  localStorage.tagTime = 0;
  var d = new Date();
  d = d.getDate();
  var jsonArr = [{'visitedEcomm': 63}];
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(0, jsonArr, 0, doNothing, []);
}


if(localStorage.noCount == undefined){
  localStorage.noCount = 1;
}
if(localStorage.dontSend=="" || localStorage.dontSend==undefined){
  localStorage.dontSend = 0;
}
var urlLand = window.location.href;
if(urlLand.split("buyhatke-21").length > 1 || urlLand.split("bhgifs-21").length > 1 || urlLand.split("bhgreatindiansale-21")>1){
 localStorage.dontSend = 5;
}
var d = new Date();
d = d.getDate();
if(d>16){
  // localStorage.dontSend = 0;
}
if(localStorage.dontSend>0){
  localStorage.dontSend = localStorage.dontSend - 1;
}
else {
  var d = new Date();
  d = d.getDate();
  var jsonArr = [{'visitedEcomm': 63}];
  jsonArr = JSON.stringify(jsonArr);
  // sendMessage(0, jsonArr, 0, doNothing, []);
}

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('amazon.in/gp/buy/').length>1){
    chrome.runtime.sendMessage({processDONE: "Amazon"}, function(response) {
    });
  }
}

reportPurchase();

pidFlipkart = getPID();
var title = getProd();
var prod = title;
var price = getPrice();
var myPrice = price;
title = title.split("(")[0];
title = title.split("[")[0];
var titleS = title.split(" ");
if(titleS.length<25){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4] + titleS[5] + "-" + titleS[6];
}
var url = "http://compare.buyhatke.com/products/" + title;

var final2send = url.split("products/");
msgToSend = final2send[1] + "~*~*" + price;

if($('#nav-subnav').text().trim().split('Fashion Jewellery').length > 1 || $('#nav-subnav').text().trim().split('Watches').length > 1){
  isApparels = true;
}
else {
  isApparels = false;
}
isApparels = false;
var a = $('body').text();
if(a.split("ISBN-13:").length>1){
  isbn = a.split("ISBN-13:")[1].trim().split(" ")[0].trim().split("-").join("");
  // console.log("ISBN found " + isbn);
}
else {
  isbn = false;
  ////////console.log("ISBN not found");
}

if(isbn){
  msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
}

if(isApparels){
  msgToSend = msgToSend + "moreData=null";
  isApparels = false;
}

if(getBreadCrumb().split("*~Smartphones & Basic Mobiles*~").length > 1 || getBreadCrumb().split("*~Smartphones*~").length > 1){
  sendSearchMessageNew(msgToSend,0,url);
}
else if(getBreadCrumb().split("*~Laptops*~").length > 1){
  getDetails(url);
}
else if(getBreadCrumb().split("laptops*~").length > 1){
  getDetails(url);
}
else {
  sendSearchMessage(msgToSend, url);
}


function filterResults(data, url, flagSel){
  var pidNow = getPID().trim();
  var breadNow = getBreadCrumb();
  if(breadNow.split("Apparel & Accessories").length > 1 || breadNow.split("Shoes").length > 1 || breadNow.split("Watches").length > 1 || breadNow.split("Sunglasses").length > 1  || breadNow.split("Luggage & Bags").length > 1 || getProd().toUpperCase().split("LUGGAGE").length > 1){
    var flagImp = 1;
  }
  else {
    var flagImp = 0;
  }
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
      results[i].link = results[i].link + "&tagType=" + flagImp;
      // console.log(results[i]);
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
    if(flagSel==1){
      indexSelected = 0;
    }

    if(results[0].error !==undefined){
      indexSelected = 0;
    }

    if(isbn){
      indexSelected = 0;
    }

    var posResults = [];
    posResults.push({selector: 'body', attr: 'none', pos: 'before'});
    posResults = JSON.stringify(posResults);
    var posSpecs = [];
    posSpecs.push({selector: '.nav-locale-in:eq(0)', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}


function setProdInCart(){
  if(tabID==""){
    setTimeout(function(){setProdInCart()}, 1000);
  }
  else {
    var pidNow = getPID().trim();
    var breadNow = getBreadCrumb();
    if(breadNow.split("Computers & Accessories").length > 1 || breadNow.split("Electronics").length > 1 || breadNow.split("Gift Cards").length > 1 || breadNow.split("Precious").length > 1 || getProd().toUpperCase().split("PRECIOUS").length > 1){
      var flagImp = 1;
    }
    else {
      var flagImp = 2;
    }
    if(pidNow!="" || breadNow.split("Gift Cards").length > 1 ){
         // console.log("Setting cookie");
         setCookie('cook' + tabID, pidNow + "~" + flagImp, 0.0034);
       }
       setTimeout(function(){setProdInCart()}, 60000);
     }
   }

   setProdInCart();


   function checkAddedToCart(){
  // console.log("Called ATC");
  if(tabID==""){
    setTimeout(function(){checkAddedToCart()}, 1000);
  }
  else {
    if(window.location.href.split('/handle-buy-box/').length > 1 || window.location.href.split('/gp/huc/').length > 1 || window.location.href.split('/gp/buy/').length > 1){
      // console.log("Entered ATC");
      var cookValue = getCookie('cook' + tabID);
         // console.log("Cookie " + cookValue);
         if(cookValue!=""){
           cookValue = cookValue.trim();
           cookValue = cookValue.split("~");
           if(cookValue.length > 1){
             if(cookValue[1]==1 || cookValue[1]=="1"){
              setCookie('putTag', 1, .25);
              var jsonArr = [{'setTagType': 1}];
              jsonArr = JSON.stringify(jsonArr);
              sendMessage(0, jsonArr, 0, doNothing, []);
            }
          }
        }
      }
      else {
        setTimeout(function(){checkAddedToCart()}, 5000);
      }
    }
  }

  checkAddedToCart();

  if(getCookie('putTag')==1){
    var jsonArr = [{'setTagType': 1}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
  else {
    var jsonArr = [{'setTagType': 0}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }

