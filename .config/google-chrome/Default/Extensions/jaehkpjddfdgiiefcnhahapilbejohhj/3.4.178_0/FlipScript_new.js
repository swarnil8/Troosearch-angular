alertPosition = 2;
current_pid = "";
flagOnce = false;
current_url = "";

var imageNewAuto = returnResource("apply-offers.png"); 

var autoCouponTextIcon = '<div id="couponClick" style="cursor:pointer;"><div class="js-couponTooltip hk-c-toolTips__container--infocus hk-c-toolTips__container hk-c-toolTips__container--dark hk-c-toolTips__container--left hk-sTab__setPriceDrop hk-u-disp--ib"><img style="margin-top:5px;" src="' + imageNewAuto + '"><div class="hk-c-toolTip hk-u-padding__15"><div style="position: absolute;top: 5px;right: 5px;font-size: 21px;font-weight: bold;cursor: pointer;z-index: 1000;width: 20px;height: 20px;line-height: 100%;" class="js-closeCouponTooltip">&times;</div><svg class="hk-ext__pulse-svg" version="1.1" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" style="position: absolute; z-index: 100; top: 8px; left: 8px;"><circle style="fill:#FFFFFF" class="hk-ext__circle hk-ext__first-circle" cx="29" cy="29" opacity="0" r="25"></circle><circle style="fill:#FFFFFF" class="hk-ext__circle hk-ext__second-circle" cx="29" cy="29" opacity="0" r="25"></circle><circle style="fill:#FFFFFF" class="hk-ext__circle hk-ext__third-circle" cx="29" cy="29" opacity="0" r="25"></circle><g class="hk-ext__opacityPulse"><circle cx="29" cy="29" r="29" style="fill:#FFFFFF"></circle><path d="M37.0171132,8 L15,27.6897228 L26.7948821,30.8400784 L20.5042783,50.5298012 L42.5213915,28.4773117 L32.2991604,24.5393671 L37.0171132,8 L37.0171132,8 Z" fill="#333333" style="fill: #be1e2d;"></path></g></svg><div class="hk-c-toolTip__wrap hk-l-flexColumns hk-u-noWrap"><div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAMAAAAc9R5vAAADAFBMVEVMaXEAAAAAAHYAPUkAJS8AIEEALjwAKToAIjUAJzjDnggAJjsAJDwLFxwAK0BNQgsAIzAALT8AHzApIBAHJz8EJz4GJzfGogAGLD8EKkEFJDYFKD1yXQ+mggoaOT7GowA0SDnJoQBwbC3FngAHIioVKiwXKyskKhsiKyDBmwXHoAElLSBkUg8mMB/GnwAxNR3HoABCQBzJogCPcwtNRRqkix6rkRp5ah9RShthVRVpXRzFngCRdQnGnwDAmwCjiBa2lhKLcxSSdwqNdRXFmwCxjgG8lgXFnQCcfgzEmwClhAekgwTFmwCkgwHIoQDBmgC/mgC5lQTDnADAmADCmgHKowDHngDDmwDIoADHnQDCmQDEmgDAlgDCmADDmgDEmwDFmwDGmwDHnADIngDInwDIoADKoQDMowLLpAjNpQTRpgDSpgDPpgvUqADPqBXVqgDRqhPWrAXRqxnXrQbVrBHSrB/WrhTarwXUrhzTriTasAjUriTZshnWsSvetBTbtCDXszHdtijfuBnbtzPeuiXhux/hvCjgvDLdvT7hwDjnwiDmwybpyCjmxz/nxkXryDPqyTjoyUbnyk3qzT7tzjHrzE3x0S7v0TTt0k7w0kfz1i/v00/u1knu1Ffz1z3z1kr32Ej22Uzw2lf33Tb33EPy3Frx3GLy3V333VH430X44ULy3mL23lj64En24VH04Vfz3m3640H04lv34V/25FP44mD541n75kz+50D65lX+50f+50r+6UH+6UX+6Uj96FD35XP+6VD86Fv+6kz+60r+7EX+7Uj+7kP+61P+6ln+7FH+7U786mf+7Fj+707+7F7+7lb66nb+71L+71T56n3+71f+7WL+71n+7mD+713+7mX/80n+7mb+8GH+72n+72r+72z+727+8Gv+8HH/8mX774P+8Hf+8Hr/82n/8XX/8nL/8nj/8nv/9HT/8oD/8oL/9Hn/84P/9Xv/9nf/93T/9Ib/9n//9oP/+Hz+9or/9oj/94T/94r/+Ib/+5L//I9ht2gZAAAAXHRSTlMAAQIDBAUJCw0OERIVFhcXGhwfHyAiJCQnKiwxMTExMjU5PUJCR01UX19kZWZqbXJ3f4GCh4eJi42QkZelp6yytLq8wcPGxsjNzc7V2dnc4ebn6e3t9Pb2+Pj6/Vhe6xwAAAH7SURBVCgVBcFbS5NhAMDx/3PYob1uOpzObaapJCI2SyqCIr9BXvQJ+mbddNd90F1ERFAQxMJgE9HlMHdwzu09PYd+PwEAbMwX51QUjgaXAIAAYH2tWpqbV+kg6l8czwDQALs75fs7TyrMzr63K0u/zwE00HxQffkK59Ls9t7oXTbnu4CCrf3VNy9MHCfGJpPcs/5MDmJQFB5VXz8OEzeXUVpoFT080dMeaNZX9g5vnJx9TDMGZwsHR2/vng7QcunOYWopvP8iHFokG81SdVQbCK3Kje1bl9r9ZRl2WpWndTdtnC5IL0UQaJdIv4TNbtcnt/1xUg5KGa9FJpdaHRc+fBNCKP9pczOWWmVjjTE2cX66lpP4497BWiQT45BaRLPQOsc9VNq+WH6eH+dHceiU9pPe2aIxpc9flQ1rTcapGEShQXM9/nF0zbRe6O9u1fMTj7i6HAqvlF4wy+V4Wi2cTzZWhsIHP89PzhKrZJot3m7mkptV0elVFtKg3eqeDIxRiDArroJFOa379nWj+KsVtXomdcoLETvVG8vANcft6KLT/dONI4NAZIJirdaYD7LCnaI6f6+iWWrReDMjHf4rBUrZ9GY4mcahcSAAqfM5LYOMTO3M2SQ0zoMAkEpnslKC82lsrPeAAACphJLgrLceDyAAAJACvPcAAP8BP9MD77uUqaYAAAAASUVORK5CYII=" alt="Coin" style="max-width: inherit;"></div><div class="hk-l-flexCol__col hk-u-padding__h-05"><p><b>Click apply offers and get lucky.</b><br>Just apply offer before every purchase <br>Stand a chance to win goodies<br>Applicable for all users <br> Winners will be declared tomorrow</p></div></div></div></div></div>';

