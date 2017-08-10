sendEcomm();
alertPosition = 1331;

onBreadcrumbProdChange();

function onBreadcrumbProdChange(oldBreadcrumb){
  // console.log("I was called");
  var breadcrumb = getBreadCrumb(1);
  var currProd = getProd();
  var currPrice = getPrice();
  if(currProd.trim()!="" && currPrice!=0){
     breadcrumb = breadcrumb + "~*" + currProd;

     if(breadcrumb != oldBreadcrumb){
       oldBreadcrumb = breadcrumb;
       // console.log("Change found");
      setTimeout(function(){onBreadcrumbProdChange(oldBreadcrumb);}, 500);
      if((getPID().trim())!=""){
        // console.log("entering here ");
        $(".hk-yellow-bar-main-div").css("display", "none");
        $(".hk-main-graph").css("display", "none");
        $(".hk-main-watch").css("display", "none");

        paytmCall();
        maxCall = 0;
        changeCSS();
        plotAllData();
        importWishPay();

      }
      else {

        $(".hk-yellow-bar-main-div").css("display", "none");
        $(".hk-main-graph").css("display", "none");
        $(".hk-main-watch").css("display", "none");
        }
      }
      else {
        setTimeout(function(){onBreadcrumbProdChange(oldBreadcrumb);}, 500);
      }

    }
    else {
        setTimeout(function(){onBreadcrumbProdChange(oldBreadcrumb);}, 500);
      }

}



