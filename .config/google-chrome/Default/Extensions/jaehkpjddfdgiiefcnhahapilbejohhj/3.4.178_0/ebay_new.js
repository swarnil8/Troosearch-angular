var alertPosition = 1;
if(getCookie('ebayC')=="" || getCookie('ebayC')== undefined){
  setCookie("ebayC", 1, 1);
}


sendEcomm();
// console.log("EbayC" + getCookie('ebayC'));

function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('order2.ebay.in').length>1){
    var jsonArr = [{'processDONE': "Ebay"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

reportPurchase();
// console.log("Reached 1");
function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);

  var a = $('body').text();
  if(a.split("ISBN-13:").length>1){
    isbn = $('body').text().split("ISBN-13:")[1].trim();
    if(isbn.split("-").length > 1){
      isbn = isbn.split("-").join("").trim();
    }
    isbn = parseInt(isbn);
    //console.log(isbn);
  }
  else {
    isbn = false;
    //console.log("ISBN not found");
  }
  
  if(isbn){
    var jsonArr = [{'prod': isbn, 'url': url, 'webID': webID, 'isBook': 1, 'price': getPrice() }];
  }
  else if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0, 'price': getPrice() }];
  }
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 11, doNothing, []);
}

sendTrack();

handPicked = 0;

// console.log("Reached 2");


function checkFlag(){
  // console.log("handPicked " + handPicked);
  if(handPicked==0){
    setTimeout(function(){checkFlag();},1000);
    $('#RightSummaryPanel').find('iframe').addClass("myUnique");
    if($('#RightSummaryPanel').find('iframe').length > 0){
     var string = (document.getElementsByClassName('myUnique')[0].contentWindow.document.body.innerHTML);
     if(string.split("handpicked").length > 1){
      handPicked = 1;
    }
  }
}
}

// checkFlag();

// console.log("Reached 3");


function dontShow(){
  // console.log("Here I come");
  setCookie("ebayC", 0, 1);
  $('.hk-ebay-cb-box').html("");
  $('.hk-ebay-cb-box').css("height", "0px");
  $('.hk-ebay-cb-box').css("display", "none");
  return false;
}


// console.log("Reached 4");



