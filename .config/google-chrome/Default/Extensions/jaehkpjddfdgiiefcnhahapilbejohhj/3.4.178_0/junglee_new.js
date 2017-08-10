var title = getProd();
var url = "http://compare.buyhatke.com/products/";
origProd = title;
title = title.split("(")[0];
  var titleS = title.split(" ");
  if(titleS.length<5){
    title = titleS.join("-");
  }
  else {
    title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4];
  }
  var urlToFollow = url + title;
  // var imgURL2 = returnResource("watch-price1.png");
  // $('.offer-price-lowest-online-price:eq(0)').after('<a target="_blank" title="Compare via Compare Hatke" href="' + urlToFollow + '" ><div class="buy_compare" style="padding: 10px 10px; color: #fff; background: #EC7C0B; border: none; font-size: 12px; font-weight: bold; width: 11%;margin-bottom: 2px;display: inline-block;border-radius: 3px;">Compare Prices</div></a>');

  price = getPrice();
  origPrice = price;
  var final2send = urlToFollow.split("products/");
  var msgToSend = final2send[1] + "~*~*" + price;
  msgToSend = msgToSend + "&moreData=";
  sendSearchMessage(msgToSend, urlToFollow);
  // $(".hk-yellow-bar-comp-link").attr("href", urlToFollow);

  // function filterResults(data){
  //   var results2 = JSON.parse(data);
  //   var message = results2;
  //   var results = message;
  //   results.sort(compare);
  //   var origPrice = getPrice();
  //   origProd = getProd();
  //   //console.log(origProd);
  //   var countArray = Array();
  //   for (var i = 0; i <= results.length - 1; i++) {
  //     var current = results[i].prod;
  //     countArray[i] = 0;
  //     currentArray = origProd.split(" ");
  //     var totalLen = currentArray.length;
  //     for(var k=0; k< currentArray.length; k++){
  //       if(current.toUpperCase().indexOf(currentArray[k].toUpperCase())!=-1){
  //         countArray[i] = countArray[i] + 1;
  //       }
  //     }
  //     results[i].score = countArray[i];
  //   }
  //   indexSelected = 0; notFound = 1;
  //   for(k=0; k< results.length; k++){
  //     if(results[k].score/totalLen > .5){
  //       indexSelected = k;
  //       notFound = 0;
  //       break;
  //     }
  //   }
  //   var posResults = [];
  //   posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  //   posResults = JSON.stringify(posResults);
  //   var posSpecs = [];
  //   posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
  //   posSpecs = JSON.stringify(posSpecs);
  //   showResults(results, indexSelected, posSpecs, posResults);
  // }