function reportPurchase(){
  var curURL = window.location.href;

  if(curURL.split('paytm.com/cart').length>1){
    var jsonArr = [{'processDONE': "Paytm"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

function getDetails(url){
  finalJSON = {};
      // var specialPat = /[^a-z0-9]+$/gi;
      var prodName = getProd();
       if(prodName ==""){
         setTimeout(getDetails, 100);
         return;
       }
       else {



         var filters = getSpecs();

         var prodName = getProd();
         lastProd = prodName;
         var myPrice = getPrice();

               finalJSON["category"] = 0;
               finalJSON["filters"] = filters;
               finalJSON["filteredName"]  = prodName;
               finalJSON["prodName"] = prodName;
               finalJSON["price"] = myPrice;
               finalJSON["image"] = getImage();


          var finalJSONTemp = JSON.stringify(finalJSON);
          msgToSend = finalJSONTemp;
          sendSearchMessageNew(msgToSend, 1, url);
      }
}


 function getSpecs()
{

     var ourAtts = [];
      ourAtts["model id"] = "model";
      ourAtts["part number"] = "serialno";
      ourAtts["processor"] = "processor";
      ourAtts["ram"] = "ram";
      ourAtts["operating system"] = "os";
      ourAtts["hdd capacity"] = "hdd";
      ourAtts["series"] = "lapseries";
      ourAtts["model name"] = "modelname";
      ourAtts["brand"] = "brand";
      ourAtts["graphics memory"] = "gCard";

          var attributeVal ={};
          var attributes = [];
          var attrVal = "";
          for(var attribute in ourAtts)
          {
              attrVal = pickValue(attribute);
              if(attrVal == undefined){
                attrVal = pickValueNew(attribute);
              }
              // console.log(attribute + " ~ " + attrVal);
              if(attrVal!="")
              {

                  var key  = ourAtts[attribute];
                  attributeVal[key] = attrVal;

              }
          }

          attributeVal["pid"] = getPID();
      attributeVal = JSON.stringify(attributeVal);
      return attributeVal;
}

function pickValue(attrName)
{
  var myVar = $(".ProductDescription").html();
  var len = $(myVar).find(".attributes").length;

  for(i=0;i<len;i++){
  li = $(myVar).find('.attributes').eq(i);
  key = $(li).find('.col1').text();

  // console.log("key = "+key);console.log("val = "+val);
  if(key.toLowerCase().indexOf(attrName) >= 0)
            {
      value = $(li).find('.col2').text();
       if(value.toLowerCase().trim() == "no" || value.toLowerCase().trim()=="na")
                  {
                      return "";
                  }
       value = " "+value+" ";
                   value = value.replace(/wi-fi/ig," ");
                   value = value.replace(/wifi/ig," ");
                   value = value.replace(/ wi fi /ig," ");
                   // value = value.replace(/[^0-9A-Z]3g[^0-9A-Z]/ig," ");
                   value = value.replace(/([^0-9A-Z])3g([^0-9A-Z])/ig,"$1 $2");
                   // value = value.replace(/ 4g /ig," ");
                   value = value.replace(/([^0-9A-Z])4g([^0-9A-Z])/ig,"$1 $2");
                   // value = value.replace(spclSymbols," ");
                   value = value.replace(/\s\s+/g,' ');
                   value = value.replace(/[^0-9A-Z\-\/\s]/gi,' ');
                   value = value.trim();
                   if(attrName=="hdd" || attrName=="ram"){
                      value = value.replace(/(.)*([0-9]+)[^0-9A-Za-z]*GB(.)*/ig,' $2GB ');
                      value = value.replace(/(.)*([0-9]+)[^0-9A-Za-z]*TB(.)*/ig,' $2TB ');
                   }
                   return value;
      }
  }
}

function pickValueNew(attrName)
{
  var myVar = $(".r3Vi").html();
  var len = $(myVar).find(".FqsW").length;

  for(i=0;i<len;i++){
  li = $(myVar).find('.FqsW').eq(i);
  key = $(li).find('.w3LC').text();

  // console.log("key = "+key);console.log("val = "+val);
  if(key.toLowerCase().indexOf(attrName) >= 0)
            {
      value = $(li).find('._2LOI').text();
       if(value.toLowerCase().trim() == "no" || value.toLowerCase().trim()=="na")
                  {
                      return "";
                  }
       value = " "+value+" ";
                   value = value.replace(/wi-fi/ig," ");
                   value = value.replace(/wifi/ig," ");
                   value = value.replace(/ wi fi /ig," ");
                   // value = value.replace(/[^0-9A-Z]3g[^0-9A-Z]/ig," ");
                   value = value.replace(/([^0-9A-Z])3g([^0-9A-Z])/ig,"$1 $2");
                   // value = value.replace(/ 4g /ig," ");
                   value = value.replace(/([^0-9A-Z])4g([^0-9A-Z])/ig,"$1 $2");
                   // value = value.replace(spclSymbols," ");
                   value = value.replace(/\s\s+/g,' ');
                   value = value.replace(/[^0-9A-Z\-\/\s]/gi,' ');
                   value = value.trim();
                   if(attrName=="hdd" || attrName=="ram"){
                      value = value.replace(/(.)*([0-9]+)[^0-9A-Za-z]*GB(.)*/ig,' $2GB ');
                      value = value.replace(/(.)*([0-9]+)[^0-9A-Za-z]*TB(.)*/ig,' $2TB ');
                   }
                   return value;
      }
  }
}

function paytmCall(){
  $ = jQuery.noConflict();

  var pollInterval = 1000 * 15;
  window.setTimeout(sendCurrent, 5000);
  window.setTimeout(sendPairs, 5000);
  window.setTimeout(sendPairs, pollInterval);

  alertPosition = 1331;
  //console.log("Alert: "+alertPosition);
  reportPurchase();
//Where the graph will be placed

pidFlipkart = getPID();

prod = getProd();
// var prod = getProd();
if($("#containerBHMain").length == 0){
  var selector = [];
  selector.push({selector: '#midd-container-inner', attr: 'none', pos: 'after'});
  selector.push({selector: '.bigContainer-pro:eq(0)', attr: 'none', pos: 'after'});
  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
}

isbn = window.location.href;

if(isbn.split("#").length > 1){
  isbn = isbn.split("#")[0];
}
if(isbn.split("?").length > 1){
  isbn = isbn.split("?")[0];
}
if(isbn.split("&").length > 1){
  isbn = isbn.split("&")[0];
}
if(isbn.split("978").length > 1){
  isbn = isbn.split("978")[1];
  isbn = "978" + isbn;
}
else{
  isbn = "";
}
if(isbn.split("/").length > 1){
  isbn = isbn.split("/")[0];
}
if(isbn.split("_").length > 1){
  isbn = isbn.split("_")[0];
}
if(isNaN(isbn) || isbn.trim() == 978 || isbn.trim().length != 13){
  isbn = "";
}


var curURL = window.location.href;
  // //console.log("CP Check was called " + window.location.href);
  if(curURL.split('paytm.com/shop/p/').length > 1){
    getTitle();
  }
}


// paytmCall();

function compareBtn(){
  // console.log("compareBtn was called");
  origProd = getProd();
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  if(isbn != ""){
    var jsonArr = [{'prod': isbn, 'url': url, 'webID': webID, 'isBook': 1 }];
  }
  else if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
  }
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 11, doNothing, []);
  // var imgURL2 = returnResource("watch-price1.png");
  title = getProd();
  title = title.split("(")[0];
  var titleS = title.split(" ");
  if(titleS.length<15){
    title = titleS.join("-");
  }
  else {
    title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
  }
  if(isbn != ""){
    url = "http://compare.buyhatke.com/books/" + title + "-hatke" + isbn;
  }
  else{
    url = "http://compare.buyhatke.com/products/" + title;
  }

    price = getPrice();
    if(url.split("/products/").length > 1){
      var final2send = url.split("/products/");
    }
    else if(url.split("/books/").length > 1){
      var final2send = url.split("/books/");
    }
    if(isbn != ""){
     msgToSend = final2send[1] + "~*~*" + price + "moreData=isbn=" + isbn;
   }
   else{
     msgToSend = final2send[1] + "~*~*" + price;
   }
   if(getBreadCrumb().split("*~Laptops*~").length >1){
      getDetails(url);
   }
   else {
      // console.log("Calling search " + msgToSend);
      sendSearchMessage(msgToSend, url);
   }

 }

 function getTitle(){
    //console.log("getTitle was called");
    title = getProd();
    if(title==""){
      setTimeout(getTitle, 1000);
    }
    else {
      compareBtn();
    }
  }

  function filterResults(data, url, flagSel){
    if(data == null || data == "" || data == "null"){
      resultsShown = 0;
      if($('#detailOutWrap').length > 0){
        $('#detailOutWrap').remove();
      }
    }
    if(data && data != null && data != "" && data != "null"){
      var results2 = JSON.parse(data);
      var message = results2;
      var results = message;
      results.sort(compare);
      var origPrice = getPrice();
      origProd = title;
      origProd = origProd.split("-").join(" ").trim();
      var countArray = Array();

      for (var i = 0; i <= results.length - 1; i++) {
        countArray[k] = 0;
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
  //console.log(results);
  indexSelected = 0; notFound = 1;
  for(k=0; k< results.length; k++){
    if(results[k].score/totalLen > .5){
      indexSelected = k;
      notFound = 0;
      break;
    }
  }
  if(isbn != ""){
    indexSelected = 0;
  }
  if(flagSel==1){
    indexSelected = 0;
  }
  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  var posSpecs = [];
  posSpecs.push({selector: '.view-animate-container', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  posSpecs.push({selector: '#main-header.actual-box', attr: 'parent', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  posSpecs = JSON.stringify(posSpecs);
  var p_name = getProd();
  if(p_name != undefined && p_name.trim() != ""){
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}
}


// function addMargin(){
//   setTimeout(addMargin, 1000);
//   if(resultsShown == 1){
//     $('body').css("margin-top" , "45px");
//   }
// }
// addMargin();