function handleCpnClick(){
   var jsonArr = [{'pos': 222222}];
   jsonArr = JSON.stringify(jsonArr);
   sendMessage(1, jsonArr, 7, doNothing, []);
}

function addFlipClick(){
  var button = document.getElementById("couponClick");
    button.addEventListener("click", function(){
      handleCpnClick();
    }, false);
}

function checkCheckOut(){

if(window.location.href.split("/checkout/init").length > 1){
    // console.log(document.getElementsByClassName('_2hAny7c3GAF428L15F2SUH'));
    if( document.querySelectorAll('[class*="_7XMNLT"]').length > 0){
      document.querySelectorAll('[class*="_7XMNLT"]')[0].insertAdjacentHTML('beforeend', autoCouponTextIcon);
      setTimeout(function(){addFlipClick()}, 3000);
			setTimeout(()=>{
					requestAnimationFrame(()=>{
						$('.js-closeCouponTooltip').click(function(e){
							e.stopPropagation();$(this).hide();$('.js-couponTooltip').removeClass('hk-c-toolTips__container--infocus')
						
							$('.js-couponTooltip').hover(function(){ $(this).addClass('hk-c-toolTips__container--infocus')},function(){ $(this).removeClass('hk-c-toolTips__container--infocus')});})});
				}, 1000);
    }
    else{
      // console.log("Not found");
      setTimeout(function(){checkCheckOut()}, 5000);
    }
}
else {
      setTimeout(function(){checkCheckOut()}, 10000);
}

}

checkCheckOut();



onBreadcrumbChange();
function onBreadcrumbChange(oldBreadcrumb){

  var breadcrumb = getBreadCrumb(1);
  if(breadcrumb != oldBreadcrumb){
    oldBreadcrumb = breadcrumb;
      // console.log("Bread Change detected " + getProd() + " " + getPID());
      maxCall = 0;
      changeCSS();
      getExtBlockList();
      setTimeout(function(){onBreadcrumbChange(oldBreadcrumb);}, 500);
      if((getPID().trim())!=""){
        // // console.log("entering here ");
        $(".hk-yellow-bar-main-div").css("display", "none");
        $(".hk-main-graph").css("display", "none");
        $(".hk-main-watch").css("display", "none");
        //   $("#containerBHMain").remove();
        //   $("#bhWidget").remove();
        //   $("#ourSpecialLink").remove();
        //   $("#detailOutWrap").remove();
        //   $(".offers-info-wrap").remove();
        //   $(".hk-dpop").remove();
        //   $('body').css("margin-top", "0px");

        flipCall();
        if(getCookie("hideDeal") != 1){
          // plotHotDeals();
          attachListeners();
        }
        sendInt();
        finalData();
        plotQR();
        // getDetails();

      }
      else {

        $(".hk-yellow-bar-main-div").css("display", "none");
        $(".hk-main-graph").css("display", "none");
        $(".hk-main-watch").css("display", "none");
          // $("#containerBHMain").remove();
          // $("#bhWidget").remove();
          // $("#ourSpecialLink").remove();
          // $("#detailOutWrap").remove();
          // $(".offers-info-wrap").remove();
          // $(".hk-dpop").remove();
          // $('body').css("margin-top", "0px");
        }
        $("body").css("margin-top", "0px");
        if($("._1Zddhx").length > 0){
          $("._1Zddhx").css("margin-top", "0px");
        }
        if($(".box-shadows").length > 0){
          $(".box-shadows").css("display", "block");
        }
        
        getRecommCalled = 1;
        initiateNewUI();
        sendPairs();
      }      
      else {
        setTimeout(function(){onBreadcrumbChange(oldBreadcrumb);}, 500);
      }
    }

    if(localStorage.tagTime == undefined || localStorage.tagTime==""){
      localStorage.tagTime = 0;
    }

    if(getCookie("hideDeal") == undefined || getCookie("hideDeal") == ""){
      setCookie("hideDeal", 0, 1);
    }

    var url = window.location.href;
    if(url.split("affid=buyhatkegm").length > 1){
      localStorage.tagTime = Math.floor(Date.now() / 1000);
    }
    else if(url.split("affid=").length > 1){
      localStorage.tagTime = 0;
    }

    function checkURL(){
      var url = window.location.href;

  // console.log(url + " " + current_url);
  var now_pid = getPID();
  if(current_url != url){
    // console.log("Successful");
    var url = window.location.href;
    if(url.split("affid=buyhatkegm").length > 1){
      localStorage.tagTime = Math.floor(Date.now() / 1000);
    }
    else if(url.split("affid=").length > 1){
      localStorage.tagTime = 0;
    }
    current_url = url;
    // initProcessFlip();
  }
  if(current_pid != now_pid){
    current_pid = now_pid;
    
  }
  
}