function addNewTag(){
  console.log("I was called");
  setTimeout(function(){addNewTag();},1000);
  var price = getPrice();


  price = parseFloat(price);

  price = .89*price;
  price = parseInt(price);


  if(price!=0 && $("img[src='http://rtm.ebaystatic.com/203/RTMS/Image/VIP_Handpicked111.gif']").length == 0 && $("img[src='http://rtm.ebaystatic.com/203/RTMS/Image/handpicked_deal_300X50_2.gif']").length == 0 && $("img[src='http://rtm.ebaystatic.com/203/RTMS/Image/handpicked_deal_300X50_2.gif']").length == 0 && $("img[src='http://rtm.ebaystatic.com/203/RTMS/Image/handpicked_deal_300X50_2.gif']").length == 0 && $('.hk-ebay-cb-box').length==0 && handPicked==0 && getCookie('ebayC')==1){

    if($('#itemTitle').length>0){
      $('#itemTitle').after('<div class="hk-ebay-cb-box" style="position:fixed;margin-top:100px;"><a id="removeCash" href="#" style="float:right;" onclick="dontShow();return false;">x</a><a target="_blank" href="https://compare.buyhatke.com/promotions/ebay-cashback-offer?utm_source=extension" class="hk-ebay-cb-link"><div class="hk-cb-b-wrap"><div class="hk-b-content"><div class="hk-b-top-txt-wrap">You can get this product for</div><div class="hk-b-price-wrap">&#8377;<span class="hk-b-price">' + price + '</span> only</div><div class="hk-b-bottom-txt-wrap"><em>Valid till <strong>June 20th</strong></em></div></div><div class="hk-b-image-wrap"><img class="hk-b-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABVCAMAAADzPnOiAAAATlBMVEVMaXH7sDv7sDv7rjn7sDv7sDv7sDv7sDv7sDv7rjn3kx73kx73kx77sDv7sDv7sDv7sDv7sDv7sDv3kx73kx73kx73kx73kx77sDv3kx7tGAjXAAAAGHRSTlMA359gv0CA7xAgvkB/MM9wj69QEJQw6s9nMy7yAAACO0lEQVR42rWZ4ZKCMBCDDxCwAiqiCu//ondj0TBXnW+g2/xxHDUszaZZ6s8qdO4nEbp+HMc6T8JfjB51l4Q7GbsbhWxvTL4bF6hsuctxidq29KNn7U7+NU+g5vl9FcN+3GfzarzXZ2dHXr10lLKlWeH1ogOdcem55yuCd3b+Of67DxvyXqscKBAH9UfYO3bGd2HXW/gn9GRm4SQR1e7DSvV2/hHkJAP/hOJ1Ejm+8OKLry4G/snCD2KdpALLr7d0ivcPiLEW3BSnyE3gEvjHxEn8c106yvgVLFoX7x+Wm8HNxo3KkE3YYjHBKQxNMyzfn/UdAG5Nw3X6wxVk2eifw/RE+2lDRkAcuMnjHlhhXekfR8JmmgEhSFAEE7nimwDDw91zH7Y4CXW6Pdkfw8Y4hYFtaK9tAcPeCv+YfJtr4fuMyJ+ifQMUWhecsqcH9xYPnkAOroDBE8jBzwLsFkCOgymrI37qAQ5OIt8ymCpbmJydxKnI5Jy4nOci51mB/cPkLBbPUEyu+QwHTybnyZI/ZnIujSduJpeTWBIm53bgZmJybmTZgMnZgvBkSeT81MpbD5OzbLxp3prmMZM3jVuxYUvpnMr2aPGMA/wD5BCSELFATvEOQgA5OAl0CAQV3IqzPA1khqeQEIAIjmGdzlqf/IJ/COwk6Wt/2q7ONIPi1MlTxv9w1D7c5B8blK8popLxrUsvZ/LeWXJ32Ux+GpOh9IImQa1WtEclu5pCW5dLUnv+au4yz4yrzp+T8i/60qj9bgGhCgAAAABJRU5ErkJggg==" alt=""><div class="gps_ring"></div></div><div class="hk-b-button">Know More</div><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png" class="hk-bh-logo" alt="Buyhatke Logo"></div></a></div>');
      var button = document.getElementById("removeCash");
      button.addEventListener("click", function(){
        dontShow();
      }, false);
    }
    else if($('#why2buy').length>0){
      $('#why2buy').after('<div class="hk-ebay-cb-box" style="position:fixed;margin-top:100px;"><a id="removeCash" href="#" style="float:right;" onclick="dontShow();return false;">x</a><a target="_blank" href="https://compare.buyhatke.com/promotions/ebay-cashback-offer?utm_source=extension" class="hk-ebay-cb-link"><div class="hk-cb-b-wrap"><div class="hk-b-content"><div class="hk-b-top-txt-wrap">You can get this product for</div><div class="hk-b-price-wrap">&#8377;<span class="hk-b-price">' + price + '</span> only</div><div class="hk-b-bottom-txt-wrap"><em>Valid till <strong>June 20th</strong></em></div></div><div class="hk-b-image-wrap"><img class="hk-b-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABVCAMAAADzPnOiAAAATlBMVEVMaXH7sDv7sDv7rjn7sDv7sDv7sDv7sDv7sDv7rjn3kx73kx73kx77sDv7sDv7sDv7sDv7sDv7sDv3kx73kx73kx73kx73kx77sDv3kx7tGAjXAAAAGHRSTlMA359gv0CA7xAgvkB/MM9wj69QEJQw6s9nMy7yAAACO0lEQVR42rWZ4ZKCMBCDDxCwAiqiCu//ondj0TBXnW+g2/xxHDUszaZZ6s8qdO4nEbp+HMc6T8JfjB51l4Q7GbsbhWxvTL4bF6hsuctxidq29KNn7U7+NU+g5vl9FcN+3GfzarzXZ2dHXr10lLKlWeH1ogOdcem55yuCd3b+Of67DxvyXqscKBAH9UfYO3bGd2HXW/gn9GRm4SQR1e7DSvV2/hHkJAP/hOJ1Ejm+8OKLry4G/snCD2KdpALLr7d0ivcPiLEW3BSnyE3gEvjHxEn8c106yvgVLFoX7x+Wm8HNxo3KkE3YYjHBKQxNMyzfn/UdAG5Nw3X6wxVk2eifw/RE+2lDRkAcuMnjHlhhXekfR8JmmgEhSFAEE7nimwDDw91zH7Y4CXW6Pdkfw8Y4hYFtaK9tAcPeCv+YfJtr4fuMyJ+ifQMUWhecsqcH9xYPnkAOroDBE8jBzwLsFkCOgymrI37qAQ5OIt8ymCpbmJydxKnI5Jy4nOci51mB/cPkLBbPUEyu+QwHTybnyZI/ZnIujSduJpeTWBIm53bgZmJybmTZgMnZgvBkSeT81MpbD5OzbLxp3prmMZM3jVuxYUvpnMr2aPGMA/wD5BCSELFATvEOQgA5OAl0CAQV3IqzPA1khqeQEIAIjmGdzlqf/IJ/COwk6Wt/2q7ONIPi1MlTxv9w1D7c5B8blK8popLxrUsvZ/LeWXJ32Ux+GpOh9IImQa1WtEclu5pCW5dLUnv+au4yz4yrzp+T8i/60qj9bgGhCgAAAABJRU5ErkJggg==" alt=""><div class="gps_ring"></div></div><div class="hk-b-button">Know More</div><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png" class="hk-bh-logo" alt="Buyhatke Logo"></div></a></div>');
      var button = document.getElementById("removeCash");
      button.addEventListener("click", function(){
        dontShow();
      }, false);
    }
    else if($('.watchListCmp').length>0){
      $('.watchListCmp').after('<div class="hk-ebay-cb-box" style="position:fixed;margin-top:100px;"><a id="removeCash" href="#" style="float:right;" onclick="dontShow();return false;">x</a><a target="_blank" href="https://compare.buyhatke.com/promotions/ebay-cashback-offer?utm_source=extension" class="hk-ebay-cb-link"><div class="hk-cb-b-wrap"><div class="hk-b-content"><div class="hk-b-top-txt-wrap">You can get this product for</div><div class="hk-b-price-wrap">&#8377;<span class="hk-b-price">' + price + '</span> only</div><div class="hk-b-bottom-txt-wrap"><em>Valid till <strong>June 20th</strong></em></div></div><div class="hk-b-image-wrap"><img class="hk-b-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABVCAMAAADzPnOiAAAATlBMVEVMaXH7sDv7sDv7rjn7sDv7sDv7sDv7sDv7sDv7rjn3kx73kx73kx77sDv7sDv7sDv7sDv7sDv7sDv3kx73kx73kx73kx73kx77sDv3kx7tGAjXAAAAGHRSTlMA359gv0CA7xAgvkB/MM9wj69QEJQw6s9nMy7yAAACO0lEQVR42rWZ4ZKCMBCDDxCwAiqiCu//ondj0TBXnW+g2/xxHDUszaZZ6s8qdO4nEbp+HMc6T8JfjB51l4Q7GbsbhWxvTL4bF6hsuctxidq29KNn7U7+NU+g5vl9FcN+3GfzarzXZ2dHXr10lLKlWeH1ogOdcem55yuCd3b+Of67DxvyXqscKBAH9UfYO3bGd2HXW/gn9GRm4SQR1e7DSvV2/hHkJAP/hOJ1Ejm+8OKLry4G/snCD2KdpALLr7d0ivcPiLEW3BSnyE3gEvjHxEn8c106yvgVLFoX7x+Wm8HNxo3KkE3YYjHBKQxNMyzfn/UdAG5Nw3X6wxVk2eifw/RE+2lDRkAcuMnjHlhhXekfR8JmmgEhSFAEE7nimwDDw91zH7Y4CXW6Pdkfw8Y4hYFtaK9tAcPeCv+YfJtr4fuMyJ+ifQMUWhecsqcH9xYPnkAOroDBE8jBzwLsFkCOgymrI37qAQ5OIt8ymCpbmJydxKnI5Jy4nOci51mB/cPkLBbPUEyu+QwHTybnyZI/ZnIujSduJpeTWBIm53bgZmJybmTZgMnZgvBkSeT81MpbD5OzbLxp3prmMZM3jVuxYUvpnMr2aPGMA/wD5BCSELFATvEOQgA5OAl0CAQV3IqzPA1khqeQEIAIjmGdzlqf/IJ/COwk6Wt/2q7ONIPi1MlTxv9w1D7c5B8blK8popLxrUsvZ/LeWXJ32Ux+GpOh9IImQa1WtEclu5pCW5dLUnv+au4yz4yrzp+T8i/60qj9bgGhCgAAAABJRU5ErkJggg==" alt=""><div class="gps_ring"></div></div><div class="hk-b-button">Know More</div><img src="http://compare.buyhatke.com/images/buyhatke_logo_big.png" class="hk-bh-logo" alt="Buyhatke Logo"></div></a></div>');
      var button = document.getElementById("removeCash");
      button.addEventListener("click", function(){
        dontShow();
      }, false);
    }
  }
  else if($("img[src='http://rtm.ebaystatic.com/203/RTMS/Image/VIP_Handpicked111.gif']").length > 0 || $("img[src='https://securepics.ebaystatic.com/aw/pics/in/aboutebay/handpick.gif']").length > 0 || $("img[src='http://rtm.ebaystatic.com/203/RTMS/Image/handpicked_deal_300X50_2.gif']").length > 0 || handPicked==1){
    if($('.hk-ebay-cb-box').length>0){
      $('.hk-ebay-cb-box').html("");
      $('.hk-ebay-cb-box').css("height", "0px");
      $('.hk-ebay-cb-box').css("display", "none");
    }
  }
}

