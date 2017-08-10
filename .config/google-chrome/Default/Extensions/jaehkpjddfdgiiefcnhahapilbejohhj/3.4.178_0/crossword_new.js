var alertPosition = 471;

function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  var a = $('body').text();
  if(a.split("EAN").length>1){
    isbn = parseInt(a.split("EAN")[1].trim().split(":")[1].trim());
  }
  else {
    isbn = false;
  }
  if(isbn){
    var jsonArr = [{'prod': isbn, 'url': url, 'webID': webID, 'isBook': 1 }];
  }
  else if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
  }
  jsonArr = JSON.stringify(jsonArr);
  sendMessage(1, jsonArr, 11, doNothing, []);
}

sendTrack();
//Where the graph will be placed
pidFlipkart = getPID();
  //console.log("PID: "+pidFlipkart);
  prod = getProd();
  var selector = [];
  selector.push({selector: '#catalog-header', attr: 'none', pos: 'after'});
  selector.push({selector: '#ft-wrap', attr: 'none', pos: 'before'});
  selector = JSON.stringify(selector);
  height = "auto";
  var passBack = [{selectors: selector, height: height}];
  passBack = JSON.stringify(passBack);
  addGraphBase(passBack);
  // var passBack1 = [{title: prod, siteName: 'Crossword', price: getPrice()}];
  // passBack1 = JSON.stringify(passBack1);
  // prepareGraph(pidFlipkart, passBack1);

  var title = getProd();
  title = title.split("(");
  title = title[0];
  title = title.split("/");
  title = title[0];
  title = title.split("'s");
  var name = title.join("");
  origProd = name;
  var nameS = name.split(" ");
  if(nameS.length<5){
    name = nameS.join("-");
  }
  else {
    name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
  }
  var url = "http://compare.buyhatke.com/products/" + name;
  // var selector2 = [];
  // selector2.push({selector: '#pricing_summary', attr: 'none', pos: 'after'});
  // selector2.push({selector: '#catalog-title', attr: 'none', pos: 'after'});
  // selector2 = JSON.stringify(selector2);
  // setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
  var final2send = url.split("products/");
  msgToSend = final2send[1] + "~*~*" + getPrice();

  var a = $('body').text();
  if(a.split("EAN").length>1){
    isbn = parseInt(a.split("EAN")[1].trim().split(":")[1].trim());
  }
  else {
    isbn = false;
  }
  if(isbn){
    if(url.split("/products/").length > 1){
      url = url.split("/products/").join("/books/");
      url = url + "-hatke" + isbn;
    }
  }
  // if($("#cart").length > 0){
  //   $('#cart').parent().after('<a target="_blank" href=' + url + '><span class="button" name="commit" title="Compare via Compare Hatke" style="margin-left: 30px; min-width: 80px;" value="Compare">Compare</span></a>');
  // }
  // else if($("#share").length > 0){
  //   $('#share').before('<a target="_blank" href=' + url + '><span class="button" name="commit" title="Compare via Compare Hatke" style="margin-left: 30px; min-width: 80px;" value="Compare">Compare</span></a>');
  // }
  if(isbn){
    msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
  }
  sendSearchMessage(msgToSend, url);


  function filterResults(data, url) {
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
      //console.log(results[i].prod + " " + results[i].price + " " + countArray[i]);
    }
    indexSelected = 0; notFound = 1;
    var posResults = [];
    posResults.push({selector: 'body', attr: 'none', pos: 'before'});
    posResults = JSON.stringify(posResults);
    var posSpecs = [];
    posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    // posSpecs.push({selector: '.navigation-all', attr: 'none', cssAttr: 'margin-top', preVal: '40px', postVal: '0px'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}