function hotDeals(resp){
  resp = JSON.parse(resp);
  if(resp[0] != "Hottest Deals"){
    var deal_text = "Checkout our Hand-picked deals in " + resp[0] + " category!";
  }
  else{
    var deal_text = "Checkout our Hand-picked Hottest Deals!";
  }
    // console.log("deal_text: "+deal_text);
    $(".hk-dpop-details--text").text(deal_text);
    $(".hk-dpop-wrap").attr("href", resp[1]);

  }

  function attachListeners(){
   $(".hideOne").click(function(){
    setCookie("hideDeal", 1, 1);
    $(".hk-dpop").remove();
  });

   $(".hideFifteen").click(function(){
    setCookie("hideDeal", 1, 1000);
    $(".hk-dpop").remove();
  });

   $('.hk-dpop').click(function(){
    var dealArr = [];
    var pos = 2;
    var PID = getPID();
    if(PID != ""){
      dealArr.push([PID, pos]);
      dealArr = JSON.stringify(dealArr);
      var jsonArr = [{'dealData': dealArr}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr, 18, hotDeals, []);
    }
  });



   $('.hk-dpop--close').click(function(){
    if($(this).parent().hasClass("hk-dpop--open")){
      $(this).parent().addClass('bounceOutRight')
      setTimeout(function(){
        $('.hk-dpop').removeClass('bounceOutRight')
        $('.hk-dpop').removeClass('hk-dpop--open')
      },1000)
    }
  })
   $('.hk-dpop-toggle').click(function(){
    if(!$(this).parent().hasClass("hk-dpop--open")){
      $(this).parent().addClass('hk-dpop--open')
      $(this).parent().addClass('bounceInRight')
      setTimeout(function(){
        $('.hk-dpop').removeClass('bounceInRight')
      },1000)
    }
    else{
      $(this).parent().addClass('bounceOutRight')
      setTimeout(function(){
        $('.hk-dpop').removeClass('bounceOutRight')
        $('.hk-dpop').removeClass('hk-dpop--open')
      },1000)
    }
  })
   setInterval(function(){
    if(!$('.hk-dpop').hasClass("hk-dpop--open"))
    {
      $('.hk-dpop').addClass('bounce');
      setTimeout(function(){
        $('.hk-dpop').removeClass('bounce')
      },1000)
    }

  },12000)
 }

 function reportPurchase(){
  var curURL = window.location.href;
  if(curURL.split('checkout').length>1){
    var jsonArr = [{'processDONE': "Flipkart"}];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(0, jsonArr, 0, doNothing, []);
  }
}

reportPurchase();




window.setInterval(function(){ checkURL(); }, 800);
function plotFlipGraph(){
  if($("#containerBHMain").length == 0){
    pidFlipkart = getPID();
    prod = getProd();
    var selector = [];
    selector.push({selector: '.top-section', attr: 'parent', pos: 'after'});
    selector.push({selector: '.mprod-section:eq(0)', attr: 'none', pos: 'after'});
    selector.push({selector: '._2fCBwf._3S6yHr:eq(0)', attr: 'parent', pos: 'after'});
    selector.push({selector: '._1GRhLX:eq(0)', attr: 'none', pos: 'after'});
    selector = JSON.stringify(selector);
    height = "1050px";
    var passBack = [{selectors: selector, height: height}];
    passBack = JSON.stringify(passBack);
    addGraphBase(passBack);

    var affRules = []; // Deals
    affRules.push({prePart: '', postPart: '&affid=buyhatkegm&affExtParam1=dealZone'});
    affRules = JSON.stringify(affRules);
    command = 2;
    var passBack2 = [{catName: 'this category', affRules: affRules, command: command}];
    passBack2 = JSON.stringify(passBack2);
    var command = 2;
    prepareDeals(pidFlipkart, passBack2, command);
  }
}