console.log("Abt to call addNewTag");
if(getCookie('ebayC')!=0){
  // addNewTag();
}



var price = getPrice();

// var selector2 = [];
// selector2.push({selector: '#why2buy', attr: 'none', pos: 'before'});
// selector2.push({selector: '.watchListCmp', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();
var url = "http://compare.buyhatke.com/products/";
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<5){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
}
var origPrice = getPrice();
var urlToFollow = url + title;
if(getBreadCrumb().split("Mobile Phones").length > 1){
  sendSearchMessageNew("goAhead", 0, urlToFollow);
}
if(getBreadCrumb().split("*~Laptops*~").length > 1){
  var values = document.querySelectorAll('.itemAttr td');
  if(values.length > 0){
    for(var l=0; l<values.length; l=l+2){
       if(values[l].innerText.trim().split("Model").length>1){
           getDetails(urlToFollow);
           break;
       }
    }
  }
  // getDetails(urlToFollow);
}
var imgURL2 = returnResource("watch-price1.png");
var final2send = urlToFollow.split("products/");
msgToSend = final2send[1] + "~*~*" + origPrice;
msgToSend = msgToSend + "moreData=";

var a = $('body').text();
if(a.split("ISBN-13:").length>1){
  isbn = $('body').text().split("ISBN-13:")[1].trim();
  if(isbn.split("-").length > 1){
    isbn = isbn.split("-").join("").trim();
  }
  isbn = parseInt(isbn);
    //console.log(isbn);
  }
  else {
    isbn = false;
    //console.log("ISBN not found");
  }


  if(isbn){
    msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
    sendSearchMessage(msgToSend, urlToFollow);

  }



  //console.log("msgToSend: "+msgToSend);

  function filterResults(data, url){
    // console.log("Msg " + JSON.stringify(data));
    if(data && data != null && data.trim() != "" && data != "null"){
      var message = JSON.parse(data);

      var results = message;
      results.sort(compare);
      var origPrice = getPrice();
      var origProd = getProd();
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
      //console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
    }
    indexSelected = 0; notFound = 0;
    for(k=0; k< results.length; k++){
      if(results[k].score/totalLen > .6){
        indexSelected = k;
        notFound = 0;
        break;
      }
    }

    if(isbn){
      indexSelected = 0;
    }

    indexSelected = 0;

    var posResults = [];
    posResults.push({selector: 'body', attr: 'none', pos: 'before'});
    posResults = JSON.stringify(posResults);
    var posSpecs = [];
    posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}
