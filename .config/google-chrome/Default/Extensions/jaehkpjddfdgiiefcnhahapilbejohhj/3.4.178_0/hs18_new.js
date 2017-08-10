var alertPosition = 12;
function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('homeshop18.com/shopping-cart').length>1){
    var jsonArr = [{'processDONE': "HomeShop18"}];
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


// pidFlipkart = getPID();
// prod = getProd();
var selector = [];
selector.push({selector: '#productInfoDes', attr: 'none', pos: 'after'});
selector.push({selector: '.pj2_tabs_bg', attr: 'none', pos: 'before'});
selector = JSON.stringify(selector);
var passBack = [{selectors: selector}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'HomeShop18', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);



var randNo = Math.floor((Math.random() * 10) + 1);
if(randNo%2==0){
  var csURL = returnResource("lap.png");
  var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-Laptops";
}
else {
  var csURL = returnResource("tv.png");
  var link_t = "http://buyhatke.com/flipKart-Buyhatke-Exc-TVs";
}
var myPrice = getPrice();
price = getPrice();

var selector2 = [];
selector2.push({selector: '#btnBuyNowC', attr: 'none', pos: 'before'});
selector2 = JSON.stringify(selector2);
setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
var title = getProd();
var name = getProd();
name = name.split("(")[0];
origProd = name;
var nameS = name.split(" ");
if(nameS.length<5){
  name = nameS.join("-");
}
else {
  name = nameS[0] + "-" + nameS[1] + "-" + nameS[2] + "-" + nameS[3] + "-" + nameS[4];
}
var url = "http://compare.buyhatke.com/products/" + name;
var imgURL = returnResource("hs18.png");
var imgURL2 = returnResource("watch-price1.png");
var final2send = url.split("products/");
if($('#hs18Price').length > 0){
  var msgToSend = final2send[1] + "~*~*" + $('#hs18Price').html().split("&nbsp;")[1].split(",").join("");
}
else{
  var msgToSend = final2send[1] + "~*~*" + getPrice();
}

if($('.breadcrumb').text().split("Clothing").length > 2 || $('.breadcrumb').text().split("Footwear").length > 2 || $('.breadcrumb').text().split("Jewellery").length > 2 || $('.breadcrumb').text().split("Fashion Accessories").length > 2){
  isApparels = false;
}
else {
  isApparels = false;
}

var a = $('body').text();
if(a.split("ISBN 13").length>1){
  isbn = parseInt(a.split('ISBN 13')[1].trim().split(":")[1].trim());
    //console.log(isbn);
  }
  else {
    isbn = false;
    //console.log("ISBN not found");
  }
  if(isbn){
    if(url.split("/products/").length > 1){
      url = url.split("/products/").join("/books/");
    }
    url = url + "-hatke" + isbn;
  }
  // $('#btnBuyNowC').after('<div id="btnBuyNowC2"><a target="_blank" href="' + url + '" id="btnBuyNow2" class="btn "><span class="btntxt unselectable" unselectable="on"><span class="bi"></span>Compare</span></a></div>');
  
  if(isbn){
    msgToSend = msgToSend + "moreData=null&isbn=" + isbn;
  }

  if(isApparels){
    msgToSend = msgToSend + "moreData=null";
  }

  if(getBreadCrumb().split("*~Mobile Phones*~").length > 1){
    sendSearchMessageNew(final2send[1], 0, url);
  }
  else {
    sendSearchMessage(msgToSend, url);
  }

  // sendSearchMessage(msgToSend, url);
  
  function filterResults(data, url){
    if(data && data != null && data.trim() != "" && data != "null"){
      var results2 = JSON.parse(data);
      var message = results2;
      if(isApparels){
        var results = results2;
        $('body').append(results);
        (function(a){a.tiny=a.tiny||{};a.tiny.carousel={options:{start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};a.fn.tinycarousel_start=function(){a(this).data("tcl").start()};a.fn.tinycarousel_stop=function(){a(this).data("tcl").stop()};a.fn.tinycarousel_move=function(c){a(this).data("tcl").move(c-1,true)};function b(q,e){var i=this,h=a(".viewport:first",q),g=a(".overview:first",q),k=g.children(),f=a(".ar-next:first",q),d=a(".ar-prev:first",q),l=a(".pager:first",q),w=0,u=0,p=0,j=undefined,o=false,n=true,s=e.axis==="x";function m(){if(e.controls){d.toggleClass("disable",p<=0);f.toggleClass("disable",!(p+1<u))}if(e.pager){var x=a(".pagenum",l);x.removeClass("active");a(x[p]).addClass("active")}}function v(x){if(a(this).hasClass("pagenum")){i.move(parseInt(this.rel,10),true)}return false}function t(){if(e.interval&&!o){clearTimeout(j);j=setTimeout(function(){p=p+1===u?-1:p;n=p+1===u?false:p===0?true:n;i.move(n?1:-1)},e.intervaltime)}}function r(){if(e.controls&&d.length>0&&f.length>0){d.click(function(){i.move(-1);return false});f.click(function(){i.move(1);return false})}if(e.interval){q.hover(i.stop,i.start)}if(e.pager&&l.length>0){a("a",l).click(v)}}this.stop=function(){clearTimeout(j);o=true};this.start=function(){o=false;t()};this.move=function(y,z){p=z?y:p+=y;if(p>-1&&p<u){var x={};x[s?"left":"top"]=-(p*(w*e.display));g.animate(x,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback==="function"){e.callback.call(this,k[p],p)}}});m();t()}};function c(){w=s?a(k[0]).outerWidth(true):a(k[0]).outerHeight(true);var x=Math.ceil(((s?h.outerWidth():h.outerHeight())/(w*e.display))-1);u=Math.max(1,Math.ceil(k.length/e.display)-x);p=Math.min(u,Math.max(1,e.start))-2;g.css(s?"width":"height",(w*k.length));i.move(1);r();return i}return c()}a.fn.tinycarousel=function(d){var c=a.extend({},a.tiny.carousel.options,d);this.each(function(){a(this).data("tcl",new b(a(this),c))});return this}}(jQuery));


        $('#hr-title').click(function(){
         $("#hatke-recommendations").animate({'bottom':0},500);
       })

        $('#hr-close').click(function(){
         $("#hatke-recommendations").animate({'bottom':-90},500);
       })

        $(document).ready(function(){

          $('#hatke-reco-cover').tinycarousel({display:4,duration: 700});

        });

      }
      else {
        var results = message;
        results.sort(compare);
        var origPrice = $('#hs18Price').html().split("&nbsp;")[1].split(",").join("");
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
 }
 indexSelected = 0; notFound = 1;
 for(k=0; k< results.length; k++){
  if(results[k].score/totalLen > .5){
    indexSelected = k;
    notFound = 0;
    break;
  }
}
// console.log(results);
if(results[0].error !==undefined){
  indexSelected = 0;
}
var posResults = [];
posResults.push({selector: 'body', attr: 'none', pos: 'before'});
posResults = JSON.stringify(posResults);
var posSpecs = [];
posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '70px', postVal: '0px'});
posSpecs = JSON.stringify(posSpecs);
showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}