function filterResults(data, url, flagSel){
  // console.log("Data here " + data);
  var results = JSON.parse(data);
  if(results[0].error !==undefined){
    indexSelected = 0;
    var posResults = [];
    posResults.push({selector: 'body', attr: 'none', pos: 'before'});
    posResults = JSON.stringify(posResults);
    if(posResults != "" || posResults != null){
      var hgt = "40px";
    }
    else{
      var hgt = "0px";
    }
    var posSpecs = []; 
    posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: hgt, postVal: '0px'});
    posSpecs.push({selector: '._1Zddhx', attr: 'none', cssAttr: 'margin-top', preVal: hgt, postVal: '0px'});
    posSpecs.push({selector: '.box-shadows', attr: 'none', cssAttr: 'display', preVal: 'none', postVal: 'block'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
    return;
  }
  if($('#detailOutWrap')){
   $("#detailOutWrap").remove();
 }
 if(getProd() != "" && getProd() != "undefined" && $("#detailOutWrap").length == 0){
  var results2 = JSON.parse(data);
  var results3 = [];
  mustValue2 = ""; mustValue = "";
  if(caseMobiles){
    origProd = origProd.split("-").join(" ");
    origProd = origProd.split(":").join(" ");
    origProd = origProd.split("+").join(" ");
    if($('.clp-breadcrumb').find('li:eq(1)').text().trim() == "Mobiles & Accessories"){
      origProd = origProd.split("(")[0];
    }
    else if($('._1joEet a:eq(1)').text().trim() == "Mobiles & Accessories"){
      origProd = origProd.split("(")[0];
    }
    origProd = origProd.split("(").join("");
    origProd = origProd.split(")").join("");
    origProd = origProd.split(",").join(" ");
    origProd = origProd.split("&nbsp;").join(" ");
    origProd = origProd.trim();
    origArray = origProd.split(" ");
    for(l=0;l<results2.length;l++){
      reason = "NO";

      var found = 1;
      tempStart = results2[l].prod.split("-").join(" ");
      tempStart = tempStart.split("+").join(" ");
      results2[l].prod = tempStart.split(":").join(" ");

      // for(m=0;m<origArray.length;m++){
      //   tempProd = " " + results2[l].prod + " ";
      //   tempProd = tempProd.split("(").join(" ");
      //   tempProd = tempProd.split(")").join(" ");
      //   tempProd = tempProd.split(",").join(" ");
      //   tempProd = tempProd.split("WiFi").join("WiFi Wi Fi");
      //   tempProd = tempProd.split("wifi").join("WiFi Wi Fi");
      //   tempMatch = " " + origArray[m] + " ";
      //   if((tempProd).toUpperCase().indexOf(tempMatch.toUpperCase())!=-1 || origArray[m].toUpperCase()=="TABLET" || origArray[m].toUpperCase()== "EDGE" || origArray[m].toUpperCase()=="MOBILE" || origArray[m].toUpperCase()=="HD" || origArray[m].toUpperCase()=="WITH" || origArray[m].toUpperCase()=="CALLING" || origArray[m].toUpperCase()=="SMART" || origArray[m].toUpperCase()=="PHONE" || origArray[m].toUpperCase()=="AND" || origArray[m]==" " || origArray[m]==""){}
      //     else {
      //       found = 0;
      //       reason = origArray[m];
      //     }
      //   }
    // console.log(origProd + " " + results2[l].prod + " " + found + " " + reason + " " + results2[l].link);
    if(found==1){
      results3.push({
        prod : results2[l].prod,
        image : results2[l].image,
        price: results2[l].price,
        link: results2[l].link,
        site_name: results2[l].site_name,
        site_image: results2[l].site_image,
        position: results2[l].position
      });
    }
  }
  results2 = results3;
}
  // console.log("After this " + results2);
  if($('._1joEet a').length>3 || $('.clp-breadcrumb').find('li').length>3){
    if($('._1joEet a:eq(3)').text().trim() == "Memory Cards & Readers" || $('.clp-breadcrumb').find('li:eq(3)').text().trim() == "Memory Cards & Readers"){
      origArray = origProd.split(" ");
      for(m=0;m<origArray.length;m++){
        if(origArray[m]=="Class"){
          mustValue = origArray[m+1];
          mustValue2 = "CLASS";
        }
      }
      ////////////console.log("MustValue1 " + mustValue);
      ////////////console.log("MustValue2 " + mustValue2);
      if(mustValue!=""&&mustValue2!=""){
        temp1 = mustValue;
        temp2 = mustValue2;
        mustValue2 = temp2 + " " + temp1;
        mustValue = temp2 + temp1;

        var results5 = [];
        for(k=0;k<results2.length;k++){
          if(results2[k].prod.toUpperCase().indexOf(mustValue)!=-1||results2[k].prod.toUpperCase().indexOf(mustValue2)!=-1){
            results5.push({
              prod : results2[k].prod,
              image : results2[k].image,
              price: results2[k].price,
              link: results2[k].link,
              site_name: results2[k].site_name,
              site_image: results2[k].site_image,
              position: results2[k].position
            });
          }
          else {
      ////////////console.log("Must Have test failed for " + results2[k].prod);
    }

  }
  results2 = results5;
}

}
}

// console.log("Some stage " + results2);

mustValue = "";
mustValue2 = "";

if(mustCheck){
  origArray = origProd.split(" ");
  for(m=0;m<origArray.length;m++){
    if(origArray[m]=="GB"){
      mustValue = origArray[m-1];
      mustValue2 = "GB";
    }
    else if(origArray[m]=="TB"){
      mustValue = origArray[m-1];
      mustValue2 = "TB";
    }
  }
  l = 0;
  // console.log("MustValue1 " + mustValue);
  // console.log("MustValue2 " + mustValue2);
  if(mustValue!=""&&mustValue2!=""){
    temp = mustValue;
    mustValue = mustValue + mustValue2;
    mustValue2 = temp + " " + mustValue2;
    var results = [];
    for(k=0;k<results2.length;k++){
      if(results2[k].prod.toUpperCase().indexOf(mustValue)!=-1||results2[k].prod.toUpperCase().indexOf(mustValue2)!=-1){
        results.push({
          prod : results2[k].prod,
          image : results2[k].image,
          price: results2[k].price,
          link: results2[k].link,
          site_name: results2[k].site_name,
          site_image: results2[k].site_image,
          position: results2[k].position
        });
      }
      else {
      ////////////console.log("Must Have test failed for " + results2[k].prod);
    }

  }
}
else {
  var results = results2;
}
}
else {
  var results = results2;
}
results7 = results;

// console.log("FInal 3 " + results);

if(uniqueCheck){
  // console.log("Activated " + uniqueCheck + " " + JSON.stringify(mustHaveList));
  cs = 0;
  mustHaveList2 = [];
  for(k=0;k<mustHaveList.length;k++){
    tempString = mustHaveList[k];
    tempNumber = tempString.match(/\d+/);
    if(tempNumber==null){
      mustHaveList2[cs] = tempString;
      cs = cs + 1;
    }
    else {
      tempNumber = tempNumber[0];
      if(isNaN(parseInt(tempString))){
        tempString2 = tempString.split(tempNumber);
        tempString2 = tempString2[0];
        mustHaveList2[cs] = tempString2;
        cs = cs + 1;
        mustHaveList2[cs] = tempNumber;
        cs = cs + 1;
      }
      else {
        tempString2 = tempString.split(tempNumber);
        tempString2 = tempString2[1];
        mustHaveList2[cs] = tempString2;
        cs = cs + 1;
        mustHaveList2[cs] = tempNumber;
        cs = cs + 1;
      }
    }
  }
  mustHaveList = mustHaveList2;
  // console.log("mustHaves " + mustHaveList);
  l = 0;
  if(results7){
    results = [];
    for(k=0;k<results7.length;k++){
      toInsert = 1;
      for(l=0;l<mustHaveList.length;l++){
        if(results7[k].prod.toUpperCase().indexOf(mustHaveList[l])!=-1 || mustHaveList[l]=="" || mustHaveList[l]==" "){
        }
        else {
          toInsert = 0;
        }
      }
      if(toInsert==1){
       results.push({
        prod : results7[k].prod,
        image : results7[k].image,
        price: results7[k].price,
        link: results7[k].link,
        site_name: results7[k].site_name,
        site_image: results7[k].site_image,
        position: results7[k].position
      });
     }
     else {
        //////////console.log("Rejected " + results7[k].prod + " due to unique test");
      }
    }
  }
}
else {
  results = results7;
}
// console.log("Final 2 " + results);
if(results){
  results.sort(compare);
  var origPrice = getPrice();
  ////////////console.log(origProd);
  var countArray = Array();
  for (var i = 0; i <= results.length - 1; i++) {
    var tempLink = results[i].link;
    tempLink = tempLink.split("http://compare.buyhatke.com/tracking.php?redirect=")[1];
    tempLink = decodeURIComponent(tempLink);
    var currentURL = window.location.href;
    var filterURL = currentURL.split("&")[0];
    filterURL = filterURL.split("affid")[0];
    tempLink = tempLink.split("&")[0];
    tempLink = tempLink.split("affid")[0];
    if(filterURL==tempLink || filterURL == tempLink + "?" || tempLink + "?" == filterURL){
      results[i].price = origPrice;
    }
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
  indexSelected = 0;notFound = 0;
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
  if(flagSel==1){
    indexSelected = 0;
  }
  var posResults = [];
  posResults.push({selector: 'body', attr: 'none', pos: 'before'});
  posResults = JSON.stringify(posResults);
  if(posResults != "" || posResults != null){
    var hgt = "40px";
  }
  else{
    var hgt = "0px";
  }
  var posSpecs = []; 
  posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: hgt, postVal: '0px'});
  posSpecs.push({selector: '._1Zddhx', attr: 'none', cssAttr: 'margin-top', preVal: hgt, postVal: '0px'});
  posSpecs.push({selector: '.box-shadows', attr: 'none', cssAttr: 'display', preVal: 'none', postVal: 'block'});
  posSpecs = JSON.stringify(posSpecs);
  // console.log("FInal " + results);
  showResultsNew(results, indexSelected, posSpecs, posResults, url);
}
}
else{
  setTimeout(function(){ filterResults(data); }, 100);
}
}


function plotQR(){
  if(typeof(getPrice) == "function" && getPrice() != "" && $(".offers-info-wrap").length == 0 ){
    var urlToFrame = "https://dl.flipkart.com/dl/puma-miami-fashion-ii-dp-flip-flops/p/itmegyd4hqruwegs?pid=" + getPID() + "&affid=buyhatkegm&affExtParam1=extension&affExtParam2=qrCode";
    offerPrice = getPrice();
    if($('._2Cl4hZ ._1MVZfW').length > 0 && $(".offers-info-wrap").length == 0){
      $('._2Cl4hZ ._1MVZfW:eq(0)').after('<div class="offers-info-wrap tmargin15"><div class="offers-info"><div class="offers-header line "><span class="offer-text fk-inline-block">Price on APP - ' + offerPrice + '</span></div><div class="offers"><ul><li class="offer"><span class="offer-text ">Scan the QR code below to open the product in your Flipkart APP directly</span></li></ul></div><div class="padding10"><img src="https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(urlToFrame) + '&size=120x120&margin=0"></div></div></div></div>');
    }
    else if($('.offers-info-wrap').length > 0 && $(".offers-info-wrap").length == 0){
      $('.offers-info-wrap:eq(0)').before('<div class="offers-info-wrap tmargin15"><div class="offers-info"><div class="offers-header line "><span class="offer-text fk-inline-block">Price on APP - ' + offerPrice + '</span></div><div class="offers"><ul><li class="offer"><span class="offer-text ">Scan the QR code below to open the product in your Flipkart APP directly</span></li></ul></div><div class="padding10"><img src="https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(urlToFrame) + '&size=120x120&margin=0"></div></div></div></div>');
    }
    else if($('.app-offer-wrap').length > 0 && $(".offers-info-wrap").length == 0){
      $('.app-offer-wrap:eq(0)').before('<div class="offers-info-wrap tmargin15" style="width:200px;"><div class="offers-info"><div class="offers-header line "><span class="offer-text fk-inline-block">Price on APP - ' + getPrice() + '</span></div><div class="offers"><ul><li class="offer"><span class="offer-text ">Scan the QR code below to open the product in your Flipkart APP directly</span></li></ul></div><div class="padding10"><img src="https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(urlToFrame) + '&size=120x120&margin=0"></div></div></div></div>');
    }
  }
  else{
    setTimeout(plotQR, 500);
  }
}


function flipCall(){

  if(!flagOnce){
    // console.log("Entered here");
    flagOnce = true;
    var url = window.location.href;
    if(url.split("affid=buyhatkegm").length > 1){
      localStorage.tagTime = Math.floor(Date.now() / 1000);
    }
    else if(url.split("affid=").length > 1){
      localStorage.tagTime = 0;
    }
    if(Math.floor(Date.now() / 1000) - localStorage.tagTime > 86000){
     var jsonArr = [{'visitedEcomm': 2}];
     jsonArr = JSON.stringify(jsonArr);
     sendMessage(0, jsonArr, 0, doNothing, []); 
     // console.log("Trigger sent");
   }

 }
 if(typeof(getProd) == "function" && getProd() != "" && typeof(getPrice) == "function"  && getPrice() != 0 && $("._2oKbBr").length == 0){
  selectedFlag = 0;
  uniqueCheck = false;
  var url = window.location.href;
  if(url.split("affid=buyhatkegm").length > 1){
    localStorage.tagTime = Math.floor(Date.now() / 1000);
  }
  else if(url.split("affid=").length > 1){
    localStorage.tagTime = 0;
  }
  if(Math.floor(Date.now() / 1000) - localStorage.tagTime > 86000){

   var jsonArr = [{'visitedEcomm': 2}];
   jsonArr = JSON.stringify(jsonArr);
   sendMessage(0, jsonArr, 0, doNothing, []); 
 }

 if($('.breadcrumb-wrap').find('li').length > 2){
   if($('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Mobiles" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Tablets" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Laptops" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Home Appliances" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Kitchen Appliances" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Personal Care Appliances" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Cameras" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Storage" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Laptop Accessories" || $('.breadcrumb-wrap').find('li:eq(2)').text().trim() == "Desktops"){
    selectedFlag = 1;
  }
}
else if($('._1joEet a').length > 2){
  if($('._1joEet a:eq(2)').text().trim() == "Mobiles" || $('._1joEet a:eq(2)').text().trim() == "Tablets" || $('._1joEet a:eq(2)').text().trim() == "Laptops" || $('._1joEet a:eq(2)').text().trim() == "Home Appliances" || $('._1joEet a:eq(2)').text().trim() == "Kitchen Appliances" || $('._1joEet a:eq(2)').text().trim() == "Personal Care Appliances" || $('._1joEet a:eq(2)').text().trim() == "Cameras" || $('._1joEet a:eq(2)').text().trim() == "Storage" || $('._1joEet a:eq(2)').text().trim() == "Laptop Accessories" || $('._1joEet a:eq(2)').text().trim() == "Desktops"){
    selectedFlag = 1;
  }
}
if($('.breadcrumb-wrap').find('li').length > 1){
  if($('.breadcrumb-wrap').find('li:eq(1)').text().trim() == "Home Entertainment" || $('.breadcrumb-wrap').find('li:eq(1)').text().trim() == "Computers" || $('.breadcrumb-wrap').find('li:eq(1)').text().trim() == "Wearable Smart Devices" || $('.breadcrumb-wrap').find('li:eq(1)').text().trim() == "Gaming"){
    selectedFlag = 1;
  }
}
else if($('._1joEet a').length > 1){
  if($('._1joEet a:eq(1)').text().trim() == "Home Entertainment" || $('._1joEet a:eq(1)').text().trim() == "Computers" || $('._1joEet a:eq(1)').text().trim() == "Wearable Smart Devices" || $('._1joEet a:eq(1)').text().trim() == "Gaming"){
    selectedFlag = 1;
  }
}

if($('.breadcrumb-wrap').find('li').length > 3){
  if($('.breadcrumb-wrap').find('li:eq(3)').text().trim() == "Health Care Devices" || $('.breadcrumb-wrap').find('li:eq(3)').text().trim() == "Power Banks" || $('.breadcrumb-wrap').find('li:eq(3)').text().trim() == "Headphones" || $('.breadcrumb-wrap').find('li:eq(3)').text().trim() == "Chargers"){
    selectedFlag = 1;
  }
}
else if($('._1joEet a').length > 3){
  if($('._1joEet a:eq(3)').text().trim() == "Health Care Devices" || $('._1joEet a:eq(3)').text().trim() == "Power Banks" || $('._1joEet a:eq(3)').text().trim() == "Headphones" || $('._1joEet a:eq(3)').text().trim() == "Chargers"){
    selectedFlag = 1;
  }
}



  // console.log("called flipCall");
  alertPosition = 2;
  // console.log("Change detected");
  plotFlipGraph();
  var title = getProd();

  if($('.clp-breadcrumb').find('li').length>3){
   if($('.clp-breadcrumb').find('li:eq(3)').text().trim() == "Graphic Cli"){
    title2 = title.split(" ");
    title = "";
    for(m=0;m<title2.length;m++){
      if(m!=1){
        title = title + title2[m] + " ";
      }
    }
    title = title.split("Graphics").join("Graphic");
  }
}
else  if($('._1joEet a').length>3){
 if($('._1joEet a:eq(3)').text().trim() == "Graphic Cli"){
  title2 = title.split(" ");
  title = "";
  for(m=0;m<title2.length;m++){
    if(m!=1){
      title = title + title2[m] + " ";
    }
  }
  title = title.split("Graphics").join("Graphic");
}
}

if($('.clp-breadcrumb').find('li').length>3){
  if($('.clp-breadcrumb').find('li:eq(3)').text().trim()=="Mouse"){
    title = title.split(" ");
    if(title.length>=3){
      title = title[0] + " " + title[1] + " " + title[2];
    }
    else if(title.length==2){
      title = title[0] + " " + title[1];
    }
    else {
      title = title[0];
    }
  }
}
else if($('._1joEet a').length>3){
  if($('._1joEet a:eq(3)').text().trim()=="Mouse"){
    title = title.split(" ");
    if(title.length>=3){
      title = title[0] + " " + title[1] + " " + title[2];
    }
    else if(title.length==2){
      title = title[0] + " " + title[1];
    }
    else {
      title = title[0];
    }
  }
}
// title = title.split("/").join(" ");
origProd = title;
    //watch price
    // var selector2 = [];
    // selector2.push({selector: '.prices:eq(0)', attr: 'none', pos: 'after'});
    // selector2.push({selector: '.price.fk-display-block:eq(0)', attr: 'none', pos: 'after'});
    // selector2.push({selector: '._2MUtYG:eq(0)', attr: 'parent', pos: 'after'});
    // selector2.push({selector: '._3ZYEWO:eq(0)', attr: 'parent', pos: 'after'});
    // selector2.push({selector: '#ourSpecialLink', attr: 'parent', pos: 'after'});
    // selector2 = JSON.stringify(selector2);
    // if($("#bhWidget").length == 0){
    //   setTimeout("checkAlertStatus(" + selector2 + ")", 4000);
    // }

    //compare button
    var imgURL = returnResource("flipkart.png");

    var url = "https://compare.buyhatke.com/products/";
    if(title.split(" ").length >= 15){
      title = title.split(" ");
      title = title[0]+" "+title[1]+" "+title[2]+" "+title[3]+" "+title[4];
    }
    var urlToFollow = url + title;
    urlToFollow = urlToFollow.split(" ").join("-");
    urlToFollow = urlToFollow.split("(");
    urlToFollow = urlToFollow[0];//
    urlToFollow = urlToFollow.split("'s");
    urlToFollow = urlToFollow.join("");
    var myPrice = getPrice();
    msgToSend = "";
    var final2send = urlToFollow.split("products/");
    msgToSend = final2send[1] + "~*~*" + myPrice;
    var str2Send = "";
    msgToSend = msgToSend + "moreData=" + str2Send;
    var pid = getPID();
    if(pid[0]+pid[1]+pid[2] == "978" && pid.length == 13){
      isbn = pid;
    }
    else{
      isbn = false;
    }

    mustCheck = true;
    caseMobiles = true;

    if($('.clp-breadcrumb').find('li').length>2&&($('.clp-breadcrumb').find('li:eq(2)').text().trim()=="Mobiles"||$('.clp-breadcrumb').find('li:eq(2)').text().trim()=="Tablets")){
      caseMobiles = true;
    }
    else if($('._1joEet a').length>2&&($('._1joEet a:eq(2)').text().trim()=="Mobiles"||$('._1joEet a:eq(2)').text().trim()=="Tablets")){
      caseMobiles = true;
    }
    else {
      caseMobiles = false;
    }

    if($('.clp-breadcrumb').find('li').length>3){
     var checker = $('.clp-breadcrumb').find('li:eq(3)').text().trim();
     if(checker=="External hard disks" || checker == "Pen drives" || checker == "Graphic Cards" || checker == "RAMs"){
      mustCheck = true;
    }
    else {
      mustCheck = false;
    }
  }
  else if($('._1joEet a').length>3){
   var checker = $('._1joEet a:eq(3)').text().trim();
   if(checker=="External hard disks" || checker == "Pen drives" || checker == "Graphic Cards" || checker == "RAMs"){
    mustCheck = true;
  }
  else {
    mustCheck = false;
  }
}
else {
  mustCheck = false;
}

if($('.clp-breadcrumb').find('li:eq(2)').text().trim() == "All-in-One Desktops"){
  uniqueCheck = false;
}
else if($('.clp-breadcrumb').find('li:eq(2)').text().trim() == "Laptops"){
  title = title.split("Notebook").join("");
  title = title.split("Laptop").join("");
  title = title.split("Series").join("");
  uniqueCheck = false;
}
else if($('._1joEet a:eq(2)').text().trim() == "All-in-One Desktops"){
  uniqueCheck = false;
}
else if($('._1joEet a:eq(2)').text().trim() == "Laptops"){
  title = title.split("Notebook").join("");
  title = title.split("Laptop").join("");
  title = title.split("Series").join("");
  uniqueCheck = false;
}
else {
  // uniqueCheck = true;
}

if($('.clp-breadcrumb').find('li').length>3){
  if($('.clp-breadcrumb').find('li:eq(3)').text().trim() == "Headphones"){
    title2 = title.split(" ");
    title = "";
    if(title2.length>=3){
      title = title2[0] + " " + title2[1] + " " + title2[2];
    }
    else {
      title = title2.join(" ");
    }
  }
}
else if($('._1joEet a').length>3){
  if($('._1joEet a:eq(3)').text().trim() == "Headphones"){
    title2 = title.split(" ");
    title = "";
    if(title2.length>=3){
      title = title2[0] + " " + title2[1] + " " + title2[2];
    }
    else {
      title = title2.join(" ");
    }
  }
}
if($('.clp-breadcrumb').find('li').length>4){
 if($('.clp-breadcrumb').find('li:eq(4)').text().trim() == "TP-LINK Routers" || $('.clp-breadcrumb').find('li:eq(4)').text().trim() == "Netgear Routers" || $('.clp-breadcrumb').find('li:eq(4)').text().trim() == "D-Link Routers" || $('.clp-breadcrumb').find('li:eq(4)').text().trim() == "Asus Routers"){
  title2 = title.split(" ");
  title = "";
  if(title2.length>=2){
    title = title2[0] + " " + title2[1];
  }
  else {
    title = title2[0];
  }
}
}
else if($('._1joEet a').length>4){
 if($('._1joEet a:eq(4)').text().trim() == "TP-LINK Routers" || $('._1joEet a:eq(4)').text().trim() == "Netgear Routers" || $('._1joEet a:eq(4)').text().trim() == "D-Link Routers" || $('._1joEet a:eq(4)').text().trim() == "Asus Routers"){
  title2 = title.split(" ");
  title = "";
  if(title2.length>=2){
    title = title2[0] + " " + title2[1];
  }
  else {
    title = title2[0];
  }
}
}

if($('.clp-breadcrumb').find('li').length>4){
 if($('.clp-breadcrumb').find('li:eq(4)').text().trim() == "Cisco Linksys Routers"){
  title2 = title.split(" ");
  title = "";
  if(title2.length>=3){
    title = title2[0] + " " + title2[1] + " " + title2[2];
  }
  else {
    title = title2.join(" ");
  }
}
}
else if($('._1joEet a').length>4){
 if($('._1joEet a:eq(4)').text().trim() == "Cisco Linksys Routers"){
  title2 = title.split(" ");
  title = "";
  if(title2.length>=3){
    title = title2[0] + " " + title2[1] + " " + title2[2];
  }
  else {
    title = title2.join(" ");
  }
}
}


isApparel = ($('._1joEet a:eq(1)').text() == ("Clothing")) || ($('._1joEet a:eq(1)').text() == ("Footwear")) || ($('._1joEet a:eq(1)').text() == ("Jewellery")) || ($('._1joEet a:eq(1)').text() == ("Sunglasses") || $('.clp-breadcrumb').find('li:eq(1)').text() == ("Clothing")) || ($('.clp-breadcrumb').find('li:eq(1)').text() == ("Footwear")) || ($('.clp-breadcrumb').find('li:eq(1)').text() == ("Jewellery")) || ($('.clp-breadcrumb').find('li:eq(1)').text() == ("Sunglasses"));

if(isApparel){
  uniqueCheck = false;
}

bookCheck = $('.clp-breadcrumb').find('li:eq(1)').text().split("Books").length > 1 ;

if(isbn){
  if(urlToFollow.split("/products/").length > 1){
    urlToFollow = urlToFollow.split("/products/").join("/books/");
  }
  urlToFollow = urlToFollow + "-hatke" + isbn;
  msgToSend = msgToSend + "isbn=" + isbn;
}

if(!isbn && myPrice!=0){
 myRange = "?range=" + parseInt(.75*myPrice) + "-10000000&pageNo=1";
 urlToFollow = urlToFollow + myRange;
}
// if($('._2MUtYG').length>0 && $("#ourSpecialLink").length == 0){
//   $('._2MUtYG:eq(0)').append('<a id="ourSpecialLink" style="margin-top: 4px;" target="_blank" alt="Compare via Compare Hatke" title="Compare via Compare Hatke" href='+ (urlToFollow) + ' class="fk-inline-block buy-btn fksk-buy-btn"><img style="width:140px;" src=' + imgURL +'></a><br>');
// }
// else if($('._3ZYEWO').length>0 && $("#ourSpecialLink").length == 0){
//   $('._3ZYEWO:eq(0)').after('<a id="ourSpecialLink" style="margin-top: 4px;" target="_blank" alt="Compare via Compare Hatke" title="Compare via Compare Hatke" href='+ (urlToFollow) + ' class="fk-inline-block buy-btn fksk-buy-btn"><img style="width:140px;" src=' + imgURL +'></a><br>');
// }

// console.log("Message to send " + msgToSend);

if(uniqueCheck){
  mustHaveList = [];
  queryName = origProd;
  queryName = queryName.split("/").join(" ");
  queryName = queryName.split("(").join(" ");
  queryName = queryName.split(")").join(" ");
  queryName = queryName.split(",").join(" ");
  queryName = queryName.split("&").join(" ");
  queryName = queryName.split("-").join(" ");
  queryName2 = queryName.toUpperCase();
  queryArray = queryName.split(" ");
  queryArray2 = queryName2.split(" ");
  countSe = 0;

  for(l=0;l<queryArray.length;l++){
   if(queryArray2[l].indexOf(queryArray[l])!=-1&&queryArray2[l]!=""&&queryArray2[l]!=" "){
    mustHaveList[countSe] = queryArray2[l];
    countSe++;
      ////////////console.log(countSe + ". " + queryArray2[l]);
    }
  }
}
if(getBreadCrumb().split("*~Mobiles*~").length > 1){
  sendSearchMessageNew(final2send[1], 0, window.location.href);
}
else if(getBreadCrumb().split("*~Laptops*~").length > 1){
  getDetails(urlToFollow);
}
else {
  sendSearchMessage(msgToSend, urlToFollow);
}
plotQR();

}
else{
  setTimeout(flipCall, 100, urlToFollow);
}
}
flipCall();